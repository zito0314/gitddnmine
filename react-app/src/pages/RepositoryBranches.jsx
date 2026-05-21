import { BranchesOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRepositoryBranchSummary, getRepositoryBranches, getRepositoryDetail } from '../api/repositories'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

const { Text, Title } = Typography

export default function RepositoryBranches() {
  const { repositoryId } = useParams()
  const repository = getRepositoryDetail(repositoryId)
  const branches = useMemo(() => getRepositoryBranches(repositoryId), [repositoryId])
  const summary = useMemo(() => getRepositoryBranchSummary(repositoryId), [repositoryId])
  const [search, setSearch] = useState('')
  const [protectedOnly, setProtectedOnly] = useState(null)
  const [status, setStatus] = useState(null)

  if (!repository) return <Card><Title level={3}>{UI_TEXT.messages.notFound.repository}</Title></Card>

  const filtered = branches.filter((branch) => {
    const q = search.trim().toLowerCase()
    if (q && ![branch.name, branch.lastCommit, branch.lastAuthor].join(' ').toLowerCase().includes(q)) return false
    if (protectedOnly === 'protected' && !branch.protected) return false
    if (protectedOnly === 'open' && branch.protected) return false
    if (status && branch.status !== status) return false
    return true
  })

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader eyebrow={repository.name} title={UI_TEXT.pages.repositoryBranches.title} description={UI_TEXT.pages.repositoryBranches.description} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Total Branches" value={summary.total} icon={<BranchesOutlined />} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Protected" value={summary.protected} icon={<LockOutlined />} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Active" value={summary.active} tone="success" /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Stale" value={summary.stale} tone="warning" /></Col>
      </Row>
      <Card>
        <FilterBar
          search={{ placeholder: 'Branch, commit, author 검색', value: search, onChange: setSearch }}
          filters={[
            { key: 'protected', placeholder: 'Protected', value: protectedOnly, onChange: setProtectedOnly, options: [{ value: 'protected', label: 'Protected' }, { value: 'open', label: 'Open' }] },
            { key: 'status', placeholder: 'Status', value: status, onChange: setStatus, options: [{ value: 'active', label: 'Active' }, { value: 'stale', label: 'Stale' }] },
            { key: 'updated', type: 'dateRange', placeholder: ['From', 'To'] },
          ]}
          onReset={() => { setSearch(''); setProtectedOnly(null); setStatus(null) }}
        />
        <DataTable rowKey="name" dataSource={filtered} columns={[
          { title: 'Branch name', dataIndex: 'name', render: (value, record) => <Space><Text code>{value}</Text>{record.default ? <StatusTag status="success" label="Default" /> : null}</Space> },
          { title: 'Status', dataIndex: 'status', render: (value) => <StatusTag status={value === 'active' ? 'passed' : 'warning'} label={value} /> },
          { title: 'Protected', dataIndex: 'protected', render: (value) => <StatusTag status={value ? 'passed' : 'none'} label={value ? 'Protected' : 'Open'} /> },
          { title: 'Default', dataIndex: 'default', render: (value) => value ? 'Yes' : '-' },
          { title: 'Last commit', dataIndex: 'lastCommit', render: (value) => <Text code>{value}</Text> },
          { title: 'Last author', dataIndex: 'lastAuthor' },
          { title: 'Updated at', dataIndex: 'updatedAt' },
          { title: 'Actions', key: 'actions', render: () => <Button size="small" disabled>Compare</Button> },
        ]} />
      </Card>
    </Space>
  )
}
