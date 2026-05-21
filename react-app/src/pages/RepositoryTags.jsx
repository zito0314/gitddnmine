import { TagOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRepositoryDetail, getRepositoryTagSummary, getRepositoryTags } from '../api/repositories'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'

const { Text, Title } = Typography

export default function RepositoryTags() {
  const { repositoryId } = useParams()
  const repository = getRepositoryDetail(repositoryId)
  const tags = useMemo(() => getRepositoryTags(repositoryId), [repositoryId])
  const summary = useMemo(() => getRepositoryTagSummary(repositoryId), [repositoryId])
  const [search, setSearch] = useState('')
  const [releaseType, setReleaseType] = useState(null)
  const [author, setAuthor] = useState(null)

  if (!repository) return <Card><Title level={3}>Repository not found</Title></Card>

  const filtered = tags.filter((tag) => {
    const q = search.trim().toLowerCase()
    if (q && ![tag.name, tag.commit, tag.message].join(' ').toLowerCase().includes(q)) return false
    if (releaseType && tag.releaseType !== releaseType) return false
    if (author && tag.author !== author) return false
    return true
  })

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader eyebrow={repository.name} title="Tags" description="배포 기준 태그와 릴리즈 이력을 확인하는 화면" />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Total Tags" value={summary.total} icon={<TagOutlined />} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Latest Release" value={summary.latestRelease} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Production Tags" value={summary.production} tone="success" /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Pre-release Tags" value={summary.preRelease} tone="warning" /></Col>
      </Row>
      <Card>
        <FilterBar
          search={{ placeholder: 'Tag, commit, message 검색', value: search, onChange: setSearch }}
          filters={[
            { key: 'type', placeholder: 'Release type', value: releaseType, onChange: setReleaseType, options: [...new Set(tags.map((tag) => tag.releaseType))].map((value) => ({ value, label: value })) },
            { key: 'author', placeholder: 'Author', value: author, onChange: setAuthor, options: [...new Set(tags.map((tag) => tag.author))].map((value) => ({ value, label: value })) },
            { key: 'date', type: 'dateRange', placeholder: ['From', 'To'] },
          ]}
          onReset={() => { setSearch(''); setReleaseType(null); setAuthor(null) }}
        />
        <DataTable rowKey="name" dataSource={filtered} columns={[
          { title: 'Tag', dataIndex: 'name', render: (value) => <Text code>{value}</Text> },
          { title: 'Release type', dataIndex: 'releaseType', render: (value) => <StatusTag status={value === 'production' ? 'passed' : value === 'pre-release' ? 'warning' : 'manual'} label={value} /> },
          { title: 'Commit', dataIndex: 'commit', render: (value) => <Text code>{value}</Text> },
          { title: 'Message', dataIndex: 'message' },
          { title: 'Author', dataIndex: 'author' },
          { title: 'Created at', dataIndex: 'createdAt' },
          { title: 'Actions', key: 'actions', render: () => <Button size="small" disabled>Release note</Button> },
        ]} />
      </Card>
    </Space>
  )
}
