/**
 * ReK AI retrieval + grounded response composer.
 * Local RAG-like pipeline: tokenize -> retrieve -> rank -> compose -> cite.
 */

import { CORE_SNIPPETS } from "./knowledge-core.js?v=20260329l";
import { EXTENDED_SNIPPETS } from "./knowledge-extended.js?v=20260329l";
import { PORTFOLIO_SNIPPETS } from "./knowledge-portfolio.js?v=20260329l";
import { GENERATED_SNIPPETS } from "./knowledge-generated.js?v=20260329l";

const ALL = [...GENERATED_SNIPPETS, ...PORTFOLIO_SNIPPETS, ...CORE_SNIPPETS, ...EXTENDED_SNIPPETS];

const TR_HINTS = ["hangi", "nasıl", "neden", "proje", "yetenek", "deneyim", "mühendislik", "kaynak"];
const EN_HINTS = ["which", "what", "how", "project", "experience", "skills", "architecture", "source"];
const DOMAIN_KEYWORDS = [
  "react",
  "nextjs",
  "next.js",
  "zustand",
  "redux",
  "context",
  "ssr",
  "ssg",
  "isr",
  "framework",
  "typescript",
  "tailwind",
  "framer",
  "vanta",
  "ui",
  "ux",
  "frontend",
  "backend",
  "data",
  "veri",
  "sql",
  "bi",
  "kpi",
  "quality",
  "kalite",
  "google",
  "antigravity",
  "discipline",
  "disiplin",
  "cnn",
  "random forest",
  "rag",
  "zeytin",
  "oliv",
  "muhendis",
  "engineer",
  "portfolio",
  "proje",
  "kariyer",
  "erasmus",
  "diferansiyel",
  "sayisal",
  "numerical",
  "cauchy",
  "hazırlık",
  "hazirlik",
  "ingilizce",
  "english",
  "eğitim",
  "egitim",
  "akış",
  "akis",
  "workflow",
  "yazılım",
  "yazilim",
  "staj",
  "intern",
  "pwr",
  "lehistan",
  "polonya",
  "poland",
  "ders",
  "okul",
  "university",
  "üniversite",
  "iha",
  "uav",
  "teknofest",
  "siber",
  "cyber",
  "security",
  "devops",
  "blockchain",
  "qa",
  "testing",
  "sualtı",
  "su altı",
  "underwater",
  "antigravity",
  "feedback",
  "geri bildirim",
  "geri-bildirim",
  "bug",
  "report",
  "issue",
  "fizyoterapi",
  "physio",
  "mayın",
  "minesweeper",
  "android",
  "bento",
  "dergipark",
  "orcid",
  "bulgaristan",
  "bulgaria",
  "lodz",
  "ksü",
  "ksu",
  "kahramanmaraş",
  "prensip",
  "strateji",
  "deneyim",
  "tecrübe",
  "yetenek",
  "beceri"
];
const OFFTOPIC_KEYWORDS = [
  "yemek",
  "yemeliyim",
  "hava",
  "burc",
  "fal",
  "magazin",
  "movie",
  "film oner",
  "recipe",
  "dinner",
  "lunch",
  "breakfast",
];
const GREETING_KEYWORDS = ["merhaba", "selam", "kimsin", "hello", "hi", "hey"];
const CHITCHAT_KEYWORDS = [
  "nasilsin",
  "nasılsın",
  "iyi misin",
  "iyiyim",
  "tesekkur",
  "teşekkür",
  "sag ol",
  "sağ ol",
  "ne yapiyorsun",
  "ne yapıyorsun",
  "naber",
  "napıyorsun",
  "napıyon",
];
const LIVE_DATA_KEYWORDS = [
  "hava durumu",
  "hava nasil",
  "hava nasıl",
  "sicaklik",
  "sıcaklık",
  "dolar",
  "eur",
  "euro",
  "kur",
  "borsa",
  "altin",
  "altın",
  "trafik",
  "haber",
  "son dakika",
  "canli",
  "canlı",
  "anlik",
  "anlık",
];

/**
 * @typedef {"greeting"|"chitchat"|"portfolio_info"|"technical_deep_dive"|"career_or_hiring"|"live_data_request"|"out_of_scope"} RekIntent
 */

/**
 * @param {string} q
 * @returns {"tr"|"en"}
 */
function detectLanguage(q) {
  var s = String(q || "").toLowerCase();
  if (/[ğüşöçıİĞÜŞÖÇ]/.test(s)) return "tr";
  var trScore = 0;
  var enScore = 0;
  TR_HINTS.forEach(function (h) {
    if (s.indexOf(h) !== -1) trScore += 1;
  });
  EN_HINTS.forEach(function (h) {
    if (s.indexOf(h) !== -1) enScore += 1;
  });
  return enScore > trScore ? "en" : "tr";
}

/**
 * Tokenize while preserving Turkish characters.
 * @param {string} q
 * @returns {string[]}
 */
function tokenize(q) {
  var s = (q || "").toLowerCase();
  try {
    s = s.replace(/[^\p{L}\p{N}+]/gu, " ");
  } catch (e) {
    s = s.replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ\s+]/gi, " ");
  }
  return s.split(/\s+/).filter(function (t) {
    return t && t.length > 1;
  });
}

/**
 * Short, query-focused excerpt: prefers sentences that overlap query tokens.
 * @param {string} query
 * @param {string} text
 * @param {number} maxChars
 */
function focusExcerptFromQuery(query, text, maxChars) {
  var limit = typeof maxChars === "number" ? maxChars : 720;
  var body = String(text || "").replace(/\s+/g, " ").trim();
  if (!body) return "";
  if (body.length <= limit) return body;
  var qTokens = tokenize(query).filter(function (t) {
    return t.length > 2;
  });
  if (!qTokens.length) {
    return body.slice(0, limit - 1).trim() + "…";
  }
  var sentences = splitIntoSentences(body);
  if (!sentences.length) {
    return body.slice(0, limit - 1).trim() + "…";
  }
  var scored = sentences.map(function (sent) {
    var sl = sent.toLowerCase();
    var score = 0;
    qTokens.forEach(function (tok) {
      if (sl.indexOf(tok) !== -1) score += 4;
    });
    return { sent: sent.trim(), score: score };
  });
  scored.sort(function (a, b) {
    return b.score - a.score;
  });
  var picked = [];
  var len = 0;
  var i = 0;
  if (scored[0].score > 0) {
    for (i = 0; i < scored.length; i++) {
      if (scored[i].score === 0) break;
      var s = scored[i].sent;
      if (len + s.length + 2 > limit) break;
      picked.push(s);
      len += s.length + 2;
    }
  }
  if (!picked.length) {
    for (i = 0; i < sentences.length; i++) {
      var s2 = sentences[i].trim();
      if (len + s2.length + 2 > limit) {
        var rest = limit - len - 1;
        if (rest > 48) picked.push(s2.slice(0, rest).trim() + "…");
        break;
      }
      picked.push(s2);
      len += s2.length + 2;
    }
  }
  var out = picked.join(" ").trim();
  if (out.length > limit) out = out.slice(0, limit - 1).trim() + "…";
  return out;
}

function splitIntoSentences(body) {
  var s = String(body || "").replace(/\s+/g, " ").trim();
  if (!s) return [];
  var m = s.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  return m
    ? m
        .map(function (x) {
          return x.trim();
        })
        .filter(Boolean)
    : [s];
}

function buildDocIndex() {
  var docs = ALL.map(function (sn) {
    var full = (sn.title + " " + sn.text + " " + (sn.tags || []).join(" ")).toLowerCase();
    var tokens = tokenize(full);
    return Object.assign({}, sn, { __full: full, __tokens: tokens, __lang: detectLanguage(full) });
  });

  var df = Object.create(null);
  docs.forEach(function (d) {
    var seen = Object.create(null);
    d.__tokens.forEach(function (t) {
      if (seen[t]) return;
      seen[t] = 1;
      df[t] = (df[t] || 0) + 1;
    });
  });

  var N = docs.length;
  var idf = Object.create(null);
  Object.keys(df).forEach(function (t) {
    idf[t] = Math.log((N + 1) / (df[t] + 1)) + 1;
  });
  return { docs: docs, idf: idf };
}

const INDEX = buildDocIndex();

/**
 * Counts exact token (word-level) occurrences from a pre-tokenized array.
 * Replaces the old substring indexOf approach which caused false-positive
 * matches (e.g. querying "AI" boosted documents containing "Mail").
 * @param {string[]} tokens  Pre-tokenized word list from doc.__tokens
 * @param {string} token     The query token to count
 * @returns {number}
 */
function countToken(tokens, token) {
  if (!token || !tokens || !tokens.length) return 0;
  var count = 0;
  for (var i = 0; i < tokens.length && count < 4; i++) {
    if (tokens[i] === token) count += 1;
  }
  return count;
}

/**
 * @param {string} query
 * @param {{ __full: string, tags: string[], title: string, source?: { kind?: string }, __lang?: "tr"|"en" }} doc
 * @param {"tr"|"en"} queryLang
 * @returns {number}
 */
function scoreDoc(query, doc, queryLang) {
  var qTokens = tokenize(query);
  var score = 0;

  // Use token-level counting against doc.__tokens (no substring false-positives)
  qTokens.forEach(function (t) {
    var tf = countToken(doc.__tokens, t);
    if (!tf) return;
    var w = INDEX.idf[t] || 1;
    score += (1 + Math.min(tf, 3) * 0.6) * w;
  });

  // Title bonus: only if ALL query tokens appear in the tokenized title
  if (doc.title) {
    var titleTokens = tokenize(doc.title);
    var titleMatches = qTokens.filter(function (t) {
      return titleTokens.indexOf(t) !== -1;
    }).length;
    if (titleMatches > 0) {
      score += 2.4 * (titleMatches / Math.max(qTokens.length, 1));
    }
  }

  // Tag bonus: tag must appear as a whole token in the query, not as a substring
  (doc.tags || []).forEach(function (tag) {
    var tagTokens = tokenize(String(tag || ""));
    var found = tagTokens.some(function (tt) {
      return qTokens.indexOf(tt) !== -1;
    });
    if (found) score += 2.6;
  });

  if (doc.source && doc.source.kind === "paper") score += 0.6;
  if (doc.source && doc.source.kind === "project") score += 0.5;
  if (doc.__lang && queryLang && doc.__lang === queryLang) score += 0.35;
  return score;
}

/**
 * @param {string} query
 * @param {{ maxSources?: number }} [opts]
 * @returns {{ doc: any, score: number }[]}
 */
function retrieve(query, opts) {
  var options = opts || {};
  var q = String(query || "").trim();
  if (!q) return [];
  var maxSources = Number(options.maxSources || 5);
  if (!Number.isFinite(maxSources)) maxSources = 5;
  maxSources = Math.max(1, Math.min(10, Math.round(maxSources)));
  var queryLang = detectLanguage(q);
  var scored = INDEX.docs
    .map(function (doc) {
      return { doc: doc, score: scoreDoc(q, doc, queryLang) };
    })
    .filter(function (x) {
      return x.score > 0.1;
    })
    .sort(function (a, b) {
      return b.score - a.score;
    })
    .slice(0, maxSources);
  return scored.length ? scored : [{ doc: INDEX.docs[0], score: 0.1 }];
}

/**
 * @param {{ doc: any, score: number }[]} retrieved
 */
function buildAuditCandidates(retrieved) {
  return (retrieved || []).slice(0, 8).map(function (x) {
    return {
      id: x.doc.id,
      title: x.doc.title,
      sourceLabel: x.doc.source ? x.doc.source.label : x.doc.title,
      sourceUrl: x.doc.source ? x.doc.source.url : "#",
      score: Number(x.score.toFixed(3)),
    };
  });
}

/**
 * @param {string} query
 * @returns {{ title: string, url: string }[]}
 */
function suggestExternalSources(query) {
  var q = String(query || "").toLowerCase();
  var out = [];
  function add(title, url) {
    out.push({ title: title, url: url });
  }
  if (q.indexOf("react") !== -1) add("React Docs", "https://react.dev");
  if (q.indexOf("python") !== -1) add("Python Docs", "https://docs.python.org/3/");
  if (q.indexOf("sql") !== -1 || q.indexOf("postgres") !== -1) add("PostgreSQL Docs", "https://www.postgresql.org/docs/");
  if (q.indexOf("rag") !== -1 || q.indexOf("llm") !== -1) add("Prompt Engineering Guide", "https://www.promptingguide.ai/");
  if (q.indexOf("system design") !== -1 || q.indexOf("mimari") !== -1) add("System Design Primer", "https://github.com/donnemartin/system-design-primer");
  return out.slice(0, 3);
}

/**
 * @param {number} top
 * @returns {"high"|"medium"|"low"}
 */
function confidenceBucket(top) {
  if (top >= 6.5) return "high";
  if (top >= 3.2) return "medium";
  return "low";
}

function detectUserIntent(query) {
  var q = String(query || "").toLowerCase();
  if (
    q.indexOf("hiring") !== -1 ||
    q.indexOf("hire") !== -1 ||
    q.indexOf("recruit") !== -1 ||
    q.indexOf("is ilan") !== -1 ||
    q.indexOf("ise alim") !== -1 ||
    q.indexOf("staj") !== -1 ||
    q.indexOf("cv") !== -1
  ) {
    return "recruiter";
  }
  if (
    q.indexOf("ogrenci") !== -1 ||
    q.indexOf("student") !== -1 ||
    q.indexOf("ogren") !== -1 ||
    q.indexOf("ders") !== -1 ||
    q.indexOf("how to learn") !== -1
  ) {
    return "student";
  }
  return "curious";
}

function isOffTopicQuery(query) {
  var q = String(query || "").toLowerCase();
  var hasDomainTerm = DOMAIN_KEYWORDS.some(function (k) {
    return q.indexOf(k) !== -1;
  });
  var hasOffTopicTerm = OFFTOPIC_KEYWORDS.some(function (k) {
    return q.indexOf(k) !== -1;
  });
  return hasOffTopicTerm && !hasDomainTerm;
}

/**
 * Detects gibberish / nonsense keyboard-mashing input.
 *
 * Strategy (in order):
 * 1. Short input (1-2 chars) that are not on the whitelist (cv, ai, hi, etc.) → gibberish
 * 2. No vowels at all in 3+ letter input → definitely gibberish ("ksdfl")
 * 3. Vowel followed by 3+ consecutive consonants → unusual in TR/EN ("asdf", "hvuf…")
 * 4. Repetitive syllable patterns → random mashing ("asas", "abab", "xyxy")
 * 5. Very high unique-char ratio (≥0.82) in 6+ char input → random spread ("hvufıdolsk")
 * 6. Input is ALL the same repeated letter / digit → trivial gibberish ("aaaa")
 *
 * @param {string} query
 * @returns {boolean}
 */
function isGibberishQuery(query) {
  var q = String(query || "").trim().toLowerCase();
  if (!q) return false;

  // Whitelist of legitimate 1-2 char inputs (shortcuts or common words)
  var shortWhitelist = ["ai", "cv", "hi", "ok", "me", "tr", "en", "id", "go", "up", "i", "a", "it", "st", "ml"];

  // Rule 1: Very short inputs (1-2 letters)
  if (q.length < 3) {
    if (shortWhitelist.indexOf(q) !== -1) return false;
    if (/^\d+$/.test(q)) return false; // Allow digits
    return true; // "r", "l", etc.
  }

  // Pre-check: If total query length is long but it only has 1 or 2 vowels 
  // and mostly non-vowels, it might be gibberish. 
  // However, we MUST NOT strip spaces for vowel cluster checks.
  var VOW = /[aeıioöuü]/g;
  var allLetters = q.replace(/[^a-zğüşöçı]/g, "");
  var vowelCount = (allLetters.match(VOW) || []).length;
  
  if (allLetters.length >= 8 && vowelCount === 0) return true; // Rule 2: Zero vowels in 8+ letters

  // Split into words for per-word analysis to avoid "consonant clusters across spaces" bug
  var words = q.split(/\s+/);
  for (var i = 0; i < words.length; i++) {
    var rawWord = words[i];
    var word = rawWord.replace(/[^a-zğüşöçı]/g, "");
    if (!word || word.length < 3) continue;

    // Rule 3: Vowel followed by 4+ consecutive consonants (Per-word!)
    // "görev planı" -> "görev" (ö-rev: 2), "planı" (a-nı: 1). NO TRIGGER.
    // "hvufıdolsk" -> triggers.
    if (/[aeıioöuü][^aeıioöuü]{4,}/i.test(word)) return true;

    // Rule 4: all same character repeated in a word
    if (/^(.)\1{3,}$/.test(word)) return true;
  }

  // Rule 5: Repetitive syllable patterns (e.g. "asas", "abab", "xyxy")
  // We exclude some common real words (baba, dede, mama, haha, etc.)
  var repetitiveWhitelist = ["baba", "dede", "mama", "haha", "yaya", "gaga", "nana", "papa", "asas", "abab"]; // user asked for asas but let's be careful
  // We only trigger repetition if it's over 5 chars to avoid "baba" etc. 
  // or if it's explicitly non-word-like.
  if (allLetters.length >= 6 && /^(.{2,})\1+$/.test(allLetters)) {
     if (repetitiveWhitelist.indexOf(allLetters) === -1) return true;
  }

  // Rule 6: High unique-char ratio in long strings
  if (allLetters.length >= 10) {
    var seen = {};
    for (var j = 0; j < allLetters.length; j++) seen[allLetters[j]] = 1;
    var ratio = Object.keys(seen).length / allLetters.length;
    if (ratio >= 0.85) return true;
  }

  return false;
}


function isGreetingQuery(query) {
  var q = String(query || "").toLowerCase().trim();
  if (!q) return false;
  if (q.length <= 14 && GREETING_KEYWORDS.some(function (k) { return q.indexOf(k) !== -1; })) return true;
  return /^(merhaba|selam|kimsin|hello|hi|hey)[!.?\s]*$/i.test(q);
}

function isChitChatQuery(query) {
  var q = String(query || "").toLowerCase();
  return CHITCHAT_KEYWORDS.some(function (k) {
    return q.indexOf(k) !== -1;
  });
}

function isLiveDataQuery(query) {
  var q = String(query || "").toLowerCase();
  return LIVE_DATA_KEYWORDS.some(function (k) {
    return q.indexOf(k) !== -1;
  });
}

/**
 * Lightweight intent classifier (rule-based).
 * @param {string} query
 * @returns {RekIntent}
 */
function classifyIntent(query) {
  var q = String(query || "").trim();
  if (!q) return "chitchat";
  if (isGreetingQuery(q)) return "greeting";
  if (isLiveDataQuery(q)) return "live_data_request";
  if (isChitChatQuery(q)) return "chitchat";
  var userIntent = detectUserIntent(q);
  if (userIntent === "recruiter") return "career_or_hiring";
  if (isGibberishQuery(q)) return "gibberish";

  var lower = q.toLowerCase();

  // Education & Academic Intent
  if (
    lower.indexOf("hazırlık") !== -1 ||
    lower.indexOf("hazirlik") !== -1 ||
    lower.indexOf("ingilizce") !== -1 ||
    lower.indexOf("eğitim") !== -1 ||
    lower.indexOf("okul") !== -1 ||
    lower.indexOf("üniversite") !== -1 ||
    lower.indexOf("erasmus") !== -1
  ) {
    return "education_research";
  }

  var technicalHints = ["mimari", "architecture", "neden", "how", "why", "trade-off", "performans", "pipeline", "model", "metrik", "cnn", "rag", "prensip", "akış"];
  var isTechnical = technicalHints.some(function (k) {
    return lower.indexOf(k) !== -1;
  });
  if (isTechnical) return "technical_deep_dive";

  if (DOMAIN_KEYWORDS.some(function (k) { return lower.indexOf(k) !== -1; })) return "portfolio_info";

  // If we reach here, it's out of scope UNLESS it contains TR_HINTS or EN_HINTS
  // and we have ANY match in the database.
  var isHelpRequest = TR_HINTS.concat(EN_HINTS).some(function (h) {
    return lower.indexOf(h) !== -1;
  });
  if (isHelpRequest) return "portfolio_info";

  return "out_of_scope";
}

function isSiteStackQuery(query) {
  var q = String(query || "").toLowerCase();
  return (
    q.indexOf("nasil yapildi") !== -1 ||
    q.indexOf("nasıl yapıldı") !== -1 ||
    q.indexOf("teknolojiler") !== -1 ||
    q.indexOf("stack") !== -1
  );
}

/**
 * Maps single keywords to high-value representative topics.
 * Perfect for "hint-based" suggestions requested by the user.
 */
function getHintBasedTopic(query) {
  var q = String(query || "").toLowerCase().trim();
  if (q.length > 25) return null; // Only for short hints

  var mapping = {
    "model": "Zeytin projesindeki EfficientNet mimarisi ve akademik dökümantasyon disiplini",
    "ekip": "TEKNOFEST koordinasyonu ve çok disiplinli çalışma başarısı",
    "koordinasyon": "Karmaşık projelerde Görev Kırılım Yapısı (WBS) ve süreç yönetimi",
    "ingilizce": "B2 seviye teknik dökümantasyon yetkinliği ve hazırlık yılı disiplini",
    "erasmus": "Lodz University of Technology deneyimi ve uluslararası adaptasyon",
    "frontend": "React, Next.js ve modern mimari kararlarıyla ölçeklenebilir arayüz geliştirme disiplini",
    "react": "Bileşen tabanlı (Component-driven) tasarım, hooks disiplini ve Zustand/Context API ile durum yönetimi",
    "nextjs": "Next.js ile SSR, SSG ve ISR stratejileri üzerinden yüksek performanslı ve SEO uyumlu mimari kurgulama yetkinliği",
    "framework": "Modern web ekosistemindeki ihtiyaca göre doğru teknoloji ve framework seçim başarısı",
    "data": "Ham verinin stratejik içgörüye dönüştürülmesini sağlayan veri modelleme disiplini",
    "android": "MVVM mimarisi, Jetpack bileşenleri ve katmanlı geliştirme prensibi",
    "physio": "Sinyal işleme ve donanım-yazılım senkronizasyonu",
    "sualtı": "İnsansız Sualtı sistemlerinde teknik entegrasyon ve milestone takibi",
    "makale": "DergiPark üzerinden yayınlanan akademik yazım ve raporlama standartları",
    "staj": "Bulgaristan Erasmus+ staj kabulü ve profesyonel ağ genişletme",
    "google": "Antigravity platformundaki Issue #497054184 raporu ve kalite güvencesi başarısı",
    "kalite": "Teknik raporlama, hata izolasyonu ve sistematik geri bildirim disiplini",
    "satranç": "zihinsel disiplin, varyant analizi ve baskı altında karar kalitesi",
    "tenis": "tempo yönetimi, sabır ve uzun soluklu teknik odaklanma başarısı",
    "disiplin": "mühendislik projelerindeki analitik titizlik ve 'sıfır teknik borç' prensibi",
  };

  for (var key in mapping) {
    if (q.indexOf(key) !== -1) return mapping[key];
  }
  return null;
}

function isFrontendQuery(query) {
  var q = String(query || "").toLowerCase();
  return (
    q.indexOf("frontend") !== -1 ||
    q.indexOf("ön yüz") !== -1 ||
    q.indexOf("on yuz") !== -1 ||
    q.indexOf("arayuz") !== -1 ||
    q.indexOf("arayüz") !== -1 ||
    q.indexOf("ui") !== -1 ||
    q.indexOf("ux") !== -1 ||
    q.indexOf("react") !== -1 ||
    q.indexOf("next") !== -1
  );
}

function buildDeepLinks(currentPage, language) {
  var links = [
    { title: language === "en" ? "Portfolio Hub" : "Portfoy Merkezi", url: "/portfolio.html" },
    { title: language === "en" ? "ReK AI Section" : "ReK AI Bolumu", url: "/portfolio.html#res-ai" },
    { title: language === "en" ? "Projects" : "Projeler", url: "/portfolio.html#projects" },
  ];
  if (String(currentPage || "").indexOf("/portfolio") !== -1) {
    links.push({ title: language === "en" ? "Contact Resul" : "Resul ile Iletisime Gec", url: "/portfolio.html#contact" });
  } else {
    links.push({ title: language === "en" ? "Live Site" : "Canli Site", url: "https://resulkilinc.com" });
  }
  return links.slice(0, 4);
}

function composePersonaSummary(language, query, topDocs) {
  if (!topDocs.length) {
    return language === "en"
      ? "Resul's professional documentation does not contain a specific match for this query. However, I can provide detailed insights into his engineering mindset, project coordination, or technical stack."
      : "İlettiğiniz konu Resul'un profesyonel dökümantasyonunda doğrudan tanımlanmamıştır. Ancak kendisinin mühendislik vizyonu, proje koordinasyon disiplini veya teknik yetkinlikleri hakkında detaylı analizler sunabilirim.";
  }

  var top = topDocs[0];
  var primary = String((top && top.text) || "").trim();
  var excerpt = focusExcerptFromQuery(query, primary, language === "en" ? 520 : 560);
  
  var suggestionTr = "\n\nResul'un teknik derinliğini daha iyi analiz etmek için Projeler bölümünü inceleyebilir veya akademik dökümantasyonuna göz atabilirsiniz.";
  var suggestionEn = "\n\nTo further analyze Resul's technical depth, you may review the Projects section or examine his academic documentation.";
  
  return excerpt + (language === "en" ? suggestionEn : suggestionTr);
}

function composeGreetingSummary(language, currentPage, userIntent) {
  var p = String(currentPage || "/");
  var isPortfolio = p.indexOf("/portfolio") !== -1;
  var introTr =
    "Resul Kılınç'ın profesyonel dijital temsilcisi olarak size yardımcı olmaktan memnuniyet duyarım. Resul'un mühendislik projeleri, teknik yetenekleri ve akademik geçmişiyle ilgili sorularınızı yanıtlayabilirim. " +
    (isPortfolio
      ? "Projeler, Erasmus deneyimi veya teknik stack hakkında bilgi alabilirsiniz."
      : "Zeytin sınıflandırma projesi, ReK AI mimarisi veya genel portfolyo özeti hakkında sorularınızı bekliyorum.");
  var introEn =
    "As Resul Kılınç's professional digital representative, I am here to assist you. I can answer questions about Resul's engineering projects, technical skills, and academic background. " +
    (isPortfolio
      ? "You can ask about projects, Erasmus experience, or his technical stack."
      : "I can provide details about the olive classification project, ReK AI architecture, or a general portfolio overview.");
  var linksTr = "\n\n[Portfolyo](https://resulkilinc.com/portfolio.html) · [İletişim](https://resulkilinc.com/portfolio.html#contact)";
  var linksEn = "\n\n[Portfolio](https://resulkilinc.com/portfolio.html) · [Contact](https://resulkilinc.com/portfolio.html#contact)";

  if (language === "en") {
    return introEn + linksEn;
  }
  return introTr + linksTr;
}

/**
 * Provides context-aware suggestions based on user intent.
 * @param {RekIntent} intent 
 * @param {"tr"|"en"} language 
 */
function getThemedSuggestions(intent, language) {
  var isEn = language === "en";
  if (intent === "education_research") {
    return isEn 
      ? ["English Prep Year", "Erasmus+ Experience", "KTU Engineering Education"]
      : ["İngilizce Hazırlık Yılı", "Erasmus+ Deneyimi", "KTÜ Mühendislik Eğitimi"];
  }
  if (intent === "technical_deep_dive" || intent === "portfolio_info") {
    return isEn
      ? ["Olive Project Metrics", "ReK AI Architecture", "CNN Model Principles"]
      : ["Zeytin Projesi Metrikleri", "ReK AI Mimarisi", "CNN Model Prensipleri"];
  }
  if (intent === "career_or_hiring") {
    return isEn
      ? ["Full CV / Resume", "Internship Details", "Contact Resul"]
      : ["Tam CV / Özgeçmiş", "Staj Detayları", "Resul İle İletişim"];
  }
  return isEn
    ? ["Portfolio Overview", "Top Projects", "ReK AI Setup"]
    : ["Portfolyo Özeti", "Öne Çıkan Projeler", "ReK AI Nasıl Yapıldı?"];
}

function composeUnclearTopicSummary(language, intent) {
  var isEn = language === "en";
  var tr = "İlettiğiniz kavram Resul'un profesyonel ilgi alanlarıyla kısmi olarak örtüşüyor olabilir ancak net bir analiz için daha fazla detaya ihtiyaç duyuyorum. " +
           "Resul'un uzmanlık alanları doğrultusunda şu başlıkları incelemenizi öneririm:";
  var en = "The topic you provided may partially overlap with Resul's professional domains, but I require more detail for a precise analysis. " +
           "I recommend exploring the following areas within Resul's expertise:";
  
  var suggestions = getThemedSuggestions(intent, language);
  var list = suggestions.map(function(s) { return "- " + s; }).join("\n");

  return (isEn ? en : tr) + "\n" + list + "\n\n" +
         (isEn ? "[Portfolyo Merkezi](https://resulkilinc.com/portfolio.html)" : "[Portfolio Hub](https://resulkilinc.com/portfolio.html)");
}

function composeChitChatSummary(language, currentPage) {
  var isEn = language === "en";
  var warmTr =
    "İyiyim, teşekkürler. İstersen doğrudan bir konu yaz (ör. eğitim, Erasmus, Zeytin projesi).";
  var warmEn =
    "Doing well, thanks. Ask anything about Resul’’s background, projects, or stack.";
  var linksTr = "\n\n[Portföy](https://resulkilinc.com/portfolio.html) · [GitHub](https://github.com/resulkilinc)";
  var linksEn = "\n\n[Portfolio](https://resulkilinc.com/portfolio.html) · [GitHub](https://github.com/resulkilinc)";
  if (isEn) return warmEn + linksEn;
  return warmTr + linksTr;
}

function composeLiveDataSummary(language, query, currentPage) {
  var isEn = language === "en";
  var q = String(query || "").toLowerCase();
  var topic = q.indexOf("hava") !== -1 ? (isEn ? "weather" : "hava durumu") : q.indexOf("trafik") !== -1 ? (isEn ? "traffic" : "trafik") : isEn ? "live data" : "canli veri";
  var lineTr =
    "Gerçek zamanlı " +
    topic +
    " verilerine erişim profesyonel kapsamımın dışındadır. Ancak Resul'un sistem mimarisi, veri işleme disiplini veya teknik dökümantasyon standartları hakkındaki sorularınızı yüksek hassasiyetle yanıtlayabilirim.";
  var lineEn =
    "Accessing real-time " +
    topic +
    " data is outside my professional scope. However, I can provide detailed answers regarding Resul's system architecture, data processing discipline, or technical documentation standards with high precision.";
  var siteLinks =
    language === "en"
      ? "[Portfolio](https://resulkilinc.com/portfolio.html) · [Technical Projects](https://resulkilinc.com/portfolio.html#projects) · [Professional Contact](https://resulkilinc.com/contact)"
      : "[Portfoy](https://resulkilinc.com/portfolio.html) · [Teknik Projeler](https://resulkilinc.com/portfolio.html#projects) · [Profesyonel Iletisim](https://resulkilinc.com/contact)";
  if (isEn) return lineEn + "\n\n" + siteLinks;
  return lineTr + "\n\n" + siteLinks;
}

function composeGibberishSummary(language) {
  var tr =
    "Girdiğiniz metin anlamlı bir sorgu olarak tanımlanamadı. Resul Kılınç'ın portfolyosu, projeleri ve mühendislik tecrübesi hakkında bilgi almak isterseniz yardımcı olabilirim.\n\n" +
    "Aşağıdaki konulardan birini inceleyerek başlayabilirsiniz:\n" +
    "- Zeytin projesi ve test metrikleri\n" +
    "- Erasmus+ ve uluslararası deneyim\n" +
    "- ReK AI mimarisi ve çalışma prensibi\n" +
    "- Yazılım yetenekleri ve projeler\n\n" +
    "[Portfolyo](https://resulkilinc.com/portfolio.html) · [İletişim](https://resulkilinc.com/portfolio.html#contact)";
  var en =
    "The input provided was not recognized as a meaningful query. I can assist you if you would like information about Resul Kılınç's portfolio, projects, and engineering experience.\n\n" +
    "You can start by reviewing one of the following topics:\n" +
    "- Olive classification project & test metrics\n" +
    "- Erasmus+ and international experience\n" +
    "- ReK AI architecture and workflow\n" +
    "- Software skills and projects\n\n" +
    "[Portfolio](https://resulkilinc.com/portfolio.html) · [Contact](https://resulkilinc.com/portfolio.html#contact)";
  return language === "en" ? en : tr;
}

function composeOutOfScopeSummary(language, currentPage) {
  var isEn = language === "en";
  var tr =
    "Bu konuda serbest sohbet edebiliriz; odagim Resul'un portfoy ve muhendislik icerigi.\n\n" +
    "Egitim, deneyim, proje veya kariyer hakkinda sorabilirsin.";
  var en =
    "We can chat, but I focus on Resul’s portfolio and engineering work.\n\n" +
    "Ask about education, experience, projects, or career.";
  var links =
    isEn
      ? "[Portfolio](https://resulkilinc.com/portfolio.html) · [GitHub](https://github.com/resulkilinc)"
      : "[Portfoy](https://resulkilinc.com/portfolio.html) · [GitHub](https://github.com/resulkilinc)";
  if (isEn) return en + "\n\n" + links;
  return tr + "\n\n" + links;
}

function composeSiteStackSummary(language, currentPage) {
  var tr =
    "Site **statik HTML, CSS ve JavaScript** ile yayında; ReK AI tarayıcıda yerel bilgi getirip sıralayıp gösterir (ücretli dış API yok). " +
    "Portföyde özel CSS ve Vanta.js; ana sayfada Tailwind CDN. Stack özeti: HTML/CSS, modüler ESM JS, Vanta, yerel retrieval.\n\n" +
    "[GitHub](https://github.com/resulkilinc) · [Portföy](https://resulkilinc.com/portfolio.html) · [İletişim](https://resulkilinc.com/portfolio.html#contact)";
  var en =
    "The site is **static HTML/CSS/JavaScript**; ReK AI runs in the browser (retrieve + rank + render) with no paid external APIs. " +
    "Portfolio uses custom CSS + Vanta; the landing page uses Tailwind CDN. Stack: HTML/CSS, modular ESM JS, Vanta, local retrieval.\n\n" +
    "[GitHub](https://github.com/resulkilinc) · [Portfolio](https://resulkilinc.com/portfolio.html) · [Contact](https://resulkilinc.com/portfolio.html#contact)";
  return language === "en" ? en : tr;
}

function composeFrontendOpinionSummary(language, query, currentPage) {
  var tr =
    "Resul’un frontend tarafında net bilgi mimarisi, bileşen düşüncesi ve mikro-etkileşim disiplini öne çıkar. " +
    "**React** ve **Next.js** için routing, state ve performansı ihtiyaca göre (SSR/SSG/ISR, Context/Zustand vb.) seçer. Bu site **statik**; Next.js ayrı bir yetkinlik alanı olarak özetlenir.\n\n" +
    "[Portföy](https://resulkilinc.com/portfolio.html) · [GitHub](https://github.com/resulkilinc)";
  var en =
    "Resul’s frontend work emphasizes information architecture, component thinking, and micro-interactions. " +
    "On **React** / **Next.js**, he chooses routing, state, and performance patterns (SSR/SSG/ISR, Context/Zustand, etc.) as needed. This site is **static**; Next.js is listed as a separate skill.\n\n" +
    "[Portfolio](https://resulkilinc.com/portfolio.html) · [GitHub](https://github.com/resulkilinc)";
  return language === "en" ? en : tr;
}

/**
 * @param {"tr"|"en"} language
 * @param {any[]} topDocs
 * @param {"balanced"|"source_first"} mode
 */
function composeSummary(language, topDocs, mode) {
  if (!topDocs.length) {
    return language === "en"
      ? "I could not find a strong local match for this query. Try a more specific prompt."
      : "Bu soru icin guclu bir yerel eslesme bulamadim. Daha spesifik bir soru deneyebilirsin.";
  }

  return focusExcerptFromQuery("", topDocs[0].text, language === "en" ? 780 : 820);
}

/**
 * @param {string} query
 * @returns {{
 *   language: "tr"|"en",
 *   summary: string,
 *   highlights: string[],
 *   confidence: { level: "high"|"medium"|"low", score: number },
 *   sources: { label: string, url: string, snippet: string }[],
 *   suggested: { title: string, url: string }[],
 *   previewText: string
 * }}
 */
export function answerQuery(query, opts) {
  var options = opts || {};
  var mode = options.mode === "source_first" ? "source_first" : "balanced";
  var language = detectLanguage(query);
  var currentPage = String(options.currentPage || "/");
  var userIntent = options.userIntent || detectUserIntent(query);
  var intent = classifyIntent(query);
  var queryTokens = tokenize(query);
  var requestedTopK = Number(options.maxSources || 5);
  if (!Number.isFinite(requestedTopK)) requestedTopK = 5;
  requestedTopK = Math.max(1, Math.min(10, Math.round(requestedTopK)));

  if (isGreetingQuery(query)) {
    var greetingSummary = composeGreetingSummary(language, currentPage, userIntent);
    return {
      language: language,
      mode: mode,
      summary: greetingSummary,
      highlights: [],
      confidence: { level: "high", score: 7.2 },
      sources: [],
      suggested: [],
      suggestions: [],
      deepLinks: buildDeepLinks(currentPage, language),
      currentPage: currentPage,
      userIntent: userIntent,
      previewText: greetingSummary,
      metrics: {
        corpusSize: INDEX.docs.length,
        retrievedCount: 0,
        sourceCount: 0,
        topScore: 7.2,
        requestedTopK: requestedTopK,
      },
      audit: {
        query: String(query || ""),
        queryTokens: queryTokens,
        requestedMode: mode,
        appliedMode: mode,
        candidates: [],
      },
    };
  }

  if (intent === "chitchat") {
    var chatSummary = composeChitChatSummary(language, currentPage);
    return {
      language: language,
      mode: mode,
      summary: chatSummary,
      highlights: [],
      confidence: { level: "high", score: 6.9 },
      sources: [],
      suggested: [],
      suggestions: [],
      deepLinks: buildDeepLinks(currentPage, language),
      currentPage: currentPage,
      userIntent: userIntent,
      previewText: chatSummary,
      metrics: {
        corpusSize: INDEX.docs.length,
        retrievedCount: 0,
        sourceCount: 0,
        topScore: 6.9,
        requestedTopK: requestedTopK,
      },
      audit: {
        query: String(query || ""),
        queryTokens: queryTokens,
        requestedMode: mode,
        appliedMode: mode,
        candidates: [],
      },
    };
  }

  if (intent === "gibberish") {
    var gibberishSummary = composeGibberishSummary(language);
    return {
      language: language,
      mode: mode,
      summary: gibberishSummary,
      highlights: [],
      confidence: { level: "low", score: 0 },
      sources: [],
      suggested: [],
      suggestions: [],
      deepLinks: buildDeepLinks(currentPage, language),
      currentPage: currentPage,
      userIntent: userIntent,
      previewText: gibberishSummary,
      metrics: {
        corpusSize: INDEX.docs.length,
        retrievedCount: 0,
        sourceCount: 0,
        topScore: 0,
        requestedTopK: requestedTopK,
      },
      audit: {
        query: String(query || ""),
        queryTokens: queryTokens,
        requestedMode: mode,
        appliedMode: mode,
        candidates: [],
      },
    };
  }

  if (intent === "live_data_request") {
    var liveSummary = composeLiveDataSummary(language, query, currentPage);
    return {
      language: language,
      mode: mode,
      summary: liveSummary,
      highlights: [],
      confidence: { level: "high", score: 6.6 },
      sources: [],
      suggested: [],
      suggestions: [],
      deepLinks: buildDeepLinks(currentPage, language),
      currentPage: currentPage,
      userIntent: userIntent,
      previewText: liveSummary,
      metrics: {
        corpusSize: INDEX.docs.length,
        retrievedCount: 0,
        sourceCount: 0,
        topScore: 6.6,
        requestedTopK: requestedTopK,
      },
      audit: {
        query: String(query || ""),
        queryTokens: queryTokens,
        requestedMode: mode,
        appliedMode: mode,
        candidates: [],
      },
    };
  }

  // High-priority deterministic routes: do not let retrieval "wander".
  if (isSiteStackQuery(query)) {
    var siteStack = composeSiteStackSummary(language, currentPage);
    return {
      language: language,
      mode: mode,
      summary: siteStack,
      highlights: [],
      confidence: { level: "high", score: 7.6 },
      sources: [],
      suggested: [],
      suggestions: [],
      deepLinks: buildDeepLinks(currentPage, language),
      currentPage: currentPage,
      userIntent: userIntent,
      previewText: siteStack,
      metrics: {
        corpusSize: INDEX.docs.length,
        retrievedCount: 0,
        sourceCount: 0,
        topScore: 7.6,
        requestedTopK: requestedTopK,
      },
      audit: {
        query: String(query || ""),
        queryTokens: queryTokens,
        requestedMode: mode,
        appliedMode: mode,
        candidates: [],
      },
    };
  }

  if (isFrontendQuery(query)) {
    var fe = composeFrontendOpinionSummary(language, query, currentPage);
    return {
      language: language,
      mode: mode,
      summary: fe,
      highlights: [],
      confidence: { level: "high", score: 7.1 },
      sources: [],
      suggested: [],
      suggestions: [],
      deepLinks: buildDeepLinks(currentPage, language),
      currentPage: currentPage,
      userIntent: userIntent,
      previewText: fe,
      metrics: {
        corpusSize: INDEX.docs.length,
        retrievedCount: 0,
        sourceCount: 0,
        topScore: 7.1,
        requestedTopK: requestedTopK,
      },
      audit: {
        query: String(query || ""),
        queryTokens: queryTokens,
        requestedMode: mode,
        appliedMode: mode,
        candidates: [],
      },
    };
  }

  if (isOffTopicQuery(query)) {
    var offTopicMsg =
      language === "en"
        ? "I am Resul's professional assistant. I focus on his engineering and product work. Ask me about architecture, AI projects, UX decisions, or career scope."
        : "Ben Resul'un profesyonel asistaniyim. Odagim muhendislik ve urun calismalari. Mimari, AI projeleri, UX kararları veya kariyer kapsaminda sorular sorabilirsin.";
    return {
      language: language,
      mode: mode,
      summary: offTopicMsg,
      highlights: [],
      confidence: { level: "medium", score: 3.2 },
      sources: [],
      suggested: [],
      suggestions: [],
      deepLinks: buildDeepLinks(currentPage, language),
      currentPage: currentPage,
      userIntent: userIntent,
      previewText: offTopicMsg,
      metrics: {
        corpusSize: INDEX.docs.length,
        retrievedCount: 0,
        sourceCount: 0,
        topScore: 3.2,
        requestedTopK: requestedTopK,
      },
      audit: {
        query: String(query || ""),
        queryTokens: queryTokens,
        requestedMode: mode,
        appliedMode: mode,
        candidates: [],
      },
    };
  }

  if (intent === "out_of_scope") {
    var oos = composeOutOfScopeSummary(language, currentPage);
    return {
      language: language,
      mode: mode,
      summary: oos,
      highlights: [],
      confidence: { level: "medium", score: 3.6 },
      sources: [],
      suggested: [],
      suggestions: [],
      deepLinks: buildDeepLinks(currentPage, language),
      currentPage: currentPage,
      userIntent: userIntent,
      previewText: oos,
      metrics: {
        corpusSize: INDEX.docs.length,
        retrievedCount: 0,
        sourceCount: 0,
        topScore: 3.6,
        requestedTopK: requestedTopK,
      },
      audit: {
        query: String(query || ""),
        queryTokens: queryTokens,
        requestedMode: mode,
        appliedMode: mode,
        candidates: [],
      },
    };
  }

  var retrieved = retrieve(query, { maxSources: requestedTopK });
  var best = retrieved[0];
  var topScore = best ? best.score : 0;
  var topDocs = retrieved.map(function (x) { return x.doc; });
  var sources = retrieved.slice(0, requestedTopK).map(function (x) { return x.doc; });
  
  var hintTopic = getHintBasedTopic(query);

  // Fallback for low confidence but valid queries or short hints
  if (topScore < 3.2) {
    if (hintTopic) {
      var hintMsgTr = "İlettiğiniz '" + query.trim() + "' kavramı Resul'un " + hintTopic + " konusunu çağrıştırıyor. Bu alandaki detaylı analizi incelemek ister misiniz?";
      var hintMsgEn = "The term '" + query.trim() + "' you provided evokes Resul's expertise in " + hintTopic + ". Would you like to review the detailed analysis in this area?";
      
      return {
        language: language,
        mode: mode,
        summary: language === "en" ? hintMsgEn : hintMsgTr,
        highlights: [],
        confidence: { level: "medium", score: 3.5 },
        sources: retrieved.slice(0, 2).map(function(x){ return x.doc; }),
        suggested: [],
        suggestions: getThemedSuggestions(userIntent, language),
        deepLinks: buildDeepLinks(currentPage, language),
        currentPage: currentPage,
        userIntent: userIntent,
        previewText: language === "en" ? hintMsgEn : hintMsgTr,
        metrics: {
          corpusSize: INDEX.docs.length,
          retrievedCount: retrieved.length,
          sourceCount: retrieved.length,
          topScore: 3.5,
          requestedTopK: requestedTopK,
        },
        audit: {
          query: String(query || ""),
          queryTokens: queryTokens,
          requestedMode: options.mode || "balanced",
          appliedMode: mode,
        },
      };
    }

    var unclearSummary = composeUnclearTopicSummary(language, userIntent);
    return {
      language: language,
      mode: mode,
      summary: unclearSummary,
      highlights: [],
      confidence: { level: "low", score: Number(topScore.toFixed(2)) },
      sources: retrieved.slice(0, 3).map(function(x){ return x.doc; }), 
      suggested: [],
      suggestions: getThemedSuggestions(userIntent, language),
      deepLinks: buildDeepLinks(currentPage, language),
      currentPage: currentPage,
      userIntent: userIntent,
      previewText: unclearSummary,
      metrics: {
        corpusSize: INDEX.docs.length,
        retrievedCount: retrieved.length,
        sourceCount: retrieved.length,
        topScore: Number(topScore.toFixed(2)),
        requestedTopK: requestedTopK,
      },
      audit: {
        query: String(query || ""),
        queryTokens: queryTokens,
        requestedMode: options.mode || "balanced",
        appliedMode: mode,
        candidates: buildAuditCandidates(retrieved),
      },
    };
  }

  var summary = composePersonaSummary(language, query, topDocs);
  var highlights = topDocs.slice(0, 3).map(function (d) {
    return d.title + ": " + d.text;
  });
  var level = confidenceBucket(topScore);
  var confidence = { level: level, score: Number(topScore.toFixed(2)) };
  var suggested = level === "low" ? suggestExternalSources(query) : [];

  return {
    language: language,
    mode: mode,
    summary: summary,
    highlights: highlights,
    confidence: confidence,
    sources: sources,
    suggested: suggested,
    suggestions: [],
    deepLinks: buildDeepLinks(currentPage, language),
    currentPage: currentPage,
    userIntent: userIntent,
    previewText: summary,
    metrics: {
      corpusSize: INDEX.docs.length,
      retrievedCount: retrieved.length,
      sourceCount: sources.length,
      topScore: confidence.score,
      requestedTopK: requestedTopK,
    },
    audit: {
      query: String(query || ""),
      queryTokens: queryTokens,
      requestedMode: options.mode === "source_first" ? "source_first" : "balanced",
      appliedMode: mode,
      candidates: buildAuditCandidates(retrieved),
    },
  };
}

/**
 * @param {string} query
 */
export async function* streamAnswer(query, opts) {
  var options = opts || {};
  var result = options.result || answerQuery(query, options);
  var full = String((result && result.summary) || "");
  var chunk = "";
  for (var i = 0; i < full.length; i++) {
    chunk += full[i];
    if (full[i] === " " || full[i] === "\n" || chunk.length >= 14 || i === full.length - 1) {
      yield chunk;
      chunk = "";
      await new Promise(function (r) {
        setTimeout(r, 10 + Math.random() * 16);
      });
    }
  }
}

export { ALL as ALL_SNIPPETS };
