function createInitGameModule({ constants, settingsStorage, render }) {
  const {
    BALL_CONTAINER_COL_RULES,
    DEFAULT_BALL_CONTAINER_COLS,
    PICK_BUTTON_LABELS
  } = constants
  const { getStoredSettings } = settingsStorage
  const { emptyContainer } = render

  function getBallContainerColumnCount(screenWidth) {
    for (let index = 0; index < BALL_CONTAINER_COL_RULES.length; index += 1) {
      const rule = BALL_CONTAINER_COL_RULES[index]
      if (screenWidth <= rule.maxWidth) {
        return rule.columns
      }
    }

    return DEFAULT_BALL_CONTAINER_COLS
  }

  function initGame({ state, elements, storage, defaultTotal, resetCurrentSelection }) {
    const { total, exnumbers } = getStoredSettings(storage, defaultTotal)
    initBalls(state, elements, total, exnumbers, resetCurrentSelection)
  }

  function initBalls(state, elements, numbers, exnumbers, resetCurrentSelection) {
    resetCurrentSelection(state, elements)
    state.balls.length = 0
    state.pickedBalls.length = 0

    for (let number = 1; number <= numbers; number += 1) {
      if (!exnumbers.includes(number)) {
        state.balls.push({
          number,
          color: randomColor()
        })
      }
    }

    emptyContainer(elements)
    elements.pickButton.innerText = PICK_BUTTON_LABELS.start
    elements.settingsModal.style.display = "none"
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

  return {
    getBallContainerColumnCount,
    initGame,
    initBalls,
    parseExcludedNumbers,
    randomColor
  }
}

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.createInitGameModule = createInitGameModule
