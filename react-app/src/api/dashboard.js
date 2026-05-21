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

export function getDashboardSummary() {
  const repositories = getMockSlice((data) => data.repositories.list, [])
  const mergeRequests = getMockSlice((data) => data.mergeRequests.list, [])
  const pipelines = getMockSlice((data) => data.pipelines.list, [])
  const validations = getMockSlice((data) => data.security.validations, [])
  const auditLogs = getMockSlice((data) => data.audit.logs, [])

  return {
    reviewRequiredMrs: mergeRequests.filter((mr) => mr.review === 'need-review').length,
    myOpenMrs: mergeRequests.filter((mr) => mr.status === 'open' && ['jito', 'Jito'].includes(mr.owner ?? mr.author)).length,
    failedPipelines: pipelines.filter((pipeline) => pipeline.status === 'failed').length,
    securityBlocked: validations.filter((validation) => validation.policy === 'blocked').length,
    pendingActions:
      mergeRequests.filter((mr) => mr.review === 'need-review').length +
      pipelines.filter((pipeline) => pipeline.status === 'failed').length +
      validations.filter((validation) => validation.policy === 'blocked').length,
    todayAuditEvents: auditLogs.length,
    favoriteRepositories: repositories.filter((repository) => repository.favorite).length,
  }
}

export function getDashboardNextUpItems() {
  const mergeRequests = getMockSlice((data) => data.mergeRequests.list, [])
  const pipelines = getMockSlice((data) => data.pipelines.list, [])
  const validations = getMockSlice((data) => data.security.validations, [])
  const auditLogs = getMockSlice((data) => data.audit.logs, [])

  const reviewItem = mergeRequests.find((mr) => mr.review === 'need-review')
  const failedPipeline = pipelines.find((pipeline) => pipeline.status === 'failed')
  const blockedSecurity = validations.find((validation) => validation.policy === 'blocked')
  const policyAudit = auditLogs.find((log) => log.eventCode?.includes('policy'))

  return [
    reviewItem
      ? {
          key: `mr-${reviewItem.id}`,
          type: 'Merge Request',
          severity: 'warning',
          target: `MR #${reviewItem.id}`,
          title: `MR #${reviewItem.id} requires your review`,
          status: reviewItem.review,
          updatedAt: reviewItem.updatedAt,
          href: `/repositories/${reviewItem.repo}/merge-requests/${reviewItem.id}`,
        }
      : null,
    failedPipeline
      ? {
          key: `pipeline-${failedPipeline.id}`,
          type: 'Pipeline',
          severity: 'danger',
          target: `Pipeline #${failedPipeline.id}`,
          title: `Pipeline #${failedPipeline.id} failed`,
          status: failedPipeline.status,
          updatedAt: failedPipeline.updatedAt,
          href: `/repositories/${failedPipeline.repo}/pipelines/${failedPipeline.id}`,
        }
      : null,
    blockedSecurity
      ? {
          key: `security-${blockedSecurity.id}`,
          type: 'Security',
          severity: 'danger',
          target: blockedSecurity.id,
          title: `Security validation ${blockedSecurity.id} blocked merge`,
          status: blockedSecurity.policy,
          updatedAt: blockedSecurity.lastCheckedAt,
          href: `/security/${blockedSecurity.id}`,
        }
      : null,
    {
      key: 'deployment-pending',
      type: 'Deployment',
      severity: 'warning',
      target: 'Deployment Transfer',
      title: 'Deployment approval pending',
      status: 'pending',
      updatedAt: '오늘까지',
      href: '/audit',
    },
    policyAudit
      ? {
          key: `audit-${policyAudit.id}`,
          type: 'Policy',
          severity: policyAudit.severity,
          target: policyAudit.eventCode,
          title: 'Policy update requires confirmation',
          status: policyAudit.resultClass === 'red' ? 'blocked' : 'warning',
          updatedAt: policyAudit.time,
          href: '/audit',
        }
      : null,
  ].filter(Boolean)
}

export function getDashboardRepositoriesData() {
  return getMockSlice((data) => data.repositories.list, [])
    .filter((repository) => repository.favorite)
    .slice(0, 6)
}

export function getDashboardMergeRequestsData() {
  return getMockSlice((data) => data.mergeRequests.list, []).slice(0, 6)
}

export function getDashboardPipelinesData() {
  return getMockSlice((data) => data.pipelines.list, []).slice(0, 6)
}

export function getDashboardSecurityItems() {
  return getMockSlice((data) => data.security.validations, [])
    .filter((validation) => validation.policy === 'blocked' || validation.vstatus === 'failed' || validation.vstatus === 'warning')
    .slice(0, 6)
}

export function getDashboardAuditEvents() {
  return getMockSlice((data) => data.audit.logs, []).slice(0, 6)
}
