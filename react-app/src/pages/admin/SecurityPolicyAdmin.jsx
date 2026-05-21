import { Card, Space, Tag } from 'antd'
import { getSecurityPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { DemoPolicyForm, PolicyTable } from './AdminShared'

export default function SecurityPolicyAdmin() {
  const policies = getSecurityPolicies()
  return <Space orientation="vertical" size={16} style={{ width: '100%' }}><PageHeader title="Security Policy" description="SAST, Secret Detection, Dependency Scan, License Policy, Critical/High block rule과 예외 승인을 관리합니다." /><Card title="Scanners"><Tag>SAST</Tag><Tag>Secret Detection</Tag><Tag>Dependency Scan</Tag><Tag>License Policy</Tag></Card><DemoPolicyForm title="Security gate policy" policies={policies} /><PolicyTable data={policies} /></Space>
}
