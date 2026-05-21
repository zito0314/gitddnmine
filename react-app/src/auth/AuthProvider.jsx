import { useMemo, useState } from 'react'
import { login as loginApi, logout as logoutApi } from '../api/auth'
import {
  AUTH_STORAGE_KEY,
  canAccessRoute,
  hasPermission,
  isAdmin,
  isExternalDeveloper,
  isInternalUser,
} from './permissions'
import { AuthContext } from './AuthContext'

function readStoredUser() {
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(readStoredUser)

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      role: currentUser?.role ?? null,
      permissions: currentUser?.permissions ?? [],
      isAdmin: isAdmin(currentUser),
      isInternalUser: isInternalUser(currentUser),
      isExternalDeveloper: isExternalDeveloper(currentUser),
      login: async (credentials) => {
        const user = await loginApi(credentials)
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
        setCurrentUser(user)
        return user
      },
      logout: async () => {
        await logoutApi()
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        setCurrentUser(null)
      },
      hasPermission: (permission) => hasPermission(currentUser, permission),
      hasRole: (role) => currentUser?.role === role,
      canAccessRoute: (path) => canAccessRoute(path, currentUser),
    }),
    [currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
