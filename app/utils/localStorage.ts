export function getLocalStorageItem<T = string>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(key)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    return raw as unknown as T
  }
}

export function setLocalStorageItem<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocalStorageItem(key: string) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(key)
}
