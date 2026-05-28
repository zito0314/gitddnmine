import { AuditOutlined, BellOutlined, BgColorsOutlined, DashboardOutlined, DeploymentUnitOutlined, LockOutlined, SafetyCertificateOutlined, SettingOutlined, TeamOutlined } from '../icons'
import { App as AntdApp, Avatar, Breadcrumb, Button, Flex, Layout, Menu, Space, Typography } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { UI_TEXT } from '../../constants'
import { GitddnLogo } from '../custom'

const { Content, Header, Sider } = Layout
const { Text } = Typography

const adminItems = [
  { key: '/admin', icon: <DashboardOutlined />, label: UI_TEXT.adminPages.admin.title },
  { type: 'group', label: '조직 및 정책' },
  { key: '/admin/organization', icon: <TeamOutlined />, label: UI_TEXT.adminNavigation.organizationRoles },
  { key: '/admin/repository-policy', icon: <LockOutlined />, label: UI_TEXT.adminNavigation.repositoryPolicy },
  { key: '/admin/project-templates', icon: <SettingOutlined />, label: UI_TEXT.adminNavigation.projectTemplates },
  { key: '/admin/mr-approval-policy', icon: <LockOutlined />, label: UI_TEXT.adminNavigation.mrApprovalPolicy },
  { key: '/admin/security-policy', icon: <SafetyCertificateOutlined />, label: UI_TEXT.adminNavigation.securityPolicy },
  { key: '/admin/deployment-policy', icon: <DeploymentUnitOutlined />, label: UI_TEXT.adminNavigation.deploymentPolicy },
  { key: '/admin/audit-policy', icon: <AuditOutlined />, label: UI_TEXT.adminNavigation.auditPolicy },
  { type: 'group', label: '연동 및 설정' },
  { key: '/admin/notification-policy', icon: <BellOutlined />, label: UI_TEXT.adminNavigation.notificationPolicy },
  { key: '/admin/theme', icon: <BgColorsOutlined />, label: UI_TEXT.adminNavigation.themeBranding },
]

const adminBreadcrumbLabels = {
  organization: UI_TEXT.adminNavigation.organizationRoles,
  'repository-policy': UI_TEXT.adminNavigation.repositoryPolicy,
  'project-templates': UI_TEXT.adminNavigation.projectTemplates,
  'mr-approval-policy': UI_TEXT.adminNavigation.mrApprovalPolicy,
  'security-policy': UI_TEXT.adminNavigation.securityPolicy,
  'deployment-policy': UI_TEXT.adminNavigation.deploymentPolicy,
  'audit-policy': UI_TEXT.adminNavigation.auditPolicy,
  'notification-policy': UI_TEXT.adminNavigation.notificationPolicy,
  integration: UI_TEXT.adminNavigation.notificationPolicy,
  theme: UI_TEXT.adminNavigation.themeBranding,
}

function makeAdminBreadcrumb(pathname) {
  if (pathname === '/admin') {
    return [{ title: <span className="header-breadcrumb-current">{UI_TEXT.navigation.admin}</span> }]
  }

  const [, , section] = pathname.split('/')
  const currentLabel = adminBreadcrumbLabels[section] ?? UI_TEXT.navigation.admin

  return [
    { title: <Link to="/admin">{UI_TEXT.navigation.admin}</Link> },
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
