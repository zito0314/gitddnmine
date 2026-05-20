import { getMockSlice } from './mockClient'

export function getDashboardSummaryCards() {
  return getMockSlice((data) => data.dashboard.summaryCards, [])
}

export function getDashboardNextUp() {
  return getMockSlice((data) => data.dashboard.nextUp, [])
}

export function getDashboardRepositories() {
  return getMockSlice((data) => data.dashboard.repositories, [])
}

export function getDashboardRecent() {
  return getMockSlice((data) => data.dashboard.recent, [])
}

export function getDashboardActivity() {
  return getMockSlice((data) => data.dashboard.activity, [])
}
