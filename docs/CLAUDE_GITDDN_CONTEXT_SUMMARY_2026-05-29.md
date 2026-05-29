# gitddn AI Context Summary — 2026-05-29

이 문서는 2026-05-29 세션에서 진행된 모든 작업과 기술적 결정 사항을 정리한 인수인계 문서입니다.  
다음 AI가 이 문서를 읽고 컨텍스트 없이 작업을 이어받을 수 있도록 작성되었습니다.

---

## 0. 빠른 참조

| 항목 | 값 |
|---|---|
| GitHub 원격 | `https://github.com/zito0314/gitddnmine.git` (main 브랜치 직접 push) |
| 작업 Worktree | `/tmp/gitddn-mr` (브랜치: `feature/sidebar-logo-toggle`) |
| React 앱 경로 | `/tmp/gitddn-mr/react-app/` |
| 핵심 CSS 파일 | `react-app/src/index.css` |
| 핵심 레이아웃 | `react-app/src/components/layout/` |
| 미리보기 설정 | `/Users/hddn2/gitddn/.claude/launch.json` → `react-app dev` (port 5173) |
| Auto push | 수정 즉시 commit + push origin main (별도 요청 불필요) |

---

## 1. 오늘 완료한 작업 목록

### 1-1. GNB Sidebar 로고/접기 영역 인터랙션 개선 (`feature/sidebar-logo-toggle`)

**파일**: `react-app/src/components/layout/Sidebar.jsx`, `react-app/src/index.css`

#### 변경 내용

| 상태 | 이전 | 이후 |
|---|---|---|
| 확장 | `Menu` 기반 로고 | gitddn 로고(홈 이동) + 우측 접기 버튼(Tooltip) |
| 축소 | 로고만 표시 | 로고 hover 시 `MenuUnfoldOutlined` 아이콘으로 전환 + Tooltip |

**`SidebarLogoCollapsed` 신규 컴포넌트 추가** (`Sidebar.jsx` 내부 helper):
```jsx
function SidebarLogoCollapsed({ onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Tooltip title="사이드바 열기" placement="right">
      <Button type="text" aria-label="사이드바 열기"
        className="sidebar-logo-collapsed-btn" onClick={onOpen}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}
      >
        {hovered ? <MenuUnfoldOutlined className="sidebar-logo-open-icon" /> : <GitddnLogo compact />}
      </Button>
    </Tooltip>
  )
}
```

**확장 상태 JSX** (`sidebar-logo-area` div 내부):
```jsx
<Flex align="center" justify="space-between" className="sidebar-logo-expanded">
  <button type="button" className="sidebar-logo-home-btn"
    aria-label="홈으로 이동" onClick={() => navigate('/')}>
    <GitddnLogo />
  </button>
  <Tooltip title="사이드바 접기" placement="right">
    <Button type="text" size="small" icon={<MenuFoldOutlined />}
      aria-label="사이드바 접기" className="sidebar-collapse-btn"
      onClick={() => onCollapse(true)} />
  </Tooltip>
</Flex>
```

**추가된 CSS 클래스** (`index.css`):

```css
/* 로고 영역 공통 — 64px 고정, 수직 중앙 정렬 */
.sidebar-logo-area {
  height: 64px;
  padding: 0 16px;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

/* 축소 상태: 좌우 패딩 제거 후 중앙 정렬 */
.ant-layout-sider-collapsed .sidebar-logo-area {
  padding: 0;
  justify-content: center;
}

/* 펼침 상태: 전체 너비 차지해야 space-between 동작 */
.sidebar-logo-expanded { flex: 1; gap: 8px; }

/* 홈 이동 raw button 리셋 */
.sidebar-logo-home-btn {
  display: inline-flex; align-items: center;
  background: none; border: none; padding: 0; cursor: pointer; line-height: 1;
}

/* 접기 버튼 */
.sidebar-collapse-btn.ant-btn { flex: none; color: var(--gitddn-subtle); }
.sidebar-collapse-btn.ant-btn:hover { color: var(--gitddn-text); background: var(--gitddn-sidebar-hover-bg); }

/* 축소 상태 로고/열기 버튼 */
.sidebar-logo-collapsed-btn.ant-btn {
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; padding: 0; margin: 0 auto; color: var(--gitddn-text);
}
.sidebar-logo-collapsed-btn.ant-btn:hover { background: var(--gitddn-sidebar-hover-bg); }
.sidebar-logo-open-icon { font-size: 18px; }
```

**핵심 수정 이유 기록**:
- `sidebar-logo-area` 좌우 padding(16px×2=32px)이 collapsed 72px에서 버튼(40px) 공간과 맞닿아 `margin:auto` 무효 → `.ant-layout-sider-collapsed` 클래스로 재정의
- `sidebar-logo-expanded`에 `flex:1` 없으면 부모 flex 안에서 너비를 못 채워 `justify-content: space-between` 무효 → `flex:1` 추가

---

### 1-2. Sidebar Organization 버튼 상단 간격 추가

**파일**: `react-app/src/index.css`

```css
/* 기존 */
.sidebar-organization-button.ant-btn { margin: 0 22px 22px; }

/* 변경 */
.sidebar-organization-button.ant-btn { margin: 12px 22px 22px; }
```

---

### 1-3. Dashboard 카드 헤더 제거 (바디 통합)

**파일**: `react-app/src/pages/Dashboard.jsx`, `react-app/src/index.css`

**문제**: `CardAdvance`의 `title`/`description`/`extra` props가 AntD `Card`의 `.ant-card-head` 별도 영역을 생성 → 사용자 요청으로 헤더 제거, 바디 안에 직접 렌더링.

**변경 패턴** (3개 카드 동일):
```jsx
// 이전
<CardAdvance title="Next up" description="..." extra={<Button>전체보기</Button>}>

// 이후
<CardAdvance className="dashboard-work-card">
  <Flex justify="space-between" align="center" className="dashboard-card-head">
    <Flex vertical gap={2}>
      <Text strong>Next up</Text>
      <Text type="secondary" className="card-advance-description">AI 어시스턴트가...</Text>
    </Flex>
    <Button type="link" size="small" onClick={() => navigate('/merge-requests')}>전체보기</Button>
  </Flex>
  {/* 기존 children 유지 */}
</CardAdvance>
```

**Quick Access 카드** (extra 없음):
```jsx
<CardAdvance className="dashboard-quick-card">
  <Text strong className="dashboard-card-head">Quick Access</Text>
  <Tabs ... />
```

**추가 CSS**:
```css
.dashboard-card-head { margin-bottom: 12px; }
.dashboard-work-card .card-advance-description,
.dashboard-quick-card .card-advance-description { color: var(--gitddn-primary); }
```

---

### 1-4. GNB Ask 버튼 스타일 변경

**파일**: `react-app/src/components/layout/TopHeader.jsx`

```jsx
// 이전
<Button className="header-ask-button" icon={<QuestionCircleOutlined />}>Ask</Button>

// 이후
<Button className="header-ask-button" color="default" variant="filled" icon={<QuestionCircleOutlined />}>Ask</Button>
```

`ant-btn-variant-outlined` (테두리) → `ant-btn-variant-filled` (채워진 배경)

---

## 2. 오늘 커밋 이력

```
d4a438e  fix: GNB Ask 버튼 color=default variant=filled 적용
67c17727 refactor: Dashboard 카드 헤더 제거, 타이틀/설명/extra를 바디 내부로 이동
cd97bc55 fix: sidebar organization 버튼 상단 12px padding 추가
ded60009 fix: sidebar 접기 버튼 우측 정렬
27758f20 fix: sidebar-logo-area 수직 중앙 정렬 수정
aa561e53 fix: sidebar-logo-area 고정 높이 64px 명시적 설정
f37ca773 fix: collapsed 상태 sidebar 로고 수평 정렬 수정
bc0016d7 feat: GNB Sidebar 로고/접기 영역 인터랙션 개선
```

---

## 3. 핵심 파일 현황

### 레이아웃 파일

| 파일 | 역할 | 주요 상태 |
|---|---|---|
| `components/layout/AppLayout.jsx` | 최상위 레이아웃 | `collapsed` state 보유, Sidebar/TopHeader에 props 전달 |
| `components/layout/Sidebar.jsx` | 좌측 GNB | `SidebarLogoCollapsed` 컴포넌트 포함, `collapsed`/`onCollapse` props |
| `components/layout/TopHeader.jsx` | 상단 헤더 | `header-sidebar-toggle` 버튼, `header-ask-button` Ask 버튼 |
| `components/layout/RepositoryContextSidebar.jsx` | 저장소 상세 사이드 메뉴 | 저장소 진입 시 Sidebar 내부에 렌더링 |

### 공통 컴포넌트

| 컴포넌트 | 경로 | 사용법 |
|---|---|---|
| `CardAdvance` | `components/common/CardAdvance.jsx` | `title`, `description`, `extra`, `children` props. 내부는 AntD `Card` 래핑 |
| `PageHeader` | `components/common/PageHeader.jsx` | 페이지 상단 타이틀/설명/액션 영역 |
| `FilterBar` | `components/common/FilterBar.jsx` | `className`, `justify` props, 필터 영역 공통 래퍼 |
| `StatusTag` | `components/common/StatusTag.jsx` | MR/Pipeline 상태 Tag |

### 주요 페이지

| 페이지 | 경로 | 특이사항 |
|---|---|---|
| Dashboard | `pages/Dashboard.jsx` | CardAdvance 3개, 카드 헤더 제거 (바디 통합) |
| RepositoryBranches | `pages/RepositoryBranches.jsx` | BranchSection → 각각 Card 래핑, FilterBar 사용 |
| MergeRequestDetail | `pages/MergeRequestDetail.jsx` | 우측 패널 단일 Card + Divider 구조 |
| RepositoryMergeRequests | `pages/RepositoryMergeRequests.jsx` | mr-dashboard-list → `Flex vertical` (CSS `:last-child` 보존) |

---

## 4. CSS 아키텍처 주요 패턴

### AntD Sider collapsed 상태 감지
```css
/* AntD가 collapsed 시 자동으로 부착하는 클래스 활용 */
.ant-layout-sider-collapsed .sidebar-logo-area { ... }
.ant-layout-sider-collapsed .sidebar-organization-button.ant-btn { ... }
```

### Flex vs Space — `:last-child` 보존 이슈
```jsx
// Space는 각 child를 .ant-space-item으로 감싸므로 CSS :last-child 셀렉터 파괴
// → Flex vertical 사용으로 직접 child로 렌더링
<Flex vertical className="mr-dashboard-list">
  {items.map(item => <Row key={item.id} />)}
</Flex>
```

### inspect tool bounding box 오류 주의
- `preview_inspect` 도구의 `boundingBox` 값이 실제 렌더링 크기와 다를 수 있음
- 정확한 측정은 `preview_eval`로 `getBoundingClientRect()` 직접 호출
```js
const rect = el.getBoundingClientRect()
// rect.height가 실제 렌더링 높이
```

---

## 5. 세션 재시작 시 필수 체크리스트

```bash
# 1. Worktree 존재 확인
ls /tmp/gitddn-mr/react-app/node_modules/.bin/vite || echo "node_modules 없음"

# 만약 없으면 재생성
git worktree add /tmp/gitddn-mr feature/sidebar-logo-toggle
cd /tmp/gitddn-mr/react-app && npm install

# 2. 원격 동기화 확인
git -C /tmp/gitddn-mr fetch origin
git -C /tmp/gitddn-mr log --oneline origin/main~5..origin/main

# 3. push 전 항상 lint + build 확인
cd /tmp/gitddn-mr/react-app && npm run lint && npm run build
```

---

## 6. 알려진 이슈 / 후속 작업

| 항목 | 내용 | 우선순위 |
|---|---|---|
| `f4a329cb` 커밋 | node_modules 없는 상태에서 커밋 → lint/build 미검증 (이후 커밋에서 확인됨) | 낮음 |
| chunk size warning | Rolldown 번들 2.3MB — 기존 경고, 기능 영향 없음 | 낮음 |
| `ant-layout-sider-collapsed` CSS 의존 | AntD 버전 업 시 클래스명 변경 주의 | 낮음 |

---

## 7. 전체 프로젝트 컨텍스트 (GITDDN_HANDOFF_FINAL.md 요약)

> 전체 원본: `/Users/hddn2/Desktop/Gitddn 깃든/GITDDN_HANDOFF_FINAL.md`

### 기술 스택
- React 19 + Vite 8 + Ant Design 6.4.3
- 인증: `react-app/src/auth/AuthContext` (`useAuth()`)
- 라우팅: React Router DOM
- 상태: 서버 상태 없음, 전부 mock (`src/mocks/mock-data.js`)

### 역할 / 권한
- `admin` — 전체 권한
- `internal` — 저장소 생성 요청 가능
- `external` — 저장소 생성 불가, 보안/운영/감사 일부 제한

### AntD 사용 원칙
- **List 컴포넌트 사용 금지** → `Card + Flex/Space`, `Table`, `Timeline`, `Descriptions` 대체
- inline style 금지 → CSS class 또는 AntD token
- raw `<div>`, `<button>`, `<br />` 최소화 → `Flex`, `Space`, `Fragment`, AntD `Button`

### Git 원칙
- **수정 즉시 commit + push origin main** (별도 요청 불필요)
- destructive 명령(reset --hard, push --force) 사용 금지
- push 전: `npm run lint && npm run build` 확인

### UX Writing
- 설명 문구: `~해요` 체 (예: "관리해요.", "확인할 수 있어요.")
- 버튼: `추가 / 수정 / 삭제 / 저장 / 설정하기 / 자세히 보기`

---

*작성: Claude (2026-05-29 세션)*  
*참조 원본: `/Users/hddn2/Desktop/Gitddn 깃든/GITDDN_HANDOFF_FINAL.md`*
