import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CodeOutlined,
  CommentOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Progress,
  Row,
  Space,
  Steps,
  Timeline,
  Typography,
} from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getMergeRequestActivities,
  getMergeRequestApprovals,
  getMergeRequestComments,
  getMergeRequestDetail,
  getMergeRequestPipeline,
  getMergeRequestSecurity,
} from '../api/mergeRequests'
import { getRepositoryById } from '../api/repositories'
import { StatusTag, SummaryCard } from '../components/common'

const { Paragraph, Text, Title } = Typography

function getContextPath(repositoryId, mergeRequest) {
  return repositoryId ?? mergeRequest?.repo
}

function getPipelinePath(repositoryId, mergeRequest, pipeline) {
  if (!pipeline) return null
  const contextRepositoryId = getContextPath(repositoryId, mergeRequest)
  return repositoryId ? `/repositories/${contextRepositoryId}/pipelines/${pipeline.id}` : `/pipelines/${pipeline.id}`
}

function toGateStatus(status) {
  if (['passed', 'approved', 'ready'].includes(status)) return 'finish'
  if (['failed', 'blocked', 'rejected'].includes(status)) return 'error'
  return 'process'
}

function MergeRequestDetail() {
  const { repositoryId, mrId, mergeRequestId } = useParams()
  const navigate = useNavigate()
  const currentMrId = mrId ?? mergeRequestId
  const mergeRequest = getMergeRequestDetail(currentMrId)
  const repository = getRepositoryById(repositoryId ?? mergeRequest?.repo)
  const pipeline = getMergeRequestPipeline(currentMrId)
  const security = getMergeRequestSecurity(currentMrId)
  const approvals = getMergeRequestApprovals(currentMrId)
  const activities = getMergeRequestActivities(currentMrId)
  const comments = getMergeRequestComments(currentMrId)
  const isRepositoryContext = Boolean(repositoryId)
  const pipelinePath = getPipelinePath(repositoryId, mergeRequest, pipeline)

  if (!mergeRequest) {
    return (
      <Alert
        type="warning"
        showIcon
        message="Merge Request를 찾을 수 없습니다."
        description={`MR #${currentMrId} 데이터가 없습니다.`}
      />
    )
  }

  const approvalPercent = mergeRequest.required
    ? Math.round((mergeRequest.approved / mergeRequest.required) * 100)
    : 0
  const changedFiles = mergeRequest.diff?.files ?? 0
  const commitCount = Number(mergeRequest.meta?.find((item) => item.includes('커밋'))?.match(/\d+/)?.[0] ?? 0)
  const additions = mergeRequest.diff?.added ?? '+0'
  const deletions = mergeRequest.diff?.removed ?? '-0'

  const gates = [
    {
      title: 'Required approvals',
      status: mergeRequest.approved >= mergeRequest.required ? 'passed' : 'pending',
      description: `${mergeRequest.approved}/${mergeRequest.required} approved`,
    },
    {
      title: 'Pipeline success',
      status: mergeRequest.pipeline === 'passed' ? 'passed' : mergeRequest.pipeline,
      description: pipeline ? `Pipeline #${pipeline.id}` : 'No pipeline linked',
    },
    {
      title: 'Security validation',
      status: mergeRequest.security === 'passed' ? 'passed' : mergeRequest.security,
      description: security ? security.policyLabel : mergeRequest.securityLabel,
    },
    {
      title: 'Branch protection',
      status: ['main', 'develop'].includes(mergeRequest.target) ? 'passed' : 'pending',
      description: `${mergeRequest.target} branch policy`,
    },
    {
      title: 'Deployment transfer readiness',
      status: mergeRequest.gates?.find((gate) => gate.title === '운영 이관')?.tone === 'success' ? 'passed' : 'pending',
      description: mergeRequest.gates?.find((gate) => gate.title === '운영 이관')?.status ?? 'Pending',
    },
  ]

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Card className="mr-detail-hero">
        <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
          <div>
            <Text type="secondary">MR #{mergeRequest.id}</Text>
            <Title level={2}>{mergeRequest.title}</Title>
            <Paragraph type="secondary">{mergeRequest.summary}</Paragraph>
          </div>
          <Space wrap>
            <StatusTag status={mergeRequest.status} />
            <StatusTag status={mergeRequest.review} label={mergeRequest.reviewLabel} />
            <StatusTag status={mergeRequest.pipeline} />
            <StatusTag status={mergeRequest.security} label={mergeRequest.securityLabel} />
          </Space>
        </Flex>

        <Descriptions className="mr-detail-meta" size="small" column={{ xs: 1, md: 2, xl: 4 }}>
          <Descriptions.Item label="Repository">
            {isRepositoryContext ? repository?.name : <Link to={`/repositories/${mergeRequest.repo}`}>{repository?.name}</Link>}
          </Descriptions.Item>
          <Descriptions.Item label="Branches">
            <Text code>{mergeRequest.source}</Text> → <Text code>{mergeRequest.target}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Author">{mergeRequest.author}</Descriptions.Item>
          <Descriptions.Item label="Updated at">{mergeRequest.updatedAt}</Descriptions.Item>
          <Descriptions.Item label="Group / Project path">{mergeRequest.repoGroup}</Descriptions.Item>
          <Descriptions.Item label="Context">
            {isRepositoryContext ? 'Repository Merge Request' : 'Global Merge Request'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Approval progress" value={`${mergeRequest.approved}/${mergeRequest.required}`} icon={<UserOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Pipeline" value={pipeline?.status ?? mergeRequest.pipeline} icon={<CodeOutlined />} tone={mergeRequest.pipeline === 'failed' ? 'danger' : 'success'} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Security validation" value={security?.vlabel ?? mergeRequest.securityLabel} icon={<SafetyCertificateOutlined />} tone={mergeRequest.security === 'failed' ? 'danger' : 'success'} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Changed files" value={changedFiles} icon={<FileTextOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Commits" value={commitCount} icon={<CheckCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Comments" value={mergeRequest.comments} icon={<CommentOutlined />} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title="Merge Gate / Approval Checklist">
            <Steps
              direction="vertical"
              items={gates.map((gate) => ({
                title: gate.title,
                description: (
                  <Flex align="center" gap={8} wrap="wrap">
                    <Text type="secondary">{gate.description}</Text>
                    <StatusTag status={gate.status} />
                  </Flex>
                ),
                status: toGateStatus(gate.status),
              }))}
            />
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card title="Approvers / Reviewers">
            <Space orientation="vertical" size={12} style={{ width: '100%' }}>
              <Progress percent={approvalPercent} />
              {approvals.map((approval) => (
                <Flex key={approval.name} align="center" justify="space-between" gap={12}>
                  <Flex align="center" gap={10}>
                    <Avatar>{approval.name.slice(0, 1)}</Avatar>
                    <div>
                      <Text strong>{approval.name}</Text>
                      <br />
                      <Text type="secondary">{approval.role}</Text>
                    </div>
                  </Flex>
                  <Space>
                    {approval.required ? <StatusTag status="warning" label="Required" /> : null}
                    <StatusTag status={approval.status} label={approval.label} />
                  </Space>
                </Flex>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card
            title="Pipeline Summary"
            extra={
              pipelinePath ? (
                <Button size="small" onClick={() => navigate(pipelinePath)}>
                  View pipeline
                </Button>
              ) : null
            }
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Pipeline ID">
                {pipelinePath ? <Link to={pipelinePath}>#{pipeline?.id}</Link> : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <StatusTag status={pipeline?.status ?? mergeRequest.pipeline} />
              </Descriptions.Item>
              <Descriptions.Item label="Branch">{pipeline?.branch ?? mergeRequest.source}</Descriptions.Item>
              <Descriptions.Item label="Commit">{pipeline?.commit ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="Trigger">{pipeline?.trigger ?? '-'}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card title="Security Summary">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Security ID">{security?.id ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <StatusTag status={security?.vstatus ?? mergeRequest.security} label={security?.vlabel ?? mergeRequest.securityLabel} />
              </Descriptions.Item>
              <Descriptions.Item label="Policy">{security?.policyLabel ?? '-'}</Descriptions.Item>
            </Descriptions>
            <Row gutter={[8, 8]} className="mr-security-counts">
              {[
                ['Critical', security?.severity?.critical ?? 0, 'failed'],
                ['High', security?.severity?.high ?? 0, 'failed'],
                ['Medium', security?.severity?.medium ?? 0, 'warning'],
                ['Low', security?.severity?.low ?? 0, 'none'],
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
          </Card>
        </Col>
      </Row>

      <Card title="Changes Summary">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Changed files">{changedFiles}</Descriptions.Item>
              <Descriptions.Item label="Additions">{additions}</Descriptions.Item>
              <Descriptions.Item label="Deletions">{deletions}</Descriptions.Item>
              <Descriptions.Item label="Commit count">{commitCount}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} md={16}>
            <Space orientation="vertical" size={8} className="mr-file-preview">
              {['src/auth/policy.ts', 'src/auth/response.ts', 'test/auth-policy.spec.ts'].map((file) => (
                <Flex key={file} align="center" justify="space-between">
                  <Text code>{file}</Text>
                  <Text type="secondary">Diff preview placeholder</Text>
                </Flex>
              ))}
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card title="Activity">
            <Timeline
              items={activities.map((activity) => ({
                icon: activity.type?.includes('pipeline') ? <CodeOutlined /> : <CheckCircleOutlined />,
                content: (
                  <Space orientation="vertical" size={2}>
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

        <Col xs={24} xl={12}>
          <Card title="Comments">
            <Space orientation="vertical" size={12} style={{ width: '100%' }}>
              {comments.map((comment) => (
                <Card size="small" key={comment.id}>
                  <Flex align="flex-start" gap={10}>
                    <Avatar>{comment.avatar ?? comment.author?.slice(0, 1)}</Avatar>
                    <div>
                      <Flex align="center" gap={8} wrap="wrap">
                        <Text strong>{comment.author}</Text>
                        <Text type="secondary">{comment.context}</Text>
                        <Text type="secondary">{comment.createdAt}</Text>
                      </Flex>
                      <Paragraph className="mr-comment-body">{comment.body}</Paragraph>
                    </div>
                  </Flex>
                </Card>
              ))}
              {comments.length === 0 ? (
                <Flex align="center" gap={8}>
                  <CloseCircleOutlined />
                  <Text type="secondary">아직 표시할 댓글이 없습니다.</Text>
                </Flex>
              ) : null}
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider />
    </Space>
  )
}

export default MergeRequestDetail
