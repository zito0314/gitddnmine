import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { Badge, Button, Card, Col, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMergeRequestsByRepository } from '../api/mergeRequests'
import { getRepositoryDetail } from '../api/repositories'
import {
  getPipelinesByRepositoryId,
  getRepositoryPipelineSummary,
} from '../api/pipelines'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
import { ACTION_LABELS, PAGE_TEXT } from '../constants'

const { Text } = Typography

function uniqueOptions(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

function normalizeStatus(status) {
  if (status === 'finished') return 'passed'
  return status
}

function getDuration(pipeline) {
  return pipeline.summary?.find((item) => item.label === '실제 실행 시간')?.value ?? '-'
}

function getJobSummary(jobs = []) {
  const counts = jobs.reduce((acc, job) => {
    acc[job] = (acc[job] ?? 0) + 1
    return acc
  }, {})
  const completed = (counts.passed ?? 0) + (counts.failed ?? 0) + (counts.skipped ?? 0)
  const total = jobs.length
  const details = [
    counts.failed ? `failed ${counts.failed}` : null,
    counts.running ? `running ${counts.running}` : null,
    counts.pending ? `pending ${counts.pending}` : null,
    counts.manual ? `manual ${counts.manual}` : null,
  ].filter(Boolean)

  return {
    label: `${completed}/${total}`,
    details: details.join(', '),
  }
}

export default function RepositoryPipelines() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const repository = getRepositoryDetail(repositoryId)
  const mergeRequests = useMemo(() => getMergeRequestsByRepository(repositoryId), [repositoryId])
  const mergeRequestMap = useMemo(
    () => new Map(mergeRequests.map((mergeRequest) => [String(mergeRequest.id), mergeRequest])),
    [mergeRequests],
  )
  const pipelines = useMemo(() => getPipelinesByRepositoryId(repositoryId), [repositoryId])
  const summary = useMemo(() => getRepositoryPipelineSummary(repositoryId), [repositoryId])

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(null)
  const [branch, setBranch] = useState(null)
  const [trigger, setTrigger] = useState(null)
  const [author, setAuthor] = useState(null)
  const [relatedMr, setRelatedMr] = useState(null)

  const branchOptions = useMemo(() => uniqueOptions(pipelines.map((pipeline) => pipeline.branch)), [pipelines])
  const authorOptions = useMemo(() => uniqueOptions(pipelines.map((pipeline) => pipeline.author)), [pipelines])

  const filteredPipelines = useMemo(() => {
    const query = search.trim().toLowerCase()

    return pipelines.filter((pipeline) => {
      const relatedMergeRequest = mergeRequestMap.get(String(pipeline.mrId))
      if (query) {
        const searchable = [
          pipeline.id,
          pipeline.branch,
          pipeline.commit,
          pipeline.author,
          relatedMergeRequest?.title,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!searchable.includes(query)) return false
      }

      if (status && normalizeStatus(pipeline.status) !== status) return false
      if (branch && pipeline.branch !== branch) return false
      if (trigger && pipeline.trigger !== trigger) return false
      if (author && pipeline.author !== author) return false
      if (relatedMr === 'linked' && !pipeline.mrId) return false
      if (relatedMr === 'none' && pipeline.mrId) return false

      return true
    })
  }, [author, branch, mergeRequestMap, pipelines, relatedMr, search, status, trigger])

  const isFiltered = search || status || branch || trigger || author || relatedMr

  const resetFilters = () => {
    setSearch('')
    setStatus(null)
    setBranch(null)
    setTrigger(null)
    setAuthor(null)
    setRelatedMr(null)
  }

  const columns = [
    {
      title: 'Pipeline ID',
      dataIndex: 'id',
      width: 140,
      render: (id) => <Link to={`/repositories/${repositoryId}/pipelines/${id}`}>#{id}</Link>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 120,
      render: (value) => <StatusTag status={normalizeStatus(value)} />,
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      minWidth: 180,
      render: (value) => <Text code>{value}</Text>,
    },
    {
      title: 'Commit',
      dataIndex: 'commit',
      width: 120,
      render: (value) => <Text code>{value}</Text>,
    },
    {
      title: 'Related MR',
      dataIndex: 'mrId',
      minWidth: 220,
      render: (mrId) => {
        const mergeRequest = mergeRequestMap.get(String(mrId))
        if (!mergeRequest) return <Text type="secondary">-</Text>

        return (
          <Space orientation="vertical" size={2}>
            <Link to={`/repositories/${repositoryId}/merge-requests/${mrId}`}>!{mrId} {mergeRequest.title}</Link>
            <Text type="secondary">{mergeRequest.reviewLabel}</Text>
          </Space>
        )
      },
    },
    { title: 'Trigger', dataIndex: 'trigger', width: 130 },
    { title: 'Author', dataIndex: 'author', width: 110 },
    {
      title: 'Duration',
      key: 'duration',
      width: 110,
      render: (_, record) => getDuration(record),
    },
    {
      title: 'Jobs',
      dataIndex: 'jobs',
      width: 170,
      render: (jobs) => {
        const summary = getJobSummary(jobs)
        return (
          <Space orientation="vertical" size={2}>
            <Badge status={summary.details.includes('failed') ? 'error' : 'success'} text={summary.label} />
            {summary.details ? <Text type="secondary">{summary.details}</Text> : null}
          </Space>
        )
      },
    },
    {
      title: 'Created at / Updated at',
      dataIndex: 'updatedAt',
      width: 160,
      render: (value) => <Text type="secondary">{value}</Text>,
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
            navigate(`/repositories/${repositoryId}/pipelines/${record.id}`)
          }}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        eyebrow={repository?.name}
        title={PAGE_TEXT.repositoryPipelines.title}
        description={PAGE_TEXT.repositoryPipelines.description}
        actions={[
          <Button key="run" type="primary" icon={<PlayCircleOutlined />}>
            {ACTION_LABELS.runPipeline}
          </Button>,
          <Button key="refresh" icon={<ReloadOutlined />}>
            {ACTION_LABELS.refresh}
          </Button>,
        ]}
      />

      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Total Pipelines" value={summary.total} icon={<PlayCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Passed" value={summary.passed} tone="success" icon={<CheckCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Failed" value={summary.failed} tone="danger" icon={<ExclamationCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Running" value={summary.running} icon={<ClockCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="Manual Required" value={summary.manualRequired} tone="warning" icon={<ToolOutlined />} />
        </Col>
      </Row>

      <Card>
        <FilterBar
          search={{
            placeholder: 'Pipeline ID, branch, commit, author, MR 검색',
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
                { value: 'passed', label: 'Passed' },
                { value: 'failed', label: 'Failed' },
                { value: 'running', label: 'Running' },
                { value: 'pending', label: 'Pending' },
                { value: 'canceled', label: 'Canceled' },
                { value: 'manual', label: 'Manual' },
              ],
            },
            {
              key: 'branch',
              placeholder: 'Branch',
              value: branch,
              onChange: setBranch,
              options: branchOptions,
              width: 190,
            },
            {
              key: 'trigger',
              placeholder: 'Trigger',
              value: trigger,
              onChange: setTrigger,
              options: [
                { value: 'Push', label: 'Push' },
                { value: 'Merge Request', label: 'Merge Request' },
                { value: 'Schedule', label: 'Schedule' },
                { value: 'Manual', label: 'Manual' },
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
              key: 'relatedMr',
              placeholder: 'Related MR',
              value: relatedMr,
              onChange: setRelatedMr,
              options: [
                { value: 'linked', label: 'Linked' },
                { value: 'none', label: 'No MR' },
              ],
            },
          ]}
          onReset={isFiltered ? resetFilters : undefined}
        />

        <DataTable
          rowKey="id"
          columns={columns}
          dataSource={filteredPipelines}
          onRow={(record) => ({
            onClick: () => navigate(`/repositories/${repositoryId}/pipelines/${record.id}`),
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
