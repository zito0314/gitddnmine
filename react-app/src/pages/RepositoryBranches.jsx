import { BranchesOutlined, CopyOutlined, DownloadOutlined, EllipsisOutlined, LockOutlined } from '../components/icons'
import { App as AntdApp, Button, Card, Divider, Dropdown, Empty, Flex, Input, Result, Select, Space, Tag, Tooltip, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRepositoryBranchSummary, getRepositoryBranches, getRepositoryDetail } from '../api/repositories'
import { PageHeader, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

const { Text } = Typography

const SORT_OPTIONS = [
  { value: 'oldestUpdated', label: '오래된 업데이트순' },
  { value: 'latestUpdated', label: '최신 업데이트순' },
  { value: 'name', label: 'Branch명' },
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

function sortBranches(branches, sortKey) {
  return [...branches].sort((a, b) => {
    if (sortKey === 'name') return a.name.localeCompare(b.name)
    const dateA = a.updatedAt ?? ''
    const dateB = b.updatedAt ?? ''
    if (sortKey === 'latestUpdated') return dateB.localeCompare(dateA)
    return dateA.localeCompare(dateB) // oldestUpdated (default)
  })
}

function BranchRow({ branch, repositoryId, onNavigate }) {
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
    onNavigate(branch)
  }

  const handleCopyBranchName = (e) => {
    e.stopPropagation()
    copyToClipboard(branch.name, 'Branch명을 복사했어요.', 'Branch명을 복사하지 못했어요.')
  }

  const handleCommitShaClick = (e) => {
    e.stopPropagation()
    const commitPath = `/repositories/${repositoryId}/commits/${branch.latestCommit?.sha}`
    navigate(commitPath)
  }

  const handleCopySha = (e) => {
    e.stopPropagation()
    copyToClipboard(branch.latestCommit?.sha ?? '', 'Commit SHA를 복사했어요.', 'Commit SHA를 복사하지 못했어요.')
  }

  const handleDownload = ({ key }) => {
    message.success(`${branch.name} Source code 다운로드를 시작합니다. (${key})`)
  }

  const handleCompare = () => {
    const comparePath = `/repositories/${repositoryId}/compare?branch=${encodeURIComponent(branch.name)}`
    message.info('Compare 화면으로 이동합니다.')
    navigate(comparePath)
  }

  const moreMenuItems = [
    { key: 'compare', label: 'Compare', onClick: (e) => { e.domEvent.stopPropagation(); handleCompare() } },
  ]

  const sha = branch.latestCommit?.sha ?? branch.lastCommit ?? '-'
  const commitMessage = branch.latestCommit?.message ?? '-'
  const timeText = branch.latestCommit?.timeText ?? branch.updatedAt ?? '-'
  const aheadCount = branch.aheadCount ?? 0
  const behindCount = branch.behindCount ?? 0

  return (
    <div
      className="branch-row"
      onClick={handleRowClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleRowClick()}
    >
      <Flex align="center" justify="space-between" gap={16} wrap="wrap">
        {/* 좌측: Branch 주요 정보 */}
        <div className="branch-main-info" style={{ flex: '1 1 280px', minWidth: 0 }}>
          <Flex align="center" gap={8} wrap="wrap">
            <Text strong className="branch-name-text" style={{ fontSize: 14 }}>
              {branch.name}
            </Text>
            {branch.isDefault && (
              <Tag color="blue" style={{ margin: 0 }}>Default</Tag>
            )}
            {branch.isProtected && (
              <Tag icon={<LockOutlined style={{ fontSize: 10 }} />} style={{ margin: 0 }}>Protected</Tag>
            )}
            <Tooltip title="Branch명 복사">
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={handleCopyBranchName}
                style={{ padding: '0 4px' }}
              />
            </Tooltip>
          </Flex>
          <div className="branch-commit-meta" style={{ marginTop: 4 }}>
            <Flex align="center" gap={6} wrap="wrap">
              <Tooltip title="Commit 상세 보기">
                <Text
                  code
                  style={{ cursor: 'pointer', fontSize: 12 }}
                  onClick={handleCommitShaClick}
                >
                  {sha.slice(0, 8)}
                </Text>
              </Tooltip>
              <Tooltip title="SHA 복사">
                <Button
                  type="text"
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={handleCopySha}
                  style={{ padding: '0 2px' }}
                />
              </Tooltip>
              {commitMessage !== '-' && (
                <>
                  <Text type="secondary" style={{ fontSize: 12 }}>·</Text>
                  <Text type="secondary" style={{ fontSize: 12 }} ellipsis={{ tooltip: commitMessage }}>
                    {commitMessage}
                  </Text>
                </>
              )}
              <Text type="secondary" style={{ fontSize: 12 }}>·</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>{timeText}</Text>
            </Flex>
          </div>
        </div>

        {/* 중앙: ahead/behind */}
        <div className="branch-divergence" style={{ flex: '0 0 auto', textAlign: 'center' }}>
          <Flex align="center" gap={4}>
            <Tooltip title="기준 Branch보다 앞선 Commit 수">
              <Text style={{ fontSize: 12, color: 'var(--ant-color-text-secondary)' }}>
                ↑{formatAheadCount(aheadCount)}
              </Text>
            </Tooltip>
            <Divider type="vertical" style={{ margin: '0 2px' }} />
            <Tooltip title="기준 Branch보다 뒤처진 Commit 수">
              <Text style={{ fontSize: 12, color: 'var(--ant-color-text-secondary)' }}>
                ↓{behindCount}
              </Text>
            </Tooltip>
          </Flex>
        </div>

        {/* 우측: 액션 버튼 */}
        <div className="branch-actions" onClick={(e) => e.stopPropagation()}>
          <Space size={4}>
            <Dropdown
              menu={{
                title: 'Source code 다운로드',
                items: DOWNLOAD_ITEMS,
                onClick: handleDownload,
              }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button
                size="small"
                icon={<DownloadOutlined />}
                onClick={(e) => e.stopPropagation()}
              >
                Source code
              </Button>
            </Dropdown>
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
          </Space>
        </div>
      </Flex>
    </div>
  )
}

export default function RepositoryBranches() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const repository = getRepositoryDetail(repositoryId)
  const allBranches = useMemo(() => getRepositoryBranches(repositoryId), [repositoryId])
  const summary = useMemo(() => getRepositoryBranchSummary(repositoryId), [repositoryId])
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('oldestUpdated')

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

  const q = search.trim().toLowerCase()
  const filtered = sortBranches(
    q
      ? allBranches.filter((branch) =>
          [branch.name, branch.latestCommit?.sha ?? branch.lastCommit, branch.latestCommit?.message ?? '']
            .join(' ')
            .toLowerCase()
            .includes(q),
        )
      : allBranches,
    sortKey,
  )

  const handleBranchRowNavigate = () => {
    const filesPath = `/repositories/${repositoryId}/files`
    navigate(filesPath)
  }

  return (
    <Space direction="vertical" size={16} className="branch-list-page page-stack">
      <PageHeader
        title={UI_TEXT.pages.repositoryBranches.title}
        description={UI_TEXT.pages.repositoryBranches.description}
      />

      {/* 요약 카드 */}
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

      {/* 검색 / 정렬 */}
      <Card>
        <Flex className="branch-filter-bar filter-bar-spaced" gap={12} wrap="wrap">
          <Input.Search
            placeholder="Branch명을 검색해 주세요."
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

        {/* Branch 목록 */}
        {allBranches.length === 0 ? (
          <Empty description="표시할 Branch가 없어요." />
        ) : filtered.length === 0 ? (
          <Empty
            description={
              <Space direction="vertical" size={4}>
                <Text>조건에 맞는 Branch가 없어요.</Text>
                <Text type="secondary">검색어를 변경해 주세요.</Text>
              </Space>
            }
          />
        ) : (
          <Space direction="vertical" size={0} style={{ width: '100%' }}>
            {filtered.map((branch, index) => (
              <div key={branch.name}>
                <BranchRow
                  branch={branch}
                  repositoryId={repositoryId}
                  onNavigate={() => handleBranchRowNavigate()}
                />
                {index < filtered.length - 1 && <Divider style={{ margin: '0' }} />}
              </div>
            ))}
          </Space>
        )}
      </Card>
    </Space>
  )
}
