function picking(state, elements){
  if(state.stopped){
    state.stopped = false
    elements.pickButton.innerText = "뽑아"
    state.interval = setInterval(function(){
      let pickedNumber = Math.floor(Math.random() * state.balls.length)
      state.currentBall = state.balls[pickedNumber]
      elements.ballDiv.innerText = state.currentBall.number
      elements.ballDiv.style.backgroundColor = state.currentBall.color
    }, 60)
  }else{
    elements.pickButton.innerText = "쑥쑥"
    playSoundEffect()
    stopPickingSession(state)
    getBall(state, elements)
  }
}

function playSoundEffect(){
  var audio = new Audio("resources/retro_coin.wav")
  audio.play()
}

function getBall(state, elements){
  if(!state.currentBall) {
    return
  }

  let num = state.currentBall.number
  for(let i = 0; i < state.balls.length; i++){
    if(state.balls[i].number == num){
      moveBalls(i, state.balls, state.pickedBalls)
      renderPickedBalls(state, elements)
      break
    }
  }
}

function stopPickingSession(state){
  state.stopped = true
  clearInterval(state.interval)
  state.interval = null
}

function resetCurrentSelection(state, elements){
  stopPickingSession(state)
  clearCurrentBall(state, elements)
}

function initEventListener(state, elements){
  elements.ballContainerDiv.addEventListener("click", function(e){

    let target = e.target.closest(".picked-ball")
    if(!target) return

    // console.log(target.id)
    // console.log(target.style.backgroundColor)

    if(state.pickedBalls.length == 0) {
      return
    }

    // 클릭한 공의 id를 읽어서 pickedBalls -> balls로 이동
    let num = state.pickedBalls.findIndex(ball => ball.number == target.id)
    if (num === -1) {
      return
    }

    moveBalls(num, state.pickedBalls, state.balls)
    clearCurrentBall(state, elements)
    renderPickedBalls(state, elements)
  })
}

function renderPickedBalls(state, elements) {
  emptyContainer(elements)

  for (let i = 0; i < state.pickedBalls.length; i++) {
    toContainer(
      state.pickedBalls[i].number,
      state.pickedBalls[i].color,
      i,
      elements,
      state
    )
  }
}

function moveBalls(num, ballsA, ballsB){
  if(num < 0 || num >= ballsA.length){
    return
  }

  ballsB.push({
    "number":ballsA[num].number,
    "color":ballsA[num].color
  })
  ballsA.splice(num, 1)
  // console.log(ballsA)
  // console.log(ballsB)
}

function clearCurrentBall(state, elements){
  state.currentBall = null
  elements.ballDiv.innerText = ""
  elements.ballDiv.style.backgroundColor = "white"
}

function toContainer(number, color, index, elements, state){
  if(index % state.ballContainerColNum == 0){
    let rowDiv=elements.ballContainerDiv.appendChild(document.createElement("div"))
    rowDiv.className="row"
  }

  let lastRowDiv=elements.ballContainerDiv.lastElementChild
  let colDiv=lastRowDiv.appendChild(document.createElement("div"))
  colDiv.className="picked-ball"
  colDiv.id=number
  colDiv.style="background-color:"+color
  colDiv.innerText=number
  // return colDiv
}

function emptyContainer(elements){
  elements.ballContainerDiv.querySelectorAll(".row").forEach(el => el.remove())
}
