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
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });

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
