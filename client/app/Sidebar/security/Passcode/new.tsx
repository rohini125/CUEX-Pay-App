import React, { useState, useRef } from "react";
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, Alert, KeyboardAvoidingView, Platform
} from "react-native";
import { useRouter } from "expo-router";

const NewPasscodeScreen = () => {
  const [passcode, setPasscode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();

  const handleChange = (text: string) => {
    if (text.length <= 4) {
      setPasscode(text);
      if (text.length === 4) {
        saveNewPasscode(text);
      }
    }
  };

  const saveNewPasscode = (newCode: string) => {
    // send to backend with MERN logic here
    Alert.alert("Passcode Updated", "Your new passcode has been saved.");
    router.replace("/Sidebar/security"); // or go back to dashboard
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: "padding" })}>
      <Text style={styles.title}>Enter New Passcode</Text>

      <TouchableOpacity onPress={() => inputRef.current?.focus()} style={styles.dotsWrapper}>
        {[...Array(4)].map((_, i) => (
          <View
            key={i}
            style={[styles.dot, { backgroundColor: i < passcode.length ? "#4CAF50" : "#ccc" }]}
          />
        ))}
      </TouchableOpacity>

      <TextInput
        ref={inputRef}
        value={passcode}
        onChangeText={handleChange}
        maxLength={4}
        keyboardType="numeric"
        secureTextEntry
        autoFocus
        style={styles.hiddenInput}
      />
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 40,
      color: "#333",
    },
    dotsWrapper: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
      gap: 16,
    },
    dot: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: "#ccc",
    },
    hiddenInput: {
      height: 0,
      width: 0,
      opacity: 0,
    },
    forgot: {
      marginTop: 30,
      color: "#007AFF",
      textDecorationLine: "underline",
    },
  });
  
export default NewPasscodeScreen;
