import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  WarningOutlined,
} from '../components/icons'
import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Flex,
  Row,
  Segmented,
  Space,
  Table,
  Tag,
  Timeline,
  Typography,
  message,
} from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getDeploymentTransferDashboard,
} from '../api/deploymentTransfers'
import { getRepositories } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { DataTable, PageHeader, StatusTag } from '../components/common'
import { UI_TEXT } from '../constants'

const { Paragraph, Text, Title } = Typography

const TRANSFER_STATUS_META = {
  ready: { label: '운영 반영 가능', color: 'success' },
  review: { label: '확인 필요', color: 'warning' },
  blocked: { label: '운영 반영 불가', color: 'error' },
  stabilizing: { label: '안정화 중', color: 'processing' },
  scheduled: { label: '예정', color: 'default' },
  completed: { label: '완료', color: 'success' },
}

const RISK_META = {
  low: { label: '낮음', color: 'success' },
  medium: { label: '보통', color: 'warning' },
  high: { label: '높음', color: 'error' },
}

const CHECK_META = {
  completed: { label: '완료', color: 'success', icon: <CheckCircleOutlined /> },
  review: { label: '확인 필요', color: 'warning', icon: <WarningOutlined /> },
  blocked: { label: '미완료', color: 'error', icon: <ExclamationCircleOutlined /> },
  waiting: { label: '대기', color: 'default', icon: <ClockCircleOutlined /> },
  scheduled: { label: '예정', color: 'default', icon: <ClockCircleOutlined /> },
}

const TIMELINE_META = {
  completed: { label: '완료', color: 'success' },
  warning: { label: '확인 필요', color: 'warning' },
  waiting: { label: '대기', color: 'processing' },
  scheduled: { label: '예정', color: 'default' },
}

const FILTERS = [
  { label: '전체', value: 'all' },
  { label: '운영 반영 가능', value: 'ready' },
  { label: '확인 필요', value: 'review' },
  { label: '차단됨', value: 'blocked' },
  { label: '안정화 중', value: 'stabilizing' },
]

export function DeploymentTransferTable({ transfers, repositoryScoped = false, repositoryId }) {
  const navigate = useNavigate()
  const repoMap = new Map(getRepositories().map((repo) => [repo.id, repo]))
  const detailPath = (record) => repositoryScoped ? `/repositories/${repositoryId}/deployment-transfer/${record.id}` : `/deployment-transfer/${record.id}`
  const columns = [
    { title: 'Transfer ID', dataIndex: 'id', render: (id, record) => <Link to={detailPath(record)}>{id}</Link> },
    !repositoryScoped ? { title: UI_TEXT.common.repository, dataIndex: 'repositoryId', render: (value) => <Link to={`/repositories/${value}`}>{repoMap.get(value)?.name ?? value}</Link> } : null,
    { title: 'Merge Request', dataIndex: 'mrId', render: (mrId, record) => <Link to={`/repositories/${record.repositoryId}/merge-requests/${mrId}`}>!{mrId}</Link> },
    { title: 'Target environment', dataIndex: 'targetEnvironment', render: (value) => <Text code>{value}</Text> },
    { title: UI_TEXT.common.status, dataIndex: 'status', render: (value) => <StatusTag status={value} /> },
    { title: 'Approval status', dataIndex: 'approvalStatus', render: (value) => <StatusTag status={value} /> },
    { title: 'Pipeline status', dataIndex: 'pipelineStatus', render: (value, record) => <Link to={`/repositories/${record.repositoryId}/pipelines/${record.pipelineId}`}><StatusTag status={value} /></Link> },
    { title: 'Security status', dataIndex: 'securityStatus', render: (value, record) => <Link to={`/security/${record.securityId}`}><StatusTag status={value} /></Link> },
    { title: 'Requested by', dataIndex: 'requestedBy' },
    { title: 'Approved by', dataIndex: 'approvedBy' },
    { title: 'Scheduled at', dataIndex: 'scheduledAt' },
    { title: 'Updated at', dataIndex: 'updatedAt' },
    { title: UI_TEXT.actions.view, key: 'actions', fixed: 'right', render: (_, record) => <Button size="small" onClick={() => navigate(detailPath(record))}>{UI_TEXT.actions.view}</Button> },
  ].filter(Boolean)

  return <DataTable rowKey="id" dataSource={transfers} columns={columns} />
}

export default function DeploymentTransferList() {
  const navigate = useNavigate()
  const auth = useAuth()
  const dashboard = getDeploymentTransferDashboard()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedRequestId, setSelectedRequestId] = useState(dashboard.defaultSelectedRequestId)
  const requests = dashboard.requests
  const filteredRequests = requests.filter((request) => activeFilter === 'all' || request.status === activeFilter)
  const selectedRequest = requests.find((request) => request.id === selectedRequestId) ?? requests[0] ?? null
  const selectedDetail = selectedRequest ? dashboard.requestDetails[selectedRequest.id] ?? createFallbackDetail(selectedRequest) : null
  const blockedChecklistCount = selectedDetail?.checklist?.filter((item) => item.status === 'blocked').length ?? 0

  const handleRiskClick = (risk) => {
    if (risk.requestId && requests.some((request) => request.id === risk.requestId)) {
      setSelectedRequestId(risk.requestId)
      message.info('관련 운영이관 요청을 선택했어요.')
      return
    }
    message.info('관련 운영이관 요청을 확인합니다.')
  }

  const columns = [
    {
      title: '이관명',
      dataIndex: 'title',
      render: (value, record) => (
        <Space direction="vertical" size={2}>
          <Link
            to={`/deployment-transfer/${record.id}`}
            onClick={(event) => event.stopPropagation()}
          >
            <Text strong>{value}</Text>
          </Link>
          <Text type="secondary">운영 환경: {record.environment}</Text>
        </Space>
      ),
    },
    {
      title: 'Repository / MR',
      key: 'repository',
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Text>{record.repositoryName}</Text>
          <Space size={4}>
            <Link
              to={`/repositories/${record.repositoryId}/merge-requests/${record.mrId}`}
              onClick={(event) => event.stopPropagation()}
            >
              MR {record.mrNumber}
            </Link>
            <Text type="secondary">·</Text>
            <Link
              to={`/repositories/${record.repositoryId}/pipelines/${record.pipelineId}`}
              onClick={(event) => event.stopPropagation()}
            >
              Pipeline {record.pipelineNumber}
            </Link>
          </Space>
        </Space>
      ),
    },
    { title: '예정 시간', dataIndex: 'scheduledTime', width: 130 },
    { title: '담당자', dataIndex: 'owners', width: 150, render: (owners) => owners.join(' / ') },
    { title: '현재 단계', dataIndex: 'currentStep', width: 130 },
    {
      title: '위험도',
      dataIndex: 'riskLevel',
      width: 100,
      render: (value) => <Tag color={RISK_META[value]?.color}>{RISK_META[value]?.label ?? value}</Tag>,
    },
    {
      title: '상태',
      dataIndex: 'status',
      width: 140,
      render: (value) => <Tag color={TRANSFER_STATUS_META[value]?.color}>{TRANSFER_STATUS_META[value]?.label ?? value}</Tag>,
    },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }} className="deployment-dashboard-page">
      <PageHeader
        title={(
          <>
            운영 반영 가능 여부를
            <br />
            한눈에 판단하세요
          </>
        )}
        description="운영이관 계획, 승인, 검증, 리허설, 롤백, 안정화 상태를 하나의 흐름으로 확인합니다."
        actions={[
          <Button key="audit" onClick={() => navigate('/audit')}>감사 로그 보기</Button>,
          auth.hasPermission('deployment:create-request') ? (
            <Button key="new" type="primary" icon={<PlusOutlined />} onClick={() => navigate('/deployment-transfer/new')}>
              운영이관 요청
            </Button>
          ) : null,
        ].filter(Boolean)}
      />

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} xl={6}>
          <DashboardSummaryCard title="오늘 예정된 운영이관" value={dashboard.summary.scheduledToday} description="23:00 배포 윈도우에 집중되어 있습니다." tag="일정 정상" color="success" />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <DashboardSummaryCard title="운영 반영 가능" value={dashboard.summary.ready} description="필수 조건이 모두 충족되었습니다." tag="즉시 진행 가능" color="success" />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <DashboardSummaryCard title="확인 필요" value={dashboard.summary.needsReview} description="리허설 결과와 승인 상태 확인이 필요합니다." tag="담당자 확인 필요" color="warning" />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <DashboardSummaryCard title="운영 반영 불가" value={dashboard.summary.blocked} description="보안 점검 미완료로 차단되었습니다." tag="차단 항목 존재" color="error" />
        </Col>
      </Row>

      <Row gutter={[16, 16]} align="stretch">
        <Col xs={24} xl={14}>
          <Card title="오늘의 운영이관 타임라인" extra={<Badge status="processing" text="오늘 21:00 - 01:00" />} className="deployment-dashboard-card">
            <Paragraph type="secondary">사전 점검부터 안정화 모니터링까지 시간대별 진행 상태입니다.</Paragraph>
            <Timeline
              items={dashboard.timeline.map((item) => ({
                color: TIMELINE_META[item.status]?.color,
                children: (
                  <Flex justify="space-between" gap={12} wrap="wrap">
                    <Space direction="vertical" size={2}>
                      <Text strong>{item.time} · {item.title}</Text>
                      <Text type="secondary">{item.description}</Text>
                    </Space>
                    <Tag color={TIMELINE_META[item.status]?.color}>{TIMELINE_META[item.status]?.label}</Tag>
                  </Flex>
                ),
              }))}
            />
          </Card>
        </Col>
        <Col xs={24} xl={10}>
          <Card title="차단 사유 및 리스크" extra={<Badge count={dashboard.risks.length} overflowCount={99} />} className="deployment-dashboard-card">
            <Paragraph type="secondary">운영 반영 전 반드시 해결해야 하는 항목입니다.</Paragraph>
            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              {dashboard.risks.map((risk) => (
                <Card key={risk.id} size="small" hoverable className="deployment-risk-card" onClick={() => handleRiskClick(risk)}>
                  <Flex justify="space-between" gap={12} align="flex-start">
                    <Space direction="vertical" size={4}>
                      <Text strong>{risk.title}</Text>
                      <Text type="secondary">{risk.description}</Text>
                    </Space>
                    <Tag color={risk.status === 'blocked' ? 'error' : risk.status === 'review' ? 'warning' : 'default'}>
                      {risk.status === 'blocked' ? '차단' : risk.status === 'review' ? '확인' : '대기'}
                    </Tag>
                  </Flex>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="운영이관 요청 목록" extra={<Badge count={requests.length} showZero overflowCount={99} />} className="deployment-dashboard-card">
        <Paragraph type="secondary">Repository, Merge Request, Pipeline과 연결된 운영이관 현황입니다.</Paragraph>
        <Segmented options={FILTERS} value={activeFilter} onChange={setActiveFilter} className="deployment-status-filter" />
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredRequests}
          pagination={{ pageSize: 7, showSizeChanger: false }}
          onRow={(record) => ({
            onClick: () => setSelectedRequestId(record.id),
          })}
          rowClassName={(record) => record.id === selectedRequest?.id ? 'deployment-transfer-row-selected' : ''}
          locale={{
            emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={requests.length ? '조건에 맞는 운영이관 요청이 없어요.' : '예정된 운영이관 요청이 없어요.'} />,
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      {selectedRequest && selectedDetail ? (
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={10}>
            <ChecklistCard request={selectedRequest} detail={selectedDetail} blockedCount={blockedChecklistCount} />
          </Col>
          <Col xs={24} xl={14}>
            <ProgressCard detail={selectedDetail} />
          </Col>
        </Row>
      ) : (
        <Card>
          <Empty description="선택된 운영이관 요청이 없어요." />
        </Card>
      )}
    </Space>
  )
}

function DashboardSummaryCard({ title, value, description, tag, color }) {
  return (
    <Card className="deployment-summary-card">
      <Flex align="flex-start" justify="space-between" gap={12}>
        <Space direction="vertical" size={6}>
          <Text type="secondary">{title}</Text>
          <Title level={2}>{value}</Title>
          <Text type="secondary">{description}</Text>
        </Space>
        <Tag color={color}>{tag}</Tag>
      </Flex>
    </Card>
  )
}

function ChecklistCard({ request, detail, blockedCount }) {
  return (
    <Card title="선택된 이관 준비 체크리스트" extra={<Badge count={blockedCount} showZero overflowCount={99} />} className="deployment-dashboard-card">
      <Paragraph type="secondary">{request.repositoryName} · MR {request.mrNumber} 기준</Paragraph>
      <Space direction="vertical" size={10} style={{ width: '100%' }}>
        {detail.checklist.map((item) => {
          const meta = CHECK_META[item.status] ?? CHECK_META.waiting
          return (
            <Card key={item.title} size="small" className="deployment-check-item">
              <Flex justify="space-between" align="center" gap={12}>
                <Space>
                  {meta.icon}
                  <Text>{item.title}</Text>
                </Space>
                <Tag color={meta.color}>{meta.label}</Tag>
              </Flex>
            </Card>
          )
        })}
      </Space>
    </Card>
  )
}

function ProgressCard({ detail }) {
  return (
    <Card title="단계별 진행 상태" className="deployment-dashboard-card">
      <Paragraph type="secondary">운영이관 요청부터 안정화 완료까지의 현재 흐름입니다.</Paragraph>
      <Row gutter={[12, 12]}>
        {detail.steps.map((step) => {
          const meta = CHECK_META[step.status] ?? CHECK_META.waiting
          return (
            <Col xs={24} sm={12} xl={8} key={step.step}>
              <Card size="small" className={`deployment-step-card deployment-step-card-${step.status}`}>
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
      <Descriptions column={{ xs: 1, md: 3 }} size="small" className="deployment-progress-metrics">
        <Descriptions.Item label="최근 오류 로그">{detail.metrics.recentErrors}</Descriptions.Item>
        <Descriptions.Item label="연계 시스템 상태">{detail.metrics.integrationStatus}</Descriptions.Item>
        <Descriptions.Item label="예상 롤백 시간">{detail.metrics.expectedRollbackTime}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

function createFallbackDetail(request) {
  const blocked = request.status === 'blocked'
  const review = request.status === 'review'

  return {
    checklist: [
      { title: '이관 계획서 작성', status: 'completed' },
      { title: '롤백 계획 등록', status: 'completed' },
      { title: '리허설 결과 검토', status: review ? 'review' : 'completed' },
      { title: '보안 점검 완료', status: blocked ? 'blocked' : 'completed' },
      { title: '승인권자 승인', status: request.status === 'ready' ? 'completed' : 'waiting' },
    ],
    steps: [
      { step: 'STEP 01', title: '계획 수립', description: '일정, 담당자, 롤백 계획 등록 완료', status: 'completed' },
      { step: 'STEP 02', title: 'UAT 완료', description: '현업 인수 테스트 완료', status: 'completed' },
      { step: 'STEP 03', title: '보안 점검', description: blocked ? 'High 취약점 조치 필요' : '보안 점검 통과', status: blocked ? 'blocked' : 'completed' },
      { step: 'STEP 04', title: '리허설 검토', description: review ? '소요 시간 초과 확인 중' : '예정 시간 내 완료', status: review ? 'review' : 'completed' },
      { step: 'STEP 05', title: '안정화', description: '최종 이관 이후 모니터링 예정', status: request.status === 'stabilizing' ? 'review' : 'scheduled' },
    ],
    metrics: {
      recentErrors: '0건',
      integrationStatus: '정상',
      expectedRollbackTime: '18분',
    },
  }
}
