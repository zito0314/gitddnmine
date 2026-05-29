import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
  PipelinesOutlined,
  StopOutlined,
  ToolOutlined,
} from '../components/icons'
import {
  Avatar,
  Button,
  Card,
  Empty,
  Flex,
  Input,
  Result,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getCommitAuthors,
  getRepositoryBranches,
  getRepositoryCommits,
  getRepositoryDetail,
} from '../api/repositories'
import { PageHeader } from '../components/common'

const { Text } = Typography

const PERIOD_OPTIONS = [
  { value: 'all', label: '전체 기간' },
  { value: 'today', label: '오늘' },
  { value: '7d', label: '최근 7일' },
  { value: '30d', label: '최근 30일' },
]

const PIPELINE_META = {
  passed: { label: 'Passed', color: 'success', icon: <CheckCircleOutlined /> },
  failed: { label: 'Failed', color: 'error', icon: <ExclamationCircleOutlined /> },
  running: { label: 'Running', color: 'processing', icon: <ClockCircleOutlined /> },
  manual: { label: 'Manual', color: 'warning', icon: <ToolOutlined /> },
  canceled: { label: 'Canceled', color: 'default', icon: <StopOutlined /> },
  none: { label: 'Pipeline 없음', color: 'default', icon: <PipelinesOutlined /> },
}

function normalizePipelineStatus(status) {
  if (status === 'finished') return 'passed'
  return status ?? 'none'
}

function getPipelineMeta(status) {
  return PIPELINE_META[normalizePipelineStatus(status)] ?? PIPELINE_META.none
}

function groupByDate(commits) {
  const groups = new Map()
  commits.forEach((commit) => {
    const items = groups.get(commit.date) ?? []
    items.push(commit)
    groups.set(commit.date, items)
  })

  return [...groups.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, items]) => ({
      date,
      commits: items.sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0)),
    }))
}

function matchesPeriod(commit, period) {
  if (period === 'all') return true
  if (period === 'today') return commit.date === '2026.05.28'
  if (period === '7d') return ['2026.05.28', '2026.05.27', '2026.05.26', '2026.05.25', '2026.05.24', '2026.05.23', '2026.05.22'].includes(commit.date)
  return true
}

export default function RepositoryCommits() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const repository = getRepositoryDetail(repositoryId)
  const commits = useMemo(() => getRepositoryCommits(repositoryId), [repositoryId])
  const branches = useMemo(() => getRepositoryBranches(repositoryId), [repositoryId])
  const authors = useMemo(() => getCommitAuthors(repositoryId), [repositoryId])
  const defaultBranch = branches.some((branch) => branch.name === 'main') ? 'main' : branches[0]?.name
  const [branch, setBranch] = useState(defaultBranch)
  const [search, setSearch] = useState('')
  const [author, setAuthor] = useState('all')
  const [period, setPeriod] = useState('all')

  if (!repository) {
    return (
      <Result
        status="404"
        title="Repository를 찾을 수 없어요."
        subTitle="삭제되었거나 접근 권한이 없는 Repository일 수 있어요."
        extra={<Button type="primary" onClick={() => navigate('/repositories')}>저장소 목록으로 이동</Button>}
      />
    )
  }

  const filtered = commits.filter((commit) => {
    const q = search.trim().toLowerCase()
    const searchable = [commit.message, commit.title, commit.sha, commit.author, commit.tag].join(' ').toLowerCase()
    if (branch && commit.branch !== branch) return false
    if (q && !searchable.includes(q)) return false
    if (author !== 'all' && commit.author !== author) return false
    if (!matchesPeriod(commit, period)) return false
    return true
  })
  const dateGroups = groupByDate(filtered)

  const copySha = async (event, sha) => {
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(sha)
    } catch {
      // Clipboard can be unavailable in local previews.
    }
    message.success('Commit SHA를 복사했어요.')
  }

  const openFiles = (event, commit) => {
    event.stopPropagation()
    message.info('Commit 변경 파일을 확인합니다.')
    navigate(`/repositories/${repositoryId}/commits/${commit.sha}`)
  }

  const openPipeline = (event, commit) => {
    event.stopPropagation()
    if (!commit.pipelineId) {
      message.info('연결된 Pipeline이 없어요.')
      return
    }
    navigate(`/repositories/${repositoryId}/pipelines/${commit.pipelineId}`)
  }

  const openTag = (event, tag) => {
    event.stopPropagation()
    if (!tag) return
    message.info('Tag 정보를 확인합니다.')
  }

  return (
    <Space direction="vertical" size={16} className="commit-list-page page-stack">
      <PageHeader
        title="Commits"
        description="현재 Repository의 커밋 이력과 변경 내역을 확인합니다."
      />

      <Card className="commit-filter-bar">
        <Flex gap={10} wrap="wrap" align="center">
          <Select
            value={branch}
            onChange={setBranch}
            className="filter-select filter-select--xl"
            options={branches.map((item) => ({ value: item.name, label: item.name }))}
          />
          <Button onClick={() => navigate(`/repositories/${repositoryId}/files`)}>파일 보기</Button>
          <Input.Search
            allowClear
            placeholder="Commit 메시지, SHA를 검색해 주세요."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="filter-search-fluid"
          />
          <Select
            value={author}
            onChange={setAuthor}
            className="filter-select filter-select--md"
            options={[{ value: 'all', label: '전체 작성자' }, ...authors.map((item) => ({ value: item, label: item }))]}
          />
          <Select
            value={period}
            onChange={setPeriod}
            className="filter-select filter-select--period"
            options={PERIOD_OPTIONS}
          />
        </Flex>
      </Card>

      {commits.length === 0 ? (
        <Card>
          <Empty description="표시할 Commit이 없어요." />
        </Card>
      ) : dateGroups.length === 0 ? (
        <Card>
          <Empty
            description={(
              <Space direction="vertical" size={2}>
                <Text>조건에 맞는 Commit이 없어요.</Text>
                <Text type="secondary">검색어 또는 필터를 변경해 주세요.</Text>
              </Space>
            )}
          />
        </Card>
      ) : (
        dateGroups.map((group) => (
          <section key={group.date} className="commit-date-group">
            <Text strong>{group.date}</Text>
            <Space direction="vertical" size={10} style={{ width: '100%', marginTop: 10 }}>
              {group.commits.map((commit) => (
                <CommitRow
                  key={commit.sha}
                  commit={commit}
                  onClick={() => navigate(`/repositories/${repositoryId}/commits/${commit.sha}`)}
                  onCopySha={copySha}
                  onOpenFiles={openFiles}
                  onOpenPipeline={openPipeline}
                  onOpenTag={openTag}
                />
              ))}
            </Space>
          </section>
        ))
      )}
    </Space>
  )
}

function CommitRow({ commit, onClick, onCopySha, onOpenFiles, onOpenPipeline, onOpenTag }) {
  const pipeline = getPipelineMeta(commit.pipelineStatus)

  return (
    <Card hoverable className="commit-row-card" onClick={onClick}>
      <Flex align="center" justify="space-between" gap={16} wrap="wrap">
        <Space align="start" size={12}>
          <Avatar src={commit.avatarUrl}>{(commit.author ?? 'G').slice(0, 1)}</Avatar>
          <Space direction="vertical" size={3}>
            <Text strong>{commit.message ?? commit.title}</Text>
            <Space wrap className="commit-meta">
              <Text type="secondary">{commit.author}</Text>
              <Text type="secondary">·</Text>
              <Text type="secondary">{commit.createdAtText}</Text>
            </Space>
          </Space>
        </Space>
        <Space wrap className="commit-actions">
          <Tooltip title={`Pipeline ${pipeline.label}`}>
            <Button size="small" icon={pipeline.icon} onClick={(event) => onOpenPipeline(event, commit)}>
              {pipeline.label}
            </Button>
          </Tooltip>
          {commit.tag ? (
            <Tag color="blue" onClick={(event) => onOpenTag(event, commit.tag)}>{commit.tag}</Tag>
          ) : null}
          <Button type="text" size="small" onClick={(event) => onCopySha(event, commit.sha)}>
            <Text code>{commit.sha}</Text>
          </Button>
          <Tooltip title="SHA 복사">
            <Button size="small" icon={<CopyOutlined />} onClick={(event) => onCopySha(event, commit.sha)} />
          </Tooltip>
          <Tooltip title="Commit 변경 파일">
            <Button size="small" icon={<FileSearchOutlined />} onClick={(event) => onOpenFiles(event, commit)}>
              Files {commit.changedFilesCount}
            </Button>
          </Tooltip>
        </Space>
      </Flex>
    </Card>
  )
}
