import { Card, Flex, Space, Switch, Typography } from 'antd'
import { getMrApprovalPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { UI_TEXT } from '../../constants'
import { DemoPolicyForm, PolicyTable } from './AdminShared'

const { Text } = Typography

export default function MrApprovalPolicyAdmin() {
  const policies = getMrApprovalPolicies()

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.adminNavigation.mrApprovalPolicy}
        description="Required approvals, reviewer rule, code owner, security approval, branch별 승인 조건을 관리해요."
      />
      <DemoPolicyForm title="승인 규칙" policies={policies} />
      <Card title="Emergency merge 예외">
        <Flex align="center" gap={8}>
          <Switch checked disabled />
          <Text>Owner + Audit reason 필수</Text>
        </Flex>
      </Card>
      <PolicyTable data={policies} />
    </Space>
  )
}
