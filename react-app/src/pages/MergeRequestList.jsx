import { CheckCircleOutlined, ExclamationCircleOutlined, PullRequestOutlined } from '../components/icons'
import { Button, Card, Col, Progress, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMergeRequests } from '../api/mergeRequests'
import { getRepositories } from '../api/repositories'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

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
      <PageHeader title={UI_TEXT.pages.mergeRequests.title} description={UI_TEXT.pages.mergeRequests.description} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}><SummaryCard title={UI_TEXT.summary.totalMrs} value={summary.total} icon={<PullRequestOutlined />} /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title={UI_TEXT.summary.reviewRequired} value={summary.reviewRequired} tone="warning" /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title={UI_TEXT.summary.failedPipelines} value={summary.pipelineFailed} tone="danger" icon={<ExclamationCircleOutlined />} /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title={UI_TEXT.summary.securityBlocked} value={summary.securityBlocked} tone="danger" /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title={UI_TEXT.summary.readyToMerge} value={summary.readyToMerge} tone="success" icon={<CheckCircleOutlined />} /></Col>
      </Row>
      <Card>
        <FilterBar
          search={{ placeholder: UI_TEXT.filters.mergeRequestSearch, value: search, onChange: setSearch }}
          filters={[
            { key: 'repo', placeholder: UI_TEXT.common.repository, value: repositoryId, onChange: setRepositoryId, options: repositories.map((repo) => ({ value: repo.id, label: repo.name })) },
            { key: 'status', placeholder: UI_TEXT.filters.status, value: status, onChange: setStatus, options: options(mergeRequests.map((mr) => mr.status)) },
            { key: 'review', placeholder: UI_TEXT.tables.review, value: reviewStatus, onChange: setReviewStatus, options: options(mergeRequests.map((mr) => mr.review)) },
            { key: 'pipeline', placeholder: UI_TEXT.common.pipeline, value: pipelineStatus, onChange: setPipelineStatus, options: options(mergeRequests.map((mr) => mr.pipeline)) },
            { key: 'security', placeholder: UI_TEXT.common.security, value: securityStatus, onChange: setSecurityStatus, options: options(mergeRequests.map((mr) => mr.security)) },
            { key: 'author', placeholder: UI_TEXT.common.owner, value: author, onChange: setAuthor, options: options(mergeRequests.map((mr) => mr.author)) },
          ]}
          onReset={() => { setSearch(''); setRepositoryId(null); setStatus(null); setReviewStatus(null); setPipelineStatus(null); setSecurityStatus(null); setAuthor(null) }}
        />
        <DataTable rowKey="id" dataSource={filtered} columns={[
          { title: UI_TEXT.tables.mrId, dataIndex: 'id', render: (id, record) => <Link to={`/repositories/${record.repo}/merge-requests/${id}`}>!{id}</Link> },
          { title: `${UI_TEXT.tables.title} / ${UI_TEXT.common.description}`, dataIndex: 'title', render: (value, record) => <Space orientation="vertical" size={2}><Link to={`/repositories/${record.repo}/merge-requests/${record.id}`}>{value}</Link><Text type="secondary">{record.summary}</Text></Space> },
          { title: UI_TEXT.common.repository, dataIndex: 'repo', render: (value) => <Link to={`/repositories/${value}`}>{repoMap.get(value)?.name ?? value}</Link> },
          { title: 'Source → Target branch', key: 'branch', render: (_, record) => <Text code>{record.source} → {record.target}</Text> },
          { title: UI_TEXT.common.author, dataIndex: 'author' },
          { title: UI_TEXT.tables.review, dataIndex: 'review', render: (value, record) => <StatusTag status={value} label={record.reviewLabel} /> },
          { title: UI_TEXT.tables.approval, key: 'approval', render: (_, record) => <Progress percent={Math.round((record.approved / record.required) * 100)} size="small" /> },
          { title: UI_TEXT.filters.pipelineStatus, dataIndex: 'pipeline', render: (value) => <StatusTag status={value} /> },
          { title: UI_TEXT.filters.securityStatus, dataIndex: 'security', render: (value, record) => <StatusTag status={value} label={record.securityLabel} /> },
          { title: UI_TEXT.common.updatedAt, dataIndex: 'updatedAt' },
          { title: UI_TEXT.actions.view, key: 'actions', fixed: 'right', render: (_, record) => <Button size="small" onClick={() => navigate(`/repositories/${record.repo}/merge-requests/${record.id}`)}>{UI_TEXT.actions.view}</Button> },
        ]} />
      </Card>
    </Space>
  )
}
