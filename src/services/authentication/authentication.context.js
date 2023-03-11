import React, { useState, createContext } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { isDevelopment } from '../../utils/env';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ app, auth, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    console.log('Logging in');
    setIsLoading(true);
    // cleaning
    email = `${email || ''}`.trim().toLowerCase();
    password = `${password || ''}`;
    // dev
    if (isDevelopment) {
      setUser({ email, userId: 'asdfasdf' });
      setTimeout(() => console.log('waiting...'), 2000);
      setIsLoading(false);
    }
    // prod
    else {
      console.log('Logging in with email and password');
      // validate
      if (!email || !password || email === '' || password === '') {
        setError('Email and password cannot not be blank');
        setIsLoading(false);
        return;
      }
      let { ALLOWED_EMAILS } = process.env;
      ALLOWED_EMAILS = Array.isArray(ALLOWED_EMAILS)
        ? ALLOWED_EMAILS
        : typeof ALLOWED_EMAILS === 'string'
        ? ALLOWED_EMAILS.split(',')
        : undefined;
      if (ALLOWED_EMAILS && !ALLOWED_EMAILS?.includes(email)) {
        setError('Email address not authorised');
        setIsLoading(false);
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then(u => {
          const { user } = u;
          console.log({
            signInWithEmailAndPassword: {
              operationType: u.operationType,
              provider: u.providerId,
              user: {
                email: user.email,
                // uid: user.uid,
                displayName: user.displayName,
              },
            },
          });
          setUser(user);
          setTimeout(() => setIsLoading(false), 2000);
        })
        .catch(e => {
          console.error('Error logging in \n' + JSON.stringify(e));
          setIsLoading(false);
          setError(e.toString());
        });
    }
  };

  const onLogout = () => {
    setIsLoading(true);
    console.log('Logging out');
    if (isDevelopment) {
      setUser(null);
      setError(null);
    } else {
      // talk to firebase
      const auth = getAuth();
      signOut(auth).then(() => {
        setUser(null);
        setError(null);
      });
    }
    setIsLoading(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        app,
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onLogout,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
