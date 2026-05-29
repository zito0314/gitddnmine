import {
  DownloadOutlined,
  ReloadOutlined,
} from '../components/icons'
import {
  App as AntdApp,
  Button,
  Card,
  DatePicker,
  Empty,
  Flex,
  Input,
  Segmented,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from 'antd'
import { useMemo, useState } from 'react'
import { getAuditLogs } from '../api/audit'
import { PageHeader } from '../components/common'
import { UI_TEXT } from '../constants'
import AuditEvidenceExport from './AuditEvidenceExport'

const { Search } = Input
const { Link, Text } = Typography

const PERIOD_OPTIONS = [
  { label: '1개월', value: 1 },
  { label: '3개월', value: 3 },
  { label: '6개월', value: 6 },
  { label: '12개월', value: 12 },
]

const PIPELINE_STATUS = {
  passed: { label: '통과', color: 'success' },
  failed: { label: '실패', color: 'error' },
  running: { label: '실행 중', color: 'processing' },
  none: { label: '없음', color: 'default' },
}

const DEPLOYMENT_STATUS = {
  completed: { label: '완료', color: 'success' },
  pending: { label: '대기', color: 'warning' },
  rejected: { label: '반려', color: 'error' },
  none: { label: '없음', color: 'default' },
}

const POLICY_STATUS = {
  normal: { label: '정상 처리', color: 'success' },
  review_required: { label: '검토 필요', color: 'warning' },
  risk_required: { label: '위험 확인 필요', color: 'error' },
}

function getTimeValue(time) {
  const timestamp = Date.parse(String(time).replace(' ', 'T'))
  return Number.isNaN(timestamp) ? 0 : timestamp
}

function getLatestTime(logs) {
  return Math.max(...logs.map((log) => getTimeValue(log.time)), Date.now())
}

function isWithinPeriod(log, latestTime, monthCount) {
  const logTime = getTimeValue(log.time)
  const start = new Date(latestTime)
  start.setMonth(start.getMonth() - monthCount)
  return logTime >= start.getTime() && logTime <= latestTime
}

function isAfterPickerDate(log, date) {
  if (!date) return true
  return getTimeValue(log.time) >= date.startOf('day').valueOf()
}

function isBeforePickerDate(log, date) {
  if (!date) return true
  return getTimeValue(log.time) <= date.endOf('day').valueOf()
}

function getSearchText(log) {
  return [
    log.id,
    log.time,
    log.target,
    log.repositoryName,
    log.mergeRequestId,
    log.mergeRequestTitle,
    log.requester,
    log.branch,
    log.trigger,
    log.pipelineStatus,
    log.deploymentStatus,
    log.policyStatus,
    log.ip,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function StatusTag({ meta }) {
  return <Tag color={meta?.color ?? 'default'}>{meta?.label ?? '없음'}</Tag>
}

export default function AuditLog() {
  const { message } = AntdApp.useApp()
  const auditLogs = useMemo(() => getAuditLogs(), [])
  const [activeTab, setActiveTab] = useState('logs')
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState(1)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const latestTime = useMemo(() => getLatestTime(auditLogs), [auditLogs])
  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase()

    return auditLogs.filter((log) => {
      if (!isWithinPeriod(log, latestTime, period)) return false
      if (!isAfterPickerDate(log, startDate)) return false
      if (!isBeforePickerDate(log, endDate)) return false
      if (query && !getSearchText(log).includes(query)) return false
      return true
    })
  }, [auditLogs, endDate, latestTime, period, search, startDate])

  const columns = [
    {
      title: '시간',
      dataIndex: 'time',
      width: 170,
    },
    {
      title: '감사 ID',
      dataIndex: 'id',
      width: 140,
      render: (id) => <Link>{id}</Link>,
    },
    {
      title: '변경 대상',
      dataIndex: 'target',
      minWidth: 160,
      render: (target) => <Text strong>{target}</Text>,
    },
    {
      title: '저장소',
      dataIndex: 'repositoryName',
      minWidth: 260,
      render: (repositoryName, record) => (
        <Flex vertical gap={2}>
          <Text>{repositoryName}</Text>
          <Text type="secondary">#{record.mergeRequestId} · {record.mergeRequestTitle}</Text>
        </Flex>
      ),
    },
    {
      title: '요청자',
      dataIndex: 'requester',
      width: 120,
    },
    {
      title: 'Pipeline',
      dataIndex: 'pipelineStatus',
      width: 110,
      render: (status) => <StatusTag meta={PIPELINE_STATUS[status]} />,
    },
    {
      title: '운영이관',
      dataIndex: 'deploymentStatus',
      width: 110,
      render: (status) => <StatusTag meta={DEPLOYMENT_STATUS[status]} />,
    },
    {
      title: '정책 상태',
      dataIndex: 'policyStatus',
      width: 140,
      render: (status) => <StatusTag meta={POLICY_STATUS[status]} />,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      width: 140,
    },
  ]

  const auditLogContent = (
    <Flex vertical gap={16}>
      <Card className="audit-log-filter-card" variant="outlined">
        <Flex vertical gap={16}>
          <Search
            allowClear
            className="audit-log-search"
            placeholder="Pipeline 제목, 저장소, 작성자, 브랜치, Trigger로 검색"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Flex align="center" justify="space-between" gap={12} wrap="wrap">
            <Segmented
              value={period}
              options={PERIOD_OPTIONS}
              onChange={setPeriod}
            />
            <Flex align="center" gap={8} wrap="wrap">
              <Space size={6}>
                <Text strong>시작일:</Text>
                <DatePicker
                  placeholder="Select date"
                  value={startDate}
                  onChange={setStartDate}
                />
              </Space>
              <Space size={6}>
                <Text strong>종료일:</Text>
                <DatePicker
                  placeholder="Select date"
                  value={endDate}
                  onChange={setEndDate}
                />
              </Space>
              <Button onClick={() => message.success('감사 패키지 다운로드를 준비했습니다.')}>
                감사 패키지 다운로드
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredLogs}
        scroll={{ x: 1260 }}
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="표시할 감사 로그가 없습니다." />,
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
      />
    </Flex>
  )

  return (
    <Flex vertical gap={16} className="page-stack audit-log-page">
      <PageHeader
        title={UI_TEXT.pages.audit.title}
        description={UI_TEXT.pages.audit.description}
        actions={[
          <Button
            key="csv"
            icon={<DownloadOutlined />}
            onClick={() => message.success('CSV 내보내기를 준비했습니다.')}
          >
            CSV 내보내기
          </Button>,
          <Button
            key="refresh"
            aria-label="새로고침"
            icon={<ReloadOutlined />}
            onClick={() => message.success('감사 로그를 새로고침했습니다.')}
          />,
        ]}
      />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'logs',
            label: '감사 로그',
            children: auditLogContent,
          },
          {
            key: 'export',
            label: '증적 Export',
            children: <AuditEvidenceExport />,
          },
        ]}
      />
    </Flex>
  )
}
