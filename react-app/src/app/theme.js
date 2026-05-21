import { defaultLightTheme, defaultDarkTheme, THEME_MODES } from '../theme/defaultTokens'
import { buildAntdTheme } from '../theme/tokenUtils'

export { THEME_MODES }
export const gitddnThemes = {
  [THEME_MODES.light]: buildAntdTheme(defaultLightTheme),
  [THEME_MODES.dark]: buildAntdTheme(defaultDarkTheme),
}

export function getGitddnTheme(mode) {
  return gitddnThemes[mode] ?? gitddnThemes[THEME_MODES.light]
}

export const gitddnTheme = gitddnThemes[THEME_MODES.light]
