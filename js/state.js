function createStateModule({ defaultBallContainerCols }) {
  function createState() {
    return {
      stopped: true,
      interval: null,
      currentBall: null,
      balls: [],
      pickedBalls: [],
      ballContainerColNum: defaultBallContainerCols
    }
  }

  return {
    createState
  }
}

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.createStateModule = createStateModule
