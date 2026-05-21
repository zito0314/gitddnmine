import { Tag } from 'antd'

const STATUS_PRESETS = {
  approved: { tone: 'success', label: '승인 완료' },
  accepted: { tone: 'success', label: 'Accepted' },
  allowed: { tone: 'success', label: 'Allowed' },
  success: { tone: 'success', label: 'Success' },
  passed: { tone: 'success', label: 'Passed' },
  pass: { tone: 'success', label: 'Pass' },
  merged: { tone: 'success', label: 'Merged' },
  finished: { tone: 'success', label: 'Finished' },
  failed: { tone: 'danger', label: 'Failed' },
  danger: { tone: 'danger', label: 'Danger' },
  critical: { tone: 'danger', label: 'Critical' },
  blocked: { tone: 'danger', label: 'Blocked' },
  rejected: { tone: 'danger', label: '승인 반려' },
  'need-check': { tone: 'danger', label: '확인 필요' },
  'need-review': { tone: 'warning', label: '리뷰 필요' },
  reviewing: { tone: 'info', label: '검토 중' },
  review: { tone: 'info', label: 'Review' },
  pending: { tone: 'neutral', label: 'Pending' },
  running: { tone: 'info', label: 'Running' },
  warning: { tone: 'warning', label: 'Warning' },
  high: { tone: 'warning', label: 'High' },
  medium: { tone: 'warning', label: 'Medium' },
  low: { tone: 'info', label: 'Low' },
  open: { tone: 'info', label: 'Open' },
  manual: { tone: 'purple', label: 'Manual' },
  scheduled: { tone: 'info', label: 'Scheduled' },
  deployed: { tone: 'success', label: 'Deployed' },
  requested: { tone: 'neutral', label: 'Requested' },
  conditional: { tone: 'warning', label: 'Conditional' },
  created: { tone: 'neutral', label: 'Created' },
  skipped: { tone: 'neutral', label: 'Skipped' },
  closed: { tone: 'neutral', label: 'Closed' },
  draft: { tone: 'purple', label: 'Draft' },
  canceled: { tone: 'neutral', label: 'Canceled' },
  none: { tone: 'neutral', label: '-' },
}

const TONE_STYLES = {
  success: { color: '#166534', background: '#ecfdf3', borderColor: '#bbf7d0' },
  danger: { color: '#b42318', background: '#fff1f0', borderColor: '#fecaca' },
  warning: { color: '#92400e', background: '#fffbeb', borderColor: '#fde68a' },
  info: { color: '#0b50d0', background: '#eff6ff', borderColor: '#bfdbfe' },
  purple: { color: '#6d28d9', background: '#f5f3ff', borderColor: '#ddd6fe' },
  neutral: { color: '#475569', background: '#f8fafc', borderColor: '#e2e8f0' },
}

function normalizeStatus(status) {
  return String(status ?? 'none').toLowerCase()
}

function StatusTag({ status, label, color, icon, bordered = true, ...tagProps }) {
  const preset = STATUS_PRESETS[normalizeStatus(status)] ?? {
    tone: 'neutral',
    label: status ?? '-',
  }
  const lightStyle = TONE_STYLES[preset.tone] ?? TONE_STYLES.neutral

  return (
    <Tag
      className="gitddn-status-tag"
      color={color}
      icon={icon}
      bordered={bordered}
      style={color ? undefined : lightStyle}
      {...tagProps}
    >
      {label ?? preset.label}
    </Tag>
  )
}

export default StatusTag
