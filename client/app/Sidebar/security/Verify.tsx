import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useRouter } from "expo-router";

const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 3) {
        inputs.current[index + 1]?.focus();
      } else {
        handleVerify(newOtp.join(""));
      }
    } else if (text === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleVerify = (code: string) => {
    const expectedCode = "1234"; // Replace with actual backend check
    if (code === expectedCode) {
      Alert.alert("Verified", "OTP is correct.");
      router.push("/Sidebar/security/Passcode/new"); // Redirect to new passcode setup
    } else {
      Alert.alert("Invalid OTP", "The code you entered is incorrect.");
      setOtp(["", "", "", ""]);
      inputs.current[0]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: "padding" })}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        We sent a 4-digit code to your registered contact.
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpBox}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            secureTextEntry
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity onPress={() => handleVerify(otp.join(""))} style={styles.verifyButton}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.resend}>Resend Code</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: "#4CAF50",
    borderWidth: 1.5,
    textAlign: "center",
    fontSize: 22,
    color: "#000",
  },
  verifyButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resend: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 15,
    marginTop: 16,
    textDecorationLine: "underline",
  },
});
