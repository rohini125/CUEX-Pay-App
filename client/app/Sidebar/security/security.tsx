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











// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Switch,
//   StyleSheet,
//   Alert,
//   StatusBar,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as LocalAuthentication from "expo-local-authentication";
// import { Ionicons } from "@expo/vector-icons";
// import { Feather } from '@expo/vector-icons';
// import { useRouter } from "expo-router";



// const SecurityScreen = () => {
//   const [biometricEnabled, setBiometricEnabled] = useState(false);
//   const router = useRouter();
//   useEffect(() => {
//     const loadSetting = async () => {
//       const storedValue = await AsyncStorage.getItem("biometricEnabled");

//       if (storedValue === null) {
//         // Set to false by default on first load
//         await AsyncStorage.setItem("biometricEnabled", "false");
//         setBiometricEnabled(false);
//       } else {
//         setBiometricEnabled(storedValue === "true");
//       }
//     };
//     loadSetting();
//   }, []);

//   const handleToggle = async (value: boolean) => {
//     const hasHardware = await LocalAuthentication.hasHardwareAsync();
//     const isEnrolled = await LocalAuthentication.isEnrolledAsync();

//     if (value && (!hasHardware || !isEnrolled)) {
//       Alert.alert(
//         "Biometric Not Supported",
//         "Biometric authentication is not available on this device."
//       );
//       return;
//     }

//     setBiometricEnabled(value);
//     await AsyncStorage.setItem("biometricEnabled", value.toString());
//   };

//   return (
//     <View style={styles.container}>
//        <StatusBar backgroundColor="#004080" barStyle="light-content"  />
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => router.push('/Sidebar/menu')} style={styles.backButton}>
//                 <Ionicons name="arrow-back" size={24} color="white" />
//               </TouchableOpacity>
//             <Text style={styles.headerTitle}> Security Settings </Text>
//             </View>
      

//       <View style={styles.menuList} >
//       <TouchableOpacity style={styles.row}>
//         <Text style={styles.label}>Enable Biometric Login</Text>
//         <Switch
//           value={biometricEnabled}
//           onValueChange={handleToggle}
//           thumbColor={biometricEnabled ? "#4CAF50" : "#888"}
//           trackColor={{ false: "#767577", true: "#81C784" }}
//         />
//     </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.option}
//         onPress={() => router.push("/Sidebar/security/Passcode/old")}
//       >
//         <Ionicons name="lock-closed-outline" size={20} color="#555" />
//         <Text style={styles.optionText}>Change Passcode</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.option}
//         onPress={() => router.push("/Sidebar/security/TwoFactorAuthScreen")}
//       >
//         <Ionicons name="shield-checkmark-outline" size={20} color="#555" />
//         <Text style={styles.optionText}>Two-Factor Authentication</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.optionItem}
//         onPress={() => router.push("/Sidebar/security/BlockedAccountsScreen")}
//       >
//         <Ionicons name="person-remove-outline" size={20} color="#555" />
//         <Text style={styles.optionText}>Blocked Accounts</Text>
//       </TouchableOpacity>


//       </View>
//     </View>
//   );
// };

// export default SecurityScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // padding: 24,
//     // backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#004080',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 16,
//   },
 
//   menuList: {
//     padding: 20,
//     margin:20,
//     borderRadius:20,
//     backgroundColor:'#e2f1ff',
//      height:'85%'
//   },
//   optionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: 'black',
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   optionText: {
//     fontSize: 16,
//     color: 'black',
//   },
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
import { useRouter } from "expo-router";

const SecurityPage = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [patternEnabled, setPatternEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadSettings = async () => {
      const bio = await AsyncStorage.getItem("biometricEnabled");
      const pattern = await AsyncStorage.getItem("patternEnabled");
      setBiometricEnabled(bio === "true");
      setPatternEnabled(pattern === "true");
    };

    loadSettings();
  }, []);

  const toggleBiometric = async () => {
    const newValue = !biometricEnabled;
    setBiometricEnabled(newValue);
    await AsyncStorage.setItem("biometricEnabled", newValue.toString());

    Alert.alert(
      "Biometric " + (newValue ? "enabled" : "disabled"),
      "This will apply on next app launch."
    );
  };

  const togglePattern = async () => {
    const newValue = !patternEnabled;
    setPatternEnabled(newValue);
    await AsyncStorage.setItem("patternEnabled", newValue.toString());

    Alert.alert(
      "Pattern Lock " + (newValue ? "enabled" : "disabled"),
      "This will apply on next app launch."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Enable Biometric Authentication</Text>
        <Switch value={biometricEnabled} onValueChange={toggleBiometric} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Enable Pattern Lock</Text>
        <Switch value={patternEnabled} onValueChange={togglePattern} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecurityPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
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
    fontSize: 18,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
