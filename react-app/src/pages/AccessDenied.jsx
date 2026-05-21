import { Button, Card, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { UI_TEXT } from '../constants'

const { Paragraph, Title } = Typography

export default function AccessDenied() {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <div className="access-denied-page">
      <Card className="access-denied-card">
        <Space orientation="vertical" size={16}>
          <Title level={2}>{UI_TEXT.accessDenied.title}</Title>
          <Paragraph type="secondary">{UI_TEXT.accessDenied.description}</Paragraph>
          <Space wrap>
            <Button type="primary" onClick={() => navigate('/')}>{UI_TEXT.accessDenied.backToDashboard}</Button>
            <Button
              onClick={async () => {
                await auth.logout()
                navigate('/login', { replace: true })
              }}
            >
              {UI_TEXT.accessDenied.signInAnother}
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  )
}
