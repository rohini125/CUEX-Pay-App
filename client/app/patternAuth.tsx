import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const PatternAuth = () => {
  const [pattern, setPattern] = useState("");
  const router = useRouter();
  const correctPattern = "1234"; // TODO: Replace with secure storage for real pattern

  const handleSubmit = () => {
    if (pattern === correctPattern) {
      router.replace("/");
    } else {
      Alert.alert("Incorrect Pattern", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Pattern</Text>
      <TextInput
        placeholder="Enter 4-digit pattern"
        style={styles.input}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
        value={pattern}
        onChangeText={setPattern}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Unlock</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PatternAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
