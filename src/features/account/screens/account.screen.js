import React from 'react';
import { Spacer } from '../../../components/spacer/spacer.component';
import { AccountBackground, AccountContainer, AccountCover, AuthButton, Title } from '../components/account.styles';

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Barcode Scanner</Title>
      <AccountContainer>
        <AuthButton icon="lock-open-outline" mode="contained" onPress={() => navigation.navigate('Login')}>
          Login
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
};
