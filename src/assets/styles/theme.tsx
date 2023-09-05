'use client';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F4ADA',
    },
    secondary: {
      main: '#375ADA',
    },
    background: {
      // rgba(55, 90, 218, 0.4)
      default: '#EAEDFB',
      paper: 'rgba(255,255,255,0.95)',
    },
    text: {
      primary: '#000',
      secondary: '#4D4D4D',
    },
    error: {
      main: '#d0021b',
    },
    warning: {
      main: '#fd7e14',
    },
  },

  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#6D6D6D',
          '&.Mui-checked': {
            color: '#375ADA',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: '#375ADA',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: 42,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          background: 'white',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { shrink: true },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: 42,
        },
      },
    },
  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      color: '#375ADA',
      fontSize: 44,
      lineHeight: '44px',
    },
    h2: {
      color: '#375ADA',
      fontSize: 36,
      lineHeight: '36px',
      fontWeight: 'lighter',
    },
    h3: {
      color: '#375ADA',
      fontSize: 22,
      lineHeight: '24px',
      fontWeight: 'bold',
    },
    h4: {
      color: '#375ADA',
      fontSize: 16,
      lineHeight: '18px',
      fontWeight: 'bold',
    },
    subtitle1: {
      color: '#000',
      fontSize: 20,
      lineHeight: '30px',
      fontWeight: 'normal',
    },
    subtitle2: {
      color: '#000',
      fontSize: 13,
      lineHeight: '16px',
      fontWeight: 'normal',
    },
    body1: {
      fontSize: 16,
      color: '#000',
      lineHeight: '16px',
      fontWeight: 'normal',
    },
    body2: {
      fontSize: 14,
      color: '#000',
      lineHeight: '14px',
      fontWeight: 'normal',
    },
  },
});

export default theme;
