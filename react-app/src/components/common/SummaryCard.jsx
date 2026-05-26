import { Avatar, Card, Flex, Statistic, Typography } from 'antd'

const { Text } = Typography

function SummaryCard({
  title,
  value,
  suffix,
  prefix,
  description,
  icon,
  tone = 'default',
  loading = false,
  onClick,
}) {
  return (
    <Card
      className={`summary-card summary-card-${tone}`}
      variant="outlined"
      hoverable={Boolean(onClick)}
      loading={loading}
      onClick={onClick}
    >
      <Flex align="flex-start" justify="space-between" gap={12}>
        <Statistic title={title} value={value} suffix={suffix} prefix={prefix} />
        {icon ? (
          <Avatar shape="square" size={36} icon={icon} className="summary-card-icon" />
        ) : null}
      </Flex>
      {description ? (
        <Text type="secondary" className="summary-card-description">
          {description}
        </Text>
      ) : null}
    </Card>
  )
}

export default SummaryCard
