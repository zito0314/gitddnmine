import {
  CheckCircleOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  ScanOutlined,
  StopOutlined,
  WarningOutlined,
} from '../components/icons'
import { Alert, App as AntdApp, Button, Card, Empty, Flex, Input, Select, Space, Table, Tabs, Tag, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getRepositories } from '../api/repositories'
import { getSecurityValidations } from '../api/security'
import { useAuth } from '../auth/AuthContext'
import { FilterBar, PageHeader, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

const { Search } = Input
const { Text } = Typography

const VALIDATION_TABS = [
  { key: 'all', label: '전체' },
  { key: 'sast', label: '정적 분석' },
  { key: 'dast', label: '동적 분석' },
  { key: 'sca', label: '오픈소스 분석' },
  { key: 'container', label: '컨테이너 검사' },
  { key: 'secret', label: '시크릿 검사' },
]

const TOOL_LABELS = {
  sast: 'SAST',
  dast: 'DAST',
  sca: 'SCA',
  container: 'Container',
  secret: 'Secret',
}

const STATUS_META = {
  passed: { label: '적합', color: 'success' },
  warning: { label: '경고', color: 'warning' },
  blocked: { label: '부적합', color: 'error' },
  failed: { label: '실패', color: 'error' },
  running: { label: '경고', color: 'processing' },
  pending: { label: '경고', color: 'default' },
}

const POLICY_LABELS = {
  deployable: '배포 가능',
  approval_required: '보안 승인 필요',
  conditional: '조건부 배포 가능',
  blocked: '배포 차단',
}

const SEVERITY_LABELS = [
  { key: 'critical', label: '치명적', color: 'red' },
  { key: 'high', label: '매우 위험', color: 'volcano' },
  { key: 'medium', label: '위험', color: 'orange' },
  { key: 'low', label: '중간', color: 'gold' },
  { key: 'info', label: '낮음', color: 'blue' },
]

function uniqueOptions(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

function getSearchText(validation) {
  return [
    validation.securityId,
    validation.repositoryId,
    validation.repositoryName,
    validation.mergeRequestId,
    validation.mergeRequestTitle,
    validation.sourceBranch,
    validation.targetBranch,
    validation.ownerName,
    validation.toolType,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function getSummary(validations) {
  return validations.reduce(
    (summary, validation) => {
      summary.total += 1
      if (validation.status === 'failed') summary.failed += 1
      if (validation.status === 'blocked' || validation.policyDecision === 'blocked') summary.blockedMrs += 1
      if (validation.status === 'warning') summary.warning += 1
      if (validation.status === 'passed') summary.passed += 1
      summary.criticalIssues += validation.severityCounts?.critical ?? 0
      return summary
    },
    {
      total: 0,
      failed: 0,
      blockedMrs: 0,
      criticalIssues: 0,
      warning: 0,
      passed: 0,
    },
  )
}

export default function SecurityList() {
  const navigate = useNavigate()
  const auth = useAuth()
  const { message } = AntdApp.useApp()
  const repositories = useMemo(() => getRepositories(), [])
  const validations = useMemo(() => {
    const accessibleRepositoryIds = new Set(repositories.map((repository) => repository.id))
    return getSecurityValidations().filter((validation) => accessibleRepositoryIds.has(validation.repositoryId))
  }, [repositories])
  const [activeTool, setActiveTool] = useState('all')
  const [selectedRepositoryId, setSelectedRepositoryId] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedOwner, setSelectedOwner] = useState(null)
  const [selectedTool, setSelectedTool] = useState(null)
  const canRunValidation = auth.isAdmin || auth.isInternalUser || auth.hasPermission('security:write')

  const filteredValidations = useMemo(() => {
    const query = search.trim().toLowerCase()

    return validations.filter((validation) => {
      const toolType = validation.toolType ?? 'sast'

      if (selectedRepositoryId && validation.repositoryId !== selectedRepositoryId) return false
      if (activeTool !== 'all' && toolType !== activeTool) return false
      if (selectedTool && toolType !== selectedTool) return false
      if (selectedStatus && validation.status !== selectedStatus) return false
      if (selectedOwner && validation.ownerName !== selectedOwner) return false
      if (query && !getSearchText(validation).includes(query)) return false

      return true
    })
  }, [activeTool, search, selectedOwner, selectedRepositoryId, selectedStatus, selectedTool, validations])

  const summary = useMemo(() => getSummary(filteredValidations), [filteredValidations])

  const repositoryOptions = [
    { value: 'all', label: '전체 저장소' },
    ...repositories.map((repository) => ({ value: repository.id, label: repository.name })),
  ]
  const statusOptions = [
    { value: 'all', label: '전체' },
    { value: 'passed', label: '적합' },
    { value: 'warning', label: '경고' },
    { value: 'blocked', label: '부적합' },
    { value: 'failed', label: '실패' },
  ]
  const ownerOptions = [
    { value: 'all', label: '전체 담당자' },
    ...uniqueOptions(validations.map((validation) => validation.ownerName)),
  ]
  const toolOptions = [
    { value: 'all', label: '전체 Tool' },
    ...Object.entries(TOOL_LABELS).map(([value, label]) => ({ value, label })),
  ]

  const columns = [
    {
      title: '보안 ID',
      dataIndex: 'securityId',
      width: 120,
      render: (securityId) => <Link to={`/security/${securityId}`}>{securityId}</Link>,
    },
    {
      title: '저장소',
      dataIndex: 'repositoryName',
      width: 180,
      render: (repositoryName, record) => <Link to={`/repositories/${record.repositoryId}`}>{repositoryName}</Link>,
    },
    {
      title: 'Merge Request',
      dataIndex: 'mergeRequestId',
      minWidth: 280,
      render: (mergeRequestId, record) => (
        <Flex vertical gap={4}>
          <Link to={`/repositories/${record.repositoryId}/merge-requests/${mergeRequestId}`}>
            #{record.mergeRequestNumber ?? mergeRequestId} · {record.mergeRequestTitle}
          </Link>
          <Space size={4} wrap>
            {record.sourceBranch ? <Tag>{record.sourceBranch}</Tag> : null}
            {record.targetBranch ? <Text type="secondary">→</Text> : null}
            {record.targetBranch ? <Tag>{record.targetBranch}</Tag> : null}
          </Space>
        </Flex>
      ),
    },
    {
      title: '검증 상태',
      dataIndex: 'status',
      width: 120,
      render: (status) => {
        const meta = STATUS_META[status] ?? STATUS_META.pending
        return <Tag color={meta.color}>{meta.label}</Tag>
      },
    },
    {
      title: '정책 판정',
      dataIndex: 'policyDecision',
      width: 150,
      render: (policyDecision) => POLICY_LABELS[policyDecision] ?? '조건부 배포 가능',
    },
    {
      title: '취약점',
      key: 'severityCounts',
      minWidth: 280,
      render: (_, record) => (
        <Space size={[4, 4]} wrap>
          {SEVERITY_LABELS.map(({ key, label, color }) => (
            <Tag key={key} color={color}>
              {label} {record.severityCounts?.[key] ?? 0}
            </Tag>
          ))}
          <Tag>매우 낮음 0</Tag>
        </Space>
      ),
    },
    {
      title: '담당자',
      dataIndex: 'ownerName',
      width: 120,
    },
    {
      title: '최근 점검',
      dataIndex: 'checkedAt',
      width: 120,
    },
  ]

  const table = (
    <>
      <FilterBar className="repository-security-filter">
        <Select
          className="filter-select filter-select--xl"
          placeholder="전체 저장소"
          value={selectedRepositoryId ?? 'all'}
          options={repositoryOptions}
          onChange={(value) => setSelectedRepositoryId(value === 'all' ? null : value)}
        />
        <Search
          allowClear
          className="filter-search-fill"
          placeholder="보안 ID, 저장소명, MR, 담당자명으로 검색해 주세요."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          className="filter-select filter-select--period"
          placeholder="검증 상태"
          value={selectedStatus ?? 'all'}
          options={statusOptions}
          onChange={(value) => setSelectedStatus(value === 'all' ? null : value)}
        />
        <Select
          className="filter-select filter-select--period"
          placeholder="담당자"
          value={selectedOwner ?? 'all'}
          options={ownerOptions}
          onChange={(value) => setSelectedOwner(value === 'all' ? null : value)}
        />
        <Select
          className="filter-select filter-select--period"
          placeholder="Tool"
          value={selectedTool ?? 'all'}
          options={toolOptions}
          onChange={(value) => setSelectedTool(value === 'all' ? null : value)}
        />
      </FilterBar>

      <Table
        rowKey="securityId"
        className="repository-security-table"
        columns={columns}
        dataSource={filteredValidations}
        scroll={{ x: 1200 }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="표시할 보안 검증 결과가 없습니다. 검색 조건을 변경하거나 새 검증을 실행해 주세요."
            />
          ),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
        onRow={(record) => ({
          onClick: () => navigate(`/security/${record.securityId}`),
          className: 'repository-security-row',
        })}
      />
    </>
  )

  return (
    <Flex vertical gap={16} className="page-stack repository-security-page">
      <PageHeader
        title={UI_TEXT.pages.security.title}
        description="저장소와 Merge Request 단위의 보안 검증 상태와 차단 항목을 확인합니다."
        actions={[
          canRunValidation ? (
            <Button
              key="run"
              type="primary"
              icon={<ScanOutlined />}
              onClick={() => message.info('보안 검증 실행은 데모 기능입니다.')}
            >
              검증 실행
            </Button>
          ) : null,
          <Button key="export" icon={<DownloadOutlined />} onClick={() => message.info('내보내기는 데모 기능입니다.')}>
            내보내기
          </Button>,
          <Button
            key="refresh"
            aria-label="새로고침"
            icon={<ReloadOutlined />}
            onClick={() => message.info('보안 검증 목록을 새로고침했습니다.')}
          />,
        ].filter(Boolean)}
      />

      <Flex gap={12} wrap="wrap" className="repository-security-summary">
        <SummaryCard title="전체 검증" value={summary.total} icon={<SafetyCertificateOutlined />} />
        <SummaryCard title="실패" value={summary.failed} tone="danger" icon={<ExclamationCircleOutlined />} />
        <SummaryCard title="차단된 MR" value={summary.blockedMrs} tone="danger" icon={<StopOutlined />} />
        <SummaryCard title="Critical 이슈" value={summary.criticalIssues} tone="danger" icon={<WarningOutlined />} />
        <SummaryCard title="경고" value={summary.warning} tone="warning" icon={<WarningOutlined />} />
        <SummaryCard title="통과" value={summary.passed} tone="success" icon={<CheckCircleOutlined />} />
      </Flex>

      <Alert
        type="warning"
        showIcon
        closable
        title="Critical 또는 High 취약점이 있는 항목은 병합 정책에 영향을 줄 수 있습니다."
      />

      <Card className="repository-security-card" variant="outlined">
        <Tabs
          activeKey={activeTool}
          onChange={setActiveTool}
          items={VALIDATION_TABS.map((tab) => ({
            ...tab,
            children: table,
          }))}
        />
      </Card>
    </Flex>
  )
}
