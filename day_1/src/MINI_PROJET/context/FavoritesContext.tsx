/* eslint-disable react-refresh/only-export-components -- provider + hook pattern */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { GeocodeCity } from '../api/openMeteo'

export type FavoriteCity = GeocodeCity

const STORAGE_KEY = 'mini-projet-weather-favorites'

function loadFromStorage(): FavoriteCity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (x): x is FavoriteCity =>
        typeof x === 'object' &&
        x !== null &&
        typeof (x as FavoriteCity).id === 'number' &&
        typeof (x as FavoriteCity).name === 'string' &&
        typeof (x as FavoriteCity).latitude === 'number' &&
        typeof (x as FavoriteCity).longitude === 'number',
    )
  } catch {
    return []
  }
}

type FavoritesContextValue = {
  favorites: FavoriteCity[]
  addFavorite: (city: FavoriteCity) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (city: FavoriteCity) => void
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return ctx
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteCity[]>(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = useCallback((city: FavoriteCity) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === city.id)) return prev
      return [...prev, city]
    })
  }, [])

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const isFavorite = useCallback(
    (id: number) => favorites.some((f) => f.id === id),
    [favorites],
  )

  const toggleFavorite = useCallback((city: FavoriteCity) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === city.id)) {
        return prev.filter((f) => f.id !== city.id)
      }
      return [...prev, city]
    })
  }, [])

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    }),
    [
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    ],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
