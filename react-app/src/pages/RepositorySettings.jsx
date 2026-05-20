import { Card, Form, Input, Switch, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getRepositoryDetail } from '../api/repositories'

export default function RepositorySettings() {
  const { repositoryId } = useParams()
  const repository = getRepositoryDetail(repositoryId)

  return (
    <Card>
      <Typography.Title level={3}>Settings</Typography.Title>
      <Form layout="vertical" disabled initialValues={{ name: repository?.name, defaultBranch: repository?.defaultBranch, protected: true }}>
        <Form.Item label="Repository name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Default branch" name="defaultBranch">
          <Input />
        </Form.Item>
        <Form.Item label="Protected repository" name="protected" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Card>
  )
}
