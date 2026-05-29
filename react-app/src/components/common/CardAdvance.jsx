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
  const hasTitle = titleNode || title || description
  const titleContent = titleNode ?? (hasTitle ? (
    <Flex vertical gap={2} className="card-advance-title">
      {title ? <Text strong>{title}</Text> : null}
      {description ? (
        <Text type="secondary" className="card-advance-description">
          {description}
        </Text>
      ) : null}
    </Flex>
  ) : undefined)

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
