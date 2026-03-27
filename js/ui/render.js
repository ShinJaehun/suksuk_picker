import { RESERVATION_STATUS_LABEL } from "../constants.js"

export function renderCurrentBall(state, elements) {
  const { currentBall } = state.drawSession
  if (!currentBall) {
    clearCurrentBall(state, elements)
    return
  }

  elements.ballDiv.innerText = currentBall.number
  elements.ballDiv.style.backgroundColor = currentBall.color
}

export function clearCurrentBall(state, elements) {
  state.drawSession.currentBall = null
  elements.ballDiv.innerText = ""
  elements.ballDiv.style.backgroundColor = "white"
}

export function renderPickedBalls(state, elements) {
  emptyContainer(elements)

  for (let index = 0; index < state.drawSession.pickedBalls.length; index += 1) {
    appendPickedBall(state.drawSession.pickedBalls[index], index, elements, state)
  }
}

export function renderControlPanel(state, elements) {
  const reservedBallLabel = state.control.nextReservedBall === null
    ? `${RESERVATION_STATUS_LABEL}: 없음`
    : `${RESERVATION_STATUS_LABEL}: ${state.control.nextReservedBall}`

  elements.reservedBallStatus.innerText = reservedBallLabel
  elements.reservationMessage.innerText = state.control.message
}

export function emptyContainer(elements) {
  elements.ballContainerDiv.querySelectorAll(".row").forEach((rowElement) => rowElement.remove())
}

function appendPickedBall(ball, index, elements, state) {
  if (index % state.ui.ballContainerColNum === 0) {
    const rowDiv = elements.ballContainerDiv.appendChild(document.createElement("div"))
    rowDiv.className = "row"
  }

  const lastRowDiv = elements.ballContainerDiv.lastElementChild
  const colDiv = lastRowDiv.appendChild(document.createElement("div"))
  colDiv.className = "picked-ball"
  colDiv.id = String(ball.number)
  colDiv.style.backgroundColor = ball.color
  colDiv.innerText = ball.number
}
