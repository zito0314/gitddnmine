import { Tag } from 'antd'

const STATUS_PRESETS = {
  approved: { color: 'success', label: '승인 완료' },
  passed: { color: 'success', label: 'Passed' },
  pass: { color: 'success', label: 'Pass' },
  merged: { color: 'success', label: 'Merged' },
  finished: { color: 'success', label: 'Finished' },
  failed: { color: 'error', label: 'Failed' },
  blocked: { color: 'error', label: 'Blocked' },
  rejected: { color: 'error', label: '승인 반려' },
  'need-check': { color: 'error', label: '확인 필요' },
  pending: { color: 'warning', label: 'Pending' },
  running: { color: 'processing', label: 'Running' },
  warning: { color: 'warning', label: 'Warning' },
  open: { color: 'processing', label: 'Open' },
  manual: { color: 'blue', label: 'Manual' },
  created: { color: 'default', label: 'Created' },
  skipped: { color: 'default', label: 'Skipped' },
  closed: { color: 'default', label: 'Closed' },
  draft: { color: 'default', label: 'Draft' },
  canceled: { color: 'default', label: 'Canceled' },
  none: { color: 'default', label: '-' },
}

function normalizeStatus(status) {
  return String(status ?? 'none').toLowerCase()
}

function StatusTag({ status, label, color, icon, bordered = true, ...tagProps }) {
  const preset = STATUS_PRESETS[normalizeStatus(status)] ?? {
    color: 'default',
    label: status ?? '-',
  }

  return (
    <Tag color={color ?? preset.color} icon={icon} bordered={bordered} {...tagProps}>
      {label ?? preset.label}
    </Tag>
  )
}

export default StatusTag
