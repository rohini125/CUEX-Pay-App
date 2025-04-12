// screens/TwoFactorAuthScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TwoFactorAuthScreen = () => {
  const [enabled, setEnabled] = useState(false);
  const [contactInfo, setContactInfo] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      const enabledValue = await AsyncStorage.getItem("2faEnabled");
      const savedContact = await AsyncStorage.getItem("2faContact");
      if (enabledValue === "true") setEnabled(true);
      if (savedContact) setContactInfo(savedContact);
    };
    loadSettings();
  }, []);

  const handleToggle = (value: boolean) => {
    setEnabled(value);
  };

  const handleSave = async () => {
    if (enabled && contactInfo.trim() === "") {
      Alert.alert("Contact Required", "Please enter a phone number or email.");
      return;
    }

    await AsyncStorage.setItem("2faEnabled", enabled.toString());
    await AsyncStorage.setItem("2faContact", contactInfo);

    Alert.alert("Saved", "Two-factor authentication settings updated.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two-Factor Authentication</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Enable 2FA</Text>
        <Switch
          value={enabled}
          onValueChange={handleToggle}
          thumbColor={enabled ? "#4CAF50" : "#888"}
          trackColor={{ false: "#767577", true: "#81C784" }}
        />
      </View>

      {enabled && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Enter phone number or email to receive codes:
          </Text>
          <TextInput
            value={contactInfo}
            onChangeText={setContactInfo}
            placeholder="Email or Phone Number"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TwoFactorAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
