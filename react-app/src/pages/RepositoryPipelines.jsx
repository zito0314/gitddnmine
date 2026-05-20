import { Card, Table, Tag, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { getPipelinesByRepository } from '../api/pipelines'

export default function RepositoryPipelines() {
  const { repositoryId } = useParams()
  const pipelines = getPipelinesByRepository(repositoryId)

  return (
    <Card>
      <Typography.Title level={3}>Pipelines</Typography.Title>
      <Table rowKey="id" dataSource={pipelines} pagination={false} columns={[
        { title: 'ID', dataIndex: 'id', render: (id) => <Link to={`/repositories/${repositoryId}/pipelines/${id}`}>#{id}</Link> },
        { title: 'Title', dataIndex: 'title' },
        { title: 'Branch', dataIndex: 'branch' },
        { title: 'Status', dataIndex: 'status', render: (value) => <Tag color={value === 'failed' ? 'red' : 'green'}>{value}</Tag> },
        { title: 'Updated', dataIndex: 'updatedAt' },
      ]} />
    </Card>
  )
}
