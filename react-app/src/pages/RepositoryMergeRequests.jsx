import { Card, Table, Tag, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { getMergeRequestsByRepository } from '../api/mergeRequests'

export default function RepositoryMergeRequests() {
  const { repositoryId } = useParams()
  const mergeRequests = getMergeRequestsByRepository(repositoryId)

  return (
    <Card>
      <Typography.Title level={3}>Merge Requests</Typography.Title>
      <Table rowKey="id" dataSource={mergeRequests} pagination={false} columns={[
        { title: 'ID', dataIndex: 'id', render: (id) => <Link to={`/repositories/${repositoryId}/merge-requests/${id}`}>!{id}</Link> },
        { title: 'Title', dataIndex: 'title' },
        { title: 'Source', dataIndex: 'source' },
        { title: 'Target', dataIndex: 'target' },
        { title: 'Review', dataIndex: 'reviewLabel', render: (value) => <Tag color="orange">{value}</Tag> },
        { title: 'Updated', dataIndex: 'updatedAt' },
      ]} />
    </Card>
  )
}
