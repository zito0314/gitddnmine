import { Card, Col, List, Row, Space, Switch, Table, Tag, Typography } from 'antd'
import { getOrganizations, getUsers } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { UI_TEXT } from '../../constants'

const { Text } = Typography

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
  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title="Organization & Roles"
        description="조직, 사용자, 팀, Role mapping, GitLab role mapping, 화면 권한 mapping을 관리합니다."
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={8}>
          <Card title="Organizations">
            <List dataSource={getOrganizations()} renderItem={(item) => <List.Item>{item.label}</List.Item>} />
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Users / Teams">
            <List
              dataSource={getUsers().slice(0, 8)}
              renderItem={(user) => (
                <List.Item>
                  <Space>
                    <Text>{user.name}</Text>
                    <Tag>{user.role}</Tag>
                  </Space>
                </List.Item>
              )}
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
    </Space>
  )
}
