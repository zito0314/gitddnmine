import { AuditOutlined, CheckCircleOutlined, ClockCircleOutlined, RocketOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { Card, Col, Descriptions, List, Progress, Row, Space, Timeline, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { getDeploymentTransferDetail } from '../api/deploymentTransfers'
import { getMergeRequestDetail } from '../api/mergeRequests'
import { getPipelineOverview } from '../api/pipelines'
import { getRepositoryDetail } from '../api/repositories'
import { getSecurityValidationById } from '../api/security'
import { PageHeader, StatusTag, SummaryCard } from '../components/common'
import { NOT_FOUND_MESSAGES } from '../constants'

const { Text, Title } = Typography

function percent(transfer) {
  const passed = transfer.gates.filter((gate) => gate.status === 'passed').length
  return Math.round((passed / transfer.gates.length) * 100)
}

export default function DeploymentTransferDetail() {
  const { transferId, repositoryId } = useParams()
  const transfer = getDeploymentTransferDetail(transferId)

  if (!transfer) return <Card><Title level={3}>{NOT_FOUND_MESSAGES.deploymentTransfer}</Title></Card>

  const repository = getRepositoryDetail(transfer.repositoryId)
  const mr = getMergeRequestDetail(transfer.mrId)
  const pipelineOverview = getPipelineOverview(transfer.pipelineId)
  const security = getSecurityValidationById(transfer.securityId)
  const base = repositoryId ? `/repositories/${repositoryId}` : `/repositories/${transfer.repositoryId}`
  const transferBase = repositoryId ? `${base}/deployment-transfer` : '/deployment-transfer'

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader eyebrow={repository?.name} title={transfer.id} description="운영이관 요청의 승인, 검증, 배포 계획, Audit 이력을 확인합니다." />
      <Card>
        <Descriptions column={{ xs: 1, md: 2, xl: 3 }} bordered>
          <Descriptions.Item label="Transfer ID"><Link to={`${transferBase}/${transfer.id}`}>{transfer.id}</Link></Descriptions.Item>
          <Descriptions.Item label="Status"><StatusTag status={transfer.status} /></Descriptions.Item>
          <Descriptions.Item label="Repository"><Link to={base}>{repository?.name}</Link></Descriptions.Item>
          <Descriptions.Item label="MR title"><Link to={`${base}/merge-requests/${transfer.mrId}`}>{mr?.title ?? `!${transfer.mrId}`}</Link></Descriptions.Item>
          <Descriptions.Item label="Target environment">{transfer.targetEnvironment}</Descriptions.Item>
          <Descriptions.Item label="Requested by">{transfer.requestedBy}</Descriptions.Item>
          <Descriptions.Item label="Approved by">{transfer.approvedBy}</Descriptions.Item>
          <Descriptions.Item label="Requested at">{transfer.requestedAt}</Descriptions.Item>
          <Descriptions.Item label="Scheduled at">{transfer.scheduledAt}</Descriptions.Item>
          <Descriptions.Item label="Policy decision">{transfer.policyDecision}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Approval Progress" value={percent(transfer)} suffix="%" icon={<CheckCircleOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Pipeline" value={transfer.pipelineStatus} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Security" value={transfer.securityStatus} tone={transfer.securityStatus === 'blocked' ? 'danger' : 'default'} icon={<SafetyCertificateOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Deployment Window" value={transfer.deploymentPlan.window} icon={<ClockCircleOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Risk Level" value={transfer.riskLevel} tone={transfer.riskLevel === 'high' ? 'danger' : 'warning'} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Audit Events" value={transfer.activities.length} icon={<AuditOutlined />} /></Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card title="Deployment Gate Checklist">
            <List dataSource={transfer.gates} renderItem={(gate) => <List.Item><Space><StatusTag status={gate.status} />{gate.label}</Space></List.Item>} />
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title="Approval Flow">
            <List dataSource={transfer.approvers} renderItem={(item) => <List.Item><List.Item.Meta title={<Space><Text strong>{item.role}</Text><StatusTag status={item.status} /></Space>} description={item.name} /></List.Item>} />
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Related Merge Request">
            <Descriptions column={1}>
              <Descriptions.Item label="MR ID"><Link to={`${base}/merge-requests/${transfer.mrId}`}>!{transfer.mrId}</Link></Descriptions.Item>
              <Descriptions.Item label="Title">{mr?.title}</Descriptions.Item>
              <Descriptions.Item label="Review"><StatusTag status={mr?.review} label={mr?.reviewLabel} /></Descriptions.Item>
              <Descriptions.Item label="Approval"><Progress percent={mr ? Math.round((mr.approved / mr.required) * 100) : 0} size="small" /></Descriptions.Item>
              <Descriptions.Item label="Pipeline"><StatusTag status={mr?.pipeline} /></Descriptions.Item>
              <Descriptions.Item label="Security"><StatusTag status={mr?.security} label={mr?.securityLabel} /></Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Related Pipeline">
            <Descriptions column={1}>
              <Descriptions.Item label="Pipeline ID"><Link to={`${base}/pipelines/${transfer.pipelineId}`}>#{transfer.pipelineId}</Link></Descriptions.Item>
              <Descriptions.Item label="Status"><StatusTag status={transfer.pipelineStatus} /></Descriptions.Item>
              <Descriptions.Item label="Failed jobs">{pipelineOverview?.summary.failedJobs ?? 0}</Descriptions.Item>
              <Descriptions.Item label="Duration">{pipelineOverview?.summary.duration ?? '-'}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Related Security Validation">
            <Descriptions column={1}>
              <Descriptions.Item label="Security ID"><Link to={`/security/${transfer.securityId}`}>{transfer.securityId}</Link></Descriptions.Item>
              <Descriptions.Item label="Policy"><StatusTag status={security?.policy ?? transfer.securityStatus} label={security?.policyLabel ?? transfer.securityStatus} /></Descriptions.Item>
              <Descriptions.Item label="Critical / High / Medium / Low">{security ? `${security.severity.critical} / ${security.severity.high} / ${security.severity.medium} / ${security.severity.low}` : '-'}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title="Deployment Plan">
            <Descriptions column={1}>
              <Descriptions.Item label="Target environment">{transfer.targetEnvironment}</Descriptions.Item>
              <Descriptions.Item label="Deployment window">{transfer.deploymentPlan.window}</Descriptions.Item>
              <Descriptions.Item label="Rollback plan">{transfer.deploymentPlan.rollbackPlan}</Descriptions.Item>
              <Descriptions.Item label="Change reason">{transfer.deploymentPlan.changeReason}</Descriptions.Item>
              <Descriptions.Item label="Impact scope">{transfer.deploymentPlan.impactScope}</Descriptions.Item>
              <Descriptions.Item label="Checklist note">{transfer.deploymentPlan.checklistNote}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title="Activity / Audit History">
            <Timeline items={transfer.activities.map((item) => ({ dot: <RocketOutlined />, children: <Space orientation="vertical" size={2}><Space><StatusTag status={item.type} label={item.type} /><Text strong>{item.actor}</Text></Space><Text>{item.message}</Text><Text type="secondary">{item.createdAt}</Text></Space> }))} />
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
