import { EyeOutlined, FileOutlined, FolderOutlined } from '@ant-design/icons'
import { Button, Card, Col, Drawer, Row, Select, Space, Tree, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getRepositoryBranches,
  getRepositoryDetail,
  getRepositoryFiles,
  getRepositoryFileTree,
} from '../api/repositories'
import { DataTable, FilterBar, PageHeader, SummaryCard } from '../components/common'
import { DEMO_MESSAGES, NOT_FOUND_MESSAGES, PAGE_TEXT } from '../constants'

const { Text, Title } = Typography

export default function RepositoryFiles() {
  const { repositoryId } = useParams()
  const repository = getRepositoryDetail(repositoryId)
  const files = useMemo(() => getRepositoryFiles(repositoryId), [repositoryId])
  const tree = useMemo(() => getRepositoryFileTree(repositoryId), [repositoryId])
  const branches = useMemo(() => getRepositoryBranches(repositoryId), [repositoryId])
  const [branch, setBranch] = useState(repository?.defaultBranch)
  const [search, setSearch] = useState('')
  const [preview, setPreview] = useState(null)

  if (!repository) return <Card><Title level={3}>{NOT_FOUND_MESSAGES.repository}</Title></Card>

  const filteredFiles = files.filter((file) =>
    [file.name, file.path, file.type].join(' ').toLowerCase().includes(search.trim().toLowerCase()),
  )

  const columns = [
    { title: 'Name', dataIndex: 'name', render: (value, record) => <Space>{record.type === 'Folder' ? <FolderOutlined /> : <FileOutlined />}<Button type="link" onClick={() => setPreview(record)}>{value}</Button></Space> },
    { title: 'Path', dataIndex: 'path', render: (value) => <Text code>{value}</Text> },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Size', dataIndex: 'size' },
    { title: 'Last Commit', dataIndex: 'lastCommit', render: (value) => <Text code>{value}</Text> },
    { title: 'Updated at', dataIndex: 'updatedAt' },
    { title: 'Actions', key: 'actions', render: (_, record) => <Button icon={<EyeOutlined />} size="small" onClick={() => setPreview(record)}>Preview</Button> },
  ]

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader eyebrow={repository.name} title={PAGE_TEXT.repositoryFiles.title} description={PAGE_TEXT.repositoryFiles.description} />
      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Total Files" value={files.filter((file) => file.type === 'File').length} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Folders" value={files.filter((file) => file.type === 'Folder').length} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Last Commit" value={files[0]?.lastCommit ?? '-'} /></Col>
        <Col xs={24} sm={12} xl={6}><SummaryCard title="Default Branch" value={repository.defaultBranch} /></Col>
      </Row>
      <FilterBar
        search={{ placeholder: 'File name 또는 path 검색', value: search, onChange: setSearch }}
        filters={[{ key: 'branch', placeholder: 'Branch', value: branch, onChange: setBranch, options: branches.map((item) => ({ value: item.name, label: item.name })) }]}
      >
        <Select value={branch} onChange={setBranch} options={branches.map((item) => ({ value: item.name, label: item.name }))} style={{ minWidth: 180 }} />
      </FilterBar>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={7}><Card title="File Tree"><Tree treeData={tree} defaultExpandAll /></Card></Col>
        <Col xs={24} lg={17}><Card><DataTable rowKey="id" dataSource={filteredFiles} columns={columns} /></Card></Col>
      </Row>
      <Drawer title={preview?.name ?? 'File preview'} open={Boolean(preview)} onClose={() => setPreview(null)} width={520}>
        <Space orientation="vertical" size={12}>
          <Text type="secondary">{DEMO_MESSAGES.filePreviewPlaceholder}</Text>
          <Text code>{preview?.path}</Text>
          <Text>Last commit: {preview?.lastCommit}</Text>
        </Space>
      </Drawer>
    </Space>
  )
}
