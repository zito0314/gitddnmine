import { Card, Space, Typography } from 'antd'
import { getNotificationPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { DemoPolicyForm, PolicyTable } from './AdminShared'

const { Text } = Typography
export default function NotificationPolicyAdmin() {
  const policies = getNotificationPolicies()
  return <Space orientation="vertical" size={16} style={{ width: '100%' }}><PageHeader title="Notification Policy" description="Mattermost, Slack, Email 알림과 이벤트별 템플릿을 관리합니다." /><DemoPolicyForm title="Notification channels" policies={policies} /><Card title="Template preview"><Text strong>[gitddn] Deployment approved</Text><br /><Text type="secondary">Repository, MR, approver, scheduled window 정보가 포함됩니다.</Text></Card><PolicyTable data={policies} /></Space>
}
