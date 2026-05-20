import { Card, Table, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { getPipelines } from '../api/pipelines'

export default function PipelineList() {
  const pipelines = getPipelines()

  return (
    <Card>
      <Typography.Title level={2}>Pipeline</Typography.Title>
      <Table
        rowKey="id"
        dataSource={pipelines}
        pagination={false}
        columns={[
          { title: 'ID', dataIndex: 'id', render: (id) => <Link to={`/pipelines/${id}`}>#{id}</Link> },
          { title: 'Title', dataIndex: 'title' },
          { title: 'Repository', dataIndex: 'repo' },
          { title: 'Branch', dataIndex: 'branch' },
          { title: 'Status', dataIndex: 'status', render: (value) => <Tag color={value === 'failed' ? 'red' : 'green'}>{value}</Tag> },
          { title: 'Updated', dataIndex: 'updatedAt' },
        ]}
      />
    </Card>
  )
}
