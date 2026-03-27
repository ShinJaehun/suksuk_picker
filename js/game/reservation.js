export function createReservation({ render, sessionState, messages }) {
  const { renderControlPanel } = render
  const { persistSession } = sessionState

  function reserveNextBall({ state, elements, storage, ballNumber }) {
    const validationResult = validateReservedBall(state, ballNumber)
    if (validationResult) {
      setReservationMessage(state, elements, validationResult)
      return false
    }

    state.control.nextReservedBall = ballNumber
    setReservationMessage(state, elements, messages.reserved)
    persistSession(state, storage)
    return true
  }

  function clearReservedBall({ state, elements, storage, message = messages.cleared }) {
    state.control.nextReservedBall = null
    setReservationMessage(state, elements, message)
    persistSession(state, storage)
  }

  function clearReservationSilently(state, elements, storage) {
    state.control.nextReservedBall = null
    state.control.message = messages.idle
    renderControlPanel(state, elements)
    persistSession(state, storage)
  }

  function consumeReservedBall(state, elements, storage) {
    const reservedBall = findRemainingBall(state, state.control.nextReservedBall)
    if (!reservedBall) {
      return null
    }

    state.control.nextReservedBall = null
    state.control.message = messages.idle
    renderControlPanel(state, elements)
    persistSession(state, storage)
    return reservedBall
  }

  function validateReservedBall(state, ballNumber) {
    if (ballNumber === null) {
      return messages.empty
    }

    if (!Number.isInteger(ballNumber)) {
      return messages.invalid
    }

    if (ballNumber <= 0 || ballNumber > state.settings.total) {
      return messages.invalid
    }

    if (state.settings.exnumbers.includes(ballNumber)) {
      return messages.excluded
    }

    if (!findRemainingBall(state, ballNumber)) {
      return messages.picked
    }

    return null
  }

  function findRemainingBall(state, ballNumber) {
    if (!Number.isInteger(ballNumber)) {
      return null
    }

    return state.drawSession.remainingBalls.find((ball) => ball.number === ballNumber) ?? null
  }

  function setReservationMessage(state, elements, message) {
    state.control.message = message
    renderControlPanel(state, elements)
  }

  return {
    reserveNextBall,
    clearReservedBall,
    clearReservationSilently,
    consumeReservedBall
  }
}
