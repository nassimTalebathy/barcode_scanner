import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";

import {
  DriveImageCard,
  DriveImageCardCover,
  Info,
} from "./driveImage-info-card.styles";

export const DriveImageInfoCard = ({ driveImage = {} }) => {
  const {
    name = "Some DriveImage",
    path = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    fullPath = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
  } = driveImage;
  // console.log({ driveImage })

  const handleClick = () => {
    alert(`Name: \n${name}\nURL: \n${path}`);
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <DriveImageCard elevation={5}>
        <DriveImageCardCover key={name} source={{ uri: path }} />
        <Info>
          <Text variant="label">{name}</Text>
        </Info>
      </DriveImageCard>
    </TouchableOpacity>
  );
};
