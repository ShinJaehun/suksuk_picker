function createSessionStateModule({ render }) {
  const { clearCurrentBall } = render

  function stopPickingSession(state) {
    state.stopped = true
    clearInterval(state.interval)
    state.interval = null
  }

  function resetCurrentSelection(state, elements) {
    stopPickingSession(state)
    clearCurrentBall(state, elements)
  }

  return {
    stopPickingSession,
    resetCurrentSelection
  }
}

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.createSessionStateModule = createSessionStateModule
