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

export function getMergeRequestCommits(mergeRequestId) {
  const mergeRequest = getMergeRequestDetail(mergeRequestId)
  const commits = getMockSlice((data) => data.commits, []).filter(
    (commit) => String(commit.mrId) === String(mergeRequestId),
  )

  if (commits.length > 0) return commits
  if (!mergeRequest) return []

  return [
    {
      id: `${mergeRequestId}-a1`,
      sha: mergeRequest.id === 128 ? '7e14d754' : `${mergeRequestId}a91f3c`,
      title: `${mergeRequest.title} 핵심 로직 반영`,
      message: `${mergeRequest.title} 핵심 로직 반영`,
      author: mergeRequest.author,
      createdAt: mergeRequest.updatedAt,
      branch: mergeRequest.source,
      changedFiles: mergeRequest.diff?.files ?? 4,
      added: Number(String(mergeRequest.diff?.added ?? '+80').replace('+', '')),
      removed: Number(String(mergeRequest.diff?.removed ?? '-20').replace('-', '')),
    },
    {
      id: `${mergeRequestId}-b2`,
      sha: `${mergeRequestId}f4c82d`,
      title: '검증 케이스와 정책 조건 정리',
      message: '검증 케이스와 정책 조건 정리',
      author: mergeRequest.author,
      createdAt: '어제',
      branch: mergeRequest.source,
      changedFiles: 3,
      added: 42,
      removed: 11,
    },
  ]
}

export function getMergeRequestMergePolicy() {
  return getMockSlice((data) => data.mrMergePolicies?.[0], {
    id: 'mcp-finance-standard',
    name: '금융권 표준 MR Merge 조건',
    minimumApprovals: 2,
    requirePipelineSuccess: true,
    requireSecurityValidation: true,
    requireResolvedDiscussions: true,
    requireNoConflicts: true,
    requireDeploymentApproval: true,
    allowedMergeRoles: ['Maintainer', 'Admin'],
  })
}

export function getMergeRequestMergeChecklist(mergeRequestId) {
  const mergeRequest = getMergeRequestDetail(mergeRequestId)
  const pipeline = getMergeRequestPipeline(mergeRequestId)
  const security = getMergeRequestSecurity(mergeRequestId)
  const policy = getMergeRequestMergePolicy()
  if (!mergeRequest) return []

  return [
    {
      label: 'Required approvals completed',
      status: mergeRequest.approved >= Math.max(mergeRequest.required ?? 0, policy.minimumApprovals ?? 0) ? 'passed' : 'pending',
    },
    {
      label: 'Reviewer approval completed',
      status: mergeRequest.review === 'approved' ? 'passed' : mergeRequest.review === 'rejected' ? 'failed' : 'pending',
    },
    {
      label: 'Pipeline passed',
      status: (pipeline?.status ?? mergeRequest.pipeline) === 'passed' ? 'passed' : (pipeline?.status ?? mergeRequest.pipeline) === 'failed' ? 'failed' : 'pending',
    },
    {
      label: 'Security validation passed',
      status: ['passed', 'pass'].includes(security?.vstatus ?? mergeRequest.security) ? 'passed' : (security?.policy === 'blocked' || mergeRequest.security === 'failed') ? 'failed' : 'warning',
    },
    {
      label: 'No unresolved discussions',
      status: mergeRequest.comments > 0 ? 'warning' : 'passed',
    },
    {
      label: 'No merge conflicts',
      status: mergeRequest.status === 'conflict' ? 'failed' : 'passed',
    },
    {
      label: 'Branch protection satisfied',
      status: ['main', 'develop'].includes(mergeRequest.target) ? 'passed' : 'warning',
    },
    {
      label: 'Deployment transfer approval completed',
      status: mergeRequest.gates?.find((gate) => gate.title === '운영 이관')?.tone === 'success' ? 'passed' : 'pending',
    },
  ]
}

export function getMergeRequestChangedFiles(mergeRequestId) {
  const mergeRequest = getMergeRequestDetail(mergeRequestId)
  if (!mergeRequest) return []

  const baseFiles =
    mergeRequest.repo === 'customer-web-portal'
      ? ['src/components/AuthBanner.jsx', 'src/pages/Login.jsx', 'src/styles/auth-banner.css']
      : mergeRequest.repo === 'auth-policy-engine'
        ? ['src/policies/role-import.ts', 'src/services/permission-mapper.ts', 'test/role-import.spec.ts']
        : ['src/api/auth-policy.ts', 'src/services/account-limit.service.ts', 'test/auth-policy.spec.ts']

  return baseFiles.map((path, index) => ({
    id: `${mergeRequestId}-${index}`,
    path,
    changeType: index === 0 ? 'modified' : index === 1 ? 'added' : 'modified',
    additions: index === 0 ? 86 : 42,
    deletions: index === 0 ? 24 : 7,
    diff: [
      `  export function validatePolicy(input) {`,
      `-   return legacyValidate(input)`,
      `+   return validateWithGovernanceRules(input)`,
      `+   // policy gate aligned with branch protection template`,
      `  }`,
    ],
  }))
}

export function getMergeRequestChanges(mergeRequestId) {
  const mergeRequest = getMergeRequestDetail(mergeRequestId)
  const files = getMergeRequestChangedFiles(mergeRequestId)

  return {
    files,
    summary: {
      changedFiles: mergeRequest?.diff?.files ?? files.length,
      additions: mergeRequest?.diff?.added ?? `+${files.reduce((sum, file) => sum + file.additions, 0)}`,
      deletions: mergeRequest?.diff?.removed ?? `-${files.reduce((sum, file) => sum + file.deletions, 0)}`,
      commitsCount: getMergeRequestCommits(mergeRequestId).length,
      mainPaths: files.slice(0, 4).map((file) => file.path),
    },
  }
}

function toApprovalStatus(result) {
  if (result === '승인' || result === '확인 완료') return 'approved'
  if (result === '반려') return 'rejected'
  if (result === '검토 중') return 'reviewing'
  return 'pending'
}
