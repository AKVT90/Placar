/* Configuração central dos downloads da PLACAR.
   status: "available" | "coming-soon" | "unavailable"
   - available   → o botão abre downloadUrl (tem de ser um endereço real)
   - coming-soon → o botão mostra uma mensagem, sem descarregar nada
   - unavailable → o botão fica desativado e indica que não existe versão
   Campos vazios ("") não são apresentados no cartão.
   Estado atual: a PLACAR é uma aplicação web (PWA) alojada no GitHub Pages;
   não existe ainda nenhum instalador nativo. */
window.PLACAR_WEB_APP_URL = "https://akvt90.github.io/Ping-Pong-Scoreboard/";

window.PLACAR_DOWNLOADS = {
  windows: {
    name: "Windows",
    version: "",
    releaseDate: "",
    fileSize: "",
    requirements: "",
    downloadUrl: "",              // ex.: URL de um ativo das GitHub Releases (.exe/.msi)
    status: "unavailable",
    buttonLabel: "Descarregar para Windows",
    description: "Ainda não existe instalador para Windows.",
    note: "Podes usar a versão web no navegador.",
    webFallback: true
  },
  macos: {
    name: "macOS",
    version: "",
    releaseDate: "",
    fileSize: "",
    requirements: "",             // ex.: "Apple Silicon e Intel" — só depois de confirmado
    downloadUrl: "",
    status: "unavailable",
    buttonLabel: "Descarregar para macOS",
    description: "Ainda não existe instalador para macOS.",
    note: "Podes usar a versão web no navegador.",
    webFallback: true
  },
  ios: {
    name: "iOS / iPadOS",
    version: "",
    releaseDate: "",
    fileSize: "",
    requirements: "Safari",
    downloadUrl: window.PLACAR_WEB_APP_URL,
    status: "available",
    buttonLabel: "Abrir a PLACAR",
    description: "Versão web instalável. Abre no Safari e escolhe Partilhar › Adicionar ao ecrã principal.",
    note: "Não está na App Store nem no TestFlight.",
    webFallback: false
  },
  android: {
    name: "Android",
    version: "",
    releaseDate: "",
    fileSize: "",
    requirements: "Chrome",
    downloadUrl: window.PLACAR_WEB_APP_URL,
    status: "available",
    buttonLabel: "Abrir a PLACAR",
    description: "Versão web instalável. Abre no Chrome e escolhe Instalar aplicação. Pensada para tablets.",
    note: "Não está na Google Play.",
    webFallback: false
  }
};
