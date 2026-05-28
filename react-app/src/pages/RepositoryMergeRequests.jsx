import {
  CheckCircleOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  PullRequestOutlined,
  SafetyCertificateOutlined,
} from '../components/icons'
import { Button, Card, Col, Flex, Progress, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getRepositoryMergeRequestSummary,
  getRepositoryMergeRequests,
} from '../api/repositories'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

const { Text } = Typography

function getReviewers(mergeRequest) {
  return (
    mergeRequest.gates
      ?.find((gate) => gate.type === 'approval')
      ?.items?.map((item) => item.title)
      .filter(Boolean) ?? []
  )
}

function uniqueOptions(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

export default function RepositoryMergeRequests() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const allMergeRequests = useMemo(() => getRepositoryMergeRequests(repositoryId), [repositoryId])
  const summary = useMemo(() => getRepositoryMergeRequestSummary(repositoryId), [repositoryId])

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(null)
  const [reviewStatus, setReviewStatus] = useState(null)
  const [pipelineStatus, setPipelineStatus] = useState(null)
  const [securityStatus, setSecurityStatus] = useState(null)
  const [author, setAuthor] = useState(null)
  const [reviewer, setReviewer] = useState(null)

  const authorOptions = useMemo(
    () => uniqueOptions(allMergeRequests.map((mr) => mr.author)),
    [allMergeRequests],
  )

  const reviewerOptions = useMemo(
    () => uniqueOptions(allMergeRequests.flatMap((mr) => getReviewers(mr))),
    [allMergeRequests],
  )

  const filteredMergeRequests = useMemo(() => {
    const query = search.trim().toLowerCase()

    return allMergeRequests.filter((mr) => {
      if (query) {
        const searchable = [mr.title, mr.summary, mr.source, mr.target, mr.author]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!searchable.includes(query)) return false
      }

      if (status && mr.status !== status) return false
      if (reviewStatus && mr.review !== reviewStatus) return false
      if (pipelineStatus && mr.pipeline !== pipelineStatus) return false
      if (securityStatus && mr.security !== securityStatus) return false
      if (author && mr.author !== author) return false
      if (reviewer && !getReviewers(mr).includes(reviewer)) return false

      return true
    })
  }, [allMergeRequests, author, pipelineStatus, reviewer, reviewStatus, search, securityStatus, status])

  const isFiltered = search || status || reviewStatus || pipelineStatus || securityStatus || author || reviewer

  const resetFilters = () => {
    setSearch('')
    setStatus(null)
    setReviewStatus(null)
    setPipelineStatus(null)
    setSecurityStatus(null)
    setAuthor(null)
    setReviewer(null)
  }

  const columns = [
    {
      title: 'MR ID',
      dataIndex: 'id',
      width: 96,
      render: (id) => <Link to={`/repositories/${repositoryId}/merge-requests/${id}`}>!{id}</Link>,
    },
    {
      title: 'Title / Description',
      dataIndex: 'title',
      minWidth: 280,
      render: (title, record) => (
        <Space direction="vertical" size={2}>
          <Link to={`/repositories/${repositoryId}/merge-requests/${record.id}`}>{title}</Link>
          <Text type="secondary">{record.summary}</Text>
        </Space>
      ),
    },
    {
      title: 'Source → Target branch',
      key: 'branch',
      width: 220,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Text code>{record.source}</Text>
          <Text type="secondary">→ {record.target}</Text>
        </Space>
      ),
    },
    { title: 'Author', dataIndex: 'author', width: 120 },
    {
      title: 'Review status',
      dataIndex: 'review',
      width: 140,
      render: (value, record) => <StatusTag status={value} label={record.reviewLabel} />,
    },
    {
      title: 'Approval progress',
      key: 'approval',
      width: 170,
      render: (_, record) => {
        const percent = record.required ? Math.round((record.approved / record.required) * 100) : 0
        return (
          <Space direction="vertical" size={2} style={{ width: '100%' }}>
            <Text>
              {record.approved}/{record.required} approved
            </Text>
            <Progress percent={percent} size="small" showInfo={false} />
          </Space>
        )
      },
    },
    {
      title: 'Pipeline status',
      dataIndex: 'pipeline',
      width: 130,
      render: (value) => <StatusTag status={value} />,
    },
    {
      title: 'Security status',
      dataIndex: 'security',
      width: 130,
      render: (value, record) => <StatusTag status={value} label={record.securityLabel} />,
    },
    { title: 'Updated at', dataIndex: 'updatedAt', width: 120 },
    {
      title: 'Comments',
      dataIndex: 'comments',
      width: 100,
      render: (value) => (
        <Flex align="center" gap={6}>
          <CommentOutlined />
          {value}
        </Flex>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 104,
      render: (_, record) => (
        <Button
          size="small"
          onClick={(event) => {
            event.stopPropagation()
            navigate(`/repositories/${repositoryId}/merge-requests/${record.id}`)
          }}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.pages.repositoryMergeRequests.title}
        description={UI_TEXT.pages.repositoryMergeRequests.description}
      />

      <Card>
        <RowCards summary={summary} />

        <FilterBar
          search={{
            placeholder: 'Title, branch, author 검색',
            value: search,
            onChange: setSearch,
          }}
          filters={[
            {
              key: 'status',
              placeholder: 'Status',
              value: status,
              onChange: setStatus,
              options: [
                { value: 'open', label: 'Open' },
                { value: 'merged', label: 'Merged' },
                { value: 'blocked', label: 'Blocked' },
                { value: 'draft', label: 'Draft' },
              ],
            },
            {
              key: 'reviewStatus',
              placeholder: 'Review',
              value: reviewStatus,
              onChange: setReviewStatus,
              options: [
                { value: 'need-review', label: 'Review required' },
                { value: 'approved', label: 'Approved' },
                { value: 'draft', label: 'Draft' },
              ],
            },
            {
              key: 'pipelineStatus',
              placeholder: 'Pipeline',
              value: pipelineStatus,
              onChange: setPipelineStatus,
              options: [
                { value: 'passed', label: 'Passed' },
                { value: 'failed', label: 'Failed' },
                { value: 'running', label: 'Running' },
                { value: 'pending', label: 'Pending' },
              ],
            },
            {
              key: 'securityStatus',
              placeholder: 'Security',
              value: securityStatus,
              onChange: setSecurityStatus,
              options: [
                { value: 'passed', label: 'Passed' },
                { value: 'failed', label: 'Failed' },
                { value: 'blocked', label: 'Blocked' },
                { value: 'pending', label: 'Pending' },
                { value: 'warning', label: 'Warning' },
              ],
            },
            {
              key: 'author',
              placeholder: 'Author',
              value: author,
              onChange: setAuthor,
              options: authorOptions,
            },
            {
              key: 'reviewer',
              placeholder: 'Reviewer',
              value: reviewer,
              onChange: setReviewer,
              options: reviewerOptions,
            },
          ]}
          onReset={isFiltered ? resetFilters : undefined}
        />

        <DataTable
          rowKey="id"
          columns={columns}
          dataSource={filteredMergeRequests}
          onRow={(record) => ({
            onClick: () => navigate(`/repositories/${repositoryId}/merge-requests/${record.id}`),
            style: { cursor: 'pointer' },
          })}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}개`,
          }}
        />
      </Card>
    </Space>
  )
}

function RowCards({ summary }) {
  return (
    <Row gutter={[12, 12]} className="summary-cards-row repository-mr-summary">
      <ColCard title="Open MRs" value={summary.open} icon={<PullRequestOutlined />} />
      <ColCard title="Review Required" value={summary.reviewRequired} tone="warning" icon={<ExclamationCircleOutlined />} />
      <ColCard title="Pipeline Failed" value={summary.pipelineFailed} tone="danger" icon={<ExclamationCircleOutlined />} />
      <ColCard title="Security Blocked" value={summary.securityBlocked} tone="danger" icon={<SafetyCertificateOutlined />} />
      <ColCard title="Ready to Merge" value={summary.readyToMerge} tone="success" icon={<CheckCircleOutlined />} />
    </Row>
  )
}

function ColCard({ title, value, tone, icon }) {
  return (
    <Col xs={24} sm={12} xl={4}>
      <SummaryCard title={title} value={value} tone={tone} icon={icon} />
    </Col>
  )
}
