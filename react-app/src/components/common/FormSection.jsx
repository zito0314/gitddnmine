import { Flex, Typography } from 'antd'

const { Text, Title } = Typography

export default function FormSection({ title, description, children, className }) {
  return (
    <Flex vertical gap={8} className={['form-section', className].filter(Boolean).join(' ')}>
      <Flex vertical gap={4}>
        <Title level={5} className="form-section-title">{title}</Title>
        {description ? <Text type="secondary" className="form-section-description">{description}</Text> : null}
      </Flex>
      {children}
    </Flex>
  )
}
