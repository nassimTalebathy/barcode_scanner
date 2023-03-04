import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { Text as RNPText } from 'react-native-paper';

import { DriveImageCard, DriveImageCardCover, Info } from './driveImage-info-card.styles';

export const DriveImageInfoCard = ({ driveImage = {} }) => {
  const {
    name = 'Some DriveImage',
    path = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    fullPath = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
  } = driveImage;
  // console.log({ driveImage })

  const handleClick = () => {
    // alert(`Name: \n${name}\nURL: \n${path}`);
  };

  return (
    <DriveImageCard elevation={5}>
      <TouchableOpacity onPress={handleClick}>
        <DriveImageCardCover key={name} source={{ uri: path }} />
      </TouchableOpacity>
      <Info>
        <RNPText style={{ color: 'blue', fontStyle: 'italic' }} onPress={() => Linking.openURL(path)} variant="label">
          {name}
        </RNPText>
      </Info>
    </DriveImageCard>
  );
};
