import {
  AlertOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  DatabaseOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { Alert, Col, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRepositories, getRepositorySummary } from '../api/repositories'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
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
  const summary = useMemo(() => getRepositorySummary(), [])

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

  const columns = useMemo(
    () => [
      {
        key: 'favorite',
        width: 40,
        align: 'center',
        render: (_, record) => (
          <span
            className={`favorite-btn ${record.favorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(record.id, record.favorite)
            }}
            role="button"
            aria-label={record.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            style={{ cursor: 'pointer', fontSize: 16 }}
          >
            {record.favorite ? <StarFilled /> : <StarOutlined />}
          </span>
        ),
      },
      {
        title: UI_TEXT.common.repository,
        key: 'name',
        minWidth: 200,
        render: (_, record) => (
          <div className="repo-name-cell">
            <Link
              className="repo-name-link"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/repositories/${record.id}`)
              }}
            >
              {record.name}
            </Link>
            {record.description && (
              <Text className="repo-description" title={record.description}>
                {record.description}
              </Text>
            )}
          </div>
        ),
      },
      {
        title: UI_TEXT.common.group,
        dataIndex: 'group',
        key: 'group',
        minWidth: 180,
        render: (value) => <Text type="secondary">{value}</Text>,
      },
      {
        title: UI_TEXT.common.language,
        dataIndex: 'type',
        key: 'type',
        width: 110,
      },
      {
        title: UI_TEXT.common.status,
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (value) => <StatusTag status={value} />,
      },
      {
        title: UI_TEXT.common.pipeline,
        dataIndex: 'pipelineStatus',
        key: 'pipelineStatus',
        width: 110,
        render: (value) => <StatusTag status={value} />,
      },
      {
        title: UI_TEXT.common.security,
        dataIndex: 'securityStatus',
        key: 'securityStatus',
        width: 110,
        render: (value) => <StatusTag status={value} />,
      },
      {
        title: UI_TEXT.common.updated,
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: 180,
        render: (value) => <Text type="secondary">{value}</Text>,
      },
      {
        title: UI_TEXT.common.role,
        dataIndex: 'role',
        key: 'role',
        width: 130,
        render: (value) => <Text>{value}</Text>,
      },
    ],
    [navigate, toggleFavorite],
  )

  const isFiltered =
    search || filterStatus || filterLanguage || filterVisibility || filterFavorite

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.pages.repositories.title}
        description={UI_TEXT.pages.repositories.description}
      />

      {/* 요약 카드 */}
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} lg={6}>
          <SummaryCard
            title={UI_TEXT.summary.totalRepositories}
            value={summary.total}
            icon={<DatabaseOutlined />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SummaryCard
            title={UI_TEXT.summary.active}
            value={summary.active}
            icon={<CheckCircleOutlined style={{ color: '#228738' }} />}
            tone="success"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SummaryCard
            title={UI_TEXT.summary.reviewRequired}
            value={summary.reviewRequired}
            icon={<CodeOutlined style={{ color: '#9e6a00' }} />}
            tone="warning"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SummaryCard
            title={UI_TEXT.summary.securityBlocked}
            value={summary.securityBlocked}
            icon={<AlertOutlined style={{ color: '#de3412' }} />}
            tone="error"
          />
        </Col>
      </Row>

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

      {/* 테이블 */}
      <DataTable
        rowKey="id"
        columns={columns}
        dataSource={filtered}
        onRow={(record) => ({
          onClick: () => navigate(`/repositories/${record.id}`),
          style: { cursor: 'pointer' },
        })}
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}개`,
        }}
      />
    </Space>
  )
}
