import { defaultDarkTheme, defaultLightTheme, THEME_MODES } from './defaultTokens'
import { normalizeThemeToken } from './tokenUtils'

export const THEME_MODE_STORAGE_KEY = 'gitddn.theme.mode'
export const LIGHT_THEME_STORAGE_KEY = 'gitddn.theme.light'
export const DARK_THEME_STORAGE_KEY = 'gitddn.theme.dark'
export const THEME_VERSION_STORAGE_KEY = 'gitddn.theme.version'
export const THEME_TOKEN_VERSION = 'figma-theme-buddy-2026-05-27'

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

function mergeComponents(defaultComponents, storedComponents) {
  const components = { ...defaultComponents }

  Object.entries(storedComponents).forEach(([componentName, componentTokens]) => {
    components[componentName] = {
      ...(components[componentName] ?? {}),
      ...componentTokens,
    }
  })

  return components
}

export function mergeTheme(defaultTheme, storedTheme) {
  const normalizedDefault = normalizeThemeToken(defaultTheme)
  const normalizedStored = normalizeThemeToken(storedTheme)

  return {
    token: {
      ...normalizedDefault.token,
      ...normalizedStored.token,
    },
    components: mergeComponents(normalizedDefault.components, normalizedStored.components),
  }
}

export function loadTokensFromStorage() {
  if (typeof window === 'undefined') {
    return {
      mode: THEME_MODES.light,
      lightTheme: defaultLightTheme,
      darkTheme: defaultDarkTheme,
    }
  }

  const isCurrentThemeVersion = window.localStorage.getItem(THEME_VERSION_STORAGE_KEY) === THEME_TOKEN_VERSION
  const storedLightTheme = isCurrentThemeVersion
    ? readJsonStorage(LIGHT_THEME_STORAGE_KEY, defaultLightTheme)
    : defaultLightTheme
  const storedDarkTheme = isCurrentThemeVersion
    ? readJsonStorage(DARK_THEME_STORAGE_KEY, defaultDarkTheme)
    : defaultDarkTheme

  return {
    mode: readThemeMode(),
    lightTheme: mergeTheme(defaultLightTheme, storedLightTheme),
    darkTheme: mergeTheme(defaultDarkTheme, storedDarkTheme),
  }
}

export function persistThemeMode(mode) {
  window.localStorage.setItem(THEME_MODE_STORAGE_KEY, mode)
}

export function persistLightTheme(theme) {
  window.localStorage.setItem(THEME_VERSION_STORAGE_KEY, THEME_TOKEN_VERSION)
  window.localStorage.setItem(LIGHT_THEME_STORAGE_KEY, JSON.stringify(normalizeThemeToken(theme)))
}

export function persistDarkTheme(theme) {
  window.localStorage.setItem(THEME_VERSION_STORAGE_KEY, THEME_TOKEN_VERSION)
  window.localStorage.setItem(DARK_THEME_STORAGE_KEY, JSON.stringify(normalizeThemeToken(theme)))
}

export function clearThemeTokenStorage() {
  window.localStorage.removeItem(THEME_MODE_STORAGE_KEY)
  window.localStorage.removeItem(LIGHT_THEME_STORAGE_KEY)
  window.localStorage.removeItem(DARK_THEME_STORAGE_KEY)
  window.localStorage.removeItem(THEME_VERSION_STORAGE_KEY)
  window.localStorage.removeItem(LEGACY_THEME_MODE_STORAGE_KEY)
}
