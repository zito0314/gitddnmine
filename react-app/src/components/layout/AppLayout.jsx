import { Layout } from 'antd'
import { useState } from 'react'
import { matchPath, Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopHeader from './TopHeader'

const { Content } = Layout
const FORM_PAGE_PATTERNS = [
  '/repositories/new',
  '/repositories/:repositoryId/merge-requests/new',
  '/deployment-transfer/new',
  '/repositories/:repositoryId/deployment-transfer/new',
  '/repositories/:repositoryId/settings/policy-change-request',
  '/repositories/:repositoryId/settings/policy-exception-request',
]

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const isFormPage = FORM_PAGE_PATTERNS.some((pattern) => matchPath({ path: pattern, end: true }, location.pathname))

  return (
    <Layout className="app-shell">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className="app-main">
        <TopHeader
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((value) => !value)}
        />
        <Content className={`page-content ${isFormPage ? 'page-content--form' : ''}`.trim()}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
