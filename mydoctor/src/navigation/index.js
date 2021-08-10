import React from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import store from '../store/storeconfig';
import { Provider as StoreProvider } from 'react-redux'

const configFonts = {
    android: {
        regular: {
            fontFamily: 'Oxygen-Bold',
            fontWeight: 'normal'
        },
        medium: {
            fontFamily: 'Oxygen-Regular',
            fontWeight: 'normal'
        },
        light: {
            fontFamily: 'Oxygen-Light',
            fontWeight: '300'
        }
    }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#383DC4',
    accent: '#f1c40f',
  },
  fonts: configureFonts(configFonts)
};
/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PaperProvider>
    </StoreProvider>
  );
}