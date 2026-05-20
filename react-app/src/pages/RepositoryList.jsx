import {
  AlertOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  DatabaseOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { Alert, Col, Row, Space, Typography } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRepositories, getRepositorySummary } from '../api/repositories'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'

const { Link, Text } = Typography

// 언어(타입) 목록을 데이터에서 동적으로 추출
function useRepositoryData() {
  const [favorites, setFavorites] = useState(() => {
    const all = getRepositories()
    return new Set(all.filter((r) => r.favorite).map((r) => r.id))
  })

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return { favorites, toggleFavorite }
}

const STATUS_OPTIONS = [
  { value: 'approved', label: '승인 완료' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: '승인 반려' },
  { value: 'canceled', label: 'Canceled' },
]

const VISIBILITY_OPTIONS = [
  { value: 'Private', label: 'Private' },
  { value: 'Public', label: 'Public' },
  { value: 'Internal', label: 'Internal' },
]

export default function RepositoryList() {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useRepositoryData()
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
    return allRepos.filter((r) => {
      if (q) {
        const matchName = r.name?.toLowerCase().includes(q)
        const matchGroup = r.group?.toLowerCase().includes(q)
        const matchDesc = r.description?.toLowerCase().includes(q)
        if (!matchName && !matchGroup && !matchDesc) return false
      }
      if (filterStatus && r.status !== filterStatus) return false
      if (filterLanguage && r.type !== filterLanguage) return false
      if (filterVisibility && r.visibility !== filterVisibility) return false
      if (filterFavorite === 'favorites' && !favorites.has(r.id)) return false
      if (filterFavorite === 'non-favorites' && favorites.has(r.id)) return false
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
            className={`favorite-btn ${favorites.has(record.id) ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(record.id)
            }}
            role="button"
            aria-label={favorites.has(record.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            style={{ cursor: 'pointer', fontSize: 16 }}
          >
            {favorites.has(record.id) ? <StarFilled /> : <StarOutlined />}
          </span>
        ),
      },
      {
        title: 'Repository',
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
        title: 'Group',
        dataIndex: 'group',
        key: 'group',
        minWidth: 180,
        render: (value) => <Text type="secondary">{value}</Text>,
      },
      {
        title: 'Language',
        dataIndex: 'type',
        key: 'type',
        width: 110,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (value) => <StatusTag status={value} />,
      },
      {
        title: 'Pipeline',
        dataIndex: 'pipelineStatus',
        key: 'pipelineStatus',
        width: 110,
        render: (value) => <StatusTag status={value} />,
      },
      {
        title: 'Security',
        dataIndex: 'securityStatus',
        key: 'securityStatus',
        width: 110,
        render: (value) => <StatusTag status={value} />,
      },
      {
        title: 'Updated',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: 180,
        render: (value) => <Text type="secondary">{value}</Text>,
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: 130,
        render: (value) => <Text>{value}</Text>,
      },
    ],
    [favorites, navigate, toggleFavorite],
  )

  const isFiltered =
    search || filterStatus || filterLanguage || filterVisibility || filterFavorite

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title="Repository"
        description="프로젝트 Repository를 관리하고 Pipeline과 보안 상태를 한눈에 확인하세요."
      />

      {/* 요약 카드 */}
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} lg={6}>
          <SummaryCard
            title="Total Repositories"
            value={summary.total}
            icon={<DatabaseOutlined />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SummaryCard
            title="Active"
            value={summary.active}
            icon={<CheckCircleOutlined style={{ color: '#228738' }} />}
            tone="success"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SummaryCard
            title="Review Required"
            value={summary.reviewRequired}
            icon={<CodeOutlined style={{ color: '#9e6a00' }} />}
            tone="warning"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SummaryCard
            title="Security Blocked"
            value={summary.securityBlocked}
            icon={<AlertOutlined style={{ color: '#de3412' }} />}
            tone="error"
          />
        </Col>
      </Row>

      {/* 필터 */}
      <FilterBar
        search={{
          placeholder: 'Repository 이름, 그룹, 설명 검색',
          value: search,
          onChange: setSearch,
        }}
        filters={[
          {
            key: 'status',
            placeholder: 'Status',
            options: STATUS_OPTIONS,
            value: filterStatus,
            onChange: setFilterStatus,
            width: 140,
          },
          {
            key: 'language',
            placeholder: 'Language',
            options: languageOptions,
            value: filterLanguage,
            onChange: setFilterLanguage,
            width: 130,
          },
          {
            key: 'visibility',
            placeholder: 'Visibility',
            options: VISIBILITY_OPTIONS,
            value: filterVisibility,
            onChange: setFilterVisibility,
            width: 120,
          },
          {
            key: 'favorite',
            placeholder: 'Favorite',
            options: [
              { value: 'favorites', label: '⭐ Favorites' },
              { value: 'non-favorites', label: 'Non-favorites' },
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
          message="검색 결과가 없습니다."
          description="검색어나 필터 조건을 변경해 보세요."
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
