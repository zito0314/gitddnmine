import {
  ArrowRightOutlined,
  RobotOutlined,
  StarFilled,
} from '../components/icons'
import { Avatar, Button, Card, Col, Flex, Input, List, Row, Space, Tabs, Tag, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getDashboardAiPrompts,
  getDashboardAiResponse,
  getDashboardNextUpItems,
  getDashboardRepositoriesData,
  getDashboardRepositoryActivities,
} from '../api/dashboard'
import { useAuth } from '../auth/AuthContext'
import { PageHeader, StatusTag } from '../components/common'
import { GitddnLogo } from '../components/custom'
import { UI_TEXT } from '../constants'

const { Text } = Typography

const nextUpTabs = [
  { key: 'all', label: '전체' },
  { key: 'urgent', label: '긴급' },
  { key: 'review', label: '승인 필요' },
  { key: 'failed', label: '실패' },
  { key: 'deployment', label: '운영이관' },
  { key: 'security', label: '보안 검증' },
]

const activityTabs = [
  { key: 'all', label: '전체' },
  { key: 'repository', label: 'Repository' },
  { key: 'project', label: 'Project' },
]

function getNextUpTabKey(item) {
  const text = [item.type, item.status, item.title].join(' ').toLowerCase()

  if (text.includes('pipeline') || text.includes('failed')) return 'failed'
  if (text.includes('merge request') || text.includes('review')) return 'review'
  if (text.includes('deployment')) return 'deployment'
  if (text.includes('security')) return 'security'
  return 'urgent'
}

function getActionLabel(item) {
  if (item.type === 'Pipeline') return '실패 원인 보기'
  if (item.type === 'Merge Request') return '리뷰하기'
  if (item.type === 'Security') return '조치 가이드 보기'
  return '요청 보기'
}

function getRepositoryInitials(name) {
  return String(name ?? 'repo')
    .split(/[-_ ]+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Dashboard() {
  const navigate = useNavigate()
  const auth = useAuth()
  const nextUp = getDashboardNextUpItems()
  const repositories = getDashboardRepositoriesData()
  const activities = getDashboardRepositoryActivities()
  const prompts = getDashboardAiPrompts()
  const currentUserName = auth.currentUser?.name ?? 'Jito'
  const [aiPrompt, setAiPrompt] = useState('pipeline-failure')
  const [aiInput, setAiInput] = useState('')
  const [nextUpTab, setNextUpTab] = useState('all')
  const [activityTab, setActivityTab] = useState('all')
  const [quickAccessTab, setQuickAccessTab] = useState('starred')
  const aiResponse = getDashboardAiResponse(aiPrompt)
  const filteredNextUp = nextUp.filter((item) => nextUpTab === 'all' || getNextUpTabKey(item) === nextUpTab)
  const filteredActivities = activities.filter((activity) => {
    if (activityTab === 'all') return true
    if (activityTab === 'repository') return activity.targetType !== 'mergeRequest'
    return activity.targetType === 'mergeRequest'
  })
  const quickAccessRepositories = quickAccessTab === 'starred'
    ? repositories.filter((repository) => repository.favorite).concat(repositories.filter((repository) => !repository.favorite))
    : repositories
  const visiblePrompts = prompts.slice(0, 4)

  return (
    <Space direction="vertical" size={24} className="dashboard-home">
      <PageHeader title={UI_TEXT.pages.dashboard.title} />

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
              {visiblePrompts.map((prompt) => (
                <Button key={prompt.key} size="small" className="dashboard-ai-chip" onClick={() => setAiPrompt(prompt.key)}>
                  {prompt.label}
                </Button>
              ))}
            </Space>
          </Space>
          <Button type="text" icon={<ArrowRightOutlined />} onClick={() => navigate(aiResponse.links[0]?.href ?? '/merge-requests')} />
        </Flex>
        <Flex className="dashboard-ai-thread" vertical gap={18}>
          <Text className="dashboard-ai-loading">...</Text>
          <Flex justify="flex-end">
            <Tag className="dashboard-ai-question">{aiResponse.title}</Tag>
          </Flex>
          <Input
            className="dashboard-ai-input"
            placeholder="업무를 질문하거나 요청해 보세요..."
            value={aiInput}
            onChange={(event) => setAiInput(event.target.value)}
            onPressEnter={() => aiInput.trim() && setAiPrompt(aiInput)}
            suffix={<RobotOutlined />}
          />
        </Flex>
      </Card>

      <Row gutter={[16, 16]} align="top">
        <Col xs={24} xl={17}>
          <Card
            className="dashboard-work-card"
            title={
              <Flex align="center" gap={8} wrap="wrap">
                <Text strong>Next up</Text>
                <Text type="secondary" className="dashboard-card-hint">AI 어시스턴트가 업무 우선순위에 따라 요약해두었어요.</Text>
              </Flex>
            }
            extra={<Button type="link" size="small" onClick={() => navigate('/merge-requests')}>전체보기</Button>}
          >
            <Tabs
              activeKey={nextUpTab}
              onChange={setNextUpTab}
              items={nextUpTabs.map((tab) => ({ key: tab.key, label: tab.label }))}
            />
            <List
              dataSource={filteredNextUp.slice(0, 3)}
              locale={{ emptyText: UI_TEXT.messages.empty.table }}
              renderItem={(item) => (
                <List.Item
                  className="dashboard-next-item"
                  onClick={() => navigate(item.href)}
                  actions={[
                    <Button
                      key="action"
                      type={item.type === 'Merge Request' ? 'primary' : 'default'}
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation()
                        navigate(item.href)
                      }}
                    >
                      {getActionLabel(item)}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Flex align="center" gap={8} wrap="wrap">
                        <Text strong>{item.title}</Text>
                        <StatusTag status={item.status} />
                      </Flex>
                    }
                    description={`${item.target} · ${item.updatedAt}`}
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card
            className="dashboard-work-card"
            title={<Text strong>최근 활동</Text>}
            extra={<Button type="link" size="small" onClick={() => navigate('/audit')}>전체보기</Button>}
          >
            <Tabs
              activeKey={activityTab}
              onChange={setActivityTab}
              items={activityTabs.map((tab) => ({ key: tab.key, label: tab.label }))}
            />
            <List
              className="dashboard-activity-list"
              dataSource={filteredActivities.slice(0, 4)}
              locale={{ emptyText: UI_TEXT.messages.empty.table }}
              renderItem={(activity) => (
                <List.Item className="dashboard-activity-item" onClick={() => navigate(activity.href)}>
                  <List.Item.Meta
                    avatar={<BadgeDot />}
                    title={<Text>{activity.actor}님이 <Link to={activity.href}>{activity.message}</Link></Text>}
                    description={`${activity.repositoryName} · ${activity.createdAt}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} xl={7}>
          <Card className="dashboard-quick-card" title="Quick Access">
            <Tabs
              activeKey={quickAccessTab}
              onChange={setQuickAccessTab}
              type="card"
              size="small"
              items={[
                { key: 'recent', label: 'Recently Viewed' },
                { key: 'starred', label: 'Starred Repository' },
              ]}
            />
            <List
              dataSource={quickAccessRepositories.slice(0, 7)}
              locale={{ emptyText: UI_TEXT.messages.empty.table }}
              renderItem={(repository) => (
                <List.Item
                  className="dashboard-quick-item"
                  onClick={() => navigate(`/repositories/${repository.id}`)}
                  actions={[<StarFilled key="star" className="dashboard-quick-star" />]}
                >
                  <List.Item.Meta
                    avatar={<Avatar size={24} className="dashboard-repo-avatar">{getRepositoryInitials(repository.name)}</Avatar>}
                    title={<Link to={`/repositories/${repository.id}`}>{repository.name}</Link>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  )
}

function BadgeDot() {
  return <span className="dashboard-activity-dot" />
}

export default Dashboard
