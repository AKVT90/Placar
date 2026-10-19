/* Gera os cartões de download a partir de config/downloads.js */
(function () {
  "use strict";
  var root = document.getElementById("download-grid");
  var cfg = window.PLACAR_DOWNLOADS;
  var webUrl = window.PLACAR_WEB_APP_URL;
  if (!root || !cfg) return;

  var ICONS = {
    windows: '<path d="M3 5.5 10.5 4.4v7H3zM11.5 4.3 21 3v8.4h-9.5zM3 12.6h7.5v7L3 18.5zM11.5 12.6H21V21l-9.5-1.3z"/>',
    macos: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    ios: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    android: '<rect x="6" y="3" width="12" height="18" rx="2.5"/><path d="M10 18h4"/>'
  };
  var SOLID = { windows: true };
  var STATUS = {
    available: "Disponível",
    "coming-soon": "Em breve",
    unavailable: "Indisponível"
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function isValidUrl(u) {
    try { var x = new URL(u, location.href); return x.protocol === "https:" || x.protocol === "http:"; }
    catch (e) { return false; }
  }

  var message = document.getElementById("download-message");
  function say(text) { message.textContent = text; message.hidden = !text; }

  Object.keys(cfg).forEach(function (key) {
    var p = cfg[key];
    var status = STATUS[p.status] ? p.status : "unavailable";
    // Um estado "available" sem endereço válido nunca parece funcional.
    if (status === "available" && !isValidUrl(p.downloadUrl)) status = "unavailable";

    var card = el("article", "dl-card dl-card--" + status);
    card.setAttribute("aria-labelledby", "dl-" + key);

    var ico = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    ico.setAttribute("viewBox", "0 0 24 24");
    ico.setAttribute("class", "dl-icon" + (SOLID[key] ? " dl-icon--solid" : ""));
    ico.setAttribute("aria-hidden", "true");
    ico.innerHTML = ICONS[key] || "";
    card.appendChild(ico);

    var h = el("h3", "", p.name); h.id = "dl-" + key; card.appendChild(h);
    card.appendChild(el("span", "badge badge--" + status, STATUS[status]));
    if (p.description) card.appendChild(el("p", "dl-desc", p.description));

    var meta = el("dl", "dl-meta");
    [["Versão", p.version], ["Atualização", p.releaseDate], ["Tamanho", p.fileSize], ["Requisitos", p.requirements]]
      .forEach(function (r) {
        if (!r[1]) return;
        meta.appendChild(el("dt", "", r[0])); meta.appendChild(el("dd", "", r[1]));
      });
    if (meta.children.length) card.appendChild(meta);
    if (p.note) card.appendChild(el("p", "dl-note", p.note));

    var actions = el("div", "dl-actions");
    var label = p.buttonLabel || "Descarregar";
    if (status === "available") {
      var a = el("a", "btn btn--primary", label);
      a.href = p.downloadUrl;
      var external = new URL(p.downloadUrl, location.href).origin !== location.origin;
      if (external) { a.target = "_blank"; a.rel = "noopener noreferrer"; a.setAttribute("aria-label", label + " (abre num novo separador)"); }
      actions.appendChild(a);
    } else {
      var b = el("button", "btn btn--primary", label);
      b.type = "button";
      if (status === "unavailable") {
        b.setAttribute("aria-disabled", "true");
        b.classList.add("is-disabled");
        b.addEventListener("click", function () { say(p.name + ": esta versão ainda não está disponível."); });
      } else {
        b.addEventListener("click", function () { say(p.name + ": esta versão estará disponível em breve."); });
      }
      actions.appendChild(b);
      if (p.webFallback && isValidUrl(webUrl)) {
        var w = el("a", "btn btn--ghost", "Abrir versão web");
        w.href = webUrl; w.target = "_blank"; w.rel = "noopener noreferrer";
        actions.appendChild(w);
      }
    }
    card.appendChild(actions);
    root.appendChild(card);
  });
})();
