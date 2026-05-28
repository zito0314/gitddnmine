import { Flex, Space } from 'antd'

function RecordRow({
  leading,
  title,
  description,
  titleExtra,
  meta,
  actions,
  children,
  className = '',
  contentClassName = '',
  density = 'default',
  align = 'flex-start',
  mainGap = 12,
  contentGap = 4,
  actionsGap = 8,
  onClick,
  ...rowProps
}) {
  const clickable = Boolean(onClick)
  const classes = [
    'gitddn-record-row',
    `gitddn-record-row-${density}`,
    clickable ? 'gitddn-record-row-clickable' : null,
    className,
  ].filter(Boolean).join(' ')

  const handleKeyDown = (event) => {
    if (!clickable) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick(event)
    }
  }

  return (
    <Flex
      align={align}
      justify="space-between"
      gap={16}
      wrap="wrap"
      className={classes}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...rowProps}
    >
      <Flex align={align} gap={mainGap} className="gitddn-record-row-main">
        {leading ? <span className="gitddn-record-row-leading">{leading}</span> : null}
        <Space orientation="vertical" size={contentGap} className={`gitddn-record-row-content ${contentClassName}`.trim()}>
          {children ?? (
            <>
              {title || titleExtra ? (
                <Flex align="center" gap={8} wrap="wrap" className="gitddn-record-row-title">
                  {title}
                  {titleExtra}
                </Flex>
              ) : null}
              {description}
            </>
          )}
        </Space>
      </Flex>
      {meta || actions ? (
        <Space size={actionsGap} wrap className="gitddn-record-row-actions">
          {meta}
          {actions}
        </Space>
      ) : null}
    </Flex>
  )
}

export default RecordRow
