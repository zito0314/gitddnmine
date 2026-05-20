import { Card, Table, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { getRepositories } from '../api/repositories'

export default function RepositoryList() {
  const repositories = getRepositories()

  return (
    <Card>
      <Typography.Title level={2}>Repository</Typography.Title>
      <Table
        rowKey="id"
        dataSource={repositories}
        pagination={false}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            render: (name, record) => <Link to={`/repositories/${record.id}`}>{name}</Link>,
          },
          { title: 'Group', dataIndex: 'group' },
          { title: 'Visibility', dataIndex: 'visibility', render: (value) => <Tag>{value}</Tag> },
          { title: 'Default branch', dataIndex: 'defaultBranch' },
          { title: 'Updated', dataIndex: 'updatedAt' },
        ]}
      />
    </Card>
  )
}
