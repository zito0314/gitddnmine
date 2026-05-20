import { Card, Table, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getMockSlice } from '../api/mockClient'

export default function RepositoryCommits() {
  const { repositoryId } = useParams()
  const commits = getMockSlice((data) => data.commits, []).filter((commit) => !commit.repo || commit.repo === repositoryId)

  return (
    <Card>
      <Typography.Title level={3}>Commits</Typography.Title>
      <Table rowKey={(record) => record.hash ?? record.id ?? record.title} dataSource={commits} pagination={false} columns={[
        { title: 'Commit', dataIndex: 'hash' },
        { title: 'Message', dataIndex: 'message' },
        { title: 'Author', dataIndex: 'author' },
        { title: 'Updated', dataIndex: 'updatedAt' },
      ]} />
    </Card>
  )
}
