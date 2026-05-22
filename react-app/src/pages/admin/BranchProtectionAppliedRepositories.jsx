import { Card, Space, Table, Tag, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
import {
  getBranchProtectionTemplateById,
  getRepositoriesByBranchProtectionTemplate,
} from '../../api/branchProtectionPolicies'
import { PageHeader, StatusTag } from '../../components/common'

const { Title } = Typography

export default function BranchProtectionAppliedRepositories() {
  const { templateId } = useParams()
  const template = getBranchProtectionTemplateById(templateId)
  const repositories = getRepositoriesByBranchProtectionTemplate(templateId)

  if (!template) return <Card><Title level={3}>Branch protection template not found</Title></Card>

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title="Applied Repositories" description={`${template.name} 정책이 적용된 저장소 목록입니다.`} />
      <Card>
        <Space wrap>
          <Tag>{template.version}</Tag>
          <StatusTag status={template.status} />
          {template.targetBranches.map((branch) => <Tag key={branch}>{branch}</Tag>)}
        </Space>
      </Card>
      <Table
        rowKey="id"
        dataSource={repositories}
        columns={[
          { title: 'Repository name', dataIndex: 'name', render: (value, record) => <Link to={`/repositories/${record.id}`}>{value}</Link> },
          { title: 'Group', dataIndex: 'group' },
          { title: 'Owner', dataIndex: 'role' },
          { title: 'Applied at', dataIndex: 'appliedAt' },
          { title: 'Last updated', dataIndex: 'updatedAt' },
          { title: 'Policy status', dataIndex: 'policyStatus', render: (value) => <StatusTag status={value} /> },
        ]}
      />
    </Space>
  )
}
