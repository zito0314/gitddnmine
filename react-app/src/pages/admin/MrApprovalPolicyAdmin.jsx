import { Card, Space, Switch } from 'antd'
import { getMrApprovalPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { UI_TEXT } from '../../constants'
import { DemoPolicyForm, PolicyTable } from './AdminShared'

export default function MrApprovalPolicyAdmin() {
  const policies = getMrApprovalPolicies()
  return <Space direction="vertical" size={16} style={{ width: '100%' }}><PageHeader title={UI_TEXT.adminNavigation.mrApprovalPolicy} description="Required approvals, reviewer rule, code owner, security approval, branch별 승인 조건을 관리합니다." /><DemoPolicyForm title="Approval rules" policies={policies} /><Card title="Emergency merge exception"><Switch checked disabled /> Owner + Audit reason required</Card><PolicyTable data={policies} /></Space>
}
