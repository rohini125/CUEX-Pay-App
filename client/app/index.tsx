// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   ImageBackground,
//   StatusBar,
//   TouchableOpacity,
//   Text,
//   View,
//   ActivityIndicator,
//   Alert,
//   AppState,
//   Switch,
//   AppStateStatus,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";
// import { BlurView } from "expo-blur";
// import * as Animatable from "react-native-animatable";
// import * as LocalAuthentication from "expo-local-authentication";

// const Index = () => {
//   const router = useRouter();
//   const [authenticated, setAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [biometricEnabled, setBiometricEnabled] = useState(false);

//   useEffect(() => {
//     loadBiometricSetting();
//     checkAuthentication();

//     const subscription = AppState.addEventListener(
//       "change",
//       handleAppStateChange
//     );
//     return () => subscription.remove();
//   }, []);

//   // Load stored biometric preference
//   const loadBiometricSetting = async () => {
//     const storedValue = await AsyncStorage.getItem("biometricEnabled");
//     const enabled = storedValue === "true";
//     setBiometricEnabled(enabled);
//   };

//   // Check biometric support
//   const checkBiometricSupport = async () => {
//     const hasHardware = await LocalAuthentication.hasHardwareAsync();
//     const isEnrolled = await LocalAuthentication.isEnrolledAsync();
//     if (!hasHardware || !isEnrolled) {
//       Alert.alert(
//         "Biometric Not Available",
//         "Your device does not support biometric authentication."
//       );
//       return false;
//     }
//     return true;
//   };

//   // Authenticate user
//   const authenticateUser = async () => {
//     setLoading(true);
//     try {
//       const isSupported = await checkBiometricSupport();
//       if (!isSupported || !biometricEnabled) {
//         setAuthenticated(true); // Allow access if biometrics are disabled
//         return;
//       }

//       const result = await LocalAuthentication.authenticateAsync({
//         promptMessage: "Unlock CUEX App",
//         fallbackLabel: "Use PIN",
//         cancelLabel: "Cancel",
//         requireConfirmation: false,
//       });

//       if (result.success) {
//         setAuthenticated(true);
//       } else {
//         Alert.alert("Authentication Failed", "Try again.");
//         setAuthenticated(false);
//       }
//     } catch (error) {
//       Alert.alert("Error", "An error occurred during authentication.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Lock app when phone is locked or backgrounded
//   const handleAppStateChange = (nextAppState: AppStateStatus) => {
//     if (nextAppState === "inactive" || nextAppState === "background") {
//       setAuthenticated(false);
//     }
//   };

//   // Run on app start
//   const checkAuthentication = async () => {
//     await authenticateUser();
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   return authenticated ? (
//     <ImageBackground
//       source={require("../assets/images/StaringPage.jpg")}
//       style={styles.background}
//     >
//       <StatusBar barStyle="light-content" />
//       <BlurView intensity={15} style={styles.overlay}>
//         <Animatable.Text animation="zoomInUp" duration={2000} style={styles.text}>
//           Welcome to CUEX App
//         </Animatable.Text>

//         {/* 🔽 Biometric Toggle Switch */}
//         <View style={styles.toggleContainer}>
//           <Text style={styles.toggleLabel}>Biometric Login</Text>
//           <Switch
//             value={biometricEnabled}
//             onValueChange={async (value) => {
//               setBiometricEnabled(value);
//               await AsyncStorage.setItem("biometricEnabled", value.toString());
//               if (value) {
//                 authenticateUser(); // Optional: re-authenticate when enabled
//               }
//             }}
//             thumbColor={biometricEnabled ? "#4CAF50" : "#888"}
//             trackColor={{ false: "#767577", true: "#81C784" }}
//           />
//         </View>

//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.GetStartBtn}
//           onPress={() => router.navigate("/login")}
//         >
//           <Text style={styles.GetStartText}>Get Started</Text>
//         </TouchableOpacity>
//       </BlurView>
//     </ImageBackground>
//   ) : null;
// };

// export default Index;

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   background: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.6)",
//   },
//   text: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 30,
//     textAlign: "center",
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   toggleLabel: {
//     color: "white",
//     marginRight: 10,
//     fontSize: 16,
//   },
//   GetStartBtn: {
//     backgroundColor: "#4CAF50",
//     borderRadius: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   GetStartText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });






// app/index.tsx or screens/Index.tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, ImageBackground, StatusBar } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as LocalAuthentication from "expo-local-authentication";
// import { useRouter } from "expo-router";
// import { BlurView } from "expo-blur";
// import * as Animatable from "react-native-animatable";

// const Index = () => {
//   const [loading, setLoading] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     checkBiometricAuth();
//   }, []);

//   const checkBiometricAuth = async () => {
//     const enabled = await AsyncStorage.getItem("biometricEnabled");
//     if (enabled === "true") {
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const enrolled = await LocalAuthentication.isEnrolledAsync();

//       if (!compatible || !enrolled) {
//         Alert.alert("Biometric not supported");
//         setAuthenticated(true); // Allow access anyway
//         setLoading(false);
//         return;
//       }

//       const result = await LocalAuthentication.authenticateAsync({
//         promptMessage: "Authenticate to access CUEX",
//         fallbackLabel: "Use Passcode",
//       });

//       if (result.success) {
//         setAuthenticated(true);
//       } else {
//         Alert.alert("Authentication failed");
//       }
//     } else {
//       setAuthenticated(true); // If not enabled, allow access
//     }

//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   return authenticated ? (
//     <ImageBackground
//       source={require("../assets/images/StaringPage.jpg")}
//       style={styles.background}
//     >
//       <StatusBar barStyle="light-content" />
//       <BlurView intensity={15} style={styles.overlay}>
//         <Animatable.Text animation="zoomInUp" duration={2000} style={styles.text}>
//           Welcome to CUEX App
//         </Animatable.Text>
//         <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => router.push("/login")}>
//           <Text style={styles.buttonText}>Get Started</Text>
//         </TouchableOpacity>
//       </BlurView>
//     </ImageBackground>
//   ) : null;
// };

// export default Index;

// const styles = StyleSheet.create({
//   loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
//   background: { flex: 1, width: "100%", height: "100%", resizeMode: "cover" },
//   overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" },
//   text: { fontSize: 28, fontWeight: "bold", color: "white", marginBottom: 30 },
//   button: {
//     backgroundColor: "#4CAF50",
//     borderRadius: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
// });




import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkBiometricAuth();
  }, []);

  const checkBiometricAuth = async () => {
    const enabled = await AsyncStorage.getItem("biometricEnabled");

    if (enabled === "true") {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!compatible || !enrolled) {
        Alert.alert("Biometric not supported");
        setAuthenticated(true); // Allow access anyway
        setLoading(false);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access CUEX",
        fallbackLabel: "Use Passcode",
      });

      if (result.success) {
        setAuthenticated(true);
      } else {
        Alert.alert("Authentication failed");
      }
    } else {
      // biometric is disabled
      setAuthenticated(true);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return authenticated ? (
    <ImageBackground
      source={require("../assets/images/StaringPage.jpg")}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <BlurView intensity={15} style={styles.overlay}>
        <Animatable.Text animation="zoomInUp" duration={2000} style={styles.text}>
          Welcome to CUEX App
        </Animatable.Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </BlurView>
    </ImageBackground>
  ) : null;
};

export default Index;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
