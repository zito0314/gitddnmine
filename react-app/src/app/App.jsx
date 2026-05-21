import { ConfigProvider, App as AntdApp } from 'antd'
import koKR from 'antd/locale/ko_KR'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthProvider.jsx'
import { router } from './router'
import { gitddnTheme } from './theme'

function App() {
  return (
    <ConfigProvider locale={koKR} theme={gitddnTheme}>
      <AntdApp>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
