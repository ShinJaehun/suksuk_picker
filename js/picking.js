function picking(state, elements){
  if(state.stopped){
    state.stopped = false
    elements.pickButton.innerText = "뽑아"
    state.interval = setInterval(function(){
      let pickedNumber = Math.floor(Math.random() * state.balls.length)
      elements.ballDiv.innerText = state.balls[pickedNumber].number
      elements.ballDiv.style.backgroundColor = state.balls[pickedNumber].color
    }, 60)
  }else{
    state.stopped = true
    elements.pickButton.innerText = "쑥쑥"
    playSoundEffect()
    clearInterval(state.interval)
    state.interval = null
    getBall(state, elements)
  }
}

function playSoundEffect(){
  var audio = new Audio("resources/retro_coin.wav")
  audio.play()
}

function getBall(state, elements){
  let num = parseInt(elements.ballDiv.textContent)
  for(let i = 0; i < state.balls.length; i++){
    if(state.balls[i].number == num){
      toContainer(state.balls[i].number, state.balls[i].color, elements, state)
      moveBalls(i, state.balls, state.pickedBalls)
    }
  }
}

function initEventListener(state, elements){
  elements.ballContainerDiv.addEventListener("click", function(e){

    let target = e.target
    if(target.className!="picked-ball") return

    // console.log(target.id)
    // console.log(target.style.backgroundColor)

    // balls.push({
    //   "number":target.id,
    //   "color":target.style.backgroundColor
    // })

    if(state.pickedBalls.length == 0) {
      return
    }
    let num = state.pickedBalls.findIndex(ball => ball.number == target.id)
    moveBalls(num, state.pickedBalls, state.balls)

    // console.log(balls)
    // console.log(pickedBalls)

    target.remove()
    let pickedBallDivs=document.querySelectorAll(".picked-ball")
    let redrawBalls=[]
    for(let i=0; i<pickedBallDivs.length; i++){
      redrawBalls.push({"number":pickedBallDivs[i].id, "color":pickedBallDivs[i].style.backgroundColor})
    }
    
    emptyContainer()

    for(let i=0; i<pickedBallDivs.length; i++){
      toContainer(
        redrawBalls[i].number,
        redrawBalls[i].color,
        elements,
        state
      )
    }
  })
}

// function organizeBalls(num, balls, pickedBalls){
//   pickedBalls.push(new Ball(balls[num].number, balls[num].color))
//   let colDiv=toContainer(balls[num].number, balls[num].color, pickedBalls)
//   balls.splice(num, 1)
//   // console.log(balls)
//   return colDiv
// }

function moveBalls(num, ballsA, ballsB){
  // ballsB.push(new Ball(ballsA[num].number, ballsA[num].color))
  ballsB.push({
    "number":ballsA[num].number,
    "color":ballsA[num].color
  })
  ballsA.splice(num, 1)
  // console.log(ballsA)
  // console.log(ballsB)
}

function toContainer(number, color, elements, state){
  if(document.querySelectorAll(".ball-container .row .picked-ball").length==0 ||
    document.querySelectorAll(".ball-container .row .picked-ball").length%state.ballContainerColNum==0){
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

function emptyContainer(){
  document.querySelectorAll(".ball-container .row .picked-ball").forEach(el => el.remove());
  document.querySelectorAll(".ball-container .row").forEach(el=>el.remove())
}

// function vLerp(A,B,t){
//   const res={};
//   for(let attr in A){
//       res[attr]=lerp(A[attr],B[attr],t);
//   }
//   return res;
// }

// function lerp(a,b,t){
//   return a+(b-a)*t
// }
