# GITDDN 작업 요약 및 컨텍스트 정리

작성일: 2026-05-29
대상 저장소: `zito0314/gitddnmine`
작업 브랜치: `main`
원격 저장소: `https://github.com/zito0314/gitddnmine.git`

## 오늘 한 일 요약

### 1. MR 관련 화면 정리

- MR 생성 화면에서 card 내부에 있던 섹션 구조를 바깥으로 빼고, 저장소 생성 요청 화면과 같은 공통 섹션 규칙을 적용하는 방향으로 정리했다.
- 공통 섹션 규칙:
  - 섹션 타이틀은 Ant Design `Typography.Title` 사용
  - `level={5}` 사용
  - 섹션 설명은 `Typography.Text type="secondary"` 사용
  - 타이틀과 설명 간격은 CSS 대신 `Flex vertical gap={4}` 사용
- MR 대시보드 화면은 저장소 목록 화면과 같은 탭/필터/목록 흐름을 기준으로 구조를 맞추는 방향으로 작업했다.
- MR 목록 데이터는 컴포넌트 내부 데모 배열 대신 mock-data 기반으로 연결하는 원칙을 유지했다.

### 2. Pipeline 목록 화면 구현

- `Pipeline` 목록 화면을 단순 테이블이 아니라 실행 이력을 빠르게 스캔하는 화면으로 재구성했다.
- 주요 구성:
  - 상단 헤더
  - 상태 Tabs: 전체, Running, Failed, Finished
  - Repository Select + Search 필터
  - Pipeline row 형태의 실행 이력 목록
  - Stage/Job 상태 아이콘 흐름
  - 실행/취소 버튼
  - Pagination
- Pipeline 데이터와 Stage/Job 데이터는 `react-app/src/mocks/mock-data.js` 기반으로 확장/연결했다.
- Ant Design `List`는 사용하지 않고, `Flex`, `Card`, `Tag`, `Tooltip`, `Avatar`, `Pagination` 등을 사용했다.

### 3. Repository 상세 > Tags 화면 구현

- Repository 상세 컨텍스트 안에서 접근 가능한 `Tags` 화면을 구현했다.
- 주요 구성:
  - 페이지 헤더: Tags / 배포 기준 태그와 릴리즈 이력을 확인합니다.
  - Tag 생성 버튼
  - More Dropdown: Release 생성, Tag 보호 정책 보기, Tag 목록 Export
  - 상태 필터: 전체, Protected, Release
  - Repository Select, Search, Sort
  - Card 내부 row 기반 Tags 목록
  - Empty 상태
  - Pagination
- Tags 데이터는 mock-data에 추가하고 조회 함수로 연결했다.
- 권한 조건:
  - admin/internal: 생성 및 주요 액션 노출
  - external: 조회 중심, 삭제/보호정책 관련 액션 숨김

### 4. Push 알림과 MR 생성 연결

- “새로운 Branch에서 Push가 있었고 MR 생성이 가능한 상태”를 안내하는 알림의 의도를 정리했다.
- 알림의 Repository/Branch 데이터가 가짜처럼 보이지 않도록 mock-data를 정리하고, MR 생성 버튼 클릭 시 관련 정보가 미리 입력/선택된 MR 생성 화면으로 이어지는 방향으로 맞췄다.
- 알림의 의미:
  - 새로운 Branch push 감지
  - 해당 Branch 기준으로 바로 MR을 생성할 수 있도록 안내
  - Repository, sourceBranch, targetBranch, 작성자, push 시간 등이 서로 맞아야 함

### 5. 메인 홈 CardAdvance 적용 점검

- 메인 홈 화면의 특정 `ant-space` 영역에 `CardAdvance` 컴포넌트를 사용할 수 있는지 확인했다.
- 이후 관련 변경이 적용되지 않았다는 피드백을 받고 재확인했다.

### 6. 저장소 목록 Tabs 확인

- 저장소 목록 화면의 Tabs가 Ant Design Tabs를 제대로 사용하고 있는지 확인했다.
- 저장소 목록의 구조 기준:
  - Ant Design Tabs 사용
  - 탭 항목: 전체, 승인대기, 승인완료, 승인반려, 요청취소
  - 필터바와 목록 영역은 Card로 과도하게 감싸지 않는 방향

### 7. 보안(Security Validation) 목록 화면 구현 및 정리

- GNB 보안 메뉴 `/security`와 Repository 상세 내 보안 메뉴 `/repositories/:repositoryId/security`를 구현/정렬했다.
- 주요 구성:
  - 페이지 헤더
  - 요약 카드
  - 경고 Alert
  - 검증 유형 Tabs
  - 필터바
  - Ant Design Table 기반 보안 검증 목록
- Table 컬럼 기준:
  - GNB 보안: 보안 ID, 저장소, Merge Request, 검증 상태, 정책 판정, 취약점, 담당자, 최근 점검
  - 저장소 내 보안: 저장소 열 제거, Repository 상세 컨텍스트에 맞게 구성
- 보안 데이터는 `mock-data.js`의 Security Validation 데이터를 기반으로 연결했다.
- `getSecurityValidations()`, `getSecurityValidationsByRepository()`, `getSecurityValidationSummary()` 계열 API를 정리했다.
- 저장소 내 보안 화면에서 `저장소` 열만 삭제하는 요청도 반영했다.

### 8. 보안 요약 카드 심각도 기준으로 변경

- 기존 보안 요약 카드:
  - 전체 검증
  - 실패
  - 차단된 MR
  - Critical 이슈
  - 경고
  - 통과
- 변경된 카드:
  - 치명적: NNN
  - 매우 위험: 930
  - 위험: 2001
  - 중간: 203
  - 낮음: 110
  - 매우 낮음: 98
- GNB 보안 화면과 Repository 상세 내 보안 화면 양쪽에 동일하게 적용했다.
- 새 공통 컴포넌트:
  - `react-app/src/components/common/SecuritySeverityCards.jsx`
- mock-data 확장:
  - `security.severitySummary`
- API 추가:
  - `getSecuritySeveritySummary(repositoryId)`
- 브라우저에서 확인한 경로:
  - `/security`
  - `/repositories/mobile-banking-api/security`

### 9. 감사 메뉴 > 감사 로그 탭 화면 구현

- 감사 메뉴를 `감사 로그` / `증적 Export` 탭 구조로 구성했다.
- 이번 작업 범위인 `감사 로그` 탭을 구현했다.
- 주요 구성:
  - 페이지 제목: 감사
  - 설명: 개발 활동, 승인, 보안 검증, 정책 변경 이력을 추적하는 감사 로그 화면
  - CSV 내보내기
  - 새로고침
  - 검색 필터
  - 기간 Quick Filter: 1개월, 3개월, 6개월, 12개월
  - 시작일/종료일 DatePicker
  - 감사 패키지 다운로드
  - Ant Design Table 기반 감사 로그 목록
- mock-data에 `auditLogs`를 추가하고 조회 함수로 연결했다.

### 10. Ant Design raw HTML 정리

- raw HTML `div`, `br` 등을 Ant Design `Flex`, `Space`, `Fragment` 중심으로 정리하는 변경이 있었다.
- 관련 커밋은 원격 main에 merge commit으로 반영되었다.
- 현재 최신 main에는 해당 변경과 보안 카드 변경이 모두 포함되어 있다.

## 주요 커밋

- `d810362a` Merge pull request #20 from zito0314/refactor/antd-raw-html-cleanup
- `8c89312e` Update security severity summary cards
- `ea4aa981` Replace raw HTML div/br with AntD Flex, Space, Fragment
- `24f1b26f` Align security validation screens
- `5632dd18` Implement audit log tab screen
- `c07f9f85` Implement repository security validation list
- `87563e6b` Render repository tabs with tab pane content
- `29b81d0e` Apply advanced card to dashboard AI panel
- `c5712b92` Replace all remaining AntD List usages with Card+Flex/Space/Timeline

## 현재 Git 상태

- 현재 브랜치: `main`
- 현재 HEAD: `d810362a`
- `origin/main`과 동기화 완료
- 마지막 확인 시 `git push origin main` 결과: `Everything up-to-date`
- 작업 중 남아 있는 미추적 파일:
  - `docs/GITDDN_CODEX_CONTEXT_2026-05-29.md`
- 위 미추적 파일은 기존에 있던 컨텍스트 문서로, 이번 새 문서 작업 전에는 커밋하지 않은 상태였다.

## 검증 기록

최근 변경에서 반복 확인한 항목:

- `npm run lint`
  - 통과
- `npm run build`
  - 통과
  - Vite chunk size warning은 기존 경고로 보이며 빌드 실패는 아님
- 브라우저 확인:
  - `/security`
  - `/repositories/mobile-banking-api/security`
  - 두 화면 모두 심각도 카드 노출 확인
  - 기존 `전체 검증` 요약 카드 문구가 사라진 것 확인

## 프로젝트 작업 원칙

앞으로도 유지해야 하는 규칙:

- 사용자는 한국어 응답을 선호한다.
- 작업 후 기본적으로 `main`에 커밋/푸시한다.
- GitHub 원격은 `https://github.com/zito0314/gitddnmine.git`.
- Ant Design 컴포넌트를 우선 사용한다.
- Ant Design `List` 컴포넌트는 신규 목록 구현에 사용하지 않는다.
- 첨부 이미지는 시각 스타일 복제가 아니라 구조, 정보 배치, UX 흐름 참고용이다.
- 색상, 그림자, border, radius, spacing을 이미지처럼 억지로 맞추지 않는다.
- 커스텀 CSS는 레이아웃, 간격, 정렬, 반응형 보정에 필요한 최소 범위로만 작성한다.
- 인라인 style은 지양하고 className + CSS로 정리한다.
- 화면용 데모 배열을 컴포넌트 내부에 직접 선언하지 않는다.
- 데이터는 `react-app/src/mocks/mock-data.js`를 우선 확장하고 API 함수로 연결한다.
- Git 관련 용어는 영어 유지:
  - Repository
  - Merge Request
  - MR
  - Branch
  - Commit
  - Pipeline
  - Job
  - Security Validation
  - Tag
  - Release
- 일반 UI 문구는 자연스러운 한국어를 사용한다.
- 기존 라우팅, 레이아웃, 권한 구조, Sidebar 구조를 깨지 않는다.
- admin/internal/external 역할 조건은 기존 유틸이나 AuthContext 기준을 우선 따른다.

## 공통 섹션 규칙

MR 생성, 저장소 생성 요청 등 폼/요청 화면에서 사용할 공통 섹션 규칙:

- 섹션 타이틀:
  - Ant Design `Typography.Title`
  - `level={5}`
- 섹션 설명:
  - Ant Design `Typography.Text`
  - `type="secondary"`
  - 타이틀 바로 아래 배치
- 타이틀과 설명 사이 간격:
  - CSS margin이 아니라 `Flex vertical gap={4}` 사용

예시 섹션명:

- 요청 정보
- 기본 정보
- 멤버
- 프로젝트 템플릿

## 주요 화면별 현재 컨텍스트

### MR 대시보드

- 상단 타이틀 영역은 이미 공통으로 잡힌 영역이므로 건드리지 않는 것이 원칙이다.
- 카드는 무조건 감싸는 구조보다 저장소 목록과 유사한 탭/필터/목록 흐름을 선호한다.
- MR 목록 데이터는 mock-data의 Merge Request 관련 데이터를 사용해야 한다.
- `getMergeRequests()`, `getMergeRequestById()`, repositories, users, pipeline/security/approval 관련 mock 데이터가 있으면 재사용한다.

### Pipeline 목록

- 목적은 Pipeline 실행 상태, 실패 Job, 실행 이력을 빠르게 확인하는 것이다.
- 상태 탭:
  - 전체
  - Running
  - Failed
  - Finished
- 필터:
  - 전체 저장소
  - 저장소명, 프로젝트명, 담당 조직 검색
- 목록은 Table보다 row 기반 실행 이력 UI로 구성한다.
- Stage/Job 상태 아이콘에는 Tooltip을 붙인다.

### Repository Tags

- Repository 상세 Sidebar 안에서 접근 가능한 Tags 메뉴이다.
- 목적은 배포 기준 Tag와 Release 이력 확인이다.
- 필터:
  - 전체 / Protected / Release
  - Repository
  - 검색
  - 정렬
- 목록은 큰 Card 안의 row 구조다.
- Empty 상태와 Pagination을 제공한다.

### Security Validation

- GNB 보안과 Repository 상세 보안 두 화면이 있다.
- 두 화면 모두 같은 보안 검증 데이터를 사용하되, Repository 상세 화면은 현재 저장소 컨텍스트에 맞춰 저장소 열을 제거한다.
- 현재 카드 영역은 심각도 카드 기준이다.
- 검증 유형 Tabs:
  - 전체
  - 정적 분석
  - 동적 분석
  - 오픈소스 분석
  - 컨테이너 검사
  - 시크릿 검사
- 필터:
  - Repository
  - 검색
  - 검증 상태
  - 담당자
  - Tool
- Table은 Ant Design Table 사용.

### Audit

- 감사 메뉴는 `감사 로그`와 `증적 Export` 탭으로 구성한다.
- 감사 로그 탭은 mock-data 기반 Table로 구성한다.
- 검색, 기간 Quick Filter, 시작일/종료일, 감사 패키지 다운로드를 제공한다.

## 배포 및 Vercel 관련 메모

- GitHub `origin/main`에 푸시되어도 Vercel 화면이 즉시 바뀌지 않는 경우가 있었다.
- 확인해야 할 가능성:
  - Vercel이 다른 브랜치를 보고 있음
  - 배포가 실패했거나 대기 중임
  - 캐시 또는 이전 빌드가 노출 중임
  - GitHub에는 올라갔지만 Vercel 프로젝트 연결 저장소/브랜치가 다름
- 코드 기준으로는 `origin/main`에 정상 반영된 상태를 `git push origin main`과 로그로 확인했다.

## 다음 작업 시 주의

- 원격 main에 다른 merge가 자주 들어올 수 있으므로 작업 전 `git fetch origin main` 후 현재 상태를 확인한다.
- push가 reject되면 force push하지 말고 `git pull --rebase origin main` 또는 fast-forward 가능 여부를 확인한다.
- 사용자가 “적용이 안 됐다”고 하면 먼저 다음을 확인한다:
  - 로컬 main과 origin/main 동기화 여부
  - Vercel이 바라보는 브랜치
  - 실제 화면 라우트가 요청한 화면인지
  - 브라우저 캐시/배포 캐시
- 기존 미추적 문서 파일은 사용자가 명시하지 않으면 임의로 삭제하거나 덮어쓰지 않는다.
