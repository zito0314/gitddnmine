import { getMockSlice } from './mockClient'
import { getRepositories, getRepositoryById } from './repositories'

export function getBranchProtectionTemplates() {
  return getMockSlice((data) => data.branchProtectionTemplates, [])
}

export function getBranchProtectionTemplateById(templateId) {
  return getBranchProtectionTemplates().find((template) => template.id === templateId) ?? null
}

export function getBranchProtectionTemplateSummary(templateId) {
  const template = getBranchProtectionTemplateById(templateId)
  if (!template) return null

  return {
    appliedRepositories: template.appliedRepositoryIds?.length ?? 0,
    minimumApprovals: template.mergeRules?.minimumApprovals ?? 0,
    requiredGates: [
      template.mergeRules?.pipelineSuccessRequired ? 'Pipeline' : null,
      template.mergeRules?.securityCheckRequired ? 'Security' : null,
      template.mergeRules?.deploymentApprovalRequired ? 'Deployment' : null,
    ].filter(Boolean),
    exceptionTargets: template.exceptionAllowedTargets ?? [],
  }
}

export function getRepositoriesByBranchProtectionTemplate(templateId) {
  const template = getBranchProtectionTemplateById(templateId)
  if (!template) return []

  return (template.appliedRepositoryIds ?? [])
    .map((repositoryId) => getRepositoryById(repositoryId))
    .filter(Boolean)
    .map((repository) => ({
      ...repository,
      appliedAt: '2026-05-20 15:00',
      policyStatus: 'active',
    }))
}

export function getBranchProtectionPolicyRequests() {
  return getMockSlice((data) => data.branchProtectionPolicyRequests, [])
}

export function getBranchProtectionPolicyRequestById(requestId) {
  return getBranchProtectionPolicyRequests().find((request) => request.id === requestId) ?? null
}

export function getBranchProtectionPolicyHistories(templateId) {
  const histories = getMockSlice((data) => data.branchProtectionPolicyHistories, [])
  return templateId ? histories.filter((history) => history.templateId === templateId) : histories
}

export function getRecommendedBranchProtectionTemplates(repositoryInput = {}) {
  const templates = getBranchProtectionTemplates()
  const isExternal = String(repositoryInput.visibility ?? '').toLowerCase() === 'external'
  const hasProduction = String(repositoryInput.defaultBranch ?? 'main').includes('main')

  if (isExternal) return templates.filter((template) => template.id === 'bpt-external-v11')
  if (hasProduction) return templates.filter((template) => template.status === 'active')
  return templates
}

export function getBranchProtectionTemplateForRepository(repositoryId) {
  return (
    getBranchProtectionTemplates().find((template) =>
      template.appliedRepositoryIds?.includes(repositoryId),
    ) ?? getBranchProtectionTemplateById('bpt-standard-v12')
  )
}

export function getBranchProtectionPolicySummary() {
  const templates = getBranchProtectionTemplates()
  const requests = getBranchProtectionPolicyRequests()
  const appliedRepositoryIds = new Set(templates.flatMap((template) => template.appliedRepositoryIds ?? []))

  return {
    total: templates.length,
    active: templates.filter((template) => template.status === 'active').length,
    appliedRepositories: appliedRepositoryIds.size,
    pendingRequests: requests.filter((request) => request.status === 'pending').length,
  }
}

export function submitBranchProtectionPolicyRequest(payload) {
  return Promise.resolve({ ok: true, id: payload?.id ?? `BPR-${Date.now()}` })
}

export function createBranchProtectionTemplate(payload) {
  return Promise.resolve({ ok: true, id: payload?.id ?? `bpt-${Date.now()}` })
}

export function updateBranchProtectionTemplate(templateId, payload) {
  return Promise.resolve({ ok: true, id: templateId, ...payload })
}

export function getBranchProtectionRepositoryOptions() {
  return getRepositories().map((repository) => ({
    value: repository.id,
    label: repository.name,
  }))
}
