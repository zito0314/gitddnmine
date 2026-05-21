import {
  AlertOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  PullRequestOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { Alert, Button, Card, Col, Flex, List, Row, Space, Table, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {
  getDashboardAuditEvents,
  getDashboardMergeRequestsData,
  getDashboardNextUpItems,
  getDashboardPipelinesData,
  getDashboardRepositoriesData,
  getDashboardSecurityItems,
  getDashboardSummary,
} from '../api/dashboard'
import { StatusTag, SummaryCard, PageHeader } from '../components/common'

const { Text } = Typography

function getPipelineDuration(pipeline) {
  return pipeline.summary?.find((item) => item.label === '실제 실행 시간')?.value ?? '-'
}

function getFailedJobs(pipeline) {
  return pipeline.jobs?.filter((job) => job === 'failed').length ?? 0
}

function normalizeAuditResult(log) {
  if (log.resultClass === 'red') return 'blocked'
  if (log.resultClass === 'orange') return 'warning'
  return 'success'
}

function Dashboard() {
  const navigate = useNavigate()
  const summary = getDashboardSummary()
  const nextUp = getDashboardNextUpItems()
  const repositories = getDashboardRepositoriesData()
  const mergeRequests = getDashboardMergeRequestsData()
  const pipelines = getDashboardPipelinesData()
  const securityItems = getDashboardSecurityItems()
  const auditEvents = getDashboardAuditEvents()

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title="Dashboard"
        description="개발 업무, 승인, 검증, 보안 이슈를 한 화면에서 확인하는 업무 대시보드"
        actions={[
          <Button key="refresh" icon={<ReloadOutlined />}>
            Refresh
          </Button>,
          <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => navigate('/repositories')}>
            Create Repository
          </Button>,
        ]}
      />

      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Review Required MRs" value={summary.reviewRequiredMrs} tone="warning" icon={<PullRequestOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="My Open MRs" value={summary.myOpenMrs} icon={<PullRequestOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Failed Pipelines" value={summary.failedPipelines} tone="danger" icon={<AlertOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Security Blocked" value={summary.securityBlocked} tone="danger" icon={<SafetyCertificateOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Pending Actions" value={summary.pendingActions} tone="warning" icon={<CheckCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Today Audit Events" value={summary.todayAuditEvents} icon={<AuditOutlined />} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={10}>
          <Card title="Next Up / Action Required">
            <List
              dataSource={nextUp}
              renderItem={(item) => (
                <List.Item onClick={() => navigate(item.href)} className="dashboard-action-item">
                  <List.Item.Meta
                    title={
                      <Flex align="center" gap={8} wrap="wrap">
                        <Text strong>{item.title}</Text>
                        <StatusTag status={item.status} />
                      </Flex>
                    }
                    description={
                      <Space orientation="vertical" size={2}>
                        <Text type="secondary">{item.type} · {item.target}</Text>
                        <Text type="secondary">{item.updatedAt}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} xl={14}>
          <Card title="My Repositories">
            <Table
              rowKey="id"
              dataSource={repositories}
              pagination={false}
              size="small"
              onRow={(record) => ({
                onClick: () => navigate(`/repositories/${record.id}`),
                style: { cursor: 'pointer' },
              })}
              columns={[
                { title: 'Repository name', dataIndex: 'name', render: (value, record) => <Link to={`/repositories/${record.id}`}>{value}</Link> },
                { title: 'Group path', dataIndex: 'group' },
                { title: 'Role', dataIndex: 'role', width: 120 },
                { title: 'Pipeline', dataIndex: 'pipelineStatus', width: 110, render: (value) => <StatusTag status={value} /> },
                { title: 'Security', dataIndex: 'securityStatus', width: 110, render: (value) => <StatusTag status={value} /> },
                { title: 'Open MR', dataIndex: 'openMrCount', width: 90 },
                { title: 'Updated', dataIndex: 'updatedAt', width: 160 },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card title="Merge Requests Overview">
            <Table
              rowKey="id"
              dataSource={mergeRequests}
              pagination={false}
              size="small"
              onRow={(record) => ({
                onClick: () => navigate(`/repositories/${record.repo}/merge-requests/${record.id}`),
                style: { cursor: 'pointer' },
              })}
              columns={[
                { title: 'MR ID', dataIndex: 'id', width: 80, render: (id, record) => <Link to={`/repositories/${record.repo}/merge-requests/${id}`}>!{id}</Link> },
                { title: 'Title', dataIndex: 'title' },
                { title: 'Repository', dataIndex: 'repo', width: 160 },
                { title: 'Review', dataIndex: 'review', width: 110, render: (value, record) => <StatusTag status={value} label={record.reviewLabel} /> },
                { title: 'Approval', key: 'approval', width: 110, render: (_, record) => `${record.approved}/${record.required}` },
                { title: 'Pipeline', dataIndex: 'pipeline', width: 110, render: (value) => <StatusTag status={value} /> },
                { title: 'Security', dataIndex: 'security', width: 110, render: (value, record) => <StatusTag status={value} label={record.securityLabel} /> },
                { title: 'Updated', dataIndex: 'updatedAt', width: 110 },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title="Pipeline Health">
            <Table
              rowKey="id"
              dataSource={pipelines}
              pagination={false}
              size="small"
              onRow={(record) => ({
                onClick: () => navigate(`/repositories/${record.repo}/pipelines/${record.id}`),
                style: { cursor: 'pointer' },
              })}
              columns={[
                { title: 'Pipeline ID', dataIndex: 'id', render: (id, record) => <Link to={`/repositories/${record.repo}/pipelines/${id}`}>#{id}</Link> },
                { title: 'Repository', dataIndex: 'repo' },
                { title: 'Branch', dataIndex: 'branch', render: (value) => <Text code>{value}</Text> },
                { title: 'Status', dataIndex: 'status', render: (value) => <StatusTag status={value === 'finished' ? 'passed' : value} /> },
                { title: 'Failed jobs', key: 'failedJobs', render: (_, record) => getFailedJobs(record) },
                { title: 'Duration', key: 'duration', render: (_, record) => getPipelineDuration(record) },
                { title: 'Updated', dataIndex: 'updatedAt' },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card title="Security Attention">
            <Table
              rowKey="id"
              dataSource={securityItems}
              pagination={false}
              size="small"
              onRow={(record) => ({
                onClick: () => navigate(`/security/${record.id}`),
                style: { cursor: 'pointer' },
              })}
              columns={[
                { title: 'Security ID', dataIndex: 'id', render: (id) => <Link to={`/security/${id}`}>{id}</Link> },
                { title: 'Repository', dataIndex: 'repo' },
                { title: 'MR', dataIndex: 'mrId', render: (mrId, record) => <Link to={`/repositories/${record.repo}/merge-requests/${mrId}`}>!{mrId}</Link> },
                { title: 'Policy', dataIndex: 'policy', render: (value, record) => <StatusTag status={value} label={record.policyLabel} /> },
                { title: 'Critical / High', key: 'risk', render: (_, record) => `${record.severity.critical} / ${record.severity.high}` },
                { title: 'Last checked', dataIndex: 'lastCheckedAt' },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title="Recent Audit Events">
            <List
              dataSource={auditEvents}
              renderItem={(event) => (
                <List.Item onClick={() => navigate('/audit')} className="dashboard-action-item">
                  <List.Item.Meta
                    title={
                      <Flex align="center" gap={8} wrap="wrap">
                        <Text strong>{event.eventCode}</Text>
                        <StatusTag status={event.severity === 'danger' ? 'failed' : event.severity} label={event.severity} />
                        <StatusTag status={normalizeAuditResult(event)} label={event.result} />
                      </Flex>
                    }
                    description={`${event.actorName} · ${event.targetName} · ${event.time}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {summary.securityBlocked > 0 ? (
        <Alert
          type="warning"
          showIcon
          message="보안 차단 항목이 있습니다."
          description="Security Attention 영역에서 차단된 검증과 관련 MR을 확인하세요."
        />
      ) : null}
    </Space>
  )
}

export default Dashboard
