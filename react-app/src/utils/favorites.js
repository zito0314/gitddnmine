export const REPOSITORY_FAVORITES_KEY = 'gitddn.repositoryFavorites'
export const REPOSITORY_FAVORITES_EVENT = 'gitddn.repositoryFavorites.changed'

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

export function getRepositoryFavorites() {
  if (!canUseStorage()) return {}

  try {
    return JSON.parse(window.localStorage.getItem(REPOSITORY_FAVORITES_KEY) ?? '{}') ?? {}
  } catch {
    return {}
  }
}

export function saveRepositoryFavorites(favorites) {
  if (!canUseStorage()) return favorites

  window.localStorage.setItem(REPOSITORY_FAVORITES_KEY, JSON.stringify(favorites))
  window.dispatchEvent(new CustomEvent(REPOSITORY_FAVORITES_EVENT, { detail: favorites }))
  return favorites
}

export function isRepositoryFavorite(repositoryId, fallback = false) {
  const favorites = getRepositoryFavorites()
  return Object.prototype.hasOwnProperty.call(favorites, repositoryId) ? Boolean(favorites[repositoryId]) : fallback
}

export function toggleRepositoryFavorite(repositoryId, fallback = false) {
  const favorites = getRepositoryFavorites()
  const current = Object.prototype.hasOwnProperty.call(favorites, repositoryId)
    ? Boolean(favorites[repositoryId])
    : fallback

  return saveRepositoryFavorites({ ...favorites, [repositoryId]: !current })
}

export function applyRepositoryFavorites(repositories) {
  const favorites = getRepositoryFavorites()

  return repositories.map((repository) => ({
    ...repository,
    favorite: Object.prototype.hasOwnProperty.call(favorites, repository.id)
      ? Boolean(favorites[repository.id])
      : Boolean(repository.favorite),
  }))
}

function updatedWeight(repository) {
  if (typeof repository.updatedAtValue === 'number') return repository.updatedAtValue

  const value = String(repository.updatedAt ?? '').toLowerCase()
  const number = Number(value.match(/\d+/)?.[0] ?? 0)

  if (value.includes('minute') || value.includes('분')) return 10_000 - number
  if (value.includes('hour') || value.includes('시간')) return 9_000 - number
  if (value.includes('today') || value.includes('오늘')) return 8_000
  if (value.includes('yesterday') || value.includes('어제')) return 7_000
  if (value.includes('day') || value.includes('일')) return 6_000 - number
  if (value.includes('week') || value.includes('주')) return 5_000 - number
  return 0
}

export function sortRepositoriesByFavorite(repositories) {
  return [...repositories].sort((a, b) => {
    if (Boolean(a.favorite) !== Boolean(b.favorite)) return a.favorite ? -1 : 1

    const updatedDiff = updatedWeight(b) - updatedWeight(a)
    if (updatedDiff !== 0) return updatedDiff

    return String(a.name).localeCompare(String(b.name))
  })
}
