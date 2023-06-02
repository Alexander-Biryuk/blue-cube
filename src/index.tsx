import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// declare module '@mui/material/styles' {

//   interface Palette {
//     black: Palette['primary'];
//     white: Palette['primary'];
//     // brand: Palette['primary'];
//     // brandLight1: Palette['primary'];
//     // brandLight2: Palette['primary'];
//     // brandLight3: Palette['primary'];
//     // gray: Palette['primary'];
//     // grayLight1: Palette['primary'];
//     // accent: Palette['primary'];
//     // focus: Palette['primary'];
//   }

//   interface PaletteOptions {
//     black: Palette['primary'];
//     white: Palette['primary'];
//     // brand: Palette['primary'];
//     // brandLight1: Palette['primary'];
//     // brandLight2: Palette['primary'];
//     // brandLight3: Palette['primary'];
//     // gray: Palette['primary'];
//     // grayLight1: Palette['primary'];
//     // accent: Palette['primary'];
//     // focus: Palette['primary'];
//   }

// }

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#61dafb',
  //   },
  //   secondary: {
  //     main: '#da61bf',
  //   },
  //   black: {
  //     main: '#172029',
  //     contrastText: '#fff',
  //     white: '#fff',
  //   },
  // white: {
  //   main: '#fff',
  // },
  // brand: {
  //   main: '#0073E6',
  // },
  // brandLight1: {
  //   main: '#99C7F5',
  // },
  // brandLight2: {
  //   main: '#E6F1FC',
  // },
  // brandLight3: {
  //   main: '#F2F6FA',
  // },
  // grey: {
  //   main: '#808080',
  // },
  // greyLight1: {
  //   main: '#F2F2F2',
  // },
  // accent: {
  //   main: '#FABC22',
  // },
  // focus: {
  //   main: '#ED2C19',
  // },
  // },
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: '0s',
          backgroundColor: '#fff',
          boxShadow: 'none',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
