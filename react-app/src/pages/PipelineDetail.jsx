import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CodeOutlined,
  ExclamationCircleOutlined,
  GoBackOutlined,
  PlayCircleOutlined,
  StopOutlined,
  ToolOutlined,
} from '../components/icons'
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Drawer,
  Empty,
  Flex,
  Modal,
  Result,
  Row,
  Segmented,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRepositoryById } from '../api/repositories'
import { getPipelineOverview } from '../api/pipelines'
import { CodePreview } from '../components/custom'

const { Paragraph, Text, Title } = Typography

const STATUS_META = {
  running: { label: 'Running', helper: '실행 중', tagColor: 'processing', icon: <ClockCircleOutlined /> },
  passed: { label: 'Passed', helper: '성공', tagColor: 'success', icon: <CheckCircleOutlined /> },
  finished: { label: 'Passed', helper: '성공', tagColor: 'success', icon: <CheckCircleOutlined /> },
  failed: { label: 'Failed', helper: '실패', tagColor: 'error', icon: <ExclamationCircleOutlined /> },
  manual: { label: 'Manual', helper: '수동 실행 대기', tagColor: 'warning', icon: <ToolOutlined /> },
  canceled: { label: 'Canceled', helper: '취소됨', tagColor: 'default', icon: <StopOutlined /> },
  skipped: { label: 'Skipped', helper: '건너뜀', tagColor: 'default', icon: <CodeOutlined /> },
  pending: { label: 'Pending', helper: '대기 중', tagColor: 'warning', icon: <ClockCircleOutlined /> },
  created: { label: 'Pending', helper: '대기 중', tagColor: 'warning', icon: <ClockCircleOutlined /> },
  blocked: { label: 'Failed', helper: '실패', tagColor: 'error', icon: <ExclamationCircleOutlined /> },
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

function getDuration(pipeline, summary) {
  return summary?.duration ?? pipeline.summary?.find((item) => item.label === '실제 실행 시간')?.value ?? '-'
}

function getTotalDuration(pipeline) {
  return pipeline.summary?.find((item) => item.label === 'Pipeline 총 실행 시간')?.value ?? pipeline.totalDurationText ?? '-'
}

function getJobDuration(job) {
  return job.durationText ?? job.duration ?? '-'
}

function getJobLog(job) {
  if (Array.isArray(job.log)) return job.log
  if (typeof job.log === 'string' && job.log) return [job.log]
  return [
    `$ run ${job.name}`,
    job.status === 'failed' ? 'Job failed with exit code 1' : 'Job completed.',
  ]
}

function getHeaderActionLabel(status) {
  if (status === 'running') return '실행 취소'
  if (status === 'manual') return '실행'
  return '실행'
}

function getJobActionLabel(status) {
  if (status === 'manual') return '실행'
  if (status === 'running') return '취소'
  if (status === 'passed') return '로그 보기'
  return '다시 실행'
}

function buildStageJobs(stages, jobs) {
  return stages.map((stage) => ({
    ...stage,
    jobs: (stage.jobs ?? []).map((stageJob) => {
      const job = jobs.find((item) => item.stage === stage.name && item.name === stageJob.name)
      return {
        ...stageJob,
        ...job,
        stage: stage.name,
        status: normalizeStatus(job?.status ?? stageJob.status),
      }
    }),
  }))
}

function getJobDetailPath(repositoryId, pipeline, job) {
  const pipelinePath = repositoryId || pipeline?.repo
    ? `/repositories/${repositoryId ?? pipeline.repo}/pipelines/${pipeline.id}`
    : `/pipelines/${pipeline.id}`

  return `${pipelinePath}/jobs/${encodeURIComponent(job.routeId ?? job.id ?? job.name)}`
}

function PipelineDetail() {
  const { repositoryId, pipelineId } = useParams()
  const navigate = useNavigate()
  const overview = getPipelineOverview(pipelineId)
  const [activePipelineView, setActivePipelineView] = useState('Stage')
  const [selectedStage, setSelectedStage] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)

  if (!overview) {
    return (
      <Result
        status="404"
        title="Pipeline을 찾을 수 없어요."
        subTitle="삭제되었거나 접근 권한이 없는 Pipeline일 수 있어요."
        extra={<Button type="primary" onClick={() => navigate(repositoryId ? `/repositories/${repositoryId}/pipelines` : '/pipelines')}>Pipeline 목록으로 이동</Button>}
      />
    )
  }

  const { pipeline, jobs, stages, relatedMergeRequest, commit, failedJobs, summary } = overview
  const repository = getRepositoryById(repositoryId ?? pipeline.repo)
  const normalizedStatus = normalizeStatus(pipeline.status)
  const statusMeta = getStatusMeta(normalizedStatus)
  const totalDuration = getTotalDuration(pipeline)
  const actualDuration = getDuration(pipeline, summary)
  const stageCards = buildStageJobs(stages, jobs)
  const relatedMrPath = relatedMergeRequest
    ? `/repositories/${repositoryId ?? pipeline.repo}/merge-requests/${relatedMergeRequest.id}`
    : null

  const runPipelineAction = () => {
    if (normalizedStatus === 'running') {
      Modal.confirm({
        title: '실행 중인 Pipeline을 취소할까요?',
        okText: '실행 취소',
        cancelText: '닫기',
        okButtonProps: { danger: true },
        onOk: () => message.success('Pipeline 실행을 취소했어요.'),
      })
      return
    }

    if (normalizedStatus === 'manual') {
      message.success('수동 Pipeline을 실행했어요.')
      return
    }

    Modal.confirm({
      title: 'Pipeline을 다시 실행할까요?',
      content: '동일한 Branch와 Commit 기준으로 Pipeline을 다시 실행합니다.',
      okText: '실행',
      cancelText: '취소',
      onOk: () => message.success('Pipeline을 다시 실행했어요.'),
    })
  }

  const openJobDetail = (job) => {
    navigate(getJobDetailPath(repositoryId, pipeline, job))
  }

  const handleJobAction = (job) => {
    const status = normalizeStatus(job.status)
    if (status === 'manual') message.success('수동 Pipeline을 실행했어요.')
    else if (status === 'running') message.success('Pipeline 실행을 취소했어요.')
    else if (status === 'passed') openJobDetail(job)
    else message.success('Pipeline을 다시 실행했어요.')
  }

  const tabItems = [
    {
      key: 'pipeline',
      label: 'Pipeline',
      children: (
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          <Segmented options={['Stage', 'Job Dependencies']} value={activePipelineView} onChange={setActivePipelineView} />
          {activePipelineView === 'Stage' ? (
            <StageMap stages={stageCards} onJobClick={openJobDetail} onStageClick={setSelectedStage} />
          ) : (
            <Card>
              <Empty description="Job 의존성 그래프는 추후 연결될 예정입니다." />
            </Card>
          )}
        </Space>
      ),
    },
    {
      key: 'jobs',
      label: 'Jobs',
      children: (
        <JobsTable jobs={jobs} onLog={openJobDetail} onAction={handleJobAction} />
      ),
    },
  ]

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }} className="pipeline-detail-page">
      <Card className="pipeline-detail-header">
        <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
          <Space align="start">
            <Button icon={<GoBackOutlined />} onClick={() => navigate(-1)} />
            <Flex vertical>
              <Text type="secondary">Pipeline #{pipeline.id}</Text>
              <Title level={2}>{pipeline.title}</Title>
              <Paragraph type="secondary">{pipeline.description}</Paragraph>
            </Flex>
          </Space>
          <Button
            type={normalizedStatus === 'running' ? 'default' : 'primary'}
            danger={normalizedStatus === 'running'}
            icon={normalizedStatus === 'running' ? <StopOutlined /> : <PlayCircleOutlined />}
            onClick={runPipelineAction}
          >
            {getHeaderActionLabel(normalizedStatus)}
          </Button>
        </Flex>

        <Space orientation="vertical" size={12}>
          <Space wrap>
            <Tag color={statusMeta.tagColor} icon={statusMeta.icon}>{statusMeta.label}</Tag>
            <Text>{pipeline.author}</Text>
            <Text type="secondary">·</Text>
            <Text>{pipeline.createdAtText ?? `${pipeline.updatedAt} 생성`}</Text>
            <Text type="secondary">·</Text>
            <Text>{pipeline.updatedAtText ?? `${pipeline.updatedAt} 마지막 업데이트`}</Text>
          </Space>
          <Space wrap>
            <Tag color="success">Latest</Tag>
            <Tag>Branch</Tag>
            <Tag>{pipeline.commit}</Tag>
            <Tag>{pipeline.branch}</Tag>
          </Space>
          <Space wrap>
            <Text>총 실행 시간 {totalDuration}</Text>
            <Text type="secondary">·</Text>
            <Text>실제 실행 시간 {actualDuration}</Text>
          </Space>
        </Space>
      </Card>

      <PipelineStatusAlert status={normalizedStatus} />

      <Tabs items={tabItems} />

      <Row gutter={[16, 16]}>
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          <Card title="Pipeline 기본 정보">
            <Descriptions column={{ xs: 1, md: 2, xl: 3 }} size="small">
              <Descriptions.Item label="Repository">
                {repository ? <Link to={`/repositories/${repository.id}`}>{repository.name}</Link> : pipeline.repo}
              </Descriptions.Item>
              <Descriptions.Item label="Branch"><Tag>{pipeline.branch}</Tag></Descriptions.Item>
              <Descriptions.Item label="Commit"><Tag>{pipeline.commit}</Tag></Descriptions.Item>
              <Descriptions.Item label="Trigger">{pipeline.trigger}</Descriptions.Item>
              <Descriptions.Item label="Author">{pipeline.author}</Descriptions.Item>
              <Descriptions.Item label="Duration">{actualDuration}</Descriptions.Item>
              <Descriptions.Item label="Related MR">
                {relatedMrPath ? <Link to={relatedMrPath}>!{relatedMergeRequest.id} {relatedMergeRequest.title}</Link> : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Failed Jobs">{failedJobs.length}</Descriptions.Item>
              <Descriptions.Item label="Failed Stage">{summary.failedStage}</Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="Commit Summary">
            <Descriptions column={{ xs: 1, md: 2 }} size="small">
              <Descriptions.Item label="Commit"><Text code>{commit?.sha ?? pipeline.commit}</Text></Descriptions.Item>
              <Descriptions.Item label="Message">{commit?.title ?? pipeline.title}</Descriptions.Item>
              <Descriptions.Item label="Author">{commit?.author ?? pipeline.author}</Descriptions.Item>
              <Descriptions.Item label="Additions / Deletions">
                {commit ? `+${commit.added} / -${commit.removed}` : '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Space>
      </Row>

      <StageDetailDrawer stage={selectedStage} onClose={() => setSelectedStage(null)} onLog={openJobDetail} />
      <JobLogDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />
    </Space>
  )
}

function PipelineStatusAlert({ status }) {
  if (status === 'failed') {
    return <Alert type="error" showIcon title="실패한 Job이 있어요. 실패한 Stage와 Job 로그를 확인한 뒤 다시 실행해 주세요." />
  }
  if (status === 'running') {
    return <Alert type="info" showIcon title="Pipeline이 실행 중이에요. 현재 실행 중인 Stage를 확인해 주세요." />
  }
  if (status === 'passed') {
    return <Alert type="success" showIcon title="모든 Stage가 성공적으로 완료되었어요." />
  }
  if (status === 'manual') {
    return <Alert type="warning" showIcon title="수동 실행이 필요한 Job이 있어요." />
  }
  return null
}

function StageMap({ stages, onJobClick, onStageClick }) {
  if (!stages.length) return <Empty description="표시할 Stage가 없어요." />

  return (
    <Card className="pipeline-stage-map">
      <Flex gap={12} wrap="wrap" align="stretch">
        {stages.map((stage, index) => (
          <Flex key={stage.name} align="center" gap={12}>
            <StageCard stage={stage} onClick={() => onStageClick(stage)} onJobClick={onJobClick} />
            {index < stages.length - 1 ? <div className="pipeline-stage-connector" /> : null}
          </Flex>
        ))}
      </Flex>
    </Card>
  )
}

function StageCard({ stage, onClick, onJobClick }) {
  const meta = getStatusMeta(stage.status)
  const failed = normalizeStatus(stage.status) === 'failed'

  return (
    <Card
      hoverable
      size="small"
      className={`pipeline-stage-card ${failed ? 'pipeline-stage-card-failed' : ''}`}
      onClick={onClick}
    >
      <Space orientation="vertical" size={8} style={{ minWidth: 180 }}>
        <Flex justify="space-between" align="center" gap={8}>
          <Text strong>{stage.name}</Text>
          <Tag color={meta.tagColor} icon={meta.icon}>{meta.label}</Tag>
        </Flex>
        <Space orientation="vertical" size={4}>
          {(stage.jobs ?? []).map((job) => {
            const jobMeta = getStatusMeta(job.status)
            return (
              <Tooltip
                key={job.id ?? `${stage.name}-${job.name}`}
                title={(
                  <Space orientation="vertical" size={0}>
                    <Text>Job 이름: {job.name}</Text>
                    <Text>상태: {jobMeta.label}</Text>
                    <Text>실행 시간: {getJobDuration(job)}</Text>
                    <Text>로그 보기 가능</Text>
                  </Space>
                )}
              >
                <Flex
                  align="center"
                  gap={6}
                  className="pipeline-stage-job-row"
                  onClick={(event) => {
                    event.stopPropagation()
                    onJobClick(job)
                  }}
                >
                  {jobMeta.icon}
                  <Text>{job.name}</Text>
                </Flex>
              </Tooltip>
            )
          })}
        </Space>
        {normalizeStatus(stage.status) === 'manual' ? <Button size="small">실행</Button> : null}
      </Space>
    </Card>
  )
}

function JobsTable({ jobs, onLog, onAction }) {
  if (!jobs.length) return <Empty description="표시할 Job이 없어요." />

  return (
    <Card>
      <Table
        rowKey={(record) => record.id ?? `${record.pipelineId}-${record.stage}-${record.name}`}
        dataSource={jobs}
        pagination={false}
        columns={[
          { title: 'Job 이름', dataIndex: 'name', render: (value) => <Text strong>{value}</Text> },
          { title: 'Stage', dataIndex: 'stage', width: 130 },
          { title: '상태', dataIndex: 'status', width: 130, render: (value) => <Tag color={getStatusMeta(value).tagColor}>{getStatusMeta(value).label}</Tag> },
          { title: '실행 시간', key: 'duration', width: 120, render: (_, job) => getJobDuration(job) },
          { title: 'Runner', dataIndex: 'runner', width: 160 },
          { title: '시작 시간', dataIndex: 'startedAt', width: 140 },
          { title: '종료 시간', dataIndex: 'finishedAt', width: 140 },
          {
            title: '관리',
            key: 'actions',
            width: 190,
            render: (_, job) => (
              <Space>
                <Button size="small" onClick={() => onLog(job)}>로그 보기</Button>
                <Button size="small" onClick={() => onAction(job)}>{getJobActionLabel(normalizeStatus(job.status))}</Button>
              </Space>
            ),
          },
        ]}
      />
    </Card>
  )
}

function StageDetailDrawer({ stage, onClose, onLog }) {
  const failedJobs = stage?.jobs?.filter((job) => normalizeStatus(job.status) === 'failed') ?? []

  return (
    <Drawer title={stage ? `Stage: ${stage.name}` : 'Stage'} open={Boolean(stage)} size="large" onClose={onClose}>
      {stage ? (
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Stage 상태">
              <Tag color={getStatusMeta(stage.status).tagColor}>{getStatusMeta(stage.status).label}</Tag>
            </Descriptions.Item>
          </Descriptions>
          {failedJobs.length ? <Alert type="error" showIcon title="실패한 Job이 있어요. 로그를 확인한 뒤 다시 실행해 주세요." /> : null}
          <JobsTable jobs={stage.jobs ?? []} onLog={onLog} onAction={() => message.success('Pipeline을 다시 실행했어요.')} />
        </Space>
      ) : null}
    </Drawer>
  )
}

function JobLogDrawer({ job, onClose }) {
  return (
    <Drawer title={job ? `Job Log: ${job.name}` : 'Job Log'} open={Boolean(job)} size="large" onClose={onClose}>
      {job ? (
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          <Descriptions bordered size="small" column={{ xs: 1, md: 2 }}>
            <Descriptions.Item label="Job 이름">{job.name}</Descriptions.Item>
            <Descriptions.Item label="Stage">{job.stage}</Descriptions.Item>
            <Descriptions.Item label="상태"><Tag color={getStatusMeta(job.status).tagColor}>{getStatusMeta(job.status).label}</Tag></Descriptions.Item>
            <Descriptions.Item label="실행 시간">{getJobDuration(job)}</Descriptions.Item>
          </Descriptions>
          <CodePreview variant="log">
            {getJobLog(job).map((line) => `${line}\n`)}
          </CodePreview>
        </Space>
      ) : null}
    </Drawer>
  )
}

export default PipelineDetail
