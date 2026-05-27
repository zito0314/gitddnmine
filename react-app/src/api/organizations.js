import { UI_TEXT } from '../constants'
import { getMockSlice } from './mockClient'

const ORGANIZATION_LIST_STORAGE_KEY = 'gitddn.organizations'
export const ORGANIZATION_CHANGED_EVENT = 'gitddn:organizations-changed'

function readStoredOrganizations() {
  try {
    const stored = window.localStorage.getItem(ORGANIZATION_LIST_STORAGE_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function normalizeOrganization(organization) {
  return {
    key: String(organization.key ?? '').trim(),
    label: String(organization.label ?? '').trim(),
    description: String(organization.description ?? '').trim(),
    active: organization.active !== false,
  }
}

export function getDefaultOrganizations() {
  return getMockSlice((data) => data.organizations, []).map(normalizeOrganization)
}

export function getManagedOrganizations({ includeInactive = false } = {}) {
  const organizations = (readStoredOrganizations() ?? getDefaultOrganizations()).map(normalizeOrganization)

  if (includeInactive) return organizations

  return organizations.filter((organization) => organization.active)
}

export function saveManagedOrganizations(organizations) {
  const normalizedOrganizations = organizations
    .map(normalizeOrganization)
    .filter((organization) => organization.key && organization.label)

  window.localStorage.setItem(ORGANIZATION_LIST_STORAGE_KEY, JSON.stringify(normalizedOrganizations))

  const selectedKey = window.localStorage.getItem(UI_TEXT.organizations.storageKey)
  const selectedOrganization = normalizedOrganizations.find(
    (organization) => organization.key === selectedKey && organization.active,
  )
  const fallbackOrganization = normalizedOrganizations.find((organization) => organization.active)

  if (!selectedOrganization && fallbackOrganization) {
    window.localStorage.setItem(UI_TEXT.organizations.storageKey, fallbackOrganization.key)
  }

  window.dispatchEvent(new CustomEvent(ORGANIZATION_CHANGED_EVENT))

  return normalizedOrganizations
}

export function resetManagedOrganizations() {
  window.localStorage.removeItem(ORGANIZATION_LIST_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent(ORGANIZATION_CHANGED_EVENT))
  return getDefaultOrganizations()
}
