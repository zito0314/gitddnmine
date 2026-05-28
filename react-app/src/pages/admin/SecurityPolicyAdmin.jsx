import { Card, Flex, Space, Tag } from 'antd'
import { getSecurityPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { UI_TEXT } from '../../constants'
import { DemoPolicyForm, PolicyTable } from './AdminShared'

export default function SecurityPolicyAdmin() {
  const policies = getSecurityPolicies()

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.adminNavigation.securityPolicy}
        description="SAST, Secret Detection, Dependency Scan, License Policy, Critical/High block rule과 예외 승인을 관리해요."
      />
      <Card title="활성 스캐너">
        <Flex gap={8} wrap="wrap">
          <Tag>SAST</Tag>
          <Tag>Secret Detection</Tag>
          <Tag>Dependency Scan</Tag>
          <Tag>License Policy</Tag>
        </Flex>
      </Card>
      <DemoPolicyForm title="Security gate 정책" policies={policies} />
      <PolicyTable data={policies} />
    </Space>
  )
}
