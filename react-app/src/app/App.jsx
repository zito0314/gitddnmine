import { ConfigProvider, App as AntdApp } from 'antd'
import koKR from 'antd/locale/ko_KR'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { gitddnTheme } from './theme'

function App() {
  return (
    <ConfigProvider locale={koKR} theme={gitddnTheme}>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
