import { Card, Descriptions, Flex, Tag, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getPipelineDetail } from '../api/pipelines'

export default function PipelineDetail() {
  const { repositoryId, pipelineId } = useParams()
  const pipeline = getPipelineDetail(pipelineId)
  const isRepositoryContext = Boolean(repositoryId)

  return (
    <Card>
      <Flex align="center" justify="space-between" gap={12} wrap="wrap">
        <div>
          <Typography.Title level={isRepositoryContext ? 3 : 2}>
            #{pipelineId} {pipeline?.title ?? 'Pipeline Detail'}
          </Typography.Title>
          <Typography.Paragraph type="secondary">{pipeline?.description}</Typography.Paragraph>
        </div>
        <Tag color={isRepositoryContext ? 'blue' : 'default'}>
          {isRepositoryContext ? 'Repository context' : 'Global context'}
        </Tag>
      </Flex>
      <Descriptions column={{ xs: 1, md: 2 }} bordered size="small">
        <Descriptions.Item label="Repository">{pipeline?.repo ?? repositoryId}</Descriptions.Item>
        <Descriptions.Item label="Branch">{pipeline?.branch}</Descriptions.Item>
        <Descriptions.Item label="Commit">{pipeline?.commit}</Descriptions.Item>
        <Descriptions.Item label="Trigger">{pipeline?.trigger}</Descriptions.Item>
        <Descriptions.Item label="Status">{pipeline?.status}</Descriptions.Item>
        <Descriptions.Item label="Updated">{pipeline?.updatedAt}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
