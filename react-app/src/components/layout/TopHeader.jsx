import {
  BellOutlined,
  DownOutlined,
  GlobalOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Flex,
  Input,
  Layout,
  List,
  message,
  Modal,
  Popover,
  Space,
  Typography,
} from 'antd'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  getCurrentUser,
  getGlobalSearchResults,
  getHeaderOrganizations,
  getNotifications,
} from '../../api/common'
import { getRepositories } from '../../api/repositories'
import { StatusTag } from '../common'
import { UI_TEXT } from '../../constants'

const { Header } = Layout
const { Text } = Typography

const ORGANIZATION_STORAGE_KEY = UI_TEXT.organizations.storageKey
const NOTIFICATION_READ_STORAGE_KEY = 'gitddn.notifications.read'

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

function TopHeader({ onToggleSidebar }) {
  const navigate = useNavigate()
  const location = useLocation()
  const organizations = getHeaderOrganizations()
  const repositories = getRepositories()
  const currentUser = getCurrentUser()
  const notifications = getNotifications()
  const currentRepositoryId = getRepositoryIdFromPath(location.pathname)
  const isAdminPath = location.pathname.startsWith('/admin')

  const [organizationKey, setOrganizationKey] = useState(() => {
    const storedKey = window.localStorage.getItem(ORGANIZATION_STORAGE_KEY)
    return storedKey || organizations[0]?.key
  })
  const [searchValue, setSearchValue] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [readNotificationIds, setReadNotificationIds] = useState(() =>
    readJsonStorage(NOTIFICATION_READ_STORAGE_KEY, []),
  )

  const selectedOrganization =
    organizations.find((organization) => organization.key === organizationKey) ?? organizations[0]
  const searchResults = useMemo(() => getGlobalSearchResults(searchValue), [searchValue])
  const unreadCount = notifications.filter(
    (notification) => !readNotificationIds.includes(notification.id),
  ).length

  const handleOrganizationChange = ({ key }) => {
    const nextOrganization = organizations.find((organization) => organization.key === key)
    setOrganizationKey(key)
    window.localStorage.setItem(ORGANIZATION_STORAGE_KEY, key)
    message.success(`${UI_TEXT.topHeader.organizationSwitched} ${nextOrganization?.label ?? key}`)
  }

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
      message.info(UI_TEXT.quickCreate.unavailable)
      navigate('/deployment-transfer')
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

  const organizationItems = organizations.map((organization) => ({
    key: organization.key,
    label: organization.label,
  }))
  const createItems = [
    { key: 'repository', label: UI_TEXT.quickCreate.repository },
    { key: 'merge-request', label: UI_TEXT.quickCreate.mergeRequest },
    { key: 'deployment-transfer', label: UI_TEXT.quickCreate.deploymentTransfer },
    { key: 'security-validation', label: UI_TEXT.quickCreate.securityValidation },
    { key: 'policy', label: UI_TEXT.quickCreate.policy },
  ]
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
    { key: 'sign-out', label: UI_TEXT.userMenu.signOut },
  ]

  const searchContent = (
    <div className="global-search-popover">
      {searchValue.trim() ? (
        <List
          size="small"
          dataSource={searchResults}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={UI_TEXT.globalSearch.empty} /> }}
          renderItem={(item) => (
            <List.Item onClick={() => navigateTo(item.href)} className="global-search-result">
              <List.Item.Meta
                title={
                  <Flex align="center" gap={8} wrap="wrap">
                    <Text strong>{item.title}</Text>
                    <StatusTag status={item.status} />
                  </Flex>
                }
                description={
                  <Space direction="vertical" size={2}>
                    <Text type="secondary">{item.type}</Text>
                    <Text type="secondary">{item.description}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={UI_TEXT.globalSearch.hint} />
      )}
    </div>
  )

  return (
    <Header className="top-header">
      <Flex align="center" gap={10} className="header-left">
        <Button type="text" icon={<SettingOutlined />} onClick={onToggleSidebar} />
        <Dropdown
          menu={{
            items: organizationItems,
            selectable: true,
            selectedKeys: selectedOrganization?.key ? [selectedOrganization.key] : [],
            onClick: handleOrganizationChange,
          }}
          trigger={['click']}
        >
          <Button icon={<GlobalOutlined />}>
            <span>{selectedOrganization?.label}</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      </Flex>

      <Popover
        open={searchOpen}
        onOpenChange={setSearchOpen}
        content={searchContent}
        trigger="click"
        placement="bottom"
        arrow={false}
        overlayClassName="global-search-overlay"
      >
        <Input
          className="global-search"
          prefix={<SearchOutlined />}
          placeholder={UI_TEXT.globalSearch.placeholder}
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value)
            setSearchOpen(true)
          }}
          onFocus={() => setSearchOpen(true)}
          allowClear
        />
      </Popover>

      <Space size={8} className="header-actions">
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
          <Button icon={<QuestionCircleOutlined />} />
        </Dropdown>
        <Button onClick={() => navigate(isAdminPath ? '/' : '/admin')}>
          {isAdminPath ? UI_TEXT.topHeader.backToUserPlatform : UI_TEXT.topHeader.adminConsole}
        </Button>
        <Dropdown
          menu={{
            items: userItems,
            onClick: ({ key }) => key !== 'profile' && message.info(`${UI_TEXT.userMenu.demoOnly}: ${key}`),
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
        width={420}
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
          <Text type="secondary">Quick Create, Global Search, Notification Drawer는 mock 데이터 기반으로 동작합니다.</Text>
        </Space>
      </Modal>
    </Header>
  )
}

export default TopHeader
