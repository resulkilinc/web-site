/**
 * Theme, navigation (scroll spy, mobile), modals body class, Escape, back-to-top.
 */
(function () {
  "use strict";

  var THEME_KEY = "rk-theme";
  var html = document.documentElement;
  var body = document.body;

  var vantaEffect = null;
  var vantaResizeTimer = null;

  function destroyVantaBackground() {
    if (vantaEffect && typeof vantaEffect.destroy === "function") {
      try {
        vantaEffect.destroy();
      } catch (e) {
        /* ignore */
      }
    }
    vantaEffect = null;
    body.classList.remove("rk-vanta-active");
  }

  function vantaShouldRun() {
    var el = document.getElementById("vanta-bg");
    if (!el) return false;
    if (typeof window.VANTA === "undefined" || typeof window.p5 === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (html.getAttribute("data-theme") !== "dark") return false;
    if (window.matchMedia("(max-width: 767px)").matches) return false;
    return true;
  }

  function initVantaBackground() {
    var el = document.getElementById("vanta-bg");
    if (!el || !vantaShouldRun()) return;
    if (vantaEffect) return;
    try {
      vantaEffect = window.VANTA.TOPOLOGY({
        el: el,
        p5: window.p5,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0x964e4e,
        backgroundColor: 0x220000,
        backgroundAlpha: 1,
      });
      body.classList.add("rk-vanta-active");
    } catch (e) {
      destroyVantaBackground();
    }
  }

  function syncVantaBackground() {
    destroyVantaBackground();
    if (!vantaShouldRun()) return;
    window.requestAnimationFrame(function () {
      initVantaBackground();
    });
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* ignore */
    }
  }

  function applyTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    html.setAttribute("data-theme", theme);
    setStoredTheme(theme);
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
    syncVantaBackground();
  }

  function toggleTheme() {
    var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
    } else {
      applyTheme("dark");
    }
  }

  initTheme();

  var lastThemeToggleAt = 0;
  function handleThemeToggleEvent(e) {
    if (e) e.preventDefault();
    var now = Date.now();
    if (now - lastThemeToggleAt < 180) return;
    lastThemeToggleAt = now;
    toggleTheme();
  }

  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      handleThemeToggleEvent();
    });
    btn.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      handleThemeToggleEvent(e);
    });
  });

  /* Nav scroll spy */
  var navLinks = document.querySelectorAll("#site-nav a[data-section]");
  var sections = [];
  navLinks.forEach(function (a) {
    var id = a.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var el = document.querySelector(id);
      if (el) sections.push({ id: id.slice(1), el: el, link: a });
    }
  });

  function updateActiveNav() {
    var scrollPos = window.scrollY + window.innerHeight * 0.25;
    var current = null;
    sections.forEach(function (s) {
      var top = s.el.offsetTop;
      if (scrollPos >= top) current = s;
    });
    navLinks.forEach(function (a) {
      a.classList.remove("is-active");
    });
    if (current && current.link) current.link.classList.add("is-active");
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateActiveNav();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  updateActiveNav();

  /* Mobile nav */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var sidebar = document.querySelector(".sidebar");
  var mobileHeader = document.querySelector(".mobile-header");
  var mobileMenuSheet = document.getElementById("mobile-menu-sheet");

  function jumpToSection(hash) {
    if (!hash || hash.charAt(0) !== "#") return false;
    var target = document.querySelector(hash);
    if (!target) return false;
    var headerOffset = mobileHeader ? mobileHeader.offsetHeight + 14 : 86;
    var y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    if (window.history && typeof window.history.replaceState === "function") {
      window.history.replaceState(null, "", hash);
    }
    return true;
  }

  function closeMobileNav() {
    if (!navToggle) return;
    navToggle.setAttribute("aria-expanded", "false");
    if (mobileMenuSheet && mobileMenuSheet.open && typeof mobileMenuSheet.close === "function") {
      mobileMenuSheet.close();
    }
    if (sidebar) sidebar.classList.remove("is-open");
    body.classList.remove("nav-open");
  }

  function openMobileNav() {
    if (!navToggle) return;
    navToggle.setAttribute("aria-expanded", "true");
    if (window.matchMedia("(max-width: 1023px)").matches && mobileMenuSheet && typeof mobileMenuSheet.showModal === "function") {
      mobileMenuSheet.showModal();
      return;
    }
    if (sidebar) sidebar.classList.add("is-open");
    body.classList.add("nav-open");
  }

  if (navToggle) {
    var lastMobileNavTapAt = 0;

    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      if (open) closeMobileNav();
      else openMobileNav();
    });

    function handleMobileNavLinkActivation(e, a) {
      var isMobile = window.matchMedia("(max-width: 1023px)").matches;
      if (!isMobile) return;
      var now = Date.now();
      if (now - lastMobileNavTapAt < 260) return;
      lastMobileNavTapAt = now;

      var href = a.getAttribute("href") || "";
      var isHashLink = href.charAt(0) === "#";
      if (!isHashLink) {
        closeMobileNav();
        return;
      }

      if (!document.querySelector(href)) {
        closeMobileNav();
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
      window.setTimeout(function () {
        jumpToSection(href);
      }, 290);
    }

    if (siteNav) {
      siteNav.querySelectorAll("a[href^='#']").forEach(function (a) {
        var onTap = function (e) {
          handleMobileNavLinkActivation(e, a);
        };
        a.addEventListener("click", onTap);
        a.addEventListener("touchend", onTap, { passive: false });
      });
    }

    if (mobileMenuSheet) {
      var closeMobileMenuSheet = function () {
        closeMobileNav();
      };

      mobileMenuSheet.addEventListener("close", closeMobileMenuSheet);
      mobileMenuSheet.addEventListener("cancel", function () {
        closeMobileMenuSheet();
      });

      mobileMenuSheet.addEventListener("click", function (e) {
        if (e.target === mobileMenuSheet) {
          closeMobileMenuSheet();
          return;
        }

        var closeBtn = e.target && e.target.closest ? e.target.closest("[data-mobile-menu-close]") : null;
        if (closeBtn) {
          closeMobileMenuSheet();
          return;
        }

        var jumpBtn = e.target && e.target.closest ? e.target.closest("[data-mobile-menu-jump]") : null;
        if (!jumpBtn) return;

        var hash = jumpBtn.getAttribute("data-mobile-menu-jump") || "";
        closeMobileMenuSheet();
        window.setTimeout(function () {
          jumpToSection(hash);
        }, 24);
      });
    }
  }

  var scrim = document.querySelector(".overlay-scrim");
  if (scrim) {
    scrim.addEventListener("click", function () {
      closeMobileNav();
    });
  }

  document.addEventListener("click", function (e) {
    if (!sidebar || !navToggle) return;
    if (!sidebar.classList.contains("is-open")) return;
    var t = e.target;
    if (sidebar.contains(t) || navToggle.contains(t)) return;
    if (mobileHeader && mobileHeader.contains(t)) return;
    if (scrim && scrim.contains(t)) return;
    closeMobileNav();
  });

  /* Modals: body class for scroll lock */
  function refreshModalBodyClass() {
    var open = document.querySelector("dialog.modal[open]");
    body.classList.toggle("modal-open", !!open);
  }

  document.querySelectorAll("dialog.modal").forEach(function (dlg) {
    dlg.addEventListener("close", refreshModalBodyClass);
    dlg.addEventListener("cancel", refreshModalBodyClass);
    var obs = new MutationObserver(refreshModalBodyClass);
    obs.observe(dlg, { attributes: true, attributeFilter: ["open"] });
  });
  refreshModalBodyClass();

  /* Escape closes mobile nav and modals */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeMobileNav();
    document.querySelectorAll("dialog.modal[open]").forEach(function (dlg) {
      dlg.close();
    });
  });

  /* Back to top */
  var backTop = document.getElementById("back-to-top");
  if (backTop) {
    window.addEventListener(
      "scroll",
      function () {
        backTop.hidden = window.scrollY < 400;
      },
      { passive: true }
    );
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Section reveal (subtle, performance-friendly) */
  function initReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    var revealEls = document.querySelectorAll(".hero, .section, .arch-card, .now-card");
    if (!revealEls.length) return;

    revealEls.forEach(function (el, idx) {
      el.classList.add("reveal-ready");
      el.style.setProperty("--reveal-delay", String(Math.min(idx * 24, 220)) + "ms");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  initReveal();

  /* CV / generic: open dialog by id */
  document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-modal-open");
      var d = id ? document.getElementById(id) : null;
      if (d && typeof d.showModal === "function") d.showModal();
    });
  });
  document.querySelectorAll("dialog").forEach(function (dialog) {
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  });

  syncVantaBackground();

  window.addEventListener(
    "resize",
    function () {
      if (vantaResizeTimer) window.clearTimeout(vantaResizeTimer);
      vantaResizeTimer = window.setTimeout(function () {
        vantaResizeTimer = null;
        syncVantaBackground();
      }, 280);
    },
    { passive: true }
  );
})();
