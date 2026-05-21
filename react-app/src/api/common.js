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

export function getHeaderOrganizations() {
  return getOrganizations()
}

export function getStatusMap() {
  return getMockSlice((data) => data.common.status, {})
}

export function getGnbCounts() {
  return getMockSlice((data) => data.common.gnbCounts, {})
}

export function getNotifications() {
  return getMockSlice((data) => data.common.notifications, [])
}

export function getGlobalSearchResults(query) {
  const normalizedQuery = String(query ?? '').trim().toLowerCase()
  if (!normalizedQuery) return []

  const data = getMockSlice((mockData) => mockData, {})
  const repositories = data.repositories?.list ?? []
  const mergeRequests = data.mergeRequests?.list ?? []
  const pipelines = data.pipelines?.list ?? []
  const securityValidations = data.security?.validations ?? []
  const deploymentTransfers = data.deploymentTransfers ?? []
  const auditLogs = data.audit?.logs ?? []
  const adminPolicies = [
    ...(data.admin?.policies?.repository ?? []).map((policy) => ({ ...policy, area: 'Repository Policy', href: '/admin/repository-policy' })),
    ...(data.admin?.policies?.mrApproval ?? []).map((policy) => ({ ...policy, area: 'MR Approval Policy', href: '/admin/mr-approval-policy' })),
    ...(data.admin?.policies?.security ?? []).map((policy) => ({ ...policy, area: 'Security Policy', href: '/admin/security-policy' })),
    ...(data.admin?.policies?.deployment ?? []).map((policy) => ({ ...policy, area: 'Deployment Policy', href: '/admin/deployment-policy' })),
    ...(data.admin?.policies?.audit ?? []).map((policy) => ({ ...policy, area: 'Audit Policy', href: '/admin/audit-policy' })),
    ...(data.admin?.policies?.notification ?? []).map((policy) => ({ ...policy, area: 'Notification Policy', href: '/admin/notification-policy' })),
  ]

  return [
    ...repositories.map((repository) => ({
      id: `repository-${repository.id}`,
      type: 'Repository',
      title: repository.name,
      description: repository.description,
      status: repository.pipelineStatus,
      href: `/repositories/${repository.id}`,
      searchable: [repository.name, repository.group, repository.description, repository.pipelineStatus, repository.securityStatus],
    })),
    ...mergeRequests.map((mergeRequest) => ({
      id: `mr-${mergeRequest.id}`,
      type: 'Merge Request',
      title: `!${mergeRequest.id} ${mergeRequest.title}`,
      description: `${mergeRequest.repo} · ${mergeRequest.source} → ${mergeRequest.target}`,
      status: mergeRequest.review,
      href: `/repositories/${mergeRequest.repo}/merge-requests/${mergeRequest.id}`,
      searchable: [mergeRequest.id, mergeRequest.title, mergeRequest.summary, mergeRequest.repo, mergeRequest.source, mergeRequest.target, mergeRequest.author],
    })),
    ...pipelines.map((pipeline) => ({
      id: `pipeline-${pipeline.id}`,
      type: 'Pipeline',
      title: `#${pipeline.id} ${pipeline.title ?? pipeline.branch}`,
      description: `${pipeline.repo} · ${pipeline.branch} · ${pipeline.commit}`,
      status: pipeline.status,
      href: `/repositories/${pipeline.repo}/pipelines/${pipeline.id}`,
      searchable: [pipeline.id, pipeline.title, pipeline.repo, pipeline.branch, pipeline.commit, pipeline.author, pipeline.status],
    })),
    ...securityValidations.map((validation) => ({
      id: `security-${validation.id}`,
      type: 'Security Validation',
      title: `${validation.id} ${validation.mrTitle}`,
      description: `${validation.repo} · ${validation.policyLabel}`,
      status: validation.policy,
      href: `/security/${validation.id}`,
      searchable: [validation.id, validation.mrTitle, validation.repo, validation.author, validation.policyLabel, validation.vlabel],
    })),
    ...deploymentTransfers.map((transfer) => ({
      id: `deployment-${transfer.transferId}`,
      type: 'Deployment Transfer',
      title: transfer.transferId,
      description: `${transfer.repositoryId} · ${transfer.targetEnvironment} · ${transfer.policyDecision}`,
      status: transfer.status,
      href: `/deployment-transfer/${transfer.transferId}`,
      searchable: [transfer.transferId, transfer.repositoryId, transfer.targetEnvironment, transfer.policyDecision, transfer.requestedBy, transfer.status],
    })),
    ...auditLogs.slice(0, 20).map((log) => ({
      id: `audit-${log.id}`,
      type: 'Audit Event',
      title: log.title,
      description: `${log.targetName} · ${log.message}`,
      status: log.severity,
      href: '/audit',
      searchable: [log.id, log.title, log.message, log.actorName, log.targetName, log.targetDetail, log.severity],
    })),
    ...adminPolicies.map((policy) => ({
      id: `policy-${policy.id}`,
      type: 'Admin Policy',
      title: policy.name,
      description: `${policy.area} · ${policy.value}`,
      status: policy.enabled ? 'approved' : 'pending',
      href: policy.href,
      searchable: [policy.id, policy.name, policy.value, policy.area],
    })),
  ]
    .filter((item) => item.searchable.filter(Boolean).join(' ').toLowerCase().includes(normalizedQuery))
    .slice(0, 8)
}
