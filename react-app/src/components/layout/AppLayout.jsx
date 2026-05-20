import { Layout } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopHeader from './TopHeader'

const { Content } = Layout

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="app-shell">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className="app-main">
        <TopHeader onToggleSidebar={() => setCollapsed((value) => !value)} />
        <Content className="page-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
