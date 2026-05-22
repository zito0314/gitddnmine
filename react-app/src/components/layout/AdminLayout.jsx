import { AuditOutlined, BellOutlined, BgColorsOutlined, DashboardOutlined, DeploymentUnitOutlined, LinkOutlined, LockOutlined, SafetyCertificateOutlined, TeamOutlined } from '@ant-design/icons'
import { App as AntdApp, Button, Flex, Layout, Menu, Space, Typography } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { UI_TEXT } from '../../constants'

const { Content, Header, Sider } = Layout
const { Text, Title } = Typography

const adminItems = [
  { key: '/admin', icon: <DashboardOutlined />, label: UI_TEXT.adminPages.admin.title },
  { key: '/admin/organization', icon: <TeamOutlined />, label: UI_TEXT.adminNavigation.organizationRoles },
  { key: '/admin/repository-policy', icon: <LockOutlined />, label: UI_TEXT.adminNavigation.repositoryPolicy },
  { key: '/admin/mr-approval-policy', icon: <LockOutlined />, label: UI_TEXT.adminNavigation.mrApprovalPolicy },
  { key: '/admin/security-policy', icon: <SafetyCertificateOutlined />, label: UI_TEXT.adminNavigation.securityPolicy },
  { key: '/admin/deployment-policy', icon: <DeploymentUnitOutlined />, label: UI_TEXT.adminNavigation.deploymentPolicy },
  { key: '/admin/audit-policy', icon: <AuditOutlined />, label: UI_TEXT.adminNavigation.auditPolicy },
  { key: '/admin/notification-policy', icon: <BellOutlined />, label: UI_TEXT.adminNavigation.notificationPolicy },
  { key: '/admin/integration', icon: <LinkOutlined />, label: UI_TEXT.adminNavigation.integration },
  { key: '/admin/theme', icon: <BgColorsOutlined />, label: UI_TEXT.adminNavigation.themeBranding },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const { message } = AntdApp.useApp()
  const selected = adminItems.find((item) => location.pathname === item.key)?.key ?? '/admin'

  return (
    <Layout className="app-shell admin-shell">
      <Sider theme="light" width={280} className="app-sidebar">
        <Flex align="center" gap={10} className="brand">
          <div className="brand-mark">g</div>
          <div>
            <Title level={1} className="brand-name">gitddn</Title>
            <Text className="brand-sub">{UI_TEXT.navigation.admin}</Text>
          </div>
        </Flex>
        <Text className="nav-title">{UI_TEXT.common.governanceAdmin}</Text>
        <Menu className="global-menu" mode="inline" selectedKeys={[selected]} items={adminItems} onClick={({ key }) => navigate(key)} />
      </Sider>
      <Layout className="app-main">
        <Header className="top-header admin-top-header">
          <Flex align="center" justify="space-between" style={{ width: '100%' }}>
            <Space>
              <Text strong>{UI_TEXT.navigation.admin}</Text>
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
