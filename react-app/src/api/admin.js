import { getMockSlice } from './mockClient'
import { getManagedOrganizations } from './organizations'

export function getAdminSummary() {
  return getMockSlice((data) => data.admin.summary, {})
}

export function getOrganizations() {
  return getManagedOrganizations({ includeInactive: true })
}

export function getUsers() {
  return getMockSlice((data) => data.user.users, [])
}

export function getRoles() {
  return getMockSlice((data) => data.admin.roles, [])
}

export function getRoleMappings() {
  return getMockSlice((data) => data.admin.roleMappings, [])
}

export function getRepositoryPolicies() {
  return getMockSlice((data) => data.admin.policies.repository, [])
}

export function getMrApprovalPolicies() {
  return getMockSlice((data) => data.admin.policies.mrApproval, [])
}

export function getSecurityPolicies() {
  return getMockSlice((data) => data.admin.policies.security, [])
}

export function getDeploymentPolicies() {
  return getMockSlice((data) => data.admin.policies.deployment, [])
}

export function getAuditPolicies() {
  return getMockSlice((data) => data.admin.policies.audit, [])
}

export function getNotificationPolicies() {
  return getMockSlice((data) => data.admin.policies.notification, [])
}

export function getIntegrations() {
  return getMockSlice((data) => data.admin.integrations, [])
}

export function getThemeSettings() {
  return getMockSlice((data) => data.admin.themeSettings, {})
}

export function getAdminAuditLogs() {
  return getMockSlice((data) => data.admin.adminAuditLogs, [])
}
