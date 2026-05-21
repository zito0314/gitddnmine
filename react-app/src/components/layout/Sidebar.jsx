import {
  AuditOutlined,
  BranchesOutlined,
  CodeOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  PullRequestOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { Badge, Flex, Layout, Menu, Typography } from 'antd'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRepositoryDetail } from '../../api/repositories'
import RepositoryContextSidebar from './RepositoryContextSidebar'

const { Sider } = Layout
const { Text, Title } = Typography

const navItems = [
  { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/repositories', icon: <CodeOutlined />, label: 'Repository' },
  {
    key: '/merge-requests',
    icon: <PullRequestOutlined />,
    label: 'Merge Request',
    badge: 6,
  },
  { key: '/pipelines', icon: <BranchesOutlined />, label: 'Pipeline' },
  { key: '/deployment-transfer', icon: <DeploymentUnitOutlined />, label: 'Deployment Transfer', badge: 3 },
  {
    key: '/security',
    icon: <SafetyCertificateOutlined />,
    label: 'Security Validation',
    badge: 2,
    badgeStatus: 'warning',
  },
  { key: '/audit', icon: <AuditOutlined />, label: 'Audit Log' },
  { key: '/admin', icon: <AuditOutlined />, label: 'Admin Console' },
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
  const repositoryId = useMemo(() => {
    const match = location.pathname.match(/^\/repositories\/([^/]+)/)
    const id = match?.[1] ?? null
    if (!id || id === 'new') return null
    return getRepositoryDetail(id) ? id : null
  }, [location.pathname])

  const selectedKeys = useMemo(() => {
    const match = navItems
      .filter((item) => item.key !== '/')
      .find((item) => location.pathname.startsWith(item.key))

    return [match?.key ?? '/']
  }, [location.pathname])

  return (
    <Sider
      breakpoint="lg"
      collapsed={collapsed}
      collapsedWidth={72}
      onCollapse={onCollapse}
      theme="light"
      width={repositoryId && !collapsed ? 292 : 248}
      className="app-sidebar"
    >
      <Flex align="center" gap={10} className="brand">
        <div className="brand-mark">g</div>
        {!collapsed ? (
          <div>
            <Title level={1} className="brand-name">
              gitddn
            </Title>
            <Text className="brand-sub">DevSecOps Governance</Text>
          </div>
        ) : null}
      </Flex>

      {!collapsed ? <Text className="nav-title">Workspace</Text> : null}
      <Menu
        className="global-menu"
        mode="inline"
        selectedKeys={selectedKeys}
        items={navItems.map(withBadge)}
        onClick={({ key }) => navigate(key)}
      />
      {!collapsed && repositoryId ? <RepositoryContextSidebar repositoryId={repositoryId} /> : null}
    </Sider>
  )
}

export default Sidebar
