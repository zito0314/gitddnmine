import { useThemeTokens } from '../hooks/useThemeTokens'

export function useThemeMode() {
  const themeTokens = useThemeTokens()

  return {
    themeMode: themeTokens.mode,
    theme: themeTokens.activeTheme,
    setThemeMode: themeTokens.setThemeMode,
    isDarkMode: themeTokens.isDarkMode,
  }
}
