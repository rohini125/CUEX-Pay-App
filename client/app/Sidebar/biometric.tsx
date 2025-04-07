import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Alert, ScrollView } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SecurityPrivacy() {
  const router = useRouter();
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [twoFA, setTwoFA] = useState(true);

  // Function to Authenticate using Biometrics
  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Biometric Authentication", "Your device does not support biometric authentication.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Face ID / Fingerprint",
      fallbackLabel: "Enter Passcode",
    });

    if (result.success) {
      setBiometricAuth(true);
      Alert.alert("Success", "Biometric authentication enabled!");
    } else {
      Alert.alert("Failed", "Biometric authentication failed. Try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security & Privacy</Text>
      </View>

      {/* Security Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <TouchableOpacity style={styles.option} onPress={() => router.push('/Sidebar/ChangePassword')}>
          <MaterialIcons name="lock" size={22} color="#4CAF50" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <View style={styles.option}>
          <MaterialIcons name="verified-user" size={22} color="#1976D2" />
          <Text style={styles.optionText}>Enable 2FA</Text>
          <Switch value={twoFA} onValueChange={setTwoFA} />
        </View>
        <View style={styles.option}>
  <Ionicons name="finger-print" size={22} color="#FF9800" />
  <Text style={styles.optionText}>Biometric Authentication</Text>
  <Switch 
    value={biometricAuth} 
    onValueChange={(val) => { 
      if (val) handleBiometricAuth(); 
    }} 
  />
</View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F4F4F4', paddingHorizontal: 16, paddingBottom: 20 },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  headerTitle: { flex: 1, fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  backButton: { padding: 10 },
  section: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  optionText: { fontSize: 16, flex: 1, marginLeft: 10 },
});
