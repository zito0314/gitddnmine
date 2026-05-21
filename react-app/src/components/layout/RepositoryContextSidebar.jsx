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
import { REPOSITORY_NAV_LABELS } from '../../constants'

const { Text, Title } = Typography

const navItems = [
  { key: '', label: REPOSITORY_NAV_LABELS.overview, icon: <AppstoreOutlined /> },
  { key: 'files', label: REPOSITORY_NAV_LABELS.files, icon: <FileTextOutlined /> },
  { key: 'merge-requests', label: REPOSITORY_NAV_LABELS.mergeRequests, icon: <PullRequestOutlined /> },
  { key: 'pipelines', label: REPOSITORY_NAV_LABELS.pipelines, icon: <BranchesOutlined /> },
  { key: 'commits', label: REPOSITORY_NAV_LABELS.commits, icon: <NodeIndexOutlined /> },
  { key: 'branches', label: REPOSITORY_NAV_LABELS.branches, icon: <CodeOutlined /> },
  { key: 'tags', label: REPOSITORY_NAV_LABELS.tags, icon: <TagsOutlined /> },
  { key: 'security', label: REPOSITORY_NAV_LABELS.security, icon: <SafetyCertificateOutlined /> },
  { key: 'deployment-transfer', label: REPOSITORY_NAV_LABELS.deploymentTransfer, icon: <DeploymentUnitOutlined /> },
  { key: 'activity', label: REPOSITORY_NAV_LABELS.activity, icon: <HistoryOutlined /> },
  { key: 'settings', label: REPOSITORY_NAV_LABELS.settings, icon: <SettingOutlined /> },
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
