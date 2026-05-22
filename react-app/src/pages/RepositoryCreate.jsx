import { Button, Card, Checkbox, Col, Form, Input, message, Row, Select, Space, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBranchProtectionTemplateById, getBranchProtectionTemplates } from '../api/branchProtectionPolicies'
import { PageHeader } from '../components/common'

const { Text, Title } = Typography

export default function RepositoryCreate() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const templates = getBranchProtectionTemplates()
  const defaultTemplateId = 'bpt-standard-v12'
  const [values, setValues] = useState({ branchProtectionTemplate: defaultTemplateId })
  const selectedTemplate = getBranchProtectionTemplateById(values.branchProtectionTemplate ?? defaultTemplateId)

  const submit = () => {
    message.success('Repository creation request submitted')
    navigate('/repositories')
  }

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title="Create Repository" description="신규 Repository 생성 요청 정보를 입력하는 화면" />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card>
            <Form form={form} layout="vertical" onValuesChange={(_, allValues) => setValues(allValues)} onFinish={submit} initialValues={{ visibility: 'Private', defaultBranch: 'main', readme: true, branchProtection: true, branchProtectionTemplate: defaultTemplateId }}>
              <Row gutter={16}>
                <Col xs={24} md={12}><Form.Item label="Repository name" name="name" rules={[{ required: true }]}><Input placeholder="mobile-banking-api" /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Group / Project path" name="path" rules={[{ required: true }]}><Input placeholder="Digital Banking / Mobile" /></Form.Item></Col>
                <Col xs={24}><Form.Item label="Description" name="description"><Input.TextArea rows={3} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Visibility" name="visibility"><Select options={['Private', 'Internal', 'Public'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Default branch" name="defaultBranch"><Input /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Owner" name="owner"><Select options={['Jito', 'Min', 'Han', 'Yoon'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Template" name="template"><Select options={['Blank', 'React + Vite', 'Node API', 'Secure Service'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Language" name="language"><Select options={['TypeScript', 'JavaScript', 'Java', 'Python'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="MR approval policy" name="approvalPolicy"><Select options={['2 approvals required', 'Tech lead required', 'Security reviewer required'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Security validation policy" name="securityPolicy"><Select options={['Block critical/high', 'Warn only', 'Manual review'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24}>
                  <Form.Item label="Branch Protection Policy Template" name="branchProtectionTemplate">
                    <Select options={templates.map((template) => ({ value: template.id, label: template.name }))} />
                  </Form.Item>
                  {selectedTemplate ? (
                    <Card size="small" title="Selected policy summary">
                      <Space orientation="vertical">
                        {selectedTemplate.summary.map((item) => <Text key={item}>- {item}</Text>)}
                      </Space>
                    </Card>
                  ) : null}
                </Col>
                <Col xs={24}><Form.Item name="readme" valuePropName="checked"><Checkbox>Initial README 생성</Checkbox></Form.Item></Col>
                <Col xs={24}><Form.Item name="branchProtection" valuePropName="checked"><Checkbox>Branch protection 적용</Checkbox></Form.Item></Col>
              </Row>
              <Button type="primary" htmlType="submit">Submit request</Button>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Preview">
            <Space orientation="vertical">
              <Title level={4}>{values.name || 'Repository name'}</Title>
              <Text type="secondary">{values.description || '설명이 여기에 표시됩니다.'}</Text>
              <Text>Path: {values.path || '-'}</Text>
              <Text>Visibility: {values.visibility || 'Private'}</Text>
              <Text>Default branch: {values.defaultBranch || 'main'}</Text>
              <Text>Owner: {values.owner || '-'}</Text>
              <Text>Branch protection: {selectedTemplate?.name ?? '-'}</Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
