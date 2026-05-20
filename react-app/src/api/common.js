import { getMockSlice } from './mockClient'

export function getCurrentUser() {
  return getMockSlice((data) => data.user.currentUser, null)
}

export function getUsers() {
  return getMockSlice((data) => data.user.users, [])
}

export function getOrganizations() {
  return getMockSlice((data) => data.organizations, [])
}

export function getStatusMap() {
  return getMockSlice((data) => data.common.status, {})
}

export function getGnbCounts() {
  return getMockSlice((data) => data.common.gnbCounts, {})
}
