function renderCurrentBall(state, elements) {
  if (!state.currentBall) {
    clearCurrentBall(state, elements)
    return
  }

  elements.ballDiv.innerText = state.currentBall.number
  elements.ballDiv.style.backgroundColor = state.currentBall.color
}

function clearCurrentBall(state, elements) {
  state.currentBall = null
  elements.ballDiv.innerText = ""
  elements.ballDiv.style.backgroundColor = "white"
}

function renderPickedBalls(state, elements) {
  emptyContainer(elements)

  for (let index = 0; index < state.pickedBalls.length; index += 1) {
    appendPickedBall(state.pickedBalls[index], index, elements, state)
  }
}

function emptyContainer(elements) {
  elements.ballContainerDiv.querySelectorAll(".row").forEach((rowElement) => rowElement.remove())
}

function appendPickedBall(ball, index, elements, state) {
  if (index % state.ballContainerColNum === 0) {
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

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.render = {
  renderCurrentBall,
  clearCurrentBall,
  renderPickedBalls,
  emptyContainer
}
