import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, MD3Colors } from 'react-native-paper';
import { MdArrowLeft } from 'react-icons/md';

import { FadeInView } from '../../../components/animations/fade.animation';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';

import { DriveImagesContext } from '../../../services/driveImages/driveImages.context';

import { DriveImageInfoCard } from '../components/driveImage-info-card.component';

import { DriveImageList } from '../components/driveImage-list.styles';

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const DriveImagesScreen = () => {
  const { isLoading, driveImages, error: driveImageError } = useContext(DriveImagesContext);
  const hasError = !!driveImageError;

  return (
    <SafeArea>
      <Spacer size="medium"></Spacer>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD3Colors.blue300} />
        </LoadingContainer>
      )}
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the error -{JSON.stringify(driveImageError)}</Text>
        </Spacer>
      )}
      {!hasError && (
        <DriveImageList
          data={driveImages}
          renderItem={({ item }) => {
            return (
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <DriveImageInfoCard driveImage={item} />
                </FadeInView>
              </Spacer>
            );
          }}
          keyExtractor={item => item.name}
        />
      )}
    </SafeArea>
  );
};
