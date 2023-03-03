import React, { useContext } from "react";
import { MdLock } from "react-icons/md";
import { Button } from "react-native";
import { DriveImagesContextProvider } from "../../services/driveImages/driveImages.context";
import { DriveImagesScreen } from "../../features/driveImages/screens/driveImages.screen";
import { BarcodeScannerScreen } from "../../features/barcodeScanner/barcode-scanner.screen";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { IconButton, MD3Colors, Text } from "react-native-paper";
import { SafeArea } from "../../components/utility/safe-area.component";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { onLogout } = useContext(AuthenticationContext);
  const options = {
    headerTitle: (props) => <Text {...props} />,
    headerRight: () => (
      <IconButton
        icon="lock"
        color={MD3Colors.red500}
        size={20}
        onPress={onLogout}
      >
        Log out <MdLock />{" "}
      </IconButton>
    ),
  };

  return (
    <DriveImagesContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          ...TransitionPresets.ModalPresentationIOS,
          ...options,
        }}
      >
        <Stack.Screen
          name="Barcode scanner"
          options={options}
          component={BarcodeScannerScreen}
        />
        <Stack.Screen
          name="Images"
          options={options}
          component={DriveImagesScreen}
        />
      </Stack.Navigator>
    </DriveImagesContextProvider>
  );
};
