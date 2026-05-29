import {
  CommentOutlined,
  PullRequestOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '../components/icons'
import { Badge, Button, Card, Empty, Flex, Input, Select, Space, Tabs, Tag, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRepositoryDetail, getRepositoryMergeRequests } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { PageHeader, StatusTag } from '../components/common'

const { Search } = Input
const { Text } = Typography

const STATUS_TABS = [
  { key: 'open', label: 'Open' },
  { key: 'closed', label: 'Closed' },
  { key: 'merged', label: 'Merged' },
  { key: 'draft', label: 'Draft' },
  { key: 'all', label: '전체' },
]

const SECURITY_OPTIONS = [
  { value: 'passed', label: '통과' },
  { value: 'warning', label: '확인 필요' },
  { value: 'failed', label: '실패' },
]

const APPROVAL_OPTIONS = [
  { value: 'approved', label: '승인 완료' },
  { value: 'required', label: '승인 필요' },
  { value: 'review', label: '리뷰 필요' },
]

const PIPELINE_META = {
  passed: { label: 'Pipeline 통과', color: 'success' },
  failed: { label: 'Pipeline 실패', color: 'error' },
  running: { label: 'Pipeline 실행 중', color: 'processing' },
  pending: { label: 'Pipeline 대기', color: 'default' },
  canceled: { label: 'Pipeline 취소', color: 'default' },
}

const SECURITY_META = {
  passed: { label: '보안 통과', color: 'success' },
  failed: { label: '보안 실패', color: 'error' },
  blocked: { label: '보안 실패', color: 'error' },
  warning: { label: '보안 확인 필요', color: 'warning' },
  pending: { label: '보안 대기', color: 'default' },
  none: { label: '보안 미확인', color: 'default' },
}

const APPROVAL_META = {
  approved: { label: '승인 완료', color: 'success' },
  required: { label: '승인 필요', color: 'warning' },
  none: { label: '미승인', color: 'default' },
}

const REVIEW_META = {
  approved: { label: '리뷰 완료', color: 'success' },
  'need-review': { label: '리뷰 필요', color: 'warning' },
  reviewing: { label: '검토 중', color: 'processing' },
  rejected: { label: '변경 요청', color: 'error' },
  draft: { label: '리뷰 없음', color: 'default' },
  none: { label: '리뷰 없음', color: 'default' },
}

function toApprovalStatus(mr) {
  if ((mr.required ?? 0) > 0 && (mr.approved ?? 0) >= mr.required) return 'approved'
  if ((mr.approved ?? 0) > 0) return 'required'
  return 'none'
}

function uniqueOptions(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

export default function RepositoryMergeRequests() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const auth = useAuth()
  const repository = getRepositoryDetail(repositoryId)
  const mergeRequests = useMemo(() => getRepositoryMergeRequests(repositoryId), [repositoryId])

  const [activeStatus, setActiveStatus] = useState('open')
  const [search, setSearch] = useState('')
  const [author, setAuthor] = useState(null)
  const [securityStatus, setSecurityStatus] = useState(null)
  const [approvalStatus, setApprovalStatus] = useState(null)

  const enrichedMergeRequests = useMemo(
    () =>
      mergeRequests.map((mr) => ({
        ...mr,
        sourceBranch: mr.sourceBranch ?? mr.source,
        targetBranch: mr.targetBranch ?? mr.target,
        updatedAtText: mr.updatedAtText ?? `${mr.updatedAt} 마지막 업데이트`,
        createdAtText: mr.createdAtText ?? `${mr.author} 생성`,
        commentsCount: mr.comments ?? 0,
        pipelineStatus: mr.pipeline ?? 'pending',
        securityStatus: mr.security ?? 'none',
        approvalStatus: toApprovalStatus(mr),
        reviewStatus: mr.review ?? 'none',
      })),
    [mergeRequests],
  )

  const statusCounts = useMemo(() => {
    const counts = { open: 0, closed: 0, merged: 0, draft: 0, all: enrichedMergeRequests.length }
    enrichedMergeRequests.forEach((mr) => {
      if (counts[mr.status] !== undefined) counts[mr.status] += 1
    })
    return counts
  }, [enrichedMergeRequests])

  const tabItems = STATUS_TABS.map((tab) => ({
    key: tab.key,
    label: (
      <Flex align="center" gap={6}>
        <span>{tab.label}</span>
        <Badge count={statusCounts[tab.key] ?? 0} showZero color="var(--gitddn-primary-soft)" className="repository-mr-tab-count" />
      </Flex>
    ),
  }))

  const authorOptions = useMemo(
    () => uniqueOptions(enrichedMergeRequests.map((mr) => mr.author)),
    [enrichedMergeRequests],
  )

  const filteredMergeRequests = enrichedMergeRequests.filter((mr) => {
    const query = search.trim().toLowerCase()
    const searchable = [mr.title, mr.summary, mr.author, mr.sourceBranch, mr.targetBranch]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    if (activeStatus !== 'all' && mr.status !== activeStatus) return false
    if (query && !searchable.includes(query)) return false
    if (author && mr.author !== author) return false
    if (securityStatus && mr.securityStatus !== securityStatus) return false
    if (approvalStatus) {
      if (approvalStatus === 'review') {
        if (mr.reviewStatus !== 'need-review') return false
      } else if (approvalStatus === 'required') {
        if (!['required', 'none'].includes(mr.approvalStatus)) return false
      } else if (mr.approvalStatus !== approvalStatus) {
        return false
      }
    }
    return true
  })

  const canCreateMr = auth.hasPermission('mr:create')
  const goToCreate = () => navigate(`/repositories/${repositoryId}/merge-requests/new`)

  const createButton = canCreateMr ? (
    <Button type="primary" icon={<PullRequestOutlined />} onClick={goToCreate}>
      MR 생성
    </Button>
  ) : null

  return (
    <Space orientation="vertical" size={16} className="page-stack repository-mr-page">
      <PageHeader
        title="Merge Requests"
        description={`현재 저장소의 Merge Requests를 확인하는 화면입니다.${repository?.name ? ` (${repository.name})` : ''}`}
        actions={createButton}
      />

      <Tabs
        activeKey={activeStatus}
        items={tabItems}
        onChange={setActiveStatus}
        className="mr-dashboard-status-tabs"
      />

      <Flex className="filter-bar mr-filter-bar" align="center" gap={8} wrap="wrap">
        <Search
          allowClear
          placeholder="MR 제목, 작성자, Branch를 검색해 주세요."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="filter-search-fill"
        />
        <Select
          allowClear
          placeholder="작성자"
          value={author}
          onChange={setAuthor}
          options={authorOptions}
          className="filter-select filter-select--md"
        />
        <Select
          allowClear
          placeholder="보안 상태"
          value={securityStatus}
          onChange={setSecurityStatus}
          options={SECURITY_OPTIONS}
          className="filter-select filter-select--lg"
        />
        <Select
          allowClear
          placeholder="승인 상태"
          value={approvalStatus}
          onChange={setApprovalStatus}
          options={APPROVAL_OPTIONS}
          className="filter-select filter-select--lg"
        />
      </Flex>

      <Card className="mr-dashboard-list-card">
        <Flex vertical className="mr-dashboard-list">
          {filteredMergeRequests.length > 0 ? (
            filteredMergeRequests.map((mr) => (
              <RepositoryMergeRequestRow
                key={mr.id}
                mergeRequest={mr}
                onClick={() => navigate(`/repositories/${repositoryId}/merge-requests/${mr.id}`)}
              />
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="repository-mr-empty"
              description={
                <Space orientation="vertical" size={2}>
                  <Text>조건에 맞는 Merge Request가 없습니다.</Text>
                  <Text type="secondary">필터를 변경하거나 새 MR을 생성해보세요.</Text>
                </Space>
              }
            >
              {createButton}
            </Empty>
          )}
        </Flex>
      </Card>
    </Space>
  )
}

function RepositoryMergeRequestRow({ mergeRequest, onClick }) {
  const pipelineMeta = PIPELINE_META[mergeRequest.pipelineStatus]
  const securityMeta = SECURITY_META[mergeRequest.securityStatus]
  const approvalMeta = APPROVAL_META[mergeRequest.approvalStatus] ?? APPROVAL_META.none
  const reviewMeta = REVIEW_META[mergeRequest.reviewStatus] ?? REVIEW_META.none

  return (
    <Flex
      align="center"
      justify="space-between"
      gap={16}
      wrap="wrap"
      className="mr-dashboard-row"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
    >
      <StatusTag status={mergeRequest.status} className="mr-dashboard-row-status" />

      <Space orientation="vertical" size={4} className="mr-dashboard-row-content">
        <Flex align="center" gap={8} wrap>
          <Text strong className="mr-dashboard-row-title">{mergeRequest.title}</Text>
          {pipelineMeta ? <Tag color={pipelineMeta.color}>{pipelineMeta.label}</Tag> : null}
          {securityMeta && mergeRequest.securityStatus !== 'none' ? (
            <Tag color={securityMeta.color}>{securityMeta.label}</Tag>
          ) : null}
        </Flex>
        <Flex align="center" gap={8} wrap className="mr-dashboard-row-description">
          {mergeRequest.repoGroup ? <Text type="secondary">{mergeRequest.repoGroup}</Text> : null}
          <Text type="secondary">!{mergeRequest.id}</Text>
          <Text type="secondary">· {mergeRequest.author}</Text>
          <Text type="secondary">· {mergeRequest.createdAtText}</Text>
          <BranchLine source={mergeRequest.sourceBranch} target={mergeRequest.targetBranch} />
        </Flex>
        {mergeRequest.summary ? (
          <Text type="secondary" ellipsis className="repository-mr-row-summary">{mergeRequest.summary}</Text>
        ) : null}
      </Space>

      <Flex align="center" justify="flex-end" gap={10} wrap className="mr-dashboard-row-meta">
        <Text type="secondary">{mergeRequest.updatedAtText}</Text>
        <Text type="secondary"><CommentOutlined /> {mergeRequest.commentsCount}</Text>
        <Text type="secondary"><SafetyCertificateOutlined /> {approvalMeta.label}</Text>
        <Text type="secondary"><UserOutlined /> {reviewMeta.label}</Text>
      </Flex>
    </Flex>
  )
}

function BranchLine({ source, target }) {
  if (!source && !target) return null
  return (
    <Flex align="center" gap={6} wrap="nowrap" className="mr-dashboard-branch-line mr-dashboard-branch-line-compact">
      <Tag className="mr-dashboard-branch-tag">{source}</Tag>
      <Text className="mr-dashboard-branch-arrow">›</Text>
      <Tag className="mr-dashboard-branch-tag">{target}</Tag>
    </Flex>
  )
}
