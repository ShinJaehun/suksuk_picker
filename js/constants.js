export const DEFAULT_TOTAL_COUNT = 10
export const DEFAULT_BALL_CONTAINER_COLS = 8

export const BALL_CONTAINER_COL_RULES = [
  { maxWidth: 300, columns: 3 },
  { maxWidth: 380, columns: 4 },
  { maxWidth: 450, columns: 5 },
  { maxWidth: 550, columns: 6 }
]

export const PICKING_INTERVAL_MS = 60
export const STORAGE_DEFAULT_USERNAME = "noname"

export const STORAGE_KEYS = {
  username: "username",
  total: "total",
  exnumbers: "exnumbers",
  drawSession: "drawSession",
  controlState: "controlState"
}

export const PICK_BUTTON_LABELS = {
  start: "시작",
  picking: "뽑아",
  picked: "쑥쑥",
  restart: "다시"
}

export const RESERVATION_STATUS_LABEL = "현재 예약"

export const RESERVATION_MESSAGES = {
  idle: "",
  empty: "예약할 번호를 입력하세요.",
  invalid: "유효한 번호만 예약할 수 있습니다.",
  excluded: "제외된 번호는 예약할 수 없습니다.",
  picked: "이미 뽑힌 번호는 예약할 수 없습니다.",
  reserved: "다음 번호를 예약했습니다.",
  cleared: "예약을 취소했습니다."
}
