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
