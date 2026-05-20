import mockData from '../mocks/mock-data'

const clone = (value) => structuredClone(value)

export function getMockData() {
  return clone(mockData)
}

export function getMockSlice(selector, fallback = null) {
  const value = selector(mockData)
  return clone(value ?? fallback)
}

export function findById(items, id) {
  return items.find((item) => String(item.id) === String(id))
}
