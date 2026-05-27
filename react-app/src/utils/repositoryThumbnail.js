const REPOSITORY_THUMBNAIL_COLORS = [
  { background: '#E8F1FF', color: '#1454B8' },
  { background: '#EAF7F0', color: '#0D7A45' },
  { background: '#FFF4DE', color: '#9A5A00' },
  { background: '#F3EDFF', color: '#5A32B5' },
  { background: '#FFECEE', color: '#B3263A' },
  { background: '#EAF8FA', color: '#0E6F7B' },
  { background: '#F2F4F7', color: '#344054' },
  { background: '#FFF0F6', color: '#A31965' },
]

function hashText(value) {
  return String(value ?? 'repository').split('').reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0
  }, 0)
}

export function getRepositoryInitials(repository) {
  const name = repository?.name ?? repository?.id ?? 'repository'
  const parts = String(name).trim().split(/[-_./\s]+/).filter(Boolean)
  const initials = parts.length > 1
    ? parts.map((part) => part[0]).join('')
    : String(name).slice(0, 2)

  return initials.slice(0, 2).toUpperCase()
}

export function getRepositoryThumbnail(repository) {
  const seed = repository?.id ?? repository?.name ?? 'repository'
  const color = REPOSITORY_THUMBNAIL_COLORS[hashText(seed) % REPOSITORY_THUMBNAIL_COLORS.length]

  return {
    ...color,
    initials: getRepositoryInitials(repository),
  }
}
