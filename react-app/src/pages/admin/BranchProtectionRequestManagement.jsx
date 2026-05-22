import { Button, Card, Drawer, Input, message, Select, Space, Table, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getBranchProtectionPolicyRequests,
  getBranchProtectionTemplateById,
} from '../../api/branchProtectionPolicies'
import { getRepositoryById } from '../../api/repositories'
import { PageHeader, StatusTag, SummaryCard } from '../../components/common'

const { Text } = Typography

export default function BranchProtectionRequestManagement() {
  const navigate = useNavigate()
  const requests = getBranchProtectionPolicyRequests()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(null)
  const [selected, setSelected] = useState(null)
  const summary = {
    pending: requests.filter((item) => item.status === 'pending').length,
    approved: requests.filter((item) => item.status === 'approved').length,
    rejected: requests.filter((item) => item.status === 'rejected').length,
    expired: requests.filter((item) => item.status === 'expired').length,
  }
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return requests.filter((request) => {
      const repository = getRepositoryById(request.repositoryId)
      const text = [request.id, repository?.name, request.requestedBy, request.reason].join(' ').toLowerCase()
      if (q && !text.includes(q)) return false
      if (status && request.status !== status) return false
      return true
    })
  }, [requests, search, status])

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title="Branch Protection Requests" description="Owner/PM이 요청한 정책 예외와 변경 요청을 검토합니다." />
      <Space wrap>
        {Object.entries(summary).map(([key, value]) => <SummaryCard key={key} title={key} value={value} />)}
      </Space>
      <Card>
        <Space wrap style={{ marginBottom: 16 }}>
          <Input.Search placeholder="request id, repository, requester, reason" value={search} onChange={(event) => setSearch(event.target.value)} style={{ width: 360 }} />
          <Select allowClear placeholder="status" value={status} onChange={setStatus} style={{ width: 160 }} options={Object.keys(summary).map((value) => ({ value, label: value }))} />
        </Space>
        <Table
          rowKey="id"
          dataSource={filtered}
          onRow={(record) => ({ onClick: () => setSelected(record), style: { cursor: 'pointer' } })}
          columns={[
            { title: 'Request ID', dataIndex: 'id' },
            { title: 'Type', dataIndex: 'type' },
            { title: 'Status', dataIndex: 'status', render: (value) => <StatusTag status={value} /> },
            { title: 'Repository', dataIndex: 'repositoryId', render: (value) => <Link to={`/repositories/${value}`}>{getRepositoryById(value)?.name ?? value}</Link> },
            { title: 'Template', dataIndex: 'templateId', render: (value) => getBranchProtectionTemplateById(value)?.name ?? value },
            { title: 'Requested by', dataIndex: 'requestedBy' },
            { title: 'Reason', dataIndex: 'reason' },
            { title: 'Created at', dataIndex: 'createdAt' },
          ]}
        />
      </Card>
      <Drawer title={selected?.id} open={Boolean(selected)} onClose={() => setSelected(null)} width={520}>
        {selected ? (
          <Space direction="vertical" size={12}>
            <StatusTag status={selected.status} />
            <Text strong>{selected.reason}</Text>
            <Text>Repository: {getRepositoryById(selected.repositoryId)?.name ?? selected.repositoryId}</Text>
            <Text>Template: {getBranchProtectionTemplateById(selected.templateId)?.name}</Text>
            <Text>Requested by: {selected.requestedBy} ({selected.requestedRole})</Text>
            <pre className="audit-json-preview">{JSON.stringify(selected.requestedChanges, null, 2)}</pre>
            <Space>
              <Button type="primary" onClick={() => message.success('Request approved')}>Approve</Button>
              <Button danger onClick={() => message.success('Request rejected')}>Reject</Button>
              <Button onClick={() => navigate(`/repositories/${selected.repositoryId}`)}>View Repository</Button>
              <Button onClick={() => navigate(`/admin/repository-policy/branch-protection-templates/${selected.templateId}`)}>View Template</Button>
            </Space>
          </Space>
        ) : null}
      </Drawer>
    </Space>
  )
}
