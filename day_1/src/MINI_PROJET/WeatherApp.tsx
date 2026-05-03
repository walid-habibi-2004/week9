import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import { FavoritesProvider } from './context/FavoritesContext'
import FavoritesPage from './pages/FavoritesPage'
import WeatherPage from './pages/WeatherPage'
import { miniProjectTheme } from './theme'

export function WeatherApp() {
  return (
    <ThemeProvider theme={miniProjectTheme}>
      <CssBaseline />
      <FavoritesProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<WeatherPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </AppLayout>
      </FavoritesProvider>
    </ThemeProvider>
  )
}
