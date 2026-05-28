import { Children } from 'react'
import { Empty, Flex } from 'antd'
import { UI_TEXT } from '../../constants'

function RecordStack({
  children,
  className = '',
  emptyText = UI_TEXT.messages.empty.table,
  gap = 0,
  bordered = true,
  ...stackProps
}) {
  const hasChildren = Children.count(children) > 0
  const classes = [
    'gitddn-record-stack',
    bordered ? 'gitddn-record-stack-bordered' : null,
    className,
  ].filter(Boolean).join(' ')

  if (!hasChildren) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyText} />
  }

  return (
    <Flex vertical gap={gap} className={classes} {...stackProps}>
      {children}
    </Flex>
  )
}

export default RecordStack
