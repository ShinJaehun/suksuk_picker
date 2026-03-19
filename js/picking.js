// function picking(balls, pickedBalls){
function picking(){
    if(stopped){
    stopped=false
    pickButton.innerText = "뽑아"
    interval = setInterval(function(){
      let pickedNumber = Math.floor(Math.random() * balls.length)
      ballDiv.innerText = balls[pickedNumber].number
      ballDiv.style.backgroundColor=balls[pickedNumber].color
      // ballDiv.style.textShadow="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
    }, 60)

  }else{
    stopped=true
    pickButton.innerText = "쑥쑥"
    playSoundEffect()
    clearInterval(interval)
    interval=null;
    // getBall(balls, pickedBalls)
    getBall()

  }
}

function playSoundEffect(){
  var audio = new Audio("resources/retro_coin.wav")
  audio.play()
}

// function getBall(balls, pickedBalls){
function getBall(){
  let num=parseInt(ballDiv.textContent)
  for(let i=0; i<balls.length; i++){
    if(balls[i].number==num){
      // 이렇게 하니까 클릭 이후에 새로 그려진 pickedBalls에는 이벤트핸들러가 사라짐
      // let lastPickedBallDiv = organizeBalls(i, balls, pickedBalls)
      // lastPickedBallDiv.addEventListener("click", function(){
      //   let num = pickedBalls.findIndex(ball => ball.number == lastPickedBallDiv.id)
      //   // console.log(pickedBalls.findIndex(ball => ball.number == number))
      //   balls.push(new Ball(pickedBalls[num].number, pickedBalls[num].color))

      //   pickedBalls.splice(num, 1)
      
      // console.log(balls)
      // console.log(pickedBalls)

      //   emptyContainer()

      //   for(let i=0; i<pickedBalls.length; i++){
      //     toContainer(pickedBalls[i].number, pickedBalls[i].color)
      //   }
      // })
 
      // const lastPickedBallDiv=toContainer(balls[i].number, balls[i].color)
      toContainer(balls[i].number, balls[i].color)
      moveBalls(i, balls, pickedBalls)
      
      // initEventListener(pickedBalls)
      // lastPickedBallDiv.addEventListener("click", function(e){
      //   let num = pickedBalls.findIndex(ball=>ball.number==e.target.id)
      //   moveBalls(num, pickedBalls, balls)
      //   // e.target.remove()
      //   emptyContainer()
      //   for(let i=0; i<pickedBalls.length; i++){
      //     toContainer(pickedBalls[i].number, pickedBalls[i].color)

      //     let testDiv=document.querySelector(".ball-container .row"+" #"+pickedBalls[i].number)
      //     console.log(testDiv)
      //     testDiv.addEventListener()
      //   }
      // })
    }
  }
}

// function initEventListener(balls, pickedBalls){

function initEventListener(){
  let ballContainerDiv=document.querySelector(".ball-container")
  ballContainerDiv.addEventListener("click", function(e){

    let target = e.target
    if(target.className!="picked-ball") return

    // console.log(target.id)
    // console.log(target.style.backgroundColor)

    // balls.push({
    //   "number":target.id,
    //   "color":target.style.backgroundColor
    // })

    if(pickedBalls.length==0) {
      // console.log("여기서 return 해버리는거야?")
      return
    }
    let num = pickedBalls.findIndex(ball => ball.number == target.id)
    moveBalls(num, pickedBalls, balls)

    // console.log(balls)
    // console.log(pickedBalls)

    target.remove()
    // console.log(target.id)

    let pickedBallDivs=document.querySelectorAll(".picked-ball")
    // console.log(pickedBallDivs.id)

    // console.log(balls)
    let redrawBalls=[]
    for(let i=0; i<pickedBallDivs.length; i++){
      redrawBalls.push({"number":pickedBallDivs[i].id, "color":pickedBallDivs[i].style.backgroundColor})
      // console.log(pickedBallDivs[i].id)
      // console.log(pickedBallDivs[i].style.backgroundColor)
    }
    
    emptyContainer()

    for(let i=0; i<pickedBallDivs.length; i++){
      toContainer(
        redrawBalls[i].number,
        redrawBalls[i].color
      )
    }

    // let pickedBalls=    

    // emptyContainer()

    // for(let i=0; i<pickedBalls.length; i++){
    //   toContainer(pickedBalls[i].number, pickedBalls[i].color)
    // }
    
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

function toContainer(number, color){
  if(document.querySelectorAll(".ball-container .row .picked-ball").length==0 ||
    document.querySelectorAll(".ball-container .row .picked-ball").length%ballContainerColNum==0){
    let rowDiv=ballContainerDiv.appendChild(document.createElement("div"))
    rowDiv.className="row"
  }

  let lastRowDiv=ballContainerDiv.lastElementChild
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
