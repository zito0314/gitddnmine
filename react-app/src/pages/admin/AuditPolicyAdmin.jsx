import { Card, Space } from 'antd'
import { getAdminAuditLogs, getAuditPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { UI_TEXT } from '../../constants'
import { AuditList, DemoPolicyForm, PolicyTable } from './AdminShared'

export default function AuditPolicyAdmin() {
  const policies = getAuditPolicies()
  return <Space direction="vertical" size={16} style={{ width: '100%' }}><PageHeader title={UI_TEXT.adminNavigation.auditPolicy} description="Audit retention, Export policy, Risk event alert, Required log fields, Admin activity tracking을 관리합니다." /><DemoPolicyForm title="Audit retention and export" policies={policies} /><PolicyTable data={policies} /><Card title="Admin activity tracking"><AuditList logs={getAdminAuditLogs()} /></Card></Space>
}
