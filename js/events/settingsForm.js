export function createSettingsForm({ settingsStorage, initGame, reservation }) {
  const { saveSettings } = settingsStorage
  const { initBalls, parseExcludedNumbers } = initGame
  const { clearReservationSilently } = reservation

  function submitSettingsForm(event, state, elements, storage) {
    event.preventDefault()

    const validationMessage = validateSettingsForm(elements)
    if (validationMessage) {
      alert(validationMessage)
      return
    }

    alert("입력한 내용을 반영합니다!")

    const settings = getSettingsFormValues(elements)
    state.settings.username = settings.username
    saveSettings(storage, settings)
    clearReservationSilently(state, elements, storage)
    initBalls(state, elements, storage, settings.total, settings.exnumbers)
  }

  function validateSettingsForm(elements) {
    if (elements.usernameInput.value === "" || elements.totalInput.value === "") {
      return "빈 칸을 모두 채우세요!"
    }

    if (!elements.totalInput.value.match("^[0-9]+$")) {
      return "'인원'에는 숫자만 입력할 수 있습니다."
    }

    if (!elements.exnumbersInput.value.match("^\\s*[0-9]*\\s*(\\s*,\\s*[0-9]*\\s*)*$")) {
      return "'제외할 번호'에는 숫자와 쉼표만 입력할 수 있습니다."
    }

    return null
  }

  function getSettingsFormValues(elements) {
    const total = Number(elements.totalInput.value.trim())

    return {
      username: elements.usernameInput.value.trim(),
      total,
      exnumbers: parseExcludedNumbers(elements.exnumbersInput.value, total)
    }
  }

  return {
    submitSettingsForm
  }
}
