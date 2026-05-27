import {
  BranchesOutlined,
  CodeOutlined,
  DeploymentUnitOutlined,
  FileTextOutlined,
  NodeIndexOutlined,
  PullRequestOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TagsOutlined,
} from '../icons'
import { Card, Menu, Typography } from 'antd'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRepositoryDetail } from '../../api/repositories'
import { UI_TEXT } from '../../constants'
import RepositoryAvatar from '../repository/RepositoryAvatar'

const { Text } = Typography

const navItems = [
  { key: 'files', label: UI_TEXT.repositoryNavigation.files, icon: <FileTextOutlined /> },
  { key: 'merge-requests', label: UI_TEXT.repositoryNavigation.mergeRequests, icon: <PullRequestOutlined /> },
  { key: 'pipelines', label: UI_TEXT.repositoryNavigation.pipelines, icon: <BranchesOutlined /> },
  { key: 'commits', label: UI_TEXT.repositoryNavigation.commits, icon: <NodeIndexOutlined /> },
  { key: 'branches', label: UI_TEXT.repositoryNavigation.branches, icon: <CodeOutlined /> },
  { key: 'tags', label: UI_TEXT.repositoryNavigation.tags, icon: <TagsOutlined /> },
  { key: 'security', label: UI_TEXT.repositoryNavigation.security, icon: <SafetyCertificateOutlined /> },
  { key: 'deployment-transfer', label: UI_TEXT.repositoryNavigation.deploymentTransfer, icon: <DeploymentUnitOutlined /> },
  { key: 'settings', label: UI_TEXT.repositoryNavigation.settings, icon: <SettingOutlined /> },
]

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
      <Text className="nav-title">{UI_TEXT.common.currentRepository}</Text>
      <Card size="small" className="sidebar-repository-summary">
        <Card.Meta
          avatar={(
            <RepositoryAvatar repository={repository} size={32} className="sidebar-repository-avatar" />
          )}
          title={(
            <Text strong ellipsis className="sidebar-repository-name">
              {repository.name}
            </Text>
          )}
          description={(
            <Text type="secondary" ellipsis className="sidebar-repository-group">
              {repository.group}
            </Text>
          )}
        />
      </Card>

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
