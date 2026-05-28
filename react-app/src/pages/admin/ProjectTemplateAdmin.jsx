import { PlusOutlined } from '../../components/icons'
import {
  App as AntdApp,
  Button,
  Card,
  Drawer,
  Empty,
  Form,
  Input,
  InputNumber,
  Result,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd'
import { useMemo, useState } from 'react'
import { getRepositoryProjectTemplates } from '../../api/repositories'
import { useAuth } from '../../auth/AuthContext'
import { PageHeader } from '../../components/common'

const { Text } = Typography

const LANGUAGE_OPTIONS = ['Java', 'TypeScript', 'Python', 'Kotlin', 'Swift', '기타'].map((value) => ({ value, label: value }))
const TYPE_OPTIONS = ['Backend API', 'Frontend Web', 'Admin Dashboard', 'REST API', 'Batch Worker', 'Mobile App', 'SSR Web Service', 'Data Engineering', '기타'].map((value) => ({ value, label: value }))
const BRANCH_STRATEGY_OPTIONS = ['Git Flow', 'Github Flow', 'Develop/Main', 'Release Branch', 'Protected Main', '기타'].map((value) => ({ value, label: value }))
const POLICY_OPTIONS = [
  'Protected Branch',
  'CI/CD',
  'CODEOWNERS',
  'Preview Deploy',
  'PR Review Rule',
  'Staging Deploy',
  '권한 정책 포함',
  'Docker',
  'Swagger',
  'CI Pipeline',
  'Logging',
  'Monitoring',
  'Scheduler 설정',
  'QA Branch',
  'Firebase Deploy',
  'Fastlane',
  'TestFlight Deploy',
  'Vercel Deploy',
  'Preview Environment',
  'DAG Template',
].map((value) => ({ value, label: value }))

function makeTemplateId(name) {
  const normalized = String(name || 'project-template')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${normalized || 'project-template'}-${Date.now().toString(36)}`
}

function TemplatePreview({ template }) {
  if (!template) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="입력한 값으로 템플릿 미리보기가 표시돼요." />

  return (
    <Card size="small" title={template.name || '템플릿명'}>
      <Space direction="vertical" size={8}>
        <Text>언어: {template.language || '-'}</Text>
        <Text>프레임워크: {template.framework || '-'}</Text>
        <Text>유형: {template.type || '-'}</Text>
        <Text>브랜치 전략: {template.branchStrategy || '-'}</Text>
        <Space wrap>
          <Text>기본 정책:</Text>
          {(template.defaultPolicies || []).length > 0
            ? template.defaultPolicies.map((policy) => <Tag key={policy}>{policy}</Tag>)
            : <Text type="secondary">-</Text>}
        </Space>
      </Space>
    </Card>
  )
}

export default function ProjectTemplateAdmin() {
  const auth = useAuth()
  const { message, modal } = AntdApp.useApp()
  const [form] = Form.useForm()
  const [templates, setTemplates] = useState(() => getRepositoryProjectTemplates())
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState(null)
  const [type, setType] = useState(null)
  const [enabled, setEnabled] = useState(null)
  const previewValues = Form.useWatch([], form)

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase()

    return templates
      .filter((template) => {
        if (query && ![template.name, template.language, template.framework].join(' ').toLowerCase().includes(query)) return false
        if (language && template.language !== language) return false
        if (type && template.type !== type) return false
        if (enabled !== null && Boolean(template.enabled) !== enabled) return false
        return true
      })
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  }, [enabled, language, search, templates, type])

  const openDrawer = (template = null) => {
    setEditingTemplate(template)
    form.setFieldsValue(template ?? {
      enabled: true,
      defaultPolicies: [],
      order: templates.length + 1,
    })
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditingTemplate(null)
    form.resetFields()
  }

  const saveTemplate = (values) => {
    const nextTemplate = {
      id: editingTemplate?.id ?? makeTemplateId(values.name),
      updatedAtText: 'Updated just now',
      ...editingTemplate,
      ...values,
      enabled: values.enabled ?? true,
    }

    setTemplates((current) => {
      if (editingTemplate) {
        return current.map((template) => (template.id === editingTemplate.id ? nextTemplate : template))
      }

      return [...current, nextTemplate]
    })
    message.success('프로젝트 템플릿이 저장되었어요.')
    closeDrawer()
  }

  const duplicateTemplate = (template) => {
    const copiedTemplate = {
      ...template,
      id: makeTemplateId(`${template.name}-copy`),
      name: `${template.name} Copy`,
      order: templates.length + 1,
      updatedAtText: 'Updated just now',
    }

    setTemplates((current) => [...current, copiedTemplate])
    message.success('프로젝트 템플릿이 복제되었어요.')
  }

  const deleteTemplate = (template) => {
    modal.confirm({
      title: '이 템플릿을 삭제할까요?',
      content: '삭제한 템플릿은 저장소 생성 요청 화면에서 더 이상 선택할 수 없습니다.',
      okText: '삭제',
      okButtonProps: { danger: true },
      cancelText: '취소',
      onOk: () => {
        setTemplates((current) => current.filter((item) => item.id !== template.id))
        message.success('프로젝트 템플릿이 삭제되었어요.')
      },
    })
  }

  const toggleEnabled = (template, checked) => {
    setTemplates((current) =>
      current.map((item) =>
        item.id === template.id
          ? { ...item, enabled: checked, updatedAtText: 'Updated just now' }
          : item,
      ),
    )
  }

  if (!auth.isAdmin) {
    return (
      <Result
        status="403"
        title="접근 권한이 없습니다."
        subTitle="프로젝트 템플릿 관리는 Admin만 사용할 수 있어요."
      />
    )
  }

  const columns = [
    {
      title: '템플릿명',
      dataIndex: 'name',
      render: (value, record) => (
        <Button type="link" onClick={() => openDrawer(record)} style={{ paddingInline: 0 }}>
          {value}
        </Button>
      ),
    },
    {
      title: '언어',
      dataIndex: 'language',
      render: (value) => <Tag>{value}</Tag>,
    },
    { title: '프레임워크', dataIndex: 'framework' },
    { title: '유형', dataIndex: 'type' },
    { title: '브랜치 전략', dataIndex: 'branchStrategy' },
    {
      title: '기본 정책',
      dataIndex: 'defaultPolicies',
      render: (policies = []) => (
        <Space size={[4, 4]} wrap>
          {policies.map((policy) => <Tag key={policy}>{policy}</Tag>)}
        </Space>
      ),
    },
    {
      title: '사용 여부',
      dataIndex: 'enabled',
      render: (value, record) => (
        <Space>
          <Switch checked={value !== false} onChange={(checked) => toggleEnabled(record, checked)} />
          <Tag color={value !== false ? 'success' : 'default'}>{value !== false ? '사용' : '미사용'}</Tag>
        </Space>
      ),
    },
    { title: '수정일', dataIndex: 'updatedAtText' },
    {
      title: '관리',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => openDrawer(record)}>수정</Button>
          <Button size="small" onClick={() => duplicateTemplate(record)}>복제</Button>
          <Button size="small" danger onClick={() => deleteTemplate(record)}>삭제</Button>
        </Space>
      ),
    },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title="프로젝트 템플릿 관리"
        description="저장소 생성 요청 시 선택할 수 있는 프로젝트 템플릿을 관리해요. 템플릿에는 언어, 프레임워크, 프로젝트 유형, 브랜치 전략, 기본 정책이 포함됩니다."
        actions={[
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => openDrawer()}>
            템플릿 추가
          </Button>,
        ]}
      />

      <Card size="small">
        <Space wrap>
          <Input
            allowClear
            placeholder="템플릿명, 언어, 프레임워크 검색"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{ width: 280 }}
          />
          <Select
            allowClear
            placeholder="언어"
            options={LANGUAGE_OPTIONS.filter((option) => option.value !== '기타')}
            value={language}
            onChange={setLanguage}
            style={{ width: 140 }}
          />
          <Select
            allowClear
            placeholder="유형"
            options={TYPE_OPTIONS.filter((option) => option.value !== '기타')}
            value={type}
            onChange={setType}
            style={{ width: 180 }}
          />
          <Select
            allowClear
            placeholder="사용 여부"
            options={[
              { value: true, label: '사용' },
              { value: false, label: '미사용' },
            ]}
            value={enabled}
            onChange={(value) => setEnabled(value ?? null)}
            style={{ width: 130 }}
          />
        </Space>
      </Card>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredTemplates}
        locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="프로젝트 템플릿이 없습니다." /> }}
        pagination={{ pageSize: 10, showSizeChanger: false }}
      />

      <Drawer
        title={editingTemplate ? '프로젝트 템플릿 수정' : '프로젝트 템플릿 추가'}
        open={drawerOpen}
        onClose={closeDrawer}
        size="large"
        destroyOnHidden
        footer={(
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={closeDrawer}>취소</Button>
            <Button type="primary" onClick={() => form.submit()}>저장</Button>
          </Space>
        )}
      >
        <Form form={form} layout="vertical" onFinish={saveTemplate}>
          <Form.Item label="템플릿명" name="name" rules={[{ required: true, message: '템플릿명을 입력해 주세요.' }]}>
            <Input placeholder="예: Spring Boot API" />
          </Form.Item>
          <Form.Item label="설명" name="description">
            <Input.TextArea rows={3} placeholder="템플릿 설명을 입력해 주세요." />
          </Form.Item>
          <Form.Item label="언어" name="language" rules={[{ required: true, message: '언어를 선택해 주세요.' }]}>
            <Select options={LANGUAGE_OPTIONS} />
          </Form.Item>
          <Form.Item label="프레임워크" name="framework" rules={[{ required: true, message: '프레임워크를 입력해 주세요.' }]}>
            <Input placeholder="예: Spring Boot" />
          </Form.Item>
          <Form.Item label="유형" name="type" rules={[{ required: true, message: '유형을 선택해 주세요.' }]}>
            <Select options={TYPE_OPTIONS} />
          </Form.Item>
          <Form.Item label="브랜치 전략" name="branchStrategy" rules={[{ required: true, message: '브랜치 전략을 선택해 주세요.' }]}>
            <Select options={BRANCH_STRATEGY_OPTIONS} />
          </Form.Item>
          <Form.Item label="기본 정책" name="defaultPolicies" rules={[{ required: true, message: '기본 정책을 하나 이상 입력해 주세요.' }]}>
            <Select mode="tags" options={POLICY_OPTIONS} placeholder="정책명을 입력하거나 선택해 주세요." />
          </Form.Item>
          <Form.Item label="사용 여부" name="enabled" valuePropName="checked">
            <Switch checkedChildren="사용" unCheckedChildren="미사용" />
          </Form.Item>
          <Form.Item label="정렬 순서" name="order">
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <TemplatePreview template={previewValues} />
        </Form>
      </Drawer>
    </Space>
  )
}
