import { Button, Card, Descriptions, Result, Space, Tag, Typography } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCommitBySha, getRepositoryDetail } from '../api/repositories'

const { Text, Title } = Typography

export default function RepositoryCommitDetail() {
  const { repositoryId, commitSha } = useParams()
  const navigate = useNavigate()
  const repository = getRepositoryDetail(repositoryId)
  const commit = getCommitBySha(repositoryId, commitSha)

  if (!repository) {
    return (
      <Result
        status="404"
        title="Repository를 찾을 수 없어요."
        subTitle="삭제되었거나 접근 권한이 없는 Repository일 수 있어요."
        extra={<Button type="primary" onClick={() => navigate('/repositories')}>저장소 목록으로 이동</Button>}
      />
    )
  }

  if (!commit) {
    return (
      <Result
        status="404"
        title="Commit 상세"
        subTitle="삭제되었거나 접근 권한이 없는 Commit일 수 있어요."
        extra={<Button type="primary" onClick={() => navigate(`/repositories/${repositoryId}/commits`)}>Commits로 돌아가기</Button>}
      />
    )
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card>
        <Space direction="vertical" size={8}>
          <Text type="secondary">{repository.name}</Text>
          <Title level={2}>Commit 상세</Title>
          <Text strong>{commit.message ?? commit.title}</Text>
        </Space>
      </Card>
      <Card>
        <Descriptions column={{ xs: 1, md: 2 }} bordered>
          <Descriptions.Item label="SHA"><Text code>{commit.sha}</Text></Descriptions.Item>
          <Descriptions.Item label="작성자">{commit.author}</Descriptions.Item>
          <Descriptions.Item label="Branch"><Tag>{commit.branch}</Tag></Descriptions.Item>
          <Descriptions.Item label="생성 시간">{commit.createdAtText}</Descriptions.Item>
          <Descriptions.Item label="변경 파일 수">{commit.changedFilesCount}</Descriptions.Item>
          <Descriptions.Item label="Pipeline">
            {commit.pipelineId ? <Link to={`/repositories/${repositoryId}/pipelines/${commit.pipelineId}`}>#{commit.pipelineId}</Link> : 'Pipeline 없음'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Button onClick={() => navigate(`/repositories/${repositoryId}/commits`)}>Commits로 돌아가기</Button>
    </Space>
  )
}
