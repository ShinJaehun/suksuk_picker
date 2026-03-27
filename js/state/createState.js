export function createState({ defaultBallContainerCols }) {
  return {
    settings: {
      username: "",
      total: null,
      exnumbers: []
    },
    drawSession: {
      stopped: true,
      interval: null,
      currentBall: null,
      remainingBalls: [],
      pickedBalls: []
    },
    control: {
      nextReservedBall: null,
      message: ""
    },
    ui: {
      ballContainerColNum: defaultBallContainerCols
    }
  }
}
