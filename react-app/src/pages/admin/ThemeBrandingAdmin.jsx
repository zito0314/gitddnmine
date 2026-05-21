import { Card, Col, Form, Input, Row, Select, Space, Typography } from 'antd'
import { getThemeSettings } from '../../api/admin'
import { PageHeader } from '../../components/common'

const { Title, Text } = Typography
export default function ThemeBrandingAdmin() {
  const theme = getThemeSettings()
  return <Space orientation="vertical" size={16} style={{ width: '100%' }}><PageHeader title="Theme & Branding" description="Organization logo, primary color, accent color, mode, product name을 관리합니다." /><Row gutter={[16, 16]}><Col xs={24} lg={14}><Card><Form layout="vertical" disabled initialValues={theme}><Form.Item label="Organization logo" name="organizationLogo"><Input /></Form.Item><Form.Item label="Product name" name="productName"><Input /></Form.Item><Form.Item label="Primary color" name="primaryColor"><Input /></Form.Item><Form.Item label="Accent color" name="accentColor"><Input /></Form.Item><Form.Item label="Light/Dark mode" name="mode"><Select options={['Light', 'Dark'].map((value) => ({ value, label: value }))} /></Form.Item></Form></Card></Col><Col xs={24} lg={10}><Card title="Preview card"><Title level={3}>{theme.productName}</Title><Text>{theme.organizationLogo}</Text><div style={{ height: 8, background: theme.primaryColor, marginTop: 16, borderRadius: 4 }} /><div style={{ height: 8, background: theme.accentColor, marginTop: 8, borderRadius: 4 }} /></Card></Col></Row></Space>
}
