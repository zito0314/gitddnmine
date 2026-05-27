import { Card, Space, Table } from 'antd'
import { useParams } from 'react-router-dom'
import { getSecurityValidationsByRepository } from '../api/security'
import { PageHeader, StatusTag } from '../components/common'
import { UI_TEXT } from '../constants'

export default function RepositorySecurity() {
  const { repositoryId } = useParams()
  const validations = getSecurityValidationsByRepository(repositoryId)

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.pages.repositorySecurity.title}
        description={UI_TEXT.pages.repositorySecurity.description}
      />
      <Card>
        <Table rowKey="id" dataSource={validations} pagination={false} columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'MR', dataIndex: 'mrTitle' },
          { title: 'Branch', dataIndex: 'branch' },
          { title: 'Policy', dataIndex: 'policy', render: (value, record) => <StatusTag status={value} label={record.policyLabel} /> },
          { title: 'Last checked', dataIndex: 'lastCheckedAt' },
        ]} />
      </Card>
    </Space>
  )
}
