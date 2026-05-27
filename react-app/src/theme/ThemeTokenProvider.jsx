import { useCallback, useEffect, useMemo, useState } from 'react'
import { defaultDarkTheme, defaultLightTheme, THEME_MODES } from './defaultTokens'
import {
  clearThemeTokenStorage,
  loadTokensFromStorage,
  mergeTheme,
  persistDarkTheme,
  persistLightTheme,
  persistThemeMode,
} from './tokenStorage'
import { applyThemeCssVariables, buildAntdTheme } from './tokenUtils'
import { ThemeTokenContext } from './themeTokenContext'

export function ThemeTokenProvider({ children }) {
  const initialState = useMemo(() => loadTokensFromStorage(), [])
  const [mode, setMode] = useState(initialState.mode)
  const [lightTheme, setLightTheme] = useState(initialState.lightTheme)
  const [darkTheme, setDarkTheme] = useState(initialState.darkTheme)

  const activeThemeSource = mode === THEME_MODES.dark ? darkTheme : lightTheme
  const activeTheme = useMemo(() => buildAntdTheme(activeThemeSource), [activeThemeSource])

  const setThemeMode = useCallback((nextMode) => {
    const safeMode = nextMode === THEME_MODES.dark ? THEME_MODES.dark : THEME_MODES.light
    setMode(safeMode)
    persistThemeMode(safeMode)
  }, [])

  const applyLightTheme = useCallback((json) => {
    const normalized = mergeTheme(defaultLightTheme, json)
    setLightTheme(normalized)
    persistLightTheme(normalized)
    setThemeMode(THEME_MODES.light)
  }, [setThemeMode])

  const applyDarkTheme = useCallback((json) => {
    const normalized = mergeTheme(defaultDarkTheme, json)
    setDarkTheme(normalized)
    persistDarkTheme(normalized)
    setThemeMode(THEME_MODES.dark)
  }, [setThemeMode])

  const applyCurrentTheme = useCallback((json) => {
    if (mode === THEME_MODES.dark) applyDarkTheme(json)
    else applyLightTheme(json)
  }, [applyDarkTheme, applyLightTheme, mode])

  const resetThemeTokens = useCallback(() => {
    clearThemeTokenStorage()
    setMode(THEME_MODES.light)
    setLightTheme(defaultLightTheme)
    setDarkTheme(defaultDarkTheme)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    applyThemeCssVariables(activeTheme)
  }, [activeTheme, mode])

  const value = useMemo(
    () => ({
      mode,
      themeMode: mode,
      lightTheme,
      darkTheme,
      activeTheme,
      setThemeMode,
      applyLightTheme,
      applyDarkTheme,
      applyCurrentTheme,
      resetThemeTokens,
      isDarkMode: mode === THEME_MODES.dark,
    }),
    [
      activeTheme,
      applyCurrentTheme,
      applyDarkTheme,
      applyLightTheme,
      darkTheme,
      lightTheme,
      mode,
      resetThemeTokens,
      setThemeMode,
    ],
  )

  return <ThemeTokenContext.Provider value={value}>{children}</ThemeTokenContext.Provider>
}
