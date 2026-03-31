/**
 * DOM helpers for ReK AI chat transcript.
 */

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Removes legacy UI blocks still present in stored summaries or old payloads.
 * @param {string} md
 */
function stripLegacyAssistantMarkdown(md) {
  var lines = String(md || "").split(/\r?\n/);
  var badHeading =
    /^(#{1,4}\s*)?(Derin\s+baglantilar|Derin\s+bağlantılar|Devam\s+Et|Context\s+Check|Engineering\s+Breakdown|UX\s+Optimization|Kanıtlar|Kanitlar|Önerilen\s+kaynaklar|Onerilen\s+kaynaklar|Suggested\s+references|Deep\s+links|Continue)\s*:?\s*$/i;
  var junkLine =
    /\[SUGGESTION:|Yüksek\s+güven\s*·|Algilanan\s+niyet:|Mevcut\s+sayfa:/i;
  var out = [];
  var skip = false;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var t = line.trim();
    if (junkLine.test(t)) continue;
    if (badHeading.test(t)) {
      skip = true;
      continue;
    }
    if (skip) {
      if (t === "") {
        skip = false;
        continue;
      }
      if (/^#{1,4}\s+/.test(t) && !badHeading.test(t)) {
        skip = false;
        out.push(line);
      }
      continue;
    }
    out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function markdownToHtml(md) {
  var lines = String(md || "").split(/\r?\n/);
  var out = [];
  var inList = false;
  var inTable = false;
  var paragraph = [];

  function inlineFormat(s) {
    var html = escapeHtml(String(s || ""));
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s#]+(?:#[^)\s]+)?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    return html;
  }

  function flushParagraph() {
    if (!paragraph.length) return;
    out.push("<p>" + inlineFormat(paragraph.join(" ")) + "</p>");
    paragraph = [];
  }

  function closeList() {
    if (!inList) return;
    out.push("</ul>");
    inList = false;
  }

  function closeTable() {
    if (!inTable) return;
    out.push("</tbody></table>");
    inTable = false;
  }

  function isTableLine(line) {
    return /^\s*\|.+\|\s*$/.test(line);
  }

  function isTableSeparator(line) {
    return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      closeTable();
      continue;
    }

    if (/^##\s+/.test(trimmed) || /^###\s+/.test(trimmed)) {
      flushParagraph();
      closeList();
      closeTable();
      if (/^###\s+/.test(trimmed)) out.push("<h4>" + inlineFormat(trimmed.replace(/^###\s+/, "")) + "</h4>");
      else out.push("<h3>" + inlineFormat(trimmed.replace(/^##\s+/, "")) + "</h3>");
      continue;
    }

    if (isTableLine(trimmed) && i + 1 < lines.length && isTableSeparator(lines[i + 1].trim())) {
      flushParagraph();
      closeList();
      closeTable();
      var headers = trimmed
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map(function (c) {
          return "<th>" + inlineFormat(c.trim()) + "</th>";
        })
        .join("");
      out.push('<table class="rek-ai-md-table"><thead><tr>' + headers + "</tr></thead><tbody>");
      inTable = true;
      i += 1;
      continue;
    }

    if (inTable && isTableLine(trimmed)) {
      var cells = trimmed
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map(function (c) {
          return "<td>" + inlineFormat(c.trim()) + "</td>";
        })
        .join("");
      out.push("<tr>" + cells + "</tr>");
      continue;
    }

    if (/^-\s+/.test(trimmed)) {
      flushParagraph();
      closeTable();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push("<li>" + inlineFormat(trimmed.replace(/^-+\s+/, "")) + "</li>");
      continue;
    }

    closeList();
    closeTable();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  closeTable();
  return out.join("");
}

/**
 * @param {HTMLElement} container
 * @param {string} role
 * @param {string} htmlOrText
 * @param {boolean} [isHtml]
 */
export function appendBubble(container, role, htmlOrText, isHtml) {
  var wrap = document.createElement("div");
  wrap.className = "res-ai-chat__msg res-ai-chat__msg--" + role;
  var inner = document.createElement("div");
  inner.className = "res-ai-chat__bubble";
  if (isHtml) inner.innerHTML = htmlOrText;
  else inner.textContent = htmlOrText;
  wrap.appendChild(inner);
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
  return inner;
}

/**
 * @param {HTMLElement} container
 */
export function clearContainer(container) {
  container.innerHTML = "";
}

/**
 * @param {{
 *  language: "tr"|"en",
 *  summary: string,
 *  highlights: string[],
 *  confidence: { level: "high"|"medium"|"low", score: number },
 *  sources: { label: string, url: string, snippet: string }[],
 *  suggested: { title: string, url: string }[]
 * }} result
 */
export function renderAssistantResult(result) {
  var isEn = result.language === "en";

  var guardNotice = "";
  if (result.qualityGuard && result.qualityGuard.triggered) {
    var thresholdValue =
      typeof result.qualityGuard.threshold === "number" ? Number(result.qualityGuard.threshold).toFixed(1) : "";
    var scoreValue =
      typeof result.qualityGuard.initialTopScore === "number"
        ? Number(result.qualityGuard.initialTopScore).toFixed(2)
        : "";
    var thresholdInfo =
      thresholdValue ? " (threshold " + thresholdValue + ", initial score " + scoreValue + ")" : "";
    guardNotice =
      '<div class="rek-ai-guard">' +
      (isEn
        ? "Auto Quality Guard enabled: confidence was low, so response switched to source-first mode."
        : "Auto Quality Guard aktif: guven skoru dusuk oldugu icin yanit source-first moduna otomatik gecirildi.") +
      escapeHtml(thresholdInfo) +
      "</div>";
  }

  var cleanSummary = stripLegacyAssistantMarkdown(result.summary || "");

  return (
    '<div class="rek-ai-answer">' +
    guardNotice +
    '<div class="rek-ai-summary">' +
    markdownToHtml(cleanSummary) +
    "</div>" +
    "</div>"
  );
}
