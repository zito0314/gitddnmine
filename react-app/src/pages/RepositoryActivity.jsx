import { Card, List, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getMockSlice } from '../api/mockClient'

export default function RepositoryActivity() {
  const { repositoryId } = useParams()
  const activities = getMockSlice((data) => data.activities, []).slice(0, 8)

  return (
    <Card>
      <Typography.Title level={3}>Activity</Typography.Title>
      <Typography.Paragraph type="secondary">{repositoryId} 활동 이력 placeholder입니다.</Typography.Paragraph>
      <List
        dataSource={activities}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title ?? item.action ?? 'Activity'} description={item.desc ?? item.updatedAt ?? item.time} />
          </List.Item>
        )}
      />
    </Card>
  )
}
