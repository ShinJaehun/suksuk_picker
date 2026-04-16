export function createInitGame({ constants, settingsStorage, sessionStorage, render, sessionState }) {
  const {
    BALL_CONTAINER_COL_RULES,
    DEFAULT_BALL_CONTAINER_COLS,
    PICK_BUTTON_LABELS
  } = constants
  const { getStoredSettings } = settingsStorage
  const { emptyContainer, renderPickedBalls, renderCurrentBall, renderControlPanel } = render
  const { resetCurrentSelection, persistSession } = sessionState

  function getBallContainerColumnCount(screenWidth) {
    for (let index = 0; index < BALL_CONTAINER_COL_RULES.length; index += 1) {
      const rule = BALL_CONTAINER_COL_RULES[index]
      if (screenWidth <= rule.maxWidth) {
        return rule.columns
      }
    }

    return DEFAULT_BALL_CONTAINER_COLS
  }

  function initGame({ state, elements, storage, defaultTotal }) {
    const settings = getStoredSettings(storage, defaultTotal)
    const storedSession = sessionStorage.loadSession(storage)

    applySettingsState(state, settings)

    if (canRestoreStoredSession(settings, storedSession)) {
      state.drawSession.stopped = true
      state.drawSession.interval = null
      state.drawSession.currentBall = storedSession.drawSession.currentBall
      state.drawSession.remainingBalls = storedSession.drawSession.remainingBalls
      state.drawSession.pickedBalls = storedSession.drawSession.pickedBalls
      state.control.nextReservedBall = getRestoredReservedBall(
        storedSession.control.nextReservedBall,
        state.drawSession.remainingBalls
      )
      state.control.message = ""

      if (elements.pickButton) {
        elements.pickButton.innerText = getPickButtonLabel(state)
      }
      renderCurrentBall(state, elements)
      renderPickedBalls(state, elements)
      renderControlPanel(state, elements)
      return
    }

    initBalls(state, elements, storage, settings.total, settings.exnumbers)
  }

  function initBalls(state, elements, storage, total, excludedNumbers) {
    applySettingsState(state, {
      username: state.settings.username,
      total,
      exnumbers: excludedNumbers
    })

    resetCurrentSelection(state, elements, storage)
    state.drawSession.remainingBalls = createRemainingBalls(total, excludedNumbers)
    state.drawSession.pickedBalls = []
    state.control.nextReservedBall = null
    state.control.message = ""

    emptyContainer(elements)
    if (elements.pickButton) {
      elements.pickButton.innerText = PICK_BUTTON_LABELS.start
    }
    if (elements.settingsModal) {
      elements.settingsModal.style.display = "none"
    }
    renderCurrentBall(state, elements)
    renderPickedBalls(state, elements)
    renderControlPanel(state, elements)
    persistSession(state, storage)
  }

  function parseExcludedNumbers(value, total) {
    const parsedNumbers = value
      .replace(/\s+/g, "")
      .split(",")
      .map((item) => Number(item))
      .filter((item) => Number.isInteger(item) && item > 0 && item <= total)

    return [...new Set(parsedNumbers)]
  }

  function randomColor() {
    const r = Math.floor(Math.random() * 241)
    const g = Math.floor(Math.random() * 241)
    const b = Math.floor(Math.random() * 241)
    return `rgb(${r}, ${g}, ${b})`
  }

  function createRemainingBalls(total, excludedNumbers) {
    const remainingBalls = []

    for (let number = 1; number <= total; number += 1) {
      if (!excludedNumbers.includes(number)) {
        remainingBalls.push({
          number,
          color: randomColor()
        })
      }
    }

    return remainingBalls
  }

  function applySettingsState(state, settings) {
    state.settings.username = settings.username ?? state.settings.username
    state.settings.total = settings.total
    state.settings.exnumbers = settings.exnumbers
  }

  function canRestoreStoredSession(settings, storedSession) {
    if (!storedSession.drawSession.remainingBalls.length && !storedSession.drawSession.pickedBalls.length) {
      return false
    }

    const validNumbers = new Set()
    for (let number = 1; number <= settings.total; number += 1) {
      if (!settings.exnumbers.includes(number)) {
        validNumbers.add(number)
      }
    }

    const combinedNumbers = [
      ...storedSession.drawSession.remainingBalls,
      ...storedSession.drawSession.pickedBalls
    ].map((ball) => ball.number)
    const uniqueNumbers = new Set(combinedNumbers)

    if (combinedNumbers.length !== validNumbers.size || uniqueNumbers.size !== combinedNumbers.length) {
      return false
    }

    return combinedNumbers.every((number) => validNumbers.has(number))
  }

  function getRestoredReservedBall(nextReservedBall, remainingBalls) {
    if (!Number.isInteger(nextReservedBall)) {
      return null
    }

    return remainingBalls.some((ball) => ball.number === nextReservedBall)
      ? nextReservedBall
      : null
  }

  function getPickButtonLabel(state) {
    if (state.drawSession.remainingBalls.length === 0) {
      return PICK_BUTTON_LABELS.restart
    }

    if (state.drawSession.remainingBalls.length === 1) {
      return PICK_BUTTON_LABELS.picked
    }

    return PICK_BUTTON_LABELS.start
  }

  return {
    getBallContainerColumnCount,
    initGame,
    initBalls,
    parseExcludedNumbers
  }
}
