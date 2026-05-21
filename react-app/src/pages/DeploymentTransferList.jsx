import { CheckCircleOutlined, DownloadOutlined, PlusOutlined, ReloadOutlined, RocketOutlined, StopOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getDeploymentTransferSummary, getDeploymentTransfers } from '../api/deploymentTransfers'
import { getRepositories } from '../api/repositories'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'

const { Text } = Typography

function options(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

export function DeploymentTransferTable({ transfers, repositoryScoped = false, repositoryId }) {
  const navigate = useNavigate()
  const repoMap = new Map(getRepositories().map((repo) => [repo.id, repo]))
  const detailPath = (record) => repositoryScoped ? `/repositories/${repositoryId}/deployment-transfer/${record.id}` : `/deployment-transfer/${record.id}`
  const columns = [
    { title: 'Transfer ID', dataIndex: 'id', render: (id, record) => <Link to={detailPath(record)}>{id}</Link> },
    !repositoryScoped ? { title: 'Repository', dataIndex: 'repositoryId', render: (value) => <Link to={`/repositories/${value}`}>{repoMap.get(value)?.name ?? value}</Link> } : null,
    { title: 'Merge Request', dataIndex: 'mrId', render: (mrId, record) => <Link to={`/repositories/${record.repositoryId}/merge-requests/${mrId}`}>!{mrId}</Link> },
    { title: 'Target environment', dataIndex: 'targetEnvironment', render: (value) => <Text code>{value}</Text> },
    { title: 'Status', dataIndex: 'status', render: (value) => <StatusTag status={value} /> },
    { title: 'Approval status', dataIndex: 'approvalStatus', render: (value) => <StatusTag status={value} /> },
    { title: 'Pipeline status', dataIndex: 'pipelineStatus', render: (value, record) => <Link to={`/repositories/${record.repositoryId}/pipelines/${record.pipelineId}`}><StatusTag status={value} /></Link> },
    { title: 'Security status', dataIndex: 'securityStatus', render: (value, record) => <Link to={`/security/${record.securityId}`}><StatusTag status={value} /></Link> },
    { title: 'Requested by', dataIndex: 'requestedBy' },
    { title: 'Approved by', dataIndex: 'approvedBy' },
    { title: 'Scheduled at', dataIndex: 'scheduledAt' },
    { title: 'Updated at', dataIndex: 'updatedAt' },
    { title: 'Actions', key: 'actions', fixed: 'right', render: (_, record) => <Button size="small" onClick={() => navigate(detailPath(record))}>View</Button> },
  ].filter(Boolean)

  return <DataTable rowKey="id" dataSource={transfers} columns={columns} />
}

export default function DeploymentTransferList() {
  const transfers = getDeploymentTransfers()
  const repositories = getRepositories()
  const summary = useMemo(() => getDeploymentTransferSummary(transfers), [transfers])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(null)
  const [environment, setEnvironment] = useState(null)
  const [repositoryId, setRepositoryId] = useState(null)
  const [requestedBy, setRequestedBy] = useState(null)
  const [approvalStatus, setApprovalStatus] = useState(null)
  const [securityStatus, setSecurityStatus] = useState(null)
  const [pipelineStatus, setPipelineStatus] = useState(null)
  const repoMap = new Map(repositories.map((repo) => [repo.id, repo]))

  const filtered = transfers.filter((item) => {
    const q = search.trim().toLowerCase()
    if (q && ![item.id, repoMap.get(item.repositoryId)?.name, item.mrId, item.requestedBy, item.targetEnvironment, item.policyDecision].join(' ').toLowerCase().includes(q)) return false
    if (status && item.status !== status) return false
    if (environment && item.targetEnvironment !== environment) return false
    if (repositoryId && item.repositoryId !== repositoryId) return false
    if (requestedBy && item.requestedBy !== requestedBy) return false
    if (approvalStatus && item.approvalStatus !== approvalStatus) return false
    if (securityStatus && item.securityStatus !== securityStatus) return false
    if (pipelineStatus && item.pipelineStatus !== pipelineStatus) return false
    return true
  })

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title="Deployment Transfer" description="운영 반영 요청, 승인 상태, 배포 전 검증 조건을 확인하는 화면" actions={[
        <Button key="new" type="primary" icon={<PlusOutlined />}>New Transfer Request</Button>,
        <Button key="export" icon={<DownloadOutlined />}>Export</Button>,
        <Button key="refresh" icon={<ReloadOutlined />}>Refresh</Button>,
      ]} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Total Requests" value={summary.total} icon={<RocketOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Pending Approval" value={summary.pendingApproval} tone="warning" /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Ready to Deploy" value={summary.readyToDeploy} tone="success" /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Blocked" value={summary.blocked} tone="danger" icon={<StopOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Approved" value={summary.approved} tone="success" icon={<CheckCircleOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Scheduled" value={summary.scheduled} /></Col>
      </Row>
      <Card>
        <FilterBar
          search={{ placeholder: 'Transfer, repository, MR, requester, environment 검색', value: search, onChange: setSearch }}
          filters={[
            { key: 'status', placeholder: 'Status', value: status, onChange: setStatus, options: options(transfers.map((item) => item.status)) },
            { key: 'env', placeholder: 'Target environment', value: environment, onChange: setEnvironment, options: options(transfers.map((item) => item.targetEnvironment)) },
            { key: 'repo', placeholder: 'Repository', value: repositoryId, onChange: setRepositoryId, options: repositories.map((repo) => ({ value: repo.id, label: repo.name })) },
            { key: 'requestedBy', placeholder: 'Requested by', value: requestedBy, onChange: setRequestedBy, options: options(transfers.map((item) => item.requestedBy)) },
            { key: 'approval', placeholder: 'Approval status', value: approvalStatus, onChange: setApprovalStatus, options: options(transfers.map((item) => item.approvalStatus)) },
            { key: 'security', placeholder: 'Security status', value: securityStatus, onChange: setSecurityStatus, options: options(transfers.map((item) => item.securityStatus)) },
            { key: 'pipeline', placeholder: 'Pipeline status', value: pipelineStatus, onChange: setPipelineStatus, options: options(transfers.map((item) => item.pipelineStatus)) },
          ]}
          onReset={() => { setSearch(''); setStatus(null); setEnvironment(null); setRepositoryId(null); setRequestedBy(null); setApprovalStatus(null); setSecurityStatus(null); setPipelineStatus(null) }}
        />
        <DeploymentTransferTable transfers={filtered} />
      </Card>
    </Space>
  )
}
