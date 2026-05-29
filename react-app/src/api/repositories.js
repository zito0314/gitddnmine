import { findById, getMockSlice } from './mockClient'
import { filterRepositoriesByAccess, getStoredAuthUser } from '../auth/permissions'
import { applyRepositoryFavorites, sortRepositoriesByFavorite } from '../utils/favorites'

export function getRepositories() {
  const repositories = applyRepositoryFavorites(getMockSlice((data) => data.repositories.list, []))
  return sortRepositoriesByFavorite(filterRepositoriesByAccess(repositories, getStoredAuthUser()))
}

export function getRepositoryRequests() {
  return getMockSlice((data) => data.repositories.requests, [])
}

export function getRepositoryProjectTemplates() {
  return [...getMockSlice((data) => data.repositories.projectTemplates, [])].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999),
  )
}

export function getEnabledRepositoryProjectTemplates() {
  return getRepositoryProjectTemplates().filter((template) => template.enabled !== false)
}

export function getRepositoryById(repositoryId) {
  const repositories = getRepositories()
  const repository = findById(repositories, repositoryId)
  return repository ?? null
}

export function getRepositoryDetail(repositoryId) {
  const repository = getRepositoryById(repositoryId)
  const detail = getMockSlice((data) => data.repositories.detail, {})

  if (detail?.id === repositoryId) {
    return { ...repository, ...detail }
  }

  return repository ?? null
}

export function getRepositoryMergeRequests(repositoryId) {
  return getMockSlice((data) => data.mergeRequests.list, []).filter((mr) => mr.repo === repositoryId)
}

export function getRepositoryMergeRequestSummary(repositoryId) {
  const mergeRequests = getRepositoryMergeRequests(repositoryId)

  return {
    open: mergeRequests.filter((mr) => mr.status === 'open').length,
    reviewRequired: mergeRequests.filter((mr) => mr.review === 'need-review').length,
    pipelineFailed: mergeRequests.filter((mr) => mr.pipeline === 'failed').length,
    securityBlocked: mergeRequests.filter(
      (mr) => mr.security === 'failed' || mr.security === 'blocked' || mr.status === 'blocked',
    ).length,
    readyToMerge: mergeRequests.filter(
      (mr) =>
        mr.status === 'open' &&
        mr.approved >= mr.required &&
        mr.pipeline === 'passed' &&
        mr.security === 'passed',
    ).length,
  }
}

export function getRepositoryPipelines(repositoryId) {
  return getMockSlice((data) => data.pipelines.list, []).filter((pipeline) => pipeline.repo === repositoryId)
}

export function getRepositorySecurityValidations(repositoryId) {
  return getMockSlice((data) => data.security.validations, []).filter(
    (validation) => validation.repo === repositoryId,
  )
}

export function getRepositorySecuritySummary(repositoryId) {
  const validations = getRepositorySecurityValidations(repositoryId)
  const totals = validations.reduce(
    (summary, validation) => {
      summary.critical += validation.severity?.critical ?? 0
      summary.high += validation.severity?.high ?? 0
      summary.medium += validation.severity?.medium ?? 0
      summary.low += validation.severity?.low ?? 0
      if (validation.policy === 'blocked') summary.blocked += 1
      if (validation.vstatus === 'failed') summary.failed += 1
      return summary
    },
    { critical: 0, high: 0, medium: 0, low: 0, blocked: 0, failed: 0 },
  )

  return {
    total: validations.length,
    validations,
    ...totals,
  }
}

export function getRepositoryActivities(repositoryId) {
  return getMockSlice((data) => data.activities, []).filter(
    (activity) => activity.repositoryId === repositoryId,
  )
}

export function getRepositoryActivitySummary(repositoryId) {
  const activities = getRepositoryActivities(repositoryId)

  return {
    today: activities.filter((activity) => activity.createdAt?.includes('분') || activity.createdAt?.includes('시간')).length,
    mrEvents: activities.filter((activity) => activity.type?.startsWith('mr.')).length,
    pipelineEvents: activities.filter((activity) => activity.type?.startsWith('pipeline.')).length,
    securityEvents: activities.filter((activity) => activity.type?.startsWith('security.')).length,
  }
}

export function getRepositoryCommits(repositoryId) {
  const commits = getMockSlice((data) => data.commits, []).filter((commit) => commit.repositoryId === repositoryId)
  const repository = getRepositoryDetail(repositoryId)
  const baseCommits = commits.length > 2 ? commits : [
    ...commits,
    {
      id: '91a42df0',
      sha: '91a42df0',
      repositoryId,
      title: 'Branch policy validation flow 정리',
      description: 'MR 승인 정책과 보안 검증 결과를 Repository 화면에 연결했습니다.',
      author: 'Min',
      createdAt: '2시간 전',
      added: 64,
      removed: 12,
      branch: 'main',
      changedFiles: 7,
    },
    {
      id: '5c91a022',
      sha: '5c91a022',
      repositoryId,
      title: 'Pipeline retry 상태 표시 개선',
      description: '실패 Job 재시도와 수동 승인 상태를 구분해 표시합니다.',
      author: 'Yoon',
      createdAt: '어제',
      added: 42,
      removed: 18,
      branch: 'develop',
      changedFiles: 5,
    },
    {
      id: '8f6d2ab1',
      sha: '8f6d2ab1',
      repositoryId,
      title: '운영 반영 전 영향도 점검 추가',
      description: 'Production 반영 전 API 영향 범위를 Commit 이력에서 확인할 수 있게 정리했습니다.',
      author: repository?.owner ?? 'Kim',
      createdAt: '2일 전',
      added: 38,
      removed: 9,
      branch: 'release/1.2.0',
      changedFiles: 4,
    },
    {
      id: '4ac81e02',
      sha: '4ac81e02',
      repositoryId,
      title: '인증 정책 테스트 케이스 보강',
      description: 'feature Branch의 인증 정책 예외 응답 테스트를 추가했습니다.',
      author: 'Jito',
      createdAt: '3일 전',
      added: 76,
      removed: 14,
      branch: 'feature/auth-policy',
      changedFiles: 6,
    },
  ]

  const pipelines = getRepositoryPipelines(repositoryId)
  const tags = getRepositoryTags(repositoryId)
  const seen = new Set()

  return baseCommits
    .filter((commit) => {
      if (seen.has(commit.sha)) return false
      seen.add(commit.sha)
      return true
    })
    .map((commit, index) => {
      const pipeline = pipelines.find((item) => item.commit === commit.sha || item.branch === commit.branch)
      const tag = tags.find((item) => item.commit === commit.sha)
      return {
        ...commit,
        message: commit.message ?? commit.title,
        authorName: typeof commit.author === 'string' ? commit.author : commit.author?.name,
        author: typeof commit.author === 'string' ? commit.author : commit.author?.name,
        avatarUrl: commit.author?.avatarUrl ?? '',
        createdAtText: commit.createdAtText ?? `${commit.createdAt ?? '-'} 생성`,
        date: commit.date ?? inferCommitDate(commit.createdAt, index),
        tag: commit.tag ?? tag?.name ?? '',
        pipelineStatus: commit.pipelineStatus ?? pipeline?.status ?? pipeline?.result ?? 'none',
        pipelineId: commit.pipelineId ?? pipeline?.id ?? null,
        changedFilesCount: commit.changedFilesCount ?? commit.changedFiles ?? 0,
        sortIndex: index,
      }
    })
}

function inferCommitDate(createdAt, index = 0) {
  if (createdAt?.includes('분') || createdAt?.includes('시간')) return '2026.05.28'
  if (createdAt?.includes('어제')) return '2026.05.27'
  if (createdAt?.includes('2일')) return '2026.05.26'
  return index < 2 ? '2026.05.28' : index < 4 ? '2026.05.27' : '2026.05.26'
}

export function getCommitBySha(repositoryId, sha) {
  return getRepositoryCommits(repositoryId).find((commit) => commit.sha === sha || commit.id === sha) ?? null
}

export function getCommitAuthors(repositoryId) {
  return [...new Set(getRepositoryCommits(repositoryId).map((commit) => commit.author).filter(Boolean))]
}

export function getCommitDetail(repositoryId, sha) {
  const commit = getCommitBySha(repositoryId, sha)
  if (!commit) return null

  const detail = getMockSlice((data) => data.commitDetails, []).find(
    (item) => item.repositoryId === repositoryId && item.sha === sha,
  )
  if (detail) return { ...commit, ...detail }

  return createCommitDetailFallback(repositoryId, commit)
}

function createCommitDetailFallback(repositoryId, commit) {
  const pipelineNumber = commit.pipelineId ? `#${commit.pipelineId}` : '-'
  return {
    ...commit,
    message: commit.message ?? commit.title,
    author: {
      name: commit.author,
      avatarUrl: commit.avatarUrl ?? '',
    },
    parentCommitSha: commit.parentCommitSha ?? '91a42df0',
    branches: [commit.branch].filter(Boolean),
    tags: commit.tag ? [commit.tag] : [],
    mergeRequests: commit.mrId ? [{ id: `mr-${commit.mrId}`, number: `!${commit.mrId}`, title: commit.title }] : [],
    pipeline: {
      id: commit.pipelineId,
      number: pipelineNumber,
      status: commit.pipelineStatus ?? 'none',
      statusLabel: commit.pipelineStatus === 'passed' ? 'Pipeline 성공' : commit.pipelineStatus === 'failed' ? 'Pipeline 실패' : 'Pipeline 없음',
      finishedAtText: commit.pipelineId ? '3분 전' : '-',
    },
    summary: {
      fileCount: Math.max(commit.changedFilesCount ?? 1, 1),
      additions: commit.added ?? 0,
      deletions: commit.removed ?? 0,
    },
    files: [
      {
        id: `${commit.sha}-file-001`,
        path: 'react-app/src/ReactVersion.js',
        name: 'ReactVersion.js',
        extension: '.js',
        additions: Math.max(commit.added ?? 1, 1),
        deletions: Math.max(commit.removed ?? 1, 1),
        changeDistribution: ['added', 'added', 'neutral'],
        treePath: ['src', 'ReactVersion.js'],
        diff: [
          { id: 'hunk-001', type: 'hunk', content: '@@ -281,8 +281,8 @@' },
          { id: 'line-346', type: 'context', oldLine: 346, newLine: 346, oldContent: 'export const version = ReactVersion;', newContent: 'export const version = ReactVersion;' },
          { id: 'line-347', type: 'removed', oldLine: 347, newLine: null, oldContent: 'export const channel = "stable";', newContent: '' },
          { id: 'line-348', type: 'added', oldLine: null, newLine: 347, oldContent: '', newContent: 'export const channel = "production";' },
          { id: 'collapsed-001', type: 'collapsed', hiddenLinesCount: 12 },
          { id: 'line-349', type: 'context', oldLine: 348, newLine: 348, oldContent: 'export default ReactVersion;', newContent: 'export default ReactVersion;' },
        ],
      },
      {
        id: `${commit.sha}-file-002`,
        path: 'README.md',
        name: 'README.md',
        extension: '.md',
        additions: 2,
        deletions: 0,
        changeDistribution: ['added', 'neutral'],
        treePath: ['README.md'],
        diff: [
          { id: 'hunk-readme-001', type: 'hunk', content: '@@ -12,6 +12,8 @@' },
          { id: 'line-readme-12', type: 'context', oldLine: 12, newLine: 12, oldContent: '## Deployment', newContent: '## Deployment' },
          { id: 'line-readme-13', type: 'added', oldLine: null, newLine: 13, oldContent: '', newContent: 'Production 배포 전 Commit 상세에서 Diff를 확인합니다.' },
          { id: 'line-readme-14', type: 'added', oldLine: null, newLine: 14, oldContent: '', newContent: 'Pipeline과 Merge request 연결 상태를 함께 검토합니다.' },
        ],
      },
    ],
  }
}

export function getRepositoryCommitSummary(repositoryId) {
  const commits = getRepositoryCommits(repositoryId)

  return {
    total: commits.length,
    today: commits.filter((commit) => commit.createdAt?.includes('분') || commit.createdAt?.includes('시간')).length,
    thisWeek: commits.length,
    contributors: new Set(commits.map((commit) => commit.author)).size,
  }
}

export function getRepositoryFiles(repositoryId) {
  const repository = getRepositoryDetail(repositoryId)
  if (!repository) return []

  return [
    { id: 'src', name: 'src', path: 'src', type: 'Folder', size: '-', lastCommit: '91a42df0', updatedAt: '20분 전' },
    { id: 'src-api', name: 'api', path: 'src/api', type: 'Folder', size: '-', lastCommit: '91a42df0', updatedAt: '20분 전' },
    { id: 'src-main', name: 'main.ts', path: 'src/main.ts', type: 'File', size: '4.2 KB', lastCommit: '7e14d754', updatedAt: '20분 전' },
    { id: 'src-policy', name: 'authPolicy.ts', path: 'src/api/authPolicy.ts', type: 'File', size: '8.7 KB', lastCommit: '7e14d754', updatedAt: '20분 전' },
    { id: 'pipeline', name: '.gitlab-ci.yml', path: '.gitlab-ci.yml', type: 'File', size: '3.1 KB', lastCommit: '5c91a022', updatedAt: '어제' },
    { id: 'package', name: 'package.json', path: 'package.json', type: 'File', size: '2.8 KB', lastCommit: '91a42df0', updatedAt: '2시간 전' },
    { id: 'readme', name: 'README.md', path: 'README.md', type: 'File', size: '5.4 KB', lastCommit: '5c91a022', updatedAt: '어제' },
  ]
}

export function getRepositoryFileTree(repositoryId) {
  const files = getRepositoryFiles(repositoryId)

  return [
    {
      title: 'src',
      key: 'src',
      children: files
        .filter((file) => file.path.startsWith('src/') && file.path !== 'src/api')
        .map((file) => ({ title: file.name, key: file.path })),
    },
    ...files.filter((file) => !file.path.startsWith('src')).map((file) => ({ title: file.name, key: file.path })),
  ]
}

export function getRepositoryBranches(repositoryId) {
  const repository = getRepositoryDetail(repositoryId)
  const commits = getRepositoryCommits(repositoryId)
  const pipelines = getRepositoryPipelines(repositoryId)
  const branchNames = new Set([
    repository?.defaultBranch,
    ...(repository?.branches?.map((branch) => branch.name) ?? []),
    ...commits.map((commit) => commit.branch),
    ...pipelines.map((pipeline) => pipeline.branch),
  ].filter(Boolean))

  return [...branchNames].map((name) => {
    const mockBranch = repository?.branches?.find((branch) => branch.name === name)
    const commit = commits.find((commit) => commit.branch === name)
    const isDefault = name === repository?.defaultBranch
    const isProtected = mockBranch?.isProtected ?? (isDefault || name === 'develop')
    const isStale = !(isDefault || name.includes('feature') || name.includes('hotfix'))

    return {
      name,
      protected: isProtected,
      default: isDefault,
      isDefault,
      isProtected,
      isMine: mockBranch?.isMine ?? false,
      isStale,
      mergeStatus: mockBranch?.status ?? 'open',
      hasOpenMergeRequest: mockBranch?.hasOpenMergeRequest ?? false,
      status: isDefault ? 'active' : name.includes('feature') || name.includes('hotfix') ? 'active' : 'stale',
      lastCommit: mockBranch?.latestCommit?.sha ?? commit?.sha ?? '91a42df0',
      lastAuthor: mockBranch?.latestCommit?.author ?? commit?.author ?? 'System',
      updatedAt: mockBranch?.updatedAt ?? mockBranch?.latestCommit?.timeText ?? commit?.createdAt ?? repository?.updatedAt ?? '-',
      latestCommit: mockBranch?.latestCommit ?? normalizeBranchCommit(commit),
      aheadCount: mockBranch?.aheadCount ?? 0,
      behindCount: mockBranch?.behindCount ?? 0,
    }
  })
}

function normalizeBranchCommit(commit) {
  if (!commit) return null

  return {
    message: commit.title ?? commit.message ?? commit.description,
    author: commit.author,
    timeText: commit.createdAt,
    sha: commit.sha,
  }
}

export function getRepositoryMergeConditions(repositoryId) {
  return getRepositoryDetail(repositoryId)?.mergeConditions ?? []
}

export function getRepositoryBranchComparison(repositoryId, sourceBranch, targetBranch) {
  if (!repositoryId || !sourceBranch || !targetBranch) return null

  return getRepositoryDetail(repositoryId)?.branchComparisons?.find(
    (comparison) => comparison.source === sourceBranch && comparison.target === targetBranch,
  ) ?? null
}

export function getRepositoryBranchSummary(repositoryId) {
  const branches = getRepositoryBranches(repositoryId)

  return {
    total: branches.length,
    protected: branches.filter((branch) => branch.protected).length,
    active: branches.filter((branch) => branch.status === 'active').length,
    stale: branches.filter((branch) => branch.status === 'stale').length,
  }
}

function normalizeTag(tag) {
  const sha = tag.latestCommit?.sha ?? tag.commit ?? ''
  return {
    ...tag,
    commit: sha,
    message: tag.latestCommit?.message ?? tag.message ?? tag.description ?? '',
    author: tag.latestCommit?.author ?? tag.author ?? '-',
    createdAt: tag.createdAtText ?? tag.createdAt ?? '-',
    updatedAt: tag.latestCommit?.updatedAt ?? tag.updatedAt ?? tag.createdAt ?? '',
    releaseType: tag.type ?? tag.releaseType ?? 'tag',
    latestCommit: tag.latestCommit ?? { sha, message: tag.message ?? '', author: tag.author ?? '-', updatedAtText: tag.createdAt ?? '-' },
  }
}

const FALLBACK_TAGS = [
  { name: 'v1.4.2', type: 'production', protected: true, release: true, commit: '7e14d754', message: '인증 정책 응답값 개선 정식 배포', author: 'Choi', createdAt: '2일 전', updatedAt: '2026-05-26' },
  { name: 'v1.4.1-hotfix', type: 'hotfix', protected: false, release: false, commit: '5c91a022', message: 'Pipeline retry hotfix', author: 'Yoon', createdAt: '5일 전', updatedAt: '2026-05-23' },
  { name: 'release-2026.05.20', type: 'release', protected: true, release: true, commit: '91a42df0', message: '5월 정기 릴리즈 후보', author: 'Choi', createdAt: '어제', updatedAt: '2026-05-27' },
  { name: 'prod-2026.05.20', type: 'production', protected: true, release: true, commit: '91a42df0', message: '운영 배포 승인 태그', author: 'Choi', createdAt: '어제', updatedAt: '2026-05-27' },
  { name: 'v1.5.0-rc.1', type: 'pre-release', protected: false, release: false, commit: 'c2b8e129', message: '다음 버전 릴리즈 후보', author: 'Min', createdAt: '3시간 전', updatedAt: '2026-05-28' },
]

export function getAllTags() {
  const mockTags = getMockSlice((data) => data.admin?.tags, [])
  if (mockTags.length > 0) return mockTags.map(normalizeTag)
  return FALLBACK_TAGS.map(normalizeTag)
}

export function getRepositoryTags(repositoryId) {
  const repository = getRepositoryDetail(repositoryId)
  if (!repository) return []

  const mockTags = getMockSlice((data) => data.admin?.tags, []).filter((tag) => tag.repositoryId === repositoryId)
  if (mockTags.length > 0) return mockTags.map(normalizeTag)

  return FALLBACK_TAGS.map((tag) => normalizeTag({ ...tag, repositoryId, repositoryName: repository.name ?? repositoryId }))
}

export function getRepositoryTagSummary(repositoryId) {
  const tags = getRepositoryTags(repositoryId)

  return {
    total: tags.length,
    latestRelease: tags[0]?.name ?? '-',
    production: tags.filter((tag) => tag.releaseType === 'production').length,
    preRelease: tags.filter((tag) => tag.releaseType === 'pre-release').length,
  }
}

export function getRepositorySettings(repositoryId) {
  const repository = getRepositoryDetail(repositoryId)
  if (!repository) return null

  return {
    repository,
    branchPolicy: { protectedDefault: true, requireLinearHistory: true, forcePush: false },
    mergeRequestPolicy: { approvals: 2, squash: true, pipelineRequired: true, securityRequired: true },
    securityPolicy: { secretScan: true, dependencyScan: true, criticalBlock: true },
    notificationPolicy: { pipelineFailure: true, securityAlert: true, weeklyDigest: false },
  }
}

export function getRepositoryOverview(repositoryId) {
  const repository = getRepositoryDetail(repositoryId)

  if (!repository) return null

  const mergeRequests = getRepositoryMergeRequests(repositoryId)
  const pipelines = getRepositoryPipelines(repositoryId)
  const security = getRepositorySecuritySummary(repositoryId)
  const activities = getRepositoryActivities(repositoryId)
  const commits = getRepositoryCommits(repositoryId)
  const branches = getRepositoryBranches(repositoryId)
  const reviewRequired = mergeRequests.filter((mr) => mr.review === 'need-review').length
  const failedPipelines = pipelines.filter((pipeline) => pipeline.status === 'failed').length
  const securityWarnings = security.critical + security.high + security.medium

  return {
    repository,
    mergeRequests,
    pipelines,
    security,
    activities,
    commits,
    branches,
    summary: {
      openMergeRequests: mergeRequests.filter((mr) => mr.status === 'open').length,
      reviewRequired,
      failedPipelines,
      securityWarnings,
      recentCommits: commits.length,
      activeBranches: branches.length,
    },
    nextUp: [
      ...mergeRequests
        .filter((mr) => mr.review === 'need-review')
        .slice(0, 1)
        .map((mr) => ({
          key: `mr-${mr.id}`,
          type: 'Review required MR',
          title: `MR #${mr.id} ${mr.title}`,
          description: `${mr.source} → ${mr.target} · ${mr.updatedAt}`,
          status: mr.review,
        })),
      ...pipelines
        .filter((pipeline) => pipeline.status === 'failed')
        .slice(0, 1)
        .map((pipeline) => ({
          key: `pipeline-${pipeline.id}`,
          type: 'Failed pipeline',
          title: `Pipeline #${pipeline.id}`,
          description: `${pipeline.branch} · ${pipeline.updatedAt}`,
          status: pipeline.status,
        })),
      ...security.validations
        .filter((validation) => validation.policy === 'blocked' || validation.vstatus === 'failed')
        .slice(0, 1)
        .map((validation) => ({
          key: `security-${validation.id}`,
          type: 'Security validation blocked',
          title: validation.mrTitle,
          description: `${validation.policyLabel} · Critical ${validation.severity?.critical ?? 0}, High ${validation.severity?.high ?? 0}`,
          status: validation.vstatus,
        })),
      ...(repository.nextUp ?? []).slice(0, 1).map((item, index) => ({
        key: `repo-next-${index}`,
        type: 'Deployment approval pending',
        title: item.title,
        description: item.desc,
        status: item.status,
      })),
    ],
  }
}

// 요약 통계
export function getRepositorySummary() {
  const list = getRepositories()
  return {
    total: list.length,
    active: list.filter((r) => r.status === 'approved').length,
    reviewRequired: list.filter(
      (r) => r.pipelineStatus === 'failed' || r.securityStatus === 'blocked' || r.securityStatus === 'warning',
    ).length,
    securityBlocked: list.filter((r) => r.securityStatus === 'blocked' || r.securityStatus === 'failed').length,
  }
}
