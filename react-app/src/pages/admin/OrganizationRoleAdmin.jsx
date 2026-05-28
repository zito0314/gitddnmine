import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from '../../components/icons'
import { App as AntdApp, Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Space, Switch, Table, Tag, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { getOrganizations, getUsers } from '../../api/admin'
import { resetManagedOrganizations, saveManagedOrganizations } from '../../api/organizations'
import { PageHeader } from '../../components/common'
import { UI_TEXT } from '../../constants'

const { Text } = Typography

function makeOrganizationKey(label) {
  const key = String(label ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return key || `organization-${Date.now()}`
}

const roleModel = [
  {
    role: UI_TEXT.roles.admin,
    description: '전체 시스템, 정책, 감사, 연동 설정 관리',
    userPlatform: 'Full access',
    adminConsole: 'Full access',
    repositoryScope: 'All repositories',
    security: 'Full',
    deployment: 'Full',
    audit: 'Full',
  },
  {
    role: UI_TEXT.roles.internal,
    description: '내부 개발 업무, MR, Pipeline, Security, Deployment 요청',
    userPlatform: 'User platform',
    adminConsole: 'No access',
    repositoryScope: 'Internal repositories',
    security: 'Read',
    deployment: 'Read / Request',
    audit: 'Read',
  },
  {
    role: UI_TEXT.roles.external,
    description: '허용된 Repository 범위 내 개발/리뷰 참여',
    userPlatform: 'Limited access',
    adminConsole: 'No access',
    repositoryScope: 'Allowed repositories only',
    security: 'No access',
    deployment: 'No access',
    audit: 'No access',
  },
]

export default function OrganizationRoleAdmin() {
  const { message } = AntdApp.useApp()
  const [form] = Form.useForm()
  const [organizations, setOrganizations] = useState(() => getOrganizations())
  const [editingOrganization, setEditingOrganization] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const activeOrganizations = useMemo(
    () => organizations.filter((organization) => organization.active !== false),
    [organizations],
  )

  const openCreateModal = () => {
    setEditingOrganization(null)
    form.setFieldsValue({ key: '', label: '', description: '', active: true })
    setModalOpen(true)
  }

  const openEditModal = (organization) => {
    setEditingOrganization(organization)
    form.setFieldsValue({
      key: organization.key,
      label: organization.label,
      description: organization.description,
      active: organization.active !== false,
    })
    setModalOpen(true)
  }

  const persistOrganizations = (nextOrganizations, successMessage) => {
    const savedOrganizations = saveManagedOrganizations(nextOrganizations)
    setOrganizations(savedOrganizations)
    message.success(successMessage)
  }

  const handleSubmit = async () => {
    let values

    try {
      values = await form.validateFields()
    } catch {
      return
    }

    const organizationKey = makeOrganizationKey(values.key || values.label)
    const nextOrganization = {
      key: organizationKey,
      label: values.label.trim(),
      description: values.description?.trim() ?? '',
      active: values.active !== false,
    }
    const duplicateOrganization = organizations.find(
      (organization) =>
        organization.key === nextOrganization.key && organization.key !== editingOrganization?.key,
    )

    if (duplicateOrganization) {
      form.setFields([{ name: 'key', errors: ['이미 사용 중인 조직 키입니다.'] }])
      return
    }

    const nextOrganizations = editingOrganization
      ? organizations.map((organization) =>
          organization.key === editingOrganization.key ? nextOrganization : organization,
        )
      : [...organizations, nextOrganization]

    persistOrganizations(nextOrganizations, editingOrganization ? '조직 정보가 수정되었습니다.' : '조직이 등록되었습니다.')
    setModalOpen(false)
  }

  const handleActiveChange = (targetKey, active) => {
    if (!active && activeOrganizations.length <= 1) {
      message.warning('GNB에 표시할 조직이 최소 1개는 필요합니다.')
      return
    }

    const nextOrganizations = organizations.map((organization) =>
      organization.key === targetKey ? { ...organization, active } : organization,
    )

    persistOrganizations(nextOrganizations, active ? 'GNB 조직 선택에 표시됩니다.' : 'GNB 조직 선택에서 숨김 처리되었습니다.')
  }

  const handleRemove = (targetKey) => {
    const targetOrganization = organizations.find((organization) => organization.key === targetKey)

    if (targetOrganization?.active !== false && activeOrganizations.length <= 1) {
      message.warning('GNB에 표시할 조직이 최소 1개는 필요합니다.')
      return
    }

    persistOrganizations(
      organizations.filter((organization) => organization.key !== targetKey),
      '조직이 삭제되었습니다.',
    )
  }

  const handleReset = () => {
    const defaultOrganizations = resetManagedOrganizations()
    setOrganizations(defaultOrganizations)
    message.success('기본 조직 목록으로 복원되었습니다.')
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.adminNavigation.organizationRoles}
        description="조직, 사용자, 팀, Role mapping, GitLab role mapping, 화면 접근 권한을 관리해요."
      />
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card
            title="Organizations"
            extra={
              <Space>
                <Button icon={<ReloadOutlined />} onClick={handleReset}>
                  기본값 복원
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
                  조직 등록
                </Button>
              </Space>
            }
          >
            <Table
              rowKey="key"
              dataSource={organizations}
              pagination={false}
              columns={[
                { title: '조직명', dataIndex: 'label', render: (value) => <Text strong>{value}</Text> },
                { title: '조직 키', dataIndex: 'key' },
                {
                  title: '설명',
                  dataIndex: 'description',
                  render: (value) => value || <Text type="secondary">설명 없음</Text>,
                },
                {
                  title: 'GNB 표시',
                  dataIndex: 'active',
                  width: 120,
                  render: (active, record) => (
                    <Switch checked={active !== false} onChange={(checked) => handleActiveChange(record.key, checked)} />
                  ),
                },
                {
                  title: '관리',
                  key: 'actions',
                  width: 150,
                  render: (_, record) => (
                    <Space>
                      <Button type="text" icon={<EditOutlined />} onClick={() => openEditModal(record)} />
                      <Popconfirm
                        title="조직을 삭제할까요?"
                        description="삭제하면 GNB 조직 선택에서도 제거됩니다."
                        okText="삭제"
                        cancelText="취소"
                        onConfirm={() => handleRemove(record.key)}
                      >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </Space>
                  ),
                },
              ]}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="GNB organization selector">
            <Table
              rowKey="key"
              size="small"
              dataSource={activeOrganizations}
              pagination={false}
              columns={[
                { title: '조직명', dataIndex: 'label', render: (value) => <Text strong>{value}</Text> },
                { title: '조직 키', dataIndex: 'key' },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Users / Teams">
            <Table
              rowKey="id"
              size="small"
              dataSource={getUsers().slice(0, 8)}
              pagination={false}
              columns={[
                { title: '이름', dataIndex: 'name', render: (value) => <Text>{value}</Text> },
                { title: '역할', dataIndex: 'role', render: (value) => <Tag>{value}</Tag> },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Role model">
            <Space wrap>{roleModel.map((role) => <Tag key={role.role} color="blue">{role.role}</Tag>)}</Space>
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="Role mapping">
            <Table
              rowKey="role"
              pagination={false}
              dataSource={roleModel}
              columns={[
                { title: 'Role', dataIndex: 'role', render: (value) => <Text strong>{value}</Text> },
                { title: 'Description', dataIndex: 'description' },
                { title: 'User Platform Access', dataIndex: 'userPlatform' },
                { title: 'Admin Console Access', dataIndex: 'adminConsole' },
                { title: 'Repository Scope', dataIndex: 'repositoryScope' },
                { title: 'Security Access', dataIndex: 'security' },
                { title: 'Deployment Access', dataIndex: 'deployment' },
                { title: 'Audit Access', dataIndex: 'audit' },
                { title: 'Editable', key: 'editable', render: () => <Switch disabled checked={false} /> },
              ]}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title={editingOrganization ? '조직 수정' : '조직 등록'}
        open={modalOpen}
        okText={editingOrganization ? '수정' : '등록'}
        cancelText="취소"
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            label="조직명"
            name="label"
            rules={[{ required: true, message: '조직명을 입력해 주세요.' }]}
          >
            <Input placeholder="예: Shinhan Bank" />
          </Form.Item>
          <Form.Item
            label="조직 키"
            name="key"
            extra="비워두면 조직명 기준으로 자동 생성됩니다. 저장소 필터와 선택값에 사용됩니다."
          >
            <Input placeholder="예: shinhan-bank" disabled={Boolean(editingOrganization)} />
          </Form.Item>
          <Form.Item label="설명" name="description">
            <Input.TextArea rows={3} placeholder="조직의 범위나 용도를 입력해 주세요." />
          </Form.Item>
          <Form.Item label="GNB 조직 선택에 표시" name="active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}
