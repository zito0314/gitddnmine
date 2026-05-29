import {
  CheckCircleOutlined,
  CommentOutlined,
  DownOutlined,
  PullRequestOutlined,
  ShieldOutlined,
  UserOutlined,
} from '../components/icons'
import { Badge, Button, Card, Empty, Flex, Input, Select, Space, Tabs, Tag, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMergeRequests } from '../api/mergeRequests'
import { getRepositories } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { FilterBar, PageHeader } from '../components/common'

const { Search } = Input
const { Text, Title } = Typography

const DASHBOARD_TABS = [
  { key: 'mine', label: '나의 MR' },
  { key: 'mergeable', label: '병합 가능' },
  { key: 'changesRequired', label: '수정 필요' },
  { key: 'reviewRequired', label: '검토 필요' },
]

const STATUS_TABS = [
  { key: 'open', label: 'Open' },
  { key: 'closed', label: 'Closed' },
  { key: 'merged', label: 'Merged' },
  { key: 'draft', label: 'Draft' },
  { key: 'all', label: '전체' },
]

const PERIOD_OPTIONS = [
  { value: '1m', label: '1개월' },
  { value: '3m', label: '3개월' },
  { value: '6m', label: '6개월' },
]

const SECURITY_META = {
  passed: { label: '보안 통과', color: 'success' },
  failed: { label: '보안 실패', color: 'error' },
  blocked: { label: '보안 실패', color: 'error' },
  warning: { label: '보안 확인 필요', color: 'warning' },
  not_checked: { label: '보안 미확인', color: 'default' },
  none: { label: '보안 미확인', color: 'default' },
}

const APPROVAL_META = {
  approved: { label: '승인완료', color: 'success' },
  required: { label: '승인 필요', color: 'warning' },
  rejected: { label: '승인반려', color: 'error' },
  none: { label: '미승인', color: 'default' },
}

const REVIEW_META = {
  approved: { label: '리뷰 승인', color: 'success' },
  required: { label: '리뷰 필요', color: 'warning' },
  changes_requested: { label: '변경 요청', color: 'error' },
  none: { label: '리뷰 없음', color: 'default' },
}

const CARD_STATUS_META = {
  mergeable: { label: '병합 가능', color: 'success' },
  changesRequired: { label: '수정 필요', color: 'warning' },
  reviewRequired: { label: '승인/리뷰 필요', color: 'error' },
  default: { label: 'MR', color: 'default' },
}

function uniqueOptions(values, labelMap = {}) {
  return [...new Set(values.filter(Boolean))].map((value) => ({
    value,
    label: labelMap[value]?.label ?? value,
  }))
}

function toApprovalStatus(mr) {
  if (mr.review === 'rejected') return 'rejected'
  if ((mr.approved ?? 0) >= (mr.required ?? 0)) return 'approved'
  if ((mr.required ?? 0) > 0) return 'required'
  return 'none'
}

function toReviewStatus(mr) {
  if (mr.review === 'approved') return 'approved'
  if (mr.review === 'rejected') return 'changes_requested'
  if (mr.review === 'need-review') return 'required'
  return 'none'
}

function isMergeable(mr) {
  return mr.status === 'open' &&
    mr.approvalStatus === 'approved' &&
    mr.reviewStatus === 'approved' &&
    mr.pipelineStatus === 'passed' &&
    mr.securityStatus === 'passed'
}

function isChangesRequired(mr) {
  return mr.reviewStatus === 'changes_requested' ||
    ['failed', 'blocked'].includes(mr.pipelineStatus) ||
    ['failed', 'blocked'].includes(mr.securityStatus)
}

function isReviewRequired(mr) {
  return mr.reviewStatus === 'required' || mr.approvalStatus === 'required'
}

function getCardStatusKey(mr) {
  if (isMergeable(mr)) return 'mergeable'
  if (isChangesRequired(mr)) return 'changesRequired'
  if (isReviewRequired(mr)) return 'reviewRequired'
  return 'default'
}

function getTabLabel(label, count) {
  return (
    <Flex align="center" gap={6}>
      <span>{label}</span>
      <Badge count={count} showZero color="var(--gitddn-primary-soft)" className="mr-dashboard-tab-count" />
    </Flex>
  )
}

function isOwnedByCurrentUser(mr, currentUserKey, isAdmin) {
  if (isAdmin || !currentUserKey) return true
  return [mr.owner, mr.author].filter(Boolean).some(
    (value) => String(value).toLowerCase() === String(currentUserKey).toLowerCase(),
  )
}

function getDashboardCardItems(mergeRequests) {
  const pick = (predicate) => mergeRequests.find(predicate) ?? mergeRequests[0]

  return DASHBOARD_TABS.map((tab) => ({
    ...tab,
    mergeRequest: pick((mr) => {
      if (tab.key === 'mine') return mr.isMine
      if (tab.key === 'mergeable') return isMergeable(mr)
      if (tab.key === 'changesRequired') return isChangesRequired(mr)
      if (tab.key === 'reviewRequired') return isReviewRequired(mr)
      return false
    }),
  })).filter((item) => item.mergeRequest)
}

export default function MergeRequestList() {
  const navigate = useNavigate()
  const auth = useAuth()
  const repositories = getRepositories()
  const repositoryMap = useMemo(
    () => new Map(repositories.map((repository) => [repository.id, repository])),
    [repositories],
  )
  const mergeRequests = getMergeRequests()
  const [activeStatus, setActiveStatus] = useState('open')
  const [repositoryId, setRepositoryId] = useState(null)
  const [search, setSearch] = useState('')
  const [author, setAuthor] = useState(null)
  const [securityStatus, setSecurityStatus] = useState(null)
  const [approvalStatus, setApprovalStatus] = useState(null)
  const [period, setPeriod] = useState('1m')
  const currentUserKey = auth.currentUser?.id ?? auth.currentUser?.name

  const enrichedMergeRequests = useMemo(
    () =>
      mergeRequests.map((mr) => {
        const repository = repositoryMap.get(mr.repo)
        return {
          ...mr,
          repository,
          repositoryName: repository?.name ?? mr.repo,
          projectName: repository?.group ?? mr.repoGroup,
          sourceBranch: mr.sourceBranch ?? mr.source,
          targetBranch: mr.targetBranch ?? mr.target,
          updatedAtText: mr.updatedAtText ?? `${mr.updatedAt} 마지막 업데이트`,
          commentsCount: mr.comments ?? 0,
          pipelineStatus: mr.pipeline ?? 'not_started',
          securityStatus: mr.security ?? 'not_checked',
          approvalStatus: toApprovalStatus(mr),
          reviewStatus: toReviewStatus(mr),
          isMine: isOwnedByCurrentUser(mr, currentUserKey, auth.isAdmin),
        }
      }),
    [auth.isAdmin, currentUserKey, mergeRequests, repositoryMap],
  )

  const dashboardCounts = useMemo(
    () => ({
      mine: enrichedMergeRequests.filter((mr) => mr.isMine).length,
      mergeable: enrichedMergeRequests.filter(isMergeable).length,
      changesRequired: enrichedMergeRequests.filter(isChangesRequired).length,
      reviewRequired: enrichedMergeRequests.filter(isReviewRequired).length,
    }),
    [enrichedMergeRequests],
  )

  const dashboardTabItems = DASHBOARD_TABS.map((tab) => ({
    key: tab.key,
    label: getTabLabel(tab.label, dashboardCounts[tab.key] ?? 0),
  }))
  const dashboardCardItems = getDashboardCardItems(enrichedMergeRequests)

  const filteredMergeRequests = enrichedMergeRequests.filter((mr) => {
    const query = search.trim().toLowerCase()
    const searchable = [
      mr.title,
      mr.summary,
      mr.repositoryName,
      mr.projectName,
      mr.author,
      mr.sourceBranch,
      mr.targetBranch,
    ].join(' ').toLowerCase()

    if (activeStatus !== 'all' && mr.status !== activeStatus) return false
    if (repositoryId && mr.repo !== repositoryId) return false
    if (query && !searchable.includes(query)) return false
    if (author && mr.author !== author) return false
    if (securityStatus && mr.securityStatus !== securityStatus) return false
    if (approvalStatus && mr.approvalStatus !== approvalStatus) return false
    return true
  })

  const canCreateMr = auth.hasPermission('mr:create')
  const createTargetRepositoryId = repositories[0]?.id

  return (
    <Space orientation="vertical" size={16} className="page-stack mr-dashboard-page">
      <PageHeader
        title="MR 대시보드"
        description="내가 생성했거나 리뷰/승인이 필요한 MR을 저장소 단위로 확인할 수 있어요. 각 MR의 Pipeline, 보안 점검, 리뷰 상태를 한 화면에서 비교해 보세요."
        actions={
          canCreateMr && createTargetRepositoryId ? (
            <Button type="primary" icon={<PullRequestOutlined />} onClick={() => navigate(`/repositories/${createTargetRepositoryId}/merge-requests/new`)}>
              MR 생성
            </Button>
          ) : null
        }
      />

      <Space orientation="vertical" size={16} className="mr-dashboard-content">
        <Flex align="center" justify="space-between" gap={16} wrap className="mr-dashboard-summary-head">
          <Tabs activeKey="mine" items={dashboardTabItems} className="mr-dashboard-summary-tabs" />
          <Flex align="center" gap={8} wrap>
            <Select
              value={period}
              onChange={setPeriod}
              options={PERIOD_OPTIONS}
              suffixIcon={<DownOutlined />}
              className="mr-dashboard-period-select"
            />
            <Button>전체보기</Button>
          </Flex>
        </Flex>

        <div className="mr-dashboard-card-grid">
          {dashboardCardItems.map((item) => (
            <MergeRequestSummaryCard
              key={item.key}
              mergeRequest={item.mergeRequest}
              statusKey={item.key}
              onClick={() => navigate(`/repositories/${item.mergeRequest.repo}/merge-requests/${item.mergeRequest.id}`)}
            />
          ))}
        </div>

        <Tabs
          activeKey={activeStatus}
          items={STATUS_TABS}
          onChange={setActiveStatus}
          className="mr-dashboard-status-tabs"
        />

        <FilterBar className="mr-filter-bar">
          <Select
            allowClear
            placeholder="전체 저장소"
            value={repositoryId}
            onChange={setRepositoryId}
            options={repositories.map((repository) => ({ value: repository.id, label: repository.name }))}
            className="filter-select filter-select--xl"
          />
          <Search
            allowClear
            placeholder="저장소명, 프로젝트명, 담당 조직 선택"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="filter-search-fill"
          />
          <Select
            allowClear
            placeholder="작성자"
            value={author}
            onChange={setAuthor}
            options={uniqueOptions(enrichedMergeRequests.map((mr) => mr.author))}
            className="filter-select filter-select--md"
          />
          <Select
            allowClear
            placeholder="보안 상태"
            value={securityStatus}
            onChange={setSecurityStatus}
            options={uniqueOptions(enrichedMergeRequests.map((mr) => mr.securityStatus), SECURITY_META)}
            className="filter-select filter-select--lg"
          />
          <Select
            allowClear
            placeholder="승인 상태"
            value={approvalStatus}
            onChange={setApprovalStatus}
            options={uniqueOptions(enrichedMergeRequests.map((mr) => mr.approvalStatus), APPROVAL_META)}
            className="filter-select filter-select--lg"
          />
        </FilterBar>

        <Card className="mr-dashboard-list-card">
          <Flex vertical className="mr-dashboard-list">
            {filteredMergeRequests.length > 0 ? (
              filteredMergeRequests.map((mr) => (
                <MergeRequestRow
                  key={mr.id}
                  mergeRequest={mr}
                  onClick={() => navigate(`/repositories/${mr.repo}/merge-requests/${mr.id}`)}
                />
              ))
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Space orientation="vertical" size={2}>
                    <Text>조건에 맞는 MR이 없어요.</Text>
                    <Text type="secondary">필터를 변경하거나 검색어를 다시 입력해 주세요.</Text>
                  </Space>
                }
              />
            )}
          </Flex>
        </Card>
      </Space>
    </Space>
  )
}

function MergeRequestSummaryCard({ mergeRequest, statusKey, onClick }) {
  const statusMeta = CARD_STATUS_META[statusKey] ?? CARD_STATUS_META[getCardStatusKey(mergeRequest)] ?? CARD_STATUS_META.default

  return (
    <Card className="mr-dashboard-summary-card" hoverable onClick={onClick}>
      <Space orientation="vertical" size={18} className="mr-dashboard-card-content">
        <Flex align="flex-start" justify="space-between" gap={12}>
          <Space orientation="vertical" size={8} className="mr-dashboard-card-main">
            <Text type="secondary" className="mr-dashboard-card-repository">{mergeRequest.repositoryName}</Text>
            <Title level={5} className="mr-dashboard-card-title">{mergeRequest.title}</Title>
          </Space>
          {statusMeta.label !== 'MR' ? (
            <Tag color={statusMeta.color} className="mr-dashboard-card-status">{statusMeta.label}</Tag>
          ) : null}
        </Flex>

        <BranchLine source={mergeRequest.sourceBranch} target={mergeRequest.targetBranch} />
      </Space>
    </Card>
  )
}

function MergeRequestRow({ mergeRequest, onClick }) {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap={16}
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
      <Tag color="success" className="mr-dashboard-row-status" icon={<PullRequestOutlined />}>
        {mergeRequest.status === 'open' ? 'Open' : mergeRequest.status}
      </Tag>
      <Space orientation="vertical" size={4} className="mr-dashboard-row-content">
        <Flex align="center" gap={6} wrap>
          <Text strong className="mr-dashboard-row-title">{mergeRequest.title}</Text>
          {mergeRequest.pipelineStatus === 'passed' ? <CheckCircleOutlined className="mr-dashboard-row-success-icon" /> : null}
        </Flex>
        <Flex align="center" gap={8} wrap className="mr-dashboard-row-description">
          <Text type="secondary">{mergeRequest.repositoryName}</Text>
          <Text type="secondary">· !{mergeRequest.id}</Text>
          <Text type="secondary">· {mergeRequest.author} 생성</Text>
          <BranchLine source={mergeRequest.sourceBranch} target={mergeRequest.targetBranch} compact />
        </Flex>
      </Space>

      <Flex align="center" justify="flex-end" gap={10} wrap className="mr-dashboard-row-meta">
        <Text type="secondary">{mergeRequest.updatedAtText}</Text>
        <Text type="secondary"><CommentOutlined /> {mergeRequest.commentsCount}</Text>
        <Text type="secondary"><ShieldOutlined /> {APPROVAL_META[mergeRequest.approvalStatus]?.label ?? '미승인'}</Text>
        <Text type="secondary"><UserOutlined /> {REVIEW_META[mergeRequest.reviewStatus]?.label ?? '리뷰 없음'}</Text>
      </Flex>
    </Flex>
  )
}

function BranchLine({ source, target, compact = false }) {
  return (
    <Flex align="center" gap={8} wrap="nowrap" className={compact ? 'mr-dashboard-branch-line mr-dashboard-branch-line-compact' : 'mr-dashboard-branch-line'}>
      <Tag className="mr-dashboard-branch-tag">{source}</Tag>
      <Text className="mr-dashboard-branch-arrow">›</Text>
      <Tag className="mr-dashboard-branch-tag">{target}</Tag>
    </Flex>
  )
}
