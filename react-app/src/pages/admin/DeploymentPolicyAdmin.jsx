import { Card, Space, Tag } from 'antd'
import { getDeploymentPolicies } from '../../api/admin'
import { PageHeader } from '../../components/common'
import { DemoPolicyForm, PolicyTable } from './AdminShared'

export default function DeploymentPolicyAdmin() {
  const policies = getDeploymentPolicies()
  return <Space orientation="vertical" size={16} style={{ width: '100%' }}><PageHeader title="Deployment Policy" description="운영이관 승인자, 배포 가능 시간대, 금지 시간대, 환경별 승인 조건을 관리합니다." /><Card title="Environment gates"><Tag color="blue">dev</Tag><Tag color="gold">staging</Tag><Tag color="red">production</Tag></Card><DemoPolicyForm title="Deployment governance rules" policies={policies} /><PolicyTable data={policies} /></Space>
}
