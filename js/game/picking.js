export function createPicking({
  constants,
  settingsStorage,
  render,
  initGame,
  sessionState,
  reservation
}) {
  const { PICK_BUTTON_LABELS, PICKING_INTERVAL_MS } = constants
  const { getStoredSettings } = settingsStorage
  const { renderCurrentBall, clearCurrentBall, renderPickedBalls, renderControlPanel } = render
  const { initBalls } = initGame
  const { stopPickingSession, persistSession } = sessionState
  const { consumeReservedBall } = reservation

  function picking(state, elements, storage) {
    if (state.drawSession.stopped) {
      startPicking(state, elements, storage)
      return
    }

    elements.pickButton.innerText = PICK_BUTTON_LABELS.picked
    playSoundEffect()
    stopPickingSession(state, storage)
    commitPickedBall(state, elements, storage)
  }

  function handlePickButtonClick(state, elements, storage, defaultTotal) {
    if (state.drawSession.remainingBalls.length > 1) {
      picking(state, elements, storage)
      return
    }

    if (state.drawSession.remainingBalls.length === 1) {
      finishLastBall(state, elements, storage)
      return
    }

    restartPicking(state, elements, storage, defaultTotal)
  }

  function startPicking(state, elements, storage) {
    state.drawSession.stopped = false
    elements.pickButton.innerText = PICK_BUTTON_LABELS.picking
    state.drawSession.interval = setInterval(() => {
      const pickedIndex = Math.floor(Math.random() * state.drawSession.remainingBalls.length)
      state.drawSession.currentBall = state.drawSession.remainingBalls[pickedIndex]
      renderCurrentBall(state, elements)
    }, PICKING_INTERVAL_MS)
    persistSession(state, storage)
  }

  function finishLastBall(state, elements, storage) {
    state.drawSession.currentBall = state.drawSession.remainingBalls[0]
    renderCurrentBall(state, elements)
    commitPickedBall(state, elements, storage)
    elements.pickButton.innerText = PICK_BUTTON_LABELS.restart
  }

  function restartPicking(state, elements, storage, defaultTotal) {
    const { total, exnumbers } = getStoredSettings(storage, defaultTotal)
    initBalls(state, elements, storage, total, exnumbers)
  }

  function commitPickedBall(state, elements, storage) {
    const selectedBall = resolveSelectedBall(state, elements, storage)
    if (!selectedBall) {
      return
    }

    state.drawSession.currentBall = selectedBall
    renderCurrentBall(state, elements)

    const currentBallIndex = state.drawSession.remainingBalls.findIndex(
      (ball) => ball.number === selectedBall.number
    )

    if (currentBallIndex === -1) {
      return
    }

    moveBallAtIndex(currentBallIndex, state.drawSession.remainingBalls, state.drawSession.pickedBalls)
    renderPickedBalls(state, elements)
    renderControlPanel(state, elements)
    persistSession(state, storage)
  }

  function resolveSelectedBall(state, elements, storage) {
    const reservedBall = consumeReservedBall(state, elements, storage)
    if (reservedBall) {
      return reservedBall
    }

    if (state.drawSession.currentBall) {
      const matchedBall = state.drawSession.remainingBalls.find(
        (ball) => ball.number === state.drawSession.currentBall.number
      )
      if (matchedBall) {
        return matchedBall
      }
    }

    return state.drawSession.remainingBalls[0] ?? null
  }

  function returnPickedBall(ballNumber, state, elements, storage) {
    if (state.drawSession.pickedBalls.length === 0) {
      return
    }

    const pickedBallIndex = state.drawSession.pickedBalls.findIndex((ball) => ball.number === ballNumber)
    if (pickedBallIndex === -1) {
      return
    }

    moveBallAtIndex(pickedBallIndex, state.drawSession.pickedBalls, state.drawSession.remainingBalls)
    clearCurrentBall(state, elements)
    renderPickedBalls(state, elements)
    renderControlPanel(state, elements)
    persistSession(state, storage)
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
    handlePickButtonClick,
    returnPickedBall
  }
}
