import { Button, Card, Col, Descriptions, Row, Space, Table, Tag, Timeline, Typography } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getBranchProtectionPolicyHistories,
  getBranchProtectionTemplateById,
  getBranchProtectionTemplateSummary,
  getRepositoriesByBranchProtectionTemplate,
} from '../../api/branchProtectionPolicies'
import { PageHeader, StatusTag, SummaryCard } from '../../components/common'

const { Text, Title } = Typography

export default function BranchProtectionTemplateDetail() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const template = getBranchProtectionTemplateById(templateId)
  const summary = getBranchProtectionTemplateSummary(templateId)
  const repositories = getRepositoriesByBranchProtectionTemplate(templateId).slice(0, 5)
  const histories = getBranchProtectionPolicyHistories(templateId).slice(0, 5)

  if (!template) return <Card><Title level={3}>Branch protection template not found</Title></Card>

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        eyebrow="Branch Protection Template"
        title={template.name}
        description={template.description}
        actions={[
          <Button key="edit" type="primary" onClick={() => navigate(`/admin/repository-policy/branch-protection-templates/${template.id}/edit`)}>Edit Template</Button>,
          <Button key="repos" onClick={() => navigate(`/admin/repository-policy/branch-protection-templates/${template.id}/repositories`)}>View Applied Repositories</Button>,
          <Button key="history" onClick={() => navigate('/admin/repository-policy/branch-protection-history')}>View Change History</Button>,
        ]}
      />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} md={6}><SummaryCard title="Applied Repositories" value={summary.appliedRepositories} /></Col>
        <Col xs={24} md={6}><SummaryCard title="Minimum Approvals" value={summary.minimumApprovals} tone="warning" /></Col>
        <Col xs={24} md={6}><SummaryCard title="Required Gates" value={summary.requiredGates.length} /></Col>
        <Col xs={24} md={6}><SummaryCard title="Exception Targets" value={summary.exceptionTargets.length} /></Col>
      </Row>
      <Card>
        <Descriptions column={{ xs: 1, md: 3 }} bordered>
          <Descriptions.Item label="Version">{template.version}</Descriptions.Item>
          <Descriptions.Item label="Status"><StatusTag status={template.status} /></Descriptions.Item>
          <Descriptions.Item label="Updated at">{template.updatedAt}</Descriptions.Item>
          <Descriptions.Item label="Target branches" span={3}><Space wrap>{template.targetBranches.map((branch) => <Tag key={branch}>{branch}</Tag>)}</Space></Descriptions.Item>
        </Descriptions>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          <Card title="Policy Summary">
            <Space orientation="vertical" size={8}>
              {template.summary.map((item) => <Text key={item}>{item}</Text>)}
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={14}>
          <Card title="Policy Settings">
            <Descriptions column={{ xs: 1, md: 2 }} bordered size="small">
              <Descriptions.Item label="브랜치 생성 제한">{template.restrictions.createBranchRestricted ? 'Yes' : 'No'}</Descriptions.Item>
              <Descriptions.Item label="직접 push 제한">{template.restrictions.pushRestricted ? 'Yes' : 'No'}</Descriptions.Item>
              <Descriptions.Item label="브랜치 삭제 제한">{template.restrictions.deleteBranchRestricted ? 'Yes' : 'No'}</Descriptions.Item>
              <Descriptions.Item label="Force push 차단">{template.restrictions.forcePushBlocked ? 'Yes' : 'No'}</Descriptions.Item>
              <Descriptions.Item label="MR 필수">{template.mergeRules.mergeRequestRequired ? 'Yes' : 'No'}</Descriptions.Item>
              <Descriptions.Item label="최소 승인자">{template.mergeRules.minimumApprovals}</Descriptions.Item>
              <Descriptions.Item label="Pipeline 성공 필수">{template.mergeRules.pipelineSuccessRequired ? 'Yes' : 'No'}</Descriptions.Item>
              <Descriptions.Item label="보안 점검 필수">{template.mergeRules.securityCheckRequired ? 'Yes' : 'No'}</Descriptions.Item>
              <Descriptions.Item label="운영이관 승인 필수">{template.mergeRules.deploymentApprovalRequired ? 'Yes' : 'No'}</Descriptions.Item>
              <Descriptions.Item label="예외 권한 대상">{template.exceptionAllowedTargets.join(', ')}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Applied Repositories Preview">
            <Table
              rowKey="id"
              dataSource={repositories}
              pagination={false}
              size="small"
              columns={[
                {
                  title: 'Repository',
                  dataIndex: 'name',
                  render: (name, repository) => <Link to={`/repositories/${repository.id}`}>{name}</Link>,
                },
                { title: 'Group', dataIndex: 'group', render: (group) => <Text type="secondary">{group}</Text> },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Policy History">
            <Timeline
              items={histories.map((history) => ({
                children: (
                  <Space orientation="vertical" size={2}>
                    <Text strong>{history.message}</Text>
                    <Text type="secondary">{history.actor} · {history.createdAt}</Text>
                  </Space>
                ),
              }))}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
