export function hideSettingsModal(elements) {
  elements.settingsModal.style.display = "none"
}

export function createSetupModal({ settingsStorage, sessionState }) {
  const { getStoredSettings } = settingsStorage
  const { resetCurrentSelection } = sessionState

  function bindSetupModal({ state, elements, storage, defaultTotal }) {
    elements.setupBtn.addEventListener("click", function () {
      resetCurrentSelection(state, elements, storage)
      elements.settingsModal.style.display = "block"

      const settings = getStoredSettings(storage, defaultTotal)
      elements.usernameInput.value = settings.username
      elements.totalInput.value = settings.total
      elements.exnumbersInput.value = settings.exnumbers.join(",")
    })

    elements.closeSpan.addEventListener("click", function () {
      hideSettingsModal(elements)
    })

    elements.cancelBtn.addEventListener("click", function () {
      hideSettingsModal(elements)
    })

    elements.settingsModal.addEventListener("click", function (event) {
      if (event.target === elements.settingsModal) {
        hideSettingsModal(elements)
      }
    })
  }

  return {
    bindSetupModal
  }
}
