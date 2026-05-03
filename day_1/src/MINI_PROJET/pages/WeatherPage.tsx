import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { CurrentWeather, GeocodeCity } from '../api/openMeteo'
import { getCurrentWeather, searchCities } from '../api/openMeteo'
import WeatherDisplay from '../components/WeatherDisplay'
import { useFavorites } from '../context/FavoritesContext'

export default function WeatherPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { toggleFavorite, isFavorite, favorites } = useFavorites()

  const favId = searchParams.get('fav')
  const favoriteFromUrl = useMemo(() => {
    if (!favId) return null
    return favorites.find((f) => String(f.id) === favId) ?? null
  }, [favId, favorites])

  const [pickedCity, setPickedCity] = useState<GeocodeCity | null>(null)
  const selected = favoriteFromUrl ?? pickedCity

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeocodeCity[]>([])
  const [searching, setSearching] = useState(false)
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState<string | null>(null)

  /* eslint-disable react-hooks/set-state-in-effect -- sync loading with Open-Meteo fetch lifecycle */
  useEffect(() => {
    if (!selected) return
    let cancelled = false
    setWeatherLoading(true)
    setWeatherError(null)
    getCurrentWeather(selected.latitude, selected.longitude)
      .then((w) => {
        if (!cancelled) setWeather(w)
      })
      .catch(() => {
        if (!cancelled) setWeatherError('Could not load weather. Try again.')
      })
      .finally(() => {
        if (!cancelled) setWeatherLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [selected])
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSearch = async () => {
    const q = query.trim()
    if (!q) {
      setResults([])
      return
    }
    setSearching(true)
    setWeatherError(null)
    try {
      const list = await searchCities(q)
      setResults(list)
      if (list.length === 0) {
        setWeatherError('No cities found. Try another name.')
      }
    } catch {
      setResults([])
      setWeatherError('Search failed. Check your connection.')
    } finally {
      setSearching(false)
    }
  }

  const pickCity = (city: GeocodeCity) => {
    setPickedCity(city)
    setWeatherError(null)
    setResults([])
    setQuery(city.name)
    setSearchParams({}, { replace: true })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
          Weather
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search for a city, view conditions, and save favorites locally.
        </Typography>
      </Box>

      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: 'background.paper' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', sm: 'flex-start' },
          }}
        >
          <TextField
            fullWidth
            label="City name"
            placeholder="e.g. Tunis, Paris, Tokyo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void handleSearch()
            }}
            disabled={searching}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      onClick={() => void handleSearch()}
                      disabled={searching || !query.trim()}
                      aria-label="Search"
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {results.length > 0 && (
          <List dense sx={{ mt: 1, borderTop: 1, borderColor: 'divider', pt: 1 }}>
            {results.map((c) => (
              <ListItemButton key={c.id} onClick={() => pickCity(c)} dense>
                <ListItemText
                  primary={c.name}
                  secondary={[c.country, c.admin1].filter(Boolean).join(' · ')}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>

      <Box sx={{ position: 'relative' }}>
        {selected && (
          <IconButton
            aria-label={isFavorite(selected.id) ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => toggleFavorite(selected)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              bgcolor: 'rgba(255,255,255,0.15)',
              color: '#fff',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.28)' },
            }}
          >
            {isFavorite(selected.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        )}
        <WeatherDisplay
          city={selected}
          weather={weather}
          loading={Boolean(selected && weatherLoading)}
          error={weatherError}
        />
      </Box>
    </Box>
  )
}
