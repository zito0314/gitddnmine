import {
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CodeOutlined,
  PlayCircleOutlined,
} from '../components/icons'
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Space,
  Steps,
  Table,
  Typography,
} from 'antd'
import { Link, useParams } from 'react-router-dom'
import { getRepositoryById } from '../api/repositories'
import { getPipelineOverview } from '../api/pipelines'
import { StatusTag, SummaryCard } from '../components/common'
import { CodePreview } from '../components/custom'

const { Paragraph, Text, Title } = Typography

function normalizeStatus(status) {
  if (status === 'finished') return 'passed'
  if (status === 'created') return 'pending'
  if (status === 'blocked') return 'failed'
  return status
}

function toStepStatus(status) {
  const normalized = normalizeStatus(status)
  if (normalized === 'passed') return 'finish'
  if (normalized === 'failed') return 'error'
  if (normalized === 'running') return 'process'
  return 'wait'
}

function PipelineDetail() {
  const { repositoryId, pipelineId } = useParams()
  const overview = getPipelineOverview(pipelineId)
  const pipeline = overview?.pipeline
  const repository = getRepositoryById(repositoryId ?? pipeline?.repo)
  const isRepositoryContext = Boolean(repositoryId)

  if (!overview) {
    return (
      <Alert
        type="warning"
        showIcon
        message="Pipeline을 찾을 수 없습니다."
        description={`Pipeline #${pipelineId} 데이터가 없습니다.`}
      />
    )
  }

  const { jobs, stages, relatedMergeRequest, commit, logs, failedJobs, summary } = overview
  const relatedMrPath = relatedMergeRequest
    ? isRepositoryContext
      ? `/repositories/${repositoryId}/merge-requests/${relatedMergeRequest.id}`
      : `/merge-requests/${relatedMergeRequest.id}`
    : null

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card className="pipeline-detail-hero">
        <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
          <div>
            <Text type="secondary">Pipeline #{pipeline.id}</Text>
            <Title level={2}>{pipeline.title}</Title>
            <Paragraph type="secondary">{pipeline.description}</Paragraph>
          </div>
          <Space wrap>
            <StatusTag status={normalizeStatus(pipeline.status)} />
            <StatusTag status={pipeline.result} label={`Result ${pipeline.result}`} />
          </Space>
        </Flex>

        <Descriptions className="pipeline-detail-meta" size="small" column={{ xs: 1, md: 2, xl: 4 }}>
          <Descriptions.Item label="Repository">
            {isRepositoryContext ? repository?.name : <Link to={`/repositories/${pipeline.repo}`}>{repository?.name}</Link>}
          </Descriptions.Item>
          <Descriptions.Item label="Branch"><Text code>{pipeline.branch}</Text></Descriptions.Item>
          <Descriptions.Item label="Commit SHA"><Text code>{pipeline.commit}</Text></Descriptions.Item>
          <Descriptions.Item label="Trigger">{pipeline.trigger}</Descriptions.Item>
          <Descriptions.Item label="Author">{pipeline.author}</Descriptions.Item>
          <Descriptions.Item label="Created at">{pipeline.updatedAt}</Descriptions.Item>
          <Descriptions.Item label="Finished at">{pipeline.status === 'running' ? '-' : '방금'}</Descriptions.Item>
          <Descriptions.Item label="Duration">{summary.duration}</Descriptions.Item>
          <Descriptions.Item label="Related MR">
            {relatedMrPath ? <Link to={relatedMrPath}>!{relatedMergeRequest.id} {relatedMergeRequest.title}</Link> : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Total Jobs" value={summary.totalJobs} icon={<PlayCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Passed Jobs" value={summary.passedJobs} tone="success" icon={<CheckCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Failed Jobs" value={summary.failedJobs} tone="danger" icon={<AlertOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Running Jobs" value={summary.runningJobs} icon={<ClockCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Duration" value={summary.duration} icon={<ClockCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Failed Stage" value={summary.failedStage} tone={summary.failedStage === '-' ? 'default' : 'danger'} icon={<CodeOutlined />} />
        </Col>
      </Row>

      {failedJobs.length ? (
        <Alert
          type="error"
          showIcon
          message="Attention Required"
          description={failedJobs.map((job) => `${job.name} ${job.status}`).join(' · ')}
        />
      ) : null}

      <Card title="Stage Flow">
        <Steps
          items={stages.map((stage) => ({
            title: stage.name,
            description: (
              <Space direction="vertical" size={4}>
                <StatusTag status={normalizeStatus(stage.status)} />
                <Text type="secondary">{stage.jobs?.length ?? 0} jobs</Text>
              </Space>
            ),
            status: toStepStatus(stage.status),
          }))}
        />
      </Card>

      <Card title="Jobs">
        <Table
          rowKey={(record) => record.id ?? `${record.pipelineId}-${record.stage}-${record.name}`}
          dataSource={jobs}
          pagination={false}
          columns={[
            { title: 'Job name', dataIndex: 'name', render: (value) => <Text strong>{value}</Text> },
            { title: 'Stage', dataIndex: 'stage', width: 130 },
            { title: 'Status', dataIndex: 'status', width: 120, render: (value) => <StatusTag status={normalizeStatus(value)} /> },
            { title: 'Runner', dataIndex: 'runner', width: 160 },
            { title: 'Duration', dataIndex: 'duration', width: 100 },
            { title: 'Started at', dataIndex: 'startedAt', width: 120 },
            { title: 'Finished at', dataIndex: 'finishedAt', width: 120, render: (value) => value ?? '방금' },
            {
              title: 'Actions',
              key: 'actions',
              width: 120,
              render: () => <Button size="small" disabled>View job</Button>,
            },
          ]}
        />
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card title="Related Merge Request">
            {relatedMergeRequest ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="MR">
                  <Link to={relatedMrPath}>!{relatedMergeRequest.id} {relatedMergeRequest.title}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Review"><StatusTag status={relatedMergeRequest.review} label={relatedMergeRequest.reviewLabel} /></Descriptions.Item>
                <Descriptions.Item label="Security"><StatusTag status={relatedMergeRequest.security} label={relatedMergeRequest.securityLabel} /></Descriptions.Item>
                <Descriptions.Item label="Updated">{relatedMergeRequest.updatedAt}</Descriptions.Item>
              </Descriptions>
            ) : (
              <Text type="secondary">연결된 Merge Request가 없습니다.</Text>
            )}
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title="Commit Summary">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Commit"><Text code>{commit?.sha ?? pipeline.commit}</Text></Descriptions.Item>
              <Descriptions.Item label="Message">{commit?.title ?? pipeline.title}</Descriptions.Item>
              <Descriptions.Item label="Author">{commit?.author ?? pipeline.author}</Descriptions.Item>
              <Descriptions.Item label="Changed files">{commit ? `${commit.added + commit.removed} lines touched` : '-'}</Descriptions.Item>
              <Descriptions.Item label="Additions / Deletions">
                {commit ? `+${commit.added} / -${commit.removed}` : '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Card title="Pipeline Logs Preview">
        <CodePreview variant="log" className="pipeline-log-preview">
          {logs.map((line) => `${line}\n`)}
        </CodePreview>
      </Card>
    </Space>
  )
}

export default PipelineDetail
