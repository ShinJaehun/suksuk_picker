export function getElements() {
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
    exnumbersInput: document.getElementById("exnumbers"),
    reservationForm: document.getElementById("reservation-form"),
    nextReservedBallInput: document.getElementById("next-reserved-ball"),
    clearReservedBallButton: document.getElementById("clear-reserved-ball"),
    reservedBallStatus: document.getElementById("reserved-ball-status"),
    reservationMessage: document.getElementById("reservation-message")
  }
}
