import { Alert, Button, Input, Space, Typography, Upload } from 'antd'
import { UploadOutlined } from '../icons'

const { Text } = Typography

export function TokenJsonEditor({ title, value, onChange, status, onValidate }) {
  const beforeUpload = (file) => {
    if (!file.name.toLowerCase().endsWith('.json')) {
      onValidate('Only .json files are supported.')
      return Upload.LIST_IGNORE
    }

    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result ?? '')
      onChange(text)
      onValidate(null, text)
    }
    reader.onerror = () => onValidate('Failed to read the JSON file.')
    reader.readAsText(file)

    return false
  }

  return (
    <Space direction="vertical" size={10} className="token-json-editor">
      <Space align="center" className="token-json-editor-header">
        <Text strong>{title}</Text>
        <Upload accept=".json,application/json" showUploadList={false} beforeUpload={beforeUpload}>
          <Button size="small" icon={<UploadOutlined />}>Upload .json</Button>
        </Upload>
      </Space>
      <Input.TextArea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => onValidate(null, value)}
        rows={10}
        spellCheck={false}
        className="token-json-textarea"
      />
      {status?.type ? (
        <Alert type={status.type} title={status.message} showIcon />
      ) : null}
    </Space>
  )
}
