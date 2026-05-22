import { Button, Card, DatePicker, Form, Input, message, Select, Space, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getBranchProtectionTemplateForRepository,
  submitBranchProtectionPolicyRequest,
} from '../api/branchProtectionPolicies'
import { getRepositoryById } from '../api/repositories'
import { PageHeader } from '../components/common'

const { Text, Title } = Typography

export default function RepositoryPolicyExceptionRequest() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const repository = getRepositoryById(repositoryId)
  const currentTemplate = getBranchProtectionTemplateForRepository(repositoryId)

  if (!repository) return <Card><Title level={3}>Repository를 찾을 수 없습니다.</Title></Card>

  const submit = async (values) => {
    await submitBranchProtectionPolicyRequest({ ...values, repositoryId, type: 'exception' })
    message.success('Branch protection policy exception request submitted')
    navigate(`/repositories/${repositoryId}/settings`)
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader eyebrow={repository.name} title="Request Policy Exception" description="특정 브랜치, 기간, 사유에 대한 정책 예외를 요청합니다." />
      <Card title="Current Policy Summary">
        <Title level={4}>{currentTemplate.name}</Title>
        <Space direction="vertical">{currentTemplate.summary.map((item) => <Text key={item}>- {item}</Text>)}</Space>
      </Card>
      <Card>
        <Form layout="vertical" onFinish={submit}>
          <Form.Item label="Target branch" name="targetBranch" rules={[{ required: true }]}><Input placeholder="release/2026.05" /></Form.Item>
          <Form.Item label="Exception type" name="exceptionType" rules={[{ required: true }]}><Select options={['temporary push exception', 'temporary merge exception', 'approval delegation'].map((value) => ({ value, label: value }))} /></Form.Item>
          <Form.Item label="Reason" name="reason" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
          <Form.Item label="Expiration date" name="expiresAt" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item label="Approver group" name="approverGroup"><Select options={currentTemplate.exceptionAllowedTargets.map((value) => ({ value, label: value }))} /></Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Submit request</Button>
            <Button onClick={() => navigate(`/repositories/${repositoryId}/settings`)}>Cancel</Button>
          </Space>
        </Form>
      </Card>
    </Space>
  )
}
