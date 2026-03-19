const ballDiv = document.querySelector(".ball")
const ballContainerDiv = document.querySelector(".ball-container")
// const pickedBallDivs = document.querySelectorAll(".picked-ball")

const pickButton = document.getElementById("pick")
const setupBtn = document.getElementById("setup")
const settingForm = document.getElementById("setting-form");
const initBtn=document.getElementById("init");
const settingsModal = document.getElementById("settings");
const closeSpan = document.getElementById("close");
const cancelBtn = document.getElementById("cancel");
const usernameInput = document.getElementById("username");
const totalInput = document.getElementById("total");
const exnumbersInput = document.getElementById("exnumbers");

const firstN=10
const storage = localStorage
const state = {
  stopped: true,
  interval: null,
  balls: [],
  pickedBalls: [],
  ballContainerColNum: 8
}
const elements = {
  ballDiv,
  ballContainerDiv,
  pickButton,
  setupBtn,
  settingsModal,
  closeSpan,
  cancelBtn,
  usernameInput,
  totalInput,
  exnumbersInput
}

function main() {
  bindSetupModal(state, storage, firstN, elements)

  if (window.screen.width <= 550) {
    state.ballContainerColNum=6
  }

  if (window.screen.width <= 450) {
    state.ballContainerColNum=5
  }

  if (window.screen.width <= 380) {
    state.ballContainerColNum=4
  }

  if (window.screen.width <= 300) {
    state.ballContainerColNum=3
  }

  init()
  
  pickButton.addEventListener("click", function(){
    if(state.balls.length > 1){
      picking(state, elements)

    }else if(state.balls.length == 1){
      ballDiv.innerText = state.balls[0].number
      ballDiv.style.backgroundColor = state.balls[0].color

      getBall(state, elements)

      pickButton.innerText = "다시"
    }else{
      let total=storage['total'] ?? firstN
      let exnumbers=storage['exnumbers'] ? JSON.parse(storage['exnumbers']) : null 

      initBalls(total, exnumbers)
    }
  })

  settingForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    if(elements.usernameInput.value=="" || elements.totalInput.value == ""){
      alert("빈 칸을 모두 채우세요!");
    }else if(!elements.totalInput.value.match("^[0-9]+$")){
      alert("'인원'에는 숫자만 입력할 수 있습니다.");
    }else if(!elements.exnumbersInput.value.match("^[0-9]*(,*[0-9]*)*$")){
      alert("'제외할 번호'에는 숫자와 쉼표만 입력할 수 있습니다.")
    }else{
      alert("입력한 내용을 반영합니다!");

      let username=elements.usernameInput.value.trim()
      let total=elements.totalInput.value.trim()
      let exnumbers=elements.exnumbersInput.value.split(",").map(Number).filter(x=>x>0 && x<total)

      // console.log(total)
      // console.log(exnumbers)

      storage['username']=username
      storage['total']=total
      storage['exnumbers']=JSON.stringify(exnumbers)

      initBalls(total, exnumbers)
    }
  });
  
  initBtn.onclick=function(){
    storage.clear()
    init()

  }

  initEventListener(state, elements)
}

function init(){
  let total=storage['total'] ?? firstN
  let exnumbers=storage['exnumbers'] ? JSON.parse(storage['exnumbers']) : null 

  initBalls(total, exnumbers)
}
  
function initBalls(numbers, exnumbers){
  let balls_length = state.balls.length
  for (let i=0; i < balls_length; i++) {
    state.balls.pop()
  }

  let pickedBalls_length = state.pickedBalls.length
  for (let i=0; i < pickedBalls_length; i++) {
    state.pickedBalls.pop()
  }

  if(exnumbers != null){
    for (let i=1; i<=numbers; i++){
      if(!exnumbers.includes(i)){
        state.balls.push({
          "number":i,
          "color":randomColor()
        })
      }
    }
  }else{
    for (let i=1; i<=numbers; i++){
      state.balls.push({
        "number":i,
        "color":randomColor()
      })
    }
  }
  emptyContainer()  

  pickButton.innerText = "시작" 
  ballDiv.style.backgroundColor="white"
  elements.settingsModal.style.display="none"
}

function randomColor(){
  let r = Math.floor(Math.random() * 241);
  let g = Math.floor(Math.random() * 241);
  let b = Math.floor(Math.random() * 241);
  return `rgb(${r}, ${g}, ${b})`;
}
