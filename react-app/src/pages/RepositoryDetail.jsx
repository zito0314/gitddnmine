import { Card, Col, Row, Statistic, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getRepositoryDetail } from '../api/repositories'

export default function RepositoryDetail() {
  const { repositoryId } = useParams()
  const repository = getRepositoryDetail(repositoryId)

  return (
    <Card>
      <Typography.Title level={3}>Overview</Typography.Title>
      <Typography.Paragraph type="secondary">
        {repository?.description ?? 'Repository overview placeholder'}
      </Typography.Paragraph>
      <Row gutter={[14, 14]}>
        {(repository?.metrics ?? []).map((metric) => (
          <Col xs={24} sm={12} lg={6} key={metric.label}>
            <Statistic title={metric.label} value={metric.value} />
          </Col>
        ))}
      </Row>
    </Card>
  )
}
