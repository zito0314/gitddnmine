import {
  BellOutlined,
  CodeOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from '../icons'
import {
  Avatar,
  AutoComplete,
  Badge,
  Breadcrumb,
  Button,
  App as AntdApp,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Flex,
  Input,
  Layout,
  List,
  Modal,
  Segmented,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  getGlobalSearchSuggestions,
  getHeaderOrganizations,
  getNotifications,
} from '../../api/common'
import { useAuth } from '../../auth/AuthContext'
import { getRepositories } from '../../api/repositories'
import { StatusTag } from '../common'
import { UI_TEXT } from '../../constants'
import { DesignTokenModal } from '../theme/DesignTokenModal'
import { useThemeTokens } from '../../hooks/useThemeTokens'
import { THEME_MODES } from '../../theme/defaultTokens'

const { Header } = Layout
const { Text } = Typography

const ORGANIZATION_STORAGE_KEY = UI_TEXT.organizations.storageKey
const NOTIFICATION_READ_STORAGE_KEY = 'gitddn.notifications.read'

const repositorySectionLabels = {
  files: UI_TEXT.repositoryNavigation.files,
  'merge-requests': UI_TEXT.repositoryNavigation.mergeRequests,
  pipelines: UI_TEXT.repositoryNavigation.pipelines,
  commits: UI_TEXT.repositoryNavigation.commits,
  branches: UI_TEXT.repositoryNavigation.branches,
  tags: UI_TEXT.repositoryNavigation.tags,
  security: UI_TEXT.repositoryNavigation.security,
  'deployment-transfer': UI_TEXT.repositoryNavigation.deploymentTransfer,
  activity: UI_TEXT.repositoryNavigation.activity,
  settings: UI_TEXT.repositoryNavigation.settings,
}

const globalSectionLabels = {
  repositories: UI_TEXT.navigation.repositories,
  'merge-requests': UI_TEXT.navigation.mergeRequests,
  pipelines: UI_TEXT.navigation.pipelines,
  security: 'Security',
  audit: UI_TEXT.navigation.audit,
  'deployment-transfer': UI_TEXT.navigation.deploymentTransfer,
}

const adminSectionLabels = {
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

function readJsonStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeJsonStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function getRepositoryIdFromPath(pathname) {
  const match = pathname.match(/^\/repositories\/([^/]+)/)
  const repositoryId = match?.[1]
  return repositoryId && repositoryId !== 'new' ? repositoryId : null
}

function makeBreadcrumbItem(label, path, current = false) {
  return {
    title: current ? (
      <span className="header-breadcrumb-current">{label}</span>
    ) : path ? (
      <Link to={path}>{label}</Link>
    ) : (
      <span>{label}</span>
    ),
  }
}

function buildHeaderLocation(pathname, repository) {
  if (pathname === '/') {
    return {
      icon: <HomeOutlined />,
      items: [makeBreadcrumbItem('Home', '/', true)],
    }
  }

  if (pathname.startsWith('/admin')) {
    const [, , section] = pathname.split('/')
    const currentLabel = adminSectionLabels[section] ?? UI_TEXT.navigation.admin
    return {
      icon: <SettingOutlined />,
      items:
        pathname === '/admin'
          ? [makeBreadcrumbItem('Admin Console', '/admin', true)]
          : [
              makeBreadcrumbItem('Admin Console', '/admin'),
              makeBreadcrumbItem(currentLabel, pathname, true),
            ],
    }
  }

  const repositoryMatch = pathname.match(/^\/repositories\/([^/]+)(?:\/([^/]+))?(?:\/([^/]+))?/)
  if (repositoryMatch && repositoryMatch[1] !== 'new') {
    const [, repositoryId, section, detailId] = repositoryMatch
    const repositoryName = repository?.name ?? repositoryId
    const items = [
      makeBreadcrumbItem('Repository', '/repositories'),
      makeBreadcrumbItem(repositoryName, `/repositories/${repositoryId}`, !section),
    ]

    if (section) {
      items.push(
        makeBreadcrumbItem(
          repositorySectionLabels[section] ?? section,
          `/repositories/${repositoryId}/${section}`,
          !detailId || detailId === 'new',
        ),
      )
    }

    if (detailId && detailId !== 'new') {
      items.push(makeBreadcrumbItem(section === 'merge-requests' ? `#${detailId}` : detailId, pathname, true))
    }

    return {
      icon: <CodeOutlined />,
      items,
    }
  }

  const [, section, detailId] = pathname.split('/')
  const sectionLabel = globalSectionLabels[section] ?? 'Home'
  const items = [makeBreadcrumbItem(sectionLabel, `/${section}`, !detailId)]

  if (detailId) {
    const detailLabel = section === 'merge-requests' ? `#${detailId}` : detailId
    items.push(makeBreadcrumbItem(detailLabel, pathname, true))
  }

  return {
    icon: <HomeOutlined />,
    items,
  }
}

function TopHeader({ collapsed, onToggleSidebar }) {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()
  const { message } = AntdApp.useApp()
  const { mode: themeMode, setThemeMode } = useThemeTokens()
  const organizations = getHeaderOrganizations()
  const repositories = getRepositories()
  const currentUser = auth.currentUser
  const notifications = getNotifications()
  const currentRepositoryId = getRepositoryIdFromPath(location.pathname)
  const currentRepository = currentRepositoryId
    ? repositories.find((repository) => repository.id === currentRepositoryId)
    : null
  const isAdminPath = location.pathname.startsWith('/admin')
  const headerLocation = useMemo(
    () => buildHeaderLocation(location.pathname, currentRepository),
    [currentRepository, location.pathname],
  )

  const [searchValue, setSearchValue] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [designTokenOpen, setDesignTokenOpen] = useState(false)
  const [readNotificationIds, setReadNotificationIds] = useState(() =>
    readJsonStorage(NOTIFICATION_READ_STORAGE_KEY, []),
  )

  const selectedOrganization =
    organizations.find((organization) => organization.key === window.localStorage.getItem(ORGANIZATION_STORAGE_KEY)) ?? organizations[0]
  const searchResults = useMemo(() => getGlobalSearchSuggestions(searchValue), [searchValue])
  const unreadCount = notifications.filter(
    (notification) => !readNotificationIds.includes(notification.id),
  ).length
  const searchOptions = searchResults.map((item) => ({
    value: item.href,
    label: (
      <Flex align="flex-start" justify="space-between" gap={12} className="global-search-option">
        <Space direction="vertical" size={2}>
          <Flex align="center" gap={6} wrap="wrap">
            <Tag>{item.type}</Tag>
            <Text strong>{item.title}</Text>
          </Flex>
          <Text type="secondary">{item.description}</Text>
        </Space>
        <StatusTag status={item.status} />
      </Flex>
    ),
  }))

  const navigateTo = (href) => {
    setSearchOpen(false)
    setNotificationOpen(false)
    navigate(href)
  }

  const handleQuickCreate = ({ key }) => {
    if (key === 'repository') {
      navigate('/repositories/new')
      return
    }

    if (key === 'merge-request') {
      const repositoryId = currentRepositoryId ?? repositories[0]?.id
      navigate(repositoryId ? `/repositories/${repositoryId}/merge-requests/new` : '/merge-requests')
      return
    }

    if (key === 'deployment-transfer') {
      navigate(currentRepositoryId ? `/repositories/${currentRepositoryId}/deployment-transfer/new` : '/deployment-transfer/new')
      return
    }

    if (key === 'security-validation') {
      message.info(UI_TEXT.quickCreate.unavailable)
      navigate('/security')
      return
    }

    if (key === 'policy') {
      navigate('/admin/repository-policy')
    }
  }

  const markAllNotificationsRead = () => {
    const readIds = notifications.map((notification) => notification.id)
    setReadNotificationIds(readIds)
    writeJsonStorage(NOTIFICATION_READ_STORAGE_KEY, readIds)
    message.success(UI_TEXT.notifications.allRead)
  }

  const openNotification = (notification) => {
    const readIds = [...new Set([...readNotificationIds, notification.id])]
    setReadNotificationIds(readIds)
    writeJsonStorage(NOTIFICATION_READ_STORAGE_KEY, readIds)
    navigateTo(notification.targetLink)
  }

  const createItems = [
    auth.hasPermission('repository:create-request') ? { key: 'repository', label: UI_TEXT.quickCreate.repository } : null,
    auth.hasPermission('mr:create') ? { key: 'merge-request', label: UI_TEXT.quickCreate.mergeRequest } : null,
    auth.hasPermission('deployment:create-request') ? { key: 'deployment-transfer', label: UI_TEXT.quickCreate.deploymentTransfer } : null,
    auth.isAdmin ? { key: 'policy', label: UI_TEXT.quickCreate.policy } : null,
  ].filter(Boolean)
  const helpItems = [
    { key: 'demo-guide', label: UI_TEXT.help.demoGuide },
    { key: 'shortcuts', label: UI_TEXT.help.keyboardShortcuts },
    { key: 'contact-admin', label: UI_TEXT.help.contactAdmin },
    { key: 'about', label: UI_TEXT.help.about },
  ]
  const userItems = [
    {
      key: 'profile',
      disabled: true,
      label: (
        <Space direction="vertical" size={0}>
          <Text strong>{currentUser?.name}</Text>
          <Text type="secondary">{currentUser?.role} · {selectedOrganization?.label}</Text>
          <Text type="secondary">{currentUser?.email}</Text>
        </Space>
      ),
    },
    { type: 'divider' },
    { key: 'my-profile', label: UI_TEXT.userMenu.myProfile },
    { key: 'my-activity', label: UI_TEXT.userMenu.myActivity },
    { key: 'preferences', label: UI_TEXT.userMenu.preferences },
    { type: 'divider' },
    { key: 'sign-out', label: UI_TEXT.auth.signOut },
  ]

  return (
    <Header className="top-header">
      <Flex align="center" gap={12} className="header-left">
        <Tooltip title="Toggle navigation">
          <Button
            type="text"
            className="header-icon-button"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggleSidebar}
          />
        </Tooltip>
        <Avatar shape="square" size={30} icon={headerLocation.icon} className="header-page-icon" />
        <Breadcrumb
          className="header-breadcrumb"
          separator="›"
          items={headerLocation.items}
        />
      </Flex>

      <Space size={8} className="header-actions">
        <AutoComplete
          className="global-search"
          open={searchOpen}
          value={searchValue}
          options={searchOptions}
          notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={UI_TEXT.globalSearch.empty} />}
          classNames={{ popup: { root: 'global-search-overlay' } }}
          onSelect={(href) => {
            setSearchValue('')
            navigateTo(href)
          }}
          onSearch={(value) => {
            setSearchValue(value)
            setSearchOpen(true)
          }}
          onFocus={() => setSearchOpen(true)}
          onBlur={() => setSearchOpen(false)}
        >
          <Input
            prefix={<SearchOutlined />}
            placeholder={UI_TEXT.globalSearch.placeholder}
            allowClear
          />
        </AutoComplete>
        <Segmented
          aria-label="Theme mode"
          size="small"
          value={themeMode}
          onChange={setThemeMode}
          options={[
            { label: <SunOutlined />, value: THEME_MODES.light },
            { label: <MoonOutlined />, value: THEME_MODES.dark },
          ]}
        />
        <Button className="header-token-button" onClick={() => setDesignTokenOpen(true)}>
          {UI_TEXT.designToken.button}
        </Button>
        <Dropdown menu={{ items: createItems, onClick: handleQuickCreate }} trigger={['click']}>
          <Button type="primary" icon={<PlusOutlined />}>
            {UI_TEXT.quickCreate.label}
          </Button>
        </Dropdown>
        <Badge count={unreadCount} size="small">
          <Button icon={<BellOutlined />} onClick={() => setNotificationOpen(true)} />
        </Badge>
        <Dropdown
          menu={{
            items: helpItems,
            onClick: ({ key }) => {
              if (key === 'demo-guide') setHelpOpen(true)
              else message.info(UI_TEXT.userMenu.demoOnly)
            },
          }}
          trigger={['click']}
        >
          <Button className="header-ask-button" icon={<QuestionCircleOutlined />}>
            Ask
          </Button>
        </Dropdown>
        {auth.isAdmin ? (
          <Button onClick={() => navigate(isAdminPath ? '/' : '/admin')}>
            {isAdminPath ? UI_TEXT.topHeader.backToUserPlatform : UI_TEXT.topHeader.adminConsole}
          </Button>
        ) : null}
        <Divider type="vertical" className="header-avatar-divider" />
        <Dropdown
          menu={{
            items: userItems,
            onClick: async ({ key }) => {
              if (key === 'profile') return
              if (key === 'sign-out') {
                await auth.logout()
                message.success(UI_TEXT.auth.signedOut)
                navigate('/login', { replace: true })
                return
              }
              message.info(`${UI_TEXT.userMenu.demoOnly}: ${key}`)
            },
          }}
          trigger={['click']}
        >
          <Avatar icon={<UserOutlined />} className="user-avatar">
            {currentUser?.avatar}
          </Avatar>
        </Dropdown>
      </Space>

      <Drawer
        title={UI_TEXT.notifications.title}
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        size="default"
        extra={<Button size="small" onClick={markAllNotificationsRead}>{UI_TEXT.notifications.markAllRead}</Button>}
      >
        <List
          dataSource={notifications}
          locale={{ emptyText: UI_TEXT.notifications.empty }}
          renderItem={(notification) => {
            const read = readNotificationIds.includes(notification.id)
            return (
              <List.Item onClick={() => openNotification(notification)} className="notification-item">
                <List.Item.Meta
                  title={
                    <Flex align="center" gap={8} wrap="wrap">
                      <Text strong={!read}>{notification.title}</Text>
                      <StatusTag status={notification.severity} />
                      {!read ? <Badge status="processing" /> : null}
                    </Flex>
                  }
                  description={
                    <Space direction="vertical" size={4}>
                      <Text type="secondary">{notification.message}</Text>
                      <Text type="secondary">{notification.createdAt}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )
          }}
        />
      </Drawer>

      <Modal
        title={UI_TEXT.help.demoGuideTitle}
        open={helpOpen}
        onCancel={() => setHelpOpen(false)}
        footer={<Button type="primary" onClick={() => setHelpOpen(false)}>OK</Button>}
      >
        <Space direction="vertical" size={12}>
          <Text>{UI_TEXT.help.demoGuideBody}</Text>
          <Divider />
          <Text type="secondary">{UI_TEXT.topHeader.helpMockNotice}</Text>
        </Space>
      </Modal>
      <DesignTokenModal open={designTokenOpen} onClose={() => setDesignTokenOpen(false)} />
    </Header>
  )
}

export default TopHeader
