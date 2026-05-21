import lightTheme from './themes/light.json'
import darkTheme from './themes/dark.json'

export const THEME_MODE_STORAGE_KEY = 'gitddn.themeMode'

export const THEME_MODES = {
  light: 'light',
  dark: 'dark',
}

const fallbackFontFamily =
  '"Pretendard GOV", "Pretendard", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif'

function normalizeTheme(themeConfig) {
  return {
    ...themeConfig,
    token: {
      ...themeConfig.token,
      fontFamily: themeConfig.token?.fontFamily || fallbackFontFamily,
      wireframe: false,
    },
  }
}

export const gitddnThemes = {
  [THEME_MODES.light]: normalizeTheme(lightTheme),
  [THEME_MODES.dark]: normalizeTheme(darkTheme),
}

export function getGitddnTheme(mode) {
  return gitddnThemes[mode] ?? gitddnThemes[THEME_MODES.light]
}

export const gitddnTheme = gitddnThemes[THEME_MODES.light]
