import React, { useState, createContext, useEffect, useContext } from 'react';
import { isDevelopment } from '../../utils/env';
import { AuthenticationContext } from '../authentication/authentication.context';

import { driveImagesRequest, driveImagesTransform } from './driveImages.service';

export const DriveImagesContext = createContext();

export const DriveImagesContextProvider = ({ children }) => {
  const [driveImages, setDriveImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useContext(AuthenticationContext);

  const retrieveDriveImages = user => {
    console.log('retrieveDriveImages...');
    if (!user?.uid && !isDevelopment) {
      return;
    }
    // initialize variables
    setIsLoading(true);
    setDriveImages([]);
    setError(null);
    // make request
    driveImagesRequest(user?.uid)
      .then(results => driveImagesTransform({ results }))
      .then(results => {
        console.log({ transformedFetch: results.map(x => x.name) });
        setIsLoading(false);
        setDriveImages(results);
      })
      .catch(err => {
        console.error('Error fetching the data', err);
        setIsLoading(false);
        setError(err);
      });
  };
  useEffect(() => {
    if (isAuthenticated) {
      retrieveDriveImages(user);
    }
  }, []);

  return (
    <DriveImagesContext.Provider
      value={{
        driveImages,
        isLoading,
        error,
      }}
    >
      {children}
    </DriveImagesContext.Provider>
  );
};
