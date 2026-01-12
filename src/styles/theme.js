import { createTheme } from '@mui/material/styles';

// Eco-friendly color palette
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Forest green
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#66BB6A', // Light green
      light: '#81C784',
      dark: '#388E3C',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FFA726',
    },
    error: {
      main: '#EF5350',
    },
    background: {
      default: '#F1F8F4', // Very light green
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1B5E20',
      secondary: '#558B2F',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(46, 125, 50, 0.08)',
        },
      },
    },
  },
});

