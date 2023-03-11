import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { theme } from './src/infrastructure/theme';
import { Navigation } from './src/infrastructure/navigation';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { isDevelopment } from './src/utils/env';

let firebaseConfig;

if (process.env.FIREBASE_CONFIG_STR) {
  firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG_STR);
} else {
  const env = require('./.env.json');
  firebaseConfig = JSON.parse(env.FIREBASE_CONFIG_STR);
}

let app;
let auth;

if (!isDevelopment) {
  // console.log(process.env);
  // console.log({ env, isDevelopment });
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  app = initializeApp(firebaseConfig);
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
