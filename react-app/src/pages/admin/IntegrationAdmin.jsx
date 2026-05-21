import { Card, Col, Row, Space, Typography } from 'antd'
import { getIntegrations } from '../../api/admin'
import { PageHeader, StatusTag } from '../../components/common'

const { Text } = Typography
export default function IntegrationAdmin() {
  return <Space orientation="vertical" size={16} style={{ width: '100%' }}><PageHeader title="Integration" description="GitLab, Mattermost, Jira/ITBPI, Security scanner, Nexus, SSO/LDAP 연결 상태를 확인합니다." /><Row gutter={[16, 16]}>{getIntegrations().map((item) => <Col key={item.id} xs={24} md={12} xl={8}><Card title={item.name}><Space orientation="vertical"><StatusTag status={item.status === 'connected' ? 'passed' : 'warning'} label={item.status} /><Text>Owner: {item.owner}</Text><Text type="secondary">Last sync: {item.lastSync}</Text></Space></Card></Col>)}</Row></Space>
}
