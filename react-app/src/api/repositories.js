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
