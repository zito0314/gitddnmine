import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  StopOutlined,
} from '../components/icons'
import { Avatar, Button, Card, Empty, Flex, Input, Pagination, Select, Space, Tabs, Tag, Tooltip, Typography, message } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPipelineStages, getPipelines, getPipelinesByRepositoryId } from '../api/pipelines'
import { getRepositories, getRepositoryDetail } from '../api/repositories'
import { FilterBar, PageHeader } from '../components/common'

const { Search } = Input
const { Text } = Typography

const PAGE_SIZE = 8

const STATUS_TABS = [
  { key: 'all', label: '전체' },
  { key: 'running', label: 'Running' },
  { key: 'failed', label: 'Failed' },
  { key: 'finished', label: 'Finished' },
]

const PIPELINE_STATUS_META = {
  running: { label: 'Running', color: 'processing', icon: <ClockCircleOutlined /> },
  passed: { label: 'Passed', color: 'success', icon: <CheckCircleOutlined /> },
  finished: { label: 'Passed', color: 'success', icon: <CheckCircleOutlined /> },
  manual: { label: 'Manual', color: 'default', icon: <SettingOutlined /> },
  failed: { label: 'Failed', color: 'error', icon: <StopOutlined /> },
  canceled: { label: 'Canceled', color: 'default', icon: <StopOutlined /> },
  pending: { label: 'Pending', color: 'warning', icon: <ClockCircleOutlined /> },
  skipped: { label: 'Skipped', color: 'default', icon: <StopOutlined /> },
  created: { label: 'Pending', color: 'warning', icon: <ClockCircleOutlined /> },
}

const STAGE_STATUS_META = {
  passed: { label: 'Passed', tone: 'success', icon: <CheckCircleOutlined /> },
  success: { label: 'Passed', tone: 'success', icon: <CheckCircleOutlined /> },
  failed: { label: 'Failed', tone: 'error', icon: <StopOutlined /> },
  blocked: { label: 'Failed', tone: 'error', icon: <StopOutlined /> },
  running: { label: 'Running', tone: 'processing', icon: <ClockCircleOutlined /> },
  manual: { label: 'Manual', tone: 'default', icon: <SettingOutlined /> },
  pending: { label: 'Pending', tone: 'warning', icon: <ClockCircleOutlined /> },
  created: { label: 'Pending', tone: 'warning', icon: <ClockCircleOutlined /> },
  canceled: { label: 'Canceled', tone: 'default', icon: <StopOutlined /> },
  skipped: { label: 'Skipped', tone: 'default', icon: <StopOutlined /> },
  none: { label: 'Skipped', tone: 'default', icon: <StopOutlined /> },
}

function normalizeStatus(status) {
  if (status === 'finished') return 'passed'
  return status ?? 'pending'
}

function getDisplayStatus(pipeline) {
  if (pipeline.result === 'canceled') return 'canceled'
  if (pipeline.status === 'finished' && pipeline.trigger === 'Manual') return 'manual'
  return normalizeStatus(pipeline.status)
}

function isFinishedStatus(status) {
  return ['passed', 'finished', 'canceled', 'manual'].includes(status)
}

function getStatusMeta(status) {
  return PIPELINE_STATUS_META[status] ?? PIPELINE_STATUS_META[normalizeStatus(status)] ?? PIPELINE_STATUS_META.pending
}

function getStageStatusMeta(status) {
  return STAGE_STATUS_META[status] ?? STAGE_STATUS_META.none
}

function getDuration(pipeline) {
  return pipeline.summary?.find((item) => item.label === '실제 실행 시간')?.value ?? pipeline.durationText ?? '-'
}

function getPipelineTitle(pipeline) {
  return pipeline.title ?? pipeline.description ?? `Pipeline #${pipeline.id}`
}

function getShortSha(commit) {
  return String(commit ?? '-').slice(0, 8)
}

function getAuthor(pipeline) {
  if (typeof pipeline.author === 'object') return pipeline.author
  return { name: pipeline.author ?? 'Unknown', avatar: String(pipeline.author ?? 'U').slice(0, 1) }
}

export default function PipelineList() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const currentRepository = repositoryId ? getRepositoryDetail(repositoryId) : null
  const repositories = useMemo(
    () => (repositoryId && currentRepository ? [currentRepository] : getRepositories()),
    [currentRepository, repositoryId],
  )
  const repositoryMap = useMemo(
    () => new Map(repositories.map((repository) => [repository.id, repository])),
    [repositories],
  )
  const allPipelines = repositoryId ? getPipelinesByRepositoryId(repositoryId) : getPipelines()
  const [activeStatus, setActiveStatus] = useState('all')
  const [selectedRepositoryId, setSelectedRepositoryId] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const enrichedPipelines = useMemo(
    () =>
      allPipelines.map((pipeline) => ({
        ...pipeline,
        repositoryName: repositoryMap.get(pipeline.repo)?.name ?? pipeline.repo,
        projectName: repositoryMap.get(pipeline.repo)?.group ?? pipeline.repoGroup,
        durationText: getDuration(pipeline),
        updatedAtText: pipeline.updatedAtText ?? pipeline.updatedAt,
        displayStatus: getDisplayStatus(pipeline),
        normalizedStatus: normalizeStatus(pipeline.status),
        stages: getPipelineStages(pipeline.id),
      })),
    [allPipelines, repositoryMap],
  )

  const filteredPipelines = enrichedPipelines.filter((pipeline) => {
    const query = search.trim().toLowerCase()
    const searchable = [
      pipeline.id,
      getPipelineTitle(pipeline),
      pipeline.branch,
      pipeline.commit,
      getAuthor(pipeline).name,
      pipeline.repositoryName,
      pipeline.projectName,
      pipeline.repoGroup,
    ].join(' ').toLowerCase()

    if (selectedRepositoryId && pipeline.repo !== selectedRepositoryId) return false
    if (query && !searchable.includes(query)) return false
    if (activeStatus === 'running' && pipeline.normalizedStatus !== 'running') return false
    if (activeStatus === 'failed' && pipeline.normalizedStatus !== 'failed') return false
    if (activeStatus === 'finished' && !isFinishedStatus(pipeline.status) && !isFinishedStatus(pipeline.displayStatus)) return false
    return true
  })

  const pagedPipelines = filteredPipelines.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const resetPage = (callback) => {
    callback()
    setPage(1)
  }

  const copyCommitSha = async (commitSha) => {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(commitSha)
    message.success('Commit SHA를 복사했어요.')
  }

  return (
    <Space orientation="vertical" size={16} className="page-stack pipeline-history-page">
      <PageHeader
        title="Pipeline"
        description="현재 Repository의 Pipeline 실행 상태, 실패 Job, 실행 이력을 확인하는 화면입니다."
        actions={(
          <Button icon={<PlusOutlined />} onClick={() => message.info('새 파이프라인 실행은 데모 기능입니다.')}>
            새 파이프라인 실행
          </Button>
        )}
      />

      <Tabs
        activeKey={activeStatus}
        items={STATUS_TABS}
        onChange={(key) => resetPage(() => setActiveStatus(key))}
        className="pipeline-history-tabs"
      />

      <FilterBar className="pipeline-history-filter">
        {!repositoryId ? (
          <Select
            allowClear
            placeholder="전체 저장소"
            value={selectedRepositoryId}
            onChange={(value) => resetPage(() => setSelectedRepositoryId(value))}
            options={repositories.map((repository) => ({ value: repository.id, label: repository.name }))}
            className="filter-select filter-select--xl"
          />
        ) : null}
        <Search
          allowClear
          placeholder="저장소명, 프로젝트명, 담당 조직을 선택해 주세요."
          value={search}
          onChange={(event) => resetPage(() => setSearch(event.target.value))}
          className="filter-search-fill"
        />
      </FilterBar>

      <Card className="pipeline-history-list-card">
        <PipelineHeader />
        <div className="pipeline-history-list">
          {pagedPipelines.length > 0 ? (
            pagedPipelines.map((pipeline) => (
              <PipelineRow
                key={pipeline.id}
                pipeline={pipeline}
                onOpen={() => navigate(`/repositories/${pipeline.repo}/pipelines/${pipeline.id}`)}
                onCopyCommit={copyCommitSha}
              />
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space orientation="vertical" size={2}>
                  <Text>조건에 맞는 Pipeline이 없어요.</Text>
                  <Text type="secondary">필터를 변경하거나 검색어를 다시 입력해 주세요.</Text>
                </Space>
              }
            />
          )}
        </div>
      </Card>

      <Flex justify="center">
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          total={filteredPipelines.length}
          showSizeChanger={false}
          onChange={setPage}
        />
      </Flex>
    </Space>
  )
}

function PipelineHeader() {
  return (
    <div className="pipeline-history-header">
      <Text strong>마지막 업데이트</Text>
      <Text strong>제목</Text>
      <Text strong>Branch</Text>
      <Text strong>Commit</Text>
      <Text strong>작성자</Text>
      <Text strong>Stages</Text>
      <Text strong>작업</Text>
    </div>
  )
}

function PipelineRow({ pipeline, onOpen, onCopyCommit }) {
  const status = pipeline.displayStatus
  const meta = getStatusMeta(status)
  const author = getAuthor(pipeline)

  return (
    <div className="pipeline-history-row" role="button" tabIndex={0} onClick={onOpen} onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onOpen()
      }
    }}>
      <Space orientation="vertical" size={4} className="pipeline-history-status-cell">
        <Tag color={meta.color} icon={meta.icon} className="pipeline-history-status-tag">{meta.label}</Tag>
        <Text>{pipeline.durationText}</Text>
        <Text type="secondary">{pipeline.updatedAtText}</Text>
      </Space>

      <Space orientation="vertical" size={4} className="pipeline-history-title-cell">
        <Link to={`/repositories/${pipeline.repo}/pipelines/${pipeline.id}`} onClick={(event) => event.stopPropagation()}>
          #{pipeline.id}
        </Link>
        <Text strong>{getPipelineTitle(pipeline)}</Text>
        <Text type="secondary">{pipeline.repositoryName}</Text>
      </Space>

      <div>
        <Tag className="pipeline-history-branch-tag">{pipeline.branch}</Tag>
      </div>

      <div>
        <Tooltip title="Commit SHA 복사">
          <Button
            size="small"
            icon={<CopyOutlined />}
            onClick={(event) => {
              event.stopPropagation()
              onCopyCommit(pipeline.commit)
            }}
          >
            {getShortSha(pipeline.commit)}
          </Button>
        </Tooltip>
      </div>

      <Space size={8} className="pipeline-history-author">
        <Avatar size={28}>{author.avatar ?? author.name?.slice(0, 1)}</Avatar>
        <Text>{author.name}</Text>
      </Space>

      <StageFlow stages={pipeline.stages} />

      <PipelineAction status={status} />
    </div>
  )
}

function StageFlow({ stages = [] }) {
  const jobs = stages.flatMap((stage) =>
    (stage.jobs ?? [{ name: stage.name, status: stage.status }]).map((job) => ({
      ...job,
      stageName: stage.name,
    })),
  )

  return (
    <Flex align="center" gap={6} wrap className="pipeline-stage-flow">
      {jobs.map((job, index) => {
        const meta = getStageStatusMeta(job.status)
        return (
          <Tooltip key={`${job.stageName}-${job.name}-${index}`} title={`${job.name}: ${meta.label}`}>
            <span className={`pipeline-stage-dot pipeline-stage-dot-${meta.tone}`}>
              {meta.icon}
            </span>
          </Tooltip>
        )
      })}
    </Flex>
  )
}

function PipelineAction({ status }) {
  if (status === 'passed' || status === 'finished') return <span />

  const isRunning = status === 'running'
  const label = isRunning ? '실행 취소' : '실행'
  const icon = isRunning ? <StopOutlined /> : <ReloadOutlined />

  return (
    <Button
      size="small"
      danger={isRunning}
      icon={icon}
      onClick={(event) => {
        event.stopPropagation()
        message.info(isRunning ? 'Pipeline 실행 취소는 데모 기능입니다.' : 'Pipeline 실행은 데모 기능입니다.')
      }}
    >
      {label}
    </Button>
  )
}
