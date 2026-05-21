import { Card, Space, Tag, Typography } from 'antd'
import { normalizeThemeToken } from '../../theme/tokenUtils'

const { Text, Title } = Typography

export function ThemePreviewCard({ title, theme }) {
  const token = normalizeThemeToken(theme).token

  return (
    <Card size="small" title={title} className="theme-preview-card">
      <Space direction="vertical" size={10}>
        <Title level={5} style={{ margin: 0, color: token.colorText }}>
          gitddn Preview
        </Title>
        <Text style={{ color: token.colorTextSecondary || token.colorText }}>
          Primary, surface, border, and text tokens
        </Text>
        <Space wrap>
          <Tag color={token.colorPrimary}>{token.colorPrimary || 'primary'}</Tag>
          <Tag>{token.colorBgContainer || 'container'}</Tag>
          <Tag>{token.colorBorder || 'border'}</Tag>
        </Space>
        <div
          className="theme-preview-swatch"
          style={{
            background: token.colorBgContainer,
            borderColor: token.colorBorder,
            color: token.colorText,
            borderRadius: token.borderRadius,
          }}
        >
          <span style={{ background: token.colorPrimary }} />
          <Text style={{ color: token.colorText }}>Ant Design token preview</Text>
        </div>
      </Space>
    </Card>
  )
}
