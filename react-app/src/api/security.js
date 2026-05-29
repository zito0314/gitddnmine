import { findById, getMockSlice } from './mockClient'

function getBranchParts(branch) {
  const [sourceBranch, targetBranch] = String(branch ?? '').split('→').map((item) => item.trim())
  return { sourceBranch, targetBranch }
}

function normalizeStatus(validation) {
  if (validation.status) return validation.status
  if (validation.policy === 'blocked') return 'blocked'
  if (validation.vstatus === 'pass') return 'passed'
  return validation.vstatus ?? 'pending'
}

function normalizePolicyDecision(policy) {
  if (policy === 'allowed') return 'deployable'
  if (policy === 'pending') return 'approval_required'
  if (policy === 'blocked') return 'blocked'
  return policy ?? 'conditional'
}

function normalizeValidation(validation, repositoryMap) {
  const { sourceBranch, targetBranch } = getBranchParts(validation.branch)
  const severityCounts = {
    critical: validation.severity?.critical ?? 0,
    high: validation.severity?.high ?? 0,
    medium: validation.severity?.medium ?? 0,
    low: validation.severity?.low ?? 0,
    info: validation.severity?.info ?? 0,
  }

  return {
    ...validation,
    securityId: validation.securityId ?? validation.id,
    repositoryId: validation.repositoryId ?? validation.repo,
    repositoryName: validation.repositoryName ?? repositoryMap.get(validation.repo)?.name ?? validation.repo,
    mergeRequestId: validation.mergeRequestId ?? validation.mrId,
    mergeRequestNumber: validation.mergeRequestNumber ?? validation.mrId,
    mergeRequestTitle: validation.mergeRequestTitle ?? validation.mrTitle,
    sourceBranch: validation.sourceBranch ?? sourceBranch,
    targetBranch: validation.targetBranch ?? targetBranch,
    status: normalizeStatus(validation),
    policyDecision: validation.policyDecision ?? normalizePolicyDecision(validation.policy),
    severityCounts,
    ownerName: validation.ownerName ?? validation.author,
    checkedAt: validation.checkedAt ?? validation.lastCheckedAt,
    updatedAt: validation.updatedAt ?? validation.lastCheckedAt,
  }
}

export function getSecurityValidations() {
  const repositories = getMockSlice((data) => data.repositories.list, [])
  const repositoryMap = new Map(repositories.map((repository) => [repository.id, repository]))
  return getMockSlice((data) => data.security.validations, []).map((validation) =>
    normalizeValidation(validation, repositoryMap),
  )
}

export function getSecurityValidationById(securityId) {
  const validations = getSecurityValidations()
  const validation = findById(validations, securityId)

  return validation ?? null
}

export function getSecurityDetail(securityId) {
  return getMockSlice((data) => data.security.detail[securityId], null)
}

export function getVulnerabilities() {
  return getMockSlice((data) => data.security.vulnerabilities, [])
}

export function getSecurityValidationsByRepository(repositoryId) {
  return getSecurityValidations().filter((validation) => validation.repo === repositoryId)
}

export function getSecurityValidationsByRepositoryId(repositoryId) {
  return getSecurityValidationsByRepository(repositoryId)
}

export function getVulnerabilitiesBySecurityId(securityId) {
  return getVulnerabilities().filter((vulnerability) => vulnerability.securityId === securityId)
}

export function getSecurityValidationSummary(repositoryId) {
  const validations = repositoryId
    ? getSecurityValidationsByRepository(repositoryId)
    : getSecurityValidations()

  return validations.reduce(
    (summary, validation) => {
      summary.total += 1
      if (validation.vstatus === 'failed') summary.failed += 1
      if (validation.policy === 'blocked') summary.blockedMrs += 1
      if (validation.vstatus === 'warning') summary.warning += 1
      if (validation.vstatus === 'pass' || validation.vstatus === 'passed') summary.passed += 1
      summary.criticalIssues += validation.severity?.critical ?? 0
      return summary
    },
    {
      total: 0,
      failed: 0,
      blockedMrs: 0,
      criticalIssues: 0,
      warning: 0,
      passed: 0,
    },
  )
}

export function getSecurityValidationRelatedMergeRequest(securityId) {
  const validation = getSecurityValidationById(securityId)
  const mergeRequests = getMockSlice((data) => data.mergeRequests.list, [])
  return mergeRequests.find((mergeRequest) => String(mergeRequest.id) === String(validation?.mrId)) ?? null
}

export function getSecurityValidationRelatedRepository(securityId) {
  const validation = getSecurityValidationById(securityId)
  const repositories = getMockSlice((data) => data.repositories.list, [])
  return repositories.find((repository) => repository.id === validation?.repo) ?? null
}

export function getSecurityValidationRelatedPipeline(securityId) {
  const validation = getSecurityValidationById(securityId)
  const pipelines = getMockSlice((data) => data.pipelines.list, [])
  return pipelines.find((pipeline) => String(pipeline.mrId) === String(validation?.mrId)) ?? null
}

export function getSecurityValidationActivities(securityId) {
  const validation = getSecurityValidationById(securityId)
  const pipeline = getSecurityValidationRelatedPipeline(securityId)
  return getMockSlice((data) => data.activities, []).filter(
    (activity) =>
      String(activity.targetId) === String(securityId) ||
      (activity.repositoryId === validation?.repo &&
        (String(activity.targetId) === String(validation?.mrId) ||
          String(activity.targetId) === String(pipeline?.id))),
  )
}

export function getSecurityValidationDetail(securityId) {
  const validation = getSecurityValidationById(securityId)
  if (!validation) return null

  const vulnerabilities = getVulnerabilitiesBySecurityId(securityId)
  const repository = getSecurityValidationRelatedRepository(securityId)
  const mergeRequest = getSecurityValidationRelatedMergeRequest(securityId)
  const pipeline = getSecurityValidationRelatedPipeline(securityId)
  const activities = getSecurityValidationActivities(securityId)

  return {
    validation,
    vulnerabilities,
    repository,
    mergeRequest,
    pipeline,
    activities,
  }
}
