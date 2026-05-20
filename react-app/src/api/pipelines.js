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
