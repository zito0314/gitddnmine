import {
  DownloadOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  ScanOutlined,
  StopOutlined,
  WarningOutlined,
} from '../components/icons'
import { Alert, Badge, Button, Card, Col, Row, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMergeRequests } from '../api/mergeRequests'
import { getRepositories } from '../api/repositories'
import {
  getSecurityValidationSummary,
  getSecurityValidations,
  getVulnerabilities,
} from '../api/security'
import { DataTable, FilterBar, PageHeader, StatusTag, SummaryCard } from '../components/common'
import { UI_TEXT } from '../constants'

const { Text } = Typography

function uniqueOptions(values) {
  return [...new Set(values.filter(Boolean))].map((value) => ({ value, label: value }))
}

function normalizeValidationStatus(status) {
  if (status === 'pass') return 'passed'
  return status
}

function hasSeverity(validation, severity) {
  return (validation.severity?.[severity] ?? 0) > 0
}

export default function SecurityList() {
  const navigate = useNavigate()
  const validations = useMemo(() => getSecurityValidations(), [])
  const repositories = useMemo(() => getRepositories(), [])
  const mergeRequests = useMemo(() => getMergeRequests(), [])
  const vulnerabilities = useMemo(() => getVulnerabilities(), [])
  const summary = useMemo(() => getSecurityValidationSummary(), [])

  const repositoryMap = useMemo(
    () => new Map(repositories.map((repository) => [repository.id, repository])),
    [repositories],
  )
  const mergeRequestMap = useMemo(
    () => new Map(mergeRequests.map((mergeRequest) => [String(mergeRequest.id), mergeRequest])),
    [mergeRequests],
  )
  const vulnerabilityTextBySecurityId = useMemo(() => {
    const map = new Map()
    for (const vulnerability of vulnerabilities) {
      const current = map.get(vulnerability.securityId) ?? []
      current.push(vulnerability.title)
      map.set(vulnerability.securityId, current)
    }
    return map
  }, [vulnerabilities])

  const [search, setSearch] = useState('')
  const [validationStatus, setValidationStatus] = useState(null)
  const [policyDecision, setPolicyDecision] = useState(null)
  const [severity, setSeverity] = useState(null)
  const [repositoryId, setRepositoryId] = useState(null)
  const [mrStatus, setMrStatus] = useState(null)
  const [author, setAuthor] = useState(null)

  const filteredValidations = useMemo(() => {
    const query = search.trim().toLowerCase()

    return validations.filter((validation) => {
      const repository = repositoryMap.get(validation.repo)
      const vulnerabilityTitles = vulnerabilityTextBySecurityId.get(validation.id)?.join(' ') ?? ''
      const searchable = [
        validation.id,
        repository?.name,
        validation.repo,
        validation.mrTitle,
        validation.author,
        vulnerabilityTitles,
        validation.policyLabel,
        validation.policy,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      if (query && !searchable.includes(query)) return false
      if (validationStatus && normalizeValidationStatus(validation.vstatus) !== validationStatus) return false
      if (policyDecision && validation.policy !== policyDecision) return false
      if (severity && !hasSeverity(validation, severity)) return false
      if (repositoryId && validation.repo !== repositoryId) return false
      if (mrStatus && validation.mrStatus !== mrStatus) return false
      if (author && validation.author !== author) return false

      return true
    })
  }, [
    author,
    mrStatus,
    policyDecision,
    repositoryId,
    repositoryMap,
    search,
    severity,
    validationStatus,
    validations,
    vulnerabilityTextBySecurityId,
  ])

  const isFiltered = search || validationStatus || policyDecision || severity || repositoryId || mrStatus || author

  const resetFilters = () => {
    setSearch('')
    setValidationStatus(null)
    setPolicyDecision(null)
    setSeverity(null)
    setRepositoryId(null)
    setMrStatus(null)
    setAuthor(null)
  }

  const columns = [
    {
      title: 'Security ID',
      dataIndex: 'id',
      width: 120,
      render: (id) => <Link to={`/security/${id}`}>{id}</Link>,
    },
    {
      title: 'Repository',
      dataIndex: 'repo',
      minWidth: 180,
      render: (repo) => <Link to={`/repositories/${repo}`}>{repositoryMap.get(repo)?.name ?? repo}</Link>,
    },
    {
      title: 'Merge Request',
      dataIndex: 'mrId',
      minWidth: 260,
      render: (mrId, record) => {
        const mergeRequest = mergeRequestMap.get(String(mrId))
        return (
          <Space direction="vertical" size={2}>
            <Link to={`/repositories/${record.repo}/merge-requests/${mrId}`}>
              !{mrId} {mergeRequest?.title ?? record.mrTitle}
            </Link>
            <Text type="secondary">{record.branch}</Text>
          </Space>
        )
      },
    },
    {
      title: 'Validation status',
      dataIndex: 'vstatus',
      width: 150,
      render: (value, record) => <StatusTag status={normalizeValidationStatus(value)} label={record.vlabel} />,
    },
    {
      title: 'Policy decision',
      dataIndex: 'policy',
      width: 150,
      render: (value, record) => <StatusTag status={value} label={record.policyLabel} />,
    },
    {
      title: 'Severity summary',
      key: 'severitySummary',
      minWidth: 190,
      render: (_, record) => {
        const isRisky = record.severity.critical > 0 || record.severity.high > 0
        return (
          <Badge
            status={isRisky ? 'error' : record.severity.medium > 0 ? 'warning' : 'success'}
            text={
              isRisky
                ? `Critical ${record.severity.critical}, High ${record.severity.high}`
                : `Medium ${record.severity.medium}, Low ${record.severity.low}`
            }
          />
        )
      },
    },
    { title: 'Critical', dataIndex: ['severity', 'critical'], width: 90 },
    { title: 'High', dataIndex: ['severity', 'high'], width: 80 },
    { title: 'Medium', dataIndex: ['severity', 'medium'], width: 90 },
    { title: 'Low', dataIndex: ['severity', 'low'], width: 70 },
    { title: 'Last checked', dataIndex: 'lastCheckedAt', width: 130 },
    { title: 'Owner / Author', dataIndex: 'author', width: 130 },
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
            navigate(`/security/${record.id}`)
          }}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageHeader
        title={UI_TEXT.pages.security.title}
        description={UI_TEXT.pages.security.description}
        actions={[
          <Button key="run" type="primary" icon={<ScanOutlined />}>
            {UI_TEXT.actions.runValidation}
          </Button>,
          <Button key="export" icon={<DownloadOutlined />}>
            {UI_TEXT.actions.export}
          </Button>,
          <Button key="refresh" icon={<ReloadOutlined />}>
            {UI_TEXT.actions.refresh}
          </Button>,
        ]}
      />

      <Row gutter={[12, 12]} className="summary-cards-row">
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.totalValidations} value={summary.total} icon={<SafetyCertificateOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.failed} value={summary.failed} tone="danger" icon={<ExclamationCircleOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.blockedMrs} value={summary.blockedMrs} tone="danger" icon={<StopOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.criticalIssues} value={summary.criticalIssues} tone="danger" icon={<WarningOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.warning} value={summary.warning} tone="warning" icon={<WarningOutlined />} />
        </Col>
        <Col xs={24} sm={12} xl={4}>
          <SummaryCard title={UI_TEXT.summary.passed} value={summary.passed} tone="success" icon={<SafetyCertificateOutlined />} />
        </Col>
      </Row>

      <Alert
        type="warning"
        showIcon
        message="Critical 또는 High 취약점이 있는 항목은 병합 정책에 영향을 줄 수 있습니다."
      />

      <Card>
        <FilterBar
          search={{
            placeholder: 'Security ID, Repository, MR, Author, Vulnerability 검색',
            value: search,
            onChange: setSearch,
          }}
          filters={[
            {
              key: 'validationStatus',
              placeholder: 'Validation status',
              value: validationStatus,
              onChange: setValidationStatus,
              options: [
                { value: 'passed', label: 'Passed' },
                { value: 'failed', label: 'Failed' },
                { value: 'warning', label: 'Warning' },
                { value: 'running', label: 'Running' },
                { value: 'pending', label: 'Pending' },
              ],
              width: 170,
            },
            {
              key: 'policyDecision',
              placeholder: 'Policy decision',
              value: policyDecision,
              onChange: setPolicyDecision,
              options: [
                { value: 'allowed', label: 'Allowed' },
                { value: 'blocked', label: 'Blocked' },
                { value: 'pending', label: 'Pending' },
              ],
              width: 160,
            },
            {
              key: 'severity',
              placeholder: UI_TEXT.filters.severity,
              value: severity,
              onChange: setSeverity,
              options: [
                { value: 'critical', label: 'Critical' },
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ],
            },
            {
              key: 'repository',
              placeholder: UI_TEXT.common.repository,
              value: repositoryId,
              onChange: setRepositoryId,
              options: uniqueOptions(validations.map((validation) => validation.repo)),
              width: 190,
            },
            {
              key: 'mrStatus',
              placeholder: 'MR status',
              value: mrStatus,
              onChange: setMrStatus,
              options: uniqueOptions(validations.map((validation) => validation.mrStatus)),
            },
            {
              key: 'author',
              placeholder: UI_TEXT.common.owner,
              value: author,
              onChange: setAuthor,
              options: uniqueOptions(validations.map((validation) => validation.author)),
            },
          ]}
          onReset={isFiltered ? resetFilters : undefined}
        />

        <DataTable
          rowKey="id"
          columns={columns}
          dataSource={filteredValidations}
          onRow={(record) => ({
            onClick: () => navigate(`/security/${record.id}`),
            style: { cursor: 'pointer' },
            className:
              record.severity.critical > 0 || record.severity.high > 0 ? 'security-risk-row' : undefined,
          })}
          pagination={{
            pageSize: 12,
            showSizeChanger: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}개`,
          }}
        />
      </Card>
    </Space>
  )
}
