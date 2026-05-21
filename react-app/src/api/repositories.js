import { findById, getMockSlice } from './mockClient'

export function getRepositories() {
  return getMockSlice((data) => data.repositories.list, [])
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

export function getRepositoryCommits(repositoryId) {
  return getMockSlice((data) => data.commits, []).filter((commit) => commit.repositoryId === repositoryId)
}

export function getRepositoryBranches(repositoryId) {
  const repository = getRepositoryById(repositoryId)
  const commits = getRepositoryCommits(repositoryId)
  const pipelines = getRepositoryPipelines(repositoryId)
  const branchNames = new Set([
    repository?.defaultBranch,
    ...commits.map((commit) => commit.branch),
    ...pipelines.map((pipeline) => pipeline.branch),
  ].filter(Boolean))

  return [...branchNames].map((name) => ({
    name,
    protected: name === repository?.defaultBranch || name === 'develop',
  }))
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
