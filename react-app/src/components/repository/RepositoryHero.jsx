import { StarFilled, StarOutlined } from '../icons'
import { Card, Descriptions, Flex, Space, Typography } from 'antd'
import { StatusTag } from '../common'

const { Paragraph, Title } = Typography

function RepositoryHero({ repository }) {
  return (
    <Card className="repository-overview-hero">
      <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
        <div>
          <Space size={8} align="center">
            {repository.favorite ? <StarFilled className="repo-favorite-icon" /> : <StarOutlined />}
            <Title level={2}>{repository.name}</Title>
          </Space>
          <Paragraph type="secondary">{repository.description}</Paragraph>
        </div>
        <Space wrap>
          <StatusTag status={repository.status} />
          <StatusTag status={repository.pipelineStatus} label={`Pipeline ${repository.pipelineStatus}`} />
          <StatusTag status={repository.securityStatus} label={`Security ${repository.securityStatus}`} />
        </Space>
      </Flex>

      <Descriptions className="repository-overview-meta" size="small" column={{ xs: 1, lg: 2, xxl: 4 }}>
        <Descriptions.Item label="Group / Project path">{repository.group}</Descriptions.Item>
        <Descriptions.Item label="Visibility">{repository.visibility}</Descriptions.Item>
        <Descriptions.Item label="Default branch">{repository.defaultBranch}</Descriptions.Item>
        <Descriptions.Item label="Current user role">{repository.role}</Descriptions.Item>
        <Descriptions.Item label="Last updated">{repository.updatedAt}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default RepositoryHero
