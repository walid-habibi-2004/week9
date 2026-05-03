import MenuIcon from '@mui/icons-material/Menu'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState, type ReactNode } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Weather', to: '/' },
  { label: 'Favorites', to: '/favorites' },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const drawer = (
    <Box sx={{ width: 240, pt: 1 }} role="presentation">
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={RouterLink}
            to={item.to}
            selected={location.pathname === item.to}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar position="sticky" elevation={1} color="primary">
        <Toolbar sx={{ gap: 1, flexWrap: 'wrap', py: 1 }}>
          {!isSmUp && (
            <IconButton
              color="inherit"
              edge="start"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <WbSunnyIcon sx={{ opacity: 0.95 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: isSmUp ? 1 : 0,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            Herolo Weather
          </Typography>

          {isSmUp && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Typography
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 1,
                    textDecoration: 'none',
                    color: 'inherit',
                    bgcolor:
                      location.pathname === item.to
                        ? 'rgba(255,255,255,0.18)'
                        : 'transparent',
                    fontWeight: location.pathname === item.to ? 700 : 500,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Toolbar />
        <Divider />
        {drawer}
      </Drawer>

      <Container
        component="main"
        maxWidth="md"
        sx={{
          py: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 3 },
          flex: 1,
        }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: 'center',
          color: 'text.secondary',
          typography: 'caption',
        }}
      >
        Weather data from Open-Meteo · Favorites stored locally
      </Box>
    </Box>
  )
}
