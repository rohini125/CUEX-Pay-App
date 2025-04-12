import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const ForgetPasscodeScreen = () => {
  const [contactInfo, setContactInfo] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!contactInfo.trim()) {
      Alert.alert("Input Required", "Please enter your email or phone number.");
      return;
    }

    // Example validation or API trigger
    // Here you'd typically send OTP or reset instructions
    Alert.alert("Verification Sent", "Follow the instructions sent to your email/number.");
    router.push("/Sidebar/security/Verify"); // create this page next
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding" })}
    >
      <Text style={styles.title}>Forgot Passcode?</Text>
      <Text style={styles.subtext}>
        Enter your registered email or phone number to reset your passcode.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        placeholderTextColor="#888"
        value={contactInfo}
        onChangeText={setContactInfo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>← Back to Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ForgetPasscodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  subtext: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backText: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 15,
    marginTop: 8,
  },
});
