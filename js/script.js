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
const DEFAULT_BALL_CONTAINER_COLS = 8
const BALL_CONTAINER_COL_RULES = [
  { maxWidth: 300, columns: 3 },
  { maxWidth: 380, columns: 4 },
  { maxWidth: 450, columns: 5 },
  { maxWidth: 550, columns: 6 }
]
const storage = localStorage
const state = {
  stopped: true,
  interval: null,
  currentBall: null,
  balls: [],
  pickedBalls: [],
  ballContainerColNum: DEFAULT_BALL_CONTAINER_COLS
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

function getStoredSettings(storage, defaultTotal) {
  return {
    username: storage["username"] ?? "noname",
    total: Number(storage["total"] ?? defaultTotal),
    exnumbers: storage["exnumbers"] ? JSON.parse(storage["exnumbers"]) : []
  }
}

function main() {
  bindSetupModal(state, storage, firstN, elements)
  state.ballContainerColNum = getBallContainerColumnCount(window.screen.width)

  init()
  
  elements.pickButton.addEventListener("click", function(){
    handlePickButtonClick(state, elements, storage, firstN)
  })

  settingForm.addEventListener("submit", (e) => {
    submitSettingsForm(e, state, elements, storage)
  });
  
  initBtn.onclick=function(){
    storage.clear()
    init()

  }

  initEventListener(state, elements)
}

function getBallContainerColumnCount(screenWidth){
  for (let i = 0; i < BALL_CONTAINER_COL_RULES.length; i++) {
    const rule = BALL_CONTAINER_COL_RULES[i]
    if(screenWidth <= rule.maxWidth){
      return rule.columns
    }
  }

  return DEFAULT_BALL_CONTAINER_COLS
}

function handlePickButtonClick(state, elements, storage, defaultTotal){
  if(state.balls.length > 1){
    picking(state, elements)
    return
  }

  if(state.balls.length === 1){
    finishLastBall(state, elements)
    return
  }

  restartPicking(state, elements, storage, defaultTotal)
}

function finishLastBall(state, elements){
  state.currentBall = state.balls[0]
  renderCurrentBall(state, elements)
  getBall(state, elements)
  elements.pickButton.innerText = "다시"
}

function restartPicking(state, elements, storage, defaultTotal){
  const { total, exnumbers } = getStoredSettings(storage, defaultTotal)
  initBalls(state, elements, total, exnumbers)
}

function submitSettingsForm(event, state, elements, storage){
  event.preventDefault()

  const validationMessage = validateSettingsForm(elements)
  if(validationMessage){
    alert(validationMessage)
    return
  }

  alert("입력한 내용을 반영합니다!")

  const settings = getSettingsFormValues(elements)
  saveSettings(storage, settings)
  initBalls(state, elements, settings.total, settings.exnumbers)
}

function validateSettingsForm(elements){
  if(elements.usernameInput.value === "" || elements.totalInput.value === ""){
    return "빈 칸을 모두 채우세요!"
  }

  if(!elements.totalInput.value.match("^[0-9]+$")){
    return "'인원'에는 숫자만 입력할 수 있습니다."
  }

  if(!elements.exnumbersInput.value.match("^\\s*[0-9]*\\s*(\\s*,\\s*[0-9]*\\s*)*$")){
    return "'제외할 번호'에는 숫자와 쉼표만 입력할 수 있습니다."
  }

  return null
}

function getSettingsFormValues(elements){
  const total = Number(elements.totalInput.value.trim())

  return {
    username: elements.usernameInput.value.trim(),
    total,
    exnumbers: parseExcludedNumbers(elements.exnumbersInput.value, total)
  }
}

function saveSettings(storage, settings){
  storage["username"] = settings.username
  storage["total"] = settings.total
  storage["exnumbers"] = JSON.stringify(settings.exnumbers)
}

function init(){
  const { total, exnumbers } = getStoredSettings(storage, firstN)

  initBalls(state, elements, total, exnumbers)
}
  
function initBalls(state, elements, numbers, exnumbers){
  resetCurrentSelection(state, elements)

  state.balls.length = 0
  state.pickedBalls.length = 0

  for (let i=1; i<=numbers; i++){
    if(!exnumbers.includes(i)){
      state.balls.push({
        "number":i,
        "color":randomColor()
      })
    }
  }
  emptyContainer(elements)

  elements.pickButton.innerText = "시작"
  elements.settingsModal.style.display="none"
}

function randomColor(){
  let r = Math.floor(Math.random() * 241);
  let g = Math.floor(Math.random() * 241);
  let b = Math.floor(Math.random() * 241);
  return `rgb(${r}, ${g}, ${b})`;
}

function parseExcludedNumbers(value, total){
  const parsedNumbers = value
    .replace(/\s+/g, "")
    .split(",")
    .map(x => Number(x))
    .filter(x => Number.isInteger(x) && x > 0 && x <= total)

  return [...new Set(parsedNumbers)]
}
