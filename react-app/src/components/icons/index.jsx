import SvgIcon from './SvgIcon'

import alertOutlinedSvg from './svg/alert-outlined.svg?raw'
import apiOutlinedSvg from './svg/api-outlined.svg?raw'
import appstoreOutlinedSvg from './svg/appstore-outlined.svg?raw'
import auditOutlinedSvg from './svg/audit-outlined.svg?raw'
import bellOutlinedSvg from './svg/bell-outlined.svg?raw'
import bgColorsOutlinedSvg from './svg/bg-colors-outlined.svg?raw'
import branchesOutlinedSvg from './svg/branches-outlined.svg?raw'
import checkCircleOutlinedSvg from './svg/check-circle-outlined.svg?raw'
import clockCircleOutlinedSvg from './svg/clock-circle-outlined.svg?raw'
import codeOutlinedSvg from './svg/code-outlined.svg?raw'
import commentOutlinedSvg from './svg/comment-outlined.svg?raw'
import dashboardOutlinedSvg from './svg/dashboard-outlined.svg?raw'
import databaseOutlinedSvg from './svg/database-outlined.svg?raw'
import deploymentUnitOutlinedSvg from './svg/deployment-unit-outlined.svg?raw'
import downOutlinedSvg from './svg/down-outlined.svg?raw'
import downloadOutlinedSvg from './svg/download-outlined.svg?raw'
import exclamationCircleOutlinedSvg from './svg/exclamation-circle-outlined.svg?raw'
import eyeOutlinedSvg from './svg/eye-outlined.svg?raw'
import fileOutlinedSvg from './svg/file-outlined.svg?raw'
import fileSearchOutlinedSvg from './svg/file-search-outlined.svg?raw'
import fileTextOutlinedSvg from './svg/file-text-outlined.svg?raw'
import folderOutlinedSvg from './svg/folder-outlined.svg?raw'
import gitlabOutlinedSvg from './svg/gitlab-outlined.svg?raw'
import globalOutlinedSvg from './svg/global-outlined.svg?raw'
import historyOutlinedSvg from './svg/history-outlined.svg?raw'
import homeOutlinedSvg from './svg/home-outlined.svg?raw'
import linkOutlinedSvg from './svg/link-outlined.svg?raw'
import lockOutlinedSvg from './svg/lock-outlined.svg?raw'
import mailOutlinedSvg from './svg/mail-outlined.svg?raw'
import menuFoldOutlinedSvg from './svg/menu-fold-outlined.svg?raw'
import menuUnfoldOutlinedSvg from './svg/menu-unfold-outlined.svg?raw'
import moonOutlinedSvg from './svg/moon-outlined.svg?raw'
import nodeIndexOutlinedSvg from './svg/node-index-outlined.svg?raw'
import playCircleOutlinedSvg from './svg/play-circle-outlined.svg?raw'
import plusOutlinedSvg from './svg/plus-outlined.svg?raw'
import pullRequestOutlinedSvg from './svg/pull-request-outlined.svg?raw'
import questionCircleOutlinedSvg from './svg/question-circle-outlined.svg?raw'
import reloadOutlinedSvg from './svg/reload-outlined.svg?raw'
import rocketOutlinedSvg from './svg/rocket-outlined.svg?raw'
import safetyCertificateOutlinedSvg from './svg/safety-certificate-outlined.svg?raw'
import saveOutlinedSvg from './svg/save-outlined.svg?raw'
import scanOutlinedSvg from './svg/scan-outlined.svg?raw'
import searchOutlinedSvg from './svg/search-outlined.svg?raw'
import sendOutlinedSvg from './svg/send-outlined.svg?raw'
import settingOutlinedSvg from './svg/setting-outlined.svg?raw'
import starFilledSvg from './svg/star-filled.svg?raw'
import starOutlinedSvg from './svg/star-outlined.svg?raw'
import stopOutlinedSvg from './svg/stop-outlined.svg?raw'
import sunOutlinedSvg from './svg/sun-outlined.svg?raw'
import tagOutlinedSvg from './svg/tag-outlined.svg?raw'
import tagsOutlinedSvg from './svg/tags-outlined.svg?raw'
import teamOutlinedSvg from './svg/team-outlined.svg?raw'
import toolOutlinedSvg from './svg/tool-outlined.svg?raw'
import uploadOutlinedSvg from './svg/upload-outlined.svg?raw'
import userOutlinedSvg from './svg/user-outlined.svg?raw'
import userSwitchOutlinedSvg from './svg/user-switch-outlined.svg?raw'
import warningOutlinedSvg from './svg/warning-outlined.svg?raw'

function createIcon(svg) {
  return function AppIcon(props) {
    return <SvgIcon svg={svg} {...props} />
  }
}

// Change the SVG assigned to any export here to replace that icon everywhere.
export const AlertOutlined = createIcon(alertOutlinedSvg)
export const ApiOutlined = createIcon(apiOutlinedSvg)
export const AppstoreOutlined = createIcon(appstoreOutlinedSvg)
export const AuditOutlined = createIcon(auditOutlinedSvg)
export const BellOutlined = createIcon(bellOutlinedSvg)
export const BgColorsOutlined = createIcon(bgColorsOutlinedSvg)
export const BranchesOutlined = createIcon(branchesOutlinedSvg)
export const CheckCircleOutlined = createIcon(checkCircleOutlinedSvg)
export const ClockCircleOutlined = createIcon(clockCircleOutlinedSvg)
export const CodeOutlined = createIcon(codeOutlinedSvg)
export const CommentOutlined = createIcon(commentOutlinedSvg)
export const DashboardOutlined = createIcon(dashboardOutlinedSvg)
export const DatabaseOutlined = createIcon(databaseOutlinedSvg)
export const DeploymentUnitOutlined = createIcon(deploymentUnitOutlinedSvg)
export const DownOutlined = createIcon(downOutlinedSvg)
export const DownloadOutlined = createIcon(downloadOutlinedSvg)
export const ExclamationCircleOutlined = createIcon(exclamationCircleOutlinedSvg)
export const EyeOutlined = createIcon(eyeOutlinedSvg)
export const FileOutlined = createIcon(fileOutlinedSvg)
export const FileSearchOutlined = createIcon(fileSearchOutlinedSvg)
export const FileTextOutlined = createIcon(fileTextOutlinedSvg)
export const FolderOutlined = createIcon(folderOutlinedSvg)
export const GitlabOutlined = createIcon(gitlabOutlinedSvg)
export const GlobalOutlined = createIcon(globalOutlinedSvg)
export const HistoryOutlined = createIcon(historyOutlinedSvg)
export const HomeOutlined = createIcon(homeOutlinedSvg)
export const LinkOutlined = createIcon(linkOutlinedSvg)
export const LockOutlined = createIcon(lockOutlinedSvg)
export const MailOutlined = createIcon(mailOutlinedSvg)
export const MenuFoldOutlined = createIcon(menuFoldOutlinedSvg)
export const MenuUnfoldOutlined = createIcon(menuUnfoldOutlinedSvg)
export const MoonOutlined = createIcon(moonOutlinedSvg)
export const NodeIndexOutlined = createIcon(nodeIndexOutlinedSvg)
export const PlayCircleOutlined = createIcon(playCircleOutlinedSvg)
export const PlusOutlined = createIcon(plusOutlinedSvg)
export const PullRequestOutlined = createIcon(pullRequestOutlinedSvg)
export const QuestionCircleOutlined = createIcon(questionCircleOutlinedSvg)
export const ReloadOutlined = createIcon(reloadOutlinedSvg)
export const RocketOutlined = createIcon(rocketOutlinedSvg)
export const SafetyCertificateOutlined = createIcon(safetyCertificateOutlinedSvg)
export const SaveOutlined = createIcon(saveOutlinedSvg)
export const ScanOutlined = createIcon(scanOutlinedSvg)
export const SearchOutlined = createIcon(searchOutlinedSvg)
export const SendOutlined = createIcon(sendOutlinedSvg)
export const SettingOutlined = createIcon(settingOutlinedSvg)
export const StarFilled = createIcon(starFilledSvg)
export const StarOutlined = createIcon(starOutlinedSvg)
export const StopOutlined = createIcon(stopOutlinedSvg)
export const SunOutlined = createIcon(sunOutlinedSvg)
export const TagOutlined = createIcon(tagOutlinedSvg)
export const TagsOutlined = createIcon(tagsOutlinedSvg)
export const TeamOutlined = createIcon(teamOutlinedSvg)
export const ToolOutlined = createIcon(toolOutlinedSvg)
export const UploadOutlined = createIcon(uploadOutlinedSvg)
export const UserOutlined = createIcon(userOutlinedSvg)
export const UserSwitchOutlined = createIcon(userSwitchOutlinedSvg)
export const WarningOutlined = createIcon(warningOutlinedSvg)
