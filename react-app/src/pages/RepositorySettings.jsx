import { SaveOutlined } from '@ant-design/icons'
import { Button, Card, Col, Descriptions, Form, Input, Row, Space, Switch, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { getRepositorySettings } from '../api/repositories'
import { PageHeader } from '../components/common'
import { DEMO_MESSAGES, NOT_FOUND_MESSAGES, PAGE_TEXT } from '../constants'

const { Text, Title } = Typography

function PolicySwitch({ label, checked }) {
  return <Form.Item label={label}><Switch checked={checked} disabled /></Form.Item>
}

export default function RepositorySettings() {
  const { repositoryId } = useParams()
  const settings = getRepositorySettings(repositoryId)

  if (!settings) return <Card><Title level={3}>{NOT_FOUND_MESSAGES.repository}</Title></Card>

  const { repository, branchPolicy, mergeRequestPolicy, securityPolicy, notificationPolicy } = settings

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        eyebrow={repository.name}
        title={PAGE_TEXT.repositorySettings.title}
        description={PAGE_TEXT.repositorySettings.description}
        actions={[<Button key="save" type="primary" icon={<SaveOutlined />} disabled>Save</Button>]}
      />
      <Card title="Repository Information">
        <Descriptions column={{ xs: 1, md: 2 }} bordered>
          <Descriptions.Item label="Repository name">{repository.name}</Descriptions.Item>
          <Descriptions.Item label="Group / Project path">{repository.group}</Descriptions.Item>
          <Descriptions.Item label="Visibility">{repository.visibility}</Descriptions.Item>
          <Descriptions.Item label="Default branch">{repository.defaultBranch}</Descriptions.Item>
          <Descriptions.Item label="Owner">{repository.role}</Descriptions.Item>
          <Descriptions.Item label="Language">{repository.type}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Branch Policy">
            <Form layout="vertical" disabled>
              <PolicySwitch label="Protect default branch" checked={branchPolicy.protectedDefault} />
              <PolicySwitch label="Require linear history" checked={branchPolicy.requireLinearHistory} />
              <PolicySwitch label="Allow force push" checked={branchPolicy.forcePush} />
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Merge Request Policy">
            <Form layout="vertical" disabled initialValues={{ approvals: mergeRequestPolicy.approvals }}>
              <Form.Item label="Required approvals" name="approvals"><Input /></Form.Item>
              <PolicySwitch label="Squash commits by default" checked={mergeRequestPolicy.squash} />
              <PolicySwitch label="Pipeline must pass" checked={mergeRequestPolicy.pipelineRequired} />
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Security Policy">
            <Form layout="vertical" disabled>
              <PolicySwitch label="Secret scan" checked={securityPolicy.secretScan} />
              <PolicySwitch label="Dependency scan" checked={securityPolicy.dependencyScan} />
              <PolicySwitch label="Block critical findings" checked={securityPolicy.criticalBlock} />
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Notification Policy">
            <Form layout="vertical" disabled>
              <PolicySwitch label="Pipeline failure alert" checked={notificationPolicy.pipelineFailure} />
              <PolicySwitch label="Security alert" checked={notificationPolicy.securityAlert} />
              <PolicySwitch label="Weekly digest" checked={notificationPolicy.weeklyDigest} />
            </Form>
          </Card>
        </Col>
      </Row>
      <Text type="secondary">{DEMO_MESSAGES.readOnlySettings}</Text>
    </Space>
  )
}
