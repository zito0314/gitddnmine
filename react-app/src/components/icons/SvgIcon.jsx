import './icons.css'

function SvgIcon({ svg, className = '', style, title, ...rest }) {
  const classes = ['anticon', 'app-svg-icon', className].filter(Boolean).join(' ')

  return (
    <span
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={classes}
      role={title ? 'img' : undefined}
      style={style}
      {...rest}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default SvgIcon
