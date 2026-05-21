import {
  AlertOutlined,
  BranchesOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CodeOutlined,
  GitlabOutlined,
  PullRequestOutlined,
  SafetyCertificateOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { Alert, Card, Col, Descriptions, Flex, List, Row, Space, Table, Timeline, Typography } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRepositoryOverview } from '../api/repositories'
import { DataTable, StatusTag, SummaryCard } from '../components/common'

const { Paragraph, Text, Title } = Typography

function RepositoryHero({ repository }) {
  return (
    <Card className="repository-overview-hero">
      <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
        <div>
          <Space size={8} align="center">
            {repository.favorite ? <StarFilled className="repo-favorite-icon" /> : <StarOutlined />}
            <Title level={2}>{repository.name}</Title>
          </Space>
          <Paragraph type="secondary">{repository.description}</Paragraph>
        </div>
        <Space wrap>
          <StatusTag status={repository.status} />
          <StatusTag status={repository.pipelineStatus} label={`Pipeline ${repository.pipelineStatus}`} />
          <StatusTag status={repository.securityStatus} label={`Security ${repository.securityStatus}`} />
        </Space>
      </Flex>

      <Descriptions className="repository-overview-meta" size="small" column={{ xs: 1, md: 2, xl: 4 }}>
        <Descriptions.Item label="Group / Project path">{repository.group}</Descriptions.Item>
        <Descriptions.Item label="Visibility">{repository.visibility}</Descriptions.Item>
        <Descriptions.Item label="Default branch">{repository.defaultBranch}</Descriptions.Item>
        <Descriptions.Item label="Current user role">{repository.role}</Descriptions.Item>
        <Descriptions.Item label="Last updated">{repository.updatedAt}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

function RepositoryDetail() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const overview = getRepositoryOverview(repositoryId)

  if (!overview) {
    return (
      <Alert
        type="warning"
        showIcon
        message="Repository를 찾을 수 없습니다."
        description={`${repositoryId}에 해당하는 Repository 데이터가 없습니다.`}
      />
    )
  }

  const { repository, summary, nextUp, mergeRequests, pipelines, security, activities, commits, branches } =
    overview

  const recentMergeRequests = mergeRequests.slice(0, 5)
  const recentPipelines = pipelines.slice(0, 5)
  const recentActivities = activities.slice(0, 6)

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <RepositoryHero repository={repository} />

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Open Merge Requests" value={summary.openMergeRequests} icon={<PullRequestOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Review Required" value={summary.reviewRequired} tone="warning" icon={<ClockCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Failed Pipelines" value={summary.failedPipelines} tone="danger" icon={<AlertOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Security Warnings" value={summary.securityWarnings} tone="danger" icon={<SafetyCertificateOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Recent Commits" value={summary.recentCommits} tone="success" icon={<CodeOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Active Branches" value={summary.activeBranches} icon={<BranchesOutlined />} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title="Next up">
            <List
              dataSource={nextUp}
              locale={{ emptyText: '현재 조치가 필요한 항목이 없습니다.' }}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckCircleOutlined className="next-up-icon" />}
                    title={
                      <Flex align="center" gap={8} wrap="wrap">
                        <Text strong>{item.title}</Text>
                        <StatusTag status={item.status} />
                      </Flex>
                    }
                    description={
                      <Space direction="vertical" size={2}>
                        <Text type="secondary">{item.type}</Text>
                        <Text type="secondary">{item.description}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card title="Security Status">
            <Row gutter={[12, 12]}>
              {[
                ['Critical', security.critical, 'error'],
                ['High', security.high, 'error'],
                ['Medium', security.medium, 'warning'],
                ['Low', security.low, 'default'],
              ].map(([label, value, status]) => (
                <Col span={12} key={label}>
                  <Card size="small">
                    <Flex align="center" justify="space-between">
                      <Text type="secondary">{label}</Text>
                      <StatusTag status={status} label={value} />
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
            <Paragraph type="secondary" className="security-summary-note">
              총 {security.total}건의 Security Validation이 연결되어 있습니다.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title="Recent Merge Requests">
            <DataTable
              rowKey="id"
              dataSource={recentMergeRequests}
              pagination={false}
              columns={[
                {
                  title: 'MR',
                  dataIndex: 'id',
                  width: 88,
                  render: (id) => <Link to={`/repositories/${repositoryId}/merge-requests/${id}`}>!{id}</Link>,
                },
                {
                  title: 'Title',
                  dataIndex: 'title',
                  render: (title, record) => (
                    <Link to={`/repositories/${repositoryId}/merge-requests/${record.id}`}>{title}</Link>
                  ),
                },
                { title: 'Review', dataIndex: 'review', width: 120, render: (value) => <StatusTag status={value} /> },
                { title: 'Updated', dataIndex: 'updatedAt', width: 120 },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card title="Recent Pipelines">
            <Table
              rowKey="id"
              dataSource={recentPipelines}
              pagination={false}
              onRow={(record) => ({
                onClick: () => navigate(`/repositories/${repositoryId}/pipelines/${record.id}`),
                style: { cursor: 'pointer' },
              })}
              columns={[
                {
                  title: 'Pipeline',
                  dataIndex: 'id',
                  render: (id) => <Link to={`/repositories/${repositoryId}/pipelines/${id}`}>#{id}</Link>,
                },
                { title: 'Branch', dataIndex: 'branch' },
                { title: 'Status', dataIndex: 'status', render: (value) => <StatusTag status={value} /> },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={10}>
          <Card title="Repository Signals">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Latest commit">
                {commits[0]?.sha ? `${commits[0].sha} · ${commits[0].title}` : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Active branches">
                {branches.slice(0, 4).map((branch) => branch.name).join(', ') || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Open MRs">{summary.openMergeRequests}</Descriptions.Item>
              <Descriptions.Item label="Failed pipelines">{summary.failedPipelines}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} xl={14}>
          <Card title="Recent Activity">
            <Timeline
              items={recentActivities.map((activity) => ({
                dot: <GitlabOutlined />,
                children: (
                  <Space direction="vertical" size={2}>
                    <Text>{activity.message}</Text>
                    <Text type="secondary">
                      {activity.actor} · {activity.createdAt}
                    </Text>
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

export default RepositoryDetail
