import { Card, Flex, Typography } from 'antd'

const { Paragraph, Title } = Typography

function PlaceholderPage({ title, description }) {
  return (
    <Flex vertical gap={16} className="placeholder-page">
      <div>
        <Title level={2}>{title}</Title>
        <Paragraph type="secondary">{description}</Paragraph>
      </div>
      <Card>
        <Paragraph type="secondary">
          기존 정적 화면을 React 컴포넌트로 옮기기 전, 라우터와 공통 레이아웃 연결을 확인하기 위한
          기본 화면입니다.
        </Paragraph>
      </Card>
    </Flex>
  )
}

export default PlaceholderPage
