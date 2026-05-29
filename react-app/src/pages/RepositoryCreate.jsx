import { App as AntdApp, Alert, Button, Card, Divider, Empty, Flex, Form, Input, Result, Select, Space, Tag, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEnabledRepositoryProjectTemplates } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { FormSection, PageHeader } from '../components/common'

const { Text } = Typography

const REPOSITORY_NAME_PATTERN = /^[a-z0-9_.+-]+$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RepositoryCreate() {
  const navigate = useNavigate()
  const auth = useAuth()
  const { message } = AntdApp.useApp()
  const [form] = Form.useForm()
  const templates = useMemo(() => getEnabledRepositoryProjectTemplates(), [])
  const [selectedTemplateId, setSelectedTemplateId] = useState(null)
  const [memberEmail, setMemberEmail] = useState('')
  const [members, setMembers] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const selectedTemplate = templates.find((template) => template.id === selectedTemplateId)
  const canCreateRepositoryRequest = auth.isAdmin || auth.isInternalUser

  const addMember = () => {
    const email = memberEmail.trim()
    if (!email) return
    if (!EMAIL_PATTERN.test(email)) {
      message.warning('올바른 이메일 형식으로 입력해 주세요.')
      return
    }
    if (members.some((member) => member.email.toLowerCase() === email.toLowerCase())) {
      message.warning('이미 추가된 멤버예요.')
      return
    }

    const nextMembers = [...members, { email, role: 'developer' }]
    setMembers(nextMembers)
    form.setFieldValue('members', nextMembers)
    setMemberEmail('')
  }

  const removeMember = (email) => {
    const nextMembers = members.filter((member) => member.email !== email)
    setMembers(nextMembers)
    form.setFieldValue('members', nextMembers)
  }

  const submit = () => {
    setSubmitted(true)
  }

  if (!canCreateRepositoryRequest) {
    return (
      <Result
        status="403"
        title="접근 권한이 없습니다."
        subTitle="저장소 생성 요청은 Admin 또는 Internal User만 사용할 수 있어요."
        extra={<Button type="primary" onClick={() => navigate('/repositories')}>저장소 목록으로 이동</Button>}
      />
    )
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="저장소 생성 요청되었습니다."
        subTitle={(
          <>
            요청은 관리자 검토 후에 승인 상태로 변경됩니다.
            <br />
            승인 완료 시 저장소 목록에서 상세화면으로 진입할 수 있습니다.
          </>
        )}
        extra={(
          <Button type="primary" onClick={() => navigate('/repositories')}>
            저장소 목록으로 이동하기
          </Button>
        )}
      />
    )
  }

  return (
    <Flex vertical gap={24} className="repository-request-page">
      <PageHeader
        title="저장소 생성 요청"
        description="신규 저장소는 조직 정책에 따라 관리자 승인 후 생성돼요. 요청 정보와 저장소 이름, 템플릿, 멤버 정보를 입력한 뒤 요청을 제출해주세요."
      />

      <Alert
        type="info"
        showIcon
        title="저장소 생성 요청 안내"
        description={(
          <Flex vertical gap={12}>
            <Flex vertical gap={4}>
              <Text strong>[요청 처리 흐름]</Text>
              <Text type="secondary">요청자가 저장소 정보를 입력하고 생성 요청을 제출합니다.</Text>
              <Text type="secondary">관리자가 요청 내용, 저장소명, 템플릿을 검토합니다.</Text>
              <Text type="secondary">승인 완료 후, 저장소가 생성되고 멤버에게 접근 권한이 부여됩니다.</Text>
            </Flex>
            <Flex vertical gap={4}>
              <Text strong>[권장 입력 기준]</Text>
              <Text type="secondary">
                저장소명은 서비스나 모듈의 역할이 드러나도록 작성하는 것을 권장합니다.
                예: mobile-banking-api, common-ui-components
              </Text>
            </Flex>
          </Flex>
        )}
      />

      <Form
        form={form}
        layout="vertical"
        className="repository-request-form"
        initialValues={{ members: [] }}
        onFinish={submit}
      >
        <Flex vertical gap={24}>
          <FormSection
            title="요청 정보"
            description="저장소 생성 목적과 사용 용도를 간단히 작성해주세요. 요청 내용을 바탕으로 관리자가 승인 여부를 검토해요."
          >
            <Form.Item
              label="요청 제목"
              name="requestTitle"
              rules={[{ required: true, message: '요청 제목을 입력해 주세요.' }]}
            >
              <Input placeholder="요청 제목을 입력해 주세요." />
            </Form.Item>
            <Form.Item
              label="요청 내용"
              name="requestContent"
              rules={[{ required: true, message: '요청 내용을 입력해 주세요.' }]}
            >
              <Input.TextArea rows={4} placeholder="요청 내용을 입력해 주세요." />
            </Form.Item>
          </FormSection>

          <Divider />

          <FormSection
            title="기본 정보"
            description="프로젝트 목적이 잘 드러나도록 저장소 정보를 작성해주세요. 저장소 이름은 영문 소문자, 숫자, 밑줄(_), 마침표(.), 더하기(+), 대시(-)를 사용할 수 있어요."
          >
            <Form.Item
              label="저장소 이름"
              name="repositoryName"
              help="영문 소문자, 숫자, _, ., +, -만 사용할 수 있고 공백은 사용할 수 없어요."
              rules={[
                { required: true, message: '저장소 이름을 입력해 주세요.' },
                { max: 255, message: '저장소 이름은 최대 255자까지 입력할 수 있어요.' },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve()
                    if (/\s/.test(value)) return Promise.reject(new Error('저장소 이름에는 공백을 사용할 수 없어요.'))
                    if (!REPOSITORY_NAME_PATTERN.test(value)) return Promise.reject(new Error('사용할 수 없는 문자가 포함되어 있어요.'))
                    return Promise.resolve()
                  },
                },
              ]}
            >
              <Input maxLength={255} placeholder="저장소 이름을 입력해 주세요." />
            </Form.Item>
            <Form.Item label="저장소 설명" name="repositoryDescription">
              <Input placeholder="저장소 설명을 간단히 입력해 주세요." />
            </Form.Item>
          </FormSection>

          <Divider />

          <FormSection
            title="멤버"
            description="저장소에 접근할 수 있는 멤버를 설정할 수 있어요."
          >
            <Space.Compact block>
              <Input
                placeholder="example@gmail.com"
                value={memberEmail}
                onChange={(event) => setMemberEmail(event.target.value)}
                onPressEnter={(event) => {
                  event.preventDefault()
                  addMember()
                }}
              />
              <Button onClick={addMember}>멤버 추가</Button>
            </Space.Compact>
            <Form.Item name="members" hidden>
              <Input />
            </Form.Item>
            {members.length > 0 ? (
              <Flex wrap gap={8}>
                {members.map((member) => (
                  <Tag key={member.email} closable onClose={() => removeMember(member.email)}>
                    {member.email}
                  </Tag>
                ))}
              </Flex>
            ) : null}
          </FormSection>

          <Divider />

          <FormSection
            title="프로젝트 템플릿"
            description="선택한 템플릿을 기반으로 저장소 정책과 기본 프로젝트 구조가 자동으로 구성돼요."
          >
            <Form.Item
              label="프로젝트 템플릿 선택"
              name="projectTemplateId"
              rules={[{ required: true, message: '프로젝트 템플릿을 선택해 주세요.' }]}
            >
              <Select
                placeholder="프로젝트 템플릿 선택"
                options={templates.map((template) => ({ value: template.id, label: template.name }))}
                onChange={setSelectedTemplateId}
              />
            </Form.Item>
            {selectedTemplate ? (
              <Card size="small" title={selectedTemplate.name} className="template-preview-card">
                <Flex vertical gap={8}>
                  <Text>언어: {selectedTemplate.language}</Text>
                  <Text>프레임워크: {selectedTemplate.framework}</Text>
                  <Text>유형: {selectedTemplate.type}</Text>
                  <Text>브랜치 전략: {selectedTemplate.branchStrategy}</Text>
                  <Flex wrap gap={8}>
                    <Text>기본 정책:</Text>
                    {selectedTemplate.defaultPolicies.map((policy) => <Tag key={policy}>{policy}</Tag>)}
                  </Flex>
                </Flex>
              </Card>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="프로젝트 템플릿을 선택하면 적용될 기본 정책을 확인할 수 있어요."
              />
            )}
          </FormSection>

          <Divider />

          <Flex justify="flex-end" gap={8} wrap>
            <Button onClick={() => navigate('/repositories')}>취소</Button>
            <Button type="primary" htmlType="submit">요청 제출</Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  )
}
