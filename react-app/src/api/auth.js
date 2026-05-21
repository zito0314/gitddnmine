import { getMockSlice } from './mockClient'
import { getStoredAuthUser, sanitizeUser } from '../auth/permissions'

export function getMockUsers() {
  return getMockSlice((data) => data.auth?.mockUsers, [])
}

export async function login({ email, password }) {
  const user = getMockUsers().find(
    (item) => item.email.toLowerCase() === String(email ?? '').toLowerCase(),
  )

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password')
  }

  return sanitizeUser(user)
}

export async function logout() {
  return true
}

export function getCurrentUser() {
  return getStoredAuthUser()
}
