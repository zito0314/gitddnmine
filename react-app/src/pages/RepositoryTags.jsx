import { CopyOutlined, EllipsisOutlined } from '../components/icons'
import { App as AntdApp, Button, Card, Dropdown, Empty, Flex, Input, Pagination, Result, Select, Segmented, Space, Tag, Tooltip, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getFilteredRepositoryTags, getRepositories, getRepositoryDetail } from '../api/repositories'
import { useAuth } from '../auth/AuthContext'
import { FilterBar, PageHeader } from '../components/common'

const { Search } = Input
const { Text } = Typography

const PAGE_SIZE = 10

const STATUS_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: 'Protected', value: 'protected' },
  { label: 'Release', value: 'release' },
]

const SORT_OPTIONS = [
  { value: 'latestUpdated', label: '최신 업데이트순' },
  { value: 'oldestUpdated', label: '오래된 업데이트순' },
  { value: 'name', label: '이름순' },
]

export default function RepositoryTags() {
  const { repositoryId } = useParams()
  const navigate = useNavigate()
  const auth = useAuth()
  const { message } = AntdApp.useApp()
  const repository = getRepositoryDetail(repositoryId)
  const repositories = useMemo(() => getRepositories(), [])
  const [status, setStatus] = useState('all')
  const [repoFilter, setRepoFilter] = useState(repositoryId)
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState('latestUpdated')
  const [page, setPage] = useState(1)
  const canManageTags = auth.isAdmin || auth.isInternalUser

  const tags = useMemo(
    () => getFilteredRepositoryTags({ repositoryId: repoFilter, status, keyword, sort }),
    [keyword, repoFilter, sort, status],
  )
  const pagedTags = tags.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

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

  const resetPage = (callback) => {
    callback()
    setPage(1)
  }

  const copyText = async (text) => {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text)
    message.success('복사되었습니다.')
  }

  const headerMenuItems = [
    canManageTags ? { key: 'release', label: 'Release 생성', onClick: () => message.info('Release 생성은 데모 기능입니다.') } : null,
    canManageTags ? { key: 'policy', label: 'Tag 보호 정책 보기', onClick: () => message.info('Tag 보호 정책 보기는 데모 기능입니다.') } : null,
    { key: 'export', label: 'Tag 목록 Export', onClick: () => message.info('Tag 목록 Export는 데모 기능입니다.') },
  ].filter(Boolean)

  const headerActions = (
    <Space>
      {canManageTags ? (
        <Button type="primary" onClick={() => message.info('Tag 생성은 데모 기능입니다.')}>
          Tag 생성
        </Button>
      ) : null}
      <Dropdown menu={{ items: headerMenuItems }} trigger={['click']} placement="bottomRight">
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
    </Space>
  )

  const repoOptions = [
    { value: '__all__', label: '전체 저장소' },
    ...repositories.map((item) => ({ value: item.id, label: item.name ?? item.id })),
  ]

  return (
    <Space orientation="vertical" size={16} className="page-stack repository-tags-page">
      <PageHeader
        title="Tags"
        description="배포 기준 태그와 릴리즈 이력을 확인합니다."
        actions={headerActions}
      />

      <FilterBar className="repository-tags-filter">
        <Segmented
          options={STATUS_OPTIONS}
          value={status}
          onChange={(value) => resetPage(() => setStatus(value))}
        />
        <Select
          value={repoFilter}
          onChange={(value) => resetPage(() => setRepoFilter(value))}
          options={repoOptions}
          placeholder="전체 저장소"
          className="filter-select filter-select--xl"
        />
        <Search
          allowClear
          placeholder="저장소명, 프로젝트명, 담당 조직 선택"
          value={keyword}
          onChange={(event) => resetPage(() => setKeyword(event.target.value))}
          className="filter-search-fill"
        />
        <Select
          value={sort}
          onChange={(value) => resetPage(() => setSort(value))}
          options={SORT_OPTIONS}
          className="filter-select filter-select--lg"
        />
      </FilterBar>

      <Card className="repository-tags-list-card">
        <Flex align="center" justify="space-between" className="repository-tags-list-head">
          <Text strong>{tags.length} Tags</Text>
        </Flex>
        <div className="repository-tags-list">
          {pagedTags.length > 0 ? (
            pagedTags.map((tag) => (
              <TagRow
                key={tag.id ?? `${tag.repositoryId}-${tag.name}`}
                tag={tag}
                repositoryId={tag.repositoryId ?? repositoryId}
                canManageTags={canManageTags}
                onCopy={copyText}
              />
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={(
                <Space orientation="vertical" size={4}>
                  <Text>표시할 Tag가 없습니다.</Text>
                  <Text type="secondary">검색 조건을 변경하거나 새 Tag를 생성해 주세요.</Text>
                  {canManageTags ? <Button type="primary" onClick={() => message.info('Tag 생성은 데모 기능입니다.')}>Tag 생성</Button> : null}
                </Space>
              )}
            />
          )}
        </div>
      </Card>

      {tags.length > PAGE_SIZE ? (
        <Flex justify="center">
          <Pagination current={page} pageSize={PAGE_SIZE} total={tags.length} showSizeChanger={false} onChange={setPage} />
        </Flex>
      ) : null}
    </Space>
  )
}

function TagRow({ tag, repositoryId, canManageTags, onCopy }) {
  const navigate = useNavigate()
  const { message } = AntdApp.useApp()
  const sha = tag.commitSha ?? tag.commit
  const shortSha = String(sha ?? '').slice(0, 8)
  const commitPath = `/repositories/${repositoryId}/commits/${sha}`
  const sourceFormats = tag.sourceDownloadFormats ?? ['zip', 'tar.gz', 'tar.bz2', 'tar']

  const menuItems = [
    { key: 'commit', label: 'Commit 보기', onClick: () => navigate(commitPath) },
    tag.isRelease ? { key: 'release', label: 'Release 보기', onClick: () => message.info('Release 보기는 데모 기능입니다.') } : null,
    { key: 'compare', label: 'Tag 비교', onClick: () => navigate(`/repositories/${repositoryId}/compare?tag=${encodeURIComponent(tag.name)}`) },
    {
      key: 'download',
      label: 'Source 다운로드',
      children: sourceFormats.map((format) => ({
        key: `download-${format}`,
        label: format,
        onClick: () => message.info(`${format} 다운로드는 데모 기능입니다.`),
      })),
    },
    canManageTags ? { type: 'divider' } : null,
    canManageTags ? { key: 'delete', label: 'Tag 삭제', danger: true, onClick: () => message.info('Tag 삭제는 데모 기능입니다.') } : null,
  ].filter(Boolean)

  return (
    <Flex align="center" justify="space-between" gap={16} className="repository-tags-row">
      <Space orientation="vertical" size={6} className="repository-tags-row-main">
        <Flex align="center" gap={8} wrap>
          <Link className="repository-tags-name" to={commitPath}>{tag.name}</Link>
          <Tooltip title="Tag name 복사">
            <Button type="text" size="small" icon={<CopyOutlined />} onClick={() => onCopy(tag.name)} />
          </Tooltip>
          {tag.isProtected ? <Tag color="success">Protected</Tag> : null}
          {tag.isRelease ? <Tag color="processing">Release</Tag> : null}
        </Flex>
        <Flex align="center" gap={8} wrap className="repository-tags-meta">
          {shortSha ? <Link to={commitPath}>{shortSha}</Link> : null}
          <Text type="secondary">{tag.commitMessage}</Text>
          <Text type="secondary">· {tag.author}</Text>
          <Text type="secondary">· {tag.updatedAtText}</Text>
        </Flex>
        {tag.releaseNote ? <Text type="secondary" className="repository-tags-release-note">{tag.releaseNote}</Text> : null}
      </Space>
      <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
    </Flex>
  )
}
