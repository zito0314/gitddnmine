import { Avatar } from 'antd'
import { getRepositoryThumbnail } from '../../utils/repositoryThumbnail'

function RepositoryAvatar({ repository, className, size = 40, shape = 'square' }) {
  const thumbnail = getRepositoryThumbnail(repository)

  return (
    <Avatar
      shape={shape}
      size={size}
      className={className ? `repository-avatar ${className}` : 'repository-avatar'}
      style={{
        backgroundColor: thumbnail.background,
        color: thumbnail.color,
      }}
    >
      {thumbnail.initials}
    </Avatar>
  )
}

export default RepositoryAvatar
