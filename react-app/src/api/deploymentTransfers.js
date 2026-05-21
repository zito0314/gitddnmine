import { findById, getMockSlice } from './mockClient'

export function getDeploymentTransfers() {
  return getMockSlice((data) => data.deploymentTransfers, [])
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
