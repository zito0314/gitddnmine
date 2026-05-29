import {
  BranchesOutlined,
  CodeOutlined,
  CopyOutlined,
  DatabaseOutlined,
  DeleteOutlined,
  DownOutlined,
  EllipsisOutlined,
  FileAddOutlined,
  FileOutlined,
  FolderOutlined,
  GitCommitOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  PlusOutlined,
  ReloadOutlined,
  StarFilled,
  StarOutlined,
  TagOutlined,
  UploadOutlined,
} from '../components/icons'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Flex,
  Input,
  Row,
  Segmented,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getRepositoryBranches,
  getRepositoryCommitSummary,
  getRepositoryCommits,
  getRepositoryDetail,
  getRepositoryFiles,
  getRepositoryTags,
} from '../api/repositories'
import { getDeploymentTransfersByRepositoryId } from '../api/deploymentTransfers'
import { useAuth } from '../auth/AuthContext'
import { StatusTag } from '../components/common'
import RepositoryAvatar from '../components/repository/RepositoryAvatar'
import { UI_TEXT } from '../constants'

const { Paragraph, Text, Title } = Typography

const downloadOptions = ['zip', 'tar.gz', 'tar.bz2', 'tar']

function getMetricValue(repository, label, fallback) {
  return repository.metrics?.find((metric) => metric.label === label)?.value ?? fallback
}

function getTransferStatusMeta(transfer) {
  if (transfer.status === 'blocked' || transfer.securityStatus === 'blocked') return { label: '운영 반영 불가', color: 'error' }
  if (transfer.status === 'approved' || transfer.status === 'completed') return { label: '완료', color: 'success' }
  if (transfer.status === 'scheduled') return { label: '운영 반영 가능', color: 'success' }
  if (transfer.status === 'stabilizing') return { label: '안정화 중', color: 'processing' }
  if (transfer.approvalStatus === 'pending' || transfer.status === 'reviewing') return { label: '확인 필요', color: 'warning' }
  return { label: transfer.status ?? '확인 필요', color: 'default' }
}

export default function RepositoryFiles() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const auth = useAuth()
  const repository = getRepositoryDetail(repositoryId)
  const files = useMemo(() => getRepositoryFiles(repositoryId), [repositoryId])
  const branches = useMemo(() => getRepositoryBranches(repositoryId), [repositoryId])
  const tags = useMemo(() => getRepositoryTags(repositoryId), [repositoryId])
  const commits = useMemo(() => getRepositoryCommits(repositoryId), [repositoryId])
  const commitSummary = useMemo(() => getRepositoryCommitSummary(repositoryId), [repositoryId])
  const deploymentTransfers = useMemo(() => getDeploymentTransfersByRepositoryId(repositoryId), [repositoryId])
  const [branch, setBranch] = useState(repository?.defaultBranch)

  if (!repository) return <Card><Title level={3}>{UI_TEXT.messages.notFound.repository}</Title></Card>

  const latestCommit = commits[0] ?? {
    sha: files[0]?.lastCommit ?? '-',
    title: 'Initial commit',
    author: 'System',
    createdAt: repository.updatedAt,
  }
  const cloneSsh = `git@gitlab.com:${repository.groupKey ?? 'gitddn'}/${repository.id}.git`
  const cloneHttps = `https://gitlab.com/${repository.groupKey ?? 'gitddn'}/${repository.id}.git`

  const copyText = async (text, label = '복사') => {
    await navigator.clipboard?.writeText(text)
    message.success(`${label}되었습니다.`)
  }

  const createMenuItems = [
    { key: 'new-file', icon: <FileAddOutlined />, label: '새로운 파일' },
    { key: 'upload-file', icon: <UploadOutlined />, label: '파일 업로드' },
    { key: 'new-branch', icon: <BranchesOutlined />, label: '새로운 브랜치' },
    { key: 'new-tag', icon: <TagOutlined />, label: '새로운 태그' },
  ]

  const moreMenuItems = [
    { key: 'copy-link', icon: <LinkOutlined />, label: '고유링크 복사' },
    { type: 'divider' },
    { key: 'delete', icon: <DeleteOutlined />, label: '삭제', danger: true },
  ]
  const openTools = [
    { title: 'Web IDE', actions: [<Button key="open" size="small">.</Button>] },
    { title: 'Visual Studio Code', actions: [<Segmented key="protocol" options={['SSH', 'HTTPS']} />] },
    { title: 'IntelliJ IDEA', actions: [<Segmented key="protocol" options={['SSH', 'HTTPS']} />] },
  ]
  const latestPushNotice = repository.latestPushNotice
  const canCreateMrFromPush = auth.hasPermission('mr:create') && latestPushNotice?.hasOpenMergeRequest === false

  const openMergeRequestCreate = () => {
    const sourceBranch = latestPushNotice.sourceBranch ?? latestPushNotice.branchName ?? branch
    const targetBranch = latestPushNotice.targetBranch ?? repository.defaultBranch ?? 'develop'
    const params = new URLSearchParams({
      sourceBranch,
      targetBranch,
      from: 'latest-push',
    })

    navigate(`/repositories/${repositoryId}/merge-requests/new?${params.toString()}`, {
      state: {
        repositoryId,
        sourceBranch,
        targetBranch,
        fromLatestPushNotice: true,
        title: latestPushNotice.title,
        description: latestPushNotice.description,
      },
    })
  }

  const columns = [
    {
      title: '파일명',
      dataIndex: 'name',
      render: (value, record) => (
        <Space size={10}>
          {record.type === 'Folder' ? <FolderOutlined /> : <FileOutlined />}
          <Text strong>{value}</Text>
        </Space>
      ),
    },
    {
      title: '마지막 Commit',
      dataIndex: 'lastCommit',
      ellipsis: true,
      render: (value, record) => (
        <Space direction="vertical" size={0}>
          <Text>{record.type === 'Folder' ? `${value} 파일 업데이트` : latestCommit.title}</Text>
          <Text type="secondary" code>{value}</Text>
        </Space>
      ),
    },
    { title: '마지막 업데이트', dataIndex: 'updatedAt', width: 160, render: (value) => <Text strong>{value}</Text> },
  ]

  const codeDropdown = (
    <div className="repository-code-dropdown">
      <Title level={5}>Clone with SSH</Title>
      <Input
        readOnly
        value={cloneSsh}
        suffix={<Button type="text" icon={<CopyOutlined />} onClick={() => copyText(cloneSsh, 'SSH 주소가 복사')} />}
      />
      <Title level={5}>Clone with HTTPS</Title>
      <Input
        readOnly
        value={cloneHttps}
        suffix={<Button type="text" icon={<CopyOutlined />} onClick={() => copyText(cloneHttps, 'HTTPS 주소가 복사')} />}
      />
      <Divider />
      <Title level={5}>Open with</Title>
      <Flex vertical gap={8}>
        {openTools.map((item) => (
          <Flex key={item.title} align="center" justify="space-between" gap={12} className="repository-code-tool-row">
            <Text>{item.title}</Text>
            <Space>{item.actions}</Space>
          </Flex>
        ))}
      </Flex>
      <Divider />
      <Title level={5}>Download source code</Title>
      <Segmented block options={downloadOptions} />
    </div>
  )

  const repositoryGroup = repository.group ?? repository.namespace ?? repository.path?.split('/').slice(0, -1).join('/') ?? '-'
  const repositoryInfoItems = [
    { key: 'commits', icon: <GitCommitOutlined />, label: 'Commit', value: `${getMetricValue(repository, 'Commits', commitSummary.total)} Commits`, path: 'commits' },
    { key: 'branches', icon: <BranchesOutlined />, label: 'Branch', value: `${getMetricValue(repository, 'Branches', branches.length)} Branches`, path: 'branches' },
    { key: 'tags', icon: <TagOutlined />, label: 'Tag', value: `${getMetricValue(repository, 'Tags', tags.length)} Tags`, path: 'tags' },
    { key: 'storage', icon: <DatabaseOutlined />, label: 'Project Storage', value: getMetricValue(repository, 'Project Storage', '4 KiB') },
    { key: 'createdAt', icon: <CodeOutlined />, label: '생성일', value: repository.createdAt ?? repository.createdAtText ?? '2024.06.13' },
    { key: 'group', icon: <FolderOutlined />, label: '그룹', value: repositoryGroup },
  ]

  return (
    <Space className="repository-files-page" direction="vertical" size={20}>
      <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
        <Space align="start" size={12} className="repository-files-title">
          <RepositoryAvatar repository={repository} className="repository-files-avatar" />
          <Title level={2}>{repository.name}</Title>
        </Space>
        <Tooltip title={repository.favorite ? '즐겨찾기 저장소' : '즐겨찾기 추가'}>
          <Button shape="circle" icon={repository.favorite ? <StarFilled /> : <StarOutlined />} />
        </Tooltip>
      </Flex>

      <Row gutter={[20, 20]}>
        <Col xs={24} xl={17}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Flex align="center" justify="space-between" gap={12} wrap="wrap">
              <Select
                className="repository-branch-select"
                value={branch}
                onChange={setBranch}
                options={branches.map((item) => ({ value: item.name, label: item.name }))}
                suffixIcon={<DownOutlined />}
              />
              <Space wrap>
                <Dropdown
                  trigger={['click']}
                  menu={{
                    items: createMenuItems,
                    onClick: ({ key }) => message.info(`${createMenuItems.find((item) => item.key === key)?.label} 메뉴를 선택했습니다.`),
                  }}
                >
                  <Button type="primary" icon={<PlusOutlined />} />
                </Dropdown>
                <Button icon={<CodeOutlined />}>VS Code</Button>
                <Dropdown dropdownRender={() => codeDropdown} trigger={['click']} placement="bottomRight">
                  <Button>Code <DownOutlined /></Button>
                </Dropdown>
                <Dropdown
                  trigger={['click']}
                  menu={{
                    items: moreMenuItems,
                    onClick: ({ key }) => {
                      if (key === 'copy-link') copyText(window.location.href, '고유링크가 복사')
                      if (key === 'delete') message.warning('삭제 메뉴를 선택했습니다.')
                    },
                  }}
                >
                  <Button icon={<EllipsisOutlined />} />
                </Dropdown>
              </Space>
            </Flex>

            {latestPushNotice ? (
              <Flex className="repository-push-notice" align="center" justify="space-between" gap={12} wrap="wrap">
                <Flex align="center" gap={8} className="repository-push-notice-content">
                  <InfoCircleOutlined className="repository-push-notice-icon" />
                  <Text className="repository-push-notice-text">
                    <Text strong ellipsis className="repository-push-notice-branch">
                      {latestPushNotice.branchName}
                    </Text>
                    {' '}Branch에서 {latestPushNotice.pushedAt} 새로운 Push가 있었습니다.
                  </Text>
                </Flex>
                {canCreateMrFromPush ? (
                  <Button type="primary" onClick={openMergeRequestCreate}>
                    MR 생성하기
                  </Button>
                ) : null}
              </Flex>
            ) : null}

            <Card className="repository-latest-commit">
              <Flex align="center" justify="space-between" gap={16} wrap="wrap">
                <Space size={12}>
                  <Avatar src="https://api.dicebear.com/7.x/initials/svg?seed=Kim" />
                  <Space direction="vertical" size={2}>
                    <Text strong>{latestCommit.title}</Text>
                    <Text type="secondary">작성자: {latestCommit.author} · {latestCommit.createdAt}</Text>
                  </Space>
                </Space>
                <Space wrap>
                  <StatusTag status={repository.pipelineStatus} />
                  <Tag>{files.length} · {files.filter((file) => file.type === 'File').length}</Tag>
                  <Button size="small">{latestCommit.sha}</Button>
                  <Button size="small" icon={<CopyOutlined />} onClick={() => copyText(latestCommit.sha, 'Commit SHA가 복사')} />
                  <Button size="small" icon={<ReloadOutlined />} />
                </Space>
              </Flex>
            </Card>

            <Table
              className="repository-files-table"
              rowKey="id"
              columns={columns}
              dataSource={files}
              pagination={false}
              rowClassName={(record) => (record.type === 'File' ? 'repository-files-row-clickable' : '')}
              onRow={(record) => ({
                onClick: () => {
                  if (record.type === 'File') {
                    navigate(`/repositories/${repositoryId}/files/${encodeURIComponent(record.path)}`)
                  } else {
                    message.info('폴더 내 파일을 선택해 주세요.')
                  }
                },
              })}
            />

            <Card className="repository-readme-card" title="README.md">
              <Title level={2}>GitLab</Title>
              <Title level={3}>Canonical source</Title>
              <Paragraph>
                The canonical source of {repository.name} is hosted on GitLab.com.
              </Paragraph>
              <Paragraph type="secondary">
                이 저장소는 {repository.group} 프로젝트의 코드, 브랜치, 태그, 운영 이관 흐름을 관리합니다.
              </Paragraph>
              <Title level={3}>Open source software to collaborate on code</Title>
              <Paragraph type="secondary">
                Branch, Merge Request, Pipeline, Security Validation 상태를 한 화면에서 확인할 수 있습니다.
              </Paragraph>
            </Card>
          </Space>
        </Col>

        <Col xs={24} xl={7}>
          <Card className="repository-info-panel" title="저장소 정보">
            <section className="repository-info-section">
              <Flex vertical gap={0}>
                {repositoryInfoItems.map((item) => {
                  const content = (
                    <>
                      <Flex gap={8} align="center" className="repository-info-row-label">
                        {item.icon}
                        <Text>{item.label}</Text>
                      </Flex>
                      <Text strong>{item.value}</Text>
                    </>
                  )

                  return item.path ? (
                    <button
                      key={item.key}
                      type="button"
                      className="repository-info-row repository-info-row-clickable"
                      onClick={() => navigate(`/repositories/${repositoryId}/${item.path}`)}
                    >
                      {content}
                    </button>
                  ) : (
                    <Flex key={item.key} justify="space-between" align="center" gap={12} className="repository-info-row">
                      {content}
                    </Flex>
                  )
                })}
              </Flex>
            </section>
            <Divider />
            <section className="repository-transfer-section">
              <Title level={5}>최근 운영 이관</Title>
              {deploymentTransfers.length ? (
                <Flex vertical gap={10}>
                  {deploymentTransfers.slice(0, 3).map((item) => {
                    const statusMeta = getTransferStatusMeta(item)
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className="repository-transfer-row"
                        onClick={() => navigate(`/repositories/${repositoryId}/deployment-transfer/${item.id}`)}
                      >
                        <Flex vertical gap={4} align="flex-start">
                          <Text strong>{item.deploymentPlan?.changeReason ?? item.id}</Text>
                          <Text type="secondary">
                            {[
                              item.mrId ? `MR !${item.mrId}` : null,
                              item.pipelineId ? `Pipeline #${item.pipelineId}` : null,
                              item.scheduledAt ?? item.updatedAt,
                              item.requestedBy,
                            ].filter(Boolean).join(' · ')}
                          </Text>
                          <Tag color={statusMeta.color} className="status-tag-compact">{statusMeta.label}</Tag>
                        </Flex>
                      </button>
                    )
                  })}
                </Flex>
              ) : (
                <Text type="secondary">진행 중인 운영이관이 없습니다.</Text>
              )}
            </section>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
