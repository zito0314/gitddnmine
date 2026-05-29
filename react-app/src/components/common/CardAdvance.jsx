import { Card, Flex, Typography } from 'antd'

const { Text } = Typography

function CardAdvance({
  title,
  description,
  extra,
  className,
  children,
  titleNode,
  ...cardProps
}) {
  const titleContent = titleNode ?? (
    <Flex vertical gap={2} className="card-advance-title">
      <Text strong>{title}</Text>
      {description ? (
        <Text type="secondary" className="card-advance-description">
          {description}
        </Text>
      ) : null}
    </Flex>
  )

  return (
    <Card
      {...cardProps}
      className={['card-advance', className].filter(Boolean).join(' ')}
      title={titleContent}
      extra={extra}
    >
      {children}
    </Card>
  )
}

export default CardAdvance
