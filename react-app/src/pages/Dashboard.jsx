import { StarFilled } from '../components/icons'
import { Avatar, Button, Card, Col, Flex, List, Row, Space, Tabs, Typography } from 'antd'
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
import { DashboardAiChat } from '../components/custom'
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
  const [nextUpTab, setNextUpTab] = useState('all')
  const [activityTab, setActivityTab] = useState('all')
  const [quickAccessTab, setQuickAccessTab] = useState('starred')
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

      <DashboardAiChat
        currentUserName={currentUserName}
        prompts={visiblePrompts}
        getResponse={getDashboardAiResponse}
        onOpenResponse={(href) => navigate(href)}
      />

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
