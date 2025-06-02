// // screens/SecurityScreen.tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, Switch, StyleSheet, Alert } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as LocalAuthentication from "expo-local-authentication";

// const SecurityScreen = () => {
//   const [biometricEnabled, setBiometricEnabled] = useState(false);

//   useEffect(() => {
//     const loadSetting = async () => {
//       const storedValue = await AsyncStorage.getItem("biometricEnabled");
//       setBiometricEnabled(storedValue === "true");
//     };
//     loadSetting();
//   }, []);

//   const handleToggle = async (value: boolean) => {
//     const hasHardware = await LocalAuthentication.hasHardwareAsync();
//     const isEnrolled = await LocalAuthentication.isEnrolledAsync();

//     if (value && (!hasHardware || !isEnrolled)) {
//       Alert.alert("Biometric Not Supported", "Biometric authentication is not available on this device.");
//       return;
//     }

//     setBiometricEnabled(value);
//     await AsyncStorage.setItem("biometricEnabled", value.toString());
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Security Settings</Text>
//       <View style={styles.row}>
//         <Text style={styles.label}>Enable Biometric Login</Text>
//         <Switch
//           value={biometricEnabled}
//           onValueChange={handleToggle}
//           thumbColor={biometricEnabled ? "#4CAF50" : "#888"}
//           trackColor={{ false: "#767577", true: "#81C784" }}
//         />
//       </View>
//     </View>
//   );
// };

// export default SecurityScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
//   row: { flexDirection: "row", alignItems: "center" },
//   label: { fontSize: 16, marginRight: 10 },
// });












import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const router = useRouter(); 
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
      Alert.alert(
        "Biometric Not Supported",
        "Biometric authentication is not available on this device."
      );
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

      <View style={styles.divider} />

      Other Security Options
      {/* <TouchableOpacity style={styles.option} onPress={() => router.push("/Sidebar/Passcode/oldpasscod")}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <Text style={styles.optionText}>Change Passcode</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
  style={styles.option}
  onPress={() => router.push("/Sidebar/TwoFactorAuthScreen")}
>
  <Ionicons name="shield-checkmark-outline" size={20} color="#555" />
  <Text style={styles.optionText}>Two-Factor Authentication</Text>
</TouchableOpacity>

      {/* <TouchableOpacity style={styles.option} onPress={() => router.push("/Sidebar/BlockedAccountsScreen")}>
  <Ionicons name="person-remove-outline" size={20} color="#555" />
  <Text style={styles.optionText}>Blocked Accounts</Text>
</TouchableOpacity> */}

      <TouchableOpacity style={styles.option}>
        <Ionicons name="time-outline" size={20} color="#555" />
        <Text style={styles.optionText}>Login History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecurityScreen;

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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
});
