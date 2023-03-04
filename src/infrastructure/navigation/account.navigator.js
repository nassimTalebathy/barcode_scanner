import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from '../../features/account/screens/login.screen';
import { isDevelopment } from '../../utils/env';
import { Text } from 'react-native-paper';

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  const options = { headerRight: () => (isDevelopment ? <Text marginRight="3%">DEV</Text> : undefined) };
  return (
    <Stack.Navigator headerShown={false}>
      {/* <Stack.Screen name="Main" options={options} component={AccountScreen} /> */}
      <Stack.Screen name="Login" options={options} component={LoginScreen} />
    </Stack.Navigator>
  );
};
