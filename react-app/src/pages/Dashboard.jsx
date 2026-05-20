import { Card, Col, Flex, Row, Statistic, Typography } from 'antd'

const { Paragraph, Title } = Typography

function Dashboard() {
  return (
    <Flex vertical gap={18}>
      <div>
        <Title level={2}>오늘 처리할 업무를 확인하고 바로 진행하세요.</Title>
        <Paragraph type="secondary">
          승인, 검증, 운영이관 상태를 한 화면에서 확인하고 필요한 업무로 이동할 수 있습니다.
        </Paragraph>
      </div>
      <Row gutter={[14, 14]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="승인해야 할 MR" value={4} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="진행 중인 내 MR" value={7} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="조치 필요한 Pipeline" value={2} styles={{ content: { color: '#de3412' } }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="보안 검증 필요" value={1} styles={{ content: { color: '#9e6a00' } }} />
          </Card>
        </Col>
      </Row>
    </Flex>
  )
}

export default Dashboard
