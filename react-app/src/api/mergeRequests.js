import { findById, getMockSlice } from './mockClient'

export function getMergeRequests() {
  return getMockSlice((data) => data.mergeRequests.list, [])
}

export function getMergeRequestById(mergeRequestId) {
  const mergeRequests = getMergeRequests()
  const mergeRequest = findById(mergeRequests, mergeRequestId)

  return mergeRequest ?? null
}

export function getMergeRequestDetail(mergeRequestId) {
  const mergeRequest = getMergeRequestById(mergeRequestId)
  const detail = getMockSlice((data) => data.mergeRequests.detail, {})

  if (String(detail?.id) === String(mergeRequestId)) {
    return { ...mergeRequest, ...detail }
  }

  return mergeRequest ?? null
}

export function getMergeRequestsByRepository(repositoryId) {
  return getMergeRequests().filter((mergeRequest) => mergeRequest.repo === repositoryId)
}
