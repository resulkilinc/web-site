/**
 * Ambient spotlight: updates CSS custom properties --spot-x and --spot-y from pointer position.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var spotlight = document.querySelector(".ambient-spotlight");
  if (!spotlight) return;

  function setFromClient(clientX, clientY) {
    var x = (clientX / window.innerWidth) * 100;
    var y = (clientY / window.innerHeight) * 100;
    root.style.setProperty("--spot-x", x.toFixed(2) + "%");
    root.style.setProperty("--spot-y", y.toFixed(2) + "%");
  }

  window.addEventListener(
    "mousemove",
    function (e) {
      setFromClient(e.clientX, e.clientY);
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches && e.touches[0]) {
        setFromClient(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );

  setFromClient(window.innerWidth / 2, window.innerHeight / 2);
})();
