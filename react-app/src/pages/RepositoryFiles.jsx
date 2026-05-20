import { Card, Table, Typography } from 'antd'
import { useParams } from 'react-router-dom'

export default function RepositoryFiles() {
  const { repositoryId } = useParams()
  const files = [
    { path: 'src', type: 'Directory', updatedAt: '20분 전' },
    { path: 'package.json', type: 'File', updatedAt: '1시간 전' },
    { path: 'README.md', type: 'File', updatedAt: '어제' },
  ]

  return (
    <Card>
      <Typography.Title level={3}>Files</Typography.Title>
      <Typography.Paragraph type="secondary">{repositoryId} 파일 브라우저 placeholder입니다.</Typography.Paragraph>
      <Table rowKey="path" dataSource={files} pagination={false} columns={[
        { title: 'Path', dataIndex: 'path' },
        { title: 'Type', dataIndex: 'type' },
        { title: 'Updated', dataIndex: 'updatedAt' },
      ]} />
    </Card>
  )
}
