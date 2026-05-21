import { Card, Col, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDeploymentTransfersByRepositoryId, getRepositoryDeploymentTransferSummary } from '../api/deploymentTransfers'
import { getRepositoryDetail } from '../api/repositories'
import { FilterBar, PageHeader, SummaryCard } from '../components/common'
import { DeploymentTransferTable } from './DeploymentTransferList'

const { Title } = Typography

export default function RepositoryDeploymentTransfers() {
  const { repositoryId } = useParams()
  const repository = getRepositoryDetail(repositoryId)
  const transfers = useMemo(() => getDeploymentTransfersByRepositoryId(repositoryId), [repositoryId])
  const summary = useMemo(() => getRepositoryDeploymentTransferSummary(repositoryId), [repositoryId])
  const [search, setSearch] = useState('')

  if (!repository) return <Card><Title level={3}>Repository not found</Title></Card>

  const filtered = transfers.filter((item) => [item.id, item.mrId, item.requestedBy, item.targetEnvironment, item.policyDecision].join(' ').toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader eyebrow={repository.name} title="Deployment Transfer" description="특정 Repository의 운영이관 요청 목록입니다." />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Total Requests" value={summary.total} /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title="Pending Approval" value={summary.pendingApproval} tone="warning" /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title="Ready to Deploy" value={summary.readyToDeploy} tone="success" /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title="Blocked" value={summary.blocked} tone="danger" /></Col>
        <Col xs={24} sm={12} xl={5}><SummaryCard title="Scheduled" value={summary.scheduled} /></Col>
      </Row>
      <Card>
        <FilterBar search={{ placeholder: 'Transfer, MR, requester 검색', value: search, onChange: setSearch }} onReset={() => setSearch('')} />
        <DeploymentTransferTable transfers={filtered} repositoryScoped repositoryId={repositoryId} />
      </Card>
    </Space>
  )
}
