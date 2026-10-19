/* Central download configuration.
   Every download button on the site redirects to the PLACAR web app,
   which is the only distribution method (installable PWA). */
window.PLACAR_WEB_APP_URL = "https://akvt90.github.io/Ping-Pong-Scoreboard/";

window.PLACAR_DOWNLOADS = {
  windows: {
    name: "Windows", version: "", releaseDate: "", fileSize: "", requirements: "Chrome or Edge",
    downloadUrl: window.PLACAR_WEB_APP_URL, status: "available",
    buttonLabel: "Download for Windows",
    description: "Opens the PLACAR web app. Install it from Chrome or Edge, or just use it in the browser.",
    note: ""
  },
  macos: {
    name: "macOS", version: "", releaseDate: "", fileSize: "", requirements: "Safari or Chrome",
    downloadUrl: window.PLACAR_WEB_APP_URL, status: "available",
    buttonLabel: "Download for macOS",
    description: "Opens the PLACAR web app. Use it in your browser or install it from Chrome.",
    note: ""
  },
  ios: {
    name: "iOS / iPadOS", version: "", releaseDate: "", fileSize: "", requirements: "Safari",
    downloadUrl: window.PLACAR_WEB_APP_URL, status: "available",
    buttonLabel: "Download for iOS",
    description: "Opens the PLACAR web app. In Safari, tap Share, then Add to Home Screen.",
    note: ""
  },
  android: {
    name: "Android", version: "", releaseDate: "", fileSize: "", requirements: "Chrome",
    downloadUrl: window.PLACAR_WEB_APP_URL, status: "available",
    buttonLabel: "Download for Android",
    description: "Opens the PLACAR web app. In Chrome, choose Install app. Designed for tablets.",
    note: ""
  }
};
