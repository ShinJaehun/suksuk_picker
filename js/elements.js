window.SuksukApp = window.SuksukApp || {}

window.SuksukApp.elements = {
  getElements() {
    return {
      ballDiv: document.querySelector(".ball"),
      ballContainerDiv: document.querySelector(".ball-container"),
      pickButton: document.getElementById("pick"),
      setupBtn: document.getElementById("setup"),
      settingForm: document.getElementById("setting-form"),
      initBtn: document.getElementById("init"),
      settingsModal: document.getElementById("settings"),
      closeSpan: document.getElementById("close"),
      cancelBtn: document.getElementById("cancel"),
      usernameInput: document.getElementById("username"),
      totalInput: document.getElementById("total"),
      exnumbersInput: document.getElementById("exnumbers")
    }
  }
}
