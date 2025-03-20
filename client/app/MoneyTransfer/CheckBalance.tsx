
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as SecureStore from "expo-secure-store";

const CheckBalance = () => {
  const [pin, setPin] = useState("");
  const [isPinCorrect, setIsPinCorrect] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [upiPinSet, setUpiPinSet] = useState(false);

  // Check if the UPI PIN is already set when the component mounts
  useEffect(() => {
    const checkPinStatus = async () => {
      const storedPin = await SecureStore.getItemAsync("upiPin");
      if (storedPin) {
        setUpiPinSet(true);  // If PIN is set, allow balance checking
      }
    };
    checkPinStatus();
  }, []);

  // Handle checking balance
  const handleCheckBalance = async () => {
    const storedPin = await SecureStore.getItemAsync("upiPin");

    if (pin === storedPin) {
      setBalanceVisible(true);
    } else {
      alert("Invalid UPI PIN");
    }
  };

  // Handle setting a new UPI PIN
  const handleSetPin = async () => {
    if (pin.length === 4) {
      // Save the PIN securely
      await SecureStore.setItemAsync("upiPin", pin);
      alert("UPI PIN has been set!");
      setUpiPinSet(true); // Update state to allow balance checking
    } else {
      alert("Please enter a valid 4-digit PIN");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Check Balance</Text>
      </View>

      {!upiPinSet ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Set Your UPI PIN</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Enter 4-digit UPI PIN"
            maxLength={4}
            value={pin}
            onChangeText={setPin}
          />
          <TouchableOpacity style={styles.button} onPress={handleSetPin}>
            <Text style={styles.buttonText}>Set PIN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        !balanceVisible ? (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter UPI PIN</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Enter UPI PIN"
              maxLength={4}
              keyboardType="numeric"
              value={pin}
              onChangeText={setPin}
            />
            <TouchableOpacity style={styles.button} onPress={handleCheckBalance}>
              <Text style={styles.buttonText}>Check Balance</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.balanceCard}>
            <Text style={styles.label}>Your Account Balance</Text>
            <Text style={styles.balance}>₹12,345.67</Text>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/000000/wallet--v1.png",
              }}
              style={styles.walletIcon}
            />
          </View>
        )
      )}
    </View>
  );
};

export default CheckBalance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 20,
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a90e2",
  },
  inputContainer: {
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    color: "#888",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  balanceCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  balance: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2b8a3e",
    marginBottom: 10,
  },
  walletIcon: {
    width: 50,
    height: 50,
  },
});
