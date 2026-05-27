import {
  DownloadOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  SendOutlined,
  UserSwitchOutlined,
} from '../components/icons'
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Row,
  Space,
  Timeline,
  Typography,
} from 'antd'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getAuditLogSummary,
  getAuditLogs,
  getAuditRelatedEvents,
  getAuditRelatedIds,
} from '../api/audit'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
import { CodePreview } from '../components/custom'
import { UI_TEXT } from '../constants'

const { Paragraph, Text } = Typography

function uniqueOptions(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

function normalizeResult(log) {
  if (log.resultClass === 'red') return 'blocked'
  if (log.resultClass === 'orange') return 'warning'
  return 'success'
}

function normalizeSeverity(severity) {
  if (severity === 'danger' || severity === 'critical') return 'failed'
  return severity
}

function getEventType(log) {
  if (log.target === 'mergeRequest') return 'mergeRequest'
  if (log.target === 'repository') return 'repository'
  if (log.target === 'pipeline') return 'pipeline'
  if (log.target === 'security') return 'security'
  if (log.target === 'deployment') return 'deployment'
  if (log.target === 'policy') return 'policy'
  if (log.eventCode?.includes('auth')) return 'auth'
  return log.target
}

function AuditLog() {
  const logs = useMemo(() => getAuditLogs(), [])
  const summary = useMemo(() => getAuditLogSummary(), [])
  const [selectedLog, setSelectedLog] = useState(null)
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState(null)
  const [eventType, setEventType] = useState(null)
  const [result, setResult] = useState(null)
  const [actor, setActor] = useState(null)
  const [repositoryId, setRepositoryId] = useState(null)
  const [dateRange, setDateRange] = useState(null)

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase()

    return logs.filter((log) => {
      const ids = getAuditRelatedIds(log)
      const searchable = [
        log.id,
        log.eventCode,
        log.actorName,
        log.actor,
        log.targetName,
        log.targetDetail,
        log.message,
        log.ip,
        ids.repositoryId,
        ids.mrId ? `MR #${ids.mrId}` : null,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      if (query && !searchable.includes(query)) return false
      if (severity && log.severity !== severity) return false
      if (eventType && getEventType(log) !== eventType) return false
      if (result && normalizeResult(log) !== result) return false
      if (actor && log.actor !== actor) return false
      if (repositoryId && ids.repositoryId !== repositoryId) return false
      if (dateRange?.length === 2) {
        const logTime = new Date(log.time)
        if (logTime < dateRange[0].toDate() || logTime > dateRange[1].toDate()) return false
      }

      return true
    })
  }, [actor, dateRange, eventType, logs, repositoryId, result, search, severity])

  const isFiltered = search || severity || eventType || result || actor || repositoryId || dateRange

  const resetFilters = () => {
    setSearch('')
    setSeverity(null)
    setEventType(null)
    setResult(null)
    setActor(null)
    setRepositoryId(null)
    setDateRange(null)
  }

  const columns = [
    { title: 'Time', dataIndex: 'time', width: 170 },
    {
      title: 'Severity',
      dataIndex: 'severity',
      width: 110,
      render: (value) => <StatusTag status={normalizeSeverity(value)} label={value} />,
    },
    {
      title: 'Event',
      key: 'event',
      minWidth: 240,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Text strong>{record.title}</Text>
          <Text type="secondary">{record.eventCode}</Text>
        </Space>
      ),
    },
    { title: 'Actor', dataIndex: 'actorName', width: 120 },
    {
      title: 'Target',
      dataIndex: 'targetDetail',
      minWidth: 220,
      render: (value, record) => <Text>{value || record.targetName}</Text>,
    },
    {
      title: 'Repository',
      dataIndex: 'targetName',
      width: 180,
      render: (value) => <Link to={`/repositories/${value}`}>{value}</Link>,
    },
    {
      title: 'Result',
      key: 'result',
      width: 130,
      render: (_, record) => <StatusTag status={normalizeResult(record)} label={record.result} />,
    },
    { title: 'IP', dataIndex: 'ip', width: 140 },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 104,
      render: (_, record) => (
        <Button
          size="small"
          onClick={(event) => {
            event.stopPropagation()
            setSelectedLog(record)
          }}
        >
          Detail
        </Button>
      ),
    },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.pages.audit.title}
        description={UI_TEXT.pages.audit.description}
        actions={[
          <Button key="export" icon={<DownloadOutlined />}>
            {UI_TEXT.actions.exportCsv}
          </Button>,
          <Button key="refresh" icon={<ReloadOutlined />}>
            {UI_TEXT.actions.refresh}
          </Button>,
        ]}
      />

      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="오늘 이벤트" value={summary.todayEvents} icon={<FileSearchOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="위험 이벤트" value={summary.riskEvents} tone="danger" icon={<ExclamationCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="정책 변경" value={summary.policyChanges} icon={<UserSwitchOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="보안 차단" value={summary.securityBlocks} tone="danger" icon={<SafetyCertificateOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="승인 이벤트" value={summary.approvalEvents} tone="success" icon={<UserSwitchOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title="운영이관 이벤트" value={summary.deploymentEvents} icon={<SendOutlined />} />
        </Col>
      </Row>

      <Card>
        <FilterBar
          search={{
            placeholder: 'Audit ID, Event, Actor, Target, Message, IP 검색',
            value: search,
            onChange: setSearch,
          }}
          filters={[
            {
              key: 'severity',
              placeholder: UI_TEXT.filters.severity,
              value: severity,
              onChange: setSeverity,
              options: [
                { value: 'info', label: 'Info' },
                { value: 'warning', label: 'Warning' },
                { value: 'danger', label: 'Danger' },
                { value: 'critical', label: 'Critical' },
              ],
            },
            {
              key: 'eventType',
              placeholder: 'Event type',
              value: eventType,
              onChange: setEventType,
              options: [
                { value: 'repository', label: 'Repository' },
                { value: 'mergeRequest', label: 'Merge Request' },
                { value: 'pipeline', label: 'Pipeline' },
                { value: 'security', label: 'Security' },
                { value: 'policy', label: 'Policy' },
                { value: 'deployment', label: 'Deployment' },
                { value: 'auth', label: 'Auth' },
              ],
            },
            {
              key: 'result',
              placeholder: 'Result',
              value: result,
              onChange: setResult,
              options: [
                { value: 'success', label: 'Success' },
                { value: 'failed', label: 'Failed' },
                { value: 'blocked', label: 'Blocked' },
                { value: 'warning', label: 'Warning' },
              ],
            },
            {
              key: 'actor',
              placeholder: 'Actor',
              value: actor,
              onChange: setActor,
              options: uniqueOptions(logs.map((log) => log.actor)),
            },
            {
              key: 'repository',
              placeholder: 'Repository',
              value: repositoryId,
              onChange: setRepositoryId,
              options: uniqueOptions(logs.map((log) => log.targetName)),
              width: 190,
            },
            {
              key: 'dateRange',
              type: 'dateRange',
              value: dateRange,
              onChange: setDateRange,
              placeholder: ['Start date', 'End date'],
            },
          ]}
          onReset={isFiltered ? resetFilters : undefined}
        />

        <DataTable
          rowKey="id"
          columns={columns}
          dataSource={filteredLogs}
          onRow={(record) => ({
            onClick: () => setSelectedLog(record),
            style: { cursor: 'pointer' },
            className: ['danger', 'critical'].includes(record.severity) ? 'security-risk-row' : undefined,
          })}
          pagination={{
            pageSize: 12,
            showSizeChanger: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}개`,
          }}
        />
      </Card>

      <AuditDrawer log={selectedLog} onClose={() => setSelectedLog(null)} />
    </Space>
  )
}

function AuditDrawer({ log, onClose }) {
  const ids = log ? getAuditRelatedIds(log) : {}
  const relatedEvents = log ? getAuditRelatedEvents(log.id) : []

  return (
    <Drawer open={Boolean(log)} onClose={onClose} title="Audit Detail" width={560}>
      {log ? (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Audit ID">{log.id}</Descriptions.Item>
            <Descriptions.Item label="Event code">{log.eventCode}</Descriptions.Item>
            <Descriptions.Item label="Severity"><StatusTag status={normalizeSeverity(log.severity)} label={log.severity} /></Descriptions.Item>
            <Descriptions.Item label="Result"><StatusTag status={normalizeResult(log)} label={log.result} /></Descriptions.Item>
            <Descriptions.Item label="Actor">{log.actorName}</Descriptions.Item>
            <Descriptions.Item label="Actor role">{log.actorRole}</Descriptions.Item>
            <Descriptions.Item label="Target type">{log.target}</Descriptions.Item>
            <Descriptions.Item label="Target name">{log.targetName}</Descriptions.Item>
            <Descriptions.Item label="Repository">
              <Link to={`/repositories/${ids.repositoryId}`}>{ids.repositoryId}</Link>
            </Descriptions.Item>
            <Descriptions.Item label="Related MR">
              {ids.mrId ? <Link to={`/repositories/${ids.repositoryId}/merge-requests/${ids.mrId}`}>!{ids.mrId}</Link> : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Related Pipeline">
              {ids.pipelineId ? <Link to={`/repositories/${ids.repositoryId}/pipelines/${ids.pipelineId}`}>#{ids.pipelineId}</Link> : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Related Security Validation">
              {ids.securityId ? <Link to={`/security/${ids.securityId}`}>{ids.securityId}</Link> : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="IP address">{log.ip}</Descriptions.Item>
            <Descriptions.Item label="User agent / Device">Chrome · macOS · Internal network</Descriptions.Item>
            <Descriptions.Item label="Created at">{log.time}</Descriptions.Item>
          </Descriptions>

          <Card size="small" title="Message">
            <Paragraph>{log.message}</Paragraph>
          </Card>

          <Card size="small" title="Raw metadata">
            <CodePreview variant="json" className="audit-json-preview">
              {JSON.stringify({ ...log, related: ids }, null, 2)}
            </CodePreview>
          </Card>

          <Card size="small" title="Event Context">
            <Timeline
              items={relatedEvents.map((event) => ({
                content: (
                  <Space direction="vertical" size={2}>
                    <Text>{event.title}</Text>
                    <Text type="secondary">{event.time} · {event.message}</Text>
                  </Space>
                ),
              }))}
            />
          </Card>
        </Space>
      ) : null}
    </Drawer>
  )
}

export default AuditLog
