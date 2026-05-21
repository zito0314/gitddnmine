import { Alert, App as AntdApp, Button, Col, Modal, Radio, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useThemeTokens } from '../../hooks/useThemeTokens'
import { defaultDarkTheme, defaultLightTheme, THEME_MODES } from '../../theme/defaultTokens'
import { parseThemeJson, stringifyThemeJson } from '../../theme/tokenUtils'
import { UI_TEXT } from '../../constants'
import { ThemePreviewCard } from './ThemePreviewCard'
import { TokenJsonEditor } from './TokenJsonEditor'

const { Text } = Typography

function validateJson(value) {
  try {
    parseThemeJson(value)
    return { type: 'success', message: 'Valid Ant Design theme JSON' }
  } catch (error) {
    return { type: 'error', message: error.message }
  }
}

function parseOrNotify(value, messageApi) {
  try {
    return parseThemeJson(value)
  } catch (error) {
    messageApi.error(`Invalid JSON: ${error.message}`)
    return null
  }
}

export function DesignTokenModal({ open, onClose }) {
  const { message } = AntdApp.useApp()
  const {
    mode,
    lightTheme,
    darkTheme,
    setThemeMode,
    applyLightTheme,
    applyDarkTheme,
    resetThemeTokens,
  } = useThemeTokens()
  const text = UI_TEXT.designToken
  const [selectedMode, setSelectedMode] = useState(mode)
  const [lightJson, setLightJson] = useState(() => stringifyThemeJson(lightTheme))
  const [darkJson, setDarkJson] = useState(() => stringifyThemeJson(darkTheme))
  const [lightStatus, setLightStatus] = useState(null)
  const [darkStatus, setDarkStatus] = useState(null)

  const currentJson = selectedMode === THEME_MODES.dark ? darkJson : lightJson
  const currentPreview = useMemo(() => {
    try {
      return parseThemeJson(currentJson)
    } catch {
      return selectedMode === THEME_MODES.dark ? darkTheme : lightTheme
    }
  }, [currentJson, darkTheme, lightTheme, selectedMode])

  const validateLight = (_error, value = lightJson) => {
    const status = _error ? { type: 'error', message: _error } : validateJson(value)
    setLightStatus(status)
  }

  const validateDark = (_error, value = darkJson) => {
    const status = _error ? { type: 'error', message: _error } : validateJson(value)
    setDarkStatus(status)
  }

  const handleApplyLight = () => {
    const parsed = parseOrNotify(lightJson, message)
    if (!parsed) return
    applyLightTheme(parsed)
    setSelectedMode(THEME_MODES.light)
    setLightStatus({ type: 'success', message: text.appliedLight })
    message.success(text.appliedLight)
  }

  const handleApplyDark = () => {
    const parsed = parseOrNotify(darkJson, message)
    if (!parsed) return
    applyDarkTheme(parsed)
    setSelectedMode(THEME_MODES.dark)
    setDarkStatus({ type: 'success', message: text.appliedDark })
    message.success(text.appliedDark)
  }

  const handleApplyCurrent = () => {
    const parsed = parseOrNotify(currentJson, message)
    if (!parsed) return
    if (selectedMode === THEME_MODES.dark) applyDarkTheme(parsed)
    else applyLightTheme(parsed)
    message.success(text.appliedCurrent)
  }

  const handleReset = () => {
    resetThemeTokens()
    setSelectedMode(THEME_MODES.light)
    setLightJson(stringifyThemeJson(defaultLightTheme))
    setDarkJson(stringifyThemeJson(defaultDarkTheme))
    setLightStatus(null)
    setDarkStatus(null)
    message.success(text.resetDone)
  }

  return (
    <Modal
      title={text.title}
      open={open}
      onCancel={onClose}
      width={1120}
      footer={[
        <Button key="reset" onClick={handleReset}>{text.reset}</Button>,
        <Button key="current" onClick={handleApplyCurrent}>{text.applyCurrent}</Button>,
        <Button key="light" onClick={handleApplyLight}>{text.applyLight}</Button>,
        <Button key="dark" type="primary" onClick={handleApplyDark}>{text.applyDark}</Button>,
        <Button key="close" onClick={onClose}>{text.close}</Button>,
      ]}
    >
      <Space direction="vertical" size={16} className="design-token-modal">
        <Alert type="info" showIcon title={text.description} />
        <Space align="center" wrap>
          <Text strong>{text.mode}</Text>
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            value={selectedMode}
            onChange={(event) => {
              setSelectedMode(event.target.value)
              setThemeMode(event.target.value)
            }}
            options={[
              { label: text.light, value: THEME_MODES.light },
              { label: text.dark, value: THEME_MODES.dark },
            ]}
          />
        </Space>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <TokenJsonEditor
              title={text.lightJson}
              value={lightJson}
              onChange={setLightJson}
              status={lightStatus}
              onValidate={validateLight}
            />
          </Col>
          <Col xs={24} lg={12}>
            <TokenJsonEditor
              title={text.darkJson}
              value={darkJson}
              onChange={setDarkJson}
              status={darkStatus}
              onValidate={validateDark}
            />
          </Col>
        </Row>
        <ThemePreviewCard title={text.preview} theme={currentPreview} />
      </Space>
    </Modal>
  )
}
