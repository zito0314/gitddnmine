import { getMockSlice } from './mockClient'

export function getAuditLogs() {
  return getMockSlice((data) => data.audit.logs, [])
}

export function getAuditSummaryCards() {
  return getMockSlice((data) => data.audit.summaryCards, [])
}

export function getAuditActors() {
  return getMockSlice((data) => data.audit.actors, [])
}

export function getAuditTargets() {
  return getMockSlice((data) => data.audit.targets, [])
}
