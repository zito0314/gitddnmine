import { useEffect, useMemo, useState } from 'react'
import { ThemeModeContext } from './themeModeContext'
import { THEME_MODES, THEME_MODE_STORAGE_KEY, getGitddnTheme } from './theme'

function getInitialThemeMode() {
  if (typeof window === 'undefined') return THEME_MODES.light

  const storedMode = window.localStorage.getItem(THEME_MODE_STORAGE_KEY)
  return storedMode === THEME_MODES.dark ? THEME_MODES.dark : THEME_MODES.light
}

export function ThemeModeProvider({ children }) {
  const [themeMode, setThemeModeState] = useState(getInitialThemeMode)

  const setThemeMode = (nextMode) => {
    const safeMode = nextMode === THEME_MODES.dark ? THEME_MODES.dark : THEME_MODES.light
    setThemeModeState(safeMode)
    window.localStorage.setItem(THEME_MODE_STORAGE_KEY, safeMode)
  }

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode
  }, [themeMode])

  const value = useMemo(
    () => ({
      themeMode,
      theme: getGitddnTheme(themeMode),
      setThemeMode,
      isDarkMode: themeMode === THEME_MODES.dark,
    }),
    [themeMode],
  )

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>
}
