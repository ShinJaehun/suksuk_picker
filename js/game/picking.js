function createPickingModule({ constants, settingsStorage, render, initGame }) {
  const { PICK_BUTTON_LABELS, PICKING_INTERVAL_MS } = constants
  const { getStoredSettings } = settingsStorage
  const { renderCurrentBall, clearCurrentBall, renderPickedBalls } = render
  const { initBalls } = initGame

  function picking(state, elements) {
    if (state.stopped) {
      state.stopped = false
      elements.pickButton.innerText = PICK_BUTTON_LABELS.picking
      state.interval = setInterval(() => {
        const pickedIndex = Math.floor(Math.random() * state.balls.length)
        state.currentBall = state.balls[pickedIndex]
        renderCurrentBall(state, elements)
      }, PICKING_INTERVAL_MS)
      return
    }

    elements.pickButton.innerText = PICK_BUTTON_LABELS.picked
    playSoundEffect()
    stopPickingSession(state)
    getBall(state, elements)
  }

  function finishLastBall(state, elements) {
    state.currentBall = state.balls[0]
    renderCurrentBall(state, elements)
    getBall(state, elements)
    elements.pickButton.innerText = PICK_BUTTON_LABELS.restart
  }

  function restartPicking(state, elements, storage, defaultTotal) {
    const { total, exnumbers } = getStoredSettings(storage, defaultTotal)
    initBalls(state, elements, total, exnumbers, resetCurrentSelection)
  }

  function getBall(state, elements) {
    if (!state.currentBall) {
      return
    }

    const currentBallNumber = state.currentBall.number
    for (let index = 0; index < state.balls.length; index += 1) {
      if (state.balls[index].number === currentBallNumber) {
        moveBallAtIndex(index, state.balls, state.pickedBalls)
        renderPickedBalls(state, elements)
        break
      }
    }
  }

  function stopPickingSession(state) {
    state.stopped = true
    clearInterval(state.interval)
    state.interval = null
  }

  function resetCurrentSelection(state, elements) {
    stopPickingSession(state)
    clearCurrentBall(state, elements)
  }

  function returnPickedBall(ballNumber, state, elements) {
    if (state.pickedBalls.length === 0) {
      return
    }

    const pickedBallIndex = state.pickedBalls.findIndex((ball) => ball.number === ballNumber)
    if (pickedBallIndex === -1) {
      return
    }

    moveBallAtIndex(pickedBallIndex, state.pickedBalls, state.balls)
    clearCurrentBall(state, elements)
    renderPickedBalls(state, elements)
  }

  function moveBallAtIndex(ballIndex, sourceBalls, targetBalls) {
    if (ballIndex < 0 || ballIndex >= sourceBalls.length) {
      return
    }

    const movedBalls = sourceBalls.splice(ballIndex, 1)
    targetBalls.push(movedBalls[0])
  }

  function playSoundEffect() {
    const audio = new Audio("resources/retro_coin.wav")
    audio.play()
  }

  return {
    picking,
    finishLastBall,
    restartPicking,
    getBall,
    stopPickingSession,
    resetCurrentSelection,
    returnPickedBall,
    moveBallAtIndex
  }
}

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.createPickingModule = createPickingModule
