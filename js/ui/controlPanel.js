export function readReservedBallInput(elements) {
  const rawValue = elements.nextReservedBallInput.value.trim()
  if (rawValue === "") {
    return null
  }

  return Number(rawValue)
}

export function clearReservedBallInput(elements) {
  elements.nextReservedBallInput.value = ""
}
