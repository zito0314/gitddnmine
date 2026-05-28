import {
  CopyOutlined,
  DownOutlined,
  GoBackOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from '../components/icons'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Descriptions,
  Dropdown,
  Empty,
  Flex,
  Input,
  Popover,
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

function getFileExtension(file) {
  if (file.extension) return file.extension
  const match = file.path.match(/\.[^.\\/]+$/)
  return match?.[0] ?? 'no extension'
}

function getExtensionOptions(files) {
  const counts = new Map()
  files.forEach((file) => {
    const extension = getFileExtension(file)
    counts.set(extension, (counts.get(extension) ?? 0) + 1)
  })
  return [...counts.entries()].map(([extension, count]) => ({ extension, count }))
}

function filterFilesByExtension(files, selectedExtensions) {
  if (!selectedExtensions.length) return []
  return files.filter((file) => selectedExtensions.includes(getFileExtension(file)))
}

function getVisibleDiffLines(file, { expandedCollapsedIds, hideWhitespace }) {
  if (!file?.diff) return []
  return file.diff.filter((line) => {
    if (line.type === 'collapsed' && expandedCollapsedIds.includes(line.id)) return false
    if (!hideWhitespace) return true
    if (!['added', 'removed'].includes(line.type)) return true
    const content = [line.oldContent, line.newContent, line.content].join('')
    return content.trim().length > 0
  })
}

function renderHighlightedText(value, searchText) {
  const text = String(value ?? '')
  const query = searchText.trim()
  if (!query) return text
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'))
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={`${part}-${index}`} className="commit-code-highlight">{part}</mark>
      : part,
  )
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getPipelineMeta(status) {
  return PIPELINE_STATUS[status] ?? PIPELINE_STATUS.none
}

function CommitDiffToolbar({
  codeSearch,
  compactLineHeight,
  file,
  filesCollapsed,
  hideWhitespace,
  layout,
  minimizeComments,
  onAskAboutDiff,
  onSearch,
  onViewFile,
  setCompactLineHeight,
  setFilesCollapsed,
  setHideWhitespace,
  setLayout,
  setMinimizeComments,
}) {
  return (
    <Flex justify="space-between" align="center" gap={12} wrap="wrap" className="commit-diff-toolbar">
      <Space wrap>
        <Button icon={filesCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setFilesCollapsed(!filesCollapsed)} />
        <Input.Search
          allowClear
          placeholder="Search within code"
          value={codeSearch}
          onChange={(event) => onSearch(event.target.value)}
          onSearch={onSearch}
          style={{ width: 260 }}
        />
      </Space>
      <Space wrap>
        <CommitDiffSettingsPopover
          compactLineHeight={compactLineHeight}
          hideWhitespace={hideWhitespace}
          layout={layout}
          minimizeComments={minimizeComments}
          setCompactLineHeight={setCompactLineHeight}
          setHideWhitespace={setHideWhitespace}
          setLayout={setLayout}
          setMinimizeComments={setMinimizeComments}
        />
        <Segmented
          value={layout === 'split' ? 'diff' : 'inline'}
          onChange={(value) => setLayout(value === 'diff' ? 'split' : 'unified')}
          options={[
            { value: 'diff', label: 'Diff' },
            { value: 'inline', label: 'Inline' },
          ]}
        />
        <CommitFileActionsMenu file={file} onAskAboutDiff={onAskAboutDiff} onViewFile={onViewFile} />
      </Space>
    </Flex>
  )
}

function CommitDiffSettingsPopover({
  compactLineHeight,
  hideWhitespace,
  layout,
  minimizeComments,
  setCompactLineHeight,
  setHideWhitespace,
  setLayout,
  setMinimizeComments,
}) {
  return (
    <Popover
      trigger="click"
      title="Layout"
      content={(
        <Space direction="vertical">
          <Button type={layout === 'unified' ? 'primary' : 'text'} onClick={() => setLayout('unified')}>Unified</Button>
          <Button type={layout === 'split' ? 'primary' : 'text'} onClick={() => setLayout('split')}>Split</Button>
          <Checkbox checked={minimizeComments} onChange={(event) => setMinimizeComments(event.target.checked)}>Minimize comments</Checkbox>
          <Checkbox checked={hideWhitespace} onChange={(event) => setHideWhitespace(event.target.checked)}>Hide whitespace</Checkbox>
          <Checkbox checked={compactLineHeight} onChange={(event) => setCompactLineHeight(event.target.checked)}>Compact line height</Checkbox>
        </Space>
      )}
    >
      <Button icon={<SettingOutlined />} />
    </Popover>
  )
}

function CommitFileActionsMenu({ file, onAskAboutDiff, onViewFile }) {
  return (
    <Dropdown
      menu={{
        items: [
          { key: 'view-file', label: 'View file' },
          { key: 'ask-diff', label: 'Ask about this diff' },
        ],
        onClick: ({ key, domEvent }) => {
          domEvent.stopPropagation()
          if (!file) return
          if (key === 'view-file') onViewFile(file)
          if (key === 'ask-diff') onAskAboutDiff(file)
        },
      }}
    >
      <Button icon={<DownOutlined />} onClick={(event) => event.stopPropagation()} />
    </Dropdown>
  )
}

function CommitFileHeader({ file, onAskAboutDiff, onCopyFilePath, onExpandAllLines, onViewFile }) {
  const distribution = file.changeDistribution?.length ? file.changeDistribution : ['neutral']

  return (
    <Flex align="center" justify="space-between" gap={12} wrap="wrap" className="commit-file-header">
      <Space size={4} wrap className="commit-file-path">
        <Text code>{file.path}</Text>
        <Tooltip title="Copy file name to clipboard">
          <Button size="small" type="text" icon={<CopyOutlined />} onClick={() => onCopyFilePath(file)} />
        </Tooltip>
        <Tooltip title={`Expand all lines: ${file.path}`}>
          <Button size="small" type="text" onClick={() => onExpandAllLines(file)}>전체 라인 펼치기</Button>
        </Tooltip>
      </Space>
      <Space size={8} wrap>
        <Space size={4} className="commit-change-distribution">
          {distribution.map((type, index) => (
            <span key={`${type}-${index}`} className={`commit-change-dot commit-change-dot-${type}`} />
          ))}
        </Space>
        <Text className="commit-change-summary commit-change-summary-added">+{file.additions}</Text>
        <Text className="commit-change-summary commit-change-summary-removed">-{file.deletions}</Text>
        <CommitFileActionsMenu file={file} onAskAboutDiff={onAskAboutDiff} onViewFile={onViewFile} />
      </Space>
    </Flex>
  )
}

function CommitFilesPanel({
  extensionOptions,
  fileSearch,
  filteredFiles,
  selectedExtensions,
  selectedFile,
  setFileSearch,
  setFilesCollapsed,
  setSelectedExtensions,
  setSelectedFileId,
  treeData,
}) {
  const extensionContent = (
    <Space direction="vertical">
      <Checkbox.Group value={selectedExtensions} onChange={setSelectedExtensions}>
        <Space direction="vertical">
          {extensionOptions.map((item) => (
            <Checkbox key={item.extension} value={item.extension}>
              <Space>
                <Text>{item.extension}</Text>
                <Badge count={item.count} />
              </Space>
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </Space>
  )

  return (
    <Card
      size="small"
      title="Files"
      extra={<Button size="small" icon={<MenuFoldOutlined />} onClick={() => setFilesCollapsed(true)} />}
      className="commit-files-panel"
    >
      <Space.Compact style={{ width: '100%', marginBottom: 12 }}>
        <Input.Search
          allowClear
          placeholder="Filter files..."
          value={fileSearch}
          onChange={(event) => setFileSearch(event.target.value)}
        />
        <Popover trigger="click" title="File extensions" content={extensionContent}>
          <Button>Filter</Button>
        </Popover>
      </Space.Compact>
      {filteredFiles.length ? (
        <Tree
          treeData={treeData}
          selectedKeys={[selectedFile?.id]}
          defaultExpandAll
          onSelect={(keys) => {
            const key = keys[0]
            const nextFile = filteredFiles.find((file) => file.id === key)
            if (nextFile) setSelectedFileId(nextFile.id)
          }}
        />
      ) : (
        <Empty description="조건에 맞는 파일이 없어요." />
      )}
    </Card>
  )
}

export default function RepositoryCommitDetail() {
  const { repositoryId, commitSha } = useParams()
  const navigate = useNavigate()
  const repository = getRepositoryDetail(repositoryId)
  const commit = getCommitDetail(repositoryId, commitSha)
  const [fileSearch, setFileSearch] = useState('')
  const [filesCollapsed, setFilesCollapsed] = useState(false)
  const [selectedFileId, setSelectedFileId] = useState(commit?.files?.[0]?.id)
  const [commentLineId, setCommentLineId] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const [codeSearch, setCodeSearch] = useState('')
  const [layout, setLayout] = useState('split')
  const [minimizeComments, setMinimizeComments] = useState(false)
  const [hideWhitespace, setHideWhitespace] = useState(false)
  const [compactLineHeight, setCompactLineHeight] = useState(false)
  const extensionOptions = getExtensionOptions(commit?.files ?? [])
  const [selectedExtensions, setSelectedExtensions] = useState(extensionOptions.map((item) => item.extension))
  const [expandedCollapsedIds, setExpandedCollapsedIds] = useState([])

  const author = commit ? getAuthor(commit) : null
  const extensionFilteredFiles = filterFilesByExtension(commit?.files ?? [], selectedExtensions)
  const filteredFiles = filterFiles(extensionFilteredFiles, fileSearch)
  const treeData = buildTree(filteredFiles)
  const selectedFile = commit?.files.find((file) => file.id === selectedFileId) ?? filteredFiles[0] ?? commit?.files?.[0]
  const pipelineMeta = getPipelineMeta(commit?.pipeline?.status)
  const effectiveMode = layout === 'split' ? 'diff' : 'inline'

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

  const searchWithinCode = (value) => {
    setCodeSearch(value)
    const query = value.trim().toLowerCase()
    if (!query || !selectedFile) return
    const hasMatch = selectedFile.diff.some((line) =>
      [line.oldContent, line.newContent, line.content].join(' ').toLowerCase().includes(query),
    )
    if (!hasMatch) message.info('검색 결과가 없어요.')
  }

  const copyFilePath = async (file) => {
    try {
      await navigator.clipboard.writeText(file.path)
      message.success('파일 경로를 복사했어요.')
    } catch {
      message.error('파일 경로를 복사하지 못했어요.')
    }
  }

  const expandAllLines = (file) => {
    setExpandedCollapsedIds((ids) => [...new Set([...ids, ...file.diff.filter((line) => line.type === 'collapsed').map((line) => line.id)])])
    message.success('숨겨진 라인을 모두 펼쳤어요.')
  }

  const viewFile = (file) => {
    message.info(`${file.name ?? file.path} 파일 화면으로 이동합니다.`)
    navigate(`/repositories/${repositoryId}/files`)
  }

  const askAboutDiff = () => {
    message.info('이 Diff에 대해 질문합니다.')
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
        <CommitDiffToolbar
          codeSearch={codeSearch}
          compactLineHeight={compactLineHeight}
          file={selectedFile}
          filesCollapsed={filesCollapsed}
          hideWhitespace={hideWhitespace}
          layout={layout}
          minimizeComments={minimizeComments}
          setCompactLineHeight={setCompactLineHeight}
          setFilesCollapsed={setFilesCollapsed}
          setHideWhitespace={setHideWhitespace}
          setLayout={(nextLayout) => {
            setLayout(nextLayout)
          }}
          setMinimizeComments={setMinimizeComments}
          onAskAboutDiff={askAboutDiff}
          onSearch={searchWithinCode}
          onViewFile={viewFile}
        />
        <div className={`commit-diff-layout ${filesCollapsed ? 'commit-diff-layout-collapsed' : ''}`}>
          {!filesCollapsed ? (
            <CommitFilesPanel
              extensionOptions={extensionOptions}
              fileSearch={fileSearch}
              filteredFiles={filteredFiles}
              selectedExtensions={selectedExtensions}
              selectedFile={selectedFile}
              setFileSearch={setFileSearch}
              setFilesCollapsed={setFilesCollapsed}
              setSelectedExtensions={setSelectedExtensions}
              setSelectedFileId={setSelectedFileId}
              treeData={treeData}
            />
          ) : (
            <Button icon={<MenuUnfoldOutlined />} onClick={() => setFilesCollapsed(false)}>Files</Button>
          )}
          <DiffViewer
            comments={comments}
            compactLineHeight={compactLineHeight}
            expandedCollapsedIds={expandedCollapsedIds}
            file={selectedFile}
            hideWhitespace={hideWhitespace}
            minimizeComments={minimizeComments}
            mode={effectiveMode}
            searchText={codeSearch}
            commentLineId={commentLineId}
            commentText={commentText}
            onAskAboutDiff={askAboutDiff}
            onCopyFilePath={copyFilePath}
            onExpandAllLines={expandAllLines}
            onToggleCollapsed={(lineId) => setExpandedCollapsedIds((ids) => [...new Set([...ids, lineId])])}
            onViewFile={viewFile}
            setCommentLineId={setCommentLineId}
            setCommentText={setCommentText}
            submitComment={submitComment}
          />
        </div>
      </Card>
    </Space>
  )
}

function DiffViewer({
  comments,
  compactLineHeight,
  expandedCollapsedIds,
  file,
  hideWhitespace,
  minimizeComments,
  mode,
  searchText,
  commentLineId,
  commentText,
  onAskAboutDiff,
  onCopyFilePath,
  onExpandAllLines,
  onToggleCollapsed,
  onViewFile,
  setCommentLineId,
  setCommentText,
  submitComment,
}) {
  if (!file) {
    return (
      <Card className="commit-diff-viewer">
        <Empty description="표시할 Diff가 없어요." />
      </Card>
    )
  }

  const visibleLines = getVisibleDiffLines(file, { expandedCollapsedIds, hideWhitespace })

  return (
    <Card
      className={`commit-diff-viewer ${compactLineHeight ? 'commit-diff-compact' : ''}`}
      title={(
        <CommitFileHeader
          file={file}
          onAskAboutDiff={onAskAboutDiff}
          onCopyFilePath={onCopyFilePath}
          onExpandAllLines={onExpandAllLines}
          onViewFile={onViewFile}
        />
      )}
    >
      {mode === 'diff' ? (
        <SideBySideDiff
          comments={comments}
          commentLineId={commentLineId}
          commentText={commentText}
          lines={visibleLines}
          minimizeComments={minimizeComments}
          searchText={searchText}
          onToggleCollapsed={onToggleCollapsed}
          setCommentLineId={setCommentLineId}
          setCommentText={setCommentText}
          submitComment={submitComment}
        />
      ) : (
        <InlineDiff
          comments={comments}
          commentLineId={commentLineId}
          commentText={commentText}
          lines={visibleLines}
          minimizeComments={minimizeComments}
          searchText={searchText}
          onToggleCollapsed={onToggleCollapsed}
          setCommentLineId={setCommentLineId}
          setCommentText={setCommentText}
          submitComment={submitComment}
        />
      )}
    </Card>
  )
}

function SideBySideDiff({
  comments,
  commentLineId,
  commentText,
  lines,
  minimizeComments,
  searchText,
  onToggleCollapsed,
  setCommentLineId,
  setCommentText,
  submitComment,
}) {
  return (
    <div className="commit-diff-table">
      {lines.map((line) => (
        <div key={line.id}>
          {line.type === 'hunk' ? (
            <div className="commit-diff-hunk">{renderHighlightedText(line.content, searchText)}</div>
          ) : line.type === 'collapsed' ? (
            <button className="commit-diff-collapsed" onClick={() => onToggleCollapsed(line.id)}>
              {line.hiddenLinesCount ?? 0} lines hidden
            </button>
          ) : (
            <button className={`commit-diff-row commit-diff-row-${line.type}`} onClick={() => setCommentLineId(line.id)}>
              <span className="commit-line-number">{line.oldLine ?? ''}</span>
              <span className="commit-code-text">{renderHighlightedText(line.oldContent, searchText)}</span>
              <span className="commit-line-number">{line.newLine ?? ''}</span>
              <span className="commit-code-text">{renderHighlightedText(line.newContent, searchText)}</span>
            </button>
          )}
          <LineComments comments={comments.filter((comment) => comment.lineId === line.id)} minimized={minimizeComments} />
          {commentLineId === line.id ? <CommentEditor commentText={commentText} setCommentText={setCommentText} submitComment={submitComment} onCancel={() => setCommentLineId(null)} /> : null}
        </div>
      ))}
    </div>
  )
}

function InlineDiff({
  comments,
  commentLineId,
  commentText,
  lines,
  minimizeComments,
  searchText,
  onToggleCollapsed,
  setCommentLineId,
  setCommentText,
  submitComment,
}) {
  return (
    <div className="commit-inline-diff">
      {lines.map((line) => (
        <div key={line.id}>
          {line.type === 'hunk' ? (
            <div className="commit-diff-hunk">{renderHighlightedText(line.content, searchText)}</div>
          ) : line.type === 'collapsed' ? (
            <button className="commit-diff-collapsed" onClick={() => onToggleCollapsed(line.id)}>
              {line.hiddenLinesCount ?? 0} lines hidden
            </button>
          ) : (
            <button className={`commit-inline-row commit-diff-row-${line.type}`} onClick={() => setCommentLineId(line.id)}>
              <span className="commit-line-number">{line.oldLine ?? line.newLine}</span>
              <span className="commit-line-sign">{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}</span>
              <span className="commit-code-text">{renderHighlightedText(line.type === 'removed' ? line.oldContent : line.newContent, searchText)}</span>
            </button>
          )}
          <LineComments comments={comments.filter((comment) => comment.lineId === line.id)} minimized={minimizeComments} />
          {commentLineId === line.id ? <CommentEditor commentText={commentText} setCommentText={setCommentText} submitComment={submitComment} onCancel={() => setCommentLineId(null)} /> : null}
        </div>
      ))}
    </div>
  )
}

function LineComments({ comments, minimized }) {
  if (!comments.length) return null
  if (minimized) {
    return <Text className="commit-comment-minimized">{comments.length}개 코멘트</Text>
  }
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
