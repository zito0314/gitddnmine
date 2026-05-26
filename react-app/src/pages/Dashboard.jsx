import {
  AlertOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  PullRequestOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
} from '../components/icons'
import { Button, Card, Col, Flex, Input, List, Row, Space, Table, Tag, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getDashboardAiPrompts,
  getDashboardAiResponse,
  getDashboardMergeRequestsData,
  getDashboardNextUpItems,
  getDashboardPipelinesData,
  getDashboardRepositoriesData,
  getDashboardRepositoryActivities,
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

function Dashboard() {
  const navigate = useNavigate()
  const auth = useAuth()
  const summary = getDashboardSummary()
  const nextUp = getDashboardNextUpItems()
  const repositories = getDashboardRepositoriesData()
  const mergeRequests = getDashboardMergeRequestsData()
  const pipelines = getDashboardPipelinesData()
  const activities = getDashboardRepositoryActivities()
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
            <List
              dataSource={repositories}
              locale={{ emptyText: UI_TEXT.messages.empty.table }}
              renderItem={(repository) => (
                <List.Item
                  className="dashboard-list-item"
                  onClick={() => navigate(`/repositories/${repository.id}`)}
                >
                  <List.Item.Meta
                    title={<Link to={`/repositories/${repository.id}`}>{repository.name}</Link>}
                    description={<Text type="secondary">{repository.updatedAt}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card title={UI_TEXT.sections.mergeRequestsOverview}>
            <List
              dataSource={mergeRequests}
              locale={{ emptyText: UI_TEXT.messages.empty.table }}
              renderItem={(mergeRequest) => (
                <List.Item
                  className="dashboard-list-item"
                  onClick={() => navigate(`/repositories/${mergeRequest.repo}/merge-requests/${mergeRequest.id}`)}
                  actions={[<StatusTag key="review" status={mergeRequest.review} label={mergeRequest.reviewLabel} />]}
                >
                  <List.Item.Meta
                    title={
                      <Flex align="center" gap={8} wrap="wrap">
                        <Tag>MR #{mergeRequest.id}</Tag>
                        <Link to={`/repositories/${mergeRequest.repo}/merge-requests/${mergeRequest.id}`}>
                          {mergeRequest.title}
                        </Link>
                      </Flex>
                    }
                    description={<Text type="secondary">{mergeRequest.repo}</Text>}
                  />
                </List.Item>
              )}
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

      <Card title={UI_TEXT.sections.recentActivity}>
        <List
          dataSource={activities}
          locale={{ emptyText: UI_TEXT.messages.empty.table }}
          renderItem={(activity) => (
            <List.Item
              className="dashboard-list-item"
              onClick={() => navigate(activity.href)}
              actions={[<StatusTag key="status" status={activity.status} />]}
            >
              <List.Item.Meta
                title={<Text strong>{activity.message}</Text>}
                description={
                  <Space wrap size={6}>
                    <Text type="secondary">{activity.repositoryName}</Text>
                    <Text type="secondary">·</Text>
                    <Text type="secondary">{activity.actor}</Text>
                    <Text type="secondary">·</Text>
                    <Text type="secondary">{activity.type}</Text>
                    <Text type="secondary">·</Text>
                    <Text type="secondary">{activity.createdAt}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </Space>
  )
}

export default Dashboard
