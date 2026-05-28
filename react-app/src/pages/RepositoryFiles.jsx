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
  Empty,
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
import { useParams } from 'react-router-dom'
import {
  getRepositoryBranches,
  getRepositoryCommitSummary,
  getRepositoryCommits,
  getRepositoryDetail,
  getRepositoryFiles,
  getRepositoryTags,
} from '../api/repositories'
import { getDeploymentTransfersByRepositoryId } from '../api/deploymentTransfers'
import { StatusTag } from '../components/common'
import RepositoryAvatar from '../components/repository/RepositoryAvatar'
import { UI_TEXT } from '../constants'

const { Paragraph, Text, Title } = Typography

const downloadOptions = ['zip', 'tar.gz', 'tar.bz2', 'tar']

function getMetricValue(repository, label, fallback) {
  return repository.metrics?.find((metric) => metric.label === label)?.value ?? fallback
}

function getTransferStatusLabel(transfer) {
  if (transfer.approvalStatus === 'pending') return '승인 대기'
  if (transfer.status === 'scheduled') return '반영 대기'
  if (transfer.status === 'approved') return '이관 완료'
  if (transfer.status === 'blocked') return '차단'
  return transfer.status
}

export default function RepositoryFiles() {
  const { repositoryId } = useParams()
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
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        {[
          { title: 'Web IDE', actions: [<Button key="open" size="small">.</Button>] },
          { title: 'Visual Studio Code', actions: [<Segmented key="protocol" options={['SSH', 'HTTPS']} />] },
          { title: 'IntelliJ IDEA', actions: [<Segmented key="protocol" options={['SSH', 'HTTPS']} />] },
        ].map((item) => (
          <Flex key={item.title} align="center" justify="space-between" gap={12}>
            <Text>{item.title}</Text>
            <Space>{item.actions}</Space>
          </Flex>
        ))}
      </Space>
      <Divider />
      <Title level={5}>Download source code</Title>
      <Segmented block options={downloadOptions} />
    </div>
  )

  const repositoryInfoItems = [
    { key: 'commits', icon: <GitCommitOutlined />, label: `${getMetricValue(repository, 'Commits', commitSummary.total)} Commits` },
    { key: 'branches', icon: <BranchesOutlined />, label: `${getMetricValue(repository, 'Branches', branches.length)} Branches` },
    { key: 'tags', icon: <TagOutlined />, label: `${getMetricValue(repository, 'Tags', tags.length)} Tags` },
    { key: 'storage', icon: <DatabaseOutlined />, label: `${getMetricValue(repository, 'Project Storage', '4 KiB')} Project Storage` },
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
            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              {repositoryInfoItems.map((item) => (
                <Flex key={item.key} align="center">
                  <Space>
                    {item.icon}
                    <Text strong>{item.label}</Text>
                  </Space>
                </Flex>
              ))}
            </Space>
            <Divider />
            <Space direction="vertical" size={6}>
              <Text strong>생성일</Text>
              <Text type="secondary">2024.06.13</Text>
            </Space>
            <Divider />
            <Title level={5}>최근 운영 이관</Title>
            {deploymentTransfers.length ? (
              <Space direction="vertical" size={14} className="repository-transfer-list">
                {deploymentTransfers.slice(0, 3).map((item) => (
                  <Space key={item.id} direction="vertical" size={4}>
                    <Text strong>({getTransferStatusLabel(item)}) {item.deploymentPlan?.changeReason ?? item.id}</Text>
                    <Text type="secondary">{item.deploymentPlan?.checklistNote ?? '운영 반영 검토가 진행 중입니다.'}</Text>
                    <Button type="link" size="small">진행 현황 보기 →</Button>
                  </Space>
                ))}
              </Space>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="진행 중인 운영이관이 없습니다." />
            )}
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
