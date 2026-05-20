import { Card, Table, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { getMergeRequests } from '../api/mergeRequests'

export default function MergeRequestList() {
  const mergeRequests = getMergeRequests()

  return (
    <Card>
      <Typography.Title level={2}>Merge Request</Typography.Title>
      <Table
        rowKey="id"
        dataSource={mergeRequests}
        pagination={false}
        columns={[
          { title: 'ID', dataIndex: 'id', render: (id) => <Link to={`/merge-requests/${id}`}>!{id}</Link> },
          { title: 'Title', dataIndex: 'title' },
          { title: 'Repository', dataIndex: 'repo' },
          { title: 'Target', dataIndex: 'target' },
          { title: 'Review', dataIndex: 'reviewLabel', render: (value) => <Tag color="orange">{value}</Tag> },
          { title: 'Updated', dataIndex: 'updatedAt' },
        ]}
      />
    </Card>
  )
}
