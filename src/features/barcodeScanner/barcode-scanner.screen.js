import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Spacer } from "../../components/spacer/spacer.component";
import { SafeArea } from "../../components/utility/safe-area.component";
import { AuthButton } from "../account/components/account.styles";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { isDevelopment } from '../../utils/env';

const TIMER_IN_SECONDS = isDevelopment ? 1 : 5;

export const BarcodeScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(TIMER_IN_SECONDS);

  // countdown
  useEffect(() => {
    setTimeout(() => setCounter(0), TIMER_IN_SECONDS * 1000);
    return;
  }, []);

  // run barcode scanner once intially - []
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    try {
      getBarCodeScannerPermissions();
    } catch (e) {
      setError(e);
    }
  }, []);

  const handleBarCodeScanned = (barCodeResponse) => {
    const { type, data } = barCodeResponse;
    setScanned(true);
    setBarcodeData(data);
    console.log({ barCodeResponse });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate("Images");
  };

  return (
    <SafeArea>
      {(!!error || !hasPermission || counter <= 0) && (
        <Button
          size={50}
          onPress={() => handleBarCodeScanned({ type: "type", data: {} })}
        >
          Not working? Just click here
        </Button>
      )}
      {!error && (
        <View flex={1} margin='3%'>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
      {scanned && (
        <AuthButton
          title={"Tap to Scan Again"}
          onPress={() => {
            setScanned(false);
            setBarcodeData(null);
            setError(null);
          }}
        />
      )}
    </SafeArea>
  );
};
