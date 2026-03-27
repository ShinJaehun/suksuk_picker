export function createSessionState({ render, sessionStorage }) {
  const { clearCurrentBall } = render

  function persistSession(state, storage) {
    sessionStorage.saveSession(storage, state.drawSession, state.control)
  }

  function stopPickingSession(state, storage) {
    state.drawSession.stopped = true
    clearInterval(state.drawSession.interval)
    state.drawSession.interval = null

    if (storage) {
      persistSession(state, storage)
    }
  }

  function resetCurrentSelection(state, elements, storage) {
    stopPickingSession(state, storage)
    clearCurrentBall(state, elements)

    if (storage) {
      persistSession(state, storage)
    }
  }

  return {
    persistSession,
    stopPickingSession,
    resetCurrentSelection
  }
}
