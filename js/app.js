import {
  DEFAULT_TOTAL_COUNT,
  DEFAULT_BALL_CONTAINER_COLS,
  STORAGE_DEFAULT_USERNAME,
  STORAGE_KEYS,
  RESERVATION_MESSAGES,
  BALL_CONTAINER_COL_RULES,
  PICK_BUTTON_LABELS,
  PICKING_INTERVAL_MS
} from "./constants.js"
import { getElements } from "./elements.js"
import { createState } from "./state/createState.js"
import { createSettingsStorage } from "./storage/settingsStorage.js"
import { createSessionStorage } from "./storage/sessionStorage.js"
import { createInitGame } from "./game/initGame.js"
import { createPicking } from "./game/picking.js"
import { createReservation } from "./game/reservation.js"
import { createSessionState } from "./game/sessionState.js"
import { bindEvents } from "./events/bindEvents.js"
import { createSettingsForm } from "./events/settingsForm.js"
import { createSetupModal } from "./ui/setupModal.js"
import * as render from "./ui/render.js"
import * as controlPanel from "./ui/controlPanel.js"

function main() {
  const storage = window.localStorage
  const state = createState({
    defaultBallContainerCols: DEFAULT_BALL_CONTAINER_COLS
  })
  const elements = getElements()

  const constants = {
    DEFAULT_TOTAL_COUNT,
    DEFAULT_BALL_CONTAINER_COLS,
    STORAGE_DEFAULT_USERNAME,
    STORAGE_KEYS,
    RESERVATION_MESSAGES,
    BALL_CONTAINER_COL_RULES,
    PICK_BUTTON_LABELS,
    PICKING_INTERVAL_MS
  }
  const settingsStorage = createSettingsStorage({
    storageKeys: STORAGE_KEYS,
    defaultUsername: STORAGE_DEFAULT_USERNAME
  })
  const sessionStorage = createSessionStorage({
    storageKeys: STORAGE_KEYS
  })
  const sessionState = createSessionState({ render, sessionStorage })
  const reservation = createReservation({
    render,
    sessionState,
    messages: RESERVATION_MESSAGES
  })
  const initGame = createInitGame({
    constants,
    settingsStorage,
    sessionStorage,
    render,
    sessionState
  })
  const picking = createPicking({
    constants,
    settingsStorage,
    render,
    initGame,
    sessionState,
    reservation
  })
  const settingsForm = createSettingsForm({
    settingsStorage,
    initGame,
    reservation
  })
  const setupModal = createSetupModal({
    settingsStorage,
    sessionState
  })

  state.ui.ballContainerColNum = initGame.getBallContainerColumnCount(window.innerWidth)

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

  bindEvents({
    state,
    elements,
    storage,
    defaultTotal: DEFAULT_TOTAL_COUNT,
    settingsStorage,
    sessionStorage,
    initGame,
    picking,
    settingsForm,
    reservation,
    controlPanel
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main, { once: true })
} else {
  main()
}
