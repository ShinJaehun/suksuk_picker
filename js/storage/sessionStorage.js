function readJson(storage, key) {
  const rawValue = storage.getItem(key)
  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue)
  } catch {
    return null
  }
}

function normalizeBall(ball) {
  if (!ball || !Number.isInteger(ball.number) || typeof ball.color !== "string") {
    return null
  }

  return {
    number: ball.number,
    color: ball.color
  }
}

function normalizeBallList(balls) {
  if (!Array.isArray(balls)) {
    return []
  }

  return balls
    .map((ball) => normalizeBall(ball))
    .filter((ball) => ball !== null)
}

export function createSessionStorage({ storageKeys }) {
  function saveSession(storage, drawSession, control) {
    const storedSession = {
      stopped: drawSession.stopped,
      currentBall: drawSession.currentBall,
      remainingBalls: drawSession.remainingBalls,
      pickedBalls: drawSession.pickedBalls
    }
    const storedControl = {
      nextReservedBall: control.nextReservedBall
    }

    storage.setItem(storageKeys.drawSession, JSON.stringify(storedSession))
    storage.setItem(storageKeys.controlState, JSON.stringify(storedControl))
  }

  function loadSession(storage) {
    const rawSession = readJson(storage, storageKeys.drawSession)
    const rawControl = readJson(storage, storageKeys.controlState)

    return {
      drawSession: {
        stopped: rawSession?.stopped !== false,
        currentBall: normalizeBall(rawSession?.currentBall),
        remainingBalls: normalizeBallList(rawSession?.remainingBalls),
        pickedBalls: normalizeBallList(rawSession?.pickedBalls)
      },
      control: {
        nextReservedBall: Number.isInteger(rawControl?.nextReservedBall)
          ? rawControl.nextReservedBall
          : null
      }
    }
  }

  function resetSession(storage) {
    storage.removeItem(storageKeys.drawSession)
    storage.removeItem(storageKeys.controlState)
  }

  return {
    saveSession,
    loadSession,
    resetSession
  }
}
