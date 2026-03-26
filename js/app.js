function main() {
  const app = window.SuksukApp
  const { DEFAULT_TOTAL_COUNT } = app.constants
  const { getElements } = app.elements
  const { createState } = app.state

  const render = app.render
  const settingsStorage = app.settingsStorage
  const initGame = app.createInitGameModule({
    constants: app.constants,
    settingsStorage,
    render
  })
  const picking = app.createPickingModule({
    constants: app.constants,
    settingsStorage,
    render,
    initGame
  })
  const setupModal = app.createSetupModalModule({
    settingsStorage,
    picking
  })
  const events = app.createEventsModule({
    settingsStorage,
    initGame,
    picking
  })

  const storage = window.localStorage
  const state = createState()
  const elements = getElements()

  state.ballContainerColNum = initGame.getBallContainerColumnCount(window.screen.width)

  setupModal.bindSetupModal({
    state,
    elements,
    storage,
    defaultTotal: DEFAULT_TOTAL_COUNT
  })

  initGame.initGame({
    state,
    elements,
    storage,
    defaultTotal: DEFAULT_TOTAL_COUNT,
    resetCurrentSelection: picking.resetCurrentSelection
  })

  events.bindEvents({
    state,
    elements,
    storage,
    defaultTotal: DEFAULT_TOTAL_COUNT
  })
}

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.main = main
main()
