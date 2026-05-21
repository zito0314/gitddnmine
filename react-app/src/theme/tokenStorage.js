import { defaultDarkTheme, defaultLightTheme, THEME_MODES } from './defaultTokens'
import { normalizeThemeToken } from './tokenUtils'

export const THEME_MODE_STORAGE_KEY = 'gitddn.theme.mode'
export const LIGHT_THEME_STORAGE_KEY = 'gitddn.theme.light'
export const DARK_THEME_STORAGE_KEY = 'gitddn.theme.dark'

const LEGACY_THEME_MODE_STORAGE_KEY = 'gitddn.themeMode'

function readJsonStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function readThemeMode() {
  const mode =
    window.localStorage.getItem(THEME_MODE_STORAGE_KEY) ||
    window.localStorage.getItem(LEGACY_THEME_MODE_STORAGE_KEY)

  return mode === THEME_MODES.dark ? THEME_MODES.dark : THEME_MODES.light
}

export function loadTokensFromStorage() {
  if (typeof window === 'undefined') {
    return {
      mode: THEME_MODES.light,
      lightTheme: defaultLightTheme,
      darkTheme: defaultDarkTheme,
    }
  }

  return {
    mode: readThemeMode(),
    lightTheme: normalizeThemeToken(readJsonStorage(LIGHT_THEME_STORAGE_KEY, defaultLightTheme)),
    darkTheme: normalizeThemeToken(readJsonStorage(DARK_THEME_STORAGE_KEY, defaultDarkTheme)),
  }
}

export function persistThemeMode(mode) {
  window.localStorage.setItem(THEME_MODE_STORAGE_KEY, mode)
}

export function persistLightTheme(theme) {
  window.localStorage.setItem(LIGHT_THEME_STORAGE_KEY, JSON.stringify(normalizeThemeToken(theme)))
}

export function persistDarkTheme(theme) {
  window.localStorage.setItem(DARK_THEME_STORAGE_KEY, JSON.stringify(normalizeThemeToken(theme)))
}

export function clearThemeTokenStorage() {
  window.localStorage.removeItem(THEME_MODE_STORAGE_KEY)
  window.localStorage.removeItem(LIGHT_THEME_STORAGE_KEY)
  window.localStorage.removeItem(DARK_THEME_STORAGE_KEY)
  window.localStorage.removeItem(LEGACY_THEME_MODE_STORAGE_KEY)
}
