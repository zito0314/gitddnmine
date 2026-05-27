import { Card, Col, ColorPicker, Form, Input, Row, Select, Space, Typography } from 'antd'
import { getThemeSettings } from '../../api/admin'
import { PageHeader } from '../../components/common'

const { Title, Text } = Typography

export default function ThemeBrandingAdmin() {
  const theme = getThemeSettings()

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader title="Theme & Branding" description="Organization logo, primary color, accent color, mode, product name을 관리합니다." />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card>
            <Form layout="vertical" disabled initialValues={theme}>
              <Form.Item label="Organization logo" name="organizationLogo">
                <Input />
              </Form.Item>
              <Form.Item label="Product name" name="productName">
                <Input />
              </Form.Item>
              <Form.Item label="Primary color" name="primaryColor">
                <Input />
              </Form.Item>
              <Form.Item label="Accent color" name="accentColor">
                <Input />
              </Form.Item>
              <Form.Item label="Light/Dark mode" name="mode">
                <Select options={['Light', 'Dark'].map((value) => ({ value, label: value }))} />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Preview card">
            <Space direction="vertical" size={12}>
              <Title level={3} style={{ margin: 0 }}>{theme.productName}</Title>
              <Text>{theme.organizationLogo}</Text>
              <Space wrap>
                <ColorPicker value={theme.primaryColor} disabled showText={() => 'Primary'} />
                <ColorPicker value={theme.accentColor} disabled showText={() => 'Accent'} />
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
