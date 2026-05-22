import {
  AlertOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  PullRequestOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { Alert, Button, Card, Col, Flex, Input, List, Row, Space, Table, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getDashboardAuditEvents,
  getDashboardAiPrompts,
  getDashboardAiResponse,
  getDashboardMergeRequestsData,
  getDashboardNextUpItems,
  getDashboardPipelinesData,
  getDashboardRepositoriesData,
  getDashboardSecurityItems,
  getDashboardSummary,
} from '../api/dashboard'
import { useAuth } from '../auth/AuthContext'
import { StatusTag, SummaryCard, PageHeader } from '../components/common'
import { UI_TEXT } from '../constants'

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
  const auth = useAuth()
  const summary = getDashboardSummary()
  const nextUp = getDashboardNextUpItems()
  const repositories = getDashboardRepositoriesData()
  const mergeRequests = getDashboardMergeRequestsData()
  const pipelines = getDashboardPipelinesData()
  const securityItems = getDashboardSecurityItems()
  const auditEvents = getDashboardAuditEvents()
  const prompts = getDashboardAiPrompts()
  const [aiPrompt, setAiPrompt] = useState('mr-approval')
  const [aiInput, setAiInput] = useState('')
  const aiResponse = getDashboardAiResponse(aiPrompt)

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.pages.dashboard.title}
        description={UI_TEXT.pages.dashboard.description}
        actions={[
          <Button key="refresh" icon={<ReloadOutlined />}>
            {UI_TEXT.actions.refresh}
          </Button>,
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            disabled={!auth.hasPermission('repository:create-request')}
            onClick={() => navigate('/repositories/new')}
          >
            {UI_TEXT.actions.createRepository}
          </Button>,
        ]}
      />

      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.reviewRequiredMrs} value={summary.reviewRequiredMrs} tone="warning" icon={<PullRequestOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.myOpenMrs} value={summary.myOpenMrs} icon={<PullRequestOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.failedPipelines} value={summary.failedPipelines} tone="danger" icon={<AlertOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.securityBlocked} value={summary.securityBlocked} tone="danger" icon={<SafetyCertificateOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.pendingActions} value={summary.pendingActions} tone="warning" icon={<CheckCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.todayAuditEvents} value={summary.todayAuditEvents} icon={<AuditOutlined />} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={10}>
          <Card title={UI_TEXT.sections.nextUp}>
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

        <Col xs={24} xl={8}>
          <Card title={UI_TEXT.dashboardAi.title}>
            <Space orientation="vertical" size={12} style={{ width: '100%' }}>
              <Text type="secondary">{UI_TEXT.dashboardAi.description}</Text>
              <Space wrap>
                {prompts.map((prompt) => (
                  <Button key={prompt.key} size="small" type={aiPrompt === prompt.key ? 'primary' : 'default'} onClick={() => setAiPrompt(prompt.key)}>
                    {prompt.label}
                  </Button>
                ))}
              </Space>
              <Flex gap={8}>
                <Input
                  placeholder={UI_TEXT.dashboardAi.inputPlaceholder}
                  value={aiInput}
                  onChange={(event) => setAiInput(event.target.value)}
                  onPressEnter={() => aiInput.trim() && setAiPrompt(aiInput)}
                />
                <Button onClick={() => aiInput.trim() && setAiPrompt(aiInput)}>{UI_TEXT.actions.search}</Button>
              </Flex>
              <Card size="small">
                <Space orientation="vertical" size={6}>
                  <Text strong>{aiResponse.title}</Text>
                  <Text>{aiResponse.body}</Text>
                  <Space wrap>
                    {aiResponse.links.map((link) => <Link key={link.href} to={link.href}>{link.label}</Link>)}
                  </Space>
                </Space>
              </Card>
            </Space>
          </Card>
        </Col>

        <Col xs={24} xl={6}>
          <Card title={UI_TEXT.sections.myRepositories}>
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
                { title: UI_TEXT.common.repositoryName, dataIndex: 'name', render: (value, record) => <Link to={`/repositories/${record.id}`}>{value}</Link> },
                { title: UI_TEXT.common.groupPath, dataIndex: 'group' },
                { title: UI_TEXT.common.role, dataIndex: 'role', width: 120 },
                { title: UI_TEXT.common.pipeline, dataIndex: 'pipelineStatus', width: 110, render: (value) => <StatusTag status={value} /> },
                { title: UI_TEXT.common.security, dataIndex: 'securityStatus', width: 110, render: (value) => <StatusTag status={value} /> },
                { title: UI_TEXT.common.openMr, dataIndex: 'openMrCount', width: 90 },
                { title: UI_TEXT.common.updated, dataIndex: 'updatedAt', width: 160 },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card title={UI_TEXT.sections.mergeRequestsOverview}>
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
                { title: UI_TEXT.tables.mrId, dataIndex: 'id', width: 80, render: (id, record) => <Link to={`/repositories/${record.repo}/merge-requests/${id}`}>!{id}</Link> },
                { title: UI_TEXT.tables.title, dataIndex: 'title' },
                { title: UI_TEXT.common.repository, dataIndex: 'repo', width: 160 },
                { title: UI_TEXT.tables.review, dataIndex: 'review', width: 110, render: (value, record) => <StatusTag status={value} label={record.reviewLabel} /> },
                { title: UI_TEXT.tables.approval, key: 'approval', width: 110, render: (_, record) => `${record.approved}/${record.required}` },
                { title: UI_TEXT.common.pipeline, dataIndex: 'pipeline', width: 110, render: (value) => <StatusTag status={value} /> },
                { title: UI_TEXT.common.security, dataIndex: 'security', width: 110, render: (value, record) => <StatusTag status={value} label={record.securityLabel} /> },
                { title: UI_TEXT.common.updated, dataIndex: 'updatedAt', width: 110 },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title={UI_TEXT.sections.pipelineHealth}>
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
                { title: UI_TEXT.common.repository, dataIndex: 'repo' },
                { title: UI_TEXT.tables.branch, dataIndex: 'branch', render: (value) => <Text code>{value}</Text> },
                { title: UI_TEXT.common.status, dataIndex: 'status', render: (value) => <StatusTag status={value === 'finished' ? 'passed' : value} /> },
                { title: UI_TEXT.tables.failedJobs, key: 'failedJobs', render: (_, record) => getFailedJobs(record) },
                { title: UI_TEXT.tables.duration, key: 'duration', render: (_, record) => getPipelineDuration(record) },
                { title: UI_TEXT.common.updated, dataIndex: 'updatedAt' },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card title={UI_TEXT.sections.securityAttention}>
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
                { title: UI_TEXT.tables.securityId, dataIndex: 'id', render: (id) => <Link to={`/security/${id}`}>{id}</Link> },
                { title: UI_TEXT.common.repository, dataIndex: 'repo' },
                { title: 'MR', dataIndex: 'mrId', render: (mrId, record) => <Link to={`/repositories/${record.repo}/merge-requests/${mrId}`}>!{mrId}</Link> },
                { title: UI_TEXT.tables.policy, dataIndex: 'policy', render: (value, record) => <StatusTag status={value} label={record.policyLabel} /> },
                { title: UI_TEXT.tables.criticalHigh, key: 'risk', render: (_, record) => `${record.severity.critical} / ${record.severity.high}` },
                { title: UI_TEXT.tables.lastChecked, dataIndex: 'lastCheckedAt' },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title={UI_TEXT.sections.recentAuditEvents}>
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
          description={`${UI_TEXT.sections.securityAttention} 영역에서 차단된 검증과 관련 MR을 확인하세요.`}
        />
      ) : null}
    </Space>
  )
}

export default Dashboard
