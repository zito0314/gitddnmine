import { Space } from 'antd'
import { getRepositoryPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { DemoPolicyForm, PolicyTable } from './AdminShared'

export default function RepositoryPolicyAdmin() {
  const policies = getRepositoryPolicies()
  return <Space orientation="vertical" size={16} style={{ width: '100%' }}><PageHeader title="Repository Policy" description="Repository 생성, 네이밍, 기본 브랜치, 보호 브랜치, Visibility, Template 정책을 관리합니다." /><DemoPolicyForm title="Repository creation policy" policies={policies} /><PolicyTable data={policies} /></Space>
}
