import { Tag } from 'antd'
import { UI_TEXT } from '../../constants'

const STATUS_PRESETS = {
  ...Object.fromEntries(
    Object.entries(UI_TEXT.status.labels).map(([status, label]) => [
      status,
      { label, tone: UI_TEXT.status.tones[status] ?? 'neutral' },
    ]),
  ),
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
