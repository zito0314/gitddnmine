import { Button, Card, Checkbox, Col, Form, Input, InputNumber, message, Row, Select, Space, Typography } from 'antd'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createBranchProtectionTemplate,
  getBranchProtectionTemplateById,
  updateBranchProtectionTemplate,
} from '../../api/branchProtectionPolicies'
import { PageHeader } from '../../components/common'

const { Text, Title } = Typography

const optionList = (values) => values.map((value) => ({ value, label: value }))

function buildSummary(values) {
  return [
    values?.pushRestricted ? '대상 브랜치 직접 push 제한' : null,
    values?.minimumApprovals ? `MR 승인 ${values.minimumApprovals}명 이상 필요` : null,
    values?.pipelineSuccessRequired ? 'Pipeline 성공 시 병합 가능' : null,
    values?.securityCheckRequired ? '보안 점검 통과 필수' : null,
    values?.forcePushBlocked ? 'Force push 차단' : null,
    values?.deleteBranchRestricted ? '브랜치 삭제 차단' : null,
  ].filter(Boolean)
}

export default function BranchProtectionTemplateForm() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const template = templateId ? getBranchProtectionTemplateById(templateId) : null
  const isEdit = Boolean(templateId)
  const watchedValues = Form.useWatch([], form)
  const preview = useMemo(() => buildSummary(watchedValues ?? {}), [watchedValues])

  const initialValues = template
    ? {
        name: template.name,
        description: template.description,
        version: template.version,
        status: template.status,
        targetBranches: template.targetBranches,
        exceptionAllowedTargets: template.exceptionAllowedTargets,
        adjustableOptionsForOwner: template.adjustableOptionsForOwner,
        ...template.restrictions,
        ...template.mergeRules,
      }
    : {
        version: '1.0',
        status: 'draft',
        targetBranches: ['main'],
        minimumApprovals: 2,
        mergeRequestRequired: true,
        pipelineSuccessRequired: true,
        securityCheckRequired: true,
        deploymentApprovalRequired: true,
        pushRestricted: true,
        deleteBranchRestricted: true,
        forcePushBlocked: true,
        exceptionAllowedTargets: ['Admin'],
      }

  const submit = async (payload) => {
    if (isEdit) {
      await updateBranchProtectionTemplate(templateId, payload)
      message.success('Branch protection template updated')
      navigate(`/admin/repository-policy/branch-protection-templates/${templateId}`)
      return
    }
    await createBranchProtectionTemplate(payload)
    message.success('Branch protection template created')
    navigate('/admin/repository-policy/branch-protection-templates')
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title={isEdit ? 'Edit Branch Protection Template' : 'Create Branch Protection Template'} description="관리자가 브랜치 보호 정책 템플릿을 생성하거나 수정합니다." />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card>
            <Form form={form} layout="vertical" initialValues={initialValues} onFinish={submit}>
              <Row gutter={16}>
                <Col xs={24} md={12}><Form.Item label="템플릿 이름" name="name" rules={[{ required: true }]}><Input /></Form.Item></Col>
                <Col xs={24} md={6}><Form.Item label="버전" name="version" rules={[{ required: true }]}><Input /></Form.Item></Col>
                <Col xs={24} md={6}><Form.Item label="상태" name="status"><Select options={optionList(['active', 'draft'])} /></Form.Item></Col>
                <Col xs={24}><Form.Item label="설명" name="description"><Input.TextArea rows={3} /></Form.Item></Col>
                <Col xs={24}><Form.Item label="적용 대상 브랜치" name="targetBranches"><Select mode="tags" options={optionList(['main', 'develop', 'release/*', 'hotfix/*'])} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="최소 승인자 수" name="minimumApprovals"><InputNumber min={0} max={5} style={{ width: '100%' }} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="예외 권한 대상" name="exceptionAllowedTargets"><Select mode="tags" options={optionList(['Admin', 'Security Manager', 'Release Manager', 'Maintainer'])} /></Form.Item></Col>
                <Col xs={24}><Form.Item label="Owner가 조정 가능한 옵션" name="adjustableOptionsForOwner"><Select mode="multiple" options={optionList(['minimumApprovals', 'targetBranches'])} /></Form.Item></Col>
                {[
                  ['createBranchRestricted', '브랜치 생성 제한'],
                  ['pushRestricted', '브랜치 수정 제한'],
                  ['deleteBranchRestricted', '브랜치 삭제 제한'],
                  ['forcePushBlocked', '강제 push 차단'],
                  ['mergeRequestRequired', 'MR 필수 여부'],
                  ['pipelineSuccessRequired', 'Pipeline 성공 필수 여부'],
                  ['securityCheckRequired', '보안 점검 필수 여부'],
                  ['deploymentApprovalRequired', '운영이관 승인 필수 여부'],
                ].map(([name, label]) => (
                  <Col xs={24} md={12} key={name}><Form.Item name={name} valuePropName="checked"><Checkbox>{label}</Checkbox></Form.Item></Col>
                ))}
              </Row>
              <Space>
                <Button type="primary" htmlType="submit">{isEdit ? 'Update Template' : 'Create Template'}</Button>
                <Button onClick={() => navigate(-1)}>Cancel</Button>
              </Space>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Preview">
            <Title level={4}>{watchedValues?.name || initialValues.name || 'Branch Protection Template'}</Title>
            <Text type="secondary">{watchedValues?.description || initialValues.description || '정책 설명이 표시됩니다.'}</Text>
            <SummaryPreview items={preview.length ? preview : buildSummary(initialValues)} />
          </Card>
        </Col>
      </Row>
    </Space>
  )
}

function SummaryPreview({ items }) {
  return <Space direction="vertical" style={{ marginTop: 16 }}>{items.map((item) => <Text key={item}>- {item}</Text>)}</Space>
}
