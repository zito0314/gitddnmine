import { Card, Table, Typography } from 'antd'
import { useParams } from 'react-router-dom'

export default function RepositoryTags() {
  const { repositoryId } = useParams()
  const tags = [
    { name: 'v1.4.2', target: '7e14d754', createdAt: '2일 전' },
    { name: 'v1.4.1', target: '5c91a022', createdAt: '1주 전' },
  ]

  return (
    <Card>
      <Typography.Title level={3}>Tags</Typography.Title>
      <Typography.Paragraph type="secondary">{repositoryId} 태그 목록 placeholder입니다.</Typography.Paragraph>
      <Table rowKey="name" dataSource={tags} pagination={false} columns={[
        { title: 'Tag', dataIndex: 'name' },
        { title: 'Target', dataIndex: 'target' },
        { title: 'Created', dataIndex: 'createdAt' },
      ]} />
    </Card>
  )
}
