import { ConfigProvider, App as AntdApp } from 'antd'
import koKR from 'antd/locale/ko_KR'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthProvider.jsx'
import { router } from './router'
import { ThemeModeProvider } from './ThemeModeContext.jsx'
import { useThemeMode } from './useThemeMode'

function ThemedApp() {
  const { theme } = useThemeMode()

  return (
    <ConfigProvider locale={koKR} theme={theme}>
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
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  )
}

export default App
