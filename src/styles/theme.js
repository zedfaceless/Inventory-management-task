import { createTheme } from '@mui/material/styles';

// Light theme (eco-friendly green)
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
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

// Dark theme (eco-friendly dark)
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66BB6A', // Lighter green for dark mode
      light: '#81C784',
      dark: '#4CAF50',
    },
    secondary: {
      main: '#81C784',
      light: '#A5D6A7',
      dark: '#66BB6A',
    },
    success: {
      main: '#66BB6A',
    },
    warning: {
      main: '#FFB74D',
    },
    error: {
      main: '#EF5350',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E8F5E9',
      secondary: '#A5D6A7',
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
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Keep the old export for backward compatibility
export const theme = lightTheme;