import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SecuritySettings = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  useEffect(() => {
    const loadSetting = async () => {
      const storedValue = await AsyncStorage.getItem("biometricEnabled");
      if (storedValue === "true") {
        setBiometricEnabled(true);
      }
    };

    loadSetting();
  }, []);

  const toggleBiometricAuth = async () => {
    const newValue = !biometricEnabled;
    setBiometricEnabled(newValue);
    await AsyncStorage.setItem("biometricEnabled", newValue.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security Settings</Text>
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Enable Biometric Authentication</Text>
        <Switch
          value={biometricEnabled}
          onValueChange={toggleBiometricAuth}
        />
      </View>
    </View>
  );
};

export default SecuritySettings;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f8f8" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  optionRow: { flexDirection: "row", justifyContent: "space-between", width: "80%", alignItems: "center", padding: 10 },
  optionText: { fontSize: 18 },
});
