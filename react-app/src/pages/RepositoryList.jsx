import {
  DownOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from '../components/icons'
import { App as AntdApp, Button, Card, Dropdown, Empty, Flex, Input, Space, Tabs, Tag, Tooltip, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRepositories, getRepositoryRequests } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { FilterBar, PageHeader } from '../components/common'
import { UI_TEXT } from '../constants'
import useRepositoryFavorites from '../hooks/useRepositoryFavorites'
import { sortRepositoriesByFavorite } from '../utils/favorites'

const { Search } = Input
const { Text } = Typography

const REQUEST_STATUS_META = {
  pending: { label: '승인대기', color: 'warning' },
  rejected: { label: '승인반려', color: 'error' },
  canceled: { label: '요청취소', color: 'default' },
}

const REPOSITORY_STATUS_META = {
  approved: { label: '승인완료', color: 'success' },
}

const FILTER_TABS = [
  { key: 'all', label: '전체' },
  { key: 'pending', label: '승인대기' },
  { key: 'approved', label: '승인완료' },
  { key: 'rejected', label: '승인반려' },
  { key: 'canceled', label: '요청취소' },
]

function getStatusMeta(status) {
  return REPOSITORY_STATUS_META[status] ?? REQUEST_STATUS_META[status] ?? REQUEST_STATUS_META.canceled
}

function getRepositoryPath(repository) {
  return `${repository.group?.replace(/\s*\/\s*/g, '/') ?? '-'}${repository.name ? `/${repository.name}` : ''}`
}

function getPathParts(path) {
  const parts = String(path ?? '').split('/').filter(Boolean)
  return {
    groupPath: parts.slice(0, -1).join('/'),
    name: parts.at(-1) ?? path ?? '-',
  }
}

function getSearchText(item) {
  return [
    item.path,
    item.name,
    item.description,
    item.group,
    item.type,
    item.language,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export default function RepositoryList() {
  const navigate = useNavigate()
  const auth = useAuth()
  const { message, modal } = AntdApp.useApp()
  const { favorites, toggleFavorite } = useRepositoryFavorites()
  const canUseManagedView = auth.isAdmin || auth.isInternalUser
  const currentUserName = auth.currentUser?.name ?? '사용자'
  const allRepos = useMemo(() => getRepositories(), [])
  const requestSource = useMemo(() => getRepositoryRequests(), [])
  const [search, setSearch] = useState('')
  const [filterGroup, setFilterGroup] = useState(null)
  const [filterLanguage, setFilterLanguage] = useState(null)
  const [activeStatus, setActiveStatus] = useState('all')
  const [requestStatusOverrides, setRequestStatusOverrides] = useState({})

  const repositories = useMemo(
    () =>
      sortRepositoriesByFavorite(
        allRepos
          .filter((repository) => repository.status === 'approved')
          .map((repository) => ({
            ...repository,
            path: getRepositoryPath(repository),
            favorite: Object.prototype.hasOwnProperty.call(favorites, repository.id)
              ? Boolean(favorites[repository.id])
              : Boolean(repository.favorite),
          })),
      ),
    [allRepos, favorites],
  )

  const repositoryRequests = useMemo(
    () =>
      requestSource.map((request) => ({
        ...request,
        status: requestStatusOverrides[request.id] ?? request.status,
      })),
    [requestSource, requestStatusOverrides],
  )

  const groupOptions = useMemo(
    () =>
      [...new Set(repositories.map((repository) => repository.group).filter(Boolean))]
        .map((group) => ({ value: group, label: group })),
    [repositories],
  )

  const languageOptions = useMemo(
    () =>
      [...new Set([
        ...repositories.map((repository) => repository.type),
        ...(canUseManagedView ? repositoryRequests.map((request) => request.language) : []),
      ].filter(Boolean))]
        .map((language) => ({ value: language, label: language })),
    [canUseManagedView, repositories, repositoryRequests],
  )
  const groupFilterItems = [
    { key: 'all', label: '모든 그룹' },
    ...groupOptions.map((option) => ({ key: option.value, label: option.label })),
  ]
  const languageFilterItems = [
    { key: 'all', label: '언어' },
    ...languageOptions.map((option) => ({ key: option.value, label: option.label })),
  ]

  const matchesFilters = (item) => {
    const q = search.trim().toLowerCase()
    if (q && !getSearchText(item).includes(q)) return false
    if (filterGroup && item.group !== filterGroup && !item.path?.startsWith(filterGroup.replace(/\s*\/\s*/g, '/'))) return false
    if (filterLanguage && item.type !== filterLanguage && item.language !== filterLanguage) return false
    return true
  }

  const filteredRepositories = repositories.filter(matchesFilters)
  const filteredRequests = repositoryRequests.filter(matchesFilters)
  const repositoryRows = filteredRepositories.map((repository) => ({
    ...repository,
    rowType: 'repository',
    status: 'approved',
    groupPath: repository.group?.replace(/\s*\/\s*/g, '/'),
    language: repository.type,
    titleText: repository.name,
    timeText: repository.updatedAt,
  }))
  const catalogRows = useMemo(() => {
    const requestRows = canUseManagedView
      ? filteredRequests.map((request) => {
        const pathParts = getPathParts(request.path)
        return {
          ...request,
          ...pathParts,
          rowType: 'request',
          titleText: pathParts.name,
          timeText: request.requestedAtText,
        }
      })
      : []

    return [...repositoryRows, ...requestRows]
  }, [canUseManagedView, filteredRequests, repositoryRows])

  const visibleCatalogRows = catalogRows.filter((row) => activeStatus === 'all' || row.status === activeStatus)
  const visibleRepositoryRows = canUseManagedView ? visibleCatalogRows : repositoryRows
  const tabItems = FILTER_TABS.map((tab) => ({
    ...tab,
    label: tab.label,
  }))

  const handleCancelRequest = (request) => {
    modal.confirm({
      title: '요청을 취소할까요?',
      content: request.path,
      okText: '요청취소',
      cancelText: '닫기',
      onOk: () => {
        setRequestStatusOverrides((current) => ({ ...current, [request.id]: 'canceled' }))
        message.success('저장소 생성 요청을 취소했어요.')
      },
    })
  }

  const handleShowRejectReason = (request) => {
    modal.info({
      title: '반려사유',
      content: request.rejectReason ?? '반려 사유가 등록되지 않았습니다.',
      okText: '확인',
    })
  }

  const handleFavoriteClick = (event, repository) => {
    event.stopPropagation()
    toggleFavorite(repository.id, repository.favorite)
  }

  const renderFilterBar = () => (
    <FilterBar className="repository-catalog-filter">
      <Search
        allowClear
        className="filter-search-fill"
        placeholder="저장소명, 프로젝트명, 담당 조직 선택"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Dropdown
        menu={{
          selectedKeys: [filterGroup ?? 'all'],
          items: groupFilterItems,
          onClick: ({ key }) => setFilterGroup(key === 'all' ? null : key),
        }}
      >
        <Button className="filter-button--compact">
          <Space>
            {filterGroup ?? '모든 그룹'}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Dropdown
        menu={{
          selectedKeys: [filterLanguage ?? 'all'],
          items: languageFilterItems,
          onClick: ({ key }) => setFilterLanguage(key === 'all' ? null : key),
        }}
      >
        <Button className="filter-button--sm">
          <Space>
            {filterLanguage ?? '언어'}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </FilterBar>
  )

  const renderRowActions = (row) => {
    if (row.rowType === 'repository') {
      return (
        <Tooltip title={row.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}>
          <Button
            type="text"
            shape="circle"
            className={`repository-list-favorite ${row.favorite ? 'active' : ''}`}
            icon={row.favorite ? <StarFilled /> : <StarOutlined />}
            onClick={(event) => handleFavoriteClick(event, row)}
            aria-label={row.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          />
        </Tooltip>
      )
    }

    if (row.status === 'pending') {
      return <Button danger onClick={() => handleCancelRequest(row)}>요청취소</Button>
    }

    if (row.status === 'rejected') {
      return <Button onClick={() => handleShowRejectReason(row)}>반려사유</Button>
    }

    return null
  }

  const renderCatalogRow = (row) => {
    const meta = getStatusMeta(row.status)
    const isRepository = row.rowType === 'repository'
    const descriptionItems = [
      row.groupPath,
      row.description,
      row.language,
      row.timeText,
    ].filter(Boolean)
    const rowClassName = [
      'repository-catalog-row',
      `repository-catalog-row-${row.status}`,
      isRepository ? 'repository-catalog-row-clickable' : null,
    ].filter(Boolean).join(' ')

    return (
      <Flex
        key={`${row.rowType}-${row.id}`}
        align="center"
        justify="space-between"
        gap={16}
        className={rowClassName}
        onClick={isRepository ? () => navigate(`/repositories/${row.id}`) : undefined}
        role={isRepository ? 'button' : undefined}
        tabIndex={isRepository ? 0 : undefined}
        onKeyDown={isRepository ? (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            navigate(`/repositories/${row.id}`)
          }
        } : undefined}
      >
        <Space orientation="vertical" size={4} className="repository-catalog-content">
          <Flex align="center" gap={8} wrap="wrap">
            <Text strong className="repository-catalog-title">{row.titleText}</Text>
            {canUseManagedView ? <Tag color={meta.color} className="status-tag-compact">{meta.label}</Tag> : null}
          </Flex>
          <Text type="secondary" className="repository-catalog-description">
            {descriptionItems.map((item, index) => (
              <span key={`${row.id}-${item}`}>
                {index > 0 ? <span className="repository-catalog-dot">·</span> : null}
                {item}
              </span>
            ))}
          </Text>
        </Space>
        <Flex align="center" justify="flex-end" className="repository-catalog-actions">
          {renderRowActions(row)}
        </Flex>
      </Flex>
    )
  }

  return (
    <Space orientation="vertical" size={16} className="page-stack">
      <PageHeader
        title={UI_TEXT.pages.repositories.title}
        description={`${currentUserName}님이 속한 저장소의 모든 목록이에요. 저장소를 즐겨찾기하여, 언제든 쉽고 빠르게 이동해 보세요.`}
        actions={canUseManagedView ? [
          <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => navigate('/repositories/new')}>
            저장소 생성
          </Button>,
        ] : null}
      />

      <Space orientation="vertical" size={16} className="repository-catalog">
        {canUseManagedView ? (
          <Tabs
            activeKey={activeStatus}
            items={tabItems}
            onChange={setActiveStatus}
          />
        ) : null}
        {renderFilterBar()}
        <Card variant="outlined" styles={{ body: { padding: 0 } }}>
          <div className="repository-catalog-list">
            {visibleRepositoryRows.length > 0 ? visibleRepositoryRows.map(renderCatalogRow) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="저장소가 없습니다." />
            )}
          </div>
        </Card>
      </Space>
    </Space>
  )
}
