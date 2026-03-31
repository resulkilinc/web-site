/**
 * ReK AI modal: open/close, chips, pipeline visualization, chat wiring.
 */

import { answerQuery, streamAnswer } from "./engine.js?v=20260329l";
import { appendBubble, clearContainer, renderAssistantResult } from "./render.js?v=20260329l";
import { saveMessage, loadHistory, clearHistory } from "./storage.js?v=20260329l";

/**
 * @param {HTMLDialogElement | null} dialog
 */
export function initResAiModal(dialog) {
  if (!dialog || typeof dialog.showModal !== "function") return;

  var chatLog = dialog.querySelector("[data-res-ai-chat-log]");
  var input = dialog.querySelector("[data-res-ai-input]");
  var form = dialog.querySelector("[data-res-ai-form]");
  var clearBtn = dialog.querySelector("[data-res-ai-clear]");
  var pipelineEl = dialog.querySelector("[data-res-ai-pipeline]");
  var modeSelect = dialog.querySelector("[data-res-ai-mode]");
  var retrievalDepthSelect = dialog.querySelector("[data-res-ai-depth]");
  var metricsEl = dialog.querySelector("[data-res-ai-metrics]");
  var diagnosticsEl = dialog.querySelector("[data-res-ai-diagnostics]");
  var sessionCompareEl = dialog.querySelector("[data-res-ai-session-compare]");
  var diagnosticsWindowSelect = dialog.querySelector("[data-res-ai-diag-window]");
  var exportJsonBtn = dialog.querySelector("[data-res-ai-export-json]");
  var exportCsvBtn = dialog.querySelector("[data-res-ai-export-csv]");
  var guardPresetSelect = dialog.querySelector("[data-res-ai-guard-preset]");
  var guardThresholdInput = dialog.querySelector("[data-res-ai-guard-threshold]");
  var guardRangeInput = dialog.querySelector("[data-res-ai-guard-range]");
  var auditToggle = dialog.querySelector("[data-res-ai-audit-toggle]");
  var auditEl = dialog.querySelector("[data-res-ai-audit]");
  var tabButtons = Array.prototype.slice.call(dialog.querySelectorAll("[data-res-ai-tab-btn]"));
  var tabPanels = Array.prototype.slice.call(dialog.querySelectorAll("[data-res-ai-tab-panel]"));
  var diagnosticsHistory = [];
  var lastAssistantResult = null;
  var SESSION_SUMMARY_KEY = "rek-ai-last-session-summary-v1";
  var PREFS_KEY = "rek-ai-ui-prefs-v1";
  var GUARD_PRESETS = { strict: 4.6, normal: 3.2, relaxed: 2.4 };
  var previousSessionSummary = loadPreviousSessionSummary();
  var platformRoot = dialog.querySelector(".rek-platform");
  var sidebarToggle = dialog.querySelector("[data-res-ai-sidebar-toggle]");
  var chatContextEl = dialog.querySelector("[data-res-ai-chat-context]");

  function escAttr(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderChatContext(result) {
    if (!chatContextEl) return;
    var hintTr =
      '<p class="rek-chat-rail__hint">Son yanıt için eşleşen sayfa bağlantıları burada listelenir.</p>';
    if (!result || !result.sources || !result.sources.length) {
      chatContextEl.innerHTML = hintTr;
      return;
    }
    var items = result.sources.slice(0, 6).map(function (src) {
      var label = escAttr(src.label || "Kaynak");
      var url = String(src.url || "#").trim();
      if (!/^https?:\/\//i.test(url) && url.indexOf("/") !== 0) url = "#";
      var href = escAttr(url);
      return '<li><a href="' + href + '" target="_blank" rel="noopener noreferrer">' + label + "</a></li>";
    });
    chatContextEl.innerHTML =
      '<p class="rek-chat-rail__title">Kaynaklar</p><ul class="rek-chat-rail__list">' + items.join("") + "</ul>";
  }

  function setControlsOpen(open) {
    if (!platformRoot) return;
    platformRoot.classList.toggle("rek-platform--controls-open", !!open);
    if (sidebarToggle) sidebarToggle.setAttribute("aria-expanded", open ? "true" : "false");
    saveUiPrefs();
  }

  function setPipelineStep(step) {
    if (!pipelineEl) return;
    pipelineEl.querySelectorAll("[data-step]").forEach(function (el) {
      var s = el.getAttribute("data-step");
      el.classList.toggle("is-active", s === step);
    });
  }

  function loadPreviousSessionSummary() {
    try {
      var raw = window.localStorage.getItem(SESSION_SUMMARY_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function loadUiPrefs() {
    try {
      var raw = window.localStorage.getItem(PREFS_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function saveUiPrefs() {
    var prefs = {
      mode: modeSelect ? modeSelect.value : "balanced",
      depth: retrievalDepthSelect ? retrievalDepthSelect.value : "5",
      guardPreset: guardPresetSelect ? guardPresetSelect.value : "normal",
      guardThreshold: guardThresholdInput ? guardThresholdInput.value : "3.2",
      auditEnabled: !!(auditToggle && auditToggle.checked),
      activeTab: getActiveConsoleTab(),
      controlsOpen: !!(platformRoot && platformRoot.classList.contains("rek-platform--controls-open")),
    };
    try {
      window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch (e) {
      /* ignore storage errors */
    }
  }

  function applyUiPrefs() {
    var prefs = loadUiPrefs();
    if (prefs) {
      if (modeSelect && (prefs.mode === "balanced" || prefs.mode === "source_first")) modeSelect.value = prefs.mode;
      if (retrievalDepthSelect && (prefs.depth === "3" || prefs.depth === "5" || prefs.depth === "7")) {
        retrievalDepthSelect.value = prefs.depth;
      }
      if (
        guardPresetSelect &&
        (prefs.guardPreset === "strict" ||
          prefs.guardPreset === "normal" ||
          prefs.guardPreset === "relaxed" ||
          prefs.guardPreset === "custom")
      ) {
        guardPresetSelect.value = prefs.guardPreset;
      }
      if (guardThresholdInput && prefs.guardThreshold) {
        guardThresholdInput.value = String(prefs.guardThreshold);
      }
      if (auditToggle) {
        auditToggle.checked = !!prefs.auditEnabled;
      }
      syncGuardRangeFromNumber();
      setActiveConsoleTab(normalizeTabId(prefs.activeTab));
    } else {
      syncGuardRangeFromNumber();
      setActiveConsoleTab("chat");
    }
    if (platformRoot) {
      if (prefs && Object.prototype.hasOwnProperty.call(prefs, "controlsOpen") && typeof prefs.controlsOpen === "boolean") {
        platformRoot.classList.toggle("rek-platform--controls-open", prefs.controlsOpen);
      } else {
        platformRoot.classList.add("rek-platform--controls-open");
      }
      if (sidebarToggle) {
        sidebarToggle.setAttribute(
          "aria-expanded",
          platformRoot.classList.contains("rek-platform--controls-open") ? "true" : "false"
        );
      }
    }
  }

  function normalizeTabId(id) {
    var s = String(id || "chat");
    if (s === "session") return "workflows";
    if (s === "audit") return "knowledge";
    if (s === "chat" || s === "diagnostics" || s === "workflows" || s === "knowledge") return s;
    return "chat";
  }

  function getActiveConsoleTab() {
    if (!tabButtons.length) return "chat";
    for (var i = 0; i < tabButtons.length; i++) {
      if (tabButtons[i].classList.contains("is-active")) {
        return normalizeTabId(tabButtons[i].getAttribute("data-res-ai-tab-btn"));
      }
    }
    return "chat";
  }

  function setActiveConsoleTab(tabId) {
    if (!tabButtons.length || !tabPanels.length) return;
    var target = normalizeTabId(tabId);
    tabButtons.forEach(function (btn) {
      var id = btn.getAttribute("data-res-ai-tab-btn") || "";
      var active = normalizeTabId(id) === target;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    tabPanels.forEach(function (panel) {
      var id = panel.getAttribute("data-res-ai-tab-panel") || "";
      panel.classList.toggle("is-active", id === target);
    });
  }

  function syncGuardRangeFromNumber() {
    if (!guardRangeInput || !guardThresholdInput) return;
    var v = Number(guardThresholdInput.value);
    if (!Number.isFinite(v)) return;
    var clamped = Math.max(0.5, Math.min(9.5, v));
    guardRangeInput.value = String(clamped);
  }

  function syncGuardNumberFromRange() {
    if (!guardRangeInput || !guardThresholdInput) return;
    guardThresholdInput.value = String(Number(guardRangeInput.value).toFixed(1));
  }

  function summarizeRecords(records) {
    if (!records || !records.length) return null;
    var latencies = records.map(function (r) {
      return Number(r.latency || 0);
    });
    var scores = records.map(function (r) {
      return Number(r.topScore || 0);
    });
    var avgLatency = Math.round(
      latencies.reduce(function (acc, n) {
        return acc + n;
      }, 0) / records.length
    );
    var avgScore = Number(
      (
        scores.reduce(function (acc, n) {
          return acc + n;
        }, 0) / records.length
      ).toFixed(2)
    );
    var sourceFirstCount = records.filter(function (r) {
      return r.mode === "source_first";
    }).length;
    var p95Latency = Math.round(percentile(latencies, 95));
    return {
      generatedAt: Date.now(),
      count: records.length,
      avgLatency: avgLatency,
      avgScore: avgScore,
      p95Latency: p95Latency,
      sourceFirstRatio: Number((sourceFirstCount / records.length).toFixed(2)),
    };
  }

  function persistCurrentSessionSummary() {
    if (!diagnosticsHistory.length) return;
    var summary = summarizeRecords(diagnosticsHistory);
    if (!summary) return;
    try {
      window.localStorage.setItem(SESSION_SUMMARY_KEY, JSON.stringify(summary));
    } catch (e) {
      /* ignore storage errors */
    }
  }

  function renderSessionComparison(currentSummary) {
    if (!sessionCompareEl) return;
    if (!currentSummary) {
      sessionCompareEl.innerHTML =
        '<p class="res-ai-session-compare__empty">Session compare: ilk oturum ozeti olustugunda karsilastirma gorunur.</p>';
      return;
    }
    if (!previousSessionSummary) {
      sessionCompareEl.innerHTML =
        '<p class="res-ai-session-compare__empty">Onceki oturum verisi yok. Bu oturum kapandiginda baseline kaydedilecek.</p>';
      return;
    }

    function delta(now, prev, unit) {
      var d = Number(now) - Number(prev);
      var sign = d > 0 ? "+" : "";
      return sign + d.toFixed(2) + (unit || "");
    }

    sessionCompareEl.innerHTML =
      '<div class="res-ai-session-compare__head"><strong>Session compare</strong>' +
      "<span>prev vs current</span></div>" +
      '<ul class="res-ai-session-compare__list">' +
      "<li><span>avg score</span><span>" +
      previousSessionSummary.avgScore +
      " -> " +
      currentSummary.avgScore +
      " (" +
      delta(currentSummary.avgScore, previousSessionSummary.avgScore, "") +
      ")</span></li>" +
      "<li><span>avg latency</span><span>" +
      previousSessionSummary.avgLatency +
      "ms -> " +
      currentSummary.avgLatency +
      "ms (" +
      delta(currentSummary.avgLatency, previousSessionSummary.avgLatency, "ms") +
      ")</span></li>" +
      "<li><span>p95 latency</span><span>" +
      previousSessionSummary.p95Latency +
      "ms -> " +
      currentSummary.p95Latency +
      "ms (" +
      delta(currentSummary.p95Latency, previousSessionSummary.p95Latency, "ms") +
      ")</span></li>" +
      "<li><span>source-first ratio</span><span>" +
      previousSessionSummary.sourceFirstRatio +
      " -> " +
      currentSummary.sourceFirstRatio +
      " (" +
      delta(currentSummary.sourceFirstRatio, previousSessionSummary.sourceFirstRatio, "") +
      ")</span></li>" +
      "</ul>";
  }

  function getDiagnosticsWindowSize() {
    var v = diagnosticsWindowSelect ? Number(diagnosticsWindowSelect.value) : 8;
    if (!Number.isFinite(v) || v < 4) return 8;
    return v;
  }

  function percentile(values, p) {
    if (!values.length) return 0;
    var sorted = values.slice().sort(function (a, b) {
      return a - b;
    });
    var idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
    return sorted[idx];
  }

  function downloadText(filename, content, mimeType) {
    // Prepend UTF-8 BOM for CSV files so Turkish characters (ş, ç, ö) render
    // correctly when opened in Excel or similar spreadsheet applications.
    var bom = (mimeType && mimeType.indexOf("csv") !== -1) ? "\ufeff" : "";
    var blob = new Blob([bom + content], { type: mimeType || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getGuardPreset() {
    var preset = guardPresetSelect ? String(guardPresetSelect.value || "normal") : "normal";
    if (preset !== "strict" && preset !== "normal" && preset !== "relaxed" && preset !== "custom") return "normal";
    return preset;
  }

  function applyGuardPreset(preset) {
    if (!guardThresholdInput) return;
    if (!Object.prototype.hasOwnProperty.call(GUARD_PRESETS, preset)) return;
    guardThresholdInput.value = String(GUARD_PRESETS[preset].toFixed(1));
  }

  function renderMetrics(result, elapsedMs) {
    if (!metricsEl || !result || !result.metrics) return;
    var m = result.metrics;
    var lang = result.language === "en" ? "EN" : "TR";
    var modeLabel = result.mode === "source_first" ? "source-first" : "balanced";
    var guardThreshold = getGuardThreshold();
    var guardPreset = getGuardPreset();
    metricsEl.textContent =
      "mode: " +
      modeLabel +
      " · lang: " +
      lang +
      " · corpus: " +
      m.corpusSize +
      " · retrieved: " +
      m.retrievedCount +
      " · topK: " +
      (m.requestedTopK || 5) +
      " · sources: " +
      m.sourceCount +
      " · topScore: " +
      m.topScore +
      " · guard@" +
      guardThreshold +
      " (" +
      guardPreset +
      ")" +
      " · latency: " +
      elapsedMs +
      "ms";
    if (result.qualityGuard && result.qualityGuard.triggered) {
      metricsEl.textContent += " · guard: auto source-first";
    }
  }

  function getGuardThreshold() {
    var raw = guardThresholdInput ? Number(guardThresholdInput.value) : 3.2;
    if (!Number.isFinite(raw)) return 3.2;
    return Math.max(0.5, Math.min(9.5, raw));
  }

  function getRetrievalDepth() {
    var raw = retrievalDepthSelect ? Number(retrievalDepthSelect.value) : 5;
    if (!Number.isFinite(raw)) return 5;
    return Math.max(1, Math.min(10, Math.round(raw)));
  }

  function buildAuditPayload(result) {
    if (!result) return null;
    return {
      generatedAt: new Date().toISOString(),
      confidence: result.confidence || null,
      mode: result.mode || "balanced",
      metrics: result.metrics || null,
      qualityGuard: result.qualityGuard || null,
      audit: result.audit || null,
    };
  }

  function renderAuditTrail(result) {
    if (!auditEl) return;
    if (result) lastAssistantResult = result;
    var enabled = !!(auditToggle && auditToggle.checked);
    if (!enabled) {
      auditEl.innerHTML = "";
      return;
    }
    if (!lastAssistantResult || !lastAssistantResult.audit) {
      auditEl.innerHTML = '<p class="res-ai-audit__empty">Audit trail: ilk yanittan sonra gorunur.</p>';
      return;
    }
    var a = lastAssistantResult.audit;
    var rows = (a.candidates || [])
      .map(function (c, idx) {
        return (
          "<li>" +
          "<span>#" + (idx + 1) + " · " + escapeHtml(c.title) + "</span>" +
          '<span><a href="' +
          escapeHtml(c.sourceUrl) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(c.sourceLabel) +
          "</a> · score " +
          escapeHtml(c.score) +
          "</span>" +
          "</li>"
        );
      })
      .join("");
    auditEl.innerHTML =
      '<div class="res-ai-audit__head">' +
      "<strong>Answer Audit Trail</strong>" +
      "<span>tokens: " +
      escapeHtml((a.queryTokens || []).slice(0, 10).join(", ")) +
      "</span>" +
      "</div>" +
      '<div class="res-ai-audit__meta">requested: ' +
      escapeHtml(a.requestedMode) +
      " · applied: " +
      escapeHtml(a.appliedMode) +
      "</div>" +
      '<div class="res-ai-audit__actions">' +
      '<button type="button" class="res-ai-audit__btn" data-res-ai-audit-action="copy-json">JSON kopyala</button>' +
      '<button type="button" class="res-ai-audit__btn" data-res-ai-audit-action="download-json">JSON indir</button>' +
      "</div>" +
      '<ul class="res-ai-audit__list">' +
      rows +
      "</ul>";
  }

  function pushDiagnostics(result, elapsedMs) {
    if (!result || !result.metrics) return;
    diagnosticsHistory.push({
      ts: Date.now(),
      mode: result.mode || "balanced",
      lang: result.language || "tr",
      topScore: Number(result.metrics.topScore || 0),
      retrieved: Number(result.metrics.retrievedCount || 0),
      sources: Number(result.metrics.sourceCount || 0),
      latency: Number(elapsedMs || 0),
    });
    if (diagnosticsHistory.length > 64) diagnosticsHistory = diagnosticsHistory.slice(-64);
    renderDiagnostics();
    renderAuditTrail(result);
  }

  function renderDiagnostics() {
    if (!diagnosticsEl) return;
    if (!diagnosticsHistory.length) {
      diagnosticsEl.innerHTML =
        '<p class="res-ai-diagnostics__empty">Diagnostics: ilk sorgudan sonra kalite trendi burada gosterilir.</p>';
      renderSessionComparison(null);
      return;
    }
    var windowSize = getDiagnosticsWindowSize();
    var last = diagnosticsHistory.slice(-windowSize);
    var avgLatency = Math.round(
      last.reduce(function (acc, it) {
        return acc + it.latency;
      }, 0) / last.length
    );
    var avgScore = (
      last.reduce(function (acc, it) {
        return acc + it.topScore;
      }, 0) / last.length
    ).toFixed(2);
    var modeSourceFirst = last.filter(function (it) {
      return it.mode === "source_first";
    }).length;
    var latencyValues = last.map(function (it) {
      return it.latency;
    });
    var scoreValues = last.map(function (it) {
      return it.topScore;
    });
    var p95Latency = Math.round(percentile(latencyValues, 95));
    var medianScore = percentile(scoreValues, 50).toFixed(2);

    function makeSparkline(values, maxY) {
      var width = 160;
      var height = 34;
      var pad = 3;
      var n = values.length;
      if (!n) return "";
      var maxVal = Math.max.apply(null, values);
      var minVal = Math.min.apply(null, values);
      var range = Math.max(0.0001, (typeof maxY === "number" ? maxY : maxVal) - Math.min(minVal, 0));
      var stepX = n === 1 ? width - pad * 2 : (width - pad * 2) / (n - 1);
      var points = values
        .map(function (v, i) {
          var x = pad + i * stepX;
          var y = height - pad - ((v - Math.min(minVal, 0)) / range) * (height - pad * 2);
          return x.toFixed(1) + "," + y.toFixed(1);
        })
        .join(" ");
      return (
        '<svg viewBox="0 0 ' +
        width +
        " " +
        height +
        '" class="res-ai-diagnostics__sparkline" aria-hidden="true">' +
        '<polyline fill="none" stroke="currentColor" stroke-width="1.8" points="' +
        points +
        '"></polyline></svg>'
      );
    }

    var scoreSpark = makeSparkline(scoreValues, 10);
    var latencyCap = Math.max.apply(null, latencyValues) * 1.1 || 100;
    var latencySpark = makeSparkline(latencyValues, latencyCap);

    // Only render rows for the current window slice (already sliced above as `last`).
    // Previously all history was mapped, inflating DOM on long sessions.
    var rows = last
      .slice()
      .reverse()
      .map(function (it) {
        return (
          '<li class="' +
          (it.mode === "source_first" ? "is-source-first" : "is-balanced") +
          '">' +
          "<span>" +
          (it.mode === "source_first" ? "source-first" : "balanced") +
          " · " +
          (it.lang === "en" ? "EN" : "TR") +
          "</span>" +
          "<span>score " +
          it.topScore.toFixed(2) +
          " · " +
          "src " +
          it.sources +
          "/" +
          it.retrieved +
          " · " +
          it.latency +
          "ms</span>" +
          "</li>"
        );
      })
      .join("");

    diagnosticsEl.innerHTML =
      '<div class="res-ai-diagnostics__head">' +
      "<strong>AI Diagnostics</strong>" +
      "<span>avg score " +
      avgScore +
      " · avg latency " +
      avgLatency +
      "ms</span>" +
      "</div>" +
      '<div class="res-ai-diagnostics__meta">recent: ' +
      last.length +
      " · source-first ratio: " +
      modeSourceFirst +
      "/" +
      last.length +
      " · p95 latency: " +
      p95Latency +
      "ms · median score: " +
      medianScore +
      "</div>" +
      '<div class="res-ai-diagnostics__charts">' +
      '<div class="res-ai-diagnostics__chart"><span>score trend</span>' +
      scoreSpark +
      "</div>" +
      '<div class="res-ai-diagnostics__chart"><span>latency trend</span>' +
      latencySpark +
      "</div>" +
      "</div>" +
      '<ul class="res-ai-diagnostics__list">' +
      rows +
      "</ul>";

    renderSessionComparison(summarizeRecords(last));
  }

  async function runQuery(text) {
    if (!chatLog || !text.trim()) return;
    var t0 = Date.now();
    var mode = modeSelect && modeSelect.value === "source_first" ? "source_first" : "balanced";
    var guardThreshold = getGuardThreshold();
    var guardPreset = getGuardPreset();
    var retrievalDepth = getRetrievalDepth();
    appendBubble(chatLog, "user", text.trim(), false);
    await saveMessage({ role: "user", content: text.trim(), ts: Date.now() });

    setPipelineStep("retrieve");
    await new Promise(function (r) {
      setTimeout(r, 200);
    });
    setPipelineStep("rank");
    await new Promise(function (r) {
      setTimeout(r, 180);
    });
    setPipelineStep("compose");
    var acc = "";
    var bubbleInner = appendBubble(chatLog, "assistant", "", false);
    bubbleInner.classList.add("is-streaming");
    var currentPage = (window.location.pathname || "/") + (window.location.hash || "");
    var result = answerQuery(text, {
      mode: mode,
      maxSources: retrievalDepth,
      currentPage: currentPage,
    });
    if (mode !== "source_first" && result.metrics && Number(result.metrics.topScore) < guardThreshold) {
      var fallback = answerQuery(text, {
        mode: "source_first",
        maxSources: retrievalDepth,
        currentPage: currentPage,
      });
      fallback.qualityGuard = {
        triggered: true,
        reason: "score_threshold",
        requestedMode: mode,
        autoMode: "source_first",
        initialTopScore: result.metrics ? result.metrics.topScore : 0,
        threshold: guardThreshold,
        thresholdPreset: guardPreset,
      };
      if (fallback.audit) {
        fallback.audit.requestedMode = mode;
        fallback.audit.appliedMode = "source_first";
      }
      result = fallback;
    }

    setPipelineStep("stream");
    try {
      for await (var chunk of streamAnswer(text, { mode: result.mode, result: result })) {
        acc += chunk;
        bubbleInner.textContent = acc;
      }
      var elapsed = Date.now() - t0;
      lastAssistantResult = result;
      bubbleInner.classList.remove("is-streaming");
      bubbleInner.innerHTML = renderAssistantResult(result);
      renderChatContext(result);
      renderMetrics(result, elapsed);
      pushDiagnostics(result, elapsed);
    } catch (e) {
      bubbleInner.classList.remove("is-streaming");
      bubbleInner.textContent = "Yanıt oluşturulurken bir sorun oluştu.";
    }
    await saveMessage({
      role: "assistant",
      content: acc,
      format: "rek_result_v1",
      payload: JSON.stringify(result),
      ts: Date.now(),
    });
    setPipelineStep("done");
    setTimeout(function () {
      setPipelineStep("idle");
    }, 600);
  }

  if (form && input) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value;
      input.value = "";
      runQuery(v);
    });
  }

  dialog.addEventListener("click", function (e) {
    var t = e.target;
    if (!(t instanceof HTMLElement)) return;
    var chip = t.closest("[data-chip-query]");
    if (!chip || !dialog.contains(chip)) return;
    var q = chip.getAttribute("data-chip-query") || "";
    if (!q.trim()) return;
    if (input) input.value = q;
    setActiveConsoleTab("chat");
    saveUiPrefs();
    runQuery(q);
  });

  if (sidebarToggle && platformRoot) {
    sidebarToggle.addEventListener("click", function () {
      setControlsOpen(!platformRoot.classList.contains("rek-platform--controls-open"));
    });
  }

  if (chatLog) {
    chatLog.addEventListener("click", function (e) {
      var t = e.target;
      if (!(t instanceof HTMLElement)) return;
      var btn = t.closest("[data-suggestion-query]");
      if (!btn) return;
      var nextQuery = btn.getAttribute("data-suggestion-query") || "";
      if (!nextQuery.trim()) return;
      if (input) input.value = nextQuery;
      runQuery(nextQuery);
    });
  }

  if (clearBtn && chatLog) {
    clearBtn.addEventListener("click", function () {
      persistCurrentSessionSummary();
      clearContainer(chatLog);
      clearHistory();
      setPipelineStep("idle");
      if (metricsEl) metricsEl.textContent = "";
      diagnosticsHistory = [];
      lastAssistantResult = null;
      renderChatContext(null);
      renderDiagnostics();
      renderAuditTrail(null);
    });
  }

  if (diagnosticsWindowSelect) {
    diagnosticsWindowSelect.addEventListener("change", function () {
      renderDiagnostics();
    });
  }

  if (auditToggle) {
    auditToggle.addEventListener("change", function () {
      saveUiPrefs();
      renderAuditTrail(lastAssistantResult);
    });
  }

  if (guardPresetSelect) {
    guardPresetSelect.addEventListener("change", function () {
      var preset = getGuardPreset();
      if (preset !== "custom") applyGuardPreset(preset);
      syncGuardRangeFromNumber();
      saveUiPrefs();
    });
  }

  if (guardThresholdInput) {
    guardThresholdInput.addEventListener("input", function () {
      syncGuardRangeFromNumber();
      if (!guardPresetSelect) return;
      var preset = getGuardPreset();
      if (preset === "custom") return;
      var presetVal = Object.prototype.hasOwnProperty.call(GUARD_PRESETS, preset) ? GUARD_PRESETS[preset] : GUARD_PRESETS.normal;
      var current = getGuardThreshold();
      if (Math.abs(current - presetVal) > 0.0001) guardPresetSelect.value = "custom";
      saveUiPrefs();
    });
  }

  if (guardRangeInput) {
    guardRangeInput.addEventListener("input", function () {
      syncGuardNumberFromRange();
      if (guardPresetSelect) guardPresetSelect.value = "custom";
      saveUiPrefs();
    });
  }

  if (modeSelect) {
    modeSelect.addEventListener("change", saveUiPrefs);
  }

  if (retrievalDepthSelect) {
    retrievalDepthSelect.addEventListener("change", saveUiPrefs);
  }

  if (tabButtons.length) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-res-ai-tab-btn") || "chat";
        setActiveConsoleTab(id);
        saveUiPrefs();
      });
    });
  }

  if (auditEl) {
    auditEl.addEventListener("click", function (e) {
      var t = e.target;
      if (!(t instanceof HTMLElement)) return;
      var btn = t.closest("[data-res-ai-audit-action]");
      if (!btn || !lastAssistantResult) return;
      var action = btn.getAttribute("data-res-ai-audit-action");
      var payload = buildAuditPayload(lastAssistantResult);
      if (!payload) return;
      if (action === "copy-json") {
        var json = JSON.stringify(payload, null, 2);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(json).catch(function () {
            /* ignore clipboard errors */
          });
        }
      }
      if (action === "download-json") {
        downloadText("rek-ai-audit.json", JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
      }
    });
  }

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", function () {
      if (!diagnosticsHistory.length) return;
      var payload = {
        generatedAt: new Date().toISOString(),
        records: diagnosticsHistory,
      };
      downloadText("rek-ai-diagnostics.json", JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", function () {
      if (!diagnosticsHistory.length) return;
      var header = ["timestamp_iso", "mode", "lang", "top_score", "retrieved", "sources", "latency_ms"];
      var rows = diagnosticsHistory.map(function (r) {
        return [
          new Date(r.ts).toISOString(),
          r.mode,
          r.lang,
          String(r.topScore),
          String(r.retrieved),
          String(r.sources),
          String(r.latency),
        ].join(",");
      });
      var csv = [header.join(","), ...rows].join("\n");
      downloadText("rek-ai-diagnostics.csv", csv, "text/csv;charset=utf-8");
    });
  }

  function hydrateFromStorage() {
    if (!chatLog) return;
    loadHistory().then(function (rows) {
      lastAssistantResult = null;
      rows.sort(function (a, b) {
        return a.ts - b.ts;
      });
      clearContainer(chatLog);
      if (!rows.length) {
        renderChatContext(null);
        return;
      }
      rows.forEach(function (r) {
        if (r.role === "assistant" && r.format === "rek_result_v1" && r.payload) {
          var parsed = null;
          try {
            parsed = JSON.parse(r.payload);
          } catch (e) {
            parsed = null;
          }
          if (parsed) {
            lastAssistantResult = parsed;
            appendBubble(chatLog, "assistant", renderAssistantResult(parsed), true);
            renderMetrics(parsed, 0);
            pushDiagnostics(parsed, 0);
            renderAuditTrail(parsed);
            return;
          }
        }
        appendBubble(chatLog, r.role === "user" ? "user" : "assistant", r.content, false);
      });
      renderChatContext(lastAssistantResult);
    });
  }

  var openObs = new MutationObserver(function () {
    if (dialog.hasAttribute("open")) hydrateFromStorage();
  });
  openObs.observe(dialog, { attributes: true, attributeFilter: ["open"] });
  applyUiPrefs();
  renderChatContext(null);
  renderDiagnostics();
  renderAuditTrail(null);
  if (guardPresetSelect && guardPresetSelect.value !== "custom") {
    applyGuardPreset(getGuardPreset());
  }
  syncGuardRangeFromNumber();

  dialog.addEventListener("close", function () {
    persistCurrentSessionSummary();
    previousSessionSummary = loadPreviousSessionSummary();
    renderSessionComparison(summarizeRecords(diagnosticsHistory));
  });

  window.addEventListener("beforeunload", function () {
    persistCurrentSessionSummary();
  });

  document.querySelectorAll("[data-open-res-ai]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      dialog.showModal();
    });
  });
}
