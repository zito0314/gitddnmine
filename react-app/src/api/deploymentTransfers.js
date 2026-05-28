import { findById, getMockSlice } from './mockClient'
import { filterItemsByRepositoryAccess, getStoredAuthUser } from '../auth/permissions'

export function getDeploymentTransfers() {
  return filterItemsByRepositoryAccess(
    getMockSlice((data) => data.deploymentTransfers, []),
    getStoredAuthUser(),
    'repositoryId',
  )
}

export function getDeploymentTransferSummary(items = getDeploymentTransfers()) {
  return {
    total: items.length,
    pendingApproval: items.filter((item) => ['requested', 'reviewing'].includes(item.status) || item.approvalStatus === 'pending').length,
    readyToDeploy: items.filter((item) => item.pipelineStatus === 'passed' && item.securityStatus === 'passed' && item.approvalStatus === 'approved').length,
    blocked: items.filter((item) => item.status === 'blocked' || item.securityStatus === 'blocked').length,
    approved: items.filter((item) => item.approvalStatus === 'approved').length,
    scheduled: items.filter((item) => item.status === 'scheduled').length,
  }
}

export function getDeploymentTransferById(transferId) {
  return findById(getDeploymentTransfers(), transferId) ?? null
}

export function getDeploymentTransferDashboard() {
  const dashboard = getMockSlice((data) => data.deploymentTransferDashboard, {})
  const requests = filterItemsByRepositoryAccess(dashboard.requests ?? [], getStoredAuthUser(), 'repositoryId')
  const requestIds = new Set(requests.map((request) => request.id))
  const selectedRequestId = requestIds.has(dashboard.defaultSelectedRequestId)
    ? dashboard.defaultSelectedRequestId
    : requests[0]?.id

  return {
    summary: getDeploymentTransferDashboardSummary(requests),
    timeline: dashboard.timeline ?? [],
    risks: dashboard.risks ?? [],
    requests,
    requestDetails: dashboard.requestDetails ?? {},
    defaultSelectedRequestId: selectedRequestId,
  }
}

export function getDeploymentTransferDashboardSummary(requests = getDeploymentTransferDashboard().requests) {
  return {
    scheduledToday: requests.filter((request) => request.scheduledTime?.startsWith('오늘')).length,
    ready: requests.filter((request) => request.status === 'ready').length,
    needsReview: requests.filter((request) => request.status === 'review').length,
    blocked: requests.filter((request) => request.status === 'blocked').length,
  }
}

export function getDeploymentTransferDashboardRequestById(requestId) {
  const dashboard = getDeploymentTransferDashboard()
  return dashboard.requests.find((request) => request.id === requestId) ?? null
}

export function getDeploymentTransferDetail(transferId) {
  return getDeploymentTransferById(transferId)
}

export function getDeploymentTransfersByRepositoryId(repositoryId) {
  return getDeploymentTransfers().filter((transfer) => transfer.repositoryId === repositoryId)
}

export function getRepositoryDeploymentTransferSummary(repositoryId) {
  return getDeploymentTransferSummary(getDeploymentTransfersByRepositoryId(repositoryId))
}

export function getDeploymentTransferActivities(transferId) {
  return getDeploymentTransferDetail(transferId)?.activities ?? []
}

export function getTransferCandidateMergeRequests(repositoryId) {
  return getMockSlice((data) => data.mergeRequests.list, []).filter(
    (mergeRequest) => !repositoryId || mergeRequest.repo === repositoryId,
  )
}

export function getTransferCandidatePipelines(repositoryId, mrId) {
  return getMockSlice((data) => data.pipelines.list, []).filter((pipeline) => {
    if (repositoryId && pipeline.repo !== repositoryId) return false
    if (mrId && String(pipeline.mrId) !== String(mrId)) return false
    return true
  })
}

export function getTransferCandidateSecurityValidations(repositoryId, mrId) {
  return getMockSlice((data) => data.security.validations, []).filter((validation) => {
    if (repositoryId && validation.repo !== repositoryId) return false
    if (mrId && String(validation.mrId) !== String(mrId)) return false
    return true
  })
}

export function getDeploymentTransferFormOptions(repositoryId) {
  const repositories = getMockSlice((data) => data.repositories.list, [])
  const mergeRequests = getTransferCandidateMergeRequests(repositoryId)
  const pipelines = getTransferCandidatePipelines(repositoryId)
  const securityValidations = getTransferCandidateSecurityValidations(repositoryId)
  const users = getMockSlice((data) => data.user.users, [])

  return {
    repositories,
    mergeRequests,
    pipelines,
    securityValidations,
    users,
    environments: ['dev', 'staging', 'production'],
  }
}

export function previewDeploymentTransferGates(formValues = {}) {
  const repositoryId = formValues.repositoryId
  const mrId = formValues.mrId
  const pipelineId = formValues.pipelineId
  const securityId = formValues.securityId
  const targetEnvironment = formValues.targetEnvironment
  const rollbackPlan = formValues.rollbackPlan
  const approver = formValues.approver
  const deploymentWindow = formValues.deploymentWindow
  const auditNote = formValues.auditNote

  const mergeRequest = getTransferCandidateMergeRequests(repositoryId).find(
    (item) => String(item.id) === String(mrId),
  )
  const pipeline = getTransferCandidatePipelines(repositoryId, mrId).find(
    (item) => String(item.id) === String(pipelineId),
  )
  const security = getTransferCandidateSecurityValidations(repositoryId, mrId).find(
    (item) => item.id === securityId,
  )

  const mrApproved = mergeRequest
    ? mergeRequest.approved >= mergeRequest.required || mergeRequest.review === 'approved'
    : false
  const pipelinePassed = pipeline ? pipeline.status === 'passed' || pipeline.result === 'passed' : false
  const securityPassed = security
    ? ['passed', 'pass'].includes(security.vstatus) || security.policy === 'allowed'
    : false
  const hasWindow = Array.isArray(deploymentWindow) && deploymentWindow.length === 2
  const hasRollbackPlan = Boolean(String(rollbackPlan ?? '').trim())
  const hasAuditNote = Boolean(auditNote)

  const gates = [
    { key: 'mr-approved', label: 'MR approved', status: mergeRequest ? (mrApproved ? 'passed' : 'warning') : 'pending' },
    { key: 'pipeline-passed', label: 'Pipeline passed', status: pipeline ? (pipelinePassed ? 'passed' : 'failed') : 'pending' },
    { key: 'security-passed', label: 'Security validation passed', status: security ? (securityPassed ? 'passed' : security.policy === 'blocked' ? 'failed' : 'warning') : 'pending' },
    { key: 'approver-selected', label: 'Required approver selected', status: approver ? 'passed' : 'pending' },
    { key: 'window-selected', label: 'Deployment window selected', status: hasWindow ? 'passed' : 'pending' },
    { key: 'rollback-provided', label: 'Rollback plan provided', status: hasRollbackPlan ? 'passed' : targetEnvironment === 'production' ? 'failed' : 'warning' },
    { key: 'audit-note-ready', label: 'Audit note ready', status: hasAuditNote ? 'passed' : 'warning' },
  ]

  const failedCount = gates.filter((gate) => gate.status === 'failed').length
  const warningCount = gates.filter((gate) => gate.status === 'warning').length
  const pendingCount = gates.filter((gate) => gate.status === 'pending').length

  return {
    gates,
    readiness: failedCount > 0 ? 'blocked' : pendingCount > 0 ? 'pending' : warningCount > 0 ? 'warning' : 'ready-to-merge',
    riskLevel: failedCount > 0 || targetEnvironment === 'production' ? 'high' : warningCount > 0 ? 'medium' : 'low',
    recommendation: getDeploymentTransferRecommendation({
      pipeline,
      pipelinePassed,
      security,
      securityPassed,
      targetEnvironment,
      hasRollbackPlan,
      failedCount,
      pendingCount,
      warningCount,
    }),
  }
}

function getDeploymentTransferRecommendation({
  pipeline,
  pipelinePassed,
  security,
  securityPassed,
  targetEnvironment,
  hasRollbackPlan,
  failedCount,
  pendingCount,
  warningCount,
}) {
  if (pipeline && !pipelinePassed) return 'Pipeline failed. Resolve failed jobs before production transfer.'
  if (security && !securityPassed) return 'Security validation is blocked. Critical issues must be resolved.'
  if (targetEnvironment === 'production' && !hasRollbackPlan) return 'Rollback plan is required for production deployment.'
  if (failedCount === 0 && pendingCount === 0 && warningCount === 0) return 'All required gates are ready for deployment transfer.'
  return 'Complete pending gates before submitting the deployment transfer request.'
}
