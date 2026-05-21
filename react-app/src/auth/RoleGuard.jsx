import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function RoleGuard({ children, roles, permission }) {
  const location = useLocation()
  const auth = useAuth()

  const roleAllowed = roles ? roles.includes(auth.role) : true
  const permissionAllowed = permission ? auth.hasPermission(permission) : true
  const routeAllowed = auth.canAccessRoute(location.pathname)

  if (!roleAllowed || !permissionAllowed || !routeAllowed) {
    return <Navigate to="/access-denied" replace />
  }

  return children
}
