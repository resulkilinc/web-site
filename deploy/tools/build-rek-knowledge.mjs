#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const SRC_FILES = {
  index: path.join(ROOT, "index.html"),
  portfolio: path.join(ROOT, "portfolio.html"),
  cvTr: path.join(ROOT, "assets", "cv", "cv-tr.pdf"),
  article: path.join(ROOT, "assets", "makale-zeytin.pdf"),
};
const EXTRA_SOURCE_DIR = path.join(ROOT, "rek-sources");
const OUT_FILE = path.join(ROOT, "js", "res-ai", "knowledge-generated.js");

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function decodeEntities(s) {
  return String(s || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(html) {
  return decodeEntities(String(html || ""))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstMatch(re, text) {
  const m = re.exec(text);
  return m ? m[1] || "" : "";
}

function getSectionHtml(pageHtml, sectionId) {
  const re = new RegExp(
    `<section[^>]*id=["']${sectionId}["'][^>]*>([\\s\\S]*?)<\\/section>`,
    "i"
  );
  return firstMatch(re, pageHtml);
}

function wordsToTags(text, cap = 12) {
  const map = new Set();
  String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ\s]/gi, " ")
    .split(/\s+/)
    .filter((t) => t && t.length > 2)
    .forEach((t) => map.add(t));
  return Array.from(map).slice(0, cap);
}

function mkSnippet(id, title, text, url, kind) {
  const clean = String(text || "").trim();
  if (!clean) return null;
  return {
    id,
    title,
    text: clean,
    tags: wordsToTags(`${title} ${clean}`),
    source: {
      label: `Portfolio · ${title}`,
      url,
      kind,
    },
  };
}

function collectPortfolioSnippets(portfolioHtml) {
  const sectionMap = [
    { id: "about", title: "Hakkinda", url: "portfolio.html#about", kind: "section" },
    { id: "education", title: "Egitim", url: "portfolio.html#education", kind: "section" },
    { id: "experience", title: "Deneyim", url: "portfolio.html#experience", kind: "section" },
    { id: "projects", title: "Projeler", url: "portfolio.html#projects", kind: "section" },
    { id: "workflow", title: "Is akisi", url: "portfolio.html#workflow", kind: "section" },
    { id: "skills", title: "Yetenekler", url: "portfolio.html#skills", kind: "section" },
    { id: "journal", title: "Yazilim gunlugu", url: "portfolio.html#journal", kind: "section" },
    { id: "res-ai", title: "ReK AI", url: "portfolio.html#res-ai", kind: "section" },
    { id: "contact", title: "Iletisim", url: "portfolio.html#contact", kind: "section" },
  ];

  const snippets = [];
  for (const s of sectionMap) {
    const html = getSectionHtml(portfolioHtml, s.id);
    const text = stripTags(html).slice(0, 1000);
    const sn = mkSnippet(`gen-${s.id}`, s.title, text, s.url, s.kind);
    if (sn) snippets.push(sn);
  }
  return snippets;
}

function collectIndexSnippet(indexHtml) {
  const hero = firstMatch(/<header[\s\S]*?<\/header>/i, indexHtml);
  const text = stripTags(hero).slice(0, 650);
  return mkSnippet("gen-index-hero", "Index Hero Ozeti", text, "index.html", "section");
}

function collectAssetSnippets() {
  const out = [];
  if (fs.existsSync(SRC_FILES.cvTr)) {
    out.push({
      id: "gen-cv-file",
      title: "CV dosyasi",
      text:
        "Ozgecimis TR ve EN surumleri assets/cv/ altinda; portfoyde CV indir uzerinden dil secimiyle indirilebilir (cv-tr.pdf, cv-en.pdf).",
      tags: ["cv", "ozgecmis", "resume", "education", "skills"],
      source: { label: "CV PDF (TR)", url: "assets/cv/cv-tr.pdf", kind: "pdf" },
    });
  }
  if (fs.existsSync(SRC_FILES.article)) {
    out.push({
      id: "gen-zeytin-paper-file",
      title: "Zeytin makalesi dosyasi",
      text:
        "assets/makale-zeytin.pdf dosyasi portfoyde kaynak olarak kullanilir. Zeytin olgunluk siniflandirmasi, veri seti ve model metriklerini referanslar.",
      tags: ["zeytin", "makale", "paper", "pdf", "ml", "efficientnet"],
      source: { label: "Makale PDF", url: "assets/makale-zeytin.pdf", kind: "paper" },
    });
  }
  return out;
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkFiles(p, out);
    else out.push(p);
  }
  return out;
}

function splitIntoChunks(text, chunkLen = 780) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const chunks = [];
  let start = 0;
  while (start < clean.length) {
    let end = Math.min(clean.length, start + chunkLen);
    if (end < clean.length) {
      const pivot = clean.lastIndexOf(". ", end);
      if (pivot > start + 220) end = pivot + 1;
    }
    chunks.push(clean.slice(start, end).trim());
    start = end;
  }
  return chunks.filter(Boolean);
}

function parseMarkdown(md) {
  const noFrontmatter = String(md || "").replace(/^---[\s\S]*?---\s*/m, "");
  const plain = noFrontmatter
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\*\*|__/g, "")
    .replace(/\*|_/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain;
}

function collectExtraSourceSnippets() {
  const out = [];
  const files = walkFiles(EXTRA_SOURCE_DIR).filter((f) =>
    /\.(md|txt)$/i.test(path.basename(f))
  );
  for (const f of files) {
    const raw = readText(f);
    const parsed = /\.md$/i.test(f) ? parseMarkdown(raw) : raw;
    const chunks = splitIntoChunks(parsed, 760);
    const rel = path.relative(ROOT, f).replace(/\\/g, "/");
    const base = path.basename(f).replace(/\.(md|txt)$/i, "");
    chunks.slice(0, 6).forEach((chunk, idx) => {
      out.push({
        id: `gen-extra-${base}-${idx + 1}`,
        title: `Ek kaynak · ${base}`,
        text: chunk,
        tags: wordsToTags(`${base} ${chunk}`),
        source: {
          label: `Ek kaynak · ${base}`,
          url: rel,
          kind: "md_source",
        },
      });
    });
  }
  return out;
}

function build() {
  const indexHtml = readText(SRC_FILES.index);
  const portfolioHtml = readText(SRC_FILES.portfolio);
  if (!indexHtml || !portfolioHtml) {
    throw new Error("index.html or portfolio.html not found.");
  }

  const generated = []
    .concat(collectPortfolioSnippets(portfolioHtml))
    .concat([collectIndexSnippet(indexHtml)].filter(Boolean))
    .concat(collectAssetSnippets())
    .concat(collectExtraSourceSnippets())
    .filter(Boolean);

  const outText =
    "/**\n" +
    " * AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.\n" +
    " * Generated by tools/build-rek-knowledge.mjs\n" +
    " */\n" +
    "export const GENERATED_SNIPPETS = " +
    JSON.stringify(generated, null, 2) +
    ";\n";

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, outText, "utf8");
  process.stdout.write(
    `ReK knowledge generated: ${path.relative(ROOT, OUT_FILE)} (${generated.length} snippets)\n`
  );
}

build();
