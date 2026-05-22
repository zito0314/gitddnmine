import { Button, Card, DatePicker, Form, Input, message, Select, Space, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getBranchProtectionTemplateForRepository,
  getBranchProtectionTemplates,
  submitBranchProtectionPolicyRequest,
} from '../api/branchProtectionPolicies'
import { getRepositoryById } from '../api/repositories'
import { PageHeader } from '../components/common'

const { Text, Title } = Typography

export default function RepositoryPolicyChangeRequest() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const repository = getRepositoryById(repositoryId)
  const currentTemplate = getBranchProtectionTemplateForRepository(repositoryId)
  const templates = getBranchProtectionTemplates()

  if (!repository) return <Card><Title level={3}>Repository를 찾을 수 없습니다.</Title></Card>

  const submit = async (values) => {
    await submitBranchProtectionPolicyRequest({ ...values, repositoryId, type: 'change' })
    message.success('Branch protection policy change request submitted')
    navigate(`/repositories/${repositoryId}/settings`)
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader eyebrow={repository.name} title="Request Policy Change" description="Repository에 적용된 브랜치 보호 정책 변경을 요청합니다." />
      <Card title="Current Policy Summary">
        <Title level={4}>{currentTemplate.name}</Title>
        <Space direction="vertical">{currentTemplate.summary.map((item) => <Text key={item}>- {item}</Text>)}</Space>
      </Card>
      <Card>
        <Form layout="vertical" onFinish={submit} initialValues={{ requestedTemplate: currentTemplate.id }}>
          <Form.Item label="Requested template" name="requestedTemplate" rules={[{ required: true }]}>
            <Select options={templates.map((template) => ({ value: template.id, label: template.name }))} />
          </Form.Item>
          <Form.Item label="Reason" name="reason" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
          <Form.Item label="Desired effective date" name="effectiveDate"><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item label="Additional note" name="note"><Input.TextArea rows={3} /></Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Submit request</Button>
            <Button onClick={() => navigate(`/repositories/${repositoryId}/settings`)}>Cancel</Button>
          </Space>
        </Form>
      </Card>
    </Space>
  )
}
