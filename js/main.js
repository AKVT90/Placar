(function () {
  "use strict";

  // Ano atual
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Menu móvel
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });

  // FAQ em accordion (um item aberto de cada vez)
  var faq = document.getElementById("faq-list");
  if (faq) {
    var qs = Array.prototype.slice.call(faq.querySelectorAll(".faq-q"));
    function setItem(btn, open) {
      btn.setAttribute("aria-expanded", String(open));
      btn.closest(".faq-item").classList.toggle("is-open", open);
    }
    qs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var willOpen = btn.getAttribute("aria-expanded") !== "true";
        qs.forEach(function (o) { setItem(o, false); });
        setItem(btn, willOpen);
      });
      btn.addEventListener("keydown", function (e) {
        var i = qs.indexOf(btn), t = null;
        if (e.key === "ArrowDown") t = qs[(i + 1) % qs.length];
        else if (e.key === "ArrowUp") t = qs[(i - 1 + qs.length) % qs.length];
        else if (e.key === "Home") t = qs[0];
        else if (e.key === "End") t = qs[qs.length - 1];
        if (t) { e.preventDefault(); t.focus(); }
      });
    });
  }

  // GIF do "Support me": nunca desaparece se o carregamento falhar
  var gifFig = document.querySelector(".support-gif");
  var gif = gifFig && gifFig.querySelector("img");
  if (gif) {
    var triedFallback = false;
    var onLoaded = function () { gifFig.classList.add("is-loaded"); };
    var onFailed = function () {
      if (!triedFallback && gif.dataset.fallback) { triedFallback = true; gif.src = gif.dataset.fallback; return; }
      gif.hidden = true;
      if (!gifFig.querySelector(".support-gif-fallback")) {
        var f = document.createElement("div");
        f.className = "support-gif-fallback"; f.setAttribute("aria-hidden", "true"); f.textContent = "\u2615";
        gifFig.appendChild(f);
      }
    };
    gif.addEventListener("load", onLoaded);
    gif.addEventListener("error", onFailed);
    // o erro pode já ter acontecido antes deste script correr
    if (gif.complete && gif.currentSrc) { if (gif.naturalWidth > 0) onLoaded(); else onFailed(); }
  }

  // Galeria com ampliação
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  var dlg = document.getElementById("lightbox");
  var img = document.getElementById("lb-img");
  var cap = document.getElementById("lb-cap");
  var current = 0, opener = null;
  if (!dlg || !shots.length) return;

  function show(i) {
    current = (i + shots.length) % shots.length;
    var s = shots[current];
    img.src = s.dataset.full;
    img.alt = s.querySelector("img").alt;
    cap.textContent = s.dataset.caption;
  }
  function open(i) {
    opener = shots[i];
    show(i);
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    document.body.classList.add("no-scroll");
  }
  function close() {
    if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
  }
  dlg.addEventListener("close", function () {
    document.body.classList.remove("no-scroll");
    if (opener) opener.focus();
  });
  shots.forEach(function (b, i) { b.addEventListener("click", function () { open(i); }); });
  document.getElementById("lb-close").addEventListener("click", close);
  document.getElementById("lb-prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("lb-next").addEventListener("click", function () { show(current + 1); });
  // clique fora da imagem fecha (o <dialog> recebe o clique no fundo)
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg || e.target.tagName === "FIGURE") close();
  });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { show(current - 1); }
    else if (e.key === "ArrowRight") { show(current + 1); }
  });
})();
