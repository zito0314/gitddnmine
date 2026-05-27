import { LockOutlined, MailOutlined } from '../components/icons'
import { Alert, Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { getMockUsers } from '../api/auth'
import { useAuth } from '../auth/AuthContext'
import { GitddnLogo } from '../components/custom'
import { UI_TEXT } from '../constants'

const { Paragraph, Text, Title } = Typography

const defaultRedirectByRole = {
  admin: '/admin',
  internal: '/',
  external: '/',
}

export default function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()
  const [error, setError] = useState('')
  const users = getMockUsers()

  if (auth.isAuthenticated) {
    return <Navigate to={defaultRedirectByRole[auth.role] ?? '/'} replace />
  }

  const from = location.state?.from?.pathname

  const submit = async (values) => {
    setError('')
    try {
      const user = await auth.login(values)
      navigate(from ?? defaultRedirectByRole[user.role] ?? '/', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    }
  }

  const fillDemoAccount = (user) => {
    form.setFieldsValue({ email: user.email, password: user.password })
  }

  return (
    <div className="login-page">
      <Row className="login-shell" gutter={[24, 24]} align="middle">
        <Col xs={24} lg={12}>
          <Space direction="vertical" size={18}>
            <GitddnLogo size="large" className="login-brand-logo" />
            <Paragraph className="login-copy">{UI_TEXT.login.description}</Paragraph>
            <Space wrap>
              <Text type="secondary">{UI_TEXT.login.ssoReady}</Text>
              <Text type="secondary">{UI_TEXT.login.ldapReady}</Text>
              <Text type="secondary">{UI_TEXT.login.roleBasedGovernance}</Text>
            </Space>
          </Space>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="login-card">
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <div>
                <Title level={3}>{UI_TEXT.auth.signIn}</Title>
                <Text type="secondary">{UI_TEXT.login.formDescription}</Text>
              </div>
              {error ? <Alert type="error" showIcon message={UI_TEXT.auth.invalidCredentials} /> : null}
              <Form form={form} layout="vertical" onFinish={submit}>
                <Form.Item label={UI_TEXT.auth.email} name="email" rules={[{ required: true }, { type: 'email' }]}>
                  <Input prefix={<MailOutlined />} placeholder="admin@gitddn.local" />
                </Form.Item>
                <Form.Item label={UI_TEXT.auth.password} name="password" rules={[{ required: true }]}>
                  <Input.Password prefix={<LockOutlined />} placeholder="password" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>{UI_TEXT.auth.signIn}</Button>
              </Form>
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <Text strong>{UI_TEXT.login.demoAccounts}</Text>
                {users.map((user) => (
                  <Card key={user.id} size="small" hoverable onClick={() => fillDemoAccount(user)}>
                    <Space direction="vertical" size={2}>
                      <Text strong>{user.roleLabel}</Text>
                      <Text type="secondary">{user.email} / {user.password}</Text>
                      <Text type="secondary">{user.department}</Text>
                    </Space>
                  </Card>
                ))}
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
