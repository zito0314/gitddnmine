export const AUTH_STORAGE_KEY = 'gitddn.auth.currentUser'

export const ROLE = {
  admin: 'admin',
  internal: 'internal',
  external: 'external',
}

export function sanitizeUser(user) {
  if (!user) return null
  const safeUser = { ...user }
  delete safeUser.password
  return safeUser
}

export function getStoredAuthUser() {
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function isAdmin(user) {
  return user?.role === ROLE.admin
}

export function isInternalUser(user) {
  return user?.role === ROLE.internal
}

export function isExternalDeveloper(user) {
  return user?.role === ROLE.external
}

export function hasPermission(user, permission) {
  if (!user) return false
  if (user.permissions === 'all' || isAdmin(user)) return true
  return user.permissions?.includes(permission) ?? false
}

export function canAccessRepository(repositoryId, user) {
  if (!user || !repositoryId) return false
  if (isAdmin(user) || user.allowedRepositoryIds === 'all') return true
  return user.allowedRepositoryIds?.includes(repositoryId) ?? false
}

export function filterRepositoriesByAccess(repositories, user) {
  if (!user) return []
  if (isAdmin(user) || user.allowedRepositoryIds === 'all') return repositories
  return repositories.filter((repository) => canAccessRepository(repository.id, user))
}

export function filterItemsByRepositoryAccess(items, user, repositoryKey = 'repo') {
  if (!user) return []
  if (isAdmin(user) || user.allowedRepositoryIds === 'all') return items
  return items.filter((item) => canAccessRepository(item[repositoryKey] ?? item.repositoryId, user))
}

export function canAccessAdmin(user) {
  return isAdmin(user)
}

export function canAccessSecurity(user) {
  return hasPermission(user, 'security:read')
}

export function canAccessDeploymentTransfer(user) {
  return hasPermission(user, 'deployment:read')
}

export function canAccessAudit(user) {
  return hasPermission(user, 'audit:read')
}

export function canAccessRoute(pathname, user) {
  if (!user) return false
  if (isAdmin(user)) return true

  if (pathname.startsWith('/admin')) return canAccessAdmin(user)
  if (pathname.startsWith('/audit')) return canAccessAudit(user)
  if (pathname.startsWith('/security')) return canAccessSecurity(user)
  if (pathname.startsWith('/deployment-transfer')) return canAccessDeploymentTransfer(user)

  const repositoryMatch = pathname.match(/^\/repositories\/([^/]+)/)
  if (repositoryMatch?.[1] && repositoryMatch[1] !== 'new') {
    const repositoryId = repositoryMatch[1]
    if (!canAccessRepository(repositoryId, user)) return false
    if (pathname.includes('/security')) return canAccessSecurity(user)
    if (pathname.includes('/deployment-transfer')) return canAccessDeploymentTransfer(user)
  }

  if (pathname === '/repositories/new') return hasPermission(user, 'repository:create-request')
  return true
}
