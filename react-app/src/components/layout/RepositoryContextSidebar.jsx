import {
  AppstoreOutlined,
  BranchesOutlined,
  CodeOutlined,
  DeploymentUnitOutlined,
  FileTextOutlined,
  HistoryOutlined,
  NodeIndexOutlined,
  PullRequestOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Card, Divider, Flex, Menu, Tag, Typography } from 'antd'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRepositoryDetail } from '../../api/repositories'
import { UI_TEXT } from '../../constants'

const { Text, Title } = Typography

const navItems = [
  { key: '', label: UI_TEXT.repositoryNavigation.overview, icon: <AppstoreOutlined /> },
  { key: 'files', label: UI_TEXT.repositoryNavigation.files, icon: <FileTextOutlined /> },
  { key: 'merge-requests', label: UI_TEXT.repositoryNavigation.mergeRequests, icon: <PullRequestOutlined /> },
  { key: 'pipelines', label: UI_TEXT.repositoryNavigation.pipelines, icon: <BranchesOutlined /> },
  { key: 'commits', label: UI_TEXT.repositoryNavigation.commits, icon: <NodeIndexOutlined /> },
  { key: 'branches', label: UI_TEXT.repositoryNavigation.branches, icon: <CodeOutlined /> },
  { key: 'tags', label: UI_TEXT.repositoryNavigation.tags, icon: <TagsOutlined /> },
  { key: 'security', label: UI_TEXT.repositoryNavigation.security, icon: <SafetyCertificateOutlined /> },
  { key: 'deployment-transfer', label: UI_TEXT.repositoryNavigation.deploymentTransfer, icon: <DeploymentUnitOutlined /> },
  { key: 'activity', label: UI_TEXT.repositoryNavigation.activity, icon: <HistoryOutlined /> },
  { key: 'settings', label: UI_TEXT.repositoryNavigation.settings, icon: <SettingOutlined /> },
]

const statusColor = {
  passed: 'success',
  approved: 'success',
  blocked: 'error',
  failed: 'error',
  running: 'warning',
  pending: 'warning',
}

function RepositoryContextSidebar({ repositoryId }) {
  const location = useLocation()
  const navigate = useNavigate()
  const basePath = `/repositories/${repositoryId}`
  const repository = getRepositoryDetail(repositoryId) ?? {
    id: repositoryId,
    name: repositoryId,
    group: 'Unknown / Repository',
    visibility: 'Private',
    defaultBranch: 'main',
    role: 'Maintainer',
    updatedAt: '-',
    pipelineStatus: 'none',
    securityStatus: 'none',
  }

  const items = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        key: item.key ? `${basePath}/${item.key}` : basePath,
      })),
    [basePath],
  )

  const selectedKey = useMemo(() => {
    const exact = items.find((item) => item.key === location.pathname)
    if (exact) return exact.key

    const match = [...items]
      .filter((item) => item.key !== basePath)
      .sort((a, b) => b.key.length - a.key.length)
      .find((item) => location.pathname.startsWith(item.key))

    return match?.key ?? basePath
  }, [basePath, items, location.pathname])

  return (
    <div className="repository-context-sidebar">
      <Divider className="sidebar-divider" />
      <Text className="nav-title">Current Repository</Text>
      <Card size="small" className="sidebar-repository-card">
        <Title level={5}>{repository.name}</Title>
        <Text type="secondary">{repository.group}</Text>
        <Flex gap={6} wrap="wrap" className="sidebar-repository-tags">
          <Tag>{repository.visibility}</Tag>
          <Tag color="blue">{repository.role}</Tag>
        </Flex>
        <dl className="repository-meta-list">
          <div>
            <dt>Default branch</dt>
            <dd>{repository.defaultBranch}</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>{repository.updatedAt}</dd>
          </div>
          <div>
            <dt>Pipeline</dt>
            <dd>
              <Tag color={statusColor[repository.pipelineStatus]}>{repository.pipelineStatus}</Tag>
            </dd>
          </div>
          <div>
            <dt>Security</dt>
            <dd>
              <Tag color={statusColor[repository.securityStatus]}>{repository.securityStatus}</Tag>
            </dd>
          </div>
        </dl>
      </Card>

      <Text className="nav-title repository-menu-title">Repository</Text>
      <Menu
        className="repository-menu"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </div>
  )
}

export default RepositoryContextSidebar
