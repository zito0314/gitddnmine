import {
  CheckCircleOutlined,
  CodeOutlined,
  CommentOutlined,
  FileTextOutlined,
  GitlabOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '../components/icons'
import {
  Alert,
  App as AntdApp,
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Descriptions,
  Empty,
  Flex,
  Input,
  List,
  Progress,
  Row,
  Space,
  Table,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from 'antd'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getMergeRequestActivities,
  getMergeRequestApprovals,
  getMergeRequestChangedFiles,
  getMergeRequestChanges,
  getMergeRequestComments,
  getMergeRequestCommits,
  getMergeRequestDetail,
  getMergeRequestMergeChecklist,
  getMergeRequestMergePolicy,
  getMergeRequestPipeline,
  getMergeRequestSecurity,
} from '../api/mergeRequests'
import { getPipelineJobs, getPipelineStages } from '../api/pipelines'
import { getRepositoryById } from '../api/repositories'
import { StatusTag, SummaryCard } from '../components/common'

const { Paragraph, Text, Title } = Typography

function getContextRepositoryId(repositoryId, mergeRequest) {
  return repositoryId ?? mergeRequest?.repo
}

function getPipelinePath(repositoryId, mergeRequest, pipeline) {
  if (!pipeline) return null
  const contextRepositoryId = getContextRepositoryId(repositoryId, mergeRequest)
  return repositoryId ? `/repositories/${contextRepositoryId}/pipelines/${pipeline.id}` : `/pipelines/${pipeline.id}`
}

function getMergeState(checklist) {
  const failed = checklist.filter((item) => item.status === 'failed')
  const pending = checklist.filter((item) => item.status === 'pending' || item.status === 'warning')
  if (failed.length > 0) return { status: 'blocked', label: 'Blocked', blockers: failed }
  if (pending.length > 0) return { status: 'warning', label: 'Need Review', blockers: pending }
  return { status: 'passed', label: 'Mergeable', blockers: [] }
}

function getFailedJobsCount(jobs) {
  return jobs.filter((job) => ['failed', 'blocked'].includes(job.status)).length
}

function getPipelineDuration(pipeline) {
  return pipeline?.summary?.find((item) => item.label === '실제 실행 시간')?.value ?? pipeline?.duration ?? '-'
}

function getCommentStatus(comment) {
  if (comment.context?.includes('Resolved')) return 'passed'
  if (comment.context?.includes('반려')) return 'failed'
  return 'reviewing'
}

function MergeRequestDetail() {
  const { repositoryId, mrId, mergeRequestId } = useParams()
  const { message } = AntdApp.useApp()
  const currentMrId = mrId ?? mergeRequestId
  const mergeRequest = getMergeRequestDetail(currentMrId)
  const repository = getRepositoryById(getContextRepositoryId(repositoryId, mergeRequest))
  const pipeline = getMergeRequestPipeline(currentMrId)
  const security = getMergeRequestSecurity(currentMrId)
  const approvals = getMergeRequestApprovals(currentMrId)
  const activities = getMergeRequestActivities(currentMrId)
  const initialComments = getMergeRequestComments(currentMrId)
  const commits = getMergeRequestCommits(currentMrId)
  const changedFiles = getMergeRequestChangedFiles(currentMrId)
  const changes = getMergeRequestChanges(currentMrId)
  const checklist = getMergeRequestMergeChecklist(currentMrId)
  const mergePolicy = getMergeRequestMergePolicy()
  const pipelineStages = pipeline ? getPipelineStages(pipeline.id) : []
  const pipelineJobs = pipeline ? getPipelineJobs(pipeline.id) : []
  const pipelinePath = getPipelinePath(repositoryId, mergeRequest, pipeline)
  const mergeState = getMergeState(checklist)
  const [comments, setComments] = useState(initialComments)
  const [commentText, setCommentText] = useState('')

  const approvalPercent = mergeRequest?.required
    ? Math.round((mergeRequest.approved / mergeRequest.required) * 100)
    : 0
  const isMergeable = mergeState.status === 'passed' && mergeRequest?.status === 'open'

  const action = (text, type = 'success') => {
    message[type](text)
  }

  const addComment = () => {
    const value = commentText.trim()
    if (!value) return
    setComments((items) => [
      {
        id: `optimistic-${Date.now()}`,
        author: 'You',
        avatar: 'Y',
        context: 'Comment',
        body: value,
        createdAt: '방금',
      },
      ...items,
    ])
    setCommentText('')
    message.success('Comment added')
  }

  const overviewItems = useMemo(
    () => [
      {
        key: 'merge-state',
        children: (
          <MergeReadinessCard
            mergeState={mergeState}
            checklist={checklist}
            mergePolicy={mergePolicy}
          />
        ),
      },
    ],
    [checklist, mergePolicy, mergeState],
  )

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

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card className="mr-detail-hero">
        <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
          <div>
            <Space wrap>
              <Tag color="blue">MR #{mergeRequest.id}</Tag>
              <StatusTag status={mergeState.status} label={mergeState.label} />
            </Space>
            <Title level={2}>{mergeRequest.title}</Title>
            <Paragraph type="secondary">{mergeRequest.summary}</Paragraph>
          </div>
          <Space wrap>
            <Button onClick={() => action('Approval recorded')}>Approve</Button>
            <Button onClick={() => action('Change request submitted', 'warning')}>Request changes</Button>
            <Button icon={<CodeOutlined />} onClick={() => action('Pipeline re-run requested')}>Re-run pipeline</Button>
            <Button type="primary" disabled={!isMergeable} onClick={() => action('Merge completed')}>Merge</Button>
            <Button danger onClick={() => action('Merge request closed', 'warning')}>Close MR</Button>
          </Space>
        </Flex>

        <Descriptions className="mr-detail-meta" size="small" column={{ xs: 1, md: 2, xl: 4 }}>
          <Descriptions.Item label="Repository">
            {repositoryId ? repository?.name : <Link to={`/repositories/${mergeRequest.repo}`}>{repository?.name ?? mergeRequest.repo}</Link>}
          </Descriptions.Item>
          <Descriptions.Item label="Branches">
            <Text code>{mergeRequest.source}</Text> → <Text code>{mergeRequest.target}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Author">{mergeRequest.author}</Descriptions.Item>
          <Descriptions.Item label="Created at">{mergeRequest.createdAt ?? mergeRequest.updatedAt}</Descriptions.Item>
          <Descriptions.Item label="Updated at">{mergeRequest.updatedAt}</Descriptions.Item>
          <Descriptions.Item label="MR status"><StatusTag status={mergeRequest.status} /></Descriptions.Item>
          <Descriptions.Item label="Review status"><StatusTag status={mergeRequest.review} label={mergeRequest.reviewLabel} /></Descriptions.Item>
          <Descriptions.Item label="Pipeline / Security">
            <Space>
              <StatusTag status={mergeRequest.pipeline} />
              <StatusTag status={mergeRequest.security} label={mergeRequest.securityLabel} />
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Tabs
        className="mr-detail-tabs"
        items={[
          {
            key: 'overview',
            label: 'Overview',
            children: (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {overviewItems.map((item) => <div key={item.key}>{item.children}</div>)}
                <OverviewTab
                  mergeRequest={mergeRequest}
                  approvals={approvals}
                  approvalPercent={approvalPercent}
                  activities={activities}
                  pipeline={pipeline}
                  pipelineJobs={pipelineJobs}
                  pipelinePath={pipelinePath}
                  security={security}
                  changes={changes}
                  comments={comments}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  addComment={addComment}
                />
              </Space>
            ),
          },
          {
            key: 'commits',
            label: 'Commits',
            children: <CommitsTab commits={commits} />,
          },
          {
            key: 'pipeline',
            label: 'Pipeline',
            children: (
              <PipelineTab
                pipeline={pipeline}
                pipelinePath={pipelinePath}
                stages={pipelineStages}
                jobs={pipelineJobs}
              />
            ),
          },
          {
            key: 'changes',
            label: 'Changes',
            children: <ChangesTab changes={changes} files={changedFiles} />,
          },
        ]}
      />
    </Space>
  )
}

function MergeReadinessCard({ mergeState, checklist, mergePolicy }) {
  const alertType = mergeState.status === 'passed' ? 'success' : mergeState.status === 'blocked' ? 'error' : 'warning'

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={14}>
        <Card title="Merge readiness">
          <Alert
            type={alertType}
            showIcon
            message={mergeState.label}
            description={
              mergeState.blockers.length
                ? mergeState.blockers.map((item) => item.label).join(' · ')
                : 'All required merge conditions are satisfied.'
            }
          />
          <List
            style={{ marginTop: 12 }}
            dataSource={checklist}
            renderItem={(item) => (
              <List.Item>
                <Flex align="center" justify="space-between" style={{ width: '100%' }}>
                  <Text>{item.label}</Text>
                  <StatusTag status={item.status} />
                </Flex>
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} xl={10}>
        <Card title="Applied merge policy">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Policy">{mergePolicy.name}</Descriptions.Item>
            <Descriptions.Item label="Minimum approvals">{mergePolicy.minimumApprovals}</Descriptions.Item>
            <Descriptions.Item label="Pipeline success">{mergePolicy.requirePipelineSuccess ? 'Required' : 'Optional'}</Descriptions.Item>
            <Descriptions.Item label="Security validation">{mergePolicy.requireSecurityValidation ? 'Required' : 'Optional'}</Descriptions.Item>
            <Descriptions.Item label="Resolved discussions">{mergePolicy.requireResolvedDiscussions ? 'Required' : 'Optional'}</Descriptions.Item>
            <Descriptions.Item label="No conflicts">{mergePolicy.requireNoConflicts ? 'Required' : 'Optional'}</Descriptions.Item>
            <Descriptions.Item label="Deployment approval">{mergePolicy.requireDeploymentApproval ? 'Required' : 'Optional'}</Descriptions.Item>
            <Descriptions.Item label="Allowed roles">{mergePolicy.allowedMergeRoles.join(', ')}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  )
}

function OverviewTab({
  mergeRequest,
  approvals,
  approvalPercent,
  activities,
  pipeline,
  pipelineJobs,
  pipelinePath,
  security,
  changes,
  comments,
  commentText,
  setCommentText,
  addComment,
}) {
  return (
    <>
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Approval" value={`${mergeRequest.approved}/${mergeRequest.required}`} icon={<UserOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Pipeline" value={pipeline?.status ?? mergeRequest.pipeline} icon={<CodeOutlined />} tone={mergeRequest.pipeline === 'failed' ? 'danger' : 'success'} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Security" value={security?.vlabel ?? mergeRequest.securityLabel} icon={<SafetyCertificateOutlined />} tone={mergeRequest.security === 'failed' ? 'danger' : 'success'} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Changed files" value={changes.summary.changedFiles} icon={<FileTextOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Commits" value={changes.summary.commitsCount} icon={<GitlabOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Comments" value={comments.length} icon={<CommentOutlined />} /></Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={10}>
          <Card title="Approvers / Reviewers">
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
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
                    {approval.required ? <Tag color="gold">Required</Tag> : null}
                    <StatusTag status={approval.status} label={approval.label} />
                  </Space>
                </Flex>
              ))}
              {approvals.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : null}
            </Space>
          </Card>
        </Col>
        <Col xs={24} xl={14}>
          <Card title="Activity">
            <Timeline
              items={activities.map((activity) => ({
                dot: activity.type?.includes('pipeline') ? <CodeOutlined /> : <CheckCircleOutlined />,
                children: (
                  <Space direction="vertical" size={2}>
                    <Space wrap>
                      <Text strong>{activity.actor}</Text>
                      <StatusTag status={activity.type?.includes('security') ? 'warning' : 'info'} label={activity.type ?? 'activity'} />
                    </Space>
                    <Text>{activity.message}</Text>
                    <Text type="secondary">{activity.createdAt}</Text>
                  </Space>
                ),
              }))}
            />
            {activities.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : null}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={8}>
          <Card title="Pipeline Summary" extra={pipelinePath ? <Link to={pipelinePath}>View pipeline</Link> : null}>
            {pipeline ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Pipeline ID">#{pipeline.id}</Descriptions.Item>
                <Descriptions.Item label="Status"><StatusTag status={pipeline.status} /></Descriptions.Item>
                <Descriptions.Item label="Branch">{pipeline.branch}</Descriptions.Item>
                <Descriptions.Item label="Commit SHA">{pipeline.commit ?? '-'}</Descriptions.Item>
                <Descriptions.Item label="Failed jobs">{getFailedJobsCount(pipelineJobs)}</Descriptions.Item>
                <Descriptions.Item label="Duration">{getPipelineDuration(pipeline)}</Descriptions.Item>
                <Descriptions.Item label="Updated at">{pipeline.updatedAt}</Descriptions.Item>
              </Descriptions>
            ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="연결된 Pipeline이 없습니다." />}
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Security Summary">
            {security ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Security ID"><Link to={`/security/${security.id}`}>{security.id}</Link></Descriptions.Item>
                <Descriptions.Item label="Validation status"><StatusTag status={security.vstatus} label={security.vlabel} /></Descriptions.Item>
                <Descriptions.Item label="Policy decision"><StatusTag status={security.policy} label={security.policyLabel} /></Descriptions.Item>
                <Descriptions.Item label="Critical / High / Medium / Low">{security.severity?.critical ?? 0} / {security.severity?.high ?? 0} / {security.severity?.medium ?? 0} / {security.severity?.low ?? 0}</Descriptions.Item>
                <Descriptions.Item label="Last checked">{security.lastCheckedAt}</Descriptions.Item>
              </Descriptions>
            ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="연결된 Security 결과가 없습니다." />}
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Changes Summary">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Changed files">{changes.summary.changedFiles}</Descriptions.Item>
              <Descriptions.Item label="Additions">{changes.summary.additions}</Descriptions.Item>
              <Descriptions.Item label="Deletions">{changes.summary.deletions}</Descriptions.Item>
              <Descriptions.Item label="Commits count">{changes.summary.commitsCount}</Descriptions.Item>
              <Descriptions.Item label="Main paths">
                <Space direction="vertical">{changes.summary.mainPaths.map((path) => <Text code key={path}>{path}</Text>)}</Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Card title="Comments">
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          {comments.map((comment) => (
            <Card size="small" key={comment.id}>
              <Flex align="flex-start" gap={10}>
                <Avatar>{comment.avatar ?? comment.author?.slice(0, 1)}</Avatar>
                <div style={{ flex: 1 }}>
                  <Flex align="center" gap={8} wrap="wrap">
                    <Text strong>{comment.author}</Text>
                    <StatusTag status={getCommentStatus(comment)} label={comment.context} />
                    <Text type="secondary">{comment.createdAt}</Text>
                  </Flex>
                  <Paragraph className="mr-comment-body">{comment.body}</Paragraph>
                </div>
              </Flex>
            </Card>
          ))}
          {comments.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="아직 표시할 댓글이 없습니다." /> : null}
          <Input.TextArea rows={3} value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Add a comment..." />
          <Button type="primary" onClick={addComment}>Add Comment</Button>
        </Space>
      </Card>
    </>
  )
}

function CommitsTab({ commits }) {
  if (commits.length === 0) return <Empty description="표시할 Commit이 없습니다." />

  return (
    <Card>
      <List
        dataSource={commits}
        renderItem={(commit) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Space wrap>
                  <Text code>{String(commit.sha).slice(0, 8)}</Text>
                  <Text strong>{commit.message ?? commit.title}</Text>
                </Space>
              }
              description={`${commit.author} · ${commit.branch} · ${commit.createdAt}`}
            />
            <Space>
              <Tag>{commit.changedFiles ?? 0} files</Tag>
              <Text type="success">+{commit.added ?? 0}</Text>
              <Text type="danger">-{commit.removed ?? 0}</Text>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  )
}

function PipelineTab({ pipeline, pipelinePath, stages, jobs }) {
  if (!pipeline) return <Empty description="연결된 Pipeline이 없습니다." />

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card title="Pipeline summary" extra={pipelinePath ? <Button><Link to={pipelinePath}>Pipeline 상세 보기</Link></Button> : null}>
        <Descriptions column={{ xs: 1, md: 2, xl: 4 }} bordered>
          <Descriptions.Item label="Pipeline ID">#{pipeline.id}</Descriptions.Item>
          <Descriptions.Item label="Status"><StatusTag status={pipeline.status} /></Descriptions.Item>
          <Descriptions.Item label="Trigger">{pipeline.trigger ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="Branch">{pipeline.branch}</Descriptions.Item>
          <Descriptions.Item label="Commit SHA">{pipeline.commit ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="Duration">{getPipelineDuration(pipeline)}</Descriptions.Item>
          <Descriptions.Item label="Created at">{pipeline.createdAt ?? pipeline.updatedAt}</Descriptions.Item>
          <Descriptions.Item label="Updated at">{pipeline.updatedAt}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="Stage flow">
        <Flex gap={8} wrap="wrap">
          {stages.map((stage) => (
            <Tag key={stage.name} className="mr-stage-tag">
              {stage.name} · <StatusTag status={stage.status} />
            </Tag>
          ))}
        </Flex>
      </Card>
      <Card title="Jobs">
        <Table
          rowKey="id"
          dataSource={jobs}
          pagination={false}
          columns={[
            { title: 'Job name', dataIndex: 'name' },
            { title: 'Stage', dataIndex: 'stage' },
            { title: 'Status', dataIndex: 'status', render: (value) => <StatusTag status={value} /> },
            { title: 'Runner', dataIndex: 'runner' },
            { title: 'Duration', dataIndex: 'duration' },
            { title: 'Started at', dataIndex: 'startedAt' },
            { title: 'Finished at', dataIndex: 'finishedAt' },
          ]}
        />
      </Card>
    </Space>
  )
}

function ChangesTab({ changes, files }) {
  if (files.length === 0) return <Empty description="표시할 변경 파일이 없습니다." />

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={8}><SummaryCard title="Changed files" value={changes.summary.changedFiles} /></Col>
        <Col xs={24} md={8}><SummaryCard title="Additions" value={changes.summary.additions} tone="success" /></Col>
        <Col xs={24} md={8}><SummaryCard title="Deletions" value={changes.summary.deletions} tone="danger" /></Col>
      </Row>
      <Card title="File changes">
        <Collapse
          items={files.map((file) => ({
            key: file.id,
            label: (
              <Flex align="center" justify="space-between" gap={12}>
                <Space wrap>
                  <Text code>{file.path}</Text>
                  <StatusTag status={file.changeType === 'deleted' ? 'failed' : file.changeType === 'added' ? 'passed' : 'info'} label={file.changeType} />
                </Space>
                <Text type="secondary">+{file.additions} / -{file.deletions}</Text>
              </Flex>
            ),
            children: (
              <Paragraph code className="mr-diff-preview">
                {file.diff.map((line) => `${line}\n`)}
              </Paragraph>
            ),
          }))}
        />
      </Card>
    </Space>
  )
}

export default MergeRequestDetail
