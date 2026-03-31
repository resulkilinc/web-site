/**
 * Giriş paneli ↔ tek sayfa içi paneller (#p-bölüm) ↔ tam portföy (#p-full).
 * Klasik #about gibi hash’ler: tam portföy + o bölüme kaydırma (paylaşım uyumu).
 */
(function () {
  "use strict";

  var gate = document.getElementById("landing-gate");
  var body = document.body;
  var chrome = document.getElementById("rk-panel-chrome");
  var chromeTitle = document.getElementById("rk-panel-chrome-title");
  if (!gate || !body) return;

  var LS_PREFER = "rk-prefer-full";
  var SS_LANDING_TAB = "rk-landing-tab";
  var sfxCtx = null;
  var lastSfxAt = 0;

  var SECTION_IDS = {
    about: "Hakkında",
    education: "Eğitim",
    experience: "Deneyim",
    projects: "Projeler",
    workflow: "İş akışı",
    journal: "Yazılım günlüğü",
    "res-ai": "ReK AI",
    skills: "Yetenekler",
    interests: "İlgi alanları",
    contact: "İletişim",
  };

  function getSfxContext() {
    if (sfxCtx) return sfxCtx;
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    try {
      sfxCtx = new Ctx();
      return sfxCtx;
    } catch (e) {
      return null;
    }
  }

  // Landing -> portfolio geçişi için kısa, özgün ve yumuşak "glassy rise" sesi.
  function playPanelTransitionSfx() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var nowMs = Date.now();
    if (nowMs - lastSfxAt < 350) return;
    lastSfxAt = nowMs;

    var ctx = getSfxContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(function () {});
    }

    var now = ctx.currentTime;
    var master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.07, now + 0.045);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
    var toneFilter = ctx.createBiquadFilter();
    toneFilter.type = "bandpass";
    toneFilter.frequency.setValueAtTime(1200, now);
    toneFilter.Q.setValueAtTime(0.75, now);
    master.connect(toneFilter);
    toneFilter.connect(ctx.destination);

    var toneA = ctx.createOscillator();
    toneA.type = "triangle";
    toneA.frequency.setValueAtTime(392, now);
    toneA.frequency.exponentialRampToValueAtTime(784, now + 0.32);
    var gainA = ctx.createGain();
    gainA.gain.setValueAtTime(0.7, now);
    toneA.connect(gainA);
    gainA.connect(master);

    var toneB = ctx.createOscillator();
    toneB.type = "sine";
    toneB.frequency.setValueAtTime(523.25, now + 0.02);
    toneB.frequency.exponentialRampToValueAtTime(1174.66, now + 0.36);
    var gainB = ctx.createGain();
    gainB.gain.setValueAtTime(0.5, now);
    toneB.connect(gainB);
    gainB.connect(master);

    toneA.start(now);
    toneB.start(now + 0.015);
    toneA.stop(now + 0.42);
    toneB.stop(now + 0.44);
  }

  function preferFullFromStorage() {
    try {
      return localStorage.getItem(LS_PREFER) === "1";
    } catch (e) {
      return false;
    }
  }

  function setPreferFull(on) {
    try {
      if (on) localStorage.setItem(LS_PREFER, "1");
      else localStorage.removeItem(LS_PREFER);
    } catch (e) {}
  }

  function setLandingTabFlag(on) {
    try {
      if (on) sessionStorage.setItem(SS_LANDING_TAB, "1");
      else sessionStorage.removeItem(SS_LANDING_TAB);
    } catch (e) {}
  }

  function viewFullFromUrl() {
    try {
      return new URLSearchParams(window.location.search).get("view") === "full";
    } catch (e) {
      return false;
    }
  }

  function legacySectionHash() {
    var h = window.location.hash;
    if (!h || h.length < 2) return null;
    if (!/^#[a-z][\w-]*$/i.test(h)) return null;
    try {
      return document.querySelector(h) ? h : null;
    } catch (err) {
      return null;
    }
  }

  function parsePanelHash() {
    var raw = (window.location.hash || "").slice(1);
    var m = raw.match(/^p-([\w-]+)$/i);
    if (!m) return null;
    var key = m[1].toLowerCase();
    if (key === "home") return { kind: "home" };
    if (key === "full") return { kind: "full" };
    if (SECTION_IDS[key]) return { kind: "section", id: key };
    return null;
  }

  function hrefWithoutViewParam() {
    var url = new URL(window.location.href);
    url.searchParams.delete("view");
    var q = url.searchParams.toString();
    return url.pathname + (q ? "?" + q : "") + (url.hash || "");
  }

  function pathQueryNoHash() {
    var url = new URL(window.location.href);
    url.searchParams.delete("view");
    var q = url.searchParams.toString();
    return url.pathname + (q ? "?" + q : "");
  }

  function setPortfolioBlocked(block) {
    document.querySelectorAll(".app-shell").forEach(function (el) {
      if (block) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  }

  function setChromeVisible(on, title) {
    if (!chrome || !chromeTitle) return;
    if (on) {
      chrome.hidden = false;
      chromeTitle.textContent = title || "";
    } else {
      chrome.hidden = true;
      chromeTitle.textContent = "";
    }
  }

  function clearSectionMode() {
    body.classList.remove("rk-panel-section");
    body.removeAttribute("data-rk-section");
    setChromeVisible(false);
  }

  function applySectionMode(sectionId) {
    clearSectionMode();
    body.classList.add("rk-panel-section");
    body.setAttribute("data-rk-section", sectionId);
    setChromeVisible(true, SECTION_IDS[sectionId] || sectionId);
  }

  function dismissLanding() {
    gate.classList.add("landing-gate--dismissed");
    gate.setAttribute("aria-hidden", "true");
    body.classList.remove("landing-active");
    document.documentElement.classList.add("rk-start-full");
  }

  function showLanding(opts) {
    opts = opts || {};
    if (!opts.fromPopstate) {
      setPreferFull(false);
      setLandingTabFlag(false);
    } else {
      setLandingTabFlag(true);
    }
    clearSectionMode();
    body.classList.add("landing-active");
    gate.classList.remove("landing-gate--dismissed");
    gate.setAttribute("aria-hidden", "false");
    document.documentElement.classList.remove("rk-start-full");
    setPortfolioBlocked(true);
    window.scrollTo(0, 0);
  }

  function scrollToSelector(sel, instant) {
    if (!sel) return;
    var s = sel.charAt(0) === "#" ? sel : "#" + sel;
    requestAnimationFrame(function () {
      var el = document.querySelector(s);
      if (el) el.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "start" });
    });
  }

  function enterFullPortfolio(scrollToSelector, instantScroll) {
    clearSectionMode();
    dismissLanding();
    setPortfolioBlocked(false);
    var sel = scrollToSelector;
    if (sel == null || sel === "") sel = window.location.hash || null;
    if (sel && /^#p-/i.test(String(sel))) sel = null;
    scrollToSelector(sel, !!instantScroll);
    triggerPortfolioEnter();
  }

  function enterSectionPanel(sectionId, instantScroll) {
    dismissLanding();
    applySectionMode(sectionId);
    setPortfolioBlocked(false);
    window.scrollTo(0, 0);
    var main = document.querySelector(".main-content");
    if (main) main.scrollTop = 0;
    scrollToSelector("#" + sectionId, !!instantScroll);
    triggerPortfolioEnter();
  }

  function triggerPortfolioEnter() {
    body.classList.add("rk-portfolio-enter");
    window.setTimeout(function () {
      body.classList.remove("rk-portfolio-enter");
    }, 700);
  }

  function openFullPortfolioFromLanding() {
    playPanelTransitionSfx();
    setPreferFull(true);
    setLandingTabFlag(false);
    var url = new URL(window.location.href);
    url.searchParams.delete("view");
    url.hash = "p-full";
    var q = url.searchParams.toString();
    window.history.pushState({ rk: "full" }, "", url.pathname + (q ? "?" + q : "") + url.hash);
    enterFullPortfolio(null, false);
  }

  function openSectionPanelFromLanding(sectionId) {
    playPanelTransitionSfx();
    setLandingTabFlag(false);
    var url = new URL(window.location.href);
    url.searchParams.delete("view");
    url.hash = "p-" + sectionId;
    var q = url.searchParams.toString();
    window.history.pushState({ rk: "section", section: sectionId }, "", url.pathname + (q ? "?" + q : "") + url.hash);
    enterSectionPanel(sectionId, false);
  }

  function backToLanding() {
    var url = new URL(window.location.href);
    url.searchParams.delete("view");
    url.hash = "";
    var q = url.searchParams.toString();
    window.history.replaceState({ rk: "landing" }, "", url.pathname + (q ? "?" + q : ""));
    showLanding({});
  }

  function syncFromPopstate() {
    var st = window.history.state;
    var ph = parsePanelHash();

    if (ph && ph.kind === "home") {
      showLanding({ fromPopstate: true });
      return;
    }
    if (ph && ph.kind === "section") {
      enterSectionPanel(ph.id, true);
      return;
    }
    if (ph && ph.kind === "full") {
      enterFullPortfolio(null, true);
      return;
    }

    if (st && st.rk === "landing") {
      showLanding({ fromPopstate: true });
      return;
    }
    if (st && st.rk === "section" && st.section && SECTION_IDS[st.section]) {
      enterSectionPanel(st.section, true);
      return;
    }
    if (st && st.rk === "full") {
      var h = window.location.hash;
      if (h && /^#p-/i.test(h)) enterFullPortfolio(null, true);
      else enterFullPortfolio(h || null, true);
      return;
    }

    if (viewFullFromUrl()) {
      enterFullPortfolio(window.location.hash, true);
      return;
    }
    var leg = legacySectionHash();
    if (leg) {
      enterFullPortfolio(leg, true);
      return;
    }
    if (preferFullFromStorage()) {
      enterFullPortfolio(null, true);
      return;
    }
    showLanding({ fromPopstate: true });
  }

  function consumeBootPanel() {
    var boot = document.documentElement.getAttribute("data-rk-boot-panel");
    if (!boot || !SECTION_IDS[boot]) return null;
    document.documentElement.removeAttribute("data-rk-boot-panel");
    return boot;
  }

  function consumeBootFull() {
    if (document.documentElement.getAttribute("data-rk-boot-full") !== "1") return false;
    document.documentElement.removeAttribute("data-rk-boot-full");
    return true;
  }

  function init() {
    var bootFullEarly = consumeBootFull();
    var bootSection = consumeBootPanel();

    if (bootFullEarly) {
      body.classList.remove("landing-active");
      gate.classList.add("landing-gate--dismissed");
      gate.setAttribute("aria-hidden", "true");
      document.documentElement.classList.add("rk-start-full");
      setPortfolioBlocked(false);
      try {
        window.history.replaceState({ rk: "full" }, "", hrefWithoutViewParam());
      } catch (e0) {}
      requestAnimationFrame(function () {
        enterFullPortfolio(null, true);
      });
      return;
    }
    var legacy = legacySectionHash();
    var explicitView = viewFullFromUrl();
    var headFull = document.documentElement.classList.contains("rk-start-full");
    var ph = parsePanelHash();

    if (bootSection) {
      body.classList.remove("landing-active");
      gate.classList.add("landing-gate--dismissed");
      gate.setAttribute("aria-hidden", "true");
      document.documentElement.classList.add("rk-start-full");
      setPortfolioBlocked(false);
      try {
        window.history.replaceState({ rk: "section", section: bootSection }, "", hrefWithoutViewParam());
      } catch (e) {}
      requestAnimationFrame(function () {
        enterSectionPanel(bootSection, true);
      });
      return;
    }

    if (ph && ph.kind === "section") {
      body.classList.remove("landing-active");
      gate.classList.add("landing-gate--dismissed");
      gate.setAttribute("aria-hidden", "true");
      document.documentElement.classList.add("rk-start-full");
      setPortfolioBlocked(false);
      try {
        window.history.replaceState({ rk: "section", section: ph.id }, "", hrefWithoutViewParam());
      } catch (e2) {}
      requestAnimationFrame(function () {
        enterSectionPanel(ph.id, true);
      });
      return;
    }

    if (ph && ph.kind === "full") {
      body.classList.remove("landing-active");
      gate.classList.add("landing-gate--dismissed");
      gate.setAttribute("aria-hidden", "true");
      document.documentElement.classList.add("rk-start-full");
      setPortfolioBlocked(false);
      try {
        window.history.replaceState({ rk: "full" }, "", hrefWithoutViewParam());
      } catch (e3) {}
      requestAnimationFrame(function () {
        enterFullPortfolio(null, true);
      });
      return;
    }

    var startFull = headFull || !!legacy || explicitView;

    if (!startFull) {
      window.history.replaceState({ rk: "landing" }, "", pathQueryNoHash());
      setPortfolioBlocked(true);
      return;
    }

    body.classList.remove("landing-active");
    gate.classList.add("landing-gate--dismissed");
    gate.setAttribute("aria-hidden", "true");
    document.documentElement.classList.add("rk-start-full");
    setPortfolioBlocked(false);

    try {
      window.history.replaceState({ rk: "full" }, "", hrefWithoutViewParam());
    } catch (e4) {}

    requestAnimationFrame(function () {
      enterFullPortfolio(legacy || window.location.hash || null, true);
    });
  }

  init();

  window.addEventListener("popstate", function () {
    syncFromPopstate();
  });

  document.querySelectorAll("[data-open-full-portfolio]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openFullPortfolioFromLanding();
    });
  });

  document.querySelectorAll("[data-rk-panel]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-rk-panel");
      if (id && SECTION_IDS[id]) openSectionPanelFromLanding(id);
    });
  });

  document.querySelectorAll("[data-back-to-landing]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      backToLanding();
    });
  });

  var skip = document.querySelector(".skip-link");
  if (skip) {
    skip.addEventListener("click", function (e) {
      if (body.classList.contains("landing-active")) {
        e.preventDefault();
        openFullPortfolioFromLanding();
        requestAnimationFrame(function () {
          var main = document.getElementById("content");
          if (main) {
            main.scrollIntoView({ behavior: "auto", block: "start" });
            main.setAttribute("tabindex", "-1");
            main.focus({ preventScroll: true });
          }
        });
      }
    });
  }
})();
