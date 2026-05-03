import { createTheme } from '@mui/material/styles'

export const miniProjectTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0',
      dark: '#0d47a1',
      light: '#42a5f5',
    },
    secondary: {
      main: '#00838f',
    },
    background: {
      default: '#e3f2fd',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", system-ui, "Segoe UI", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
  },
})
