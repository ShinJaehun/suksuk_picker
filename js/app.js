function main() {
  const app = window.SuksukApp
  const {
    DEFAULT_TOTAL_COUNT,
    DEFAULT_BALL_CONTAINER_COLS,
    STORAGE_DEFAULT_USERNAME,
    STORAGE_KEYS
  } = app.constants
  const { getElements } = app.elements
  const stateModule = app.createStateModule({
    defaultBallContainerCols: DEFAULT_BALL_CONTAINER_COLS
  })
  const settingsStorage = app.createSettingsStorageModule({
    storageKeys: STORAGE_KEYS,
    defaultUsername: STORAGE_DEFAULT_USERNAME
  })
  const render = app.render
  const sessionState = app.createSessionStateModule({ render })
  const initGame = app.createInitGameModule({
    constants: app.constants,
    settingsStorage,
    render,
    sessionState
  })
  const picking = app.createPickingModule({
    constants: app.constants,
    settingsStorage,
    render,
    initGame,
    sessionState
  })
  const setupModal = app.createSetupModalModule({
    settingsStorage,
    sessionState
  })
  const events = app.createEventsModule({
    settingsStorage,
    initGame,
    picking,
    sessionState,
    settingsForm: app.createSettingsFormModule({
      settingsStorage,
      initGame
    })
  })

  const storage = window.localStorage
  const state = stateModule.createState()
  const elements = getElements()

  state.ballContainerColNum = initGame.getBallContainerColumnCount(window.innerWidth)

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
    defaultTotal: DEFAULT_TOTAL_COUNT
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main, { once: true })
} else {
  main()
}
