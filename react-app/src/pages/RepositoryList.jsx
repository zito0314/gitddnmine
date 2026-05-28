import {
  DownOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from '../components/icons'
import { App as AntdApp, Avatar, Button, Card, Empty, Flex, Input, Select, Space, Tag, Tooltip, Typography } from 'antd'
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
  pending: { label: '승인대기', color: 'warning', timePrefix: 'Requested' },
  rejected: { label: '승인반려', color: 'error', timePrefix: 'Rejected' },
  canceled: { label: '요청취소', color: 'default', timePrefix: 'Canceled' },
}

const REPOSITORY_STATUS_META = {
  approved: { label: '승인완료', color: 'success' },
}

function getRepositoryPath(repository) {
  return `${repository.group?.replace(/\s*\/\s*/g, '/') ?? '-'}${repository.name ? `/${repository.name}` : ''}`
}

function getInitial(value) {
  return String(value ?? 'R').trim().charAt(0).toUpperCase() || 'R'
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
  const [requestCollapsed, setRequestCollapsed] = useState(false)
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
  const visibleManagedRepositories = canUseManagedView ? filteredRepositories.slice(0, 3) : filteredRepositories
  const hiddenRepositoryCount = canUseManagedView ? Math.max(filteredRepositories.length - visibleManagedRepositories.length, 0) : 0

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
    <Card size="small" variant="outlined">
      <Flex align="center" gap={12} wrap="wrap">
        <Select
          allowClear
          options={groupOptions}
          placeholder="전체 그룹"
          value={filterGroup}
          onChange={setFilterGroup}
          style={{ width: 140 }}
        />
        <Search
          allowClear
          placeholder="저장소명, 프로젝트명, 담당 조직 선택"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{ flex: '1 1 360px', minWidth: 260 }}
        />
        <Select
          allowClear
          options={languageOptions}
          placeholder="언어"
          value={filterLanguage}
          onChange={setFilterLanguage}
          style={{ width: 120 }}
        />
      </Flex>
    </Card>
  )

  const renderRequestItem = (request) => {
    const meta = REQUEST_STATUS_META[request.status] ?? REQUEST_STATUS_META.canceled

    return (
      <Flex key={request.id} className="repository-list-item" align="flex-start" justify="space-between" gap={16} wrap="wrap">
        <Space orientation="vertical" size={4} className="repository-list-meta">
          <Flex align="center" gap={8} wrap="wrap">
            <Text strong>{request.path}</Text>
            <Tag color={meta.color}>{meta.label}</Tag>
          </Flex>
          <Text type="secondary">{request.description} · {request.language}</Text>
        </Space>
        <Space wrap>
          <Text type="secondary">{request.requestedAtText}</Text>
          {request.status === 'pending' ? (
            <Button onClick={() => handleCancelRequest(request)}>요청취소</Button>
          ) : null}
          {request.status === 'rejected' ? (
            <Button danger onClick={() => handleShowRejectReason(request)}>반려사유</Button>
          ) : null}
        </Space>
      </Flex>
    )
  }

  const renderRepositoryItem = (repository, showStatus = false) => (
    <Flex
      key={repository.id}
      className="repository-list-item"
      align="flex-start"
      justify="space-between"
      gap={16}
      wrap="wrap"
      onClick={() => navigate(`/repositories/${repository.id}`)}
    >
      <Space align="start" size={12} className="repository-list-meta">
        <Avatar shape="square" size={44}>{getInitial(repository.name)}</Avatar>
        <Space orientation="vertical" size={4}>
          <Flex align="center" gap={8} wrap="wrap">
            <Text strong>{repository.path}</Text>
            {showStatus && repository.status ? (
              <Tag color={REPOSITORY_STATUS_META[repository.status]?.color}>
                {REPOSITORY_STATUS_META[repository.status]?.label ?? repository.status}
              </Tag>
            ) : null}
          </Flex>
          <Text type="secondary">{repository.description} · {repository.type}</Text>
        </Space>
      </Space>
      <Space>
        <Text type="secondary">{repository.updatedAt}</Text>
        <Tooltip title={repository.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}>
          <Button
            type="text"
            shape="circle"
            className={`repository-list-favorite ${repository.favorite ? 'active' : ''}`}
            icon={repository.favorite ? <StarFilled /> : <StarOutlined />}
            onClick={(event) => handleFavoriteClick(event, repository)}
            aria-label={repository.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          />
        </Tooltip>
      </Space>
    </Flex>
  )

  const renderRepositoryRows = (items, emptyDescription, renderItem) => (
    items.length ? (
      <Space orientation="vertical" size={0} className="repository-list">
        {items.map(renderItem)}
      </Space>
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyDescription} />
    )
  )

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.pages.repositories.title}
        description={`${currentUserName}님이 속한 저장소의 모든 목록이에요.`}
        actions={canUseManagedView ? [
          <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => navigate('/repositories/new')}>
            저장소 생성
          </Button>,
        ] : null}
      >
        <Text type="secondary">저장소를 즐겨찾기하여, 언제든 쉽고 빠르게 이동해 보세요.</Text>
      </PageHeader>

      {renderFilterBar()}

      {canUseManagedView ? (
        <>
          <Card
            title={`요청한 저장소 ${filteredRequests.length}`}
            extra={(
              <Button
                type="text"
                icon={<DownOutlined style={{ transform: requestCollapsed ? undefined : 'rotate(180deg)' }} />}
                onClick={() => setRequestCollapsed((current) => !current)}
                aria-label={requestCollapsed ? '요청한 저장소 펼치기' : '요청한 저장소 접기'}
              />
            )}
            styles={{ body: { display: requestCollapsed ? 'none' : undefined } }}
          >
            {renderRepositoryRows(filteredRequests, '요청한 저장소가 없습니다.', renderRequestItem)}
          </Card>

          <Card
            title={(
              <Space size={8}>
                <span>{`나의 저장소 ${visibleManagedRepositories.length}`}</span>
                {hiddenRepositoryCount > 0 ? <Tag color="success">+{hiddenRepositoryCount}</Tag> : null}
              </Space>
            )}
          >
            {renderRepositoryRows(visibleManagedRepositories, '저장소가 없습니다.', (repository) => renderRepositoryItem(repository, true))}
          </Card>
        </>
      ) : (
        <Card>
          {renderRepositoryRows(filteredRepositories, '저장소가 없습니다.', (repository) => renderRepositoryItem(repository))}
        </Card>
      )}
    </Space>
  )
}
