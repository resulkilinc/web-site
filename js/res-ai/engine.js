/**
 * ReK AI retrieval + grounded response composer.
 * Local RAG-like pipeline: tokenize -> retrieve -> rank -> compose -> cite.
 * Version: 2026.03.29 - Resul-Centric Overhaul
 */

import { CORE_SNIPPETS } from "./knowledge-core.js?v=20260330f";
import { EXTENDED_SNIPPETS } from "./knowledge-extended.js?v=20260330f";
import { PORTFOLIO_SNIPPETS } from "./knowledge-portfolio.js?v=20260330f";
import { GENERATED_SNIPPETS } from "./knowledge-generated.js?v=20260330f";

const ALL = [...GENERATED_SNIPPETS, ...PORTFOLIO_SNIPPETS, ...CORE_SNIPPETS, ...EXTENDED_SNIPPETS];

const TR_HINTS = ["hangi", "nasıl", "neden", "proje", "yetenek", "deneyim", "mühendislik", "kaynak", "kazanım", "değer", "başarı", "staj", "vizyon"];
const EN_HINTS = ["which", "what", "how", "project", "experience", "skills", "architecture", "source", "growth", "value", "achievement", "intern", "vision"];

const DOMAIN_KEYWORDS = [
  "react", "nextjs", "next.js", "zustand", "redux", "context", "ssr", "ssg", "isr", "framework",
  "typescript", "tailwind", "framer", "vanta", "ui", "ux", "frontend", "backend", "data", "veri",
  "bi", "kpi", "quality", "kalite", "google", "antigravity", "discipline", "disiplin", "cnn",
  "random forest", "rag", "zeytin", "oliv", "muhendis", "engineer", "portfolio", "proje",
  "kariyer", "erasmus", "diferansiyel", "sayisal", "numerical", "cauchy", "hazırlık", "hazirlik",
  "ingilizce", "english", "eğitim", "egitim", "akış", "akis", "workflow", "yazılım", "yazilim",
  "staj", "intern", "pwr", "lehistan", "polonya", "poland", "ders", "okul", "university",
  "üniversite", "iha", "uav", "teknofest", "siber", "cyber", "security", "devops", "blockchain",
  "qa", "testing", "sualtı", "su altı", "underwater", "antigravity", "feedback", "bug", "report",
  "issue", "hiring", "strategy", "leadership", "innovation", "vision", "career goals",
  "problem solving", "debugging", "teamwork", "collaboration", "clean code", "sustainability",
  "a11y", "accessibility", "ci/cd", "automation", "technical writing", "documentation",
  "system design", "scalability", "modern web", "performance optimization", "digital twin",
  "representative", "senior mindset", "fizyoterapi", "physio", "mayın", "minesweeper",
  "android", "bento", "dergipark", "orcid", "bulgaristan", "bulgaria", "lodz", "ksü", "ksu",
  "kahramanmaraş", "prensip", "strateji", "deneyim", "tecrübe", "yetenek", "beceri",
  "naber", "nasılsın", "kimsin", "selam", "merhaba", "github", "linkedin", "instagram", "medium", 
  "whatsapp", "twitter", "eposta", "mail", "cv", "resume", "fronted", "ürün", "hizmet", "destek", "yardım", "service", "support", "product", "help", "reusl"
];

const SYNONYM_MAP = {
  "arayuz": ["frontend", "ui", "tasarım", "react"],
  "arayüz": ["frontend", "ui", "tasarım", "react"],
  "onyüz": ["frontend", "ui", "react"],
  "bug": ["hata", "sorun", "debugging", "izolasyon"],
  "hata": ["bug", "sorun", "debugging", "izolasyon"],
  "veri": ["sql", "data", "bi", "raporlama", "veritabanı"],
  "data": ["sql", "veri", "bi", "raporlama"],
  "yapay zeka": ["ai", "rag", "ml", "model", "makine öğrenimi"],
  "ai": ["yapay zeka", "rag", "ml", "model"],
  "mobil": ["android", "kotlin", "mvvm", "jetpack", "app"],
  "app": ["mobil", "uygulama", "android"],
  "mülakat": ["staj", "işe alım", "ik", "hr"],
  "takım": ["ekip", "koordinasyon", "iletişim", "mentorluk"],
  "ekip": ["takım", "koordinasyon", "iletişim"]
};

const RECOMMENDATIONS_TR = ["Zeytin Projesi", "React & Next.js", "Erasmus Deneyimi", "TEKNOFEST İHA", "Mayın Tarlası Oyunu", "İletişim Bilgileri"];
const RECOMMENDATIONS_EN = ["Olive Project", "React & Next.js", "Erasmus Experience", "TEKNOFEST UAV", "Minesweeper Game", "Contact Info"];

// Minimum score a doc must reach for a confident answer (raised from 3.0)
const MIN_CONFIDENCE = 5.5;

const OFFTOPIC_KEYWORDS = [
  "yemek", "yemeliyim", "hava", "burc", "fal", "magazin", "recipe", "dinner", "lunch", "breakfast",
  "siyaset", "parti", "din", "inanç", "maaş", "ücret", "para", "sevgili", "aile", "numara", "telefon",
  "evlen", "boyun kaç", "kilon kaç", "adres", "evli", "bekar", "aşk"
];

const GREETING_KEYWORDS = ["merhaba", "selam", "kimsin", "hello", "hi", "hey", "good morning", "good evening", "iyi günler"];
const CHITCHAT_KEYWORDS = [
  "nasilsin", "nasılsın", "iyi misin", "iyiyim", "tesekkur", "teşekkür", "sag ol", "sağ ol",
  "ne yapiyorsun", "ne yapıyorsun", "naber", "napıyorsun", "napıyon", "napıyonuz",
  "how are you", "what's up", "i am fine", "im fine", "thank you", "thanks", "doing well"
];

/**
 * @typedef {"greeting"|"chitchat"|"portfolio_info"|"technical_deep_dive"|"career_or_hiring"|"live_data_request"|"out_of_scope"|"education_research"} RekIntent
 */

function detectLanguage(q) {
  var s = String(q || "").toLowerCase();
  if (/[ğüşöçıİĞÜŞÖÇ]/.test(s)) return "tr";
  var trScore = 0;
  var enScore = 0;
  TR_HINTS.forEach(function (h) { if (s.indexOf(h) !== -1) trScore += 1; });
  EN_HINTS.forEach(function (h) { if (s.indexOf(h) !== -1) enScore += 1; });
  return enScore > trScore ? "en" : "tr";
}

function tokenize(q) {
  var s = (q || "").toLowerCase();
  try {
    s = s.replace(/[^\p{L}\p{N}+]/gu, " ");
  } catch (e) {
    s = s.replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ\s+]/gi, " ");
  }
  return s.split(/\s+/).filter(function (t) { return t && t.length > 1; });
}

/**
 * Strips common Turkish inflectional suffixes to improve fuzzy token matching.
 * e.g. "staja" → "staj", "resulu" → "resul", "mühendisim" → "mühendis"
 */
function stemTurkish(token) {
  var t = String(token || "").toLowerCase();
  var minStem = 3;
  // Ordered longest-first to prevent double-stripping
  var suffixes = [
    // Question + person endings
    "mıyım", "miyim", "muyum", "müyüm",
    "mısın", "misin", "musun", "müsün",
    "mılar", "miler", "mular", "müler",
    // Necessity / obligation forms
    "malıyım", "meliyim", "malısın", "melisin",
    "malıyız", "meliyiz",
    "malı", "meli",
    // Plural + case (longer first)
    "lardan", "lerden", "larla", "lerle", "larda", "lerde",
    "larına", "lerine", "larını", "lerini",
    "lara", "lere", "ları", "leri", "lar", "ler",
    // Buffer consonant + case
    "ndan", "nden", "ndaki", "ndeki",
    "nda", "nde", "nın", "nin", "nun", "nün",
    "na", "ne", "nı", "ni", "nu", "nü",
    // Ablative
    "rdan", "rden", "tan", "ten", "dan", "den",
    // Locative
    "rda", "rde", "taki", "teki", "daki", "deki",
    "ta", "te", "da", "de",
    // Dative
    "ya", "ye",
    // Genitive
    "ın", "in", "un", "ün",
    // Accusative + buffer
    "yı", "yi", "yu", "yü",
    // Instrumental
    "yla", "yle", "la", "le",
    // Short accusative
    "ı", "i", "u", "ü",
    // Short dative
    "a", "e",
  ];
  for (var i = 0; i < suffixes.length; i++) {
    var suf = suffixes[i];
    if (t.length > suf.length + minStem && t.slice(-suf.length) === suf) {
      return t.slice(0, t.length - suf.length);
    }
  }
  return t;
}

function getTransitionMarker(intent, isSecond) {
  if (isSecond) return "\n\n**Ek bağlam olarak şundan da bahsedebilirim:**\n";
  if (intent === "career_or_hiring") return "**Profesyonel iş anlayışım çerçevesinde durum şöyledir:**\n\n";
  if (intent === "technical_deep_dive") return "**Teknik detaylar ve mühendislik yaklaşımım şu şekildedir:**\n\n";
  if (intent === "education_research") return "**Akademik ve gelişim vizyonumdan yola çıkarak:**\n\n";
  return "";
}

function focusExcerptFromQuery(query, text, maxChars) {
  var limit = typeof maxChars === "number" ? maxChars : 850;
  var body = String(text || "").trim();
  if (!body) return "";
  if (body.length <= limit) return body;

  var qTokens = tokenize(query).filter(function (t) { return t.length > 2; });
  // Split securely by newlines. If lines are too short, group them or fallback to sentences
  var blocks = body.split(/\n+/g).filter(Boolean);
  if (blocks.length === 1) {
    blocks = body.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [body];
  }

  var scored = blocks.map(function (blk) {
    var sl = blk.toLowerCase();
    var score = 0;
    qTokens.forEach(function (tok) { if (sl.indexOf(tok) !== -1) score += 4; });
    return { blk: blk.trim(), score: score };
  });
  scored.sort(function (a, b) { return b.score - a.score; });
  var picked = [];
  var len = 0;
  for (var i = 0; i < scored.length; i++) {
    var s = scored[i].blk;
    if (len + s.length + 2 > limit && picked.length > 0) break;
    picked.push(s);
    len += s.length + 2;
  }
  // Return maintaining original block structure spacing
  return picked.join("\n\n").trim();
}

function buildDocIndex() {
  var docs = ALL.map(function (sn) {
    var full = (sn.title + " " + sn.text + " " + (sn.tags || []).join(" ")).toLowerCase();
    var tokens = tokenize(full);
    var stemmedTokens = tokens.map(stemTurkish);
    return Object.assign({}, sn, { __full: full, __tokens: tokens, __stemmedTokens: stemmedTokens, __lang: detectLanguage(full) });
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
  Object.keys(df).forEach(function (t) { idf[t] = Math.log((N + 1) / (df[t] + 1)) + 1; });
  return { docs: docs, idf: idf };
}

const INDEX = buildDocIndex();

function countToken(tokens, token) {
  var count = 0;
  if (!tokens) return 0;
  for (var i = 0; i < tokens.length && count < 4; i++) {
    if (tokens[i] === token) count += 1;
  }
  return count;
}

function scoreDoc(query, doc, queryLang, intent) {
  var qTokens = tokenize(query);
  var score = 0;
  
  // 1. Basic TF-IDF Scoring
  qTokens.forEach(function (t) {
    var tf = countToken(doc.__tokens, t);
    if (!tf) return;
    var w = INDEX.idf[t] || 1;
    score += (1 + Math.min(tf, 3) * 0.6) * w;
  });

  // 2. Optimized Tag & Title Boosting (Systemic Fix)
  qTokens.forEach(function (t) {
    const isDomain = DOMAIN_KEYWORDS.indexOf(t) !== -1;
    const inTags = (doc.tags || []).some(tag => tokenize(String(tag)).indexOf(t) !== -1);
    const inTitle = doc.title && tokenize(doc.title).indexOf(t) !== -1;

    if (inTags) {
      // Tags are high-intent. If it matches a domain key, give massive weight.
      score += isDomain ? 5.5 : 3.0;
    }
    if (inTitle) {
      // Title matches are clear indicators of subject.
      score += isDomain ? 4.0 : 2.0;
    }
  });

  // 2.5. Stemmed Turkish morphology matching & Synonym Expansion
  // e.g. "staja" → "staj", "resulu" → "resul" — fixes near-zero scores for inflected queries
  var expandedTokens = [];
  qTokens.forEach(function (t) {
    expandedTokens.push(t);
    var st = stemTurkish(t);
    if (st !== t && st.length >= 3) expandedTokens.push(st);
    
    // Check synonym map
    var lookup = SYNONYM_MAP[st] || SYNONYM_MAP[t];
    if (lookup) {
      lookup.forEach(function(syn) { expandedTokens.push(syn); });
    }
  });

  // Remove duplicates for efficient scanning
  var uniqueExpTokens = expandedTokens.filter(function (item, pos) { return expandedTokens.indexOf(item) === pos; });

  uniqueExpTokens.forEach(function (st) {
    if (st.length < 3 && !SYNONYM_MAP[st]) return; // too short unless it's a specific mapped IT keyword (like "ai", "hr")

    var isDomainStem = DOMAIN_KEYWORDS.indexOf(st) !== -1;
    var inTagsStem = (doc.tags || []).some(function (tag) {
      var tagStr = String(tag).toLowerCase();
      return tagStr === st ||
        tagStr.startsWith(st) ||
        tokenize(tagStr).some(function (tt) { return tt === st || stemTurkish(tt) === st; });
    });
    var inTitleStem = !!(doc.title && doc.title.toLowerCase().indexOf(st) !== -1);
    var inStemmedTokens = (doc.__stemmedTokens || []).indexOf(st) !== -1;

    if (inTagsStem) {
      score += isDomainStem ? 4.5 : 2.5;
    } else if (inTitleStem) {
      score += isDomainStem ? 3.0 : 1.5;
    } else if (inStemmedTokens) {
      score += isDomainStem ? 1.5 : 0.8;
    }
  });

  // 3. Metadata weighting
  if (doc.source && doc.source.kind === "paper") score += 0.6;
  if (doc.__lang === queryLang) score += 0.35;

  // 4. Contextual Disambiguation (Word Sense Disambiguation Matrix)
  if (doc.source && doc.source.kind && intent) {
    var k = doc.source.kind;
    if (intent === "education_research") {
      if (k === "academic" || k === "section") {
        score *= 1.35; // Semantic boost for academic queries
      } else if (k === "paper" || k === "project") {
        score *= 0.5; // Context penalty! If they asked about school, penalize ML models
      }
    } else if (intent === "technical_deep_dive") {
      if (k === "paper" || k === "project") {
        score *= 1.35; // Semantic boost for technical queries
      } else if (k === "academic" || k === "perspective") {
        score *= 0.5; // Context penalty!
      }
    } else if (intent === "career_or_hiring") {
      if (k === "perspective" || k === "section") {
        score *= 1.25;
      }
    }
  }

  return score;
}

function retrieve(query, opts) {
  var q = String(query || "").trim();
  if (!q) return [];
  var options = opts || {};
  var queryLang = detectLanguage(q);
  var intent = options.intent || "portfolio_info";
  var scored = INDEX.docs.map(function (doc) {
    return { doc: doc, score: scoreDoc(q, doc, queryLang, intent) };
  }).filter(function (x) { return x.score > 0.1; })
    .sort(function (a, b) { return b.score - a.score; });
  return scored;
}

/**
 * Validate that a query has enough signal to be worth searching.
 * Rules:
 *  - Must contain a DOMAIN keyword (topic), OR
 *  - Must contain "resul" (direct address), OR
 *  - Must be a command verb WITH a specific subject (tell me about X), OR
 *  - Must be long enough (>40 chars) suggesting a real question.
 * A bare question word like "neden" alone is NOT sufficient.
 */
function isQueryMeaningful(query) {
  var q = String(query || "").trim().toLowerCase();
  if (q.length < 3) return false;

  // Always meaningful if domain keyword is present
  if (DOMAIN_KEYWORDS.some(function(k) { return q.indexOf(k) !== -1; })) return true;

  // Always meaningful if Resul's name is explicitly mentioned
  if (q.indexOf("resul") !== -1) return true;

  // Command verbs that imply a subject follows (only count if query > 10 chars)
  var commandVerbs = ["anlat", "söyle", "göster", "açıkla", "tell", "explain", "describe", "list", "show"];
  if (q.length > 10 && commandVerbs.some(function(v) { return q.indexOf(v) !== -1; })) return true;

  // Long queries (>40 chars) are likely real questions even without keywords
  if (q.length > 40) return true;

  // Lone question words ("neden", "nasıl", "ne", "why", "how") without a topic → NOT meaningful
  return false;
}

function confidenceBucket(top) {
  if (top >= 6.0) return "high";
  if (top >= 3.0) return "medium";
  return "low";
}

function classifyIntent(query) {
  var q = String(query || "").toLowerCase();
  
  if (OFFTOPIC_KEYWORDS.some(function(k) { return q.indexOf(k) !== -1; })) return "out_of_scope";
  
  if (!q) return "chitchat";
  if (GREETING_KEYWORDS.some(function(k) { return q.indexOf(k) !== -1; })) return "greeting";
  if (CHITCHAT_KEYWORDS.some(function(k) { return q.indexOf(k) !== -1; })) return "chitchat";
  
  var hiringPatterns = [
    "staj", "intern", "hr ", "ik ", "işe al", "ise al", "almalı", "alabilir", "çalışmalı",
    "neden resul", "neden çalış", "işe gir", "teklif", "mülakat", "interview"
  ];
  if (hiringPatterns.some(function(p) { return q.indexOf(p) !== -1; })) return "career_or_hiring";
  
  var eduPatterns = ["okul", "üniversite", "erasmus", "öğrenci", "eğitim", "kaçıncı", "mezun", "not", "ders"];
  if (eduPatterns.some(function(p) { return q.indexOf(p) !== -1; })) return "education_research";

  var techPatterns = ["model", "doğruluk", "algoritma", "başarı", "veri", "sınıflandırmak", "mimari", "kod", "performans", "optimizasyon", "teknoloji"];
  if (techPatterns.some(function(p) { return q.indexOf(p) !== -1; })) return "technical_deep_dive";

  return "portfolio_info";
}

function composeGreetingSummary(language) {
  return language === "en"
    ? "Hello! I am Resul Kılınç's professional digital assistant. How can I assist you regarding his engineering career or technical projects?"
    : "Merhaba! Ben Resul Kılınç'ın profesyonel dijital asistanıyım. Resul'un mühendislik kariyeri veya teknik projeleri hakkında size nasıl yardımcı olabilirim?";
}

function composeChitChatSummary(language) {
  return language === "en"
    ? "I'm here representing Resul. It's a great time to discuss his vision or technical depth. What would you like to know?"
    : "Resul'un profesyonel vizyonunu temsil etmek için buradayım. Kendisinin derinliği veya gelecek hedefleri hakkında neyi merak ediyorsunuz?";
}

function composePersonaSummary(language, query, retrievedObjects, intent) {
  if (!retrievedObjects || !retrievedObjects.length) return "";
  
  var topLevelDoc = retrievedObjects[0].doc;
  var topLevelScore = retrievedObjects[0].score;
  var isTr = language === "tr";
  
  var prefix1 = isTr ? getTransitionMarker(intent, false) : "";
  var baseText = prefix1 + focusExcerptFromQuery(query, topLevelDoc.text, language === "en" ? 800 : 850);

  // Synthesize multi-source if secondary match is highly relevant & distinct
  if (retrievedObjects.length > 1) {
    var secDoc = retrievedObjects[1].doc;
    var secScore = retrievedObjects[1].score;
    
    // Competitive score threshold config (e.g. > 75% of top score) to prevent context clash
    if (secDoc.id !== topLevelDoc.id && secScore > (topLevelScore * 0.75) && secScore > 5.0) {
      var prefix2 = isTr ? getTransitionMarker(intent, true) : "\n\n**Additionally:**\n";
      var secText = focusExcerptFromQuery(query, secDoc.text, 400);
      
      // Basic anti-duplication checkpoint
      if (baseText.indexOf(secText.slice(0, 30)) === -1) {
        baseText += prefix2 + secText;
      }
    }
  }
  return baseText;
}

export function answerQuery(query, opts) {
  var options = opts || {};
  var language = detectLanguage(query);
  var intent = classifyIntent(query);

  // 1. Guardrail Interception (Out of Scope Firewall)
  if (intent === "out_of_scope") {
    var outText = language === "en"
      ? "I am Resul Kılınç's professional AI assistant. I am not authorized to discuss private life, personal relationships, financial matters, politics, or topics outside of my professional boundaries. However, I would be delighted to answer your questions regarding his engineering vision, software projects, and technical skills."
      : "Ben Resul Kılınç'ın profesyonel yapay zeka asistanıyım. Özel hayat, dini inanç, siyasi görüşler, finansal konular veya mesleki sınırlarımın dışındaki hususlar hakkında bilgi sunma yetkim yok. Ancak kendisinin yazılım projeleri, mühendislik vizyonu ve yetenekleri hakkındaki sorularınızı yanıtlamaktan memnuniyet duyarım.";
    return {
      language: language,
      summary: outText,
      confidence: { level: "high", score: 10.0 },
      sources: [],
      previewText: "Kapsam dışı bariyer / Guardrail intercepted",
      suggestions: language === "en" ? RECOMMENDATIONS_EN : RECOMMENDATIONS_TR,
      metrics: { topScore: 10.0, corpusSize: INDEX.docs.length }
    };
  }

  var retrieved = retrieve(query, { maxSources: 5, intent: intent });
  var bestMatch = retrieved[0];
  var topScore = bestMatch ? bestMatch.score : 0;
  var topDocs = retrieved.map(x => x.doc);

  // 2. Query Meaningfulness Gate: if query has no signal, skip search entirely
  if (!isQueryMeaningful(query)) {
    intent = "chitchat";
    topScore = 0;
  }

  // 3. Confidence Threshold: raised to MIN_CONFIDENCE (5.5) to prevent low-signal matches
  if (topScore > MIN_CONFIDENCE || (intent === "greeting" && topScore > 1.2)) {
    var summary = composePersonaSummary(language, query, retrieved, intent);
    return {
      language: language,
      summary: summary,
      confidence: { level: confidenceBucket(topScore), score: Number(topScore.toFixed(2)) },
      sources: topDocs.slice(0, 3),
      previewText: summary,
      metrics: { topScore: topScore, corpusSize: INDEX.docs.length }
    };
  }

  // Diversified fallback handlers with suggestions
  var fallbacks = language === "en" 
    ? [
        "I couldn't find a direct match, but I can discuss Resul's projects or skills if you specify a topic. Try asking about: " + RECOMMENDATIONS_EN.join(", ") + ".",
        "Could you please provide more detail? You might want to ask about: " + RECOMMENDATIONS_EN.slice(0, 3).join(", ") + " etc.",
        "I'm scanning Resul's background but need a bit more context. You can try queries like: " + RECOMMENDATIONS_EN[Math.floor(Math.random() * RECOMMENDATIONS_EN.length)] + "."
      ]
    : [
        "Bu konuda tam bir eşleşme bulamadım ama Resul'un projeleri veya yetenekleri hakkında konuşabiliriz. Şunları merak edebilirsiniz: " + RECOMMENDATIONS_TR.join(", ") + ".",
        "Lütfen biraz daha detay verebilir misiniz? Örneğin şunları sorabilirsiniz: " + RECOMMENDATIONS_TR.slice(0, 3).join(", ") + " vb.",
        "Resul'un dijital ikizi olarak bu soruyu tam anlayamadım. Şu konulara göz atabilirsiniz: " + RECOMMENDATIONS_TR[Math.floor(Math.random() * RECOMMENDATIONS_TR.length)] + "."
      ];
  
  var fallback = "";
  if (intent === "greeting") fallback = composeGreetingSummary(language);
  else if (intent === "chitchat") fallback = composeChitChatSummary(language);
  else {
    // Semi-randomized fallback to avoid "repeating" feeling
    var idx = (query.length + new Date().getSeconds()) % fallbacks.length;
    fallback = fallbacks[idx];
  }

  var suggestions = (topScore < 3.0) ? (language === "en" ? RECOMMENDATIONS_EN : RECOMMENDATIONS_TR) : [];

  return {
    language: language,
    summary: fallback,
    confidence: { level: "medium", score: 3.5 },
    sources: topDocs.slice(0, 2),
    previewText: fallback,
    suggestions: suggestions,
    metrics: { topScore: topScore, corpusSize: INDEX.docs.length }
  };
}

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
      await new Promise(r => setTimeout(r, 6 + Math.random() * 10));
    }
  }
}

export { ALL as ALL_SNIPPETS };
