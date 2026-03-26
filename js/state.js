window.SuksukApp = window.SuksukApp || {}

window.SuksukApp.state = {
  createState() {
    const { DEFAULT_BALL_CONTAINER_COLS } = window.SuksukApp.constants

    return {
      stopped: true,
      interval: null,
      currentBall: null,
      balls: [],
      pickedBalls: [],
      ballContainerColNum: DEFAULT_BALL_CONTAINER_COLS
    }
  }
}
