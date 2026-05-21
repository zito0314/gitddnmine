import { useCallback, useEffect, useState } from 'react'
import {
  getRepositoryFavorites,
  REPOSITORY_FAVORITES_EVENT,
  toggleRepositoryFavorite,
} from '../utils/favorites'

export default function useRepositoryFavorites() {
  const [favorites, setFavorites] = useState(() => getRepositoryFavorites())

  useEffect(() => {
    const syncFavorites = () => setFavorites(getRepositoryFavorites())
    window.addEventListener('storage', syncFavorites)
    window.addEventListener(REPOSITORY_FAVORITES_EVENT, syncFavorites)

    return () => {
      window.removeEventListener('storage', syncFavorites)
      window.removeEventListener(REPOSITORY_FAVORITES_EVENT, syncFavorites)
    }
  }, [])

  const toggleFavorite = useCallback((repositoryId, fallback) => {
    setFavorites(toggleRepositoryFavorite(repositoryId, fallback))
  }, [])

  return { favorites, toggleFavorite }
}
