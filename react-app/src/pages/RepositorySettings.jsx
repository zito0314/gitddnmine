import { SaveOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Col, Descriptions, Form, Input, Row, Space, Switch, Tag, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { getBranchProtectionTemplateForRepository } from '../api/branchProtectionPolicies'
import { getRepositorySettings } from '../api/repositories'
import { PageHeader } from '../components/common'
import { UI_TEXT } from '../constants'

const { Text, Title } = Typography

function PolicySwitch({ label, checked }) {
  return <Form.Item label={label}><Switch checked={checked} disabled /></Form.Item>
}

export default function RepositorySettings() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const settings = getRepositorySettings(repositoryId)

  if (!settings) return <Card><Title level={3}>{UI_TEXT.messages.notFound.repository}</Title></Card>

  const { repository, branchPolicy, mergeRequestPolicy, securityPolicy, notificationPolicy } = settings
  const branchProtectionTemplate = getBranchProtectionTemplateForRepository(repositoryId)

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        eyebrow={repository.name}
        title={UI_TEXT.pages.repositorySettings.title}
        description={UI_TEXT.pages.repositorySettings.description}
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
      <Card
        title="Current Branch Protection Template"
        extra={
          <Space>
            <Button onClick={() => navigate(`/repositories/${repositoryId}/settings/policy-change-request`)}>Request Policy Change</Button>
            <Button type="primary" onClick={() => navigate(`/repositories/${repositoryId}/settings/policy-exception-request`)}>Request Exception</Button>
          </Space>
        }
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Alert
            type="info"
            showIcon
            message="Branch protection templates are managed by Admin. Repository owners can request changes or exceptions within the allowed scope."
          />
          <Descriptions column={{ xs: 1, md: 2 }} bordered>
            <Descriptions.Item label="Template name">{branchProtectionTemplate.name}</Descriptions.Item>
            <Descriptions.Item label="Version">{branchProtectionTemplate.version}</Descriptions.Item>
            <Descriptions.Item label="Target branches">
              <Space wrap>{branchProtectionTemplate.targetBranches.map((branch) => <Tag key={branch}>{branch}</Tag>)}</Space>
            </Descriptions.Item>
            <Descriptions.Item label="Applied at">{branchProtectionTemplate.updatedAt}</Descriptions.Item>
          </Descriptions>
          <Space direction="vertical">
            {branchProtectionTemplate.summary.map((item) => <Text key={item}>- {item}</Text>)}
          </Space>
        </Space>
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
      <Text type="secondary">{UI_TEXT.messages.demo.readOnlySettings}</Text>
    </Space>
  )
}
