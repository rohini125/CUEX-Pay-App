// screens/SecurityScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const SecurityScreen = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  useEffect(() => {
    const loadSetting = async () => {
      const storedValue = await AsyncStorage.getItem("biometricEnabled");
      setBiometricEnabled(storedValue === "true");
    };
    loadSetting();
  }, []);

  const handleToggle = async (value: boolean) => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (value && (!hasHardware || !isEnrolled)) {
      Alert.alert("Biometric Not Supported", "Biometric authentication is not available on this device.");
      return;
    }

    setBiometricEnabled(value);
    await AsyncStorage.setItem("biometricEnabled", value.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Enable Biometric Login</Text>
        <Switch
          value={biometricEnabled}
          onValueChange={handleToggle}
          thumbColor={biometricEnabled ? "#4CAF50" : "#888"}
          trackColor={{ false: "#767577", true: "#81C784" }}
        />
      </View>
    </View>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  row: { flexDirection: "row", alignItems: "center" },
  label: { fontSize: 16, marginRight: 10 },
});
