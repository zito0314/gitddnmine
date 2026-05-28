import {
  CopyOutlined,
  GoBackOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '../components/icons'
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Empty,
  Flex,
  Input,
  Result,
  Segmented,
  Space,
  Tag,
  Tooltip,
  Tree,
  Typography,
  message,
} from 'antd'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCommitDetail, getRepositoryDetail } from '../api/repositories'

const { Text, Title } = Typography
const { TextArea } = Input

const PIPELINE_STATUS = {
  passed: { label: 'Pipeline 성공', color: 'success' },
  failed: { label: 'Pipeline 실패', color: 'error' },
  running: { label: 'Pipeline 실행 중', color: 'processing' },
  manual: { label: 'Pipeline Manual', color: 'warning' },
  canceled: { label: 'Pipeline Canceled', color: 'default' },
  none: { label: 'Pipeline 없음', color: 'default' },
}

function getAuthor(commit) {
  return typeof commit.author === 'string' ? { name: commit.author, avatarUrl: '' } : commit.author
}

function buildTree(files) {
  const root = []
  const nodeMap = new Map()

  files.forEach((file) => {
    const parts = file.treePath?.length ? file.treePath : file.path.split('/')
    let path = ''
    let children = root
    parts.forEach((part, index) => {
      path = path ? `${path}/${part}` : part
      const isLeaf = index === parts.length - 1
      if (!nodeMap.has(path)) {
        const node = {
          title: part,
          key: isLeaf ? file.id : path,
          children: isLeaf ? undefined : [],
        }
        nodeMap.set(path, node)
        children.push(node)
      }
      const node = nodeMap.get(path)
      if (!isLeaf) children = node.children
    })
  })

  return root
}

function filterFiles(files, keyword) {
  const query = keyword.trim().toLowerCase()
  if (!query) return files
  return files.filter((file) => [file.path, file.name].join(' ').toLowerCase().includes(query))
}

function getPipelineMeta(status) {
  return PIPELINE_STATUS[status] ?? PIPELINE_STATUS.none
}

export default function RepositoryCommitDetail() {
  const { repositoryId, commitSha } = useParams()
  const navigate = useNavigate()
  const repository = getRepositoryDetail(repositoryId)
  const commit = getCommitDetail(repositoryId, commitSha)
  const [viewMode, setViewMode] = useState('diff')
  const [fileSearch, setFileSearch] = useState('')
  const [filesCollapsed, setFilesCollapsed] = useState(false)
  const [selectedFileId, setSelectedFileId] = useState(commit?.files?.[0]?.id)
  const [commentLineId, setCommentLineId] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])

  const author = commit ? getAuthor(commit) : null
  const filteredFiles = filterFiles(commit?.files ?? [], fileSearch)
  const treeData = buildTree(filteredFiles)
  const selectedFile = commit?.files.find((file) => file.id === selectedFileId) ?? filteredFiles[0] ?? commit?.files?.[0]
  const pipelineMeta = getPipelineMeta(commit?.pipeline?.status)

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

  if (!commit) {
    return (
      <Result
        status="404"
        title="Commit 상세"
        subTitle="삭제되었거나 접근 권한이 없는 Commit일 수 있어요."
        extra={<Button type="primary" onClick={() => navigate(`/repositories/${repositoryId}/commits`)}>Commits로 돌아가기</Button>}
      />
    )
  }

  const copySha = async () => {
    try {
      await navigator.clipboard.writeText(commit.sha)
    } catch {
      // Clipboard can be unavailable in local previews.
    }
    message.success('Commit SHA를 복사했어요.')
  }

  const submitComment = () => {
    const value = commentText.trim()
    if (!value) {
      message.warning('코멘트를 입력해 주세요.')
      return
    }
    setComments((items) => [
      ...items,
      {
        id: `comment-${Date.now()}`,
        lineId: commentLineId ?? selectedFile?.diff?.[0]?.id,
        text: value,
      },
    ])
    setCommentText('')
    setCommentLineId(null)
    message.success('코멘트를 작성했어요.')
  }

  const openPipeline = () => {
    if (!commit.pipeline?.id) {
      message.info('연결된 Pipeline으로 이동합니다.')
      return
    }
    navigate(`/repositories/${repositoryId}/pipelines/${commit.pipeline.id}`)
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }} className="commit-detail-page">
      <Card>
        <Flex align="flex-start" justify="space-between" gap={16} wrap="wrap">
          <Space align="start">
            <Button icon={<GoBackOutlined />} onClick={() => navigate(-1)} />
            <Space direction="vertical" size={8}>
              <Title level={2}>{commit.message}</Title>
              <Space wrap>
                <Tag>Commit</Tag>
                <Text code>{commit.sha}</Text>
                <Tooltip title="SHA 복사">
                  <Button size="small" icon={<CopyOutlined />} onClick={copySha} />
                </Tooltip>
                <Text type="secondary">{commit.createdAtText}</Text>
                <Avatar src={author?.avatarUrl}>{(author?.name ?? 'G').slice(0, 1)}</Avatar>
                <Text>{author?.name}</Text>
              </Space>
            </Space>
          </Space>
          <Button onClick={() => navigate(`/repositories/${repositoryId}/commits`)}>Commits로 돌아가기</Button>
        </Flex>
      </Card>

      <Card title="Commit 연결 정보">
        <Descriptions column={{ xs: 1, md: 2 }} bordered size="small">
          <Descriptions.Item label="Parent Commit">
            <Typography.Link onClick={() => message.info('Parent Commit으로 이동합니다.')}>{commit.parentCommitSha}</Typography.Link>
          </Descriptions.Item>
          <Descriptions.Item label="Branches">
            <Space wrap>{commit.branches.map((branch) => <Tag key={branch}>{branch}</Tag>)}</Space>
          </Descriptions.Item>
          <Descriptions.Item label="Tags">
            {commit.tags.length ? <Space wrap>{commit.tags.map((tag) => <Tag key={tag} color="blue">{tag}</Tag>)}</Space> : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Merge request">
            {commit.mergeRequests.length ? (
              <Space wrap>
                {commit.mergeRequests.map((mr) => (
                  <Link key={mr.id} to={`/repositories/${repositoryId}/merge-requests/${mr.number.replace('!', '')}`}>{mr.number} {mr.title}</Link>
                ))}
              </Space>
            ) : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Pipeline" span={2}>
            <Space wrap>
              <Tag color={pipelineMeta.color}>{commit.pipeline.statusLabel ?? pipelineMeta.label}</Tag>
              {commit.pipeline.id ? <Typography.Link onClick={openPipeline}>{commit.pipeline.number}</Typography.Link> : <Text>{commit.pipeline.number}</Text>}
              <Text type="secondary">{commit.pipeline.finishedAtText}</Text>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card>
        <Flex justify="space-between" align="center" gap={12} wrap="wrap" className="commit-diff-toolbar">
          <Space wrap>
            <Text strong>변경 파일</Text>
            <Tag>{commit.summary.fileCount} file</Tag>
            <Tag color="success">+{commit.summary.additions}</Tag>
            <Tag color="error">-{commit.summary.deletions}</Tag>
          </Space>
          <Segmented
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'diff', label: 'Diff' },
              { value: 'inline', label: 'Inline' },
            ]}
          />
        </Flex>
        <div className={`commit-diff-layout ${filesCollapsed ? 'commit-diff-layout-collapsed' : ''}`}>
          {!filesCollapsed ? (
            <Card
              size="small"
              title="Files"
              extra={<Button size="small" icon={<MenuFoldOutlined />} onClick={() => setFilesCollapsed(true)} />}
              className="commit-files-panel"
            >
              <Input.Search
                allowClear
                placeholder="Commit 메시지, SHA를 검색해 주세요."
                value={fileSearch}
                onChange={(event) => setFileSearch(event.target.value)}
                className="commit-file-search"
              />
              {filteredFiles.length ? (
                <Tree
                  treeData={treeData}
                  selectedKeys={[selectedFile?.id]}
                  defaultExpandAll
                  onSelect={(keys) => {
                    const key = keys[0]
                    const nextFile = commit.files.find((file) => file.id === key)
                    if (nextFile) setSelectedFileId(nextFile.id)
                  }}
                />
              ) : (
                <Empty description="조건에 맞는 파일이 없어요." />
              )}
            </Card>
          ) : (
            <Button icon={<MenuUnfoldOutlined />} onClick={() => setFilesCollapsed(false)}>Files</Button>
          )}
          <DiffViewer
            comments={comments}
            file={selectedFile}
            mode={viewMode}
            commentLineId={commentLineId}
            commentText={commentText}
            setCommentLineId={setCommentLineId}
            setCommentText={setCommentText}
            submitComment={submitComment}
          />
        </div>
      </Card>
    </Space>
  )
}

function DiffViewer({ comments, file, mode, commentLineId, commentText, setCommentLineId, setCommentText, submitComment }) {
  if (!file) {
    return (
      <Card className="commit-diff-viewer">
        <Empty description="표시할 Diff가 없어요." />
      </Card>
    )
  }

  return (
    <Card
      className="commit-diff-viewer"
      title={<Text code>{file.path}</Text>}
      extra={<Space><Tag color="success">+{file.additions}</Tag><Tag color="error">-{file.deletions}</Tag></Space>}
    >
      {mode === 'diff' ? (
        <SideBySideDiff file={file} comments={comments} commentLineId={commentLineId} commentText={commentText} setCommentLineId={setCommentLineId} setCommentText={setCommentText} submitComment={submitComment} />
      ) : (
        <InlineDiff file={file} comments={comments} commentLineId={commentLineId} commentText={commentText} setCommentLineId={setCommentLineId} setCommentText={setCommentText} submitComment={submitComment} />
      )}
    </Card>
  )
}

function SideBySideDiff({ file, comments, commentLineId, commentText, setCommentLineId, setCommentText, submitComment }) {
  return (
    <div className="commit-diff-table">
      {file.diff.map((line) => (
        <div key={line.id}>
          {line.type === 'hunk' ? (
            <div className="commit-diff-hunk">{line.content}</div>
          ) : (
            <button className={`commit-diff-row commit-diff-row-${line.type}`} onClick={() => setCommentLineId(line.id)}>
              <span className="commit-line-number">{line.oldLine ?? ''}</span>
              <span className="commit-code-text">{line.oldContent}</span>
              <span className="commit-line-number">{line.newLine ?? ''}</span>
              <span className="commit-code-text">{line.newContent}</span>
            </button>
          )}
          <LineComments comments={comments.filter((comment) => comment.lineId === line.id)} />
          {commentLineId === line.id ? <CommentEditor commentText={commentText} setCommentText={setCommentText} submitComment={submitComment} onCancel={() => setCommentLineId(null)} /> : null}
        </div>
      ))}
    </div>
  )
}

function InlineDiff({ file, comments, commentLineId, commentText, setCommentLineId, setCommentText, submitComment }) {
  return (
    <div className="commit-inline-diff">
      {file.diff.map((line) => (
        <div key={line.id}>
          {line.type === 'hunk' ? (
            <div className="commit-diff-hunk">{line.content}</div>
          ) : (
            <button className={`commit-inline-row commit-diff-row-${line.type}`} onClick={() => setCommentLineId(line.id)}>
              <span className="commit-line-number">{line.oldLine ?? line.newLine}</span>
              <span className="commit-line-sign">{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}</span>
              <span className="commit-code-text">{line.type === 'removed' ? line.oldContent : line.newContent}</span>
            </button>
          )}
          <LineComments comments={comments.filter((comment) => comment.lineId === line.id)} />
          {commentLineId === line.id ? <CommentEditor commentText={commentText} setCommentText={setCommentText} submitComment={submitComment} onCancel={() => setCommentLineId(null)} /> : null}
        </div>
      ))}
    </div>
  )
}

function LineComments({ comments }) {
  if (!comments.length) return null
  return (
    <Space direction="vertical" className="commit-line-comments">
      {comments.map((comment) => <Text key={comment.id}>{comment.text}</Text>)}
    </Space>
  )
}

function CommentEditor({ commentText, setCommentText, submitComment, onCancel }) {
  return (
    <Card size="small" className="commit-comment-editor">
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <TextArea
          autoSize={{ minRows: 2, maxRows: 5 }}
          placeholder="코멘트를 작성해 주세요."
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <Space>
          <Button type="primary" onClick={submitComment}>코멘트 작성</Button>
          <Button onClick={onCancel}>취소</Button>
        </Space>
      </Space>
    </Card>
  )
}
