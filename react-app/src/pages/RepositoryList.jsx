import {
  StarFilled,
  StarOutlined,
} from '../components/icons'
import { Alert, Button, Flex, List, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRepositories } from '../api/repositories'
import { FilterBar, PageHeader, StatusTag } from '../components/common'
import { UI_TEXT } from '../constants'
import useRepositoryFavorites from '../hooks/useRepositoryFavorites'
import { sortRepositoriesByFavorite } from '../utils/favorites'

const { Link, Text } = Typography

const STATUS_OPTIONS = [
  { value: 'approved', label: '승인 완료' },
  { value: 'pending', label: UI_TEXT.status.labels.pending },
  { value: 'rejected', label: '승인 반려' },
  { value: 'canceled', label: UI_TEXT.status.labels.canceled },
]

const VISIBILITY_OPTIONS = [
  { value: 'Private', label: 'Private' },
  { value: 'Public', label: 'Public' },
  { value: 'Internal', label: 'Internal' },
]

export default function RepositoryList() {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useRepositoryFavorites()
  const allRepos = useMemo(() => getRepositories(), [])

  // 언어 옵션을 데이터에서 추출
  const languageOptions = useMemo(() => {
    const types = [...new Set(allRepos.map((r) => r.type).filter(Boolean))]
    return types.map((t) => ({ value: t, label: t }))
  }, [allRepos])

  // 필터 상태
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState(null)
  const [filterLanguage, setFilterLanguage] = useState(null)
  const [filterVisibility, setFilterVisibility] = useState(null)
  const [filterFavorite, setFilterFavorite] = useState(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const repos = sortRepositoriesByFavorite(
      allRepos.map((repo) => ({
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
      if (filterStatus && r.status !== filterStatus) return false
      if (filterLanguage && r.type !== filterLanguage) return false
      if (filterVisibility && r.visibility !== filterVisibility) return false
      if (filterFavorite === 'favorites' && !r.favorite) return false
      if (filterFavorite === 'non-favorites' && r.favorite) return false
      return true
    })
  }, [allRepos, search, filterStatus, filterLanguage, filterVisibility, filterFavorite, favorites])

  const handleReset = () => {
    setSearch('')
    setFilterStatus(null)
    setFilterLanguage(null)
    setFilterVisibility(null)
    setFilterFavorite(null)
  }

  const isFiltered =
    search || filterStatus || filterLanguage || filterVisibility || filterFavorite

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.pages.repositories.title}
        description={UI_TEXT.pages.repositories.description}
      />

      {/* 필터 */}
      <FilterBar
        search={{
          placeholder: UI_TEXT.filters.repositorySearch,
          value: search,
          onChange: setSearch,
        }}
        filters={[
          {
            key: 'status',
            placeholder: UI_TEXT.filters.status,
            options: STATUS_OPTIONS,
            value: filterStatus,
            onChange: setFilterStatus,
            width: 140,
          },
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
            className="repository-list-item"
            onClick={() => navigate(`/repositories/${repository.id}`)}
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
            <div className="repository-list-content">
              <Flex align="center" gap={8} wrap="wrap">
                <Link
                  className="repo-name-link"
                  onClick={(event) => {
                    event.stopPropagation()
                    navigate(`/repositories/${repository.id}`)
                  }}
                >
                  {repository.name}
                </Link>
                <StatusTag status={repository.status} />
              </Flex>
              {repository.description ? (
                <Text className="repository-list-description">{repository.description}</Text>
              ) : null}
              <Space wrap size={[10, 4]} className="repository-list-meta">
                <Text type="secondary">{UI_TEXT.common.group}: {repository.group}</Text>
                <Text type="secondary">{UI_TEXT.common.language}: {repository.type}</Text>
                <Text type="secondary">{UI_TEXT.common.updated}: {repository.updatedAt}</Text>
              </Space>
            </div>
          </List.Item>
        )}
      />
    </Space>
  )
}
