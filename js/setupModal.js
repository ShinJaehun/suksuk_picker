function bindSetupModal(state, storage, firstN, elements) {
  elements.setupBtn.onclick = function() {
    state.stopped = true
    clearInterval(state.interval)
    state.interval = null

    elements.settingsModal.style.display = "block";

    elements.usernameInput.value=storage["username"] ?? "noname"
    elements.totalInput.value=storage["total"] ?? firstN
    let exnumbers=storage["exnumbers"] ? JSON.parse(storage["exnumbers"]) : []
    elements.exnumbersInput.value=exnumbers.join(",")
  }
  elements.closeSpan.onclick = function() {
    elements.settingsModal.style.display = "none";
  }

  elements.cancelBtn.onclick = function() {
    elements.settingsModal.style.display = "none";
  }

  elements.settingsModal.addEventListener("click", function(event) {
    if (event.target == elements.settingsModal) {
      elements.settingsModal.style.display = "none";
    }
  })
}
