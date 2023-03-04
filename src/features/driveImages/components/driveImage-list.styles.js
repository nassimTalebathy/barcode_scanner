import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Button } from 'react-native-paper';
// import { theme } from
import { theme } from '../../../infrastructure/theme';

export const DriveImageList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const OrderButton = styled(Button).attrs({
  color: theme.colors.brand.primary,
})`
  padding: ${props => props.theme.space[2]};
  width: 80%;
  align-self: center;
`;
