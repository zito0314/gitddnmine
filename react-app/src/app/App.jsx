import { ConfigProvider, App as AntdApp } from 'antd'
import koKR from 'antd/locale/ko_KR'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthProvider.jsx'
import { useThemeTokens } from '../hooks/useThemeTokens'
import { ThemeTokenProvider } from '../theme/ThemeTokenProvider.jsx'
import { router } from './router'

function ThemedApp() {
  const { activeTheme } = useThemeTokens()

  return (
    <ConfigProvider locale={koKR} theme={activeTheme}>
      <AntdApp>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

function App() {
  return (
    <ThemeTokenProvider>
      <ThemedApp />
    </ThemeTokenProvider>
  )
}

export default App
