function main() {
  const { DEFAULT_TOTAL_COUNT } = window.SuksukApp.constants
  const { getElements } = window.SuksukApp.elements
  const { createState } = window.SuksukApp.state
  const { getBallContainerColumnCount, initGame } = window.SuksukApp.initGame
  const { resetCurrentSelection } = window.SuksukApp.picking
  const { bindEvents } = window.SuksukApp.events
  const { bindSetupModal } = window.SuksukApp.setupModal

  const storage = window.localStorage
  const state = createState()
  const elements = getElements()

  state.ballContainerColNum = getBallContainerColumnCount(window.screen.width)

  bindSetupModal({
    state,
    elements,
    storage,
    defaultTotal: DEFAULT_TOTAL_COUNT
  })

  initGame({
    state,
    elements,
    storage,
    defaultTotal: DEFAULT_TOTAL_COUNT,
    resetCurrentSelection
  })

  bindEvents({
    state,
    elements,
    storage,
    defaultTotal: DEFAULT_TOTAL_COUNT
  })
}

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.main = main
main()
