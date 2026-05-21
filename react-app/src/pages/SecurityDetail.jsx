import {
  AlertOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  SafetyCertificateOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Card,
  Col,
  Descriptions,
  Flex,
  Progress,
  Row,
  Space,
  Steps,
  Table,
  Timeline,
  Typography,
} from 'antd'
import { Link, useParams } from 'react-router-dom'
import { getSecurityValidationDetail } from '../api/security'
import { StatusTag, SummaryCard } from '../components/common'

const { Paragraph, Text, Title } = Typography

function normalizeStatus(status) {
  if (status === 'pass') return 'passed'
  return status
}

function toStepStatus(status) {
  if (status === 'passed') return 'finish'
  if (status === 'failed') return 'error'
  if (status === 'warning') return 'process'
  return 'wait'
}

function getGateStatus(validation, gate) {
  if (gate === 'Secret Detection') return validation.severity.critical > 0 ? 'failed' : 'passed'
  if (gate === 'SAST') return validation.severity.high > 0 ? 'failed' : normalizeStatus(validation.vstatus)
  if (gate === 'Dependency Scan') return validation.severity.high > 0 ? 'warning' : 'passed'
  if (gate === 'Container Scan') return validation.severity.medium > 0 ? 'warning' : 'passed'
  if (gate === 'License Policy') return validation.severity.low > 0 ? 'warning' : 'passed'
  if (gate === 'Security Approval') return validation.policy === 'blocked' ? 'pending' : 'passed'
  return 'pending'
}

function SecurityDetail() {
  const { securityId } = useParams()
  const detail = getSecurityValidationDetail(securityId)

  if (!detail) {
    return (
      <Alert
        type="warning"
        showIcon
        message="Security Validation을 찾을 수 없습니다."
        description={`${securityId}에 해당하는 보안 검증 데이터가 없습니다.`}
      />
    )
  }

  const { validation, vulnerabilities, repository, mergeRequest, pipeline, activities } = detail
  const isBlocked = validation.policy === 'blocked'
  const hasCriticalOrHigh = validation.severity.critical > 0 || validation.severity.high > 0
  const repositoryPath = `/repositories/${validation.repo}`
  const mrPath = `/repositories/${validation.repo}/merge-requests/${validation.mrId}`
  const pipelinePath = pipeline ? `/repositories/${validation.repo}/pipelines/${pipeline.id}` : null
  const gates = ['Secret Detection', 'SAST', 'Dependency Scan', 'Container Scan', 'License Policy', 'Security Approval']

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Card className="security-detail-hero">
        <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
          <div>
            <Text type="secondary">Security ID {validation.id}</Text>
            <Title level={2}>{validation.mrTitle}</Title>
            <Paragraph type="secondary">{validation.notice?.desc}</Paragraph>
          </div>
          <Space wrap>
            <StatusTag status={normalizeStatus(validation.vstatus)} label={validation.vlabel} />
            <StatusTag status={validation.policy} label={validation.policyLabel} />
          </Space>
        </Flex>

        <Descriptions className="security-detail-meta" size="small" column={{ xs: 1, md: 2, xl: 4 }}>
          <Descriptions.Item label="Repository"><Link to={repositoryPath}>{repository?.name ?? validation.repo}</Link></Descriptions.Item>
          <Descriptions.Item label="Merge Request"><Link to={mrPath}>!{validation.mrId} {validation.mrTitle}</Link></Descriptions.Item>
          <Descriptions.Item label="Author / Owner">{validation.author}</Descriptions.Item>
          <Descriptions.Item label="Last checked">{validation.lastCheckedAt}</Descriptions.Item>
          <Descriptions.Item label="Scan type">SAST · SCA · Secret Detection · Container Scan</Descriptions.Item>
          <Descriptions.Item label="Source branch">{validation.branch.split(' → ')[0]}</Descriptions.Item>
          <Descriptions.Item label="Target branch">{validation.branch.split(' → ')[1] ?? '-'}</Descriptions.Item>
        </Descriptions>
      </Card>

      {(isBlocked || hasCriticalOrHigh) ? (
        <Alert
          type="error"
          showIcon
          message="This merge request is blocked due to critical security issues."
          description="Resolve critical vulnerabilities before merge. Re-run validation after fixes are pushed."
        />
      ) : null}

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Critical" value={validation.severity.critical} tone="danger" icon={<AlertOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="High" value={validation.severity.high} tone="danger" icon={<WarningOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Medium" value={validation.severity.medium} tone="warning" icon={<WarningOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Low" value={validation.severity.low} icon={<SafetyCertificateOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Total Vulnerabilities" value={vulnerabilities.length} icon={<CodeOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Policy Decision" value={validation.policyLabel} tone={isBlocked ? 'danger' : 'success'} icon={<CheckCircleOutlined />} />
        </Col>
      </Row>

      <Card title="Validation Gate Checklist">
        <Steps
          direction="vertical"
          items={gates.map((gate) => {
            const status = getGateStatus(validation, gate)
            return {
              title: gate,
              status: toStepStatus(status),
              description: <StatusTag status={status} />,
            }
          })}
        />
      </Card>

      <Card title="Vulnerabilities">
        <Table
          rowKey="id"
          dataSource={vulnerabilities}
          pagination={false}
          rowClassName={(record) =>
            ['critical', 'high'].includes(record.severity) ? 'security-risk-row' : ''
          }
          columns={[
            { title: 'Severity', dataIndex: 'severity', width: 110, render: (value) => <StatusTag status={value === 'critical' || value === 'high' ? 'failed' : value} label={value} /> },
            { title: 'Type', dataIndex: 'type', width: 150 },
            { title: 'Title', dataIndex: 'title', minWidth: 240 },
            { title: 'File', dataIndex: 'file', minWidth: 180, render: (value) => <Text code>{value}</Text> },
            { title: 'Line', dataIndex: 'line', width: 80 },
            { title: 'Status', dataIndex: 'status', width: 110, render: (value) => <StatusTag status={value} /> },
            { title: 'Action', dataIndex: 'action', minWidth: 180 },
            { title: 'Assignee', dataIndex: 'assignee', width: 120, render: (value) => value ?? validation.author },
            { title: 'Detected at', dataIndex: 'detectedAt', width: 120, render: (value) => value ?? validation.lastCheckedAt },
          ]}
        />
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={8}>
          <Card title="Related Merge Request">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="MR"><Link to={mrPath}>!{mergeRequest?.id} {mergeRequest?.title}</Link></Descriptions.Item>
              <Descriptions.Item label="Status"><StatusTag status={mergeRequest?.status} /></Descriptions.Item>
              <Descriptions.Item label="Review"><StatusTag status={mergeRequest?.review} label={mergeRequest?.reviewLabel} /></Descriptions.Item>
              <Descriptions.Item label="Pipeline"><StatusTag status={mergeRequest?.pipeline} /></Descriptions.Item>
              <Descriptions.Item label="Security"><StatusTag status={mergeRequest?.security} label={mergeRequest?.securityLabel} /></Descriptions.Item>
              <Descriptions.Item label="Approval progress">
                <Progress percent={mergeRequest?.required ? Math.round((mergeRequest.approved / mergeRequest.required) * 100) : 0} />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card title="Related Repository">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Repository"><Link to={repositoryPath}>{repository?.name}</Link></Descriptions.Item>
              <Descriptions.Item label="Group path">{repository?.group}</Descriptions.Item>
              <Descriptions.Item label="Default branch">{repository?.defaultBranch}</Descriptions.Item>
              <Descriptions.Item label="Visibility">{repository?.visibility}</Descriptions.Item>
              <Descriptions.Item label="User role">{repository?.role}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card title="Related Pipeline">
            {pipeline ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Pipeline"><Link to={pipelinePath}>#{pipeline.id}</Link></Descriptions.Item>
                <Descriptions.Item label="Status"><StatusTag status={pipeline.status} /></Descriptions.Item>
                <Descriptions.Item label="Branch">{pipeline.branch}</Descriptions.Item>
                <Descriptions.Item label="Commit"><Text code>{pipeline.commit}</Text></Descriptions.Item>
                <Descriptions.Item label="Updated">{pipeline.updatedAt}</Descriptions.Item>
              </Descriptions>
            ) : (
              <Text type="secondary">연결된 Pipeline이 없습니다.</Text>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={10}>
          <Card title="Recommended Actions">
            <Space orientation="vertical" size={10}>
              {[
                'Remove hardcoded token and rotate exposed credentials.',
                'Upgrade vulnerable dependency to the approved version.',
                'Add security reviewer approval before merge.',
                'Re-run validation after fixes are pushed.',
              ].map((action) => (
                <Flex key={action} align="center" gap={8}>
                  <CheckCircleOutlined className="next-up-icon" />
                  <Text>{action}</Text>
                </Flex>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} xl={14}>
          <Card title="Activity / History">
            <Timeline
              items={activities.map((activity) => ({
                icon: <SafetyCertificateOutlined />,
                content: (
                  <Space orientation="vertical" size={2}>
                    <Text>{activity.message}</Text>
                    <Text type="secondary">{activity.actor} · {activity.createdAt}</Text>
                  </Space>
                ),
              }))}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  )
}

export default SecurityDetail
