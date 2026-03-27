export function createSettingsStorage({ storageKeys, defaultUsername }) {
  function readStoredExcludedNumbers(storage) {
    const rawValue = storage.getItem(storageKeys.exnumbers)
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
    const storedTotal = Number(storage.getItem(storageKeys.total) ?? defaultTotal)
    const total = Number.isInteger(storedTotal) && storedTotal > 0 ? storedTotal : defaultTotal

    return {
      username: storage.getItem(storageKeys.username) ?? defaultUsername,
      total,
      exnumbers: readStoredExcludedNumbers(storage)
    }
  }

  function saveSettings(storage, settings) {
    storage.setItem(storageKeys.username, settings.username)
    storage.setItem(storageKeys.total, String(settings.total))
    storage.setItem(storageKeys.exnumbers, JSON.stringify(settings.exnumbers))
  }

  function resetStoredSettings(storage) {
    storage.removeItem(storageKeys.username)
    storage.removeItem(storageKeys.total)
    storage.removeItem(storageKeys.exnumbers)
  }

  return {
    getStoredSettings,
    saveSettings,
    resetStoredSettings
  }
}
