import { Card, Table, Tag, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getSecurityValidationsByRepository } from '../api/security'

export default function RepositorySecurity() {
  const { repositoryId } = useParams()
  const validations = getSecurityValidationsByRepository(repositoryId)

  return (
    <Card>
      <Typography.Title level={3}>Security</Typography.Title>
      <Table rowKey="id" dataSource={validations} pagination={false} columns={[
        { title: 'ID', dataIndex: 'id' },
        { title: 'MR', dataIndex: 'mrTitle' },
        { title: 'Branch', dataIndex: 'branch' },
        { title: 'Policy', dataIndex: 'policyLabel', render: (value) => <Tag color="red">{value}</Tag> },
        { title: 'Last checked', dataIndex: 'lastCheckedAt' },
      ]} />
    </Card>
  )
}
