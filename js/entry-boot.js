/**
 * Jesse Zhou tarzı giriş: önce kısa % ilerleme, sonra "BAŞLA" ile seçenekler hub'ı.
 * Tam portföy / panel URL ile gelenlerde veya bu sekmede daha önce tamamlanmışsa atlanır.
 */
(function () {
  "use strict";

  var SS_KEY = "rk-entry-boot-done";

  var gate = document.getElementById("landing-gate");
  var hub = gate ? gate.querySelector(".landing-gate__inner") : null;
  var boot = document.getElementById("landing-boot");
  var pctEl = document.getElementById("landing-boot-pct");
  var fillEl = document.getElementById("landing-boot-fill");
  var startBtn = document.getElementById("landing-boot-start");
  var skipBtn = document.getElementById("landing-boot-skip");

  if (!gate || !hub || !boot || !pctEl || !fillEl || !startBtn || !skipBtn) return;

  function revealHub() {
    try {
      sessionStorage.setItem(SS_KEY, "1");
    } catch (e) {}
    boot.setAttribute("hidden", "");
    boot.setAttribute("aria-busy", "false");
    hub.classList.add("landing-gate__inner--ready");
    startBtn.disabled = true;
  }

  function skipIfNotHomeGate() {
    if (!document.body.classList.contains("landing-active")) {
      revealHub();
      return true;
    }
    try {
      if (sessionStorage.getItem(SS_KEY) === "1") {
        revealHub();
        return true;
      }
    } catch (e2) {}
    return false;
  }

  if (skipIfNotHomeGate()) return;

  var reduced =
    typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setPct(n) {
    var v = Math.min(100, Math.max(0, Math.round(n)));
    pctEl.textContent = String(v);
    fillEl.style.transform = "scaleX(" + v / 100 + ")";
  }

  function finishProgress() {
    setPct(100);
    startBtn.disabled = false;
    startBtn.focus();
  }

  if (reduced) {
    finishProgress();
  } else {
    var duration = 2400;
    var t0 = null;
    function tick(now) {
      if (!t0) t0 = now;
      var t = Math.min(1, (now - t0) / duration);
      var eased = 1 - Math.pow(1 - t, 2.4);
      setPct(eased * 100);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        finishProgress();
      }
    }
    requestAnimationFrame(tick);
  }

  startBtn.addEventListener("click", revealHub);
  skipBtn.addEventListener("click", revealHub);
})();
