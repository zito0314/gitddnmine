import { CopyOutlined, EllipsisOutlined, LockOutlined, TagOutlined } from '../components/icons'
import {
  App as AntdApp,
  Button,
  Card,
  Divider,
  Dropdown,
  Empty,
  Flex,
  Input,
  Result,
  Select,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllTags, getRepositories, getRepositoryDetail, getRepositoryTagSummary } from '../api/repositories'
import { PageHeader, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

const { Text } = Typography

const SORT_OPTIONS = [
  { value: 'latestUpdated', label: '최신 업데이트순' },
  { value: 'oldestUpdated', label: '오래된 업데이트순' },
  { value: 'name', label: 'Tag명' },
]

const DOWNLOAD_FORMATS = ['zip', 'tar.gz', 'tar.bz2', 'tar']

const TAB_ITEMS = [
  { key: 'all', label: '전체' },
  { key: 'protected', label: 'Protected' },
  { key: 'release', label: 'Release' },
]

function sortTags(tags, sortKey) {
  return [...tags].sort((a, b) => {
    if (sortKey === 'name') return a.name.localeCompare(b.name)
    const ua = a.updatedAt ?? a.createdAt ?? ''
    const ub = b.updatedAt ?? b.createdAt ?? ''
    if (sortKey === 'latestUpdated') return ub.localeCompare(ua)
    return ua.localeCompare(ub)
  })
}

function TagRow({ tag, repositoryId }) {
  const navigate = useNavigate()
  const { message } = AntdApp.useApp()

  const copyToClipboard = async (text, successMsg, failMsg) => {
    try {
      await navigator.clipboard.writeText(text)
      message.success(successMsg)
    } catch {
      message.error(failMsg)
    }
  }

  const handleRowClick = () => {
    const sha = tag.latestCommit?.sha ?? tag.commit
    if (sha) {
      navigate(`/repositories/${repositoryId}/commits/${sha}`)
    } else {
      message.info('Tag 기준 Commit으로 이동합니다.')
    }
  }

  const handleCopyTagName = (e) => {
    e.stopPropagation()
    copyToClipboard(tag.name, 'Tag명을 복사했어요.', 'Tag명을 복사하지 못했어요.')
  }

  const handleCommitClick = (e) => {
    e.stopPropagation()
    const sha = tag.latestCommit?.sha ?? tag.commit
    if (sha) {
      navigate(`/repositories/${repositoryId}/commits/${sha}`)
    } else {
      message.info('Commit 상세로 이동합니다.')
    }
  }

  const handleCompare = () => {
    message.info('Compare 화면으로 이동합니다.')
    navigate(`/repositories/${repositoryId}/compare?tag=${encodeURIComponent(tag.name)}`)
  }

  const buildDownloadSubmenu = (format) => ({
    key: `download-${format}`,
    label: format,
    onClick: ({ domEvent }) => {
      domEvent.stopPropagation()
      message.success(`${tag.name} Source code 다운로드를 시작합니다. (${format})`)
    },
  })

  const moreMenuItems = [
    {
      key: 'view-commit',
      label: 'Commit 보기',
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation()
        const sha = tag.latestCommit?.sha ?? tag.commit
        if (sha) {
          navigate(`/repositories/${repositoryId}/commits/${sha}`)
        } else {
          message.info('Commit 상세로 이동합니다.')
        }
      },
    },
    {
      key: 'download',
      label: 'Source code 다운로드',
      children: DOWNLOAD_FORMATS.map(buildDownloadSubmenu),
    },
    {
      key: 'copy-tag',
      label: 'Tag명 복사',
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation()
        copyToClipboard(tag.name, 'Tag명을 복사했어요.', 'Tag명을 복사하지 못했어요.')
      },
    },
    {
      key: 'compare',
      label: 'Compare',
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation()
        handleCompare()
      },
    },
  ]

  const sha = tag.latestCommit?.sha ?? tag.commit ?? ''
  const commitMsg = tag.latestCommit?.message ?? tag.message ?? '-'
  const author = tag.latestCommit?.author ?? tag.author ?? '-'
  const timeText = tag.latestCommit?.updatedAtText ?? tag.createdAt ?? '-'

  return (
    <div
      className="tag-row"
      onClick={handleRowClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleRowClick()}
    >
      <Flex align="center" justify="space-between" gap={16} wrap="wrap">
        {/* 좌측: Tag 주요 정보 */}
        <div className="tag-main-info" style={{ flex: '1 1 300px', minWidth: 0 }}>
          {/* 1행: Tag명 + 배지 + 복사 */}
          <Flex align="center" gap={8} wrap="wrap">
            <TagOutlined style={{ fontSize: 13 }} />
            <Text strong style={{ fontSize: 14 }}>{tag.name}</Text>
            <Tooltip title="Tag명 복사">
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={handleCopyTagName}
                style={{ padding: '0 4px' }}
              />
            </Tooltip>
            {tag.protected && (
              <Tag icon={<LockOutlined style={{ fontSize: 10 }} />} style={{ margin: 0 }}>Protected</Tag>
            )}
            {tag.release && (
              <Tag color="blue" style={{ margin: 0 }}>Release</Tag>
            )}
          </Flex>
          {/* 2행: Commit 메타 */}
          <div className="tag-commit-meta" style={{ marginTop: 4 }}>
            <Flex align="center" gap={6} wrap="wrap">
              {sha && (
                <Tooltip title="Commit 상세 보기">
                  <Text
                    code
                    style={{ cursor: 'pointer', fontSize: 12 }}
                    onClick={handleCommitClick}
                  >
                    {sha.slice(0, 8)}
                  </Text>
                </Tooltip>
              )}
              {commitMsg !== '-' && (
                <>
                  <Text type="secondary" style={{ fontSize: 12 }}>·</Text>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, maxWidth: 320 }}
                    ellipsis={{ tooltip: commitMsg }}
                  >
                    {commitMsg}
                  </Text>
                </>
              )}
              <Text type="secondary" style={{ fontSize: 12 }}>·</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>{author}</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>·</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>{timeText}</Text>
            </Flex>
          </div>
        </div>

        {/* 우측: 더보기 메뉴 */}
        <div className="tag-actions" onClick={(e) => e.stopPropagation()}>
          <Dropdown
            menu={{ items: moreMenuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              size="small"
              icon={<EllipsisOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </div>
      </Flex>
    </div>
  )
}

export default function RepositoryTags() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const { message } = AntdApp.useApp()

  const repository = getRepositoryDetail(repositoryId)
  const allTags = useMemo(() => getAllTags(), [])
  const repositories = useMemo(() => getRepositories(), [])
  const summary = useMemo(() => getRepositoryTagSummary(repositoryId), [repositoryId])

  const [activeTab, setActiveTab] = useState('all')
  const [repoFilter, setRepoFilter] = useState(repositoryId)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('latestUpdated')

  if (!repository) {
    return (
      <Result
        status="404"
        title="Repository를 찾을 수 없어요."
        subTitle="삭제되었거나 접근 권한이 없는 Repository일 수 있어요."
        extra={
          <Button type="primary" onClick={() => navigate('/repositories')}>
            저장소 목록으로 이동
          </Button>
        }
      />
    )
  }

  const repoOptions = [
    { value: '__all__', label: '전체 저장소' },
    ...repositories.map((r) => ({ value: r.id, label: r.name ?? r.id })),
  ]

  const q = search.trim().toLowerCase()

  const filtered = sortTags(
    allTags.filter((tag) => {
      // Repository 필터
      const filterRepoId = repoFilter === '__all__' ? null : repoFilter
      if (filterRepoId && tag.repositoryId !== filterRepoId) return false

      // 탭 필터
      if (activeTab === 'protected' && !tag.protected) return false
      if (activeTab === 'release' && !tag.release) return false

      // 검색 필터
      if (q) {
        const searchTargets = [
          tag.name,
          tag.repositoryName,
          tag.projectName,
          tag.organizationName,
          tag.latestCommit?.sha ?? tag.commit,
          tag.latestCommit?.message ?? tag.message,
          tag.latestCommit?.author ?? tag.author,
        ].filter(Boolean).join(' ').toLowerCase()
        if (!searchTargets.includes(q)) return false
      }

      return true
    }),
    sortKey,
  )

  const headerActions = (
    <Space>
      <Button
        type="primary"
        onClick={() => message.info('Tag 생성 화면으로 이동합니다.')}
      >
        Tag 생성
      </Button>
      <Dropdown
        menu={{
          items: [
            { key: 'policy', label: 'Tag 정책 보기', onClick: () => message.info('Tag 정책 화면으로 이동합니다.') },
            { key: 'feed', label: 'Tags 피드 보기', onClick: () => message.info('Tags 피드로 이동합니다.') },
          ],
        }}
        trigger={['click']}
        placement="bottomRight"
      >
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
    </Space>
  )

  return (
    <Space direction="vertical" size={16} className="tag-list-page page-stack">
      <PageHeader
        title={UI_TEXT.pages.repositoryTags.title}
        description={UI_TEXT.pages.repositoryTags.description}
        actions={headerActions}
      />

      {/* 요약 카드 */}
      <Flex gap={12} wrap="wrap">
        <div className="summary-card-tile">
          <SummaryCard title="Total Tags" value={summary.total} icon={<TagOutlined />} />
        </div>
        <div className="summary-card-tile">
          <SummaryCard title="Latest Release" value={summary.latestRelease} />
        </div>
        <div className="summary-card-tile">
          <SummaryCard title="Production" value={summary.production} tone="success" />
        </div>
        <div className="summary-card-tile">
          <SummaryCard title="Pre-release" value={summary.preRelease} tone="warning" />
        </div>
      </Flex>

      <Card className="tag-list-card" styles={{ body: { padding: 0 } }}>
        {/* 탭 필터 */}
        <div className="tag-filter-tabs">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={TAB_ITEMS}
            size="small"
          />
        </div>

        <Divider style={{ margin: 0 }} />

        {/* 검색 / Repository 필터 / 정렬 */}
        <Flex className="tag-filter-bar" gap={12} wrap="wrap">
          <Select
            value={repoFilter}
            onChange={setRepoFilter}
            options={repoOptions}
            className="filter-select filter-select--xl"
            placeholder="전체 저장소"
          />
          <Input.Search
            placeholder="저장소명, 프로젝트명, 담당 조직 선택"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={(value) => setSearch(value)}
            allowClear
            className="filter-search-limited"
          />
          <Select
            value={sortKey}
            onChange={setSortKey}
            options={SORT_OPTIONS}
            className="filter-select filter-select--lg"
          />
        </Flex>

        <Divider style={{ margin: 0 }} />

        {/* Tag 목록 */}
        <div className="tag-list-content">
          {allTags.length === 0 ? (
            <div style={{ padding: '32px 0' }}>
              <Empty description="표시할 Tag가 없어요." />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '32px 0' }}>
              <Empty
                description={
                  <Space direction="vertical" size={4}>
                    <Text>조건에 맞는 Tag가 없어요.</Text>
                    <Text type="secondary">검색어를 변경해 주세요.</Text>
                  </Space>
                }
              />
            </div>
          ) : (
            <Space direction="vertical" size={0} className="page-stack">
              {filtered.map((tag, index) => (
                <div key={tag.id ?? tag.name}>
                  <TagRow
                    tag={tag}
                    repositoryId={tag.repositoryId ?? repositoryId}
                  />
                  {index < filtered.length - 1 && <Divider style={{ margin: 0 }} />}
                </div>
              ))}
            </Space>
          )}
        </div>
      </Card>
    </Space>
  )
}
