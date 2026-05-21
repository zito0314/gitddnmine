import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import RoleGuard from '../auth/RoleGuard'
import AppLayout from '../components/layout/AppLayout'
import AdminLayout from '../components/layout/AdminLayout'
import RepositoryLayout from '../components/layout/RepositoryLayout'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import AccessDenied from '../pages/AccessDenied'
import RepositoryList from '../pages/RepositoryList'
import RepositoryCreate from '../pages/RepositoryCreate'
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
import MergeRequestCreate from '../pages/MergeRequestCreate'
import MergeRequestDetail from '../pages/MergeRequestDetail'
import PipelineList from '../pages/PipelineList'
import PipelineDetail from '../pages/PipelineDetail'
import SecurityList from '../pages/SecurityList'
import SecurityDetail from '../pages/SecurityDetail'
import AuditLog from '../pages/AuditLog'
import DeploymentTransferCreate from '../pages/DeploymentTransferCreate'
import DeploymentTransferList from '../pages/DeploymentTransferList'
import DeploymentTransferDetail from '../pages/DeploymentTransferDetail'
import RepositoryDeploymentTransfers from '../pages/RepositoryDeploymentTransfers'
import AdminDashboard from '../pages/admin/AdminDashboard'
import OrganizationRoleAdmin from '../pages/admin/OrganizationRoleAdmin'
import RepositoryPolicyAdmin from '../pages/admin/RepositoryPolicyAdmin'
import MrApprovalPolicyAdmin from '../pages/admin/MrApprovalPolicyAdmin'
import SecurityPolicyAdmin from '../pages/admin/SecurityPolicyAdmin'
import DeploymentPolicyAdmin from '../pages/admin/DeploymentPolicyAdmin'
import AuditPolicyAdmin from '../pages/admin/AuditPolicyAdmin'
import NotificationPolicyAdmin from '../pages/admin/NotificationPolicyAdmin'
import IntegrationAdmin from '../pages/admin/IntegrationAdmin'
import ThemeBrandingAdmin from '../pages/admin/ThemeBrandingAdmin'

export const routes = [
  { path: '/login', element: <Login /> },
  {
    path: '/access-denied',
    element: (
      <ProtectedRoute>
        <AccessDenied />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RoleGuard>
          <AppLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'repositories', element: <RepositoryList /> },
      { path: 'repositories/new', element: <RepositoryCreate /> },
      {
        path: 'repositories/:repositoryId',
        element: <RepositoryLayout />,
        children: [
          { index: true, element: <RepositoryDetail /> },
          { path: 'files', element: <RepositoryFiles /> },
          { path: 'merge-requests', element: <RepositoryMergeRequests /> },
          { path: 'merge-requests/new', element: <MergeRequestCreate /> },
          { path: 'merge-requests/:mrId', element: <MergeRequestDetail /> },
          { path: 'pipelines', element: <RepositoryPipelines /> },
          { path: 'pipelines/:pipelineId', element: <PipelineDetail /> },
          { path: 'deployment-transfer', element: <RepositoryDeploymentTransfers /> },
          { path: 'deployment-transfer/new', element: <DeploymentTransferCreate /> },
          { path: 'deployment-transfer/:transferId', element: <DeploymentTransferDetail /> },
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
      { path: 'deployment-transfer', element: <DeploymentTransferList /> },
      { path: 'deployment-transfer/new', element: <DeploymentTransferCreate /> },
      { path: 'deployment-transfer/:transferId', element: <DeploymentTransferDetail /> },
      { path: 'security', element: <SecurityList /> },
      { path: 'security/:securityId', element: <SecurityDetail /> },
      { path: 'audit', element: <AuditLog /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <RoleGuard roles={['admin']}>
          <AdminLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'organization', element: <OrganizationRoleAdmin /> },
      { path: 'repository-policy', element: <RepositoryPolicyAdmin /> },
      { path: 'mr-approval-policy', element: <MrApprovalPolicyAdmin /> },
      { path: 'security-policy', element: <SecurityPolicyAdmin /> },
      { path: 'deployment-policy', element: <DeploymentPolicyAdmin /> },
      { path: 'audit-policy', element: <AuditPolicyAdmin /> },
      { path: 'notification-policy', element: <NotificationPolicyAdmin /> },
      { path: 'integration', element: <IntegrationAdmin /> },
      { path: 'theme', element: <ThemeBrandingAdmin /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
