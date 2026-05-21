import { CodeOutlined, TeamOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRepositoryCommitSummary, getRepositoryCommits, getRepositoryDetail, getRepositoryBranches } from '../api/repositories'
import { DataTable, FilterBar, PageHeader, SummaryCard } from '../components/common'
import { NOT_FOUND_MESSAGES, PAGE_TEXT } from '../constants'

const { Text, Title } = Typography

function options(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

export default function RepositoryCommits() {
  const { repositoryId } = useParams()
  const repository = getRepositoryDetail(repositoryId)
  const commits = useMemo(() => getRepositoryCommits(repositoryId), [repositoryId])
  const summary = useMemo(() => getRepositoryCommitSummary(repositoryId), [repositoryId])
  const branches = useMemo(() => getRepositoryBranches(repositoryId), [repositoryId])
  const [search, setSearch] = useState('')
  const [branch, setBranch] = useState(null)
  const [author, setAuthor] = useState(null)

  if (!repository) return <Card><Title level={3}>{NOT_FOUND_MESSAGES.repository}</Title></Card>

  const filtered = commits.filter((commit) => {
    const q = search.trim().toLowerCase()
    if (q && ![commit.title, commit.description, commit.sha, commit.author, commit.branch].join(' ').toLowerCase().includes(q)) return false
    if (branch && commit.branch !== branch) return false
    if (author && commit.author !== author) return false
    return true
  })

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader eyebrow={repository.name} title={PAGE_TEXT.repositoryCommits.title} description={PAGE_TEXT.repositoryCommits.description} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Total Commits" value={summary.total} icon={<CodeOutlined />} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Today" value={summary.today} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="This Week" value={summary.thisWeek} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Contributors" value={summary.contributors} icon={<TeamOutlined />} /></Col>
      </Row>
      <Card>
        <FilterBar
          search={{ placeholder: 'Message, SHA, author 검색', value: search, onChange: setSearch }}
          filters={[
            { key: 'branch', placeholder: 'Branch', value: branch, onChange: setBranch, options: branches.map((item) => ({ value: item.name, label: item.name })) },
            { key: 'author', placeholder: 'Author', value: author, onChange: setAuthor, options: options(commits.map((item) => item.author)) },
            { key: 'date', type: 'dateRange', placeholder: ['From', 'To'] },
          ]}
          onReset={() => { setSearch(''); setBranch(null); setAuthor(null) }}
        />
        <DataTable rowKey="id" dataSource={filtered} columns={[
          { title: 'Commit', dataIndex: 'sha', render: (value) => <Text code>{value}</Text> },
          { title: 'Message', dataIndex: 'title', render: (value, record) => <Space orientation="vertical" size={2}><Text strong>{value}</Text><Text type="secondary">{record.description}</Text></Space> },
          { title: 'Author', dataIndex: 'author' },
          { title: 'Branch', dataIndex: 'branch', render: (value) => <Text code>{value}</Text> },
          { title: 'Changed files', dataIndex: 'changedFiles', render: (value) => value ?? '-' },
          { title: 'Additions / Deletions', key: 'diff', render: (_, record) => <Text>+{record.added ?? 0} / -{record.removed ?? 0}</Text> },
          { title: 'Created at', dataIndex: 'createdAt' },
          { title: 'Actions', key: 'actions', render: () => <Button size="small" disabled>Open</Button> },
        ]} />
      </Card>
    </Space>
  )
}
