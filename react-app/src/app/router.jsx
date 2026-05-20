import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import RepositoryLayout from '../components/layout/RepositoryLayout'
import Dashboard from '../pages/Dashboard'
import RepositoryList from '../pages/RepositoryList'
import RepositoryDetail from '../pages/RepositoryDetail'
import RepositoryFiles from '../pages/RepositoryFiles'
import RepositoryMergeRequests from '../pages/RepositoryMergeRequests'
import RepositoryPipelines from '../pages/RepositoryPipelines'
import RepositoryCommits from '../pages/RepositoryCommits'
import RepositoryBranches from '../pages/RepositoryBranches'
import RepositoryTags from '../pages/RepositoryTags'
import RepositorySecurity from '../pages/RepositorySecurity'
import RepositoryActivity from '../pages/RepositoryActivity'
import RepositorySettings from '../pages/RepositorySettings'
import MergeRequestList from '../pages/MergeRequestList'
import MergeRequestDetail from '../pages/MergeRequestDetail'
import PipelineList from '../pages/PipelineList'
import PipelineDetail from '../pages/PipelineDetail'
import SecurityList from '../pages/SecurityList'
import SecurityDetail from '../pages/SecurityDetail'
import AuditLog from '../pages/AuditLog'

export const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'repositories', element: <RepositoryList /> },
      {
        path: 'repositories/:repositoryId',
        element: <RepositoryLayout />,
        children: [
          { index: true, element: <RepositoryDetail /> },
          { path: 'files', element: <RepositoryFiles /> },
          { path: 'merge-requests', element: <RepositoryMergeRequests /> },
          { path: 'merge-requests/:mrId', element: <MergeRequestDetail /> },
          { path: 'pipelines', element: <RepositoryPipelines /> },
          { path: 'pipelines/:pipelineId', element: <PipelineDetail /> },
          { path: 'commits', element: <RepositoryCommits /> },
          { path: 'branches', element: <RepositoryBranches /> },
          { path: 'tags', element: <RepositoryTags /> },
          { path: 'security', element: <RepositorySecurity /> },
          { path: 'activity', element: <RepositoryActivity /> },
          { path: 'settings', element: <RepositorySettings /> },
        ],
      },
      { path: 'merge-requests', element: <MergeRequestList /> },
      { path: 'merge-requests/:mrId', element: <MergeRequestDetail /> },
      { path: 'pipelines', element: <PipelineList /> },
      { path: 'pipelines/:pipelineId', element: <PipelineDetail /> },
      { path: 'security', element: <SecurityList /> },
      { path: 'security/:securityId', element: <SecurityDetail /> },
      { path: 'audit', element: <AuditLog /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
