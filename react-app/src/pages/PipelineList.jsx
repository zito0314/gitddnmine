import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  StopOutlined,
} from '../components/icons'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  Drawer,
  Empty,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getPipelineJobs,
  getPipelineStages,
  getPipelines,
  getPipelinesByRepositoryId,
} from '../api/pipelines'
import { getRepositories, getRepositoryBranches, getRepositoryDetail } from '../api/repositories'
import { PageHeader, SummaryCard } from '../components/common'

const { Search } = Input
const { Text } = Typography

const STATUS_TABS = [
  { key: 'all', label: '전체' },
  { key: 'running', label: 'Running' },
  { key: 'failed', label: 'Failed' },
  { key: 'finished', label: 'Finished' },
]

const PIPELINE_STATUS_META = {
  running: { label: 'Running', color: 'processing', badge: 'processing', description: '실행 중' },
  passed: { label: 'Passed', color: 'success', badge: 'success', description: '성공' },
  finished: { label: 'Passed', color: 'success', badge: 'success', description: '성공' },
  manual: { label: 'Manual', color: 'warning', badge: 'warning', description: '수동 실행 대기' },
  failed: { label: 'Failed', color: 'error', badge: 'error', description: '실패' },
  canceled: { label: 'Canceled', color: 'default', badge: 'default', description: '취소됨' },
  pending: { label: 'Pending', color: 'warning', badge: 'warning', description: '대기 중' },
  skipped: { label: 'Skipped', color: 'default', badge: 'default', description: '건너뜀' },
  created: { label: 'Pending', color: 'default', badge: 'default', description: '생성됨' },
}

function normalizeStatus(status) {
  if (status === 'finished') return 'passed'
  return status ?? 'pending'
}

function statusMeta(status) {
  return PIPELINE_STATUS_META[status] ?? PIPELINE_STATUS_META[normalizeStatus(status)] ?? PIPELINE_STATUS_META.pending
}

function getDuration(pipeline) {
  return pipeline.summary?.find((item) => item.label === '실제 실행 시간')?.value ?? pipeline.durationText ?? '-'
}

function isLongRunning(pipeline) {
  if (pipeline.isLongRunning) return true
  if (pipeline.status !== 'running') return false
  const duration = getDuration(pipeline)
  const minutes = duration.split(':').reduce((total, value) => total * 60 + Number(value || 0), 0)
  return minutes >= 10
}

function getPipelineTitle(pipeline) {
  return pipeline.title ?? pipeline.description ?? `Pipeline #${pipeline.id}`
}

function getStageDuration(stage) {
  return stage.durationText ?? stage.duration ?? '00:00:32'
}

function getJobDuration(job) {
  return job.durationText ?? job.duration ?? '00:00:32'
}

function getActionLabel(status) {
  if (status === 'running') return '실행 취소'
  if (status === 'manual') return '수동 실행'
  return '다시 실행'
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
  const [search, setSearch] = useState('')
  const [selectedRepositoryId, setSelectedRepositoryId] = useState(null)
  const [activeStatus, setActiveStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [selectedPipeline, setSelectedPipeline] = useState(null)
  const [runModalOpen, setRunModalOpen] = useState(false)
  const [runForm] = Form.useForm()

  const enrichedPipelines = useMemo(
    () =>
      allPipelines.map((pipeline) => ({
        ...pipeline,
        repositoryName: repositoryMap.get(pipeline.repo)?.name ?? pipeline.repo,
        projectName: repositoryMap.get(pipeline.repo)?.group ?? pipeline.repoGroup,
        durationText: getDuration(pipeline),
        updatedAtText: pipeline.updatedAtText ?? pipeline.updatedAt,
        stages: getPipelineStages(pipeline.id),
        normalizedStatus: normalizeStatus(pipeline.status),
        isLongRunning: isLongRunning(pipeline),
      })),
    [allPipelines, repositoryMap],
  )

  const summary = useMemo(
    () => ({
      total: enrichedPipelines.length,
      failed: enrichedPipelines.filter((pipeline) => pipeline.normalizedStatus === 'failed').length,
      passed: enrichedPipelines.filter((pipeline) => pipeline.normalizedStatus === 'passed').length,
      longRunning: enrichedPipelines.filter((pipeline) => pipeline.isLongRunning).length,
    }),
    [enrichedPipelines],
  )

  const filteredPipelines = enrichedPipelines.filter((pipeline) => {
    const query = search.trim().toLowerCase()
    const searchable = [
      pipeline.id,
      getPipelineTitle(pipeline),
      pipeline.branch,
      pipeline.commit,
      pipeline.author,
      pipeline.repositoryName,
      pipeline.projectName,
    ].join(' ').toLowerCase()

    if (selectedRepositoryId && pipeline.repo !== selectedRepositoryId) return false
    if (query && !searchable.includes(query)) return false
    if (activeStatus === 'running' && pipeline.normalizedStatus !== 'running') return false
    if (activeStatus === 'failed' && pipeline.normalizedStatus !== 'failed') return false
    if (activeStatus === 'finished' && pipeline.normalizedStatus !== 'passed') return false
    return true
  })

  const openRunModal = () => {
    runForm.setFieldsValue({
      repository: repositoryId ?? repositories[0]?.id,
      type: 'default',
    })
    setRunModalOpen(true)
  }

  const submitRunPipeline = async () => {
    await runForm.validateFields()
    message.success('새 Pipeline 실행 요청이 등록되었어요.')
    setRunModalOpen(false)
  }

  const handlePipelineAction = (pipeline) => {
    if (pipeline.normalizedStatus === 'running') {
      Modal.confirm({
        title: '실행 중인 Pipeline을 취소할까요?',
        okText: '실행 취소',
        cancelText: '닫기',
        okButtonProps: { danger: true },
        onOk: () => message.success('Pipeline 실행을 취소했어요.'),
      })
      return
    }

    message.success(pipeline.normalizedStatus === 'manual' ? '수동 Pipeline을 실행했어요.' : 'Pipeline을 다시 실행했어요.')
  }

  const copyCommitSha = async (commitSha) => {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(commitSha)
    message.success('Commit SHA를 복사했어요.')
  }

  const columns = [
    {
      title: '마지막 업데이트 / 상태',
      dataIndex: 'status',
      width: 170,
      render: (_, pipeline) => {
        const meta = statusMeta(pipeline.normalizedStatus)
        return (
          <Space orientation="vertical" size={2}>
            <Tag color={meta.color}>{meta.label}</Tag>
            <Text>{pipeline.durationText}</Text>
            <Text type="secondary">{pipeline.updatedAtText}</Text>
          </Space>
        )
      },
    },
    {
      title: '제목',
      dataIndex: 'title',
      minWidth: 240,
      render: (_, pipeline) => (
        <Space orientation="vertical" size={2}>
          <Link to={`/repositories/${pipeline.repo}/pipelines/${pipeline.id}`} onClick={(event) => event.stopPropagation()}>
            #{pipeline.id}
          </Link>
          <Text strong>{getPipelineTitle(pipeline)}</Text>
          <Text type="secondary">{pipeline.repositoryName}</Text>
        </Space>
      ),
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      width: 180,
      render: (branch) => <Tag>{branch}</Tag>,
    },
    {
      title: 'Commit',
      dataIndex: 'commit',
      width: 130,
      render: (commit) => (
        <Button size="small" icon={<CopyOutlined />} onClick={(event) => { event.stopPropagation(); copyCommitSha(commit) }}>
          {commit}
        </Button>
      ),
    },
    {
      title: '작성자',
      dataIndex: 'author',
      width: 130,
      render: (author) => (
        <Space>
          <Avatar size={28}>{author?.slice(0, 1)}</Avatar>
          <Text>{author}</Text>
        </Space>
      ),
    },
    {
      title: 'Stages',
      dataIndex: 'stages',
      minWidth: 220,
      render: (stages, pipeline) => <StageSummary stages={stages} onDetail={() => setSelectedPipeline(pipeline)} />,
    },
    {
      title: '액션',
      key: 'actions',
      fixed: 'right',
      width: 126,
      render: (_, pipeline) => (
        <Button
          size="small"
          danger={pipeline.normalizedStatus === 'running'}
          icon={pipeline.normalizedStatus === 'running' ? <StopOutlined /> : <ReloadOutlined />}
          onClick={(event) => {
            event.stopPropagation()
            handlePipelineAction(pipeline)
          }}
        >
          {getActionLabel(pipeline.normalizedStatus)}
        </Button>
      ),
    },
  ]

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        eyebrow={currentRepository?.name}
        title="Pipeline"
        description="현재 Repository의 Pipeline 실행 상태, 실패 Job, 실행 이력을 확인하는 화면입니다."
        actions={
          <Button type="primary" icon={<PlayCircleOutlined />} onClick={openRunModal}>
            새 Pipeline 실행
          </Button>
        }
      />

      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} md={12} xl={6}>
          <SummaryCard title="실행 Pipeline" value={summary.total} description="전체 실행 이력 수" icon={<PlayCircleOutlined />} />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <SummaryCard title="실패 Pipeline" value={summary.failed} description="실패한 Pipeline" tone="danger" icon={<ExclamationCircleOutlined />} />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <SummaryCard title="성공 Pipeline" value={summary.passed} description="성공한 Pipeline" tone="success" icon={<CheckCircleOutlined />} />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <SummaryCard title="장시간 실행 Pipeline" value={summary.longRunning} description="장시간 Running 상태" tone="warning" icon={<ClockCircleOutlined />} />
        </Col>
      </Row>

      <Card>
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          <Row gutter={[8, 8]}>
            {!repositoryId ? (
              <Col xs={24} md={6}>
                <Select
                  allowClear
                  placeholder="전체 저장소"
                  value={selectedRepositoryId}
                  onChange={(value) => { setSelectedRepositoryId(value); setPage(1) }}
                  options={repositories.map((repository) => ({ value: repository.id, label: repository.name }))}
                  style={{ width: '100%' }}
                />
              </Col>
            ) : null}
            <Col xs={24} md={repositoryId ? 24 : 18}>
              <Search
                allowClear
                placeholder="저장소명, 프로젝트명, 담당 조직을 선택해 주세요."
                value={search}
                onChange={(event) => { setSearch(event.target.value); setPage(1) }}
              />
            </Col>
          </Row>
          <Tabs activeKey={activeStatus} items={STATUS_TABS} onChange={(key) => { setActiveStatus(key); setPage(1) }} />
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredPipelines}
            scroll={{ x: 1100 }}
            onRow={(pipeline) => ({ onClick: () => navigate(`/repositories/${pipeline.repo}/pipelines/${pipeline.id}`) })}
            pagination={{
              current: page,
              pageSize: 10,
              total: filteredPipelines.length,
              onChange: setPage,
              showSizeChanger: false,
            }}
            locale={{
              emptyText: (
                <Empty
                  description={
                    <Space orientation="vertical" size={2}>
                      <Text>조건에 맞는 Pipeline이 없어요.</Text>
                      <Text type="secondary">필터를 변경하거나 검색어를 다시 입력해 주세요.</Text>
                    </Space>
                  }
                />
              ),
            }}
          />
        </Space>
      </Card>

      <PipelineDetailDrawer
        pipeline={selectedPipeline}
        onClose={() => setSelectedPipeline(null)}
        onJobLog={() => message.info('Job 로그를 확인합니다.')}
        onCopyCommit={copyCommitSha}
      />

      <RunPipelineModal
        open={runModalOpen}
        form={runForm}
        repositories={repositories}
        repositoryId={repositoryId}
        onCancel={() => setRunModalOpen(false)}
        onSubmit={submitRunPipeline}
      />
    </Space>
  )
}

function StageSummary({ stages = [], onDetail }) {
  const visibleStages = stages.slice(0, 6)
  const hiddenCount = Math.max(stages.length - visibleStages.length, 0)

  return (
    <Flex align="center" gap={6} wrap="wrap">
      {visibleStages.map((stage) => {
        const meta = statusMeta(stage.status)
        return (
          <Tooltip
            key={stage.name}
            title={(
              <Space orientation="vertical" size={0}>
                <Text>Stage: {stage.name}</Text>
                <Text>Status: {meta.label}</Text>
                <Text>Duration: {getStageDuration(stage)}</Text>
              </Space>
            )}
          >
            <Badge status={meta.badge} text={<Tag color={meta.color}>{stage.name}</Tag>} />
          </Tooltip>
        )
      })}
      {hiddenCount > 0 ? <Tag>+{hiddenCount}</Tag> : null}
      <Button size="small" type="link" onClick={(event) => { event.stopPropagation(); onDetail() }}>
        자세히
      </Button>
    </Flex>
  )
}

function PipelineDetailDrawer({ pipeline, onClose, onJobLog, onCopyCommit }) {
  const jobs = pipeline ? getPipelineJobs(pipeline.id) : []
  const failedJobs = jobs.filter((job) => ['failed', 'blocked'].includes(job.status))
  const stages = pipeline?.stages ?? []

  return (
    <Drawer
      title={pipeline ? `Pipeline #${pipeline.id}` : 'Pipeline'}
      open={Boolean(pipeline)}
      size="large"
      onClose={onClose}
    >
      {pipeline ? (
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          {failedJobs.length > 0 ? (
            <Alert type="error" showIcon message="실패한 Job이 있어요. 로그를 확인한 뒤 다시 실행해 주세요." />
          ) : null}
          <Card size="small">
            <Row gutter={[12, 12]}>
              <Col span={12}><Text type="secondary">상태</Text><br /><Tag color={statusMeta(pipeline.normalizedStatus).color}>{statusMeta(pipeline.normalizedStatus).label}</Tag></Col>
              <Col span={12}><Text type="secondary">Branch</Text><br /><Tag>{pipeline.branch}</Tag></Col>
              <Col span={12}><Text type="secondary">Commit</Text><br /><Button size="small" icon={<CopyOutlined />} onClick={() => onCopyCommit(pipeline.commit)}>{pipeline.commit}</Button></Col>
              <Col span={12}><Text type="secondary">작성자</Text><br /><Text>{pipeline.author}</Text></Col>
              <Col span={12}><Text type="secondary">실행 시간</Text><br /><Text>{pipeline.durationText}</Text></Col>
              <Col span={12}><Text type="secondary">마지막 업데이트</Text><br /><Text>{pipeline.updatedAtText}</Text></Col>
            </Row>
          </Card>
          <Collapse
            items={stages.map((stage) => ({
              key: stage.name,
              label: (
                <Flex justify="space-between" align="center" gap={12}>
                  <Space>
                    <Text strong>{stage.name}</Text>
                    <Tag color={statusMeta(stage.status).color}>{statusMeta(stage.status).label}</Tag>
                  </Space>
                  <Text type="secondary">{getStageDuration(stage)}</Text>
                </Flex>
              ),
              children: (
                <Table
                  rowKey={(job) => job.id ?? `${stage.name}-${job.name}`}
                  size="small"
                  pagination={false}
                  dataSource={stage.jobs ?? []}
                  columns={[
                    { title: 'Job 이름', dataIndex: 'name' },
                    { title: '상태', dataIndex: 'status', render: (status) => <Tag color={statusMeta(status).color}>{statusMeta(status).label}</Tag> },
                    { title: '실행 시간', key: 'duration', render: (_, job) => getJobDuration(job) },
                    { title: '로그', key: 'log', render: () => <Button size="small" onClick={onJobLog}>Job 로그 보기</Button> },
                  ]}
                />
              ),
            }))}
          />
        </Space>
      ) : null}
    </Drawer>
  )
}

function RunPipelineModal({ open, form, repositories, repositoryId, onCancel, onSubmit }) {
  const selectedRepositoryId = Form.useWatch('repository', form) ?? repositoryId ?? repositories[0]?.id
  const branchOptions = selectedRepositoryId
    ? getRepositoryBranches(selectedRepositoryId).map((branch) => ({ value: branch.name, label: branch.name }))
    : []

  return (
    <Modal title="새 Pipeline 실행" open={open} onCancel={onCancel} onOk={onSubmit} okText="실행" cancelText="취소">
      <Form form={form} layout="vertical">
        <Form.Item name="repository" label="Repository" rules={[{ required: true, message: 'Repository를 선택해 주세요.' }]}>
          <Select
            disabled={Boolean(repositoryId)}
            options={repositories.map((repository) => ({ value: repository.id, label: repository.name }))}
          />
        </Form.Item>
        <Form.Item name="branch" label="Branch" rules={[{ required: true, message: 'Branch를 선택해 주세요.' }]}>
          <Select placeholder="Branch 선택" options={branchOptions} />
        </Form.Item>
        <Form.Item name="type" label="Pipeline 유형" rules={[{ required: true, message: 'Pipeline 유형을 선택해 주세요.' }]}>
          <Select
            options={[
              { value: 'default', label: '기본 Pipeline' },
              { value: 'security', label: '보안 점검 포함' },
              { value: 'deploy-validation', label: '배포 검증 포함' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
