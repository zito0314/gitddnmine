import { Card, Descriptions, Drawer, Form, Input, List, Switch, Table, Typography } from 'antd'
import { useState } from 'react'
import { StatusTag } from '../../components/common'

const { Text } = Typography

export function PolicyTable({ data }) {
  return (
    <Table
      rowKey="id"
      dataSource={data}
      pagination={false}
      columns={[
        { title: 'Policy', dataIndex: 'name' },
        { title: 'Value', dataIndex: 'value' },
        { title: 'Enabled', dataIndex: 'enabled', render: (value) => <Switch checked={value} disabled /> },
      ]}
    />
  )
}

export function DemoPolicyForm({ title, policies }) {
  return (
    <Card title={title}>
      <Form layout="vertical" disabled>
        {policies.map((policy) => (
          <Form.Item key={policy.id} label={policy.name}>
            <Input value={policy.value} />
          </Form.Item>
        ))}
      </Form>
    </Card>
  )
}

export function RoleMappingTable({ mappings }) {
  const [selected, setSelected] = useState(null)
  return (
    <>
      <Table
        rowKey="id"
        dataSource={mappings}
        onRow={(record) => ({ onClick: () => setSelected(record), style: { cursor: 'pointer' } })}
        columns={[
          { title: 'Organization', dataIndex: 'organization' },
          { title: 'Team', dataIndex: 'team' },
          { title: 'Role', dataIndex: 'role' },
          { title: 'GitLab role', dataIndex: 'gitlabRole' },
          { title: 'Screen access', dataIndex: 'screenAccess' },
        ]}
      />
      <Drawer title="Role mapping" open={Boolean(selected)} onClose={() => setSelected(null)} width={460}>
        {selected ? (
          <Descriptions column={1} bordered>
            {Object.entries(selected).map(([key, value]) => <Descriptions.Item key={key} label={key}>{value}</Descriptions.Item>)}
          </Descriptions>
        ) : null}
      </Drawer>
    </>
  )
}

export function AuditList({ logs }) {
  return <List dataSource={logs} renderItem={(log) => <List.Item><List.Item.Meta title={<><Text strong>{log.action}</Text> <StatusTag status={log.result} /></>} description={`${log.actor} · ${log.target} · ${log.createdAt}`} /></List.Item>} />
}
