export function bindEvents({
  state,
  elements,
  storage,
  defaultTotal,
  settingsStorage,
  sessionStorage,
  initGame,
  picking,
  settingsForm,
  reservation,
  controlPanel
}) {
  const { resetStoredSettings } = settingsStorage
  const { resetSession } = sessionStorage
  const { initGame: startGame } = initGame
  const { handlePickButtonClick, returnPickedBall } = picking
  const { submitSettingsForm } = settingsForm
  const { reserveNextBall, clearReservedBall, clearReservationSilently } = reservation

  elements.pickButton.addEventListener("click", function () {
    handlePickButtonClick(state, elements, storage, defaultTotal)
  })

  elements.settingForm.addEventListener("submit", function (event) {
    submitSettingsForm(event, state, elements, storage)
  })

  elements.initBtn.addEventListener("click", function () {
    resetStoredSettings(storage)
    resetSession(storage)
    clearReservationSilently(state, elements, storage)
    startGame({ state, elements, storage, defaultTotal })
  })

  elements.ballContainerDiv.addEventListener("click", function (event) {
    const clickedBallNumber = getClickedPickedBallNumber(event)
    if (clickedBallNumber === null) {
      return
    }

    returnPickedBall(clickedBallNumber, state, elements, storage)
  })

  elements.reservationForm.addEventListener("submit", function (event) {
    event.preventDefault()
    const ballNumber = controlPanel.readReservedBallInput(elements)
    const reserved = reserveNextBall({ state, elements, storage, ballNumber })

    if (reserved) {
      controlPanel.clearReservedBallInput(elements)
    }
  })

  elements.clearReservedBallButton.addEventListener("click", function () {
    clearReservedBall({ state, elements, storage })
    controlPanel.clearReservedBallInput(elements)
  })
}

function getClickedPickedBallNumber(event) {
  const target = event.target.closest(".picked-ball")
  if (!target) {
    return null
  }

  return Number(target.id)
}
