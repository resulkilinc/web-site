/**
 * Giriş paneli: yavaş, düşük kontrastlı örümcek ağı (canvas).
 */
(function () {
  "use strict";

  var canvas = document.querySelector(".landing-gate__web-canvas");
  var gate = document.getElementById("landing-gate");
  if (!canvas || !gate) return;

  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var reduced =
    typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var nodes = [];
  var links = [];
  var w = 0;
  var h = 0;
  var dpr = 1;
  var t0 = 0;

  function buildGraph(cw, ch) {
    nodes = [];
    links = [];
    var cols = Math.max(5, Math.round(cw / 140));
    var rows = Math.max(4, Math.round(ch / 130));
    var padX = cw * 0.06;
    var padY = ch * 0.08;
    var gw = cw - padX * 2;
    var gh = ch - padY * 2;
    var idx = 0;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var jitterX = Math.sin(r * 1.7 + c) * gw * 0.04;
        var jitterY = Math.cos(c * 1.3 - r) * gh * 0.04;
        nodes.push({
          x: padX + (c / Math.max(1, cols - 1)) * gw + jitterX,
          y: padY + (r / Math.max(1, rows - 1)) * gh + jitterY,
          phase: (r * cols + c) * 0.31,
          i: idx++,
        });
      }
    }
    var center = { x: cw * 0.5, y: ch * 0.48, phase: 0 };
    nodes.forEach(function (n) {
      var dx = n.x - center.x;
      var dy = n.y - center.y;
      var d = Math.sqrt(dx * dx + dy * dy) + 1;
      if (d < cw * 0.42) {
        links.push([n, center]);
      }
    });
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      var near = nodes
        .filter(function (b) {
          return b !== a;
        })
        .map(function (b) {
          var dx = b.x - a.x;
          var dy = b.y - a.y;
          return { b: b, d: dx * dx + dy * dy };
        })
        .sort(function (u, v) {
          return u.d - v.d;
        })
        .slice(0, 3);
      near.forEach(function (o) {
        if (a.i < o.b.i) links.push([a, o.b]);
      });
    }
  }

  function resize() {
    var rect = gate.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(1, rect.width);
    h = Math.max(1, rect.height);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGraph(w, h);
    if (reduced) drawStatic();
  }

  function drawStatic() {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(200, 140, 160, 0.09)";
    ctx.lineWidth = 0.9;
    links.forEach(function (L) {
      var a = L[0];
      var b = L[1];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });
  }

  function drawFrame(now) {
    if (reduced) return;
    if (!t0) t0 = now;
    var t = (now - t0) / 1000;
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 0.85;
    var sway = 0.35;

    links.forEach(function (L) {
      var a = L[0];
      var b = L[1];
      var pb = typeof b.phase === "number" ? b.phase : 0;
      var ox =
        Math.sin(t * 0.38 + a.phase) * sway +
        Math.sin(t * 0.22 + pb * 0.7) * sway * 0.6;
      var oy =
        Math.cos(t * 0.31 + a.phase * 1.1) * sway +
        Math.cos(t * 0.27 + pb) * sway * 0.55;
      var ax = a.x + ox;
      var ay = a.y + oy;
      var bx = b.x - ox * 0.4;
      var by = b.y - oy * 0.4;
      ctx.strokeStyle = "rgba(210, 155, 175, 0.07)";
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    });

    nodes.forEach(function (n) {
      var px = n.x + Math.sin(t * 0.45 + n.phase) * 0.55;
      var py = n.y + Math.cos(t * 0.4 + n.phase * 0.8) * 0.55;
      ctx.fillStyle = "rgba(232, 190, 200, 0.06)";
      ctx.beginPath();
      ctx.arc(px, py, 1.1, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawFrame);
  }

  resize();
  window.addEventListener("resize", function () {
    resize();
  });

  if (!reduced) requestAnimationFrame(drawFrame);
})();
