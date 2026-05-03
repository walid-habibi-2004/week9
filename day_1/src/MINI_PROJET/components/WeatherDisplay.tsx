import AirIcon from '@mui/icons-material/Air'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import { Box, Card, CardContent, Chip, Skeleton, Typography } from '@mui/material'
import type { CurrentWeather, GeocodeCity } from '../api/openMeteo'
import { describeWeatherCode } from '../api/openMeteo'

type Props = {
  city: GeocodeCity | null
  weather: CurrentWeather | null
  loading: boolean
  error: string | null
}

export default function WeatherDisplay({
  city,
  weather,
  loading,
  error,
}: Props) {
  if (!city && !loading && !error) {
    return (
      <Card variant="outlined" sx={{ bgcolor: 'background.paper' }}>
        <CardContent sx={{ py: 4 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
            Search for a city to see current weather.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card variant="outlined" sx={{ borderColor: 'error.main', bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography color="error" role="alert">
            {error}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const subtitle = [city?.name, city?.country ?? city?.admin1]
    .filter(Boolean)
    .join(', ')

  return (
    <Card
      elevation={2}
      sx={{
        color: '#fff',
        background: (t) =>
          `linear-gradient(135deg, ${t.palette.primary.dark} 0%, ${t.palette.primary.main} 55%, ${t.palette.secondary.dark} 100%)`,
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {loading || !weather ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            <Skeleton variant="rounded" height={80} sx={{ bgcolor: 'rgba(255,255,255,0.15)' }} />
          </Box>
        ) : (
          <>
            <Typography variant="overline" sx={{ opacity: 0.9 }}>
              Current weather
            </Typography>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
              {subtitle}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: { xs: 'flex-start', sm: 'center' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThermostatIcon fontSize="large" aria-hidden />
                <Typography variant="h3" component="span" sx={{ fontWeight: 700 }}>
                  {Math.round(weather.temperature)}°
                  <Typography component="span" variant="h6" sx={{ ml: 0.5, opacity: 0.85 }}>
                    C
                  </Typography>
                </Typography>
              </Box>
              <Chip
                label={describeWeatherCode(weather.weathercode)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'inherit',
                  fontWeight: 600,
                }}
              />
            </Box>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <AirIcon fontSize="small" aria-hidden />
              <Typography variant="body2" sx={{ opacity: 0.95 }}>
                Wind {Math.round(weather.windspeed)} km/h · direction{' '}
                {weather.winddirection}°
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ mt: 2, display: 'block', opacity: 0.8 }}>
              Observation time: {weather.time}
              {weather.is_day === 0 ? ' · Night' : ' · Day'}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  )
}
