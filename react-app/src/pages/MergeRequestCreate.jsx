import { Alert, Avatar, Button, Card, Checkbox, Col, Divider, Flex, Form, Input, message, Row, Select, Tooltip, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  getRepositories,
  getRepositoryBranchComparison,
  getRepositoryBranches,
  getRepositoryDetail,
  getRepositoryMergeConditions,
  getRepositoryMergeRequests,
} from '../api/repositories'
import { CopyOutlined } from '../components/icons'
import { FormSection, PageHeader } from '../components/common'

const { Text } = Typography

function toRepositoryOption(repository) {
  return {
    value: repository.id,
    label: `${repository.group ? `${repository.group} / ` : ''}${repository.name}`,
  }
}

function toBranchOption(branch) {
  return { value: branch.name, label: branch.name }
}

function findLatestCommit(branches, branchName) {
  return branches.find((branch) => branch.name === branchName)?.latestCommit ?? null
}

function getPushNotice(repository, sourceBranch, targetBranch) {
  const notice = repository?.latestPushNotice
  if (!notice) return null
  const noticeSource = notice.sourceBranch ?? notice.branchName
  const noticeTarget = notice.targetBranch ?? repository.defaultBranch
  if (noticeSource !== sourceBranch || noticeTarget !== targetBranch) return null
  return notice
}

function getDefaultMrTitle(sourceBranch, targetBranch, notice) {
  if (notice?.title) return notice.title
  return `${sourceBranch} → ${targetBranch} MR`
}

function getDefaultMrDescription(sourceBranch, targetBranch, notice) {
  if (notice?.description) return notice.description
  return `${sourceBranch} Branch의 변경사항을 ${targetBranch} Branch로 병합 요청합니다.`
}

export default function MergeRequestCreate() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const repositoryOptions = useMemo(() => getRepositories().map(toRepositoryOption), [])
  const [form] = Form.useForm()
  const initialRepositoryId = location.state?.repositoryId ?? repositoryId ?? null
  const initialSourceBranch = location.state?.sourceBranch ?? searchParams.get('sourceBranch')
  const initialTargetBranch = location.state?.targetBranch ?? searchParams.get('targetBranch')
  const [selectedRepositoryId, setSelectedRepositoryId] = useState(initialRepositoryId)
  const [selectedSourceBranch, setSelectedSourceBranch] = useState(initialSourceBranch)
  const [selectedTargetBranch, setSelectedTargetBranch] = useState(initialTargetBranch)

  const selectedRepository = selectedRepositoryId ? getRepositoryDetail(selectedRepositoryId) : null
  const branches = selectedRepositoryId ? getRepositoryBranches(selectedRepositoryId) : []
  const branchOptions = branches.map(toBranchOption)
  const mergeConditions = selectedRepositoryId ? getRepositoryMergeConditions(selectedRepositoryId) : []
  const sourceCommit = selectedSourceBranch ? findLatestCommit(branches, selectedSourceBranch) : null
  const targetCommit = selectedTargetBranch ? findLatestCommit(branches, selectedTargetBranch) : null
  const branchComparison = getRepositoryBranchComparison(selectedRepositoryId, selectedSourceBranch, selectedTargetBranch)
  const hasSameBranch = Boolean(selectedSourceBranch && selectedTargetBranch && selectedSourceBranch === selectedTargetBranch)
  const hasDuplicateMr = Boolean(
    selectedRepositoryId &&
      selectedSourceBranch &&
      selectedTargetBranch &&
      getRepositoryMergeRequests(selectedRepositoryId).some(
        (mr) => mr.status === 'open' && mr.source === selectedSourceBranch && mr.target === selectedTargetBranch,
      ),
  )
  const hasNoDiff = branchComparison?.hasDiff === false
  const pushNotice = getPushNotice(selectedRepository, selectedSourceBranch, selectedTargetBranch)
  const isFromLatestPushNotice = Boolean(location.state?.fromLatestPushNotice || searchParams.get('from') === 'latest-push')

  useEffect(() => {
    if (!initialRepositoryId) return
    if (!initialSourceBranch || !initialTargetBranch) {
      form.setFieldValue('repositoryId', initialRepositoryId)
      return
    }

    const repository = getRepositoryDetail(initialRepositoryId)
    const notice = getPushNotice(repository, initialSourceBranch, initialTargetBranch)
    const title = location.state?.title ?? getDefaultMrTitle(initialSourceBranch, initialTargetBranch, notice)
    const description = location.state?.description ?? getDefaultMrDescription(initialSourceBranch, initialTargetBranch, notice)

    form.setFieldsValue({
      repositoryId: initialRepositoryId,
      source: initialSourceBranch,
      target: initialTargetBranch,
      title,
      description,
    })
  }, [form, initialRepositoryId, initialSourceBranch, initialTargetBranch, location.state?.description, location.state?.title])

  const warnRepositoryRequired = () => {
    if (!selectedRepositoryId) message.warning('저장소를 먼저 선택해 주세요.')
  }

  const handleRepositoryChange = (nextRepositoryId) => {
    setSelectedRepositoryId(nextRepositoryId)
    setSelectedSourceBranch(null)
    setSelectedTargetBranch(null)
    form.setFieldsValue({ source: undefined, target: undefined })
  }

  const copyCommitSha = async (sha) => {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(sha)
    message.success('Commit SHA를 복사했어요.')
  }

  const submit = () => {
    if (hasSameBranch) {
      message.warning('Source Branch와 Target Branch는 서로 달라야 해요.')
      return
    }
    if (hasDuplicateMr) {
      message.warning('동일한 Source/Target Branch 조합의 MR이 이미 있어요.')
      return
    }
    if (hasNoDiff) {
      message.warning('선택한 Branch 사이에 비교 가능한 변경사항이 없어요.')
      return
    }

    message.success('MR 생성 요청이 접수되었어요.')
    navigate(`/repositories/${selectedRepositoryId ?? repositoryId}/merge-requests`)
  }

  return (
    <Flex vertical gap={24} className="merge-request-create-page">
      <PageHeader
        title="MR 생성"
        description="Source Branch의 변경사항을 Target Branch로 병합 요청합니다. 연결된 Jira Ticket, 리뷰어, Pipeline/보안 점검 조건을 함께 확인한 후 MR을 생성해 주세요."
      />
      <Form
        form={form}
        layout="vertical"
        className="merge-request-create-form"
        onFinish={submit}
        initialValues={{ squash: true, deleteSource: true, securityValidation: true, notifyReviewer: true, draft: false }}
      >
        <Flex vertical gap={24}>
          <FormSection
            title="저장소 / Branch 선택"
            description="MR을 생성할 저장소와 병합할 Branch를 선택해 주세요. 선택한 Branch 기준으로 비교 가능한 변경사항이 있을 때 MR을 생성할 수 있어요."
          >
              {isFromLatestPushNotice && pushNotice ? (
                <Alert
                  type="info"
                  showIcon
                  title="새 Push를 기반으로 MR 정보를 채웠어요."
                  description={`${pushNotice.branchName} Branch에 ${pushNotice.pushedAt} ${pushNotice.pushedBy}님이 Push한 Commit ${pushNotice.commitSha} 기준입니다.`}
                />
              ) : null}
              <Form.Item label="저장소" name="repositoryId" rules={[{ required: true, message: '저장소를 선택해 주세요.' }]}>
                <Select placeholder="저장소 선택" options={repositoryOptions} onChange={handleRepositoryChange} />
              </Form.Item>
              {selectedRepository ? (
                <MergeConditionCard repository={selectedRepository} mergeConditions={mergeConditions} />
              ) : null}
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Source Branch"
                    name="source"
                    rules={[{ required: true, message: 'Source Branch를 선택해 주세요.' }]}
                  >
                    <BranchSelect
                      placeholder="Source Branch 선택"
                      disabled={!selectedRepositoryId}
                      options={branchOptions}
                      onBlockedClick={warnRepositoryRequired}
                      onChange={(value) => {
                        setSelectedSourceBranch(value)
                      }}
                    />
                  </Form.Item>
                  {sourceCommit ? <CommitCard commit={sourceCommit} onCopy={copyCommitSha} /> : null}
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Target Branch"
                    name="target"
                    dependencies={['source']}
                    rules={[
                      { required: true, message: 'Target Branch를 선택해 주세요.' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          return value && value === getFieldValue('source')
                            ? Promise.reject(new Error('Source Branch와 Target Branch는 서로 달라야 해요.'))
                            : Promise.resolve()
                        },
                      }),
                    ]}
                  >
                    <BranchSelect
                      placeholder="Target Branch 선택"
                      disabled={!selectedRepositoryId}
                      options={branchOptions}
                      onBlockedClick={warnRepositoryRequired}
                      onChange={(value) => {
                        setSelectedTargetBranch(value)
                      }}
                    />
                  </Form.Item>
                  {targetCommit ? <CommitCard commit={targetCommit} onCopy={copyCommitSha} /> : null}
                </Col>
              </Row>
              <BranchValidationAlert
                hasSameBranch={hasSameBranch}
                hasDuplicateMr={hasDuplicateMr}
                branchComparison={branchComparison}
              />
          </FormSection>

          <Divider />

          <FormSection
            title="MR 정보"
            description="리뷰어가 변경 목적과 범위를 이해할 수 있도록 작성해 주세요."
          >
              <Form.Item label="MR 제목" name="title" rules={[{ required: true, message: 'MR 제목을 입력해 주세요.' }]}>
                <Input placeholder="MR 제목을 입력해 주세요." />
              </Form.Item>
              <Form.Item label="MR 설명" name="description">
                <Input.TextArea rows={4} placeholder="변경 내용, 영향 범위, 리뷰 포인트를 입력해 주세요." />
              </Form.Item>
          </FormSection>

          <Divider />

          <FormSection
            title="Jira 연계"
            description="MR과 연결할 Jira 업무를 불러올 수 있어요."
          >
              <Card size="small">
                <Row align="middle" gutter={[16, 16]}>
                  <Col flex="auto">
                    <Text strong>Jira 업무 불러오기</Text>
                    <br />
                    <Text type="secondary">연결 가능한 Ticket을 조회한 뒤 MR 설명과 검토 항목에 반영할게요.</Text>
                  </Col>
                  <Col>
                    <Button>Jira 불러오기</Button>
                  </Col>
                </Row>
              </Card>
          </FormSection>

          <Divider />

          <FormSection
            title="승인자 / 리뷰어"
            description="MR 검토를 요청할 리뷰어와 역할을 지정할 수 있어요."
          >
              <Row gutter={8}>
                <Col flex="auto">
                  <Form.Item name="reviewer">
                    <Select
                      mode="multiple"
                      placeholder="사용자 검색 및 선택"
                      options={['Min', 'Han', 'Park', 'Seo'].map((value) => ({ value, label: value }))}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={5}>
                  <Form.Item name="assigneeRole">
                    <Select placeholder="역할 선택" options={['Reviewer', 'Approver'].map((value) => ({ value, label: value }))} />
                  </Form.Item>
                </Col>
              </Row>
              <Button>추가</Button>
          </FormSection>

          <Divider />

          <FormSection
            title="생성 옵션"
            description="MR 생성 후 처리 방식을 선택해 주세요."
          >
              <Row gutter={[12, 12]}>
                <OptionCheckbox name="squash" title="MR 생성 후 Pipeline 자동 실행" description="Build, Test, Security Scan을 순차적으로 실행할 수 있어요." />
                <OptionCheckbox name="deleteSource" title="Merge 후 Source Branch 삭제" description="병합 완료 후 작업 Branch를 자동 정리할 수 있어요." />
                <OptionCheckbox name="notifyReviewer" title="리뷰어에게 알림 전송" description="Mattermost 또는 Email로 리뷰 요청 알림을 보낼 수 있어요." />
                <OptionCheckbox name="draft" title="Draft로 생성" description="리뷰 요청 전 임시 MR로 생성할 수 있어요." />
              </Row>
          </FormSection>

          <Divider />

          <Flex justify="flex-end" gap={8} wrap>
            <Button onClick={() => navigate(`/repositories/${selectedRepositoryId ?? repositoryId ?? ''}/merge-requests`)}>취소</Button>
            <Button type="primary" htmlType="submit">MR 생성</Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  )
}

function BranchSelect({ disabled, onBlockedClick, ...selectProps }) {
  return (
    <Tooltip title={disabled ? '저장소를 먼저 선택해 주세요.' : null}>
      <div
        onMouseDown={(event) => {
          if (!disabled) return
          event.preventDefault()
          onBlockedClick()
        }}
      >
        <Select disabled={disabled} {...selectProps} />
      </div>
    </Tooltip>
  )
}

function MergeConditionCard({ repository, mergeConditions }) {
  return (
    <Card size="small" className="merge-condition-card">
      <Flex vertical gap={4}>
        <Text strong>[Merge 조건]</Text>
        <Text>선택한 {repository.name} 저장소는 다음과 같은 Merge 조건이 필요해요.</Text>
        {mergeConditions.map((condition) => (
          <Text key={condition}>· {condition}</Text>
        ))}
      </Flex>
    </Card>
  )
}

function CommitCard({ commit, onCopy }) {
  return (
    <Card size="small">
      <Row align="middle" gutter={12} wrap={false}>
        <Col><Avatar>{commit.author?.slice(0, 1) ?? 'C'}</Avatar></Col>
        <Col flex="auto">
          <Text strong>{commit.message}</Text>
          <br />
          <Text type="secondary">작성자: {commit.author} · {commit.timeText}</Text>
        </Col>
        <Col>
          <Button icon={<CopyOutlined />} onClick={() => onCopy(commit.sha)}>
            {commit.sha}
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

function BranchValidationAlert({ hasSameBranch, hasDuplicateMr, branchComparison }) {
  if (hasSameBranch) {
    return <Alert type="warning" showIcon title="Source Branch와 Target Branch는 서로 달라야 해요." />
  }
  if (hasDuplicateMr) {
    return <Alert type="warning" showIcon title="동일한 Source/Target Branch 조합의 MR이 이미 있어요." />
  }
  if (branchComparison?.hasDiff === false) {
    return <Alert type="warning" showIcon title="선택한 Branch 사이에 비교 가능한 변경사항이 없어요." />
  }
  if (branchComparison?.hasDiff) {
    return <Alert type="success" showIcon title={`선택한 Branch 사이에 비교 가능한 변경사항 ${branchComparison.diffCount}건이 있어요.`} />
  }
  return null
}

function OptionCheckbox({ name, title, description }) {
  return (
    <Col xs={24} md={12}>
      <Card size="small">
        <Row align="middle" gutter={12} wrap={false}>
          <Col flex="auto">
            <Text strong>{title}</Text>
            <br />
            <Text type="secondary">{description}</Text>
          </Col>
          <Col>
            <Form.Item name={name} valuePropName="checked" noStyle>
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}
