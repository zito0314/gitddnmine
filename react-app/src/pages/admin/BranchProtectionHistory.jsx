import { Card, Input, Select, Space, Timeline, Typography } from 'antd'
import { useMemo, useState } from 'react'
import {
  getBranchProtectionPolicyHistories,
  getBranchProtectionTemplateById,
} from '../../api/branchProtectionPolicies'
import { PageHeader, StatusTag } from '../../components/common'
import { CodePreview } from '../../components/custom'

const { Text } = Typography

export default function BranchProtectionHistory() {
  const histories = getBranchProtectionPolicyHistories()
  const [search, setSearch] = useState('')
  const [action, setAction] = useState(null)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return histories.filter((history) => {
      const template = getBranchProtectionTemplateById(history.templateId)
      const text = [history.actor, history.action, template?.name, history.message].join(' ').toLowerCase()
      if (q && !text.includes(q)) return false
      if (action && history.action !== action) return false
      return true
    })
  }, [action, histories, search])

  return (
    <Space direction="vertical" size={16} className="page-stack">
      <PageHeader title="Branch Protection Policy History" description="정책 생성, 수정, 적용, 예외 처리 이력을 확인합니다." />
      <Card>
        <Space wrap className="filter-bar-spaced">
          <Input.Search placeholder="actor, action, template, message" value={search} onChange={(event) => setSearch(event.target.value)} className="filter-search-wide" />
          <Select allowClear placeholder="action" value={action} onChange={setAction} className="filter-select filter-select--md" options={[...new Set(histories.map((item) => item.action))].map((value) => ({ value, label: value }))} />
        </Space>
        <Timeline
          items={filtered.map((history) => ({
            children: (
              <Space direction="vertical" size={4}>
                <Space wrap>
                  <StatusTag status={history.action} label={history.action} />
                  <Text strong>{getBranchProtectionTemplateById(history.templateId)?.name ?? history.templateId}</Text>
                </Space>
                <Text>{history.message}</Text>
                <Text type="secondary">{history.actor} · {history.createdAt}</Text>
                <CodePreview variant="json" className="audit-json-preview">
                  {JSON.stringify({ before: history.before, after: history.after }, null, 2)}
                </CodePreview>
              </Space>
            ),
          }))}
        />
      </Card>
    </Space>
  )
}
