import { Button, Card, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getRepositoryPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { UI_TEXT } from '../../constants'
import { DemoPolicyForm, PolicyTable } from './AdminShared'

export default function RepositoryPolicyAdmin() {
  const navigate = useNavigate()
  const policies = getRepositoryPolicies()
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title={UI_TEXT.adminNavigation.repositoryPolicy} description="Repository 생성, 네이밍, 기본 브랜치, 보호 브랜치, Visibility, Template 정책을 관리합니다." />
      <Card title="Branch Protection Governance">
        <Space wrap>
          <Button type="primary" onClick={() => navigate('/admin/repository-policy/branch-protection-templates')}>Branch Protection Templates</Button>
          <Button onClick={() => navigate('/admin/repository-policy/branch-protection-requests')}>Exception Requests</Button>
          <Button onClick={() => navigate('/admin/repository-policy/branch-protection-history')}>Policy History</Button>
        </Space>
      </Card>
      <DemoPolicyForm title="Repository creation policy" policies={policies} />
      <PolicyTable data={policies} />
    </Space>
  )
}
