import {
  AuditOutlined,
  CodeOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
  GlobalOutlined,
  PullRequestOutlined,
  SafetyCertificateOutlined,
} from '../icons'
import { Badge, Button, ConfigProvider, Dropdown, Flex, Layout, Menu, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getHeaderOrganizations } from '../../api/common'
import { getRepositoryDetail } from '../../api/repositories'
import { useAuth } from '../../auth/AuthContext'
import { UI_TEXT } from '../../constants'
import { GitddnLogo } from '../custom'
import RepositoryContextSidebar from './RepositoryContextSidebar'

const { Sider } = Layout
const { Text } = Typography

const ORGANIZATION_STORAGE_KEY = UI_TEXT.organizations.storageKey

const sidebarMenuTheme = {
  components: {
    Menu: {
      itemBg: 'transparent',
      itemColor: 'var(--gitddn-sidebar-text)',
      itemHoverBg: 'var(--gitddn-sidebar-hover-bg)',
      itemHoverColor: 'var(--gitddn-sidebar-hover-text)',
      itemSelectedBg: 'var(--gitddn-sidebar-selected-bg)',
      itemSelectedColor: 'var(--gitddn-sidebar-selected-text)',
      subMenuItemBg: 'var(--gitddn-sidebar-submenu-bg)',
      groupTitleColor: 'var(--gitddn-sidebar-group-text)',
      itemHeight: 40,
      itemBorderRadius: 8,
      itemMarginBlock: 4,
      itemMarginInline: 8,
      iconMarginInlineEnd: 10,
    },
  },
}

const navItems = [
  { key: '/', icon: <DashboardOutlined />, label: UI_TEXT.navigation.dashboard },
  { key: '/repositories', icon: <CodeOutlined />, label: UI_TEXT.navigation.repositories },
  {
    key: '/merge-requests',
    icon: <PullRequestOutlined />,
    label: UI_TEXT.navigation.mergeRequests,
    badge: 6,
  },
  { key: '/deployment-transfer', icon: <DeploymentUnitOutlined />, label: UI_TEXT.navigation.deploymentTransfer, badge: 3 },
  {
    key: '/security',
    icon: <SafetyCertificateOutlined />,
    label: UI_TEXT.navigation.security,
    badge: 2,
    badgeStatus: 'warning',
  },
  { key: '/audit', icon: <AuditOutlined />, label: UI_TEXT.navigation.audit },
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
    const match = visibleNavItems
      .filter((item) => item.key !== '/')
      .find((item) => location.pathname.startsWith(item.key))

    return [match?.key ?? '/']
  }, [location.pathname, visibleNavItems])

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
      <Flex align="center" className="brand">
        <GitddnLogo compact={collapsed} />
      </Flex>

      <ConfigProvider theme={sidebarMenuTheme}>
        <Dropdown
          menu={{
            items: organizationItems,
            selectable: true,
            selectedKeys: selectedOrganization?.key ? [selectedOrganization.key] : [],
            onClick: handleOrganizationChange,
          }}
          trigger={['click']}
        >
          <Button
            className="sidebar-organization-button"
            icon={<GlobalOutlined />}
            type="text"
            block={!collapsed}
          >
            {!collapsed ? (
              <>
                <span>{selectedOrganization?.label}</span>
                <DownOutlined />
              </>
            ) : null}
          </Button>
        </Dropdown>

        {!collapsed && repositoryId ? <RepositoryContextSidebar repositoryId={repositoryId} /> : null}
        {!collapsed ? <Text className="nav-title">{UI_TEXT.common.workspace}</Text> : null}
        <Menu
          className="global-menu"
          mode="inline"
          selectedKeys={selectedKeys}
          items={visibleNavItems.map(withBadge)}
          onClick={({ key }) => navigate(key)}
        />
      </ConfigProvider>
    </Sider>
  )
}

export default Sidebar
