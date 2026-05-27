import {
  StarFilled,
  StarOutlined,
} from '../components/icons'
import { Alert, Button, Flex, List, Modal, Space, Tabs, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRepositories } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { FilterBar, PageHeader, StatusTag } from '../components/common'
import RepositoryAvatar from '../components/repository/RepositoryAvatar'
import { UI_TEXT } from '../constants'
import useRepositoryFavorites from '../hooks/useRepositoryFavorites'
import { sortRepositoriesByFavorite } from '../utils/favorites'

const { Link, Text } = Typography

const STATUS_OPTIONS = [
  { value: 'approved', label: '승인 완료' },
  { value: 'pending', label: '승인 대기' },
  { value: 'rejected', label: '승인 반려' },
  { value: 'canceled', label: '요청 취소' },
]

const STATUS_LABELS = Object.fromEntries(STATUS_OPTIONS.map((item) => [item.value, item.label]))

const STATUS_TAB_ITEMS = [
  { key: 'all', label: '전체' },
  ...STATUS_OPTIONS.map((item) => ({ key: item.value, label: item.label })),
]

const REPOSITORY_DISABLED_STATUSES = new Set(['pending', 'rejected', 'canceled'])

const VISIBILITY_OPTIONS = [
  { value: 'Private', label: 'Private' },
  { value: 'Public', label: 'Public' },
  { value: 'Internal', label: 'Internal' },
]

function getRejectReason(repository) {
  return repository.rejectReason || repository.rejectionReason || '반려 사유가 등록되지 않았습니다.'
}

export default function RepositoryList() {
  const navigate = useNavigate()
  const auth = useAuth()
  const { favorites, toggleFavorite } = useRepositoryFavorites()
  const allRepos = useMemo(() => getRepositories(), [])
  const canReviewRepositoryStatus = auth.isAdmin || auth.isInternalUser

  // 언어 옵션을 데이터에서 추출
  const languageOptions = useMemo(() => {
    const types = [...new Set(allRepos.map((r) => r.type).filter(Boolean))]
    return types.map((t) => ({ value: t, label: t }))
  }, [allRepos])

  // 필터 상태
  const [search, setSearch] = useState('')
  const [activeStatusTab, setActiveStatusTab] = useState('all')
  const [filterLanguage, setFilterLanguage] = useState(null)
  const [filterVisibility, setFilterVisibility] = useState(null)
  const [filterFavorite, setFilterFavorite] = useState(null)
  const [repositoryStatusOverrides, setRepositoryStatusOverrides] = useState({})
  const [rejectReasonRepository, setRejectReasonRepository] = useState(null)

  const repositories = useMemo(
    () =>
      allRepos.map((repo) => ({
        ...repo,
        status: repositoryStatusOverrides[repo.id] ?? repo.status,
      })),
    [allRepos, repositoryStatusOverrides],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const repos = sortRepositoriesByFavorite(
      repositories.map((repo) => ({
        ...repo,
        favorite: Object.prototype.hasOwnProperty.call(favorites, repo.id)
          ? Boolean(favorites[repo.id])
          : Boolean(repo.favorite),
      })),
    )

    return repos.filter((r) => {
      if (q) {
        const matchName = r.name?.toLowerCase().includes(q)
        const matchGroup = r.group?.toLowerCase().includes(q)
        const matchDesc = r.description?.toLowerCase().includes(q)
        if (!matchName && !matchGroup && !matchDesc) return false
      }
      if (canReviewRepositoryStatus && activeStatusTab !== 'all' && r.status !== activeStatusTab) return false
      if (filterLanguage && r.type !== filterLanguage) return false
      if (filterVisibility && r.visibility !== filterVisibility) return false
      if (filterFavorite === 'favorites' && !r.favorite) return false
      if (filterFavorite === 'non-favorites' && r.favorite) return false
      return true
    })
  }, [
    activeStatusTab,
    canReviewRepositoryStatus,
    repositories,
    search,
    filterLanguage,
    filterVisibility,
    filterFavorite,
    favorites,
  ])

  const statusCounts = useMemo(
    () =>
      repositories.reduce(
        (counts, repository) => ({
          ...counts,
          [repository.status]: (counts[repository.status] ?? 0) + 1,
        }),
        { all: repositories.length },
      ),
    [repositories],
  )

  const handleReset = () => {
    setSearch('')
    setFilterLanguage(null)
    setFilterVisibility(null)
    setFilterFavorite(null)
  }

  const isFiltered =
    search || filterLanguage || filterVisibility || filterFavorite

  const handleCancelRequest = (event, repository) => {
    event.stopPropagation()
    setRepositoryStatusOverrides((current) => ({
      ...current,
      [repository.id]: 'canceled',
    }))
  }

  const handleShowRejectReason = (event, repository) => {
    event.stopPropagation()
    setRejectReasonRepository(repository)
  }

  const renderRepositoryActions = (repository) => {
    if (!canReviewRepositoryStatus) return undefined

    if (repository.status === 'pending') {
      return [
        <Button key="cancel" size="small" onClick={(event) => handleCancelRequest(event, repository)}>
          요청 취소
        </Button>,
      ]
    }

    if (repository.status === 'rejected') {
      return [
        <Button key="reject-reason" size="small" onClick={(event) => handleShowRejectReason(event, repository)}>
          반려 사유 보기
        </Button>,
      ]
    }

    return undefined
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.pages.repositories.title}
        description={UI_TEXT.pages.repositories.description}
      />

      {canReviewRepositoryStatus ? (
        <Tabs
          className="repository-status-tabs"
          activeKey={activeStatusTab}
          onChange={setActiveStatusTab}
          items={STATUS_TAB_ITEMS.map((item) => ({
            key: item.key,
            label: `${item.label} ${statusCounts[item.key] ?? 0}`,
          }))}
        />
      ) : null}

      {/* 필터 */}
      <FilterBar
        search={{
          placeholder: UI_TEXT.filters.repositorySearch,
          value: search,
          onChange: setSearch,
        }}
        filters={[
          {
            key: 'language',
            placeholder: UI_TEXT.filters.language,
            options: languageOptions,
            value: filterLanguage,
            onChange: setFilterLanguage,
            width: 130,
          },
          {
            key: 'visibility',
            placeholder: UI_TEXT.filters.visibility,
            options: VISIBILITY_OPTIONS,
            value: filterVisibility,
            onChange: setFilterVisibility,
            width: 120,
          },
          {
            key: 'favorite',
            placeholder: UI_TEXT.filters.favorite,
            options: [
              { value: 'favorites', label: UI_TEXT.common.favorites },
              { value: 'non-favorites', label: UI_TEXT.common.nonFavorites },
            ],
            value: filterFavorite,
            onChange: setFilterFavorite,
            width: 140,
          },
        ]}
        onReset={isFiltered ? handleReset : undefined}
      />

      {/* 빈 검색 결과 안내 */}
      {isFiltered && filtered.length === 0 && (
        <Alert
          type="info"
          showIcon
          message={UI_TEXT.messages.empty.noSearchResults}
          description={UI_TEXT.messages.empty.noSearchResultsDescription}
        />
      )}

      <List
        className="repository-list"
        dataSource={filtered}
        locale={{ emptyText: UI_TEXT.messages.empty.table }}
        pagination={{
          pageSize: 15,
          showSizeChanger: false,
          showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}개`,
        }}
        renderItem={(repository) => (
          <List.Item
            actions={renderRepositoryActions(repository)}
            className={`repository-list-item ${REPOSITORY_DISABLED_STATUSES.has(repository.status) ? 'repository-list-item-disabled' : ''}`}
            onClick={() => {
              if (!REPOSITORY_DISABLED_STATUSES.has(repository.status)) {
                navigate(`/repositories/${repository.id}`)
              }
            }}
          >
            <Button
              type="text"
              shape="circle"
              className={`repository-list-favorite ${repository.favorite ? 'active' : ''}`}
              icon={repository.favorite ? <StarFilled /> : <StarOutlined />}
              onClick={(event) => {
                event.stopPropagation()
                toggleFavorite(repository.id, repository.favorite)
              }}
              aria-label={repository.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            />
            <List.Item.Meta
              avatar={(
                <RepositoryAvatar repository={repository} className="repository-list-thumbnail" />
              )}
              title={(
                <Flex align="center" gap={8} wrap="wrap">
                  {REPOSITORY_DISABLED_STATUSES.has(repository.status) ? (
                    <Text strong className="repo-name-link repository-list-disabled-name">
                      {repository.name}
                    </Text>
                  ) : (
                    <Link
                      className="repo-name-link"
                      onClick={(event) => {
                        event.stopPropagation()
                        navigate(`/repositories/${repository.id}`)
                      }}
                    >
                      {repository.name}
                    </Link>
                  )}
                  {canReviewRepositoryStatus ? (
                    <StatusTag status={repository.status} label={STATUS_LABELS[repository.status]} />
                  ) : null}
                </Flex>
              )}
              description={(
                <Space direction="vertical" size={4} className="repository-list-meta">
                  {repository.description ? <Text>{repository.description}</Text> : null}
                  <Space wrap size={[10, 4]}>
                    <Text type="secondary">{UI_TEXT.common.group}: {repository.group}</Text>
                    <Text type="secondary">{UI_TEXT.common.language}: {repository.type}</Text>
                    <Text type="secondary">{UI_TEXT.common.updated}: {repository.updatedAt}</Text>
                  </Space>
                </Space>
              )}
            />
          </List.Item>
        )}
      />
      <Modal
        title="반려 사유"
        open={Boolean(rejectReasonRepository)}
        onCancel={() => setRejectReasonRepository(null)}
        footer={<Button type="primary" onClick={() => setRejectReasonRepository(null)}>확인</Button>}
      >
        <Space direction="vertical" size={8}>
          <Text strong>{rejectReasonRepository?.name}</Text>
          <Text>{rejectReasonRepository ? getRejectReason(rejectReasonRepository) : ''}</Text>
        </Space>
      </Modal>
    </Space>
  )
}
