window.SuksukApp = window.SuksukApp || {}

window.SuksukApp.constants = {
  DEFAULT_TOTAL_COUNT: 10,
  DEFAULT_BALL_CONTAINER_COLS: 8,
  BALL_CONTAINER_COL_RULES: [
    { maxWidth: 300, columns: 3 },
    { maxWidth: 380, columns: 4 },
    { maxWidth: 450, columns: 5 },
    { maxWidth: 550, columns: 6 }
  ],
  PICKING_INTERVAL_MS: 60,
  STORAGE_DEFAULT_USERNAME: "noname",
  STORAGE_KEYS: {
    username: "username",
    total: "total",
    exnumbers: "exnumbers"
  },
  PICK_BUTTON_LABELS: {
    start: "시작",
    picking: "뽑아",
    picked: "쑥쑥",
    restart: "다시"
  }
}
