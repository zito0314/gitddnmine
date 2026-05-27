# Ant Design Token Refactor Prompt

아래 프롬프트는 다른 AI에게 그대로 전달해서 사용할 수 있습니다.

```md
이 프로젝트는 React + Ant Design 기반의 gitddn 데모 사이트입니다.

목표:
현재 UI에서 Ant Design 컴포넌트를 사용하고 있더라도, CSS로 Ant Design의 기본 상태/토큰 값을 과하게 덮어쓴 영역을 정리해주세요.
커스텀 UI 구조가 필요한 경우는 유지하되, Ant Design이 제공하는 component token / theme token / CSS variable 흐름을 최대한 살려주세요.

핵심 원칙:
1. Ant Design 컴포넌트가 제공하는 상태값은 CSS에서 직접 덮어쓰지 말고 Ant Design token으로 제어합니다.
2. hover, active, selected, disabled, borderRadius, itemHeight, color, background 같은 값은 가능한 `ConfigProvider theme.components` 또는 전역 theme token을 통해 전달합니다.
3. CSS는 레이아웃 보정, spacing 보정, overflow 처리, min-width, flex 정렬 같은 최소 역할만 담당하게 합니다.
4. 이미 존재하는 CSS variable은 유지하되, Ant token에 연결하는 방식으로 사용합니다.
5. 하드코딩 색상은 줄이고 `--gitddn-*` CSS variable 또는 Ant token을 우선 사용합니다.
6. Ant Design으로 충분히 가능한 UI는 순수 div/button/input/table/card 형태로 직접 만들지 않습니다.
7. 커스텀 UI가 꼭 필요한 경우 `src/components/custom/`에 분리하고, 내부는 가능한 Ant 컴포넌트를 조합합니다.

우선 점검할 영역:
- Button
- Card
- Tabs
- Table
- List
- Tag
- Badge
- Input / AutoComplete
- Dropdown
- Breadcrumb
- Avatar
- Drawer / Modal
- Layout / Sider / Header
- Menu

작업 방식:
1. `src/index.css`에서 `.ant-*` 셀렉터를 직접 덮어쓰는 부분을 찾습니다.
2. 해당 스타일이 Ant Design token으로 표현 가능한지 확인합니다.
3. 가능한 경우 CSS override를 제거하고 `ConfigProvider theme.components` 또는 기존 theme token 구조로 이동합니다.
4. 특정 컴포넌트에만 필요한 token이면 해당 컴포넌트 근처에 scoped `ConfigProvider`를 둡니다.
5. 전체 앱에 공통 적용되는 token이면 theme 생성 로직에 반영합니다.
6. CSS에 남겨야 하는 것은 레이아웃/overflow/spacing 중심으로 최소화합니다.
7. 기존 화면 구조, 라우터, mock-data 구조는 바꾸지 않습니다.
8. 기능을 새로 만들거나 제거하지 않습니다.

예시:
현재 Sidebar GNB는 Ant `Menu`를 사용하지만 CSS에서 `.ant-menu-item:hover`, `.ant-menu-item-selected` 등을 직접 지정하고 있었습니다.
이런 경우 CSS override 대신 아래처럼 Ant Menu token으로 연결합니다.

```jsx
const sidebarMenuTheme = {
  components: {
    Menu: {
      itemBg: 'transparent',
      itemColor: 'var(--gitddn-sidebar-text)',
      itemHoverBg: 'var(--gitddn-sidebar-hover-bg)',
      itemHoverColor: 'var(--gitddn-sidebar-hover-text)',
      itemSelectedBg: 'var(--gitddn-sidebar-selected-bg)',
      itemSelectedColor: 'var(--gitddn-sidebar-selected-text)',
      itemHeight: 40,
      itemBorderRadius: 8,
      itemMarginBlock: 4,
      itemMarginInline: 8,
    },
  },
}
```

그리고 컴포넌트는 이렇게 감쌉니다.

```jsx
<ConfigProvider theme={sidebarMenuTheme}>
  <Menu items={items} selectedKeys={selectedKeys} />
</ConfigProvider>
```

이때 CSS에는 아래 같은 최소 보정만 남깁니다.

```css
.app-sidebar .ant-menu {
  background: transparent;
  border-inline-end: 0;
}

.app-sidebar .ant-menu .ant-menu-item-selected {
  font-weight: 650;
}
```

특히 피해야 할 CSS:

```css
.ant-btn:hover { ... }
.ant-card { ... }
.ant-menu-item:hover { ... }
.ant-menu-item-selected { background: ...; color: ...; }
.ant-tabs-tab-active { ... }
.ant-table-thead > tr > th { ... }
```

대신 선호하는 방식:

```jsx
<ConfigProvider
  theme={{
    components: {
      Button: { borderRadius: 8 },
      Card: { borderRadiusLG: 12 },
      Tabs: { itemSelectedColor: 'var(--gitddn-primary)' },
      Table: { headerBg: 'var(--gitddn-surface)' },
    },
  }}
>
  ...
</ConfigProvider>
```

검증:
작업 후 반드시 아래 명령을 실행합니다.

```bash
cd react-app
npm run lint
npm run build
```

완료 요약에 포함할 내용:
- 어떤 Ant 컴포넌트의 CSS override를 token으로 옮겼는지
- 어떤 CSS override는 레이아웃 보정으로 남겼는지
- 새로 추가한 scoped ConfigProvider가 있다면 위치와 이유
- runtime design token / CSS variable 호환을 어떻게 유지했는지
- lint/build 결과
```
