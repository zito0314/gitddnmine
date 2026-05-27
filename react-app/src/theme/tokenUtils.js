const fallbackFontFamily =
  '"Pretendard GOV", "Pretendard", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif'

export function normalizeThemeToken(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { token: {}, components: {} }
  }

  if (input.token || input.components) {
    return {
      token: input.token && typeof input.token === 'object' ? input.token : {},
      components: input.components && typeof input.components === 'object' ? input.components : {},
    }
  }

  return {
    token: input,
    components: {},
  }
}

export function buildAntdTheme(input) {
  const normalized = normalizeThemeToken(input)

  return {
    ...normalized,
    token: {
      ...normalized.token,
      fontFamily: normalized.token.fontFamily || fallbackFontFamily,
      wireframe: false,
    },
  }
}

export function parseThemeJson(value) {
  const parsed = JSON.parse(value)
  return normalizeThemeToken(parsed)
}

export function stringifyThemeJson(theme) {
  return JSON.stringify(normalizeThemeToken(theme), null, 2)
}

export function applyThemeCssVariables(theme) {
  if (typeof document === 'undefined') return

  const token = normalizeThemeToken(theme).token
  const components = normalizeThemeToken(theme).components
  const menu = components.Menu ?? {}
  const layout = components.Layout ?? {}
  const root = document.documentElement
  const bg = token.colorBgLayout || token.colorBgBase
  const border = token.colorBorder || token.colorBorderSecondary
  const radius = token.borderRadius != null ? `${token.borderRadius}px` : undefined

  const variables = {
    '--gitddn-primary': token.colorPrimary,
    '--gitddn-primary-strong': token.colorPrimaryActive || token.colorPrimaryText || token.colorPrimary,
    '--gitddn-primary-soft': token.colorPrimaryBg || token.controlItemBgActive,
    '--gitddn-bg': bg,
    '--gitddn-app-bg': bg,
    '--gitddn-content-bg': bg,
    '--gitddn-surface': token.colorBgContainer || token.colorBgBase,
    '--gitddn-card-bg': token.colorBgContainer,
    '--gitddn-line': border,
    '--gitddn-border-color': menu.colorSplit || border,
    '--gitddn-text': token.colorText,
    '--gitddn-text-primary': token.colorText,
    '--gitddn-muted': token.colorTextSecondary,
    '--gitddn-text-secondary': token.colorTextSecondary,
    '--gitddn-subtle': token.colorTextTertiary || token.colorTextDescription,
    '--gitddn-neutral-10': token['neutral.10'] || menu.groupTitleColor || token.colorTextTertiary || token.colorTextDescription,
    '--gitddn-header-bg': token.colorBgContainer,
    '--gitddn-sidebar-bg': menu.itemBg || layout.lightSiderBg || token.colorBgContainer,
    '--gitddn-sidebar-text': menu.itemColor || token.colorTextSecondary,
    '--gitddn-sidebar-text-active': menu.itemSelectedColor || token.colorText,
    '--gitddn-sidebar-hover-bg': menu.itemHoverBg || token.controlItemBgHover,
    '--gitddn-sidebar-hover-text': menu.itemHoverColor || token.colorText,
    '--gitddn-sidebar-selected-bg': menu.itemSelectedBg || token.controlItemBgActive,
    '--gitddn-sidebar-selected-text': menu.itemSelectedColor || token.colorText,
    '--gitddn-sidebar-submenu-bg': menu.subMenuItemBg || token.colorFillAlter,
    '--gitddn-sidebar-group-text': menu.groupTitleColor || token.colorTextTertiary || token.colorTextDescription,
    '--gitddn-radius': radius,
  }

  Object.entries(variables).forEach(([key, value]) => {
    if (value != null) root.style.setProperty(key, String(value))
  })
}
