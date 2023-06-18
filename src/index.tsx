import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store.tsx';
import './index.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    primaryFont: React.CSSProperties;
    secondaryFont: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    primaryFont?: React.CSSProperties;
    secondaryFont?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    primaryFont: true;
    secondaryFont: true;
    // h3: false;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 550,
      md: 850,
      lg: 1050,
      xl: 1300,
    },
  },
  typography: {
    primaryFont: {
      fontFamily: 'Nunito',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '20px',
      color: '#172029',
    },
    secondaryFont: {
      fontFamily: 'Nunito',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '20px',
      color: '#808080',
    },
  },
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
  // spacing: 1,
  palette: {
    primary: {
      main: '#0073E6',
      light: '#99C7F5',
      dark: '#0073E6',
    },
  },

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
    // MuiTypography: {
    //   defaultProps: {
    //     variantMapping: {
    //       // Map the new variant to render a <p> by default
    //       primaryFont: 'p',
    //     },
    //   },
    // },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
