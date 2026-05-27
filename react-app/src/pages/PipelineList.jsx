import { CheckCircleOutlined, ClockCircleOutlined, PlayCircleOutlined, ToolOutlined } from '../components/icons'
import { Badge, Button, Card, Col, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMergeRequests } from '../api/mergeRequests'
import { getPipelines } from '../api/pipelines'
import { getRepositories } from '../api/repositories'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

const { Text } = Typography

function options(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

export default function PipelineList() {
  const navigate = useNavigate()
  const repositories = getRepositories()
  const repoMap = new Map(repositories.map((repo) => [repo.id, repo]))
  const mrMap = new Map(getMergeRequests().map((mr) => [String(mr.id), mr]))
  const pipelines = getPipelines()
  const [search, setSearch] = useState('')
  const [repositoryId, setRepositoryId] = useState(null)
  const [status, setStatus] = useState(null)
  const [branch, setBranch] = useState(null)
  const [trigger, setTrigger] = useState(null)
  const [author, setAuthor] = useState(null)
  const [relatedMr, setRelatedMr] = useState(null)

  const summary = useMemo(() => ({
    total: pipelines.length,
    passed: pipelines.filter((pipeline) => ['passed', 'finished'].includes(pipeline.status)).length,
    failed: pipelines.filter((pipeline) => pipeline.status === 'failed').length,
    running: pipelines.filter((pipeline) => pipeline.status === 'running').length,
    manualRequired: pipelines.filter((pipeline) => pipeline.jobs?.includes('manual')).length,
  }), [pipelines])

  const filtered = pipelines.filter((pipeline) => {
    const repo = repoMap.get(pipeline.repo)
    const mr = mrMap.get(String(pipeline.mrId))
    const q = search.trim().toLowerCase()
    if (q && ![pipeline.id, repo?.name, pipeline.branch, pipeline.commit, pipeline.author, mr?.title].join(' ').toLowerCase().includes(q)) return false
    if (repositoryId && pipeline.repo !== repositoryId) return false
    if (status && pipeline.status !== status) return false
    if (branch && pipeline.branch !== branch) return false
    if (trigger && pipeline.trigger !== trigger) return false
    if (author && pipeline.author !== author) return false
    if (relatedMr === 'linked' && !pipeline.mrId) return false
    if (relatedMr === 'none' && pipeline.mrId) return false
    return true
  })

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title={UI_TEXT.pages.pipelines.title} description={UI_TEXT.pages.pipelines.description} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}><SummaryCard title={UI_TEXT.summary.totalPipelines} value={summary.total} icon={<PlayCircleOutlined />} /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title={UI_TEXT.summary.passed} value={summary.passed} tone="success" icon={<CheckCircleOutlined />} /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title={UI_TEXT.summary.failed} value={summary.failed} tone="danger" /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title={UI_TEXT.summary.running} value={summary.running} icon={<ClockCircleOutlined />} /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title={UI_TEXT.summary.manualRequired} value={summary.manualRequired} tone="warning" icon={<ToolOutlined />} /></Col>
      </Row>
      <Card>
        <FilterBar
          search={{ placeholder: UI_TEXT.filters.pipelineSearch, value: search, onChange: setSearch }}
          filters={[
            { key: 'repo', placeholder: UI_TEXT.common.repository, value: repositoryId, onChange: setRepositoryId, options: repositories.map((repo) => ({ value: repo.id, label: repo.name })) },
            { key: 'status', placeholder: UI_TEXT.filters.status, value: status, onChange: setStatus, options: options(pipelines.map((item) => item.status)) },
            { key: 'branch', placeholder: UI_TEXT.tables.branch, value: branch, onChange: setBranch, options: options(pipelines.map((item) => item.branch)) },
            { key: 'trigger', placeholder: UI_TEXT.common.trigger, value: trigger, onChange: setTrigger, options: options(pipelines.map((item) => item.trigger)) },
            { key: 'author', placeholder: UI_TEXT.common.owner, value: author, onChange: setAuthor, options: options(pipelines.map((item) => item.author)) },
            { key: 'related', placeholder: UI_TEXT.filters.relatedMr, value: relatedMr, onChange: setRelatedMr, options: [{ value: 'linked', label: 'Linked' }, { value: 'none', label: 'None' }] },
          ]}
          onReset={() => { setSearch(''); setRepositoryId(null); setStatus(null); setBranch(null); setTrigger(null); setAuthor(null); setRelatedMr(null) }}
        />
        <DataTable rowKey="id" dataSource={filtered} columns={[
          { title: 'Pipeline ID', dataIndex: 'id', render: (id, record) => <Link to={`/repositories/${record.repo}/pipelines/${id}`}>#{id}</Link> },
          { title: UI_TEXT.common.repository, dataIndex: 'repo', render: (value) => <Link to={`/repositories/${value}`}>{repoMap.get(value)?.name ?? value}</Link> },
          { title: UI_TEXT.common.status, dataIndex: 'status', render: (value) => <StatusTag status={value === 'finished' ? 'passed' : value} /> },
          { title: UI_TEXT.tables.branch, dataIndex: 'branch', render: (value) => <Text code>{value}</Text> },
          { title: UI_TEXT.common.commit, dataIndex: 'commit', render: (value) => <Text code>{value}</Text> },
          { title: UI_TEXT.filters.relatedMr, dataIndex: 'mrId', render: (mrId, record) => mrId ? <Link to={`/repositories/${record.repo}/merge-requests/${mrId}`}>!{mrId} {mrMap.get(String(mrId))?.title}</Link> : '-' },
          { title: UI_TEXT.common.trigger, dataIndex: 'trigger' },
          { title: UI_TEXT.common.author, dataIndex: 'author' },
          { title: UI_TEXT.tables.duration, key: 'duration', render: (_, record) => record.summary?.find((item) => item.label === '실제 실행 시간')?.value ?? '-' },
          { title: UI_TEXT.common.jobs, dataIndex: 'jobs', render: (jobs = []) => <Badge status={jobs.includes('failed') ? 'error' : 'success'} text={`${jobs.length} jobs`} /> },
          { title: UI_TEXT.common.updatedAt, dataIndex: 'updatedAt' },
          { title: UI_TEXT.actions.view, key: 'actions', fixed: 'right', render: (_, record) => <Button size="small" onClick={() => navigate(`/repositories/${record.repo}/pipelines/${record.id}`)}>{UI_TEXT.actions.view}</Button> },
        ]} />
      </Card>
    </Space>
  )
}
