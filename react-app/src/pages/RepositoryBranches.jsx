import { Card, Table, Tag, Typography } from 'antd'
import { useParams } from 'react-router-dom'

export default function RepositoryBranches() {
  const { repositoryId } = useParams()
  const branches = [
    { name: 'main', protected: true, updatedAt: '20분 전' },
    { name: 'develop', protected: true, updatedAt: '1시간 전' },
    { name: 'feature/login-policy', protected: false, updatedAt: '20분 전' },
  ]

  return (
    <Card>
      <Typography.Title level={3}>Branches</Typography.Title>
      <Typography.Paragraph type="secondary">{repositoryId} 브랜치 목록 placeholder입니다.</Typography.Paragraph>
      <Table rowKey="name" dataSource={branches} pagination={false} columns={[
        { title: 'Branch', dataIndex: 'name' },
        { title: 'Protected', dataIndex: 'protected', render: (value) => <Tag color={value ? 'blue' : 'default'}>{value ? 'Protected' : 'Open'}</Tag> },
        { title: 'Updated', dataIndex: 'updatedAt' },
      ]} />
    </Card>
  )
}
