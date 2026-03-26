function createEventsModule({ settingsStorage, initGame, picking, sessionState, settingsForm }) {
  const { resetStoredSettings } = settingsStorage
  const {
    initGame: startGame
  } = initGame
  const {
    finishLastBall,
    picking: runPicking,
    restartPicking,
    returnPickedBall
  } = picking
  const { resetCurrentSelection } = sessionState
  const { submitSettingsForm } = settingsForm

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
