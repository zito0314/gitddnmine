import { useContext } from 'react'
import { ThemeTokenContext } from '../theme/themeTokenContext'

export function useThemeTokens() {
  const context = useContext(ThemeTokenContext)

  if (!context) {
    throw new Error('useThemeTokens must be used within ThemeTokenProvider')
  }

  return context
}
