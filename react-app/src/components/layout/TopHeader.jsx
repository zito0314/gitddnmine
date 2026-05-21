import {
  BellOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Button, Dropdown, Flex, Input, Layout, Space, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout
const { Text } = Typography

const createItems = [
  { key: 'repository', label: 'New repository' },
  { key: 'merge-request', label: 'New merge request' },
  { key: 'pipeline', label: 'Run pipeline' },
]

function TopHeader({ onToggleSidebar }) {
  const navigate = useNavigate()
  return (
    <Header className="top-header">
      <Flex align="center" gap={12} className="header-left">
        <Button type="text" icon={<SettingOutlined />} onClick={onToggleSidebar} />
        <Tag color="blue">K-Digital Bank</Tag>
      </Flex>

      <Input
        className="global-search"
        prefix={<SearchOutlined />}
        placeholder="Repository, MR, Pipeline 검색"
        suffix={<Text keyboard>/</Text>}
        allowClear
      />

      <Space size={8} className="header-actions">
        <Dropdown menu={{ items: createItems }} trigger={['click']}>
          <Button type="primary" icon={<PlusOutlined />}>
            Create
          </Button>
        </Dropdown>
        <Badge count={4} size="small">
          <Button icon={<BellOutlined />} />
        </Badge>
        <Button onClick={() => navigate('/admin')}>Admin Console</Button>
        <Avatar icon={<UserOutlined />} className="user-avatar" />
      </Space>
    </Header>
  )
}

export default TopHeader
