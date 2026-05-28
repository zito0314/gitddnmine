import {
  AuditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  GoBackOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  WarningOutlined,
} from '../components/icons'
import {
  Alert,
  Button,
  Card,
  Col,
  Collapse,
  Descriptions,
  Empty,
  Flex,
  Modal,
  Result,
  Row,
  Space,
  Table,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  Typography,
  message,
} from 'antd'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDeploymentTransferDetail } from '../api/deploymentTransfers'
import { getMergeRequestDetail } from '../api/mergeRequests'
import { getPipelineOverview } from '../api/pipelines'
import { getRepositoryDetail } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'

const { Text, Title } = Typography

const TRANSFER_STATUS_META = {
  ready: { label: '운영 반영 가능', color: 'success', alert: 'success', message: '필수 조건이 모두 충족되어 운영 반영을 진행할 수 있어요.' },
  review: { label: '확인 필요', color: 'warning', alert: 'warning', message: '일부 항목 확인이 필요해요. 리허설 결과와 승인 상태를 확인해 주세요.' },
  blocked: { label: '운영 반영 불가', color: 'error', alert: 'error', message: '차단 항목이 있어 운영 반영을 진행할 수 없어요.' },
  stabilizing: { label: '안정화 중', color: 'processing', alert: 'info', message: '운영 반영 후 안정화 모니터링 중이에요.' },
  completed: { label: '완료', color: 'success', alert: 'success', message: '운영 반영이 완료되었어요.' },
  scheduled: { label: '예정', color: 'default', alert: 'info', message: '운영 반영 예정 상태입니다.' },
  reviewing: { label: '확인 필요', color: 'warning', alert: 'warning', message: '일부 항목 확인이 필요해요. 리허설 결과와 승인 상태를 확인해 주세요.' },
  approved: { label: '운영 반영 가능', color: 'success', alert: 'success', message: '필수 조건이 모두 충족되어 운영 반영을 진행할 수 있어요.' },
}

const CONDITION_META = {
  completed: { label: '완료', color: 'success', icon: <CheckCircleOutlined /> },
  passed: { label: '완료', color: 'success', icon: <CheckCircleOutlined /> },
  review: { label: '확인 필요', color: 'warning', icon: <WarningOutlined /> },
  warning: { label: '확인 필요', color: 'warning', icon: <WarningOutlined /> },
  blocked: { label: '미완료', color: 'error', icon: <ExclamationCircleOutlined /> },
  failed: { label: '실패', color: 'error', icon: <ExclamationCircleOutlined /> },
  waiting: { label: '대기', color: 'default', icon: <ClockCircleOutlined /> },
  pending: { label: '대기', color: 'default', icon: <ClockCircleOutlined /> },
  scheduled: { label: '예정', color: 'default', icon: <ClockCircleOutlined /> },
}

const RISK_META = {
  low: { label: '낮음', color: 'success' },
  medium: { label: '보통', color: 'warning' },
  high: { label: '높음', color: 'error' },
}

const ACTIVITY_FILTERS = [
  { key: 'all', label: '모든 활동' },
  { key: 'approval', label: '승인' },
  { key: 'security', label: '보안' },
  { key: 'rehearsal', label: '리허설' },
  { key: 'deployment', label: '운영 반영' },
  { key: 'comment', label: '댓글' },
]

function normalizeTransferStatus(status) {
  if (status === 'approved') return 'ready'
  if (status === 'reviewing') return 'review'
  return status ?? 'scheduled'
}

function statusMeta(status) {
  return TRANSFER_STATUS_META[normalizeTransferStatus(status)] ?? TRANSFER_STATUS_META.scheduled
}

function conditionMeta(status) {
  return CONDITION_META[status] ?? CONDITION_META.waiting
}

function fallbackDetail(transfer, mr, pipelineOverview) {
  const status = normalizeTransferStatus(transfer.status)
  const blocked = status === 'blocked' || transfer.securityStatus === 'blocked'
  const review = status === 'review' || transfer.securityStatus === 'warning' || transfer.pipelineStatus === 'running'
  const pipelineStatus = transfer.pipelineStatus === 'passed' ? 'completed' : transfer.pipelineStatus === 'running' ? 'review' : 'blocked'
  const securityStatus = transfer.securityStatus === 'passed' ? 'completed' : transfer.securityStatus === 'blocked' ? 'blocked' : 'review'

  return {
    ...transfer,
    title: transfer.title ?? mr?.title ?? transfer.deploymentPlan?.changeReason ?? transfer.id,
    environment: transfer.environment ?? transfer.targetEnvironment ?? 'Production',
    repositoryName: transfer.repositoryName,
    mrNumber: transfer.mrNumber ?? `!${transfer.mrId}`,
    pipelineNumber: transfer.pipelineNumber ?? `#${transfer.pipelineId}`,
    sourceBranch: transfer.sourceBranch ?? mr?.source ?? mr?.sourceBranch ?? 'feature/auth-policy',
    targetBranch: transfer.targetBranch ?? mr?.target ?? mr?.targetBranch ?? 'main',
    scheduledTime: transfer.scheduledTime ?? transfer.scheduledAt ?? '-',
    deployWindow: transfer.deployWindow ?? transfer.deploymentPlan?.window ?? '-',
    owners: transfer.owners ?? {
      developer: transfer.requestedBy ?? '-',
      operator: transfer.approvedBy ?? '-',
      security: '보안 담당자',
      approvers: [transfer.approvedBy ?? '-'],
    },
    summary: transfer.summary ?? {
      availability: statusMeta(status).label,
      currentStep: blocked ? '보안 점검' : review ? '리허설 검토' : '최종 승인 완료',
      blockers: blocked ? 1 : 0,
      riskLevel: transfer.riskLevel ?? 'medium',
      expectedDuration: '18분',
      expectedRollbackTime: '18분',
    },
    conditions: transfer.conditions ?? [
      { id: 'plan', title: '이관 계획서 작성', status: 'completed', description: transfer.deploymentPlan?.changeReason ?? '일정, 담당자, 작업 범위가 등록되었습니다.', action: '계획서 보기', owner: transfer.requestedBy ?? '-', completedAt: transfer.requestedAt ?? '-' },
      { id: 'rollback', title: '롤백 계획 등록', status: transfer.deploymentPlan?.rollbackPlan ? 'completed' : 'blocked', description: transfer.deploymentPlan?.rollbackPlan ?? '롤백 계획이 등록되지 않았어요.', action: '롤백 계획 보기', owner: transfer.approvedBy ?? '-', completedAt: transfer.updatedAt ?? '-' },
      { id: 'approval', title: '승인권자 승인', status: transfer.approvalStatus === 'approved' ? 'completed' : 'waiting', description: '필수 승인권자 승인 상태를 확인합니다.', action: '승인 요청 보내기', owner: transfer.approvedBy ?? '-', completedAt: transfer.updatedAt ?? '-' },
      { id: 'pipeline', title: 'Pipeline 성공', status: pipelineStatus, description: `연결된 Pipeline 상태는 ${transfer.pipelineStatus ?? '-'}입니다.`, action: 'Pipeline 보기', owner: transfer.requestedBy ?? '-', completedAt: transfer.updatedAt ?? '-' },
      { id: 'security', title: '보안 점검 완료', status: securityStatus, description: '보안 점검 결과를 확인해야 합니다.', action: '보안 결과 보기', owner: '보안 담당자', completedAt: '-' },
      { id: 'rehearsal', title: '리허설 결과 검토', status: review ? 'review' : 'completed', description: review ? '리허설 결과 확인이 필요합니다.' : '리허설 결과 검토가 완료되었습니다.', action: '리허설 결과 보기', owner: transfer.approvedBy ?? '-', completedAt: transfer.updatedAt ?? '-' },
      { id: 'impact', title: '운영 영향도 확인', status: blocked || review ? 'review' : 'completed', description: transfer.deploymentPlan?.impactScope ?? '운영 영향도를 확인합니다.', action: '영향도 보기', owner: transfer.requestedBy ?? '-', completedAt: '-' },
    ],
    steps: transfer.steps ?? [
      { step: 'STEP 01', title: '계획 수립', description: '일정, 담당자, 롤백 계획 등록 완료', status: 'completed' },
      { step: 'STEP 02', title: 'UAT 완료', description: '현업 인수 테스트 완료', status: 'completed' },
      { step: 'STEP 03', title: '보안 점검', description: blocked ? 'High 취약점 조치 필요' : '보안 점검 확인', status: blocked ? 'blocked' : securityStatus },
      { step: 'STEP 04', title: '리허설 검토', description: review ? '소요 시간 확인 중' : '리허설 검토 완료', status: review ? 'review' : 'completed' },
      { step: 'STEP 05', title: '최종 승인', description: transfer.approvalStatus === 'approved' ? '승인권자 확인 완료' : '승인권자 확인 대기', status: transfer.approvalStatus === 'approved' ? 'completed' : 'waiting' },
      { step: 'STEP 06', title: '운영 반영', description: 'Production 반영 예정', status: status === 'stabilizing' || status === 'completed' ? 'completed' : 'scheduled' },
      { step: 'STEP 07', title: '안정화', description: status === 'stabilizing' ? '안정화 모니터링 중' : '최종 반영 이후 모니터링 예정', status: status === 'stabilizing' ? 'review' : 'scheduled' },
    ],
    rehearsal: transfer.rehearsal ?? {
      status: review ? 'review' : 'completed',
      expectedDuration: transfer.summary?.expectedDuration ?? '18분',
      actualDuration: review ? '25분' : '18분',
      exceededBy: review ? '+7분' : '0분',
      errors: '0건',
      warnings: review ? '1건' : '0건',
      rollbackTime: transfer.summary?.expectedRollbackTime ?? '18분',
    },
    rollbackPlan: transfer.rollbackPlan ?? {
      owner: transfer.approvedBy ?? '-',
      expectedTime: transfer.summary?.expectedRollbackTime ?? '18분',
      condition: '배포 후 오류율 5% 이상 또는 핵심 API 장애 발생',
      summary: transfer.deploymentPlan?.rollbackPlan ?? '롤백 계획이 등록되지 않았어요.',
      backupStatus: transfer.deploymentPlan?.rollbackPlan ? '완료' : '미등록',
      finalReviewer: transfer.approvedBy ?? '-',
      steps: ['이전 버전으로 재배포합니다.', '필요 시 DB rollback script를 실행합니다.', '연계 시스템 상태를 재확인합니다.'],
    },
    impact: transfer.impact ?? {
      services: [transfer.repositoryName ?? transfer.repositoryId],
      apis: ['-'],
      hasDatabaseChange: false,
      integrations: ['-'],
      userImpact: transfer.deploymentPlan?.impactScope ?? '-',
      needsInspection: transfer.riskLevel === 'high',
    },
    changes: transfer.changes ?? {
      files: 0,
      added: 0,
      removed: 0,
      summary: [transfer.deploymentPlan?.changeReason ?? '운영 반영 변경사항을 확인합니다.'],
      filesChanged: [],
    },
    activities: transfer.activities?.map((activity, index) => ({
      id: `${transfer.id}-activity-${index}`,
      type: activity.type,
      title: `${activity.actor}님이 ${activity.message}`,
      timeText: activity.createdAt,
    })) ?? [],
    pipelineFailedJobs: pipelineOverview?.failedJobs ?? [],
  }
}

function getNextStep(status) {
  if (status === 'ready') {
    return {
      title: '모든 조건이 충족되었어요.',
      description: '운영 반영 요청을 진행할 수 있어요.',
      button: '운영 반영 요청',
    }
  }
  if (status === 'blocked') {
    return {
      title: '차단 항목을 해결해야 해요.',
      description: '보안 점검 미완료 항목을 먼저 해결해야 해요.',
      button: '차단 사유 보기',
    }
  }
  if (status === 'stabilizing') {
    return {
      title: '안정화 모니터링 중이에요.',
      description: '운영 반영 후 안정화 상태를 모니터링 중이에요.',
      button: '안정화 로그 보기',
    }
  }
  return {
    title: '확인이 필요한 항목이 있어요.',
    description: '리허설 결과와 승인 상태를 확인해 주세요.',
    button: '리허설 결과 확인',
  }
}

export default function DeploymentTransferDetail() {
  const { transferId, repositoryId } = useParams()
  const navigate = useNavigate()
  const auth = useAuth()
  const rawTransfer = getDeploymentTransferDetail(transferId)
  const [activityFilter, setActivityFilter] = useState('all')

  if (!rawTransfer) {
    return (
      <Result
        status="404"
        title="운영이관 요청을 찾을 수 없어요."
        subTitle="삭제되었거나 접근 권한이 없는 요청일 수 있어요."
        extra={<Button type="primary" onClick={() => navigate('/deployment-transfer')}>운영 대시보드로 이동</Button>}
      />
    )
  }

  const repository = getRepositoryDetail(rawTransfer.repositoryId)
  const mr = getMergeRequestDetail(rawTransfer.mrId)
  const pipelineOverview = getPipelineOverview(rawTransfer.pipelineId)
  const transfer = fallbackDetail(rawTransfer, mr, pipelineOverview)
  const status = normalizeTransferStatus(transfer.status)
  const meta = statusMeta(status)
  const base = repositoryId ? `/repositories/${repositoryId}` : `/repositories/${transfer.repositoryId}`
  const canRequestDeploy = auth.hasPermission('deployment:create-request')
  const deployDisabled = status === 'blocked' || !canRequestDeploy
  const blockers = transfer.summary?.blockers ?? transfer.conditions.filter((item) => item.status === 'blocked').length
  const filteredActivities = transfer.activities.filter((activity) => activityFilter === 'all' || activity.type === activityFilter)

  const requestDeployment = () => {
    if (status === 'blocked') {
      message.warning('차단 항목을 먼저 해결해야 운영 반영을 요청할 수 있어요.')
      return
    }
    Modal.confirm({
      title: '운영 반영을 요청할까요?',
      content: '선택한 MR의 변경사항을 Production 반영 절차로 진행합니다.',
      okText: '요청',
      cancelText: '취소',
      onOk: () => message.success('운영 반영 요청이 등록되었어요.'),
    })
  }

  const runAction = (label) => {
    if (label === '운영 반영 요청') requestDeployment()
    else if (label.includes('승인')) message.success('승인 요청을 보냈어요.')
    else if (label.includes('감사')) navigate('/audit')
    else message.info(`${label} 화면으로 이동합니다.`)
  }

  const overview = (
    <Row gutter={[24, 24]} align="top">
      <Col xs={24} xl={17}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <JudgementSummary transfer={transfer} meta={meta} blockers={blockers} />
          <ConditionsCard conditions={transfer.conditions.slice(0, 4)} compact onAction={runAction} />
          <StepsCard steps={transfer.steps} />
          <RiskCard transfer={transfer} />
        </Space>
      </Col>
      <Col xs={24} xl={7}>
        <SidePanel
          base={base}
          canRequestDeploy={canRequestDeploy}
          onAction={runAction}
          status={status}
          transfer={transfer}
        />
      </Col>
    </Row>
  )

  const tabItems = [
    { key: 'overview', label: 'Overview', children: overview },
    { key: 'conditions', label: '운영이관 조건', children: <ConditionsDetail conditions={transfer.conditions} onAction={runAction} /> },
    { key: 'pipeline', label: 'Pipeline', children: <PipelineTab base={base} transfer={transfer} pipelineOverview={pipelineOverview} /> },
    { key: 'rehearsal', label: '리허설', children: <RehearsalTab transfer={transfer} onAction={runAction} /> },
    { key: 'changes', label: '변경사항', children: <ChangesTab transfer={transfer} /> },
    { key: 'activity', label: 'Activity', children: <ActivityCard activities={filteredActivities} activityFilter={activityFilter} setActivityFilter={setActivityFilter} /> },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }} className="deployment-transfer-detail-page">
      <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
        <Space align="start">
          <Button icon={<GoBackOutlined />} onClick={() => navigate(-1)} />
          <div>
            <Space wrap>
              <Tag color="blue">운영이관 MR</Tag>
              <Tag color="purple">Production 반영 대상</Tag>
              <Tag>Deployment Transfer</Tag>
            </Space>
            <Title level={2}>{transfer.title}</Title>
            <Space wrap>
              <Tag color={meta.color}>{meta.label}</Tag>
              <Text>{repository?.name ?? transfer.repositoryName ?? transfer.repositoryId}</Text>
              <Text type="secondary">·</Text>
              <Link to={`${base}/merge-requests/${transfer.mrId}`}>MR {transfer.mrNumber}</Link>
              <Text type="secondary">·</Text>
              <Link to={`${base}/pipelines/${transfer.pipelineId}`}>Pipeline {transfer.pipelineNumber}</Link>
            </Space>
            <Space wrap className="deployment-transfer-detail-meta">
              <Text>{transfer.sourceBranch} → {transfer.targetBranch}</Text>
              <Text type="secondary">·</Text>
              <Text>{transfer.scheduledTime} 운영 반영 예정</Text>
              <Text type="secondary">·</Text>
              <Text>담당자: {ownerNames(transfer).join(' / ')}</Text>
            </Space>
          </div>
        </Space>
        <Space wrap>
          <Tooltip title={deployDisabled ? '차단 항목을 먼저 해결해야 운영 반영을 요청할 수 있어요.' : null}>
            <Button type="primary" disabled={deployDisabled} onClick={requestDeployment}>운영 반영 요청</Button>
          </Tooltip>
          {status === 'review' ? <Button type="primary" ghost onClick={() => runAction('승인 요청 보내기')}>승인 요청 보내기</Button> : null}
          <Button onClick={() => runAction(status === 'stabilizing' ? '안정화 모니터링 보기' : '리허설 결과 확인')}>
            {status === 'stabilizing' ? '안정화 모니터링 보기' : '리허설 결과 확인'}
          </Button>
          <Button onClick={() => runAction('롤백 계획 보기')}>롤백 계획 보기</Button>
          <Button onClick={() => runAction('감사 로그 보기')}>감사 로그 보기</Button>
        </Space>
      </Flex>

      <Tabs items={tabItems} />
    </Space>
  )
}

function ownerNames(transfer) {
  if (Array.isArray(transfer.owners)) return transfer.owners
  return [transfer.owners?.developer, transfer.owners?.security, transfer.owners?.operator].filter(Boolean)
}

function JudgementSummary({ transfer, meta, blockers }) {
  const availability = transfer.summary?.availability ?? meta.label
  return (
    <Card title="운영 반영 판단 요약">
      <Alert type={meta.alert} showIcon message={meta.message} className="deployment-transfer-alert" />
      <Descriptions column={{ xs: 1, md: 2, xl: 4 }} bordered size="small">
        <Descriptions.Item label="운영 반영 가능 여부"><Tag color={meta.color}>{availability}</Tag></Descriptions.Item>
        <Descriptions.Item label="현재 단계">{transfer.summary?.currentStep ?? transfer.currentStep ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="예정 반영 시간">{transfer.scheduledTime ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="차단 항목">{blockers}건</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

function ConditionsCard({ conditions, compact = false, onAction }) {
  if (!conditions.length) return <Empty description="표시할 운영이관 조건이 없어요." />

  return (
    <Card title="운영이관 필수 조건" extra={<Text type="secondary">운영 반영 전 반드시 충족되어야 하는 조건입니다.</Text>}>
      <Space direction="vertical" size={10} style={{ width: '100%' }}>
        {conditions.map((condition) => <ConditionItem key={condition.id ?? condition.title} condition={condition} compact={compact} onAction={onAction} />)}
      </Space>
    </Card>
  )
}

function ConditionItem({ condition, compact, onAction }) {
  const meta = conditionMeta(condition.status)
  return (
    <Card size="small" className={`deployment-condition-item deployment-condition-item-${condition.status}`}>
      <Flex justify="space-between" gap={12} align="flex-start" wrap="wrap">
        <Space align="start">
          {meta.icon}
          <Space direction="vertical" size={3}>
            <Text strong>{condition.title}</Text>
            <Text type="secondary">{condition.description}</Text>
            {!compact ? (
              <Space wrap>
                <Text type="secondary">담당자 {condition.owner ?? '-'}</Text>
                <Text type="secondary">완료 시간 {condition.completedAt ?? '-'}</Text>
              </Space>
            ) : null}
          </Space>
        </Space>
        <Space>
          <Tag color={meta.color}>{meta.label}</Tag>
          <Button size="small" onClick={() => onAction(condition.action ?? condition.title)}>{condition.action ?? '자세히 보기'}</Button>
        </Space>
      </Flex>
    </Card>
  )
}

function ConditionsDetail({ conditions, onAction }) {
  if (!conditions.length) return <Empty description="표시할 운영이관 조건이 없어요." />

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <ConditionsCard conditions={conditions} onAction={onAction} />
      <Collapse
        items={conditions.map((condition) => ({
          key: condition.id ?? condition.title,
          label: condition.title,
          children: (
            <Descriptions column={{ xs: 1, md: 3 }} size="small">
              <Descriptions.Item label="상태"><Tag color={conditionMeta(condition.status).color}>{conditionMeta(condition.status).label}</Tag></Descriptions.Item>
              <Descriptions.Item label="담당자">{condition.owner ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="완료 시간">{condition.completedAt ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="설명" span={3}>{condition.description}</Descriptions.Item>
            </Descriptions>
          ),
        }))}
      />
    </Space>
  )
}

function StepsCard({ steps }) {
  return (
    <Card title="운영이관 진행 단계">
      <Row gutter={[12, 12]}>
        {steps.map((step) => {
          const meta = conditionMeta(step.status)
          return (
            <Col xs={24} sm={12} xl={8} key={step.step}>
              <Card size="small" className={`deployment-transfer-step-card deployment-transfer-step-card-${step.status}`}>
                <Space direction="vertical" size={6}>
                  <Text type="secondary">{step.step}</Text>
                  <Text strong>{step.title}</Text>
                  <Text type="secondary">{step.description}</Text>
                  <Tag color={meta.color}>{meta.label === '미완료' ? '차단' : meta.label}</Tag>
                </Space>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Card>
  )
}

function RiskCard({ transfer }) {
  const blocked = transfer.conditions.filter((condition) => ['blocked', 'failed'].includes(condition.status))
  const review = transfer.conditions.filter((condition) => condition.status === 'review')
  return (
    <Card title="주요 리스크">
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Tag color={RISK_META[transfer.summary?.riskLevel ?? transfer.riskLevel]?.color}>
          위험도 {RISK_META[transfer.summary?.riskLevel ?? transfer.riskLevel]?.label ?? '-'}
        </Tag>
        {blocked.concat(review).length ? blocked.concat(review).map((condition) => (
          <Alert
            key={condition.id}
            type={condition.status === 'blocked' ? 'error' : 'warning'}
            showIcon
            message={condition.title}
            description={condition.description}
          />
        )) : <Alert type="success" showIcon message="운영 반영을 막는 주요 리스크가 없어요." />}
      </Space>
    </Card>
  )
}

function PipelineTab({ base, transfer, pipelineOverview }) {
  const failedJobs = pipelineOverview?.failedJobs ?? []
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={10}>
        <Card title="연결된 Pipeline">
          <Descriptions column={1}>
            <Descriptions.Item label="Pipeline"><Link to={`${base}/pipelines/${transfer.pipelineId}`}>{transfer.pipelineNumber}</Link></Descriptions.Item>
            <Descriptions.Item label="상태"><Tag color={transfer.pipelineStatus === 'passed' ? 'success' : transfer.pipelineStatus === 'failed' ? 'error' : 'processing'}>{transfer.pipelineStatus ?? '-'}</Tag></Descriptions.Item>
            <Descriptions.Item label="Failed Jobs">{pipelineOverview?.summary?.failedJobs ?? failedJobs.length}</Descriptions.Item>
            <Descriptions.Item label="Duration">{pipelineOverview?.summary?.duration ?? '-'}</Descriptions.Item>
          </Descriptions>
          <Button type="primary" onClick={() => message.info('Pipeline 상세 화면으로 이동합니다.')}>
            <Link to={`${base}/pipelines/${transfer.pipelineId}`}>Pipeline 상세 화면으로 이동</Link>
          </Button>
        </Card>
      </Col>
      <Col xs={24} xl={14}>
        <Card title="Failed Job">
          {failedJobs.length ? (
            <Table
              rowKey={(job) => job.routeId ?? job.id ?? job.name}
              dataSource={failedJobs}
              pagination={false}
              columns={[
                { title: 'Job', dataIndex: 'name', render: (value, job) => <Link to={`${base}/pipelines/${transfer.pipelineId}/jobs/${encodeURIComponent(job.routeId ?? job.id ?? job.name)}`}>{value}</Link> },
                { title: 'Stage', dataIndex: 'stage' },
                { title: 'Status', dataIndex: 'status', render: (value) => <Tag color="error">{value}</Tag> },
                { title: 'Runner', dataIndex: 'runner' },
              ]}
            />
          ) : (
            <Empty description="실패한 Job이 없어요." />
          )}
        </Card>
      </Col>
    </Row>
  )
}

function RehearsalTab({ transfer, onAction }) {
  const rehearsal = transfer.rehearsal
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={12}>
        <Card title="리허설 결과">
          {rehearsal.status === 'review' ? (
            <Alert type="warning" showIcon message="리허설 시간이 예상보다 초과되었어요. 운영 영향도를 재검토해 주세요." className="deployment-transfer-alert" />
          ) : null}
          <Descriptions column={{ xs: 1, md: 2 }} bordered size="small">
            <Descriptions.Item label="리허설 상태"><Tag color={conditionMeta(rehearsal.status).color}>{conditionMeta(rehearsal.status).label}</Tag></Descriptions.Item>
            <Descriptions.Item label="예상 소요 시간">{rehearsal.expectedDuration}</Descriptions.Item>
            <Descriptions.Item label="실제 소요 시간">{rehearsal.actualDuration}</Descriptions.Item>
            <Descriptions.Item label="초과 시간">{rehearsal.exceededBy}</Descriptions.Item>
            <Descriptions.Item label="오류 수">{rehearsal.errors}</Descriptions.Item>
            <Descriptions.Item label="경고 수">{rehearsal.warnings}</Descriptions.Item>
            <Descriptions.Item label="롤백 예상 시간">{rehearsal.rollbackTime}</Descriptions.Item>
          </Descriptions>
          <Space wrap className="deployment-transfer-actions">
            <Button onClick={() => onAction('리허설 로그 보기')}>리허설 로그 보기</Button>
            <Button onClick={() => onAction('재리허설 요청')}>재리허설 요청</Button>
            <Button type="primary" onClick={() => onAction('리허설 결과 승인')}>리허설 결과 승인</Button>
          </Space>
        </Card>
      </Col>
      <Col xs={24} xl={12}>
        <RollbackPlanCard rollbackPlan={transfer.rollbackPlan} />
      </Col>
    </Row>
  )
}

function RollbackPlanCard({ rollbackPlan }) {
  if (!rollbackPlan) return <Alert type="warning" showIcon message="롤백 계획이 등록되지 않았어요." />

  return (
    <Card title="롤백 계획">
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="롤백 담당자">{rollbackPlan.owner}</Descriptions.Item>
        <Descriptions.Item label="예상 롤백 시간">{rollbackPlan.expectedTime}</Descriptions.Item>
        <Descriptions.Item label="롤백 조건">{rollbackPlan.condition}</Descriptions.Item>
        <Descriptions.Item label="절차">{rollbackPlan.summary}</Descriptions.Item>
        <Descriptions.Item label="백업 상태">{rollbackPlan.backupStatus}</Descriptions.Item>
        <Descriptions.Item label="최종 확인자">{rollbackPlan.finalReviewer}</Descriptions.Item>
      </Descriptions>
      <Collapse
        className="deployment-transfer-collapse"
        items={[{
          key: 'rollback-steps',
          label: '상세 절차',
          children: (
            <Space direction="vertical">
              {(rollbackPlan.steps ?? [rollbackPlan.summary]).map((step) => <Text key={step}>{step}</Text>)}
            </Space>
          ),
        }]}
      />
    </Card>
  )
}

function ChangesTab({ transfer }) {
  const impact = transfer.impact
  const changes = transfer.changes
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={10}>
        <Card title="변경 영향도">
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="영향 서비스">{impact.services.join(', ')}</Descriptions.Item>
            <Descriptions.Item label="영향 API">{impact.apis.join(', ')}</Descriptions.Item>
            <Descriptions.Item label="DB 변경 여부">{impact.hasDatabaseChange ? <Tag color="warning">있음</Tag> : '없음'}</Descriptions.Item>
            <Descriptions.Item label="연계 시스템">{impact.integrations.join(', ')}</Descriptions.Item>
            <Descriptions.Item label="사용자 영향">{impact.userImpact}</Descriptions.Item>
            <Descriptions.Item label="점검 필요 여부">{impact.needsInspection ? <Tag color="warning">필요</Tag> : '불필요'}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col xs={24} xl={14}>
        <Card title="변경사항">
          <Descriptions column={{ xs: 1, md: 3 }} size="small" className="deployment-transfer-change-summary">
            <Descriptions.Item label="변경 파일 수">{changes.files}</Descriptions.Item>
            <Descriptions.Item label="추가">{changes.added}</Descriptions.Item>
            <Descriptions.Item label="삭제">{changes.removed}</Descriptions.Item>
          </Descriptions>
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            {changes.summary.map((item) => <Alert key={item} type="info" showIcon message={item} />)}
            <Table
              rowKey="path"
              dataSource={changes.filesChanged}
              pagination={false}
              locale={{ emptyText: <Empty description="표시할 변경 파일이 없어요." /> }}
              columns={[
                { title: 'File', dataIndex: 'path' },
                { title: '변경', dataIndex: 'changeType', width: 100 },
                { title: '영향', dataIndex: 'impact' },
              ]}
            />
          </Space>
        </Card>
      </Col>
    </Row>
  )
}

function ActivityCard({ activities, activityFilter, setActivityFilter }) {
  return (
    <Card title="Activity">
      <Tabs
        activeKey={activityFilter}
        onChange={setActivityFilter}
        items={ACTIVITY_FILTERS.map((filter) => ({ key: filter.key, label: filter.label }))}
      />
      {activities.length ? (
        <Timeline
          items={activities.map((activity) => ({
            dot: activity.type === 'security' ? <SafetyCertificateOutlined /> : activity.type === 'deployment' ? <RocketOutlined /> : <AuditOutlined />,
            children: (
              <Space direction="vertical" size={2}>
                <Space wrap>
                  <Tag>{activity.type}</Tag>
                  <Text strong>{activity.title}</Text>
                </Space>
                <Text type="secondary">{activity.timeText}</Text>
              </Space>
            ),
          }))}
        />
      ) : (
        <Empty description="표시할 활동 내역이 없어요." />
      )}
    </Card>
  )
}

function SidePanel({ base, canRequestDeploy, onAction, status, transfer }) {
  const nextStep = getNextStep(status)
  const owners = transfer.owners ?? {}

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }} className="deployment-transfer-side-panel">
      <Card title="Next Step">
        <Space direction="vertical" size={10}>
          <Text strong>{nextStep.title}</Text>
          <Text type="secondary">{nextStep.description}</Text>
          <Button type="primary" disabled={!canRequestDeploy && nextStep.button === '운영 반영 요청'} onClick={() => onAction(nextStep.button)}>
            {nextStep.button}
          </Button>
        </Space>
      </Card>
      <Card title="담당자">
        <Descriptions column={1} size="small">
          <Descriptions.Item label="개발 담당자">{owners.developer ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="운영 담당자">{owners.operator ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="보안 담당자">{owners.security ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="승인권자">{owners.approvers?.join(', ') ?? '-'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="연결 정보">
        <Descriptions column={1} size="small">
          <Descriptions.Item label="Repository"><Link to={base}>{transfer.repositoryName ?? transfer.repositoryId}</Link></Descriptions.Item>
          <Descriptions.Item label="MR"><Link to={`${base}/merge-requests/${transfer.mrId}`}>{transfer.mrNumber}</Link></Descriptions.Item>
          <Descriptions.Item label="Pipeline"><Link to={`${base}/pipelines/${transfer.pipelineId}`}>{transfer.pipelineNumber}</Link></Descriptions.Item>
          <Descriptions.Item label="Source Branch">{transfer.sourceBranch}</Descriptions.Item>
          <Descriptions.Item label="Target Branch">{transfer.targetBranch}</Descriptions.Item>
          <Descriptions.Item label="운영 환경">{transfer.environment}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="예정 정보">
        <Descriptions column={1} size="small">
          <Descriptions.Item label="반영 예정 시간">{transfer.scheduledTime}</Descriptions.Item>
          <Descriptions.Item label="배포 윈도우">{transfer.deployWindow}</Descriptions.Item>
          <Descriptions.Item label="예상 소요 시간">{transfer.summary?.expectedDuration ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="예상 롤백 시간">{transfer.summary?.expectedRollbackTime ?? transfer.rollbackPlan?.expectedTime ?? '-'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="내부 연계 옵션">
        <Space wrap>
          <Button onClick={() => onAction('감사 로그 보기')}>감사 로그</Button>
          <Button onClick={() => onAction('운영 정책 보기')}>운영 정책</Button>
          <Button onClick={() => onAction('알림 내역 보기')}>알림 내역</Button>
          <Button onClick={() => onAction('롤백 계획 보기')}>롤백 계획</Button>
        </Space>
      </Card>
    </Space>
  )
}
