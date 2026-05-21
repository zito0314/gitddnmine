import { ApiOutlined, SafetyCertificateOutlined, TeamOutlined } from '@ant-design/icons'
import { Card, Col, List, Row, Space } from 'antd'
import { getAdminAuditLogs, getAdminSummary, getDeploymentPolicies, getMrApprovalPolicies, getRepositoryPolicies, getSecurityPolicies } from '../../api/admin'
import { PageHeader, StatusTag, SummaryCard } from '../../components/common'
import { PAGE_TEXT } from '../../constants'
import { AuditList } from './AdminShared'

export default function AdminDashboard() {
  const summary = getAdminSummary()
  const overview = [
    { title: 'Repository Policy', items: getRepositoryPolicies() },
    { title: 'MR Approval Policy', items: getMrApprovalPolicies() },
    { title: 'Security Policy', items: getSecurityPolicies() },
    { title: 'Deployment Policy', items: getDeploymentPolicies() },
  ]
  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title={PAGE_TEXT.admin.title} description={PAGE_TEXT.admin.description} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Organizations" value={summary.organizations} icon={<TeamOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Users" value={summary.users} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Active Policies" value={summary.activePolicies} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Policy Violations" value={summary.policyViolations} tone="danger" icon={<SafetyCertificateOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Pending Requests" value={summary.pendingRequests} tone="warning" /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title="Integration Status" value={summary.integrationStatus} icon={<ApiOutlined />} /></Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title="Governance Overview">
            <List grid={{ gutter: 12, xs: 1, md: 2 }} dataSource={overview} renderItem={(item) => <List.Item><Card size="small" title={item.title}>{item.items.length} active rules <StatusTag status="passed" label="Healthy" /></Card></List.Item>} />
          </Card>
        </Col>
        <Col xs={24} xl={10}><Card title="Recent Admin Audit"><AuditList logs={getAdminAuditLogs()} /></Card></Col>
        <Col xs={24}><Card title="Policy Health"><StatusTag status="passed" label="Repository" /> <StatusTag status="passed" label="MR" /> <StatusTag status="warning" label="Security exceptions" /> <StatusTag status="passed" label="Deployment" /></Card></Col>
      </Row>
    </Space>
  )
}
