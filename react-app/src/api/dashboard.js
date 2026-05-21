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

export function getDashboardAiPrompts() {
  return [
    { key: 'mr-approval', label: '오늘 승인해야 할 MR 알려줘' },
    { key: 'pipeline-failure', label: '실패한 Pipeline 원인 요약' },
    { key: 'security-blocked', label: '보안 차단 항목 확인' },
    { key: 'deployment-ready', label: '운영이관 가능한 요청 보여줘' },
    { key: 'risk-summary', label: '이번 주 위험 이벤트 요약' },
  ]
}

export function getDashboardAiResponse(promptKey = 'mr-approval') {
  const responses = {
    'mr-approval': {
      title: 'Review required merge requests',
      body: 'MR #128은 승인 검토가 필요합니다. Pipeline은 통과했지만 Security gate 확인이 남아 있습니다.',
      links: [{ label: 'Open MR #128', href: '/repositories/mobile-banking-api/merge-requests/128' }],
    },
    'pipeline-failure': {
      title: 'Pipeline failure summary',
      body: '최근 실패 Pipeline은 quality gate와 security scan 단계에서 집중되어 있습니다. 실패 Job 로그 확인을 권장합니다.',
      links: [{ label: 'Open Pipeline #2847502395', href: '/repositories/mobile-banking-api/pipelines/2847502395' }],
    },
    'security-blocked': {
      title: 'Security blocked items',
      body: 'SEC-204가 Critical/High 취약점 정책으로 운영 반영을 차단하고 있습니다.',
      links: [{ label: 'Open SEC-204', href: '/security/SEC-204' }],
    },
    'deployment-ready': {
      title: 'Deployment transfer readiness',
      body: 'DT-2026-0521-003은 승인, Pipeline, Security gate가 모두 통과되어 운영이관 준비 상태입니다.',
      links: [{ label: 'Open transfer DT-2026-0521-003', href: '/deployment-transfer/DT-2026-0521-003' }],
    },
    'risk-summary': {
      title: 'Weekly risk event summary',
      body: '이번 주 주요 위험은 보안 예외 승인, 실패 Pipeline 재시도, 운영이관 승인 지연입니다.',
      links: [{ label: 'Open Audit Log', href: '/audit' }],
    },
  }

  const normalized = String(promptKey).toLowerCase()
  if (normalized.includes('pipeline')) return responses['pipeline-failure']
  if (normalized.includes('security') || normalized.includes('보안')) return responses['security-blocked']
  if (normalized.includes('deployment') || normalized.includes('운영')) return responses['deployment-ready']
  if (normalized.includes('risk') || normalized.includes('위험')) return responses['risk-summary']
  return responses[promptKey] ?? responses['mr-approval']
}
