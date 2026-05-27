import {
  AuditOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
  GitRepositoryOutlined,
  GlobalOutlined,
  HomeOutlined,
  LockOutlined,
  MergeRequestOutlined,
} from '../icons'
import { Dropdown, Flex, Layout, Menu } from 'antd'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getHeaderOrganizations } from '../../api/common'
import { getRepositoryDetail } from '../../api/repositories'
import { useAuth } from '../../auth/AuthContext'
import { UI_TEXT } from '../../constants'
import { GitddnLogo } from '../custom'
import RepositoryContextSidebar from './RepositoryContextSidebar'

const { Sider } = Layout

const ORGANIZATION_STORAGE_KEY = UI_TEXT.organizations.storageKey

const navItems = [
  { key: '/', route: '/', icon: <HomeOutlined />, label: UI_TEXT.navigation.dashboard },
  { key: '/repositories', route: '/repositories', icon: <GitRepositoryOutlined />, label: UI_TEXT.navigation.repositories },
  { key: '/merge-requests', route: '/merge-requests', icon: <MergeRequestOutlined />, label: UI_TEXT.navigation.mergeRequests },
  {
    key: '/security',
    route: '/security',
    icon: <LockOutlined />,
    label: UI_TEXT.navigation.security,
  },
  { key: '/deployment-transfer', route: '/deployment-transfer', icon: <DeploymentUnitOutlined />, label: UI_TEXT.navigation.deploymentTransfer },
  {
    key: '/audit',
    route: '/audit',
    icon: <AuditOutlined />,
    label: UI_TEXT.navigation.audit,
  },
]

function Sidebar({ collapsed, onCollapse }) {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const organizations = getHeaderOrganizations()
  const [organizationKey, setOrganizationKey] = useState(() => {
    const storedKey = window.localStorage.getItem(ORGANIZATION_STORAGE_KEY)
    return storedKey || organizations[0]?.key
  })
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
    if (location.pathname === '/audit') return ['/audit']

    const match = visibleNavItems
      .filter((item) => item.key !== '/')
      .find((item) => location.pathname.startsWith(item.route))

    return [match?.key ?? '/']
  }, [location.pathname, visibleNavItems])
  const logoMenuItems = useMemo(
    () => [
      {
        key: 'logo',
        className: 'sidebar-logo-menu-item',
        label: <GitddnLogo compact={collapsed} />,
      },
    ],
    [collapsed],
  )

  const selectedOrganization =
    organizations.find((organization) => organization.key === organizationKey) ?? organizations[0]
  const organizationItems = organizations.map((organization) => ({
    key: organization.key,
    label: organization.label,
  }))

  const handleOrganizationChange = ({ key }) => {
    setOrganizationKey(key)
    window.localStorage.setItem(ORGANIZATION_STORAGE_KEY, key)
    window.location.reload()
  }

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
      <Flex vertical className="sidebar-shell">
        <Menu
          className="sidebar-logo-menu"
          mode="inline"
          selectable={false}
          items={logoMenuItems}
          onClick={() => navigate('/')}
        />

        <Dropdown.Button
          className="sidebar-organization-button"
          menu={{
            items: organizationItems,
            selectable: true,
            selectedKeys: selectedOrganization?.key ? [selectedOrganization.key] : [],
            onClick: handleOrganizationChange,
          }}
          trigger={['click']}
          type="text"
          icon={<DownOutlined />}
        >
          <GlobalOutlined />
          {!collapsed ? <span>{selectedOrganization?.label}</span> : null}
        </Dropdown.Button>

        <Flex vertical className="sidebar-navigation">
          {!collapsed && repositoryId ? <RepositoryContextSidebar repositoryId={repositoryId} /> : null}
          {!collapsed ? <span className="nav-title">{UI_TEXT.common.workspace}</span> : null}
          <Menu
            className="global-menu"
            mode="inline"
            selectedKeys={selectedKeys}
            items={visibleNavItems}
            onClick={({ key }) => {
              const nextItem = visibleNavItems.find((item) => item.key === key)
              navigate(nextItem?.route ?? key)
            }}
          />
        </Flex>
      </Flex>
    </Sider>
  )
}

export default Sidebar
