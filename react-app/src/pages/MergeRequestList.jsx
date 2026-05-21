import { CheckCircleOutlined, ExclamationCircleOutlined, PullRequestOutlined } from '@ant-design/icons'
import { Button, Card, Col, Progress, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMergeRequests } from '../api/mergeRequests'
import { getRepositories } from '../api/repositories'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
import { ACTION_LABELS, PAGE_TEXT } from '../constants'

const { Text } = Typography

function options(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

export default function MergeRequestList() {
  const navigate = useNavigate()
  const repositories = getRepositories()
  const repoMap = new Map(repositories.map((repo) => [repo.id, repo]))
  const mergeRequests = getMergeRequests()
  const [search, setSearch] = useState('')
  const [repositoryId, setRepositoryId] = useState(null)
  const [status, setStatus] = useState(null)
  const [reviewStatus, setReviewStatus] = useState(null)
  const [pipelineStatus, setPipelineStatus] = useState(null)
  const [securityStatus, setSecurityStatus] = useState(null)
  const [author, setAuthor] = useState(null)

  const summary = useMemo(() => ({
    total: mergeRequests.length,
    reviewRequired: mergeRequests.filter((mr) => mr.review === 'need-review').length,
    pipelineFailed: mergeRequests.filter((mr) => mr.pipeline === 'failed').length,
    securityBlocked: mergeRequests.filter((mr) => ['failed', 'blocked'].includes(mr.security)).length,
    readyToMerge: mergeRequests.filter((mr) => mr.approved >= mr.required && mr.pipeline === 'passed' && mr.security === 'passed').length,
  }), [mergeRequests])

  const filtered = mergeRequests.filter((mr) => {
    const repo = repoMap.get(mr.repo)
    const q = search.trim().toLowerCase()
    if (q && ![mr.title, mr.summary, repo?.name, mr.source, mr.target, mr.author].join(' ').toLowerCase().includes(q)) return false
    if (repositoryId && mr.repo !== repositoryId) return false
    if (status && mr.status !== status) return false
    if (reviewStatus && mr.review !== reviewStatus) return false
    if (pipelineStatus && mr.pipeline !== pipelineStatus) return false
    if (securityStatus && mr.security !== securityStatus) return false
    if (author && mr.author !== author) return false
    return true
  })

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title={PAGE_TEXT.mergeRequests.title} description={PAGE_TEXT.mergeRequests.description} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Total MRs" value={summary.total} icon={<PullRequestOutlined />} /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title="Review Required" value={summary.reviewRequired} tone="warning" /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title="Pipeline Failed" value={summary.pipelineFailed} tone="danger" icon={<ExclamationCircleOutlined />} /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title="Security Blocked" value={summary.securityBlocked} tone="danger" /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title="Ready to Merge" value={summary.readyToMerge} tone="success" icon={<CheckCircleOutlined />} /></Col>
      </Row>
      <Card>
        <FilterBar
          search={{ placeholder: 'MR title, repository, branch, author 검색', value: search, onChange: setSearch }}
          filters={[
            { key: 'repo', placeholder: 'Repository', value: repositoryId, onChange: setRepositoryId, options: repositories.map((repo) => ({ value: repo.id, label: repo.name })) },
            { key: 'status', placeholder: 'Status', value: status, onChange: setStatus, options: options(mergeRequests.map((mr) => mr.status)) },
            { key: 'review', placeholder: 'Review', value: reviewStatus, onChange: setReviewStatus, options: options(mergeRequests.map((mr) => mr.review)) },
            { key: 'pipeline', placeholder: 'Pipeline', value: pipelineStatus, onChange: setPipelineStatus, options: options(mergeRequests.map((mr) => mr.pipeline)) },
            { key: 'security', placeholder: 'Security', value: securityStatus, onChange: setSecurityStatus, options: options(mergeRequests.map((mr) => mr.security)) },
            { key: 'author', placeholder: 'Author', value: author, onChange: setAuthor, options: options(mergeRequests.map((mr) => mr.author)) },
          ]}
          onReset={() => { setSearch(''); setRepositoryId(null); setStatus(null); setReviewStatus(null); setPipelineStatus(null); setSecurityStatus(null); setAuthor(null) }}
        />
        <DataTable rowKey="id" dataSource={filtered} columns={[
          { title: 'MR ID', dataIndex: 'id', render: (id, record) => <Link to={`/repositories/${record.repo}/merge-requests/${id}`}>!{id}</Link> },
          { title: 'Title / Description', dataIndex: 'title', render: (value, record) => <Space orientation="vertical" size={2}><Link to={`/repositories/${record.repo}/merge-requests/${record.id}`}>{value}</Link><Text type="secondary">{record.summary}</Text></Space> },
          { title: 'Repository', dataIndex: 'repo', render: (value) => <Link to={`/repositories/${value}`}>{repoMap.get(value)?.name ?? value}</Link> },
          { title: 'Source → Target branch', key: 'branch', render: (_, record) => <Text code>{record.source} → {record.target}</Text> },
          { title: 'Author', dataIndex: 'author' },
          { title: 'Review status', dataIndex: 'review', render: (value, record) => <StatusTag status={value} label={record.reviewLabel} /> },
          { title: 'Approval progress', key: 'approval', render: (_, record) => <Progress percent={Math.round((record.approved / record.required) * 100)} size="small" /> },
          { title: 'Pipeline status', dataIndex: 'pipeline', render: (value) => <StatusTag status={value} /> },
          { title: 'Security status', dataIndex: 'security', render: (value, record) => <StatusTag status={value} label={record.securityLabel} /> },
          { title: 'Updated at', dataIndex: 'updatedAt' },
          { title: 'Actions', key: 'actions', fixed: 'right', render: (_, record) => <Button size="small" onClick={() => navigate(`/repositories/${record.repo}/merge-requests/${record.id}`)}>{ACTION_LABELS.view}</Button> },
        ]} />
      </Card>
    </Space>
  )
}
