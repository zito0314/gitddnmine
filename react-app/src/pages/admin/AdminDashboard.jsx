import { ApiOutlined, SafetyCertificateOutlined, TeamOutlined } from '../../components/icons'
import { Card, Col, Flex, Row, Space, Typography } from 'antd'
import { getAdminAuditLogs, getAdminSummary, getDeploymentPolicies, getMrApprovalPolicies, getRepositoryPolicies, getSecurityPolicies } from '../../api/admin'
import { PageHeader, StatusTag, SummaryCard } from '../../components/common'
import { UI_TEXT } from '../../constants'
import { AuditList } from './AdminShared'

const { Text } = Typography

export default function AdminDashboard() {
  const summary = getAdminSummary()
  const overview = [
    { title: 'Repository 정책', items: getRepositoryPolicies() },
    { title: 'MR 정책', items: getMrApprovalPolicies() },
    { title: 'Pipeline / 보안 정책', items: getSecurityPolicies() },
    { title: '운영이관 정책', items: getDeploymentPolicies() },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title={UI_TEXT.adminPages.admin.title} description={UI_TEXT.adminPages.admin.description} />

      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.adminSummary.organizations} value={summary.organizations} icon={<TeamOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.adminSummary.users} value={summary.users} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.adminSummary.activePolicies} value={summary.activePolicies} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.adminSummary.policyViolations} value={summary.policyViolations} tone="danger" icon={<SafetyCertificateOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.adminSummary.pendingRequests} value={summary.pendingRequests} tone="warning" />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.adminSummary.integrationStatus} value={summary.integrationStatus} icon={<ApiOutlined />} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title={UI_TEXT.sections.governanceOverview}>
            <Row gutter={[12, 12]}>
              {overview.map((item) => (
                <Col key={item.title} xs={24} md={12}>
                  <Card size="small" title={item.title}>
                    <Flex align="center" gap={8}>
                      <Text>{item.items.length}{UI_TEXT.adminSummary.activeRules}</Text>
                      <StatusTag status="passed" label={UI_TEXT.adminSummary.healthy} />
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col xs={24} xl={10}>
          <Card title={UI_TEXT.sections.recentAdminAudit}>
            <AuditList logs={getAdminAuditLogs()} />
          </Card>
        </Col>
        <Col xs={24}>
          <Card title={UI_TEXT.sections.policyHealth}>
            <Flex gap={8} wrap="wrap">
              <StatusTag status="passed" label="Repository" />
              <StatusTag status="passed" label="MR" />
              <StatusTag status="warning" label="Security exceptions" />
              <StatusTag status="passed" label={UI_TEXT.navigation.deploymentTransfer} />
            </Flex>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
