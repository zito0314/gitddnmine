import { findById, getMockSlice } from './mockClient'

export function getPipelines() {
  return getMockSlice((data) => data.pipelines.list, [])
}

export function getPipelineById(pipelineId) {
  const pipelines = getPipelines()
  const pipeline = findById(pipelines, pipelineId)

  return pipeline ?? null
}

export function getPipelineDetail(pipelineId) {
  const pipeline = getPipelineById(pipelineId)
  const detail = getMockSlice((data) => data.pipelines.detail, {})

  if (String(detail?.id) === String(pipelineId)) {
    return { ...pipeline, ...detail }
  }

  return pipeline ?? null
}

export function getJobs() {
  return getMockSlice((data) => data.jobs, [])
}

export function getPipelinesByRepository(repositoryId) {
  return getPipelines().filter((pipeline) => pipeline.repo === repositoryId)
}

export function getPipelinesByRepositoryId(repositoryId) {
  return getPipelinesByRepository(repositoryId)
}

export function getRepositoryPipelineSummary(repositoryId) {
  const pipelines = getPipelinesByRepository(repositoryId)

  return {
    total: pipelines.length,
    passed: pipelines.filter((pipeline) => pipeline.status === 'passed' || pipeline.result === 'passed').length,
    failed: pipelines.filter((pipeline) => pipeline.status === 'failed').length,
    running: pipelines.filter((pipeline) => pipeline.status === 'running').length,
    manualRequired: pipelines.filter((pipeline) => pipeline.jobs?.includes('manual')).length,
  }
}

export function getPipelineJobs(pipelineId) {
  const jobs = getJobs().filter((job) => String(job.pipelineId) === String(pipelineId))
  if (jobs.length > 0) return jobs

  const pipeline = getPipelineDetail(pipelineId)
  return (
    pipeline?.stages?.flatMap((stage) =>
      (stage.jobs ?? []).map((job, index) => ({
        id: `${pipelineId}-${stage.name}-${job.name}-${index}`,
        name: job.name,
        stage: stage.name,
        status: job.status,
        statusLabel: job.status,
        runner: 'runner-secure-02',
        duration: job.status === 'pending' || job.status === 'created' ? '-' : '00:32',
        startedAt: pipeline.updatedAt,
        finishedAt: job.status === 'pending' || job.status === 'created' ? '-' : '방금',
        pipelineId,
        log: [
          '$ npm ci',
          `$ npm run ${job.name}`,
          `Running ${job.name} for ${pipeline.repo}`,
          job.status === 'failed' ? '✕ job failed' : '✓ job completed',
          job.status === 'failed' ? 'Job failed with exit code 1' : 'Job succeeded',
        ],
      })),
    ) ?? []
  )
}

export function getPipelineStages(pipelineId) {
  const pipeline = getPipelineDetail(pipelineId)
  const jobs = getPipelineJobs(pipelineId)

  if (pipeline?.stages?.length) return pipeline.stages

  const stageMap = new Map()
  for (const job of jobs) {
    const current = stageMap.get(job.stage) ?? { name: job.stage, status: 'passed', jobs: [] }
    current.jobs.push({ name: job.name, status: job.status })
    if (job.status === 'failed' || job.status === 'blocked') current.status = 'failed'
    else if (job.status === 'running' && current.status !== 'failed') current.status = 'running'
    else if (['pending', 'manual', 'created'].includes(job.status) && current.status === 'passed') {
      current.status = 'pending'
    }
    stageMap.set(job.stage, current)
  }

  return [...stageMap.values()]
}

export function getPipelineLogs(pipelineId) {
  const failedJobs = getPipelineJobs(pipelineId).filter((job) =>
    ['failed', 'blocked'].includes(job.status),
  )
  const sourceJobs = failedJobs.length ? failedJobs : getPipelineJobs(pipelineId).slice(-2)

  return sourceJobs.flatMap((job) => (job.log ?? []).map((line) => `[${job.name}] ${line}`)).slice(-12)
}

export function getPipelineRelatedMergeRequest(pipelineId) {
  const pipeline = getPipelineDetail(pipelineId)
  const mergeRequests = getMockSlice((data) => data.mergeRequests.list, [])
  return mergeRequests.find((mergeRequest) => String(mergeRequest.id) === String(pipeline?.mrId)) ?? null
}

export function getPipelineCommit(pipelineId) {
  const pipeline = getPipelineDetail(pipelineId)
  const commits = getMockSlice((data) => data.commits, [])
  return commits.find((commit) => commit.sha === pipeline?.commit || commit.id === pipeline?.commit) ?? null
}

export function getPipelineOverview(pipelineId) {
  const pipeline = getPipelineDetail(pipelineId)
  if (!pipeline) return null

  const jobs = getPipelineJobs(pipelineId)
  const stages = getPipelineStages(pipelineId)
  const relatedMergeRequest = getPipelineRelatedMergeRequest(pipelineId)
  const commit = getPipelineCommit(pipelineId)
  const logs = getPipelineLogs(pipelineId)
  const failedJobs = jobs.filter((job) => ['failed', 'blocked'].includes(job.status))
  const runningJobs = jobs.filter((job) => job.status === 'running')
  const passedJobs = jobs.filter((job) => job.status === 'passed')
  const duration = pipeline.summary?.find((item) => item.label === '실제 실행 시간')?.value ?? '-'
  const failedStage = stages.find((stage) => stage.status === 'failed')?.name ?? '-'

  return {
    pipeline,
    jobs,
    stages,
    relatedMergeRequest,
    commit,
    logs,
    failedJobs,
    summary: {
      totalJobs: jobs.length,
      passedJobs: passedJobs.length,
      failedJobs: failedJobs.length,
      runningJobs: runningJobs.length,
      duration,
      failedStage,
    },
  }
}
