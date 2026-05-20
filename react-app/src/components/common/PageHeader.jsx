import { Flex, Space, Typography } from 'antd'

const { Paragraph, Title } = Typography

function PageHeader({ title, description, eyebrow, actions, children }) {
  return (
    <Flex className="page-header" align="flex-start" justify="space-between" gap={16} wrap="wrap">
      <div>
        {eyebrow ? <Paragraph className="page-header-eyebrow">{eyebrow}</Paragraph> : null}
        <Title level={2}>{title}</Title>
        {description ? <Paragraph type="secondary">{description}</Paragraph> : null}
        {children}
      </div>
      {actions ? <Space wrap>{actions}</Space> : null}
    </Flex>
  )
}

export default PageHeader
