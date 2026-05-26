import SvgIcon from './SvgIcon'

import alertOutlinedSvg from './svg/AlertOutlined.svg?raw'
import apiOutlinedSvg from './svg/ApiOutlined.svg?raw'
import appstoreOutlinedSvg from './svg/AppstoreOutlined.svg?raw'
import auditOutlinedSvg from './svg/AuditOutlined.svg?raw'
import bellOutlinedSvg from './svg/BellOutlined.svg?raw'
import bgColorsOutlinedSvg from './svg/BgColorsOutlined.svg?raw'
import branchesOutlinedSvg from './svg/BranchesOutlined.svg?raw'
import checkCircleOutlinedSvg from './svg/CheckCircleOutlined.svg?raw'
import clockCircleOutlinedSvg from './svg/ClockCircleOutlined.svg?raw'
import codeOutlinedSvg from './svg/CodeOutlined.svg?raw'
import commentOutlinedSvg from './svg/CommentOutlined.svg?raw'
import dashboardOutlinedSvg from './svg/DashboardOutlined.svg?raw'
import databaseOutlinedSvg from './svg/DatabaseOutlined.svg?raw'
import deploymentUnitOutlinedSvg from './svg/DeploymentUnitOutlined.svg?raw'
import downOutlinedSvg from './svg/DownOutlined.svg?raw'
import downloadOutlinedSvg from './svg/DownloadOutlined.svg?raw'
import exclamationCircleOutlinedSvg from './svg/ExclamationCircleOutlined.svg?raw'
import eyeOutlinedSvg from './svg/EyeOutlined.svg?raw'
import fileOutlinedSvg from './svg/FileOutlined.svg?raw'
import fileSearchOutlinedSvg from './svg/FileSearchOutlined.svg?raw'
import fileTextOutlinedSvg from './svg/FileTextOutlined.svg?raw'
import folderOutlinedSvg from './svg/FolderOutlined.svg?raw'
import gitlabOutlinedSvg from './svg/GitlabOutlined.svg?raw'
import globalOutlinedSvg from './svg/GlobalOutlined.svg?raw'
import historyOutlinedSvg from './svg/HistoryOutlined.svg?raw'
import homeOutlinedSvg from './svg/HomeOutlined.svg?raw'
import linkOutlinedSvg from './svg/LinkOutlined.svg?raw'
import lockOutlinedSvg from './svg/LockOutlined.svg?raw'
import mailOutlinedSvg from './svg/MailOutlined.svg?raw'
import menuFoldOutlinedSvg from './svg/MenuFoldOutlined.svg?raw'
import menuUnfoldOutlinedSvg from './svg/MenuUnfoldOutlined.svg?raw'
import moonOutlinedSvg from './svg/MoonOutlined.svg?raw'
import nodeIndexOutlinedSvg from './svg/NodeIndexOutlined.svg?raw'
import playCircleOutlinedSvg from './svg/PlayCircleOutlined.svg?raw'
import plusOutlinedSvg from './svg/PlusOutlined.svg?raw'
import pullRequestOutlinedSvg from './svg/PullRequestOutlined.svg?raw'
import questionCircleOutlinedSvg from './svg/QuestionCircleOutlined.svg?raw'
import reloadOutlinedSvg from './svg/ReloadOutlined.svg?raw'
import rocketOutlinedSvg from './svg/RocketOutlined.svg?raw'
import safetyCertificateOutlinedSvg from './svg/SafetyCertificateOutlined.svg?raw'
import saveOutlinedSvg from './svg/SaveOutlined.svg?raw'
import scanOutlinedSvg from './svg/ScanOutlined.svg?raw'
import searchOutlinedSvg from './svg/SearchOutlined.svg?raw'
import sendOutlinedSvg from './svg/SendOutlined.svg?raw'
import settingOutlinedSvg from './svg/SettingOutlined.svg?raw'
import starFilledSvg from './svg/StarFilled.svg?raw'
import starOutlinedSvg from './svg/StarOutlined.svg?raw'
import stopOutlinedSvg from './svg/StopOutlined.svg?raw'
import sunOutlinedSvg from './svg/SunOutlined.svg?raw'
import tagOutlinedSvg from './svg/TagOutlined.svg?raw'
import tagsOutlinedSvg from './svg/TagsOutlined.svg?raw'
import teamOutlinedSvg from './svg/TeamOutlined.svg?raw'
import toolOutlinedSvg from './svg/ToolOutlined.svg?raw'
import uploadOutlinedSvg from './svg/UploadOutlined.svg?raw'
import userOutlinedSvg from './svg/UserOutlined.svg?raw'
import userSwitchOutlinedSvg from './svg/UserSwitchOutlined.svg?raw'
import warningOutlinedSvg from './svg/WarningOutlined.svg?raw'

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
