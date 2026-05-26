import { PlusOutlined } from '../../components/icons'
import { Button, Card, Col, Input, Row, Select, Space, Table, Tag, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getBranchProtectionPolicySummary,
  getBranchProtectionTemplates,
} from '../../api/branchProtectionPolicies'
import { PageHeader, StatusTag, SummaryCard } from '../../components/common'

const { Text } = Typography

export default function BranchProtectionTemplateList() {
  const navigate = useNavigate()
  const templates = getBranchProtectionTemplates()
  const summary = getBranchProtectionPolicySummary()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return templates.filter((template) => {
      const text = [template.name, template.version, template.description, ...(template.targetBranches ?? [])]
        .join(' ')
        .toLowerCase()
      if (q && !text.includes(q)) return false
      if (status && template.status !== status) return false
      return true
    })
  }, [search, status, templates])

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title="Branch Protection Templates"
        description="저장소에 적용할 브랜치 보호 정책 템플릿을 생성하고 관리합니다."
        actions={[
          <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/repository-policy/branch-protection-templates/new')}>
            Create Template
          </Button>,
        ]}
      />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} md={6}><SummaryCard title="Total Templates" value={summary.total} /></Col>
        <Col xs={24} md={6}><SummaryCard title="Active" value={summary.active} tone="success" /></Col>
        <Col xs={24} md={6}><SummaryCard title="Applied Repositories" value={summary.appliedRepositories} /></Col>
        <Col xs={24} md={6}><SummaryCard title="Pending Exception Requests" value={summary.pendingRequests} tone="warning" /></Col>
      </Row>
      <Card>
        <Space wrap style={{ marginBottom: 16 }}>
          <Input.Search placeholder="template name, version, target branch, description" value={search} onChange={(event) => setSearch(event.target.value)} style={{ width: 360 }} />
          <Select allowClear placeholder="status" value={status} onChange={setStatus} style={{ width: 160 }} options={['active', 'draft'].map((value) => ({ value, label: value }))} />
        </Space>
        <Table
          rowKey="id"
          dataSource={filtered}
          onRow={(record) => ({ onClick: () => navigate(`/admin/repository-policy/branch-protection-templates/${record.id}`), style: { cursor: 'pointer' } })}
          columns={[
            { title: 'Template name', dataIndex: 'name', render: (value, record) => <Link to={`/admin/repository-policy/branch-protection-templates/${record.id}`}>{value}</Link> },
            { title: 'Version', dataIndex: 'version', width: 90 },
            { title: 'Status', dataIndex: 'status', width: 110, render: (value) => <StatusTag status={value} /> },
            { title: 'Target branches', dataIndex: 'targetBranches', render: (values) => <Space wrap>{values.map((value) => <Tag key={value}>{value}</Tag>)}</Space> },
            { title: 'Minimum approvals', dataIndex: ['mergeRules', 'minimumApprovals'], width: 150 },
            { title: 'Pipeline', dataIndex: ['mergeRules', 'pipelineSuccessRequired'], width: 100, render: (value) => <Text>{value ? 'Required' : 'Optional'}</Text> },
            { title: 'Security', dataIndex: ['mergeRules', 'securityCheckRequired'], width: 100, render: (value) => <Text>{value ? 'Required' : 'Optional'}</Text> },
            { title: 'Applied', dataIndex: 'appliedRepositoryIds', width: 90, render: (values) => values.length },
            { title: 'Updated at', dataIndex: 'updatedAt', width: 190 },
            { title: 'Actions', key: 'actions', width: 110, render: (_, record) => <Link to={`/admin/repository-policy/branch-protection-templates/${record.id}/edit`}>Edit</Link> },
          ]}
        />
      </Card>
    </Space>
  )
}
