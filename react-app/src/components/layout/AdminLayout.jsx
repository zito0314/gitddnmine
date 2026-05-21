import { AuditOutlined, BellOutlined, BgColorsOutlined, DashboardOutlined, DeploymentUnitOutlined, LinkOutlined, LockOutlined, SafetyCertificateOutlined, TeamOutlined } from '@ant-design/icons'
import { Button, Flex, Layout, Menu, Space, Typography, message } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { UI_TEXT } from '../../constants'

const { Content, Header, Sider } = Layout
const { Text, Title } = Typography

const adminItems = [
  { key: '/admin', icon: <DashboardOutlined />, label: 'Admin Overview' },
  { key: '/admin/organization', icon: <TeamOutlined />, label: 'Organization & Roles' },
  { key: '/admin/repository-policy', icon: <LockOutlined />, label: 'Repository Policy' },
  { key: '/admin/mr-approval-policy', icon: <LockOutlined />, label: 'MR Approval Policy' },
  { key: '/admin/security-policy', icon: <SafetyCertificateOutlined />, label: 'Security Policy' },
  { key: '/admin/deployment-policy', icon: <DeploymentUnitOutlined />, label: 'Deployment Policy' },
  { key: '/admin/audit-policy', icon: <AuditOutlined />, label: 'Audit Policy' },
  { key: '/admin/notification-policy', icon: <BellOutlined />, label: 'Notification Policy' },
  { key: '/admin/integration', icon: <LinkOutlined />, label: 'Integration' },
  { key: '/admin/theme', icon: <BgColorsOutlined />, label: 'Theme & Branding' },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const selected = adminItems.find((item) => location.pathname === item.key)?.key ?? '/admin'

  return (
    <Layout className="app-shell admin-shell">
      <Sider theme="light" width={280} className="app-sidebar">
        <Flex align="center" gap={10} className="brand">
          <div className="brand-mark">g</div>
          <div>
            <Title level={1} className="brand-name">gitddn</Title>
            <Text className="brand-sub">Admin Console</Text>
          </div>
        </Flex>
        <Text className="nav-title">Governance Admin</Text>
        <Menu className="global-menu" mode="inline" selectedKeys={[selected]} items={adminItems} onClick={({ key }) => navigate(key)} />
      </Sider>
      <Layout className="app-main">
        <Header className="top-header admin-top-header">
          <Flex align="center" justify="space-between" style={{ width: '100%' }}>
            <Space>
              <Text strong>Admin Console</Text>
              <Text type="secondary">Policy-based Governance Platform</Text>
            </Space>
            <Space>
              <Button type="primary" onClick={() => navigate('/')}>{UI_TEXT.topHeader.backToUserPlatform}</Button>
              <Button
                onClick={async () => {
                  await auth.logout()
                  message.success(UI_TEXT.auth.signedOut)
                  navigate('/login', { replace: true })
                }}
              >
                {UI_TEXT.auth.signOut}
              </Button>
            </Space>
          </Flex>
        </Header>
        <Content className="page-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
