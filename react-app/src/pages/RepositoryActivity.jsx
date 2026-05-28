import { AuditOutlined, SafetyCertificateOutlined } from '../components/icons'
import { Card, Col, List, Row, Space, Timeline, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRepositoryActivities, getRepositoryActivitySummary, getRepositoryDetail } from '../api/repositories'
import { FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

const { Text, Title } = Typography

function targetLink(repositoryId, activity) {
  if (activity.targetType === 'mergeRequest') return `/repositories/${repositoryId}/merge-requests/${activity.targetId}`
  if (activity.targetType === 'pipeline') return `/repositories/${repositoryId}/pipelines/${activity.targetId}`
  if (activity.targetType === 'security') return `/security/${activity.targetId}`
  if (activity.targetType === 'audit') return '/audit'
  return null
}

export default function RepositoryActivity() {
  const { repositoryId } = useParams()
  const repository = getRepositoryDetail(repositoryId)
  const activities = useMemo(() => getRepositoryActivities(repositoryId), [repositoryId])
  const summary = useMemo(() => getRepositoryActivitySummary(repositoryId), [repositoryId])
  const [search, setSearch] = useState('')
  const [type, setType] = useState(null)
  const [actor, setActor] = useState(null)

  if (!repository) return <Card><Title level={3}>{UI_TEXT.messages.notFound.repository}</Title></Card>

  const filtered = activities.filter((activity) => {
    const q = search.trim().toLowerCase()
    if (q && ![activity.actor, activity.message, activity.targetId, activity.type].join(' ').toLowerCase().includes(q)) return false
    if (type && activity.type !== type) return false
    if (actor && activity.actor !== actor) return false
    return true
  })

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title={UI_TEXT.pages.repositoryActivity.title} description={UI_TEXT.pages.repositoryActivity.description} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Today Activities" value={summary.today} icon={<AuditOutlined />} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="MR Events" value={summary.mrEvents} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Pipeline Events" value={summary.pipelineEvents} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Security Events" value={summary.securityEvents} tone="warning" icon={<SafetyCertificateOutlined />} /></Col>
      </Row>
      <Card>
        <FilterBar
          search={{ placeholder: 'Actor, message, target, event type 검색', value: search, onChange: setSearch }}
          filters={[
            { key: 'type', placeholder: 'Event type', value: type, onChange: setType, options: [...new Set(activities.map((item) => item.type))].map((value) => ({ value, label: value })) },
            { key: 'actor', placeholder: 'Actor', value: actor, onChange: setActor, options: [...new Set(activities.map((item) => item.actor))].map((value) => ({ value, label: value })) },
            { key: 'severity', placeholder: 'Severity', options: [{ value: 'warning', label: 'Warning' }, { value: 'blocked', label: 'Blocked' }] },
            { key: 'date', type: 'dateRange', placeholder: ['From', 'To'] },
          ]}
          onReset={() => { setSearch(''); setType(null); setActor(null) }}
        />
        <Timeline
          items={filtered.map((activity) => {
            const link = targetLink(repositoryId, activity)
            return {
              color: activity.type?.startsWith('security') ? 'red' : activity.type?.startsWith('pipeline') ? 'blue' : 'green',
              children: (
                <List.Item>
                  <List.Item.Meta
                    title={<Space wrap><Text strong>{activity.actor}</Text><StatusTag status={activity.type?.startsWith('security') ? 'warning' : 'passed'} label={activity.type} /></Space>}
                    description={<Space direction="vertical" size={2}><Text>{activity.message}</Text><Text type="secondary">{activity.createdAt} · target {link ? <Link to={link}>{activity.targetId}</Link> : activity.targetId}</Text></Space>}
                  />
                </List.Item>
              ),
            }
          })}
        />
      </Card>
    </Space>
  )
}
