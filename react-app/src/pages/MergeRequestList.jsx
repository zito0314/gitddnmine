import {
  CheckCircleOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  PullRequestOutlined,
} from '../components/icons'
import { Button, Card, Col, Empty, Flex, Input, Row, Select, Space, Tabs, Tag, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMergeRequests } from '../api/mergeRequests'
import { getRepositories } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { PageHeader, SummaryCard } from '../components/common'

const { Search } = Input
const { Text, Title } = Typography

const STATUS_TABS = [
  { key: 'open', label: 'Open' },
  { key: 'closed', label: 'Closed' },
  { key: 'merged', label: 'Merged' },
  { key: 'draft', label: 'Draft' },
  { key: 'all', label: '전체' },
]

const MR_STATUS_META = {
  open: { label: 'Open', color: 'success' },
  closed: { label: 'Closed', color: 'default' },
  merged: { label: 'Merged', color: 'processing' },
  draft: { label: 'Draft', color: 'default' },
  blocked: { label: 'Open', color: 'success' },
}

const PIPELINE_META = {
  passed: { label: 'Pipeline 통과', color: 'success' },
  failed: { label: 'Pipeline 실패', color: 'error' },
  running: { label: 'Pipeline 실행 중', color: 'processing' },
  pending: { label: 'Pipeline 대기', color: 'warning' },
  not_started: { label: 'Pipeline 미실행', color: 'default' },
  none: { label: 'Pipeline 미실행', color: 'default' },
}

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

function StatusTag({ meta, value }) {
  const item = meta[value] ?? { label: value ?? '-', color: 'default' }
  return <Tag color={item.color}>{item.label}</Tag>
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
        }
      }),
    [mergeRequests, repositoryMap],
  )

  const summary = useMemo(
    () => ({
      open: enrichedMergeRequests.filter((mr) => mr.status === 'open').length,
      reviewRequired: enrichedMergeRequests.filter(
        (mr) => mr.reviewStatus === 'required' || mr.approvalStatus === 'required',
      ).length,
      pipelineFailed: enrichedMergeRequests.filter((mr) => mr.pipelineStatus === 'failed').length,
      securityCheck: enrichedMergeRequests.filter((mr) =>
        ['failed', 'blocked', 'warning', 'not_checked', 'none'].includes(mr.securityStatus),
      ).length,
    }),
    [enrichedMergeRequests],
  )

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
    <Space orientation="vertical" size={16} style={{ width: '100%' }} className="mr-dashboard-page">
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

      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} md={12} xl={6}>
          <SummaryCard title="Open MRs" value={summary.open} description="진행 중인 MR" icon={<PullRequestOutlined />} />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <SummaryCard title="Review Required" value={summary.reviewRequired} description="내 리뷰 또는 승인 필요" tone="warning" />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <SummaryCard title="Pipeline Failed" value={summary.pipelineFailed} description="Pipeline 확인 필요" tone="danger" icon={<ExclamationCircleOutlined />} />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <SummaryCard title="Security Check" value={summary.securityCheck} description="보안 점검 확인 필요" tone="danger" icon={<CheckCircleOutlined />} />
        </Col>
      </Row>

      <Card>
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          <Tabs activeKey={activeStatus} items={STATUS_TABS} onChange={setActiveStatus} />
          <Row gutter={[8, 8]} className="mr-filter-bar">
            <Col xs={24} md={6} xl={4}>
              <Select
                allowClear
                placeholder="전체 저장소"
                value={repositoryId}
                onChange={setRepositoryId}
                options={repositories.map((repository) => ({ value: repository.id, label: repository.name }))}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} md={18} xl={8}>
              <Search
                allowClear
                placeholder="저장소명, 프로젝트명, 담당 조직 선택"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Col>
            <Col xs={24} md={8} xl={4}>
              <Select
                allowClear
                placeholder="작성자"
                value={author}
                onChange={setAuthor}
                options={uniqueOptions(enrichedMergeRequests.map((mr) => mr.author))}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} md={8} xl={4}>
              <Select
                allowClear
                placeholder="보안 상태"
                value={securityStatus}
                onChange={setSecurityStatus}
                options={uniqueOptions(enrichedMergeRequests.map((mr) => mr.securityStatus), SECURITY_META)}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} md={8} xl={4}>
              <Select
                allowClear
                placeholder="승인 상태"
                value={approvalStatus}
                onChange={setApprovalStatus}
                options={uniqueOptions(enrichedMergeRequests.map((mr) => mr.approvalStatus), APPROVAL_META)}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>

          {filteredMergeRequests.length > 0 ? (
            <Space orientation="vertical" size={10} style={{ width: '100%' }}>
              {filteredMergeRequests.map((mr) => (
                <MergeRequestRow
                  key={mr.id}
                  mergeRequest={mr}
                  onClick={() => navigate(`/repositories/${mr.repo}/merge-requests/${mr.id}`)}
                />
              ))}
            </Space>
          ) : (
            <Empty
              description={
                <Space orientation="vertical" size={2}>
                  <Text>조건에 맞는 MR이 없어요.</Text>
                  <Text type="secondary">필터를 변경하거나 검색어를 다시 입력해 주세요.</Text>
                </Space>
              }
            />
          )}
        </Space>
      </Card>
    </Space>
  )
}

function MergeRequestRow({ mergeRequest, onClick }) {
  return (
    <Card className="mr-row-card" hoverable onClick={onClick}>
      <Flex align="center" justify="space-between" gap={16} wrap="wrap">
        <Space orientation="vertical" size={8} style={{ flex: 1, minWidth: 320 }}>
          <Flex align="center" gap={8} wrap="wrap">
            <StatusTag meta={MR_STATUS_META} value={mergeRequest.status} />
            <Title level={5} style={{ margin: 0 }}>{mergeRequest.title}</Title>
            <StatusTag meta={PIPELINE_META} value={mergeRequest.pipelineStatus} />
            <StatusTag meta={SECURITY_META} value={mergeRequest.securityStatus} />
          </Flex>
          <Space wrap size={6}>
            <Text strong>{mergeRequest.repositoryName}</Text>
            <Text type="secondary">·</Text>
            <Text>!{mergeRequest.id}</Text>
            <Text type="secondary">·</Text>
            <Text>{mergeRequest.author} 생성</Text>
            <Text type="secondary">·</Text>
            <Tag>{mergeRequest.sourceBranch}</Tag>
            <Text>→</Text>
            <Tag>{mergeRequest.targetBranch}</Tag>
          </Space>
          {mergeRequest.summary ? <Text type="secondary">{mergeRequest.summary}</Text> : null}
        </Space>

        <Space wrap size={8}>
          <Text type="secondary">{mergeRequest.updatedAtText}</Text>
          <Tag icon={<CommentOutlined />}>{mergeRequest.commentsCount}</Tag>
          <StatusTag meta={APPROVAL_META} value={mergeRequest.approvalStatus} />
          <StatusTag meta={REVIEW_META} value={mergeRequest.reviewStatus} />
        </Space>
      </Flex>
    </Card>
  )
}
