import { Layout } from 'antd'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopHeader from './TopHeader'

const { Content } = Layout

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const contentClassName = location.pathname === '/' ? 'page-content page-content-dashboard' : 'page-content'

  return (
    <Layout className="app-shell">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className="app-main">
        <TopHeader
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((value) => !value)}
        />
        <Content className={contentClassName}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
