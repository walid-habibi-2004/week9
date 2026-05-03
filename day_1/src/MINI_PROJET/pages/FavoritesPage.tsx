import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
          Favorites
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Saved cities stay on this device (localStorage).
        </Typography>
      </Box>

      {favorites.length === 0 ? (
        <Card variant="outlined">
          <CardContent sx={{ py: 5 }}>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
              No favorites yet. Add cities from the Weather page.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          {favorites.map((city) => (
            <Card
              key={city.id}
              variant="outlined"
              sx={{ height: '100%', bgcolor: 'background.paper' }}
            >
              <CardContent>
                <Typography variant="h6" component="h2">
                  {city.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {[city.country, city.admin1].filter(Boolean).join(' · ')}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ mt: 1, display: 'block' }}
                  color="text.secondary"
                >
                  {city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<OpenInNewIcon />}
                  onClick={() => navigate(`/?fav=${city.id}`)}
                >
                  View weather
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  onClick={() => removeFavorite(city.id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
