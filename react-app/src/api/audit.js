import { getMockSlice } from './mockClient'

export function getAuditLogs() {
  return getMockSlice((data) => data.audit.auditLogs ?? data.audit.logs, [])
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

export function getAuditLogById(auditId) {
  return getAuditLogs().find((log) => log.id === auditId) ?? null
}

export function getAuditLogSummary() {
  const logs = getAuditLogs()

  return {
    todayEvents: logs.length,
    riskEvents: logs.filter((log) => ['danger', 'critical'].includes(log.severity)).length,
    policyChanges: logs.filter((log) => log.eventCode?.includes('policy') || log.target === 'policy').length,
    securityBlocks: logs.filter(
      (log) => log.eventCode?.includes('security') || log.resultClass === 'red' || log.severity === 'danger',
    ).length,
    approvalEvents: logs.filter((log) => log.eventCode?.includes('approval')).length,
    deploymentEvents: logs.filter((log) => log.target === 'deployment' || log.eventCode?.includes('deployment')).length,
  }
}

export function getAuditLogsByRepositoryId(repositoryId) {
  return getAuditLogs().filter((log) => getAuditRelatedIds(log).repositoryId === repositoryId)
}

export function getAuditLogsByTarget(targetType, targetId) {
  return getAuditLogs().filter((log) => {
    const ids = getAuditRelatedIds(log)
    if (targetType === 'mergeRequest') return String(ids.mrId) === String(targetId)
    if (targetType === 'pipeline') return String(ids.pipelineId) === String(targetId)
    if (targetType === 'security') return String(ids.securityId) === String(targetId)
    if (targetType === 'repository') return String(ids.repositoryId) === String(targetId)
    return log.target === targetType
  })
}

export function getAuditRelatedEvents(auditId) {
  const log = getAuditLogById(auditId)
  if (!log) return []

  const ids = getAuditRelatedIds(log)
  return getAuditLogs()
    .filter((item) => {
      const itemIds = getAuditRelatedIds(item)
      return (
        item.id === log.id ||
        (ids.repositoryId && itemIds.repositoryId === ids.repositoryId) ||
        (ids.mrId && String(itemIds.mrId) === String(ids.mrId))
      )
    })
    .slice(0, 6)
}

export function getAuditRelatedIds(log) {
  const mrMatch = log.targetDetail?.match(/MR #(\d+)/)
  const securityMatch = log.message?.match(/(SEC-\d+)/)
  const repositoryId = log.targetName
  const mrId = mrMatch?.[1] ? Number(mrMatch[1]) : null
  const pipelines = getMockSlice((data) => data.pipelines.list, [])
  const securityValidations = getMockSlice((data) => data.security.validations, [])
  const pipeline = pipelines.find((item) => String(item.mrId) === String(mrId) && item.repo === repositoryId)
  const security = securityMatch?.[1]
    ? securityValidations.find((item) => item.id === securityMatch[1])
    : securityValidations.find((item) => String(item.mrId) === String(mrId) && item.repo === repositoryId)

  return {
    repositoryId,
    mrId,
    pipelineId: pipeline?.id ?? null,
    securityId: security?.id ?? null,
  }
}

export function getAuditEvidenceCategories() {
  return getMockSlice((data) => data.audit.evidenceCategories, [])
}

export function getAuditEvidenceItems() {
  return getMockSlice((data) => data.audit.evidenceItems, [])
}

export function getAuditExportHistories() {
  return getMockSlice((data) => data.audit.exportHistories, [])
}

export function getAuditEvidenceSummary() {
  const items = getAuditEvidenceItems()
  const histories = getAuditExportHistories()
  const readyCount = items.filter((item) => item.status === 'ready').length
  const needReviewCount = items.filter((item) => item.status !== 'ready').length
  const thisMonthExports = histories.length
  const coveragePercent = items.length > 0 ? Math.round((readyCount / items.length) * 100) : 0

  return {
    readyCount,
    needReviewCount,
    thisMonthExports,
    coveragePercent,
  }
}
