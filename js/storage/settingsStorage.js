function readStoredExcludedNumbers(storage) {
  const { STORAGE_KEYS } = window.SuksukApp.constants
  const rawValue = storage.getItem(STORAGE_KEYS.exnumbers)
  if (!rawValue) {
    return []
  }

  try {
    const parsedValue = JSON.parse(rawValue)
    return Array.isArray(parsedValue) ? parsedValue : []
  } catch {
    return []
  }
}

function getStoredSettings(storage, defaultTotal) {
  const { STORAGE_DEFAULT_USERNAME, STORAGE_KEYS } = window.SuksukApp.constants
  const storedTotal = Number(storage.getItem(STORAGE_KEYS.total) ?? defaultTotal)
  const total = Number.isInteger(storedTotal) && storedTotal > 0 ? storedTotal : defaultTotal

  return {
    username: storage.getItem(STORAGE_KEYS.username) ?? STORAGE_DEFAULT_USERNAME,
    total,
    exnumbers: readStoredExcludedNumbers(storage)
  }
}

function saveSettings(storage, settings) {
  const { STORAGE_KEYS } = window.SuksukApp.constants
  storage.setItem(STORAGE_KEYS.username, settings.username)
  storage.setItem(STORAGE_KEYS.total, String(settings.total))
  storage.setItem(STORAGE_KEYS.exnumbers, JSON.stringify(settings.exnumbers))
}

function resetStoredSettings(storage) {
  const { STORAGE_KEYS } = window.SuksukApp.constants
  storage.removeItem(STORAGE_KEYS.username)
  storage.removeItem(STORAGE_KEYS.total)
  storage.removeItem(STORAGE_KEYS.exnumbers)
}

window.SuksukApp = window.SuksukApp || {}
window.SuksukApp.settingsStorage = {
  getStoredSettings,
  saveSettings,
  resetStoredSettings
}
