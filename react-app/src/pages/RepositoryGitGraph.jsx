import { Card, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getRepositoryDetail } from '../api/repositories'
import { PlaceholderPage } from '../components/common'
import { UI_TEXT } from '../constants'

const { Title } = Typography

export default function RepositoryGitGraph() {
  const { repositoryId } = useParams()
  const repository = getRepositoryDetail(repositoryId)

  if (!repository) return <Card><Title level={3}>{UI_TEXT.messages.notFound.repository}</Title></Card>

  return (
    <PlaceholderPage
      title={UI_TEXT.pages.repositoryGitGraph.title}
      description={UI_TEXT.pages.repositoryGitGraph.description}
    />
  )
}
