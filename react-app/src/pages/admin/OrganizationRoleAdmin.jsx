import { Card, Col, List, Row, Space, Tag } from 'antd'
import { getOrganizations, getRoleMappings, getRoles, getUsers } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { RoleMappingTable } from './AdminShared'

export default function OrganizationRoleAdmin() {
  return <Space orientation="vertical" size={16} style={{ width: '100%' }}><PageHeader title="Organization & Roles" description="조직, 사용자, 팀, Role mapping, GitLab role mapping, 화면 권한 mapping을 관리합니다." /><Row gutter={[16, 16]}><Col xs={24} xl={8}><Card title="Organizations"><List dataSource={getOrganizations()} renderItem={(item) => <List.Item>{item.label}</List.Item>} /></Card></Col><Col xs={24} xl={8}><Card title="Users / Teams"><List dataSource={getUsers().slice(0, 8)} renderItem={(user) => <List.Item>{user.name} <Tag>{user.role}</Tag></List.Item>} /></Card></Col><Col xs={24} xl={8}><Card title="Roles"><Space wrap>{getRoles().map((role) => <Tag key={role} color="blue">{role}</Tag>)}</Space></Card></Col><Col xs={24}><Card title="Role mapping"><RoleMappingTable mappings={getRoleMappings()} /></Card></Col></Row></Space>
}
