import { Card, Descriptions, Flex, Tag, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getMergeRequestDetail } from '../api/mergeRequests'

export default function MergeRequestDetail() {
  const { repositoryId, mrId, mergeRequestId } = useParams()
  const currentMrId = mrId ?? mergeRequestId
  const mergeRequest = getMergeRequestDetail(currentMrId)
  const isRepositoryContext = Boolean(repositoryId)

  return (
    <Card>
      <Flex align="center" justify="space-between" gap={12} wrap="wrap">
        <div>
          <Typography.Title level={isRepositoryContext ? 3 : 2}>
            !{currentMrId} {mergeRequest?.title ?? 'Merge Request Detail'}
          </Typography.Title>
          <Typography.Paragraph type="secondary">{mergeRequest?.summary}</Typography.Paragraph>
        </div>
        <Tag color={isRepositoryContext ? 'blue' : 'default'}>
          {isRepositoryContext ? 'Repository context' : 'Global context'}
        </Tag>
      </Flex>
      <Descriptions column={{ xs: 1, md: 2 }} bordered size="small">
        <Descriptions.Item label="Repository">{mergeRequest?.repo ?? repositoryId}</Descriptions.Item>
        <Descriptions.Item label="Source">{mergeRequest?.source}</Descriptions.Item>
        <Descriptions.Item label="Target">{mergeRequest?.target}</Descriptions.Item>
        <Descriptions.Item label="Author">{mergeRequest?.author}</Descriptions.Item>
        <Descriptions.Item label="Review">{mergeRequest?.reviewLabel}</Descriptions.Item>
        <Descriptions.Item label="Updated">{mergeRequest?.updatedAt}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
