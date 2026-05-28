import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  GoBackOutlined,
  GoForwardOutlined,
  PlayCircleOutlined,
  SearchOutlined,
  StopOutlined,
  ToolOutlined,
} from '../components/icons'
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Empty,
  Flex,
  Input,
  Modal,
  Result,
  Select,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd'
import { useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getJobById,
  getJobsByStage,
  getPipelineCommit,
  getPipelineDetail,
  getPipelineStages,
} from '../api/pipelines'

const { Paragraph, Text, Title } = Typography

const STATUS_META = {
  running: { label: 'Running', tagColor: 'processing', icon: <ClockCircleOutlined /> },
  passed: { label: 'Passed', tagColor: 'success', icon: <CheckCircleOutlined /> },
  finished: { label: 'Passed', tagColor: 'success', icon: <CheckCircleOutlined /> },
  failed: { label: 'Failed', tagColor: 'error', icon: <ExclamationCircleOutlined /> },
  blocked: { label: 'Failed', tagColor: 'error', icon: <ExclamationCircleOutlined /> },
  manual: { label: 'Manual', tagColor: 'warning', icon: <ToolOutlined /> },
  canceled: { label: 'Canceled', tagColor: 'default', icon: <StopOutlined /> },
  pending: { label: 'Pending', tagColor: 'warning', icon: <ClockCircleOutlined /> },
  created: { label: 'Pending', tagColor: 'warning', icon: <ClockCircleOutlined /> },
  skipped: { label: 'Skipped', tagColor: 'default', icon: <ClockCircleOutlined /> },
}

function normalizeStatus(status) {
  if (status === 'finished') return 'passed'
  if (status === 'created') return 'pending'
  if (status === 'blocked') return 'failed'
  return status ?? 'pending'
}

function getStatusMeta(status) {
  return STATUS_META[status] ?? STATUS_META[normalizeStatus(status)] ?? STATUS_META.pending
}

function getActionLabel(status) {
  if (status === 'running') return '실행 취소'
  if (status === 'manual') return '실행'
  return '다시 실행'
}

function getLogLines(job, pipeline) {
  const source = Array.isArray(job?.logs) ? job.logs : job?.log
  if (!Array.isArray(source)) return []

  return source.map((line, index) => {
    if (typeof line === 'object') {
      return {
        line: line.line ?? index + 1,
        time: line.time ?? '05:24:15',
        message: line.message ?? '',
        level: line.level ?? inferLogLevel(line.message),
      }
    }

    return {
      line: index + 1,
      time: '05:24:15',
      message: line,
      level: inferLogLevel(line),
    }
  }).map((line) => {
    if (line.message === '$ npm ci' && job?.name === 'contract-test') {
      return { ...line, message: '$ npm run test:contract' }
    }
    if (line.message?.includes('Running contract-test')) {
      return { ...line, message: `Running contract suite for ${pipeline?.repo ?? 'repository'}` }
    }
    return line
  })
}

function inferLogLevel(message = '') {
  const value = message.toLowerCase()
  if (
    value.includes('failed') ||
    value.includes('error') ||
    value.includes('exit code') ||
    value.includes('expected') ||
    value.includes('received 500') ||
    value.includes('assertion')
  ) {
    return 'error'
  }
  if (value.startsWith('$')) return 'command'
  return 'info'
}

function getFailureSummary(job, logLines) {
  if (Array.isArray(job?.failureSummary) && job.failureSummary.length) return job.failureSummary

  const importantLines = logLines
    .filter((line) =>
      line.level === 'error' ||
      /expected|received|exit code|assertion|failed/i.test(line.message),
    )
    .map((line) => line.message)

  if (importantLines.length) return importantLines
  if (normalizeStatus(job?.status) === 'failed') return ['Job failed with exit code 1']
  return []
}

function getPipelinePath(repositoryId, pipeline) {
  if (repositoryId || pipeline?.repo) return `/repositories/${repositoryId ?? pipeline.repo}/pipelines/${pipeline.id}`
  return `/pipelines/${pipeline?.id}`
}

function getJobPath(repositoryId, pipeline, job) {
  return `${getPipelinePath(repositoryId, pipeline)}/jobs/${encodeURIComponent(job.routeId ?? job.id ?? job.name)}`
}

function JobDetail() {
  const { repositoryId, pipelineId, jobId } = useParams()
  const navigate = useNavigate()
  const pipeline = getPipelineDetail(pipelineId)
  const job = getJobById(pipelineId, jobId)
  const commit = getPipelineCommit(pipelineId)
  const stages = getPipelineStages(pipelineId)
  const [selectedStage, setSelectedStage] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [activeMatchIndex, setActiveMatchIndex] = useState(0)
  const logScrollRef = useRef(null)

  const logLines = useMemo(() => getLogLines(job, pipeline), [job, pipeline])
  const failureSummary = useMemo(() => getFailureSummary(job, logLines), [job, logLines])
  const matches = useMemo(() => {
    const keyword = searchText.trim().toLowerCase()
    if (!keyword) return []
    return logLines
      .map((line, index) => ({ index, text: line.message.toLowerCase() }))
      .filter((line) => line.text.includes(keyword))
      .map((line) => line.index)
  }, [logLines, searchText])
  const currentJobKey = job?.routeId ?? job?.id ?? job?.name
  const effectiveSelectedStage = selectedStage?.jobKey === currentJobKey ? selectedStage.stage : job?.stage
  const relatedJobs = effectiveSelectedStage ? getJobsByStage(pipelineId, effectiveSelectedStage) : []

  if (!pipeline || !job) {
    return (
      <Result
        status="404"
        title="Job을 찾을 수 없어요."
        subTitle="삭제되었거나 접근 권한이 없는 Job일 수 있어요."
        extra={(
          <Button type="primary" onClick={() => navigate(pipeline ? getPipelinePath(repositoryId, pipeline) : '/pipelines')}>
            Pipeline으로 돌아가기
          </Button>
        )}
      />
    )
  }

  const status = normalizeStatus(job.status)
  const statusMeta = getStatusMeta(status)
  const pipelinePath = getPipelinePath(repositoryId, pipeline)

  const runJobAction = () => {
    if (status === 'running') {
      Modal.confirm({
        title: '실행 중인 Job을 취소할까요?',
        okText: '실행 취소',
        cancelText: '닫기',
        okButtonProps: { danger: true },
        onOk: () => message.success('Job 실행을 취소했어요.'),
      })
      return
    }

    if (status === 'manual') {
      message.success('Job을 실행했어요.')
      return
    }

    Modal.confirm({
      title: 'Job을 다시 실행할까요?',
      content: '동일한 Pipeline 컨텍스트에서 이 Job을 다시 실행합니다.',
      okText: '다시 실행',
      cancelText: '취소',
      onOk: () => message.success('Job을 다시 실행했어요.'),
    })
  }

  const submitSearch = () => {
    if (!searchText.trim()) return
    if (!matches.length) {
      message.warning('검색 결과가 없어요.')
      return
    }
    moveToMatch(0)
  }

  const moveToMatch = (nextIndex) => {
    if (!matches.length) {
      message.warning('검색 결과가 없어요.')
      return
    }
    const safeIndex = (nextIndex + matches.length) % matches.length
    setActiveMatchIndex(safeIndex)
    document.getElementById(`job-log-line-${matches[safeIndex]}`)?.scrollIntoView({ block: 'center' })
  }

  const copyLogs = async () => {
    const text = logLines.map((line) => `${line.line} ${line.time} ${line.message}`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard can be unavailable in local preview; the UX still confirms the requested action.
    }
    message.success('로그를 복사했어요.')
  }

  const downloadLogs = () => {
    const text = logLines.map((line) => `${line.line} ${line.time} ${line.message}`).join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${pipeline.id}-${job.name}.log`
    link.click()
    URL.revokeObjectURL(url)
    message.success('로그 다운로드를 시작했어요.')
  }

  const tabs = [
    {
      key: 'log',
      label: 'Log',
      children: (
        <JobLogViewer
          activeMatchLine={matches[activeMatchIndex]}
          job={job}
          logLines={logLines}
          logScrollRef={logScrollRef}
          onCopy={copyLogs}
          onDownload={downloadLogs}
          onNext={() => moveToMatch(activeMatchIndex + 1)}
          onPrevious={() => moveToMatch(activeMatchIndex - 1)}
          onSearch={submitSearch}
          onSearchTextChange={setSearchText}
          onScrollBottom={() => {
            if (logScrollRef.current) logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight
          }}
          onScrollTop={() => {
            if (logScrollRef.current) logScrollRef.current.scrollTop = 0
          }}
          searchText={searchText}
        />
      ),
    },
  ]

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }} className="job-detail-page">
      <Card>
        <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
          <Space align="start">
            <Button icon={<GoBackOutlined />} onClick={() => navigate(-1)} />
            <div>
              <Text type="secondary">Job</Text>
              <Title level={2}>{job.name}</Title>
              <Space wrap>
                <Tag color={statusMeta.tagColor} icon={statusMeta.icon}>{statusMeta.label}</Tag>
                <Text>{pipeline.author ?? '-'}</Text>
                <Text type="secondary">·</Text>
                <Text>{job.startedAt ?? pipeline.updatedAt} 실행</Text>
              </Space>
            </div>
          </Space>
          <Button
            type={status === 'running' ? 'default' : 'primary'}
            danger={status === 'running'}
            icon={status === 'running' ? <StopOutlined /> : <PlayCircleOutlined />}
            onClick={runJobAction}
          >
            {getActionLabel(status)}
          </Button>
        </Flex>
      </Card>

      {status === 'failed' ? (
        <Alert
          type="error"
          showIcon
          message="이 Job은 실패했어요. 실패 로그를 확인한 뒤 다시 실행해 주세요."
          description={failureSummary.length ? failureSummary.join(' · ') : null}
        />
      ) : null}

      <div className="job-detail-layout">
        <main className="job-detail-main">
          <Tabs items={tabs} />
        </main>
        <aside className="job-side-panel">
          <JobSummaryCard job={job} statusMeta={statusMeta} />
          <PipelineInfoCard
            commit={commit}
            pipeline={pipeline}
            statusMeta={getStatusMeta(normalizeStatus(pipeline.status))}
            onBranchClick={() => message.info(`${pipeline.branch} Branch를 확인합니다.`)}
            onCommitClick={() => message.info(`${commit?.sha ?? pipeline.commit} Commit을 확인합니다.`)}
            onPipelineClick={() => navigate(pipelinePath)}
          />
          <StageJobsCard
            currentJob={job}
            jobs={relatedJobs}
            onJobClick={(nextJob) => navigate(getJobPath(repositoryId, pipeline, nextJob))}
            onStageChange={(stage) => setSelectedStage({ jobKey: currentJobKey, stage })}
            selectedStage={effectiveSelectedStage}
            stages={stages}
          />
        </aside>
      </div>
    </Space>
  )
}

function JobLogViewer({
  activeMatchLine,
  job,
  logLines,
  logScrollRef,
  onCopy,
  onDownload,
  onNext,
  onPrevious,
  onSearch,
  onSearchTextChange,
  onScrollBottom,
  onScrollTop,
  searchText,
}) {
  return (
    <Card className="job-log-viewer">
      <Flex className="job-log-toolbar" gap={8} wrap="wrap" align="center">
        <Input.Search
          allowClear
          placeholder="log에서 검색할 키워드를 입력해 주세요."
          onChange={(event) => onSearchTextChange(event.target.value)}
          onSearch={onSearch}
          value={searchText}
          style={{ maxWidth: 360 }}
        />
        <Tooltip title="검색">
          <Button icon={<SearchOutlined />} onClick={onSearch} />
        </Tooltip>
        <Tooltip title="이전 검색 결과">
          <Button icon={<GoBackOutlined />} onClick={onPrevious} />
        </Tooltip>
        <Tooltip title="다음 검색 결과">
          <Button icon={<GoForwardOutlined />} onClick={onNext} />
        </Tooltip>
        <Tooltip title="전체 로그 복사">
          <Button icon={<CopyOutlined />} onClick={onCopy} />
        </Tooltip>
        <Button onClick={onScrollTop}>위로</Button>
        <Button onClick={onScrollBottom}>아래로</Button>
        <Tooltip title="로그 다운로드">
          <Button icon={<DownloadOutlined />} onClick={onDownload} />
        </Tooltip>
      </Flex>
      <Flex className="job-log-meta" gap={12} wrap="wrap">
        <Text>Runtime {job.runtimeText ?? job.duration ?? '-'}</Text>
        <Text>Elapsed {job.elapsedText ?? job.duration ?? '-'}</Text>
      </Flex>
      {logLines.length ? (
        <div ref={logScrollRef} className="job-log-content">
          {logLines.map((line, index) => (
            <div
              id={`job-log-line-${index}`}
              key={`${line.line}-${line.message}`}
              className={`job-log-line ${line.level === 'error' ? 'job-log-line-error' : ''} ${activeMatchLine === index ? 'job-log-line-active' : ''}`}
            >
              <Text className="job-log-number">{line.line}</Text>
              <Text className="job-log-time">{line.time}</Text>
              <Text className="job-log-message">{highlightText(line.message, searchText)}</Text>
            </div>
          ))}
        </div>
      ) : (
        <Empty description="표시할 로그가 없어요." />
      )}
    </Card>
  )
}

function highlightText(value, keyword) {
  const text = String(value ?? '')
  const query = keyword.trim()
  if (!query) return text

  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'))
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={`${part}-${index}`} className="job-log-highlight">{part}</mark>
      : part,
  )
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function JobSummaryCard({ job, statusMeta }) {
  return (
    <Card title="Job 요약">
      <Descriptions column={1} size="small">
        <Descriptions.Item label="Job 상태"><Tag color={statusMeta.tagColor}>{statusMeta.label}</Tag></Descriptions.Item>
        <Descriptions.Item label="Stage">{job.stage ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="Runner">{job.runner ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="Runtime">{job.runtimeText ?? job.duration ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="Elapsed">{job.elapsedText ?? job.duration ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="시작 시간">{job.startedAt ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="종료 시간">{job.finishedAt ?? '-'}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

function PipelineInfoCard({ commit, pipeline, statusMeta, onBranchClick, onCommitClick, onPipelineClick }) {
  return (
    <Card title="Commit / Pipeline 정보">
      <Space orientation="vertical" size={12} style={{ width: '100%' }}>
        <Space orientation="vertical" size={4}>
          <Button type="link" style={{ padding: 0 }} onClick={onCommitClick}>#{commit?.sha ?? pipeline.commit}</Button>
          <Text>{commit?.title ?? pipeline.title}</Text>
        </Space>
        <div className="job-side-divider" />
        <Space wrap>
          <Button type="link" style={{ padding: 0 }} onClick={onPipelineClick}>#{pipeline.id}</Button>
          <Tag color={statusMeta.tagColor}>{statusMeta.label}</Tag>
          <Tag className="job-branch-tag" onClick={onBranchClick}>{pipeline.branch}</Tag>
        </Space>
      </Space>
    </Card>
  )
}

function StageJobsCard({ currentJob, jobs, onJobClick, onStageChange, selectedStage, stages }) {
  return (
    <Card title="Stage" className="job-related-list">
      <Space orientation="vertical" size={12} style={{ width: '100%' }}>
        <Paragraph type="secondary">현재 단계와 관련 Job을 확인할 수 있어요.</Paragraph>
        <Select
          value={selectedStage}
          onChange={onStageChange}
          style={{ width: '100%' }}
          options={stages.map((stage) => ({ value: stage.name, label: stage.name }))}
        />
        {jobs.length ? (
          <Space orientation="vertical" size={8} style={{ width: '100%' }}>
            {jobs.map((job) => {
              const selected = (job.routeId ?? job.id ?? job.name) === (currentJob.routeId ?? currentJob.id ?? currentJob.name)
              const meta = getStatusMeta(normalizeStatus(job.status))
              return (
                <Card
                  key={job.routeId ?? job.id ?? job.name}
                  size="small"
                  hoverable
                  className={`job-related-item ${selected ? 'job-related-item-selected' : ''}`}
                  onClick={() => onJobClick(job)}
                >
                  <Flex align="center" justify="space-between" gap={8}>
                    <Space>
                      {meta.icon}
                      <Text strong={selected}>{job.name}</Text>
                    </Space>
                    {selected ? <CheckCircleOutlined /> : <Tag color={meta.tagColor}>{meta.label}</Tag>}
                  </Flex>
                </Card>
              )
            })}
          </Space>
        ) : (
          <Empty description="표시할 Job이 없어요." />
        )}
      </Space>
    </Card>
  )
}

export default JobDetail
