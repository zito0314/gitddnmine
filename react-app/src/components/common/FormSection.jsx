import { Flex, Typography } from 'antd'

const { Text, Title } = Typography

export default function FormSection({ title, description, children }) {
  return (
    <Flex vertical gap={8}>
      <Flex vertical gap={4}>
        <Title level={5}>{title}</Title>
        {description ? <Text type="secondary">{description}</Text> : null}
      </Flex>
      {children}
    </Flex>
  )
}
