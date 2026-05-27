import { ArrowRightOutlined, ReloadOutlined } from '../icons'
import { Button, Card, Flex, Input, Space, Spin, Tag, Tooltip, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import GitddnLogo from './GitddnLogo'

const { Text } = Typography

function DashboardAiChat({ currentUserName, prompts, getResponse, onOpenResponse }) {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastResponse, setLastResponse] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const submitPrompt = (promptKey, question) => {
    const nextQuestion = question.trim()
    if (!nextQuestion || loading) return

    window.clearTimeout(timerRef.current)
    setInputValue('')
    setLoading(true)
    setLastResponse(null)
    setMessages([{ role: 'user', content: nextQuestion }])

    timerRef.current = window.setTimeout(() => {
      const response = getResponse(promptKey)
      setMessages([
        { role: 'user', content: nextQuestion },
        { role: 'assistant', title: response.title, content: response.body, links: response.links },
      ])
      setLastResponse(response)
      setLoading(false)
    }, 700)
  }

  const handleInputSubmit = () => {
    submitPrompt(inputValue, inputValue)
  }

  const handleReset = () => {
    window.clearTimeout(timerRef.current)
    setInputValue('')
    setMessages([])
    setLoading(false)
    setLastResponse(null)
  }

  return (
    <Card className="dashboard-ai-panel" variant="borderless">
      <Flex justify="space-between" align="flex-start" gap={24}>
        <Space direction="vertical" size={16} className="dashboard-ai-content">
          <GitddnLogo compact className="dashboard-ai-logo" />
          <Space direction="vertical" size={4}>
            <Text>안녕하세요, <Text strong className="dashboard-ai-user">{currentUserName}</Text>님! 오늘 처리할 업무를 분석했어요.</Text>
            <Text strong className="dashboard-ai-summary">
              승인 대기 MR 4건, Pipeline 실패 2건, 보안 이슈 1건이 있습니다. 어떤 것부터 살펴볼까요?
            </Text>
          </Space>
          <Space wrap>
            {prompts.map((prompt) => (
              <Button
                key={prompt.key}
                size="small"
                className="dashboard-ai-chip"
                disabled={loading}
                onClick={() => submitPrompt(prompt.key, prompt.label)}
              >
                {prompt.label}
              </Button>
            ))}
          </Space>
        </Space>
        <Button
          type="text"
          icon={<ArrowRightOutlined />}
          disabled={!lastResponse?.links?.[0]?.href}
          onClick={() => onOpenResponse(lastResponse.links[0].href)}
        />
      </Flex>

      <Flex className="dashboard-ai-thread" vertical gap={14}>
        {messages.map((message, index) => (
          <Flex key={`${message.role}-${index}`} justify={message.role === 'user' ? 'flex-end' : 'flex-start'}>
            {message.role === 'user' ? (
              <Tag className="dashboard-ai-question">{message.content}</Tag>
            ) : (
              <Space direction="vertical" size={8} className="dashboard-ai-answer">
                <Text strong>{message.title}</Text>
                <Text>{message.content}</Text>
                <Space wrap>
                  {message.links.map((link) => (
                    <Button key={link.href} size="small" onClick={() => onOpenResponse(link.href)}>
                      {link.label}
                    </Button>
                  ))}
                </Space>
              </Space>
            )}
          </Flex>
        ))}
        {loading ? (
          <Flex align="center" gap={8} className="dashboard-ai-loading">
            <Spin size="small" />
            <Text type="secondary">답변을 준비하고 있어요...</Text>
          </Flex>
        ) : null}
        <Input
          className="dashboard-ai-input"
          placeholder="업무를 질문하거나 요청해 보세요..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onPressEnter={handleInputSubmit}
          suffix={
            <Tooltip title="채팅 초기화">
              <Button
                aria-label="채팅 초기화"
                className="dashboard-ai-reset-button"
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={handleReset}
              />
            </Tooltip>
          }
          disabled={loading}
        />
      </Flex>
    </Card>
  )
}

export default DashboardAiChat
