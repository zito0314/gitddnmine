import {
  CheckCircleOutlined,
  CodeOutlined,
  CopyOutlined,
  DownloadOutlined,
  DownOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FileOutlined,
  FolderOutlined,
  HistoryOutlined,
  LinkOutlined,
} from '../components/icons'
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Dropdown,
  Empty,
  Flex,
  Input,
  Result,
  Select,
  Space,
  Tag,
  Tooltip,
  Tree,
  Typography,
  message,
} from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getRepositoryDetail,
  getRepositoryFileBranches,
  getRepositoryFileDetail,
  getRepositoryFileTree,
  searchRepositoryFiles,
} from '../api/repositories'
import { PageHeader } from '../components/common'

const { Text } = Typography

const STATUS_META = {
  passed: { label: 'Passed', color: 'success', icon: <CheckCircleOutlined /> },
  failed: { label: 'Failed', color: 'error', icon: <ExclamationCircleOutlined /> },
}

function getStatusMeta(status) {
  return STATUS_META[status] ?? { label: status ?? 'Unknown', color: 'default', icon: null }
}

function collectFolderKeys(nodes, acc = []) {
  nodes.forEach((node) => {
    if (!node.isLeaf && node.children?.length) {
      acc.push(node.key)
      collectFolderKeys(node.children, acc)
    }
  })
  return acc
}

function decorateTree(nodes) {
  return nodes.map((node) => ({
    key: node.key,
    title: node.title,
    isLeaf: node.isLeaf,
    icon: node.isLeaf ? <FileOutlined /> : <FolderOutlined />,
    children: node.children ? decorateTree(node.children) : undefined,
  }))
}

function findFirstLeaf(nodes) {
  for (const node of nodes) {
    if (node.isLeaf) return node.key
    if (node.children?.length) {
      const found = findFirstLeaf(node.children)
      if (found) return found
    }
  }
  return undefined
}

function filterTree(nodes, matchedPaths) {
  return nodes.reduce((acc, node) => {
    if (node.isLeaf) {
      if (matchedPaths.has(node.key)) acc.push(node)
      return acc
    }
    const children = node.children ? filterTree(node.children, matchedPaths) : []
    if (children.length) acc.push({ ...node, children })
    return acc
  }, [])
}

export default function RepositoryFileDetail() {
  const { repositoryId, filePath } = useParams()
  const navigate = useNavigate()
  const decodedPath = filePath ? decodeURIComponent(filePath) : undefined
  const repository = getRepositoryDetail(repositoryId)
  const branches = useMemo(() => getRepositoryFileBranches(repositoryId), [repositoryId])
  const defaultBranch = branches.includes('dev') ? 'dev' : branches.includes('main') ? 'main' : branches[0]
  const [branch, setBranch] = useState(defaultBranch)
  const [search, setSearch] = useState('')

  const rawTree = useMemo(() => getRepositoryFileTree(repositoryId, branch), [repositoryId, branch])
  const detail = useMemo(() => {
    const exact = getRepositoryFileDetail(repositoryId, decodedPath, branch)
    if (exact) return exact
    const fallbackPath = findFirstLeaf(rawTree)
    return fallbackPath ? getRepositoryFileDetail(repositoryId, fallbackPath, branch) : null
  }, [repositoryId, decodedPath, branch, rawTree])

  const matchedPaths = useMemo(() => {
    const query = search.trim()
    if (!query) return null
    const matches = searchRepositoryFiles(repositoryId, branch, query)
    return new Set(matches.map((file) => file.path))
  }, [repositoryId, branch, search])

  const treeData = useMemo(() => {
    const base = matchedPaths ? filterTree(rawTree, matchedPaths) : rawTree
    return decorateTree(base)
  }, [rawTree, matchedPaths])

  const expandedKeys = useMemo(() => collectFolderKeys(treeData), [treeData])

  if (!repository) {
    return (
      <Result
        status="404"
        title="Repository를 찾을 수 없어요."
        subTitle="삭제되었거나 접근 권한이 없는 Repository일 수 있어요."
        extra={<Button type="primary" onClick={() => navigate('/repositories')}>저장소 목록으로 이동</Button>}
      />
    )
  }

  const status = detail ? getStatusMeta(detail.status) : null

  const goToFile = (path) => {
    navigate(`/repositories/${repositoryId}/files/${encodeURIComponent(path)}`)
  }

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard?.writeText(text)
    } catch {
      // Clipboard can be unavailable in local previews.
    }
    message.success(`${label}를 복사했어요.`)
  }

  const moreMenuItems = [
    { key: 'copy-path', icon: <LinkOutlined />, label: '파일 경로 복사' },
    { key: 'raw', icon: <EyeOutlined />, label: 'Raw 보기' },
    { key: 'download', icon: <DownloadOutlined />, label: '다운로드' },
    { type: 'divider' },
    { key: 'history', icon: <HistoryOutlined />, label: '변경 이력 보기' },
  ]

  const onMoreClick = ({ key }) => {
    if (key === 'copy-path' && detail) {
      copyText(detail.filePath, '파일 경로')
      return
    }
    if (key === 'raw') {
      message.info('Raw 파일을 확인합니다.')
      return
    }
    if (key === 'download') {
      message.info('파일 다운로드를 시작합니다.')
      return
    }
    if (key === 'history') {
      navigate(`/repositories/${repositoryId}/commits`)
    }
  }

  const breadcrumbItems = [
    { title: <span className="file-detail-crumb" onClick={() => navigate(`/repositories/${repositoryId}/files`)}>{repository.name}</span> },
    ...(detail?.pathSegments ?? []).map((segment, index, segments) => {
      const isLast = index === segments.length - 1
      return { title: <span className={isLast ? undefined : 'file-detail-crumb'}>{segment}</span> }
    }),
  ]

  return (
    <Space direction="vertical" size={16} className="file-detail-page page-stack">
      <PageHeader
        title="File"
        description="선택한 파일의 코드와 Commit 정보를 확인합니다."
      />

      <Flex className="file-detail-layout" gap={16} align="stretch" wrap="wrap">
        <aside className="file-detail-sidebar">
          <Flex vertical gap={12} className="file-detail-sidebar-inner">
            <Text strong>Files</Text>
            <Select
              value={branch}
              onChange={setBranch}
              className="file-detail-branch-select"
              options={branches.map((item) => ({ value: item, label: item }))}
              suffixIcon={<DownOutlined />}
            />
            <Input.Search
              allowClear
              placeholder="파일명, 경로를 검색해 주세요."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="file-detail-tree">
              {treeData.length ? (
                <Tree
                  showIcon
                  blockNode
                  treeData={treeData}
                  selectedKeys={detail ? [detail.filePath] : []}
                  expandedKeys={expandedKeys}
                  onSelect={(keys, info) => {
                    if (info.node?.isLeaf) goToFile(keys[0])
                  }}
                />
              ) : (
                <Empty description="조건에 맞는 파일이 없어요." />
              )}
            </div>
          </Flex>
        </aside>

        <section className="file-detail-content">
          {detail ? (
            <Space direction="vertical" size={12} className="file-detail-content-stack">
              <Flex align="center" justify="space-between" gap={12} wrap="wrap">
                <Breadcrumb className="file-detail-breadcrumb" items={breadcrumbItems} />
                <Space wrap>
                  <Button icon={<CodeOutlined />} onClick={() => message.info('VS Code로 파일을 엽니다.')}>VS Code</Button>
                  <Dropdown trigger={['click']} placement="bottomRight" menu={{ items: moreMenuItems, onClick: onMoreClick }}>
                    <Button icon={<EllipsisOutlined />}>더보기</Button>
                  </Dropdown>
                </Space>
              </Flex>

              <Card className="file-detail-meta-card">
                <Flex align="center" justify="space-between" gap={16} wrap="wrap">
                  <Space align="start" size={12}>
                    <Avatar>{(detail.author ?? 'G').slice(0, 1)}</Avatar>
                    <Space direction="vertical" size={4}>
                      <Text strong>{detail.commitMessage}</Text>
                      <Space wrap size={4} className="file-detail-meta-line">
                        <Text type="secondary">작성자</Text>
                        <Text>{detail.author}</Text>
                        <Text type="secondary">·</Text>
                        <Text type="secondary">마지막 업데이트</Text>
                        <Text>{detail.updatedAt}</Text>
                      </Space>
                    </Space>
                  </Space>
                  <Space wrap size={8} className="file-detail-meta-actions">
                    {status ? <Tag color={status.color} icon={status.icon}>{status.label}</Tag> : null}
                    <Tag color="blue">v{detail.version}</Tag>
                    <Space size={4}>
                      <Text type="secondary">Commit</Text>
                      <Text code>{detail.commitSha}</Text>
                    </Space>
                    <Tooltip title="Commit SHA 복사">
                      <Button size="small" icon={<CopyOutlined />} onClick={() => copyText(detail.commitSha, 'Commit SHA')} />
                    </Tooltip>
                    <Button size="small" icon={<HistoryOutlined />} onClick={() => navigate(`/repositories/${repositoryId}/commits`)}>
                      변경 이력
                    </Button>
                  </Space>
                </Flex>
              </Card>

              <Card className="file-detail-code-card" styles={{ body: { padding: 0 } }}>
                <Flex align="center" justify="space-between" gap={12} className="file-detail-code-header" wrap="wrap">
                  <Space size={8}>
                    <FileOutlined />
                    <Text strong>{detail.fileName}</Text>
                    <Text type="secondary">{detail.codeLines.length} lines</Text>
                  </Space>
                  <Space>
                    <Tooltip title="파일 경로 복사">
                      <Button size="small" icon={<LinkOutlined />} onClick={() => copyText(detail.filePath, '파일 경로')} />
                    </Tooltip>
                    <Tooltip title="코드 복사">
                      <Button size="small" icon={<CopyOutlined />} onClick={() => copyText(detail.codeLines.join('\n'), '파일 내용')} />
                    </Tooltip>
                  </Space>
                </Flex>
                <div className="file-detail-code-body">
                  {detail.codeLines.map((line, index) => (
                    <div key={index} className="file-detail-code-line">
                      <span className="file-detail-line-number">{index + 1}</span>
                      <span className="file-detail-line-text">{line || ' '}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Space>
          ) : (
            <Card>
              <Empty description="선택한 파일을 찾을 수 없어요. 좌측 트리에서 파일을 선택해 주세요." />
            </Card>
          )}
        </section>
      </Flex>
    </Space>
  )
}
