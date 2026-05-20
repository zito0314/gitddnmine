import { findById, getMockSlice } from './mockClient'

export function getSecurityValidations() {
  return getMockSlice((data) => data.security.validations, [])
}

export function getSecurityValidationById(securityId) {
  const validations = getSecurityValidations()
  const validation = findById(validations, securityId)

  return validation ?? null
}

export function getSecurityDetail(securityId) {
  return getMockSlice((data) => data.security.detail[securityId], null)
}

export function getVulnerabilities() {
  return getMockSlice((data) => data.security.vulnerabilities, [])
}

export function getSecurityValidationsByRepository(repositoryId) {
  return getSecurityValidations().filter((validation) => validation.repo === repositoryId)
}
