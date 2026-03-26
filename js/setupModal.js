function bindSetupModal(state, storage, firstN, elements) {
  elements.setupBtn.onclick = function() {
    resetCurrentSelection(state, elements)

    elements.settingsModal.style.display = "block";

    const settings = getStoredSettings(storage, firstN)
    elements.usernameInput.value = settings.username
    elements.totalInput.value = settings.total
    elements.exnumbersInput.value = settings.exnumbers.join(",")
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
