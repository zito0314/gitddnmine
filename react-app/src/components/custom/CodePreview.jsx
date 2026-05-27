import { Typography } from 'antd'

const { Paragraph } = Typography

function CodePreview({ children, className = '', variant = 'default' }) {
  const classes = ['gitddn-code-preview', `gitddn-code-preview-${variant}`, className].filter(Boolean).join(' ')

  // Code, diff, and log previews need preserved whitespace beyond plain Ant Typography defaults.
  return (
    <Paragraph code className={classes}>
      {children}
    </Paragraph>
  )
}

export default CodePreview
