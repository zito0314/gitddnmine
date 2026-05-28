import { StarFilled } from '../components/icons'
import { Button, Card, Col, ConfigProvider, Empty, Flex, Row, Space, Tabs, Typography } from 'antd'
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
import RepositoryAvatar from '../components/repository/RepositoryAvatar'
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

const dashboardCardTheme = {
  token: {
    borderRadiusLG: 14,
  },
  components: {
    Card: {
      headerBg: 'transparent',
      headerHeight: 48,
      headerPadding: 24,
      bodyPadding: 24,
    },
  },
}

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
    <Space direction="vertical" size={32} className="dashboard-home">
      <PageHeader title={UI_TEXT.pages.dashboard.title} />

      <DashboardAiChat
        currentUserName={currentUserName}
        prompts={visiblePrompts}
        getResponse={getDashboardAiResponse}
        onOpenResponse={(href) => navigate(href)}
      />

      <ConfigProvider theme={dashboardCardTheme}>
        <Row gutter={[16, 16]} align="top">
          <Col xs={24} xl={17}>
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
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
                {filteredNextUp.length ? (
                  <Space direction="vertical" size={0} style={{ width: '100%' }}>
                    {filteredNextUp.slice(0, 3).map((item) => (
                      <Flex
                        key={item.key}
                        className="dashboard-next-item"
                        align="center"
                        justify="space-between"
                        gap={12}
                        wrap="wrap"
                        onClick={() => navigate(item.href)}
                      >
                        <Space direction="vertical" size={4}>
                          <Flex align="center" gap={8} wrap="wrap">
                            <Text strong>{item.title}</Text>
                            <StatusTag status={item.status} />
                          </Flex>
                          <Text type="secondary">{item.target} · {item.updatedAt}</Text>
                        </Space>
                        <Button
                          type={item.type === 'Merge Request' ? 'primary' : 'default'}
                          size="small"
                          onClick={(event) => {
                            event.stopPropagation()
                            navigate(item.href)
                          }}
                        >
                          {getActionLabel(item)}
                        </Button>
                      </Flex>
                    ))}
                  </Space>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={UI_TEXT.messages.empty.table} />
                )}
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
                {filteredActivities.length ? (
                  <Space direction="vertical" size={0} className="dashboard-activity-list">
                    {filteredActivities.slice(0, 4).map((activity) => (
                      <Flex
                        key={activity.id}
                        className="dashboard-activity-item"
                        align="flex-start"
                        gap={12}
                        onClick={() => navigate(activity.href)}
                      >
                        <BadgeDot />
                        <Space direction="vertical" size={2}>
                          <Text>{activity.actor}님이 <Link to={activity.href}>{activity.message}</Link></Text>
                          <Text type="secondary">{activity.repositoryName} · {activity.createdAt}</Text>
                        </Space>
                      </Flex>
                    ))}
                  </Space>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={UI_TEXT.messages.empty.table} />
                )}
              </Card>
            </Space>
          </Col>

          <Col xs={24} xl={7}>
            <Card className="dashboard-quick-card" title="Quick Access" styles={{ body: { paddingTop: 8 } }}>
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
              {quickAccessRepositories.length ? (
                <Space direction="vertical" size={0} style={{ width: '100%' }}>
                  {quickAccessRepositories.slice(0, 7).map((repository) => (
                    <Flex
                      key={repository.id}
                      className="dashboard-quick-item"
                      align="center"
                      justify="space-between"
                      gap={8}
                      onClick={() => navigate(`/repositories/${repository.id}`)}
                    >
                      <Space size={8}>
                        <RepositoryAvatar repository={repository} size={24} className="dashboard-repo-avatar" />
                        <Link to={`/repositories/${repository.id}`}>{repository.name}</Link>
                      </Space>
                      <StarFilled className="dashboard-quick-star" />
                    </Flex>
                  ))}
                </Space>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={UI_TEXT.messages.empty.table} />
              )}
            </Card>
          </Col>
        </Row>
      </ConfigProvider>
    </Space>
  )
}

function BadgeDot() {
  return <span className="dashboard-activity-dot" />
}

export default Dashboard
