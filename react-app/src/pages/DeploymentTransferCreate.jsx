import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Flex,
  Form,
  Input,
  List,
  message,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getDeploymentTransferFormOptions,
  getTransferCandidateMergeRequests,
  getTransferCandidatePipelines,
  getTransferCandidateSecurityValidations,
  previewDeploymentTransferGates,
} from '../api/deploymentTransfers'
import { getRepositoryDetail } from '../api/repositories'
import { PageHeader, StatusTag } from '../components/common'
import { UI_TEXT } from '../constants'

const { RangePicker } = DatePicker
const { Text, Title } = Typography

function toOptions(items, getLabel = (item) => item.name ?? item.title ?? item.id, getValue = (item) => item.id) {
  return items.map((item) => ({ value: getValue(item), label: getLabel(item), item }))
}

function formatWindow(windowValue) {
  if (!Array.isArray(windowValue) || windowValue.length !== 2) return '-'
  return windowValue.map((value) => value?.format?.('YYYY-MM-DD HH:mm') ?? '-').join(' ~ ')
}

export default function DeploymentTransferCreate() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const repository = repositoryId ? getRepositoryDetail(repositoryId) : null
  const initialRepositoryId = repositoryId ?? getDeploymentTransferFormOptions().repositories[0]?.id
  const initialValues = {
    repositoryId: initialRepositoryId,
    requestedBy: 'Jito',
    targetEnvironment: 'production',
    notifyReviewers: true,
    auditNote: true,
  }
  const [values, setValues] = useState(initialValues)

  const selectedRepositoryId = Form.useWatch('repositoryId', form) ?? initialRepositoryId
  const selectedMrId = Form.useWatch('mrId', form)
  const selectedPipelineId = Form.useWatch('pipelineId', form)
  const selectedSecurityId = Form.useWatch('securityId', form)

  const options = useMemo(
    () => getDeploymentTransferFormOptions(selectedRepositoryId),
    [selectedRepositoryId],
  )
  const mergeRequests = useMemo(
    () => getTransferCandidateMergeRequests(selectedRepositoryId),
    [selectedRepositoryId],
  )
  const pipelines = useMemo(
    () => getTransferCandidatePipelines(selectedRepositoryId, selectedMrId),
    [selectedRepositoryId, selectedMrId],
  )
  const securityValidations = useMemo(
    () => getTransferCandidateSecurityValidations(selectedRepositoryId, selectedMrId),
    [selectedRepositoryId, selectedMrId],
  )
  const preview = useMemo(
    () => previewDeploymentTransferGates(values),
    [values],
  )

  const selectedRepository = options.repositories.find((item) => item.id === selectedRepositoryId)
  const selectedMergeRequest = mergeRequests.find((item) => String(item.id) === String(selectedMrId))
  const selectedPipeline = pipelines.find((item) => String(item.id) === String(selectedPipelineId))
  const selectedSecurity = securityValidations.find((item) => item.id === selectedSecurityId)
  const listPath = repositoryId ? `/repositories/${repositoryId}/deployment-transfer` : '/deployment-transfer'

  if (repositoryId && !repository) {
    return (
      <Card>
        <Title level={3}>{UI_TEXT.messages.notFound.repository}</Title>
      </Card>
    )
  }

  const handleValuesChange = (changedValues, allValues) => {
    if (Object.hasOwn(changedValues, 'repositoryId')) {
      const nextValues = {
        ...allValues,
        mrId: undefined,
        pipelineId: undefined,
        securityId: undefined,
      }
      form.setFieldsValue(nextValues)
      setValues(nextValues)
      return
    }

    if (Object.hasOwn(changedValues, 'mrId')) {
      const nextValues = {
        ...allValues,
        pipelineId: undefined,
        securityId: undefined,
      }
      form.setFieldsValue(nextValues)
      setValues(nextValues)
      return
    }

    setValues(allValues)
  }

  const handleSubmit = () => {
    message.success(UI_TEXT.deploymentTransferCreate.submitted)
    navigate(listPath)
  }

  const handleDraft = () => {
    message.info(UI_TEXT.deploymentTransferCreate.draftSaved)
  }

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        eyebrow={repository?.name}
        title={UI_TEXT.deploymentTransferCreate.title}
        description={UI_TEXT.deploymentTransferCreate.description}
      />

      <Row gutter={[16, 16]} align="top">
        <Col xs={24} xl={15}>
          <Card title={UI_TEXT.deploymentTransferCreate.formTitle}>
            <Form
              form={form}
              layout="vertical"
              initialValues={initialValues}
              onValuesChange={handleValuesChange}
              onFinish={handleSubmit}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Repository" name="repositoryId" rules={[{ required: true }]}>
                    <Select
                      disabled={Boolean(repositoryId)}
                      options={toOptions(options.repositories, (item) => item.name, (item) => item.id)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Target environment" name="targetEnvironment" rules={[{ required: true }]}>
                    <Select options={options.environments.map((value) => ({ value, label: value }))} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Related Merge Request" name="mrId" rules={[{ required: true }]}>
                    <Select
                      showSearch
                      optionFilterProp="label"
                      options={toOptions(mergeRequests, (item) => `!${item.id} ${item.title}`)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Related Pipeline" name="pipelineId" rules={[{ required: true }]}>
                    <Select
                      showSearch
                      optionFilterProp="label"
                      options={toOptions(pipelines, (item) => `#${item.id} ${item.status}`, (item) => item.id)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Related Security Validation" name="securityId" rules={[{ required: true }]}>
                    <Select
                      showSearch
                      optionFilterProp="label"
                      options={toOptions(securityValidations, (item) => `${item.id} ${item.policyLabel}`)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Deployment window" name="deploymentWindow" rules={[{ required: true }]}>
                    <RangePicker showTime style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Requested by" name="requestedBy" rules={[{ required: true }]}>
                    <Select options={options.users.map((user) => ({ value: user.name, label: `${user.name} · ${user.role}` }))} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Approver" name="approver" rules={[{ required: true }]}>
                    <Select options={options.users.map((user) => ({ value: user.name, label: `${user.name} · ${user.role}` }))} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Change reason" name="changeReason" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} placeholder="운영 반영 사유를 입력하세요." />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Impact scope" name="impactScope" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} placeholder="영향 범위와 확인 대상을 입력하세요." />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Rollback plan" name="rollbackPlan" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} placeholder="문제 발생 시 롤백 계획을 입력하세요." />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item name="emergency" valuePropName="checked">
                    <Checkbox>Emergency deployment</Checkbox>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item name="notifyReviewers" valuePropName="checked">
                    <Checkbox>Notify reviewers</Checkbox>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item name="auditNote" valuePropName="checked">
                    <Checkbox>Attach audit note</Checkbox>
                  </Form.Item>
                </Col>
              </Row>

              <Space wrap>
                <Button type="primary" htmlType="submit">
                  {UI_TEXT.deploymentTransferCreate.submit}
                </Button>
                <Button onClick={handleDraft}>{UI_TEXT.deploymentTransferCreate.draft}</Button>
                <Button onClick={() => navigate(listPath)}>{UI_TEXT.deploymentTransferCreate.cancel}</Button>
              </Space>
            </Form>
          </Card>
        </Col>

        <Col xs={24} xl={9}>
          <Space orientation="vertical" size={16} style={{ width: '100%' }}>
            <Card title={UI_TEXT.deploymentTransferCreate.gatePreview}>
              <List
                dataSource={preview.gates}
                renderItem={(gate) => (
                  <List.Item>
                    <Flex align="center" justify="space-between" style={{ width: '100%' }} gap={12}>
                      <Text>{gate.label}</Text>
                      <StatusTag status={gate.status} />
                    </Flex>
                  </List.Item>
                )}
              />
            </Card>

            <Card title={UI_TEXT.deploymentTransferCreate.summaryPreview}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Repository">{selectedRepository?.name ?? '-'}</Descriptions.Item>
                <Descriptions.Item label="MR">{selectedMergeRequest ? `!${selectedMergeRequest.id} ${selectedMergeRequest.title}` : '-'}</Descriptions.Item>
                <Descriptions.Item label="Pipeline">{selectedPipeline ? `#${selectedPipeline.id} ${selectedPipeline.status}` : '-'}</Descriptions.Item>
                <Descriptions.Item label="Security">{selectedSecurity ? `${selectedSecurity.id} ${selectedSecurity.policyLabel}` : '-'}</Descriptions.Item>
                <Descriptions.Item label="Environment">{values.targetEnvironment ?? '-'}</Descriptions.Item>
                <Descriptions.Item label="Risk level"><StatusTag status={preview.riskLevel} /></Descriptions.Item>
                <Descriptions.Item label="Approval policy">{UI_TEXT.deploymentTransferCreate.expectedApprovalPolicy}</Descriptions.Item>
                <Descriptions.Item label="Scheduled window">{formatWindow(values.deploymentWindow)}</Descriptions.Item>
                <Descriptions.Item label="Gate readiness"><StatusTag status={preview.readiness} /></Descriptions.Item>
              </Descriptions>
            </Card>

            <Alert
              showIcon
              type={preview.readiness === 'blocked' ? 'error' : preview.readiness === 'warning' ? 'warning' : 'info'}
              title={UI_TEXT.deploymentTransferCreate.recommendedActions}
              description={preview.recommendation}
            />
          </Space>
        </Col>
      </Row>
    </Space>
  )
}
