import {
  BranchesOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  LockOutlined,
  PlusOutlined,
  PullRequestOutlined,
  SettingOutlined,
} from '../components/icons'
import { App as AntdApp, Button, Card, Divider, Dropdown, Empty, Flex, Input, Result, Segmented, Space, Tag, Tooltip, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRepositoryBranchSummary, getRepositoryBranches, getRepositoryDetail } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { PageHeader, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

const { Title, Text } = Typography

const FILTER_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'protected', label: '보호 Branch' },
  { value: 'active', label: '활성 Branch' },
  { value: 'stale', label: '오래된 Branch' },
]

const DOWNLOAD_ITEMS = [
  { key: 'zip', label: 'zip' },
  { key: 'tar.gz', label: 'tar.gz' },
  { key: 'tar.bz2', label: 'tar.bz2' },
  { key: 'tar', label: 'tar' },
]

function formatAheadCount(count) {
  return count >= 999 ? '999+' : String(count)
}

function matchesFilter(branch, filterKey) {
  if (filterKey === 'protected') return branch.isProtected
  if (filterKey === 'active') return branch.mergeStatus === 'open'
  if (filterKey === 'stale') return branch.isStale || branch.mergeStatus === 'closed'
  return true
}

function matchesSearch(branch, query) {
  if (!query) return true
  const haystack = [
    branch.name,
    branch.latestCommit?.sha ?? branch.lastCommit,
    branch.latestCommit?.message ?? '',
    branch.latestCommit?.author ?? branch.lastAuthor ?? '',
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(query)
}

function BranchRow({ branch, repositoryId, canManage }) {
  const navigate = useNavigate()
  const { message } = AntdApp.useApp()

  const sha = branch.latestCommit?.sha ?? branch.lastCommit ?? '-'
  const commitMessage = branch.latestCommit?.message ?? '-'
  const author = branch.latestCommit?.author ?? branch.lastAuthor ?? '-'
  const timeText = branch.latestCommit?.timeText ?? branch.updatedAt ?? '-'
  const aheadCount = branch.aheadCount ?? 0
  const behindCount = branch.behindCount ?? 0
  const isOpen = branch.mergeStatus === 'open'

  const copyBranchName = () => {
    navigator.clipboard
      ?.writeText(branch.name)
      .then(() => message.success('Branch 이름이 복사되었어요.'))
      .catch(() => message.error('Branch 이름을 복사하지 못했어요.'))
  }

  const handleCommitShaClick = () => {
    navigate(`/repositories/${repositoryId}/commits/${sha}`)
  }

  const handleCompare = () => {
    navigate(`/repositories/${repositoryId}/compare?branch=${encodeURIComponent(branch.name)}`)
  }

  const handleCreateMergeRequest = () => {
    navigate(`/repositories/${repositoryId}/merge-requests/new?sourceBranch=${encodeURIComponent(branch.name)}`)
  }

  const handleDownload = ({ key }) => {
    message.info(`${branch.name} Source code 다운로드를 시작합니다. (${key})`)
  }

  const moreMenuItems = [
    { key: 'compare', icon: <BranchesOutlined />, label: 'Branch 비교', onClick: handleCompare },
    { key: 'copy', icon: <CopyOutlined />, label: 'Branch 이름 복사', onClick: copyBranchName },
    ...(canManage
      ? [
          { key: 'protection', icon: <SettingOutlined />, label: '보호 설정 보기', onClick: () => message.info('보호 설정 화면으로 이동합니다.') },
        ]
      : []),
    {
      key: 'download',
      icon: <DownloadOutlined />,
      label: 'Source code 다운로드',
      children: DOWNLOAD_ITEMS.map((item) => ({ ...item, onClick: () => handleDownload({ key: item.key }) })),
    },
    ...(canManage && !branch.isDefault
      ? [
          { type: 'divider' },
          { key: 'delete', icon: <DeleteOutlined />, label: 'Branch 삭제', danger: true, onClick: () => message.info(`${branch.name} 삭제는 데모에서 비활성화되어 있어요.`) },
        ]
      : []),
  ]

  return (
    <div className="branch-row">
      <Flex align="center" justify="space-between" gap={16} wrap="wrap">
        <div className="branch-main-info">
          <Flex align="center" gap={8} wrap="wrap">
            <Text strong className="branch-name-text">{branch.name}</Text>
            <Tooltip title="Branch 이름 복사">
              <Button type="text" size="small" className="branch-copy-button" icon={<CopyOutlined />} onClick={copyBranchName} />
            </Tooltip>
            {branch.isDefault && <Tag>Default</Tag>}
            {branch.isProtected && <Tag icon={<LockOutlined />}>Protected</Tag>}
            {!branch.isDefault && (
              <Tag color={isOpen ? 'green' : 'red'}>{isOpen ? 'Open' : 'Closed'}</Tag>
            )}
          </Flex>
          <Flex className="branch-commit-meta" align="center" gap={6} wrap="wrap">
            <Tooltip title="Commit 상세 보기">
              <Text className="branch-commit-sha" onClick={handleCommitShaClick}>{sha.slice(0, 8)}</Text>
            </Tooltip>
            {commitMessage !== '-' && (
              <Text type="secondary" className="branch-commit-text" ellipsis={{ tooltip: commitMessage }}>
                {commitMessage}
              </Text>
            )}
            <Divider orientation="vertical" />
            <Text type="secondary" className="branch-commit-sub">{author}</Text>
            <Text type="secondary" className="branch-commit-sub">·</Text>
            <Text type="secondary" className="branch-commit-sub">{timeText}</Text>
          </Flex>
        </div>

        <div className="branch-divergence">
          <Flex align="center" gap={4}>
            <Tooltip title="기준 Branch보다 앞선 Commit 수">
              <Text type="secondary" className="branch-commit-sub">↑{formatAheadCount(aheadCount)}</Text>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip title="기준 Branch보다 뒤처진 Commit 수">
              <Text type="secondary" className="branch-commit-sub">↓{behindCount}</Text>
            </Tooltip>
          </Flex>
        </div>

        <div className="branch-row-actions">
          <Space size={4}>
            {canManage && isOpen && !branch.isDefault && (
              <Button size="small" type="primary" icon={<PullRequestOutlined />} onClick={handleCreateMergeRequest}>
                MR 생성
              </Button>
            )}
            <Dropdown menu={{ items: moreMenuItems }} trigger={['click']} placement="bottomRight">
              <Button size="small" icon={<EllipsisOutlined />} aria-label="Branch 작업 더보기" />
            </Dropdown>
          </Space>
        </div>
      </Flex>
    </div>
  )
}

function BranchSection({ title, hint, branches, repositoryId, canManage }) {
  if (branches.length === 0) return null
  return (
    <div className="branch-section">
      <Flex align="baseline" gap={8} className="branch-section-head">
        <Title level={5} className="branch-section-title">{title}</Title>
        <Text type="secondary" className="branch-commit-sub">{hint ?? `${branches.length}개`}</Text>
      </Flex>
      <Space orientation="vertical" size={0} className="branch-section-list">
        {branches.map((branch, index) => (
          <div key={branch.name}>
            <BranchRow branch={branch} repositoryId={repositoryId} canManage={canManage} />
            {index < branches.length - 1 && <Divider className="branch-row-divider" />}
          </div>
        ))}
      </Space>
    </div>
  )
}

export default function RepositoryBranches() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const { message } = AntdApp.useApp()
  const auth = useAuth()
  const canManage = !auth.isExternalDeveloper

  const repository = getRepositoryDetail(repositoryId)
  const allBranches = useMemo(() => getRepositoryBranches(repositoryId), [repositoryId])
  const summary = useMemo(() => getRepositoryBranchSummary(repositoryId), [repositoryId])
  const [search, setSearch] = useState('')
  const [filterKey, setFilterKey] = useState('all')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return allBranches.filter((branch) => matchesFilter(branch, filterKey) && matchesSearch(branch, query))
  }, [allBranches, filterKey, search])

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

  const defaultBranches = filtered.filter((branch) => branch.isDefault)
  const myBranches = filtered.filter((branch) => branch.isMine && !branch.isDefault)
  const otherBranches = filtered.filter((branch) => !branch.isDefault && !branch.isMine)
  const hasResults = filtered.length > 0

  const moreActionItems = [
    { key: 'policy', label: 'Branch 정책 보기', onClick: () => message.info('Branch 정책 화면으로 이동합니다.') },
    { key: 'protection', label: '보호 Branch 설정', onClick: () => message.info('보호 Branch 설정 화면으로 이동합니다.') },
    { key: 'cleanup', label: 'Branch 정리 기준 보기', onClick: () => message.info('Branch 정리 기준 화면으로 이동합니다.') },
  ]

  const headerActions = canManage
    ? [
        <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => message.info('Branch 생성 화면으로 이동합니다.')}>
          Branch 생성
        </Button>,
        <Dropdown key="more" menu={{ items: moreActionItems }} trigger={['click']} placement="bottomRight">
          <Button icon={<EllipsisOutlined />} aria-label="Branch 관리 더보기" />
        </Dropdown>,
      ]
    : null

  return (
    <Space orientation="vertical" size={16} className="branch-list-page page-stack">
      <PageHeader
        title={UI_TEXT.pages.repositoryBranches.title}
        description={UI_TEXT.pages.repositoryBranches.description}
        actions={headerActions}
      />

      <Flex gap={12} wrap="wrap">
        <div className="summary-card-tile">
          <SummaryCard title="Total Branches" value={summary.total} icon={<BranchesOutlined />} />
        </div>
        <div className="summary-card-tile">
          <SummaryCard title="Protected" value={summary.protected} icon={<LockOutlined />} />
        </div>
        <div className="summary-card-tile">
          <SummaryCard title="Active" value={summary.active} tone="success" />
        </div>
        <div className="summary-card-tile">
          <SummaryCard title="Stale" value={summary.stale} tone="warning" />
        </div>
      </Flex>

      <Card>
        <Flex className="branch-filter-bar filter-bar-spaced" gap={12} wrap="wrap" align="center" justify="space-between">
          <Segmented options={FILTER_OPTIONS} value={filterKey} onChange={setFilterKey} />
          <Input.Search
            placeholder="Branch, Commit, 작성자를 검색해 주세요."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={setSearch}
            allowClear
            className="filter-search-limited"
          />
        </Flex>

        {allBranches.length === 0 ? (
          <Empty description="표시할 Branch가 없어요." />
        ) : !hasResults ? (
          <Empty
            description={
              <Space orientation="vertical" size={4}>
                <Text>조건에 맞는 Branch가 없어요.</Text>
                <Text type="secondary">검색어나 필터를 변경해 주세요.</Text>
              </Space>
            }
          />
        ) : (
          <Space orientation="vertical" size={20} className="branch-section-stack">
            <BranchSection
              title="기본 Branch"
              hint="Repository의 기준이 되는 Branch"
              branches={defaultBranches}
              repositoryId={repositoryId}
              canManage={canManage}
            />
            <BranchSection
              title="내가 생성한 Branch"
              branches={myBranches}
              repositoryId={repositoryId}
              canManage={canManage}
            />
            <BranchSection
              title="전체 Branch"
              branches={otherBranches}
              repositoryId={repositoryId}
              canManage={canManage}
            />
          </Space>
        )}
      </Card>
    </Space>
  )
}
