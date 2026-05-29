import { Badge, Card, Flex, Typography } from 'antd'

const { Text, Title } = Typography

const SEVERITY_CARDS = [
  { key: 'critical', label: '치명적', color: '#b42318', emptyText: 'NNN' },
  { key: 'high', label: '매우 위험', color: '#d92d20' },
  { key: 'medium', label: '위험', color: '#dc6803' },
  { key: 'low', label: '중간', color: '#f79009' },
  { key: 'info', label: '낮음', color: '#fdb022' },
  { key: 'veryLow', label: '매우 낮음', color: '#a6d32f' },
]

function SecuritySeverityCards({ summary = {} }) {
  return (
    <Flex gap={12} wrap="wrap" className="security-severity-cards">
      {SEVERITY_CARDS.map((item) => {
        const value = summary[item.key] ?? 0
        return (
          <Card key={item.key} className="security-severity-card" variant="outlined">
            <Flex vertical align="center">
              <Flex align="center" justify="center" gap={8} className="security-severity-card-head">
                <Badge color={item.color} />
                <Text strong>{item.label}</Text>
              </Flex>
              <Title level={4} className="security-severity-card-value">
                {value > 0 ? value : item.emptyText ?? 0}
              </Title>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}

export default SecuritySeverityCards
