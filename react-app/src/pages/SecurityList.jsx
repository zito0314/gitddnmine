import { Card, Table, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { getSecurityValidations } from '../api/security'

export default function SecurityList() {
  const validations = getSecurityValidations()

  return (
    <Card>
      <Typography.Title level={2}>Security Validation</Typography.Title>
      <Table
        rowKey="id"
        dataSource={validations}
        pagination={false}
        columns={[
          { title: 'ID', dataIndex: 'id', render: (id) => <Link to={`/security/${id}`}>{id}</Link> },
          { title: 'MR', dataIndex: 'mrTitle' },
          { title: 'Repository', dataIndex: 'repo' },
          { title: 'Policy', dataIndex: 'policyLabel', render: (value) => <Tag color="red">{value}</Tag> },
          { title: 'Last checked', dataIndex: 'lastCheckedAt' },
        ]}
      />
    </Card>
  )
}
