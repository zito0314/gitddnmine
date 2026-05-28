import {
  AuditOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  FileCheckOutlined,
  FileSearchOutlined,
  HistoryOutlined,
} from '../components/icons'
import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Empty,
  Flex,
  Form,
  Input,
  Result,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd'
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAuditEvidenceCategories,
  getAuditEvidenceItems,
  getAuditEvidenceSummary,
  getAuditExportHistories,
} from '../api/audit'
import { useAuth } from '../auth/AuthContext'

const { Paragraph, Text, Title } = Typography

// ─── 상수 ──────────────────────────────────────────────────────────────────

const STATUS_MAP = {
  ready: { label: '준비 완료', color: 'green' },
  'need-review': { label: '확인 필요', color: 'gold' },
  'need-file': { label: '파일 필요', color: 'red' },
  'need-fix': { label: '보완 필요', color: 'orange' },
}

const FORMAT_COLOR = { PDF: 'blue', CSV: 'cyan', ZIP: 'purple', 첨부: 'default' }

const PROCESS_STEPS = [
  { num: '1', title: '항목 선택', desc: '감사 제출 기준에 맞는 증적 항목을 선택합니다.' },
  { num: '2', title: '이력 매핑', desc: 'Activity, MR, Pipeline, 권한 이력을 자동 연결합니다.' },
  { num: '3', title: '검토/보완', desc: '누락된 결재 문서나 외부 파일을 추가합니다.' },
  { num: '4', title: '파일 생성', desc: 'PDF, CSV, ZIP 형식의 감사 패키지를 생성합니다.' },
]

const EXPORT_HISTORY_COLUMNS = [
  { title: '패키지명', dataIndex: 'packageName', key: 'packageName', render: (v) => <Text strong>{v}</Text> },
  { title: '생성일', dataIndex: 'createdAtText', key: 'createdAt', width: 100 },
  { title: '생성자', dataIndex: 'createdBy', key: 'createdBy', width: 100 },
  { title: '포함 항목', dataIndex: 'itemCount', key: 'itemCount', width: 100, render: (v) => `${v}개` },
  {
    title: '파일 형식', dataIndex: 'formats', key: 'formats', width: 130,
    render: (formats) => (
      <Space size={4}>
        {(formats ?? []).map((f) => <Tag key={f} color={FORMAT_COLOR[f] ?? 'default'}>{f}</Tag>)}
      </Space>
    ),
  },
  { title: '상태', dataIndex: 'status', key: 'status', width: 100, render: () => <Tag color="green">생성 완료</Tag> },
  {
    title: '액션', key: 'actions', width: 130, fixed: 'right',
    render: () => (
      <Space size={4}>
        <Button size="small" icon={<DownloadOutlined />}>다운로드</Button>
        <Button size="small">상세 보기</Button>
      </Space>
    ),
  },
]

// ─── 서브 컴포넌트 ─────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const preset = STATUS_MAP[status] ?? { label: status, color: 'default' }
  return <Tag color={preset.color}>{preset.label}</Tag>
}

function FormatTags({ formats = [] }) {
  return (
    <Space size={4} wrap>
      {formats.map((f) => <Tag key={f} color={FORMAT_COLOR[f] ?? 'default'}>{f}</Tag>)}
    </Space>
  )
}

function PreviewDrawer({ item, open, onClose }) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="감사 증적 미리보기"
      width={520}
    >
      {item && (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="제출 항목">{item.title}</Descriptions.Item>
            <Descriptions.Item label="설명">{item.description}</Descriptions.Item>
            <Descriptions.Item label="자동 매핑 증적">{item.mappedEvidence}</Descriptions.Item>
            <Descriptions.Item label="매핑 상세">{item.mappedDescription}</Descriptions.Item>
            <Descriptions.Item label="상태"><StatusBadge status={item.status} /></Descriptions.Item>
            <Descriptions.Item label="파일 형식"><FormatTags formats={item.formats} /></Descriptions.Item>
            <Descriptions.Item label="담당자">{item.owner}</Descriptions.Item>
            <Descriptions.Item label="연결 자원">
              <Space size={4} wrap>
                {(item.relatedResources ?? []).map((r) => <Tag key={r}>{r}</Tag>)}
              </Space>
            </Descriptions.Item>
          </Descriptions>
          <Card size="small" title="연결된 이력">
            <Space direction="vertical" size={4}>
              {(item.relatedResources ?? []).map((r) => (
                <Flex key={r} gap={8} align="center">
                  <FileCheckOutlined />
                  <Text>{r} 이력이 자동 매핑되었습니다.</Text>
                </Flex>
              ))}
              {(item.relatedResources ?? []).length === 0 && (
                <Text type="secondary">외부 파일 첨부가 필요합니다.</Text>
              )}
            </Space>
          </Card>
        </Space>
      )}
    </Drawer>
  )
}

function SupplementDrawer({ item, open, onClose }) {
  const { message } = AntdApp.useApp()
  const [form] = Form.useForm()

  const handleSave = async () => {
    try {
      await form.validateFields()
      message.success('보완 요청이 저장되었어요.')
      form.resetFields()
      onClose()
    } catch {
      // validation error
    }
  }

  return (
    <Drawer
      open={open}
      onClose={() => { form.resetFields(); onClose() }}
      title="증적 보완"
      width={480}
      extra={
        <Button type="primary" onClick={handleSave}>저장</Button>
      }
    >
      {item && (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Card size="small" style={{ background: 'var(--ant-color-bg-layout)' }}>
            <Text strong>{item.title}</Text>
            <Paragraph type="secondary" style={{ margin: '4px 0 0' }}>
              누락된 결재 문서, 외부 파일, 담당자 확인 내용을 추가해 주세요.
            </Paragraph>
          </Card>
          <Form form={form} layout="vertical">
            <Form.Item
              name="memo"
              label="보완 메모"
              rules={[{ required: true, message: '보완 메모를 입력해 주세요.' }]}
            >
              <Input.TextArea rows={4} placeholder="보완 사항을 입력해 주세요." />
            </Form.Item>
            <Form.Item name="owner" label="담당자">
              <Input placeholder="담당자 이름을 입력해 주세요." />
            </Form.Item>
            <Form.Item name="file" label="파일 첨부">
              <Upload
                beforeUpload={() => {
                  message.success('파일이 첨부되었어요.')
                  return false
                }}
                showUploadList
              >
                <Button icon={<FileAddOutlined />}>파일 선택</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Space>
      )}
    </Drawer>
  )
}

// ─── 메인 컴포넌트 ─────────────────────────────────────────────────────────

export default function AuditEvidenceExport() {
  const navigate = useNavigate()
  const { message } = AntdApp.useApp()
  const auth = useAuth()

  const allCategories = useMemo(() => getAuditEvidenceCategories(), [])
  const allItems = useMemo(() => getAuditEvidenceItems(), [])
  const exportHistories = useMemo(() => getAuditExportHistories(), [])
  const summary = useMemo(() => getAuditEvidenceSummary(), [])

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [statusFilter, setStatusFilter] = useState(null)
  const [formatFilter, setFormatFilter] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [previewItem, setPreviewItem] = useState(null)
  const [supplementItem, setSupplementItem] = useState(null)

  const exportHistoryRef = useRef(null)

  // External 접근 제한
  if (auth.role === 'external') {
    return (
      <Result
        status="403"
        title="감사 Export에 접근할 수 없어요."
        subTitle="감사 증적 Export는 내부 담당자와 관리자만 사용할 수 있습니다."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>대시보드로 이동</Button>
        }
      />
    )
  }

  // 필터링
  const q = search.trim().toLowerCase()
  const filteredItems = allItems.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false
    if (statusFilter && item.status !== statusFilter) return false
    if (formatFilter && !(item.formats ?? []).includes(formatFilter)) return false
    if (q) {
      const text = [item.title, item.description, item.mappedEvidence, item.owner, ...item.relatedResources]
        .join(' ').toLowerCase()
      if (!text.includes(q)) return false
    }
    return true
  })

  const handleBulkExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Export할 항목을 선택해 주세요.')
      return
    }
    message.success('선택한 항목을 Export 패키지로 생성했어요.')
    setSelectedRowKeys([])
  }

  const handleHeroExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Export할 항목을 선택해 주세요.')
      return
    }
    message.success('선택한 감사 증적 패키지를 생성했어요.')
    setSelectedRowKeys([])
  }

  const buildActionButtons = (item) => {
    if (item.status === 'need-file') {
      return (
        <Space size={4}>
          <Button
            size="small"
            icon={<FileAddOutlined />}
            onClick={(e) => { e.stopPropagation(); setSupplementItem(item) }}
          >
            파일 첨부
          </Button>
          <Button
            size="small"
            onClick={(e) => { e.stopPropagation(); message.info('담당자에게 증적 보완 요청을 보냈어요.') }}
          >
            요청
          </Button>
        </Space>
      )
    }
    if (item.status === 'need-review' || item.status === 'need-fix') {
      return (
        <Space size={4}>
          <Button
            size="small"
            onClick={(e) => { e.stopPropagation(); setSupplementItem(item) }}
          >
            보완하기
          </Button>
          <Button
            size="small"
            type="primary"
            ghost
            icon={<DownloadOutlined />}
            onClick={(e) => { e.stopPropagation(); message.success(`${item.title} 증적 파일을 생성했어요.`) }}
          >
            Export
          </Button>
        </Space>
      )
    }
    return (
      <Space size={4}>
        <Button
          size="small"
          icon={<FileSearchOutlined />}
          onClick={(e) => { e.stopPropagation(); setPreviewItem(item) }}
        >
          미리보기
        </Button>
        <Button
          size="small"
          type="primary"
          ghost
          icon={<DownloadOutlined />}
          onClick={(e) => { e.stopPropagation(); message.success(`${item.title} 증적 파일을 생성했어요.`) }}
        >
          Export
        </Button>
      </Space>
    )
  }

  const tableColumns = [
    {
      title: '제출 항목',
      key: 'title',
      minWidth: 220,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Text strong>{record.title}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.description}</Text>
        </Space>
      ),
    },
    {
      title: '자동 매핑 증적',
      key: 'mapped',
      minWidth: 200,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Text>{record.mappedEvidence}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.mappedDescription}</Text>
        </Space>
      ),
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (v) => <StatusBadge status={v} />,
    },
    {
      title: '파일 형식',
      dataIndex: 'formats',
      key: 'formats',
      width: 150,
      render: (formats) => <FormatTags formats={formats} />,
    },
    {
      title: '액션',
      key: 'actions',
      width: 180,
      fixed: 'right',
      render: (_, record) => buildActionButtons(record),
    },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }} className="audit-evidence-page">

      {/* Hero 영역 */}
      <Card className="audit-evidence-hero" styles={{ body: { padding: '28px 24px' } }}>
        <Row align="middle" gutter={[24, 16]}>
          <Col flex="1">
            <Text type="secondary" style={{ fontSize: 12, letterSpacing: 1 }}>AUDIT EVIDENCE EXPORT</Text>
            <Title level={3} style={{ margin: '8px 0 10px' }}>
              감사 대응에 필요한 증적을 항목별 파일로 추출하세요
            </Title>
            <Paragraph type="secondary" style={{ margin: 0 }}>
              사용자 Activity, 권한 변경, MR 승인, Pipeline/보안 점검, 운영이관 이력을 감사 제출 항목에 맞춰 자동 매핑하고
              PDF, CSV, ZIP 형식으로 내보냅니다.
            </Paragraph>
          </Col>
          <Col>
            <Space direction="vertical" size={8}>
              <Button type="primary" icon={<DownloadOutlined />} onClick={handleHeroExport}>
                선택 항목 Export
              </Button>
              <Button
                onClick={() => {
                  exportHistoryRef.current?.scrollIntoView({ behavior: 'smooth' })
                  message.info('최근 감사 패키지를 확인합니다.')
                }}
              >
                최근 감사 패키지 보기
              </Button>
              <Button onClick={() => message.info('감사 제출 기준 설정으로 이동합니다.')}>
                제출 기준 설정
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 요약 카드 */}
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic
              title="제출 가능 항목"
              value={summary.readyCount}
              prefix={<CheckCircleOutlined style={{ color: 'var(--ant-color-success)' }} />}
              suffix={<Text type="secondary" style={{ fontSize: 12 }}>자동 매핑 완료</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic
              title="확인 필요"
              value={summary.needReviewCount}
              prefix={<ExclamationCircleOutlined style={{ color: 'var(--ant-color-warning)' }} />}
              suffix={<Text type="secondary" style={{ fontSize: 12 }}>담당자 확인 필요</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic
              title="최근 Export"
              value={summary.thisMonthExports}
              prefix={<HistoryOutlined />}
              suffix={<Text type="secondary" style={{ fontSize: 12 }}>이번 달 생성된 패키지</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <Statistic
              title="증적 커버리지"
              value={summary.coveragePercent}
              suffix="%"
              prefix={<AuditOutlined />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>현재 Activity 기준</Text>
          </Card>
        </Col>
      </Row>

      {/* 본문: 좌측 카테고리 + 우측 Export 보드 */}
      <Row gutter={[16, 16]} align="top">
        {/* 좌측 카테고리 패널 */}
        <Col xs={24} md={6} lg={5}>
          <Card title="감사 제출 항목" size="small" styles={{ body: { padding: 0 } }}>
            <Space direction="vertical" size={0} style={{ width: '100%' }}>
              {[{ key: 'all', label: '전체', count: allItems.length }, ...allCategories].map((cat, idx, arr) => (
                <div key={cat.key}>
                  <div
                    className={`audit-category-item${selectedCategory === cat.key ? ' audit-category-item--active' : ''}`}
                    onClick={() => setSelectedCategory(cat.key)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedCategory(cat.key)}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      background: selectedCategory === cat.key ? 'var(--ant-color-primary-bg)' : 'transparent',
                      borderLeft: selectedCategory === cat.key ? '3px solid var(--ant-color-primary)' : '3px solid transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Flex justify="space-between" align="center">
                      <Text
                        strong={selectedCategory === cat.key}
                        style={{ fontSize: 13 }}
                      >
                        {cat.label}
                      </Text>
                      <Tag>{cat.count}</Tag>
                    </Flex>
                  </div>
                  {idx < arr.length - 1 && <Divider style={{ margin: 0 }} />}
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        {/* 우측 Export 보드 */}
        <Col xs={24} md={18} lg={19}>
          <Card
            title={
              <Flex align="center" justify="space-between" wrap="wrap" gap={8}>
                <Space direction="vertical" size={2}>
                  <Text strong>감사 증적 Export 보드</Text>
                  <Text type="secondary" style={{ fontSize: 12, fontWeight: 'normal' }}>
                    감사 제출 기준에 맞는 항목을 gitddn의 Activity, Policy, Repository 이력과 연결해 제출 파일로 구성합니다.
                  </Text>
                </Space>
                <Tag color="blue">총 {allItems.length}개 항목</Tag>
              </Flex>
            }
          >
            {/* 4단계 처리 흐름 */}
            <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
              {PROCESS_STEPS.map((step) => (
                <Col key={step.num} xs={24} sm={12} md={6}>
                  <Card size="small" styles={{ body: { padding: '10px 12px' } }}>
                    <Flex gap={8} align="flex-start">
                      <Tag color="blue" style={{ flexShrink: 0, margin: 0 }}>{step.num}</Tag>
                      <Space direction="vertical" size={2}>
                        <Text strong style={{ fontSize: 13 }}>{step.title}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>{step.desc}</Text>
                      </Space>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>

            <Divider style={{ margin: '0 0 16px' }} />

            {/* 필터 바 */}
            <Flex className="audit-filter-bar" gap={8} wrap="wrap" style={{ marginBottom: 16 }}>
              <Select
                placeholder="전체 카테고리"
                allowClear
                style={{ width: 180 }}
                options={allCategories.map((c) => ({ value: c.key, label: c.label }))}
                onChange={(v) => setSelectedCategory(v ?? 'all')}
                value={selectedCategory === 'all' ? undefined : selectedCategory}
              />
              <Select
                placeholder="제출 상태"
                allowClear
                style={{ width: 140 }}
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: 'ready', label: '준비 완료' },
                  { value: 'need-review', label: '확인 필요' },
                  { value: 'need-file', label: '파일 필요' },
                  { value: 'need-fix', label: '보완 필요' },
                ]}
              />
              <Select
                placeholder="파일 형식"
                allowClear
                style={{ width: 120 }}
                value={formatFilter}
                onChange={setFormatFilter}
                options={['PDF', 'CSV', 'ZIP', '첨부'].map((f) => ({ value: f, label: f }))}
              />
              <Input.Search
                placeholder="항목명, 규정명, Repository, 담당자를 검색해 주세요."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={(v) => setSearch(v)}
                allowClear
                style={{ flex: '1 1 280px', minWidth: 200 }}
              />
              <Button type="primary" icon={<DownloadOutlined />} onClick={handleBulkExport}>
                일괄 Export
              </Button>
            </Flex>

            {/* 항목 테이블 */}
            {filteredItems.length === 0 ? (
              <Empty description="조건에 맞는 항목이 없어요." />
            ) : (
              <Table
                rowKey="id"
                rowSelection={{
                  selectedRowKeys,
                  onChange: setSelectedRowKeys,
                }}
                columns={tableColumns}
                dataSource={filteredItems}
                pagination={false}
                scroll={{ x: 'max-content' }}
                size="middle"
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* 최근 Export 이력 */}
      <div ref={exportHistoryRef}>
        <Card
          title={
            <Space direction="vertical" size={2}>
              <Text strong>최근 Export 이력</Text>
              <Text type="secondary" style={{ fontSize: 12, fontWeight: 'normal' }}>
                생성된 감사 패키지와 제출 파일 이력을 확인합니다.
              </Text>
            </Space>
          }
        >
          <Table
            rowKey="id"
            dataSource={exportHistories}
            columns={EXPORT_HISTORY_COLUMNS}
            pagination={false}
            scroll={{ x: 'max-content' }}
            size="middle"
          />
        </Card>
      </div>

      {/* 하단 안내 영역 */}
      <Card title="감사 증적 구성 방식">
        <Paragraph type="secondary">
          감사 메뉴는 단순 로그 조회를 넘어, 감사 제출 기준에 맞춰 내부 이력을 증적 파일로 구성하는 업무 화면입니다.
        </Paragraph>
        <Row gutter={[12, 12]}>
          <Col xs={24} md={8}>
            <Card size="small" title={<Space><AuditOutlined />감사 항목 매핑</Space>}>
              <Text type="secondary">
                감사인이 요구하는 제출 항목을 기준으로 gitddn 내부 Activity와 자동 연결합니다.
              </Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" title={<Space><CheckCircleOutlined />증적 커버리지</Space>}>
              <Text type="secondary">
                준비 완료, 확인 필요, 파일 필요 상태를 구분해 누락된 증적을 빠르게 확인합니다.
              </Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" title={<Space><DownloadOutlined />Export 패키지</Space>}>
              <Text type="secondary">
                선택한 항목을 PDF, CSV, ZIP으로 묶어 제출용 파일을 생성합니다.
              </Text>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Drawers */}
      <PreviewDrawer item={previewItem} open={Boolean(previewItem)} onClose={() => setPreviewItem(null)} />
      <SupplementDrawer item={supplementItem} open={Boolean(supplementItem)} onClose={() => setSupplementItem(null)} />
    </Space>
  )
}
