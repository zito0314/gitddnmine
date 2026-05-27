import { AuditOutlined, BellOutlined, BgColorsOutlined, DashboardOutlined, DeploymentUnitOutlined, LinkOutlined, LockOutlined, SafetyCertificateOutlined, SettingOutlined, TeamOutlined } from '../icons'
import { App as AntdApp, Avatar, Breadcrumb, Button, Flex, Layout, Menu, Space, Typography } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { UI_TEXT } from '../../constants'
import { GitddnLogo } from '../custom'

const { Content, Header, Sider } = Layout
const { Text } = Typography

const adminItems = [
  { key: '/admin', icon: <DashboardOutlined />, label: UI_TEXT.adminPages.admin.title },
  { key: '/admin/organization', icon: <TeamOutlined />, label: UI_TEXT.adminNavigation.organizationRoles },
  { key: '/admin/repository-policy', icon: <LockOutlined />, label: UI_TEXT.adminNavigation.repositoryPolicy },
  { key: '/admin/repository-policy/branch-protection-templates', icon: <LockOutlined />, label: 'Branch Protection Templates' },
  { key: '/admin/repository-policy/branch-protection-requests', icon: <LockOutlined />, label: 'Exception Requests' },
  { key: '/admin/repository-policy/branch-protection-history', icon: <AuditOutlined />, label: 'Policy History' },
  { key: '/admin/mr-approval-policy', icon: <LockOutlined />, label: UI_TEXT.adminNavigation.mrApprovalPolicy },
  { key: '/admin/security-policy', icon: <SafetyCertificateOutlined />, label: UI_TEXT.adminNavigation.securityPolicy },
  { key: '/admin/deployment-policy', icon: <DeploymentUnitOutlined />, label: UI_TEXT.adminNavigation.deploymentPolicy },
  { key: '/admin/audit-policy', icon: <AuditOutlined />, label: UI_TEXT.adminNavigation.auditPolicy },
  { key: '/admin/notification-policy', icon: <BellOutlined />, label: UI_TEXT.adminNavigation.notificationPolicy },
  { key: '/admin/integration', icon: <LinkOutlined />, label: UI_TEXT.adminNavigation.integration },
  { key: '/admin/theme', icon: <BgColorsOutlined />, label: UI_TEXT.adminNavigation.themeBranding },
]

const adminBreadcrumbLabels = {
  organization: 'Organization Roles',
  'repository-policy': 'Repository Policy',
  'mr-approval-policy': 'MR Approval Policy',
  'security-policy': 'Security Policy',
  'deployment-policy': 'Deployment Policy',
  'audit-policy': 'Audit Policy',
  'notification-policy': 'Notification Policy',
  integration: 'Integration',
  theme: 'Theme Branding',
}

function makeAdminBreadcrumb(pathname) {
  if (pathname === '/admin') {
    return [{ title: <span className="header-breadcrumb-current">Admin Console</span> }]
  }

  const [, , section] = pathname.split('/')
  const currentLabel = adminBreadcrumbLabels[section] ?? UI_TEXT.navigation.admin

  return [
    { title: <Link to="/admin">Admin Console</Link> },
    { title: <span className="header-breadcrumb-current">{currentLabel}</span> },
  ]
}

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const { message } = AntdApp.useApp()
  const breadcrumbItems = makeAdminBreadcrumb(location.pathname)
  const selected =
    adminItems
      .filter((item) => item.key !== '/admin')
      .find((item) => location.pathname.startsWith(item.key))?.key ??
    (location.pathname === '/admin' ? '/admin' : '/admin')

  return (
    <Layout className="app-shell admin-shell">
      <Sider theme="light" width={280} className="app-sidebar">
        <Flex align="center" className="brand">
          <GitddnLogo />
        </Flex>
        <Text className="nav-title">{UI_TEXT.common.governanceAdmin}</Text>
        <Menu className="global-menu" mode="inline" selectedKeys={[selected]} items={adminItems} onClick={({ key }) => navigate(key)} />
      </Sider>
      <Layout className="app-main">
        <Header className="top-header admin-top-header">
          <Flex align="center" justify="space-between" style={{ width: '100%' }}>
            <Space size={12}>
              <Avatar shape="square" size={30} icon={<SettingOutlined />} className="header-page-icon" />
              <Breadcrumb className="header-breadcrumb" separator="›" items={breadcrumbItems} />
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
