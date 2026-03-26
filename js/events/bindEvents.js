function createEventsModule({ settingsStorage, initGame, picking, sessionState }) {
  const { resetStoredSettings, saveSettings } = settingsStorage
  const {
    initBalls,
    initGame: startGame,
    parseExcludedNumbers
  } = initGame
  const {
    finishLastBall,
    picking: runPicking,
    restartPicking,
    returnPickedBall
  } = picking
  const { resetCurrentSelection } = sessionState

  function bindEvents({ state, elements, storage, defaultTotal }) {
    elements.pickButton.addEventListener("click", function () {
      handlePickButtonClick(state, elements, storage, defaultTotal)
    })

    elements.settingForm.addEventListener("submit", function (event) {
      submitSettingsForm(event, state, elements, storage)
    })

    elements.initBtn.onclick = function () {
      resetStoredSettings(storage)
      startGame({ state, elements, storage, defaultTotal })
    }

    elements.ballContainerDiv.addEventListener("click", function (event) {
      const clickedBallNumber = getClickedPickedBallNumber(event)
      if (clickedBallNumber === null) {
        return
      }

      returnPickedBall(clickedBallNumber, state, elements)
    })
  }

  function handlePickButtonClick(state, elements, storage, defaultTotal) {
    if (state.balls.length > 1) {
      runPicking(state, elements)
      return
    }

    if (state.balls.length === 1) {
      finishLastBall(state, elements)
      return
    }

    restartPicking(state, elements, storage, defaultTotal)
  }

  function submitSettingsForm(event, state, elements, storage) {
    event.preventDefault()

    const validationMessage = validateSettingsForm(elements)
    if (validationMessage) {
      alert(validationMessage)
      return
    }

    alert("입력한 내용을 반영합니다!")

    const settings = getSettingsFormValues(elements)
    saveSettings(storage, settings)
    initBalls(state, elements, settings.total, settings.exnumbers)
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

  function getClickedPickedBallNumber(event) {
    const target = event.target.closest(".picked-ball")
    if (!target) {
      return null
    }

    return Number(target.id)
  }

  return {
    bindEvents
  }
}

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.createEventsModule = createEventsModule
