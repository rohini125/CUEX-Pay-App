import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  ImageBackground, 
  StatusBar, 
  TouchableOpacity, 
  Text, 
  View, 
  ActivityIndicator, 
  Alert,
  AppState
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import * as LocalAuthentication from "expo-local-authentication";
import { AppStateStatus } from "react-native";

const Index = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true); // Use this for security settings

  useEffect(() => {
    checkAuthentication();
    
    // Listen for app state changes (Lock app if phone is locked)
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, []);

  // 🔹 Function to check biometric hardware & enrollments
  const checkBiometricSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log("Biometric Hardware:", hasHardware);
    console.log("Biometric Enrolled:", isEnrolled);

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Biometric Not Available", "Your device does not support biometric authentication.");
      return false;
    }
    return true;
  };

  // 🔹 Function to authenticate user
  const authenticateUser = async () => {
    setLoading(true);
    try {
      const isSupported = await checkBiometricSupport();
      if (!isSupported || !biometricEnabled) {
        setAuthenticated(true); // Allow access if biometrics are disabled in settings
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock CUEX App",
        fallbackLabel: "Use PIN",
        disableDeviceFallback: false, // Allows PIN fallback if biometrics fail
        cancelLabel: "Cancel",
        requireConfirmation: false, // Avoids unnecessary confirmation
      });

      console.log("Biometric Result:", result);

      if (result.success) {
        setAuthenticated(true);
      } else {
        Alert.alert("Authentication Failed", "Try again.");
        setAuthenticated(false); // Keep app locked
      }
    } catch (error) {
      console.error("Biometric Error:", error);
      Alert.alert("Error", "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Lock app when phone is locked
  

const handleAppStateChange = (nextAppState: AppStateStatus) => {
  if (nextAppState === "inactive" || nextAppState === "background") {
    console.log("App Locked due to phone lock.");
    setAuthenticated(false);
  }
};


  // 🔹 Check authentication when the app starts
  const checkAuthentication = async () => {
    await authenticateUser();
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
        <Animatable.Text 
          animation="zoomInUp"
          duration={2000}
          style={styles.text}
        >
          Welcome to CUEX App
        </Animatable.Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.GetStartBtn} onPress={() => router.navigate("/login")}>
          <Text style={styles.GetStartText}>Get Started</Text>
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
  GetStartBtn: {
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
  GetStartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
