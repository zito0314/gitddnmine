import { findById, getMockSlice } from './mockClient'

export function getSecurityValidations() {
  return getMockSlice((data) => data.security.validations, [])
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

export function getSecurityValidationSummary() {
  const validations = getSecurityValidations()

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
