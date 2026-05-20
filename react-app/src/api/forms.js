import { getMockSlice } from './mockClient'

export function getRepositoryTemplates() {
  return getMockSlice((data) => data.forms.repositoryTemplates, [])
}

export function getRepositoryMembers() {
  return getMockSlice((data) => data.forms.repositoryMembers, [])
}

export function getMergeRequestFormOptions() {
  return getMockSlice(
    (data) => ({
      repositories: data.forms.mrRepositories,
      sourceBranches: data.forms.sourceBranches,
      targetBranches: data.forms.targetBranches,
      branchCommits: data.forms.branchCommits,
      reviewers: data.forms.reviewers,
    }),
    {},
  )
}
