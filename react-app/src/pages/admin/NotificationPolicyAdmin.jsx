import { Button, Card, Flex, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getNotificationPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { UI_TEXT } from '../../constants'
import { DemoPolicyForm, PolicyTable } from './AdminShared'

const { Text } = Typography

export default function NotificationPolicyAdmin() {
  const navigate = useNavigate()
  const policies = getNotificationPolicies()

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.adminNavigation.notificationPolicy}
        description="Mattermost, Slack, Email 알림 채널과 이벤트별 알림 템플릿, 외부 연동 상태를 관리해요."
      />
      <Card
        title="외부 연동 설정"
        extra={
          <Button type="link" onClick={() => navigate('/admin/integration')}>
            연동 상태 보기
          </Button>
        }
      >
        <Text type="secondary">
          GitLab API, Webhook, SSO/LDAP, 내부 보안 점검 시스템 연동 상태를 확인할 수 있어요.
        </Text>
      </Card>
      <DemoPolicyForm title="알림 채널" policies={policies} />
      <Card title="알림 템플릿 미리보기">
        <Flex vertical gap={4}>
          <Text strong>[gitddn] Deployment approved</Text>
          <Text type="secondary">Repository, MR, approver, scheduled window 정보가 포함됩니다.</Text>
        </Flex>
      </Card>
      <PolicyTable data={policies} />
    </Space>
  )
}
