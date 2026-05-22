import { ApiOutlined, SafetyCertificateOutlined, TeamOutlined } from '@ant-design/icons'
import { Card, Col, List, Row, Space } from 'antd'
import { getAdminAuditLogs, getAdminSummary, getDeploymentPolicies, getMrApprovalPolicies, getRepositoryPolicies, getSecurityPolicies } from '../../api/admin'
import { PageHeader, StatusTag, SummaryCard } from '../../components/common'
import { UI_TEXT } from '../../constants'
import { AuditList } from './AdminShared'

export default function AdminDashboard() {
  const summary = getAdminSummary()
  const overview = [
    { title: 'Repository 정책', items: getRepositoryPolicies() },
    { title: 'MR 승인 정책', items: getMrApprovalPolicies() },
    { title: '보안 정책', items: getSecurityPolicies() },
    { title: '운영이관 정책', items: getDeploymentPolicies() },
  ]
  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title={UI_TEXT.adminPages.admin.title} description={UI_TEXT.adminPages.admin.description} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}><SummaryCard title={UI_TEXT.adminSummary.organizations} value={summary.organizations} icon={<TeamOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title={UI_TEXT.adminSummary.users} value={summary.users} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title={UI_TEXT.adminSummary.activePolicies} value={summary.activePolicies} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title={UI_TEXT.adminSummary.policyViolations} value={summary.policyViolations} tone="danger" icon={<SafetyCertificateOutlined />} /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title={UI_TEXT.adminSummary.pendingRequests} value={summary.pendingRequests} tone="warning" /></Col>
        <Col xs={24} sm={12} xl={4}><SummaryCard title={UI_TEXT.adminSummary.integrationStatus} value={summary.integrationStatus} icon={<ApiOutlined />} /></Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title={UI_TEXT.sections.governanceOverview}>
            <List grid={{ gutter: 12, xs: 1, md: 2 }} dataSource={overview} renderItem={(item) => <List.Item><Card size="small" title={item.title}>{item.items.length}{UI_TEXT.adminSummary.activeRules} <StatusTag status="passed" label={UI_TEXT.adminSummary.healthy} /></Card></List.Item>} />
          </Card>
        </Col>
        <Col xs={24} xl={10}><Card title={UI_TEXT.sections.recentAdminAudit}><AuditList logs={getAdminAuditLogs()} /></Card></Col>
        <Col xs={24}><Card title={UI_TEXT.sections.policyHealth}><StatusTag status="passed" label="Repository" /> <StatusTag status="passed" label="MR" /> <StatusTag status="warning" label="Security exceptions" /> <StatusTag status="passed" label={UI_TEXT.navigation.deploymentTransfer} /></Card></Col>
      </Row>
    </Space>
  )
}
