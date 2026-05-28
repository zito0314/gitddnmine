import { ConfigProvider, Flex, Space, Typography } from 'antd'

const { Paragraph, Title } = Typography

function PageHeader({ title, description, actions }) {
  return (
    <Flex className="page-header" align="flex-start" justify="space-between" gap={16} wrap="wrap">
      <div>
        <Title level={2}>{title}</Title>
        {description ? <Paragraph type="secondary">{description}</Paragraph> : null}
      </div>
      {actions ? (
        <ConfigProvider componentSize="large">
          <Space wrap>{actions}</Space>
        </ConfigProvider>
      ) : null}
    </Flex>
  )
}

export default PageHeader
