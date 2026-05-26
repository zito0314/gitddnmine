import {
  AuditOutlined,
  BranchesOutlined,
  CodeOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  PullRequestOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Flex, Layout, Menu, Typography } from 'antd'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRepositoryDetail } from '../../api/repositories'
import { useAuth } from '../../auth/AuthContext'
import { UI_TEXT } from '../../constants'
import RepositoryContextSidebar from './RepositoryContextSidebar'

const { Sider } = Layout
const { Text, Title } = Typography

const navItems = [
  { key: '/', icon: <DashboardOutlined />, label: UI_TEXT.navigation.dashboard },
  { key: '/repositories', icon: <CodeOutlined />, label: UI_TEXT.navigation.repositories },
  {
    key: '/merge-requests',
    icon: <PullRequestOutlined />,
    label: UI_TEXT.navigation.mergeRequests,
    badge: 6,
  },
  { key: '/pipelines', icon: <BranchesOutlined />, label: UI_TEXT.navigation.pipelines },
  { key: '/deployment-transfer', icon: <DeploymentUnitOutlined />, label: UI_TEXT.navigation.deploymentTransfer, badge: 3 },
  {
    key: '/security',
    icon: <SafetyCertificateOutlined />,
    label: UI_TEXT.navigation.security,
    badge: 2,
    badgeStatus: 'warning',
  },
  { key: '/audit', icon: <AuditOutlined />, label: UI_TEXT.navigation.audit },
  { key: '/admin', icon: <AuditOutlined />, label: UI_TEXT.navigation.admin },
]

function withBadge(item) {
  const { badge, badgeStatus, ...menuItem } = item

  return {
    ...menuItem,
    label: (
      <Flex align="center" justify="space-between" gap={8}>
        <span>{item.label}</span>
        {badge ? (
          <Badge
            count={badge}
            color={badgeStatus === 'warning' ? '#9e6a00' : '#256ef4'}
            size="small"
          />
        ) : null}
      </Flex>
    ),
  }
}

function Sidebar({ collapsed, onCollapse }) {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const visibleNavItems = useMemo(
    () =>
      navItems.filter((item) => {
        if (item.key === '/admin') return auth.isAdmin
        if (item.key === '/security') return auth.hasPermission('security:read')
        if (item.key === '/deployment-transfer') return auth.hasPermission('deployment:read')
        if (item.key === '/audit') return auth.hasPermission('audit:read')
        return true
      }),
    [auth],
  )
  const repositoryId = useMemo(() => {
    const match = location.pathname.match(/^\/repositories\/([^/]+)/)
    const id = match?.[1] ?? null
    if (!id || id === 'new') return null
    return getRepositoryDetail(id) ? id : null
  }, [location.pathname])

  const selectedKeys = useMemo(() => {
    const match = visibleNavItems
      .filter((item) => item.key !== '/')
      .find((item) => location.pathname.startsWith(item.key))

    return [match?.key ?? '/']
  }, [location.pathname, visibleNavItems])

  return (
    <Sider
      breakpoint="lg"
      collapsed={collapsed}
      collapsedWidth={72}
      onCollapse={onCollapse}
      theme="light"
      width={236}
      className="app-sidebar"
    >
      <Flex align="center" gap={10} className="brand">
        <Avatar shape="square" size={32} className="brand-mark">
          g
        </Avatar>
        {!collapsed ? (
          <div>
            <Title level={1} className="brand-name">
              gitddn
            </Title>
            <Text className="brand-sub">DevSecOps Governance</Text>
          </div>
        ) : null}
      </Flex>

      {!collapsed && repositoryId ? <RepositoryContextSidebar repositoryId={repositoryId} /> : null}
      {!collapsed ? <Text className="nav-title">{UI_TEXT.common.workspace}</Text> : null}
      <Menu
        className="global-menu"
        mode="inline"
        selectedKeys={selectedKeys}
        items={visibleNavItems.map(withBadge)}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  )
}

export default Sidebar
