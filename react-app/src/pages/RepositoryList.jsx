import {
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from '../components/icons'
import { App as AntdApp, Button, Card, Empty, Flex, Input, Select, Space, Tabs, Tag, Tooltip, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRepositories, getRepositoryRequests } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { PageHeader } from '../components/common'
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
        ...repositoryRequests.map((request) => request.language),
      ].filter(Boolean))]
        .map((language) => ({ value: language, label: language })),
    [repositories, repositoryRequests],
  )

  const matchesFilters = (item) => {
    const q = search.trim().toLowerCase()
    if (q && !getSearchText(item).includes(q)) return false
    if (filterGroup && item.group !== filterGroup && !item.path?.startsWith(filterGroup.replace(/\s*\/\s*/g, '/'))) return false
    if (filterLanguage && item.type !== filterLanguage && item.language !== filterLanguage) return false
    return true
  }

  const filteredRepositories = repositories.filter(matchesFilters)
  const filteredRequests = repositoryRequests.filter(matchesFilters)
  const catalogRows = useMemo(() => {
    const approvedRows = filteredRepositories.map((repository) => ({
      ...repository,
      rowType: 'repository',
      status: 'approved',
      language: repository.type,
      timeText: repository.updatedAt,
    }))
    const requestRows = canUseManagedView
      ? filteredRequests.map((request) => ({
        ...request,
        rowType: 'request',
        timeText: request.requestedAtText,
      }))
      : []

    return [...approvedRows, ...requestRows]
  }, [canUseManagedView, filteredRepositories, filteredRequests])

  const visibleCatalogRows = catalogRows.filter((row) => activeStatus === 'all' || row.status === activeStatus)
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
    <Flex align="center" gap={12} wrap="wrap" className="repository-catalog-filter">
      <Search
        allowClear
        placeholder="저장소명, 프로젝트명, 담당 조직 선택"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="repository-catalog-search"
      />
      <Select
        allowClear
        options={groupOptions}
        placeholder="모든 그룹"
        value={filterGroup}
        onChange={setFilterGroup}
        className="repository-catalog-select"
      />
      <Select
        allowClear
        options={languageOptions}
        placeholder="언어"
        value={filterLanguage}
        onChange={setFilterLanguage}
        className="repository-catalog-select repository-catalog-language"
      />
    </Flex>
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
            <Text strong className="repository-catalog-title">{row.path}</Text>
            <Tag color={meta.color} className="repository-status-tag">{meta.label}</Tag>
          </Flex>
          <Text type="secondary" className="repository-catalog-description">
            {row.description} <span className="repository-catalog-dot">·</span> {row.language} <span className="repository-catalog-dot">·</span> {row.timeText}
          </Text>
        </Space>
        <Flex align="center" justify="flex-end" className="repository-catalog-actions">
          {renderRowActions(row)}
        </Flex>
      </Flex>
    )
  }

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
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
        <Tabs
          activeKey={activeStatus}
          items={tabItems}
          onChange={setActiveStatus}
          className="repository-catalog-tabs"
        />
        <Card size="small" variant="outlined" className="repository-catalog-filter-card">
          {renderFilterBar()}
        </Card>
        <Card variant="outlined" className="repository-catalog-list-card" styles={{ body: { padding: 0 } }}>
          <div className="repository-catalog-list">
            {visibleCatalogRows.length > 0 ? visibleCatalogRows.map(renderCatalogRow) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="저장소가 없습니다." />
            )}
          </div>
        </Card>
      </Space>
    </Space>
  )
}
