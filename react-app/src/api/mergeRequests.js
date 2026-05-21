import { findById, getMockSlice } from './mockClient'
import { filterItemsByRepositoryAccess, getStoredAuthUser } from '../auth/permissions'

export function getMergeRequests() {
  return filterItemsByRepositoryAccess(getMockSlice((data) => data.mergeRequests.list, []), getStoredAuthUser(), 'repo')
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

export function getMergeRequestPipeline(mergeRequestId) {
  return getMockSlice((data) => data.pipelines.list, []).find(
    (pipeline) => String(pipeline.mrId) === String(mergeRequestId),
  ) ?? null
}

export function getMergeRequestSecurity(mergeRequestId) {
  return getMockSlice((data) => data.security.validations, []).find(
    (validation) => String(validation.mrId) === String(mergeRequestId),
  ) ?? null
}

export function getMergeRequestApprovals(mergeRequestId) {
  const mergeRequest = getMergeRequestDetail(mergeRequestId)
  const approvalGate = mergeRequest?.gates?.find((gate) => gate.type === 'approval')

  return (
    approvalGate?.items?.map((item) => ({
      name: item.title,
      role: item.desc,
      required: item.desc?.includes('필수') ?? false,
      status: toApprovalStatus(item.result),
      label: item.result,
    })) ?? []
  )
}

export function getMergeRequestActivities(mergeRequestId) {
  const pipeline = getMergeRequestPipeline(mergeRequestId)
  const mergeRequest = getMergeRequestDetail(mergeRequestId)
  const globalActivities = getMockSlice((data) => data.activities, []).filter(
    (activity) =>
      (activity.targetType === 'mergeRequest' && String(activity.targetId) === String(mergeRequestId)) ||
      (activity.repositoryId === mergeRequest?.repo &&
        activity.targetType === 'pipeline' &&
        String(activity.targetId) === String(pipeline?.id)),
  )
  const historyActivities =
    mergeRequest?.activity?.history?.map((item, index) => ({
      id: `history-${mergeRequestId}-${index}`,
      actor: mergeRequest.author,
      message: `${item.title}: ${item.desc}`,
      createdAt: item.time,
    })) ?? []

  return [...globalActivities, ...historyActivities]
}

export function getMergeRequestComments(mergeRequestId) {
  const mergeRequest = getMergeRequestDetail(mergeRequestId)
  const activity = mergeRequest?.activity ?? {}

  return [...(activity.general ?? []), ...(activity.review ?? []), ...(activity.line ?? [])].map(
    (comment, index) => ({
      id: `comment-${mergeRequestId}-${index}`,
      author: comment.author,
      avatar: comment.avatar,
      context: comment.file ?? comment.stateLabel ?? 'Comment',
      body: comment.comment,
      createdAt: comment.time,
    }),
  )
}

function toApprovalStatus(result) {
  if (result === '승인' || result === '확인 완료') return 'approved'
  if (result === '반려') return 'rejected'
  if (result === '검토 중') return 'reviewing'
  return 'pending'
}
