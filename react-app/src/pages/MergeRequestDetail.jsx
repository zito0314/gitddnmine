import {
  CheckCircleOutlined,
  CodeOutlined,
  CommentOutlined,
  EditOutlined,
  FileTextOutlined,
  GoBackOutlined,
  LinkOutlined,
  SafetyCertificateOutlined,
  UploadOutlined,
} from '../components/icons'
import {
  App as AntdApp,
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Empty,
  Flex,
  Input,
  Progress,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getMergeRequestChangedFiles,
  getMergeRequestCommits,
  getMergeRequestDetail,
  getMergeRequestPipeline,
} from '../api/mergeRequests'

const { Paragraph, Text, Title } = Typography

const STATUS_COLORS = {
  open: 'success',
  merged: 'processing',
  closed: 'default',
  draft: 'default',
  failed: 'error',
  passed: 'success',
  required: 'warning',
}

const ACTIVITY_FILTERS = [
  { value: 'all', label: '모든 활동' },
  { value: 'comment', label: '코멘트' },
  { value: 'pipeline', label: 'Pipeline' },
  { value: 'approval', label: '승인' },
  { value: 'security', label: '보안 점검' },
  { value: 'commit', label: 'Commit' },
  { value: 'system', label: '시스템 활동' },
]

const PEOPLE_OPTIONS = ['김동현', '박승인', 'Min', 'Han', 'Park'].map((value) => ({ value, label: value }))
const PROJECT_OPTIONS = ['결제 승인 개선', 'Digital Banking Core', '운영 정책 개선'].map((value) => ({ value, label: value }))

function statusTag(status, label) {
  return <Tag color={STATUS_COLORS[status] ?? 'default'}>{label ?? status}</Tag>
}

function getCompletedPercent(conditions, fallback) {
  if (typeof fallback === 'number') return fallback
  if (!conditions?.length) return 0
  return Math.round((conditions.filter((item) => item.completed).length / conditions.length) * 100)
}

function isMergeable(mergeRequest, conditions) {
  if (typeof mergeRequest.mergeable === 'boolean') return mergeRequest.mergeable
  return conditions.length > 0 && conditions.every((item) => item.completed)
}

function getConditionTitle(condition) {
  if (condition.id === 'approval') return `${condition.title} (${condition.current}/${condition.required})`
  return condition.title
}

function getActivityFilterType(type) {
  if (type?.includes('comment')) return 'comment'
  if (type?.includes('pipeline')) return 'pipeline'
  if (type?.includes('approval')) return 'approval'
  if (type?.includes('security')) return 'security'
  if (type?.includes('commit')) return 'commit'
  return 'system'
}

function renderActivityText(activity, onLinkedValueClick) {
  if (activity.pipelineLabel) {
    return (
      <Text>
        Pipeline <Typography.Link onClick={() => onLinkedValueClick(activity.pipelineLabel)}>{activity.pipelineLabel}</Typography.Link>이 성공했어요.
      </Text>
    )
  }
  if (activity.commitSHA) {
    return (
      <Text>
        {activity.actor}님이 commit 코멘트 <Typography.Link onClick={() => onLinkedValueClick(activity.commitSHA)}>{activity.commitSHA}</Typography.Link>를 작성했어요.
      </Text>
    )
  }
  if (activity.repositoryName) {
    return (
      <Text>
        {activity.actor}님이 Git 저장소 <Typography.Link onClick={() => onLinkedValueClick(activity.repositoryName)}>{activity.repositoryName}</Typography.Link>를 생성했습니다.
      </Text>
    )
  }
  return <Text>{activity.text}</Text>
}

export default function MergeRequestDetail() {
  const { mrId, mergeRequestId } = useParams()
  const { message, modal } = AntdApp.useApp()
  const currentMrId = mrId ?? mergeRequestId
  const mergeRequest = getMergeRequestDetail(currentMrId)
  const commits = getMergeRequestCommits(currentMrId)
  const changedFiles = getMergeRequestChangedFiles(currentMrId)
  const pipeline = getMergeRequestPipeline(currentMrId)
  const [activityFilter, setActivityFilter] = useState('all')
  const [commentText, setCommentText] = useState('')
  const [localActivities, setLocalActivities] = useState([])

  const conditions = mergeRequest?.mergeConditions ?? []
  const progress = getCompletedPercent(conditions, mergeRequest?.mergeProgress)
  const mergeable = mergeRequest ? isMergeable(mergeRequest, conditions) : false
  const activities = [...localActivities, ...(mergeRequest?.activities ?? [])]
  const filteredActivities = activities.filter((activity) => activityFilter === 'all' || getActivityFilterType(activity.type) === activityFilter)

  const tabs = mergeRequest?.tabs ?? {
    commitsCount: commits.length,
    pipelinesCount: pipeline ? 1 : 0,
    changesAdded: 0,
    changesRemoved: 0,
  }

  if (!mergeRequest) {
    return <Empty description={`MR #${currentMrId} 데이터를 찾을 수 없습니다.`} />
  }

  const runAction = (actionId) => {
    if (actionId === 'pipeline-log') message.info('Pipeline #8014 로그를 확인합니다.')
    else if (actionId === 'request-approval') message.success('승인 요청을 보냈어요.')
    else message.info('요청한 작업을 준비 중입니다.')
  }

  const handleMerge = () => {
    modal.confirm({
      title: '이 Merge Request를 병합할까요?',
      content: `병합 대상: ${mergeRequest.targetBranch ?? mergeRequest.target}`,
      okText: 'Merge',
      cancelText: '취소',
      onOk: () => message.success('Merge가 완료되었어요.'),
    })
  }

  const openAssignModal = (kind) => {
    const labels = {
      approver: ['승인자 설정', '승인자가 설정되었어요.'],
      reviewer: ['리뷰어 설정', '리뷰어가 설정되었어요.'],
      project: ['프로젝트 설정', '프로젝트가 연결되었어요.'],
    }
    const [title, successText] = labels[kind]

    modal.confirm({
      title,
      content: (
        <Select
          style={{ width: '100%', marginTop: 12 }}
          placeholder={title}
          options={kind === 'project' ? PROJECT_OPTIONS : PEOPLE_OPTIONS}
        />
      ),
      okText: '저장',
      cancelText: '취소',
      onOk: () => message.success(successText),
    })
  }

  const addComment = () => {
    const value = commentText.trim()
    if (!value) {
      message.warning('코멘트를 입력해 주세요.')
      return
    }
    setLocalActivities((items) => [
      {
        id: `local-comment-${Date.now()}`,
        type: 'comment',
        actor: '나',
        text: value,
        timeText: '방금',
      },
      ...items,
    ])
    setCommentText('')
    message.success('코멘트가 작성되었어요.')
  }

  const closeWithComment = () => {
    modal.confirm({
      title: '코멘트를 작성하고 MR을 닫을까요?',
      okText: '닫기',
      cancelText: '취소',
      okButtonProps: { danger: true },
      onOk: () => message.success('코멘트가 작성되고 MR이 닫혔어요.'),
    })
  }

  const overview = (
    <Row gutter={[24, 24]} align="top">
      <Col xs={24} xl={17}>
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          <MergeStatusCard
            mergeable={mergeable}
            mergeRequest={mergeRequest}
            progress={progress}
            conditions={conditions}
            onAction={runAction}
          />
          <DescriptionCard description={mergeRequest.description} />
          <ActivityCard
            activities={filteredActivities}
            activityFilter={activityFilter}
            setActivityFilter={setActivityFilter}
            onLinkedValueClick={(value) => message.info(`${value} 상세 이동은 준비 중입니다.`)}
          />
          <CommentEditor
            commentText={commentText}
            setCommentText={setCommentText}
            addComment={addComment}
            closeWithComment={closeWithComment}
          />
        </Space>
      </Col>
      <Col xs={24} xl={7}>
        <SidePanel
          mergeRequest={mergeRequest}
          onAction={runAction}
          onAssign={openAssignModal}
        />
      </Col>
    </Row>
  )

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
        <div>
          <Title level={2}>{mergeRequest.title}</Title>
          <Space wrap>
            {statusTag(mergeRequest.status, mergeRequest.status === 'open' ? 'Open' : mergeRequest.status)}
            <Text strong>{mergeRequest.author?.name ?? mergeRequest.author}</Text>
            <Text type="secondary">·</Text>
            <Text>{mergeRequest.createdAtText ?? '2일 전 생성'}</Text>
            <Text type="secondary">·</Text>
            <Tag>{mergeRequest.sourceBranch ?? mergeRequest.source}</Tag>
            <Text>→</Text>
            <Tag>{mergeRequest.targetBranch ?? mergeRequest.target}</Tag>
            <Text type="secondary">·</Text>
            <Text>{mergeRequest.updatedAtText ?? mergeRequest.updatedAt}</Text>
          </Space>
        </div>
        <Space>
          <Button>수정</Button>
          <Tooltip title={!mergeable ? '필수 조건을 완료해야 Merge할 수 있어요.' : ''}>
            <Button type="primary" disabled={!mergeable} onClick={handleMerge}>Merge</Button>
          </Tooltip>
        </Space>
      </Flex>

      <Tabs
        items={[
          { key: 'overview', label: 'Overview', children: overview },
          { key: 'commits', label: `Commits ${tabs.commitsCount}`, children: <PlaceholderTable title="Commits" data={commits} /> },
          { key: 'pipelines', label: `Pipelines ${tabs.pipelinesCount}`, children: <Empty description="Pipeline 상세 탭은 준비 중입니다." /> },
          { key: 'changes', label: `Changes +${tabs.changesAdded} -${tabs.changesRemoved}`, children: <PlaceholderTable title="Changes" data={changedFiles} /> },
        ]}
      />
    </Space>
  )
}

function MergeStatusCard({ mergeable, mergeRequest, progress, conditions, onAction }) {
  return (
    <Card title={mergeable ? 'Merge 가능' : 'Merge 불가'}>
      <Paragraph>
        {mergeable
          ? `모든 필수 조건이 완료되었어요. ${mergeRequest.targetBranch ?? mergeRequest.target} Branch로 Merge할 수 있어요.`
          : `Pipeline 성공과 리뷰어 승인 1건이 필요해요. 필수 조건을 완료하면 ${mergeRequest.targetBranch ?? mergeRequest.target} Branch로 Merge할 수 있어요.`}
      </Paragraph>
      <Flex align="center" gap={12}>
        <Text>Merge 진행도</Text>
        <Progress percent={progress} style={{ flex: 1 }} />
      </Flex>
      <Collapse
        style={{ marginTop: 16 }}
        items={conditions.map((condition) => ({
          key: condition.id,
          label: (
            <Flex align="center" justify="space-between" gap={12}>
              <Space wrap>
                <Text strong>{getConditionTitle(condition)}</Text>
                {condition.statusLabel ? statusTag(condition.status, condition.statusLabel) : null}
              </Space>
              <Tag color={condition.completed ? 'success' : 'warning'}>{condition.completed ? '완료' : '미완료'}</Tag>
            </Flex>
          ),
          children: <ConditionDetail condition={condition} onAction={onAction} />,
        }))}
      />
    </Card>
  )
}

function ConditionDetail({ condition, onAction }) {
  if (condition.id === 'pipeline') {
    return (
      <Space orientation="vertical">
        <Text>{condition.summary}</Text>
        <Text>마지막 Pipeline: {condition.pipelineId}</Text>
        <Button onClick={() => onAction('pipeline-log')}>로그 보기</Button>
      </Space>
    )
  }
  if (condition.id === 'approval') {
    return (
      <Space orientation="vertical">
        <Text>리뷰어 {condition.required}명의 승인이 필요해요.</Text>
        <Text>승인자에게 승인 요청을 보낼 수 있어요.</Text>
        <Button onClick={() => onAction('request-approval')}>승인 요청 보내기</Button>
      </Space>
    )
  }
  if (condition.id === 'security') {
    const vulnerabilities = condition.vulnerabilities ?? {}
    return (
      <Space orientation="vertical">
        <Text>보안 점검 Pipeline이 취약점을 감지했어요.</Text>
        <Space wrap>
          <Tag color="error">치명적 {vulnerabilities.critical ?? 0}</Tag>
          <Tag color="error">매우 위험 {vulnerabilities.high ?? 0}</Tag>
          <Tag color="warning">위험 {vulnerabilities.danger ?? 0}</Tag>
          <Tag color="gold">중간 {vulnerabilities.medium ?? 0}</Tag>
          <Tag>낮음 {vulnerabilities.low ?? 0}</Tag>
          <Tag>매우 낮음 {vulnerabilities.veryLow ?? 0}</Tag>
        </Space>
        <Button onClick={() => onAction('security-report')}>보안 리포트 보기</Button>
      </Space>
    )
  }
  return (
    <Space orientation="vertical">
      <Text>
        {condition.rebaseRequired
          ? 'Target Branch의 최신 변경사항이 반영되지 않았어요. Merge 전 Rebase가 필요해요.'
          : 'Target Branch 기준 최신 상태예요. Rebase가 필요하지 않습니다.'}
      </Text>
      {condition.rebaseRequired ? <Button onClick={() => onAction('rebase-guide')}>Rebase 안내 보기</Button> : null}
    </Space>
  )
}

function DescriptionCard({ description }) {
  const lines = Array.isArray(description) ? description : []
  return (
    <Card title="Description">
      {lines.length > 0
        ? lines.map((line, index) => <Paragraph key={`${index}-${line}`}>{line}</Paragraph>)
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="작성된 Description이 없습니다." />}
    </Card>
  )
}

function ActivityCard({ activities, activityFilter, setActivityFilter, onLinkedValueClick }) {
  return (
    <Card
      title="Activity"
      extra={(
        <Select
          options={ACTIVITY_FILTERS}
          value={activityFilter}
          onChange={setActivityFilter}
          style={{ width: 160 }}
        />
      )}
    >
      {activities.length > 0 ? (
        <Timeline
          items={activities.map((activity) => ({
            icon: activity.type === 'security' ? <SafetyCertificateOutlined /> : activity.type === 'pipeline' ? <CheckCircleOutlined /> : <Avatar size={24}>{(activity.actor ?? 'S').slice(0, 1)}</Avatar>,
            content: (
              <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <Space wrap>
                  {renderActivityText(activity, onLinkedValueClick)}
                  <Text type="secondary">{activity.timeText}</Text>
                </Space>
                <ActivityPayload activity={activity} />
              </Space>
            ),
          }))}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="표시할 Activity가 없습니다." />
      )}
    </Card>
  )
}

function ActivityPayload({ activity }) {
  if (activity.type === 'security') {
    const vulnerabilities = activity.vulnerabilities ?? {}
    return (
      <Card size="small">
        <Space wrap>
          <Tag>{activity.branchName}</Tag>
          <Tag color="error">치명적 {vulnerabilities.critical ?? 0}</Tag>
          <Tag color="error">매우 위험 {vulnerabilities.high ?? 0}</Tag>
          <Tag color="warning">위험 {vulnerabilities.danger ?? 0}</Tag>
          <Tag color="gold">중간 {vulnerabilities.medium ?? 0}</Tag>
          <Tag>낮음 {vulnerabilities.low ?? 0}</Tag>
          <Tag>매우 낮음 {vulnerabilities.veryLow ?? 0}</Tag>
        </Space>
      </Card>
    )
  }
  if (activity.type === 'commit') {
    return (
      <Card size="small">
        <Flex align="center" justify="space-between" gap={12} wrap="wrap">
          <Space>
            <Typography.Link>{activity.commentsCount}개의 코멘트</Typography.Link>
            <Avatar.Group max={{ count: 2 }}>
              <Avatar>김</Avatar>
              <Avatar>박</Avatar>
              <Avatar>+{activity.participantsCount}</Avatar>
            </Avatar.Group>
          </Space>
          <Space>
            <Button size="small" icon={<CommentOutlined />} />
            <Button size="small" icon={<EditOutlined />} />
          </Space>
        </Flex>
      </Card>
    )
  }
  return null
}

function CommentEditor({ commentText, setCommentText, addComment, closeWithComment }) {
  return (
    <Card>
      <Flex align="flex-start" gap={12}>
        <Avatar>김</Avatar>
        <div className="comment-editor-body">
          <Flex align="center" gap={8} wrap="wrap" className="comment-editor-toolbar">
            <Select value="paragraph" options={[{ value: 'paragraph', label: 'Paragraph' }]} className="filter-select filter-select--compact" />
            <Button>B</Button>
            <Button><em>I</em></Button>
            <Button icon={<LinkOutlined />} />
            <Button icon={<FileTextOutlined />} />
            <Button>1.</Button>
            <Button>“”</Button>
            <Button icon={<CodeOutlined />} />
            <Button icon={<UploadOutlined />} />
            <Button icon={<GoBackOutlined />} />
          </Flex>
          <Input.TextArea rows={4} value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="코멘트를 작성해 주세요." />
          <Flex justify="flex-end" gap={8} className="comment-editor-actions">
            <Button danger onClick={closeWithComment}>Close 코멘트 작성</Button>
            <Button type="primary" onClick={addComment}>코멘트 작성</Button>
          </Flex>
        </div>
      </Flex>
    </Card>
  )
}

function SidePanel({ mergeRequest, onAction, onAssign }) {
  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Card title="Next Step">
        <Space orientation="vertical" size={12}>
          {mergeRequest.nextSteps?.map((step) => (
            <Flex key={step.id} justify="space-between" gap={12} align="center">
              <div>
                <Text strong>{step.text}</Text>
                <br />
                <Text type="secondary">{step.description}</Text>
              </div>
              <Button onClick={() => onAction(step.id)}>{step.actionLabel}</Button>
            </Flex>
          ))}
        </Space>
      </Card>
      <AssignmentCard title="승인자" emptyText="승인자 없음" actionLabel="승인자 설정" onClick={() => onAssign('approver')} />
      <AssignmentCard title="리뷰어" emptyText="리뷰어 없음" actionLabel="리뷰어 설정" onClick={() => onAssign('reviewer')} />
      <AssignmentCard title="프로젝트" emptyText="프로젝트 없음" actionLabel="프로젝트 설정" onClick={() => onAssign('project')} />
      <Card title="내부 연계 옵션">
        <Space orientation="vertical">
          <Text type="secondary">연결된 내부 시스템 정보가 없습니다.</Text>
          {['ITBPI 요청번호', 'eCAMS 검증', '운영이관 요청', 'Mattermost 알림'].map((item) => <Tag key={item}>{item}</Tag>)}
        </Space>
      </Card>
    </Space>
  )
}

function AssignmentCard({ title, emptyText, actionLabel, onClick }) {
  return (
    <Card title={title}>
      <Flex justify="space-between" align="center" gap={12}>
        <Text type="secondary">{emptyText}</Text>
        <Button onClick={onClick}>{actionLabel}</Button>
      </Flex>
    </Card>
  )
}

function PlaceholderTable({ title, data }) {
  if (!data?.length) return <Empty description={`${title} 데이터가 없습니다.`} />

  return (
    <Table
      rowKey={(record) => record.id ?? record.sha ?? record.path}
      dataSource={data}
      pagination={false}
      columns={[
        { title: 'Name', dataIndex: 'title', render: (value, record) => value ?? record.path ?? record.sha },
        { title: 'Branch', dataIndex: 'branch', render: (value) => value ?? '-' },
        { title: 'Updated', dataIndex: 'createdAt', render: (value, record) => value ?? record.updatedAt ?? '-' },
      ]}
    />
  )
}
