import { Button, Card, Checkbox, Col, Form, Input, message, Row, Select, Space, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRepositoryBranches, getRepositoryDetail } from '../api/repositories'
import { PageHeader } from '../components/common'

const { Text, Title } = Typography

export default function MergeRequestCreate() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const repository = getRepositoryDetail(repositoryId)
  const branches = getRepositoryBranches(repositoryId).map((branch) => ({ value: branch.name, label: branch.name }))
  const [form] = Form.useForm()
  const [values, setValues] = useState({})

  if (!repository) return <Card><Title level={3}>Repository not found</Title></Card>

  const submit = () => {
    message.success('Merge request draft created')
    navigate(`/repositories/${repositoryId}/merge-requests`)
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader eyebrow={repository.name} title="New Merge Request" description="Source branch와 Target branch를 선택하고 MR 정보를 입력하는 화면" />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card>
            <Form form={form} layout="vertical" onValuesChange={(_, allValues) => setValues(allValues)} onFinish={submit} initialValues={{ target: repository.defaultBranch, squash: true, deleteSource: true, securityValidation: true }}>
              <Row gutter={16}>
                <Col xs={24} md={12}><Form.Item label="Source branch" name="source" rules={[{ required: true }]}><Select options={branches} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Target branch" name="target" dependencies={['source']} rules={[{ required: true }, ({ getFieldValue }) => ({ validator(_, value) { return value && value === getFieldValue('source') ? Promise.reject(new Error('같은 branch는 선택할 수 없습니다.')) : Promise.resolve() } })]}><Select options={branches} /></Form.Item></Col>
                <Col xs={24}><Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item></Col>
                <Col xs={24}><Form.Item label="Description" name="description"><Input.TextArea rows={4} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Reviewer" name="reviewer"><Select mode="multiple" options={['Min', 'Han', 'Park', 'Seo'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Assignee" name="assignee"><Select options={['Jito', 'Min', 'Kang'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Labels" name="labels"><Select mode="tags" options={['backend', 'security', 'release'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Milestone" name="milestone"><Select options={['2026.05 Release', 'Q2 Security', 'Hotfix'].map((value) => ({ value, label: value }))} /></Form.Item></Col>
                <Col xs={24}><Form.Item name="squash" valuePropName="checked"><Checkbox>Squash commits</Checkbox></Form.Item></Col>
                <Col xs={24}><Form.Item name="deleteSource" valuePropName="checked"><Checkbox>Delete source branch</Checkbox></Form.Item></Col>
                <Col xs={24}><Form.Item name="securityValidation" valuePropName="checked"><Checkbox>Security validation 실행</Checkbox></Form.Item></Col>
              </Row>
              <Button type="primary" htmlType="submit">Create draft</Button>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Preview">
            <Space direction="vertical">
              <Title level={4}>{values.title || 'Merge request title'}</Title>
              <Text code>{values.source || 'source'} → {values.target || repository.defaultBranch}</Text>
              <Text>Reviewer: {(values.reviewer ?? []).join(', ') || '-'}</Text>
              <Text>Expected approval policy: 2 approvals required</Text>
              <Text type="secondary">Pipeline과 Security validation이 draft 생성 후 실행됩니다.</Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
