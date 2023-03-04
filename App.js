import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { theme } from './src/infrastructure/theme';
import { Navigation } from './src/infrastructure/navigation';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { isDevelopment, env } from './src/utils/env';

console.log({ isDevelopment });

let app;
let auth;

if (!isDevelopment) {
  app = initializeApp(env.firebaseConfig);
  auth = getAuth(app);
}

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider app={app} auth={auth}>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
