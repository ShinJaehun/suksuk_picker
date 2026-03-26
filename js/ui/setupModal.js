function hideSettingsModal(elements) {
  elements.settingsModal.style.display = "none"
}

function bindSetupModal({ state, elements, storage, defaultTotal }) {
  const { getStoredSettings } = window.SuksukApp.settingsStorage
  const { resetCurrentSelection } = window.SuksukApp.picking

  elements.setupBtn.onclick = function () {
    resetCurrentSelection(state, elements)
    elements.settingsModal.style.display = "block"

    const settings = getStoredSettings(storage, defaultTotal)
    elements.usernameInput.value = settings.username
    elements.totalInput.value = settings.total
    elements.exnumbersInput.value = settings.exnumbers.join(",")
  }

  elements.closeSpan.onclick = function () {
    hideSettingsModal(elements)
  }

  elements.cancelBtn.onclick = function () {
    hideSettingsModal(elements)
  }

  elements.settingsModal.addEventListener("click", function (event) {
    if (event.target === elements.settingsModal) {
      hideSettingsModal(elements)
    }
  })
}

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.setupModal = {
  bindSetupModal
}
