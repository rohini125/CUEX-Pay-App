import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BiometricVerificationScreen() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const handleVerification = () => {
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);

      setTimeout(() => {
        router.push('/Sidebar/kycVerification/verificationSuccess'); // Navigate to the success page
      }, 1500);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biometric Verification</Text>
      <Text style={styles.subtitle}>Place your finger on the sensor to verify your identity.</Text>

      <View style={styles.fingerprintContainer}>
        {isVerifying ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : isVerified ? (
          <Ionicons name="checkmark-circle" size={100} color="green" />
        ) : (
          <TouchableOpacity onPress={handleVerification} accessibilityLabel="Tap to verify fingerprint">
            <Ionicons name="finger-print" size={100} color="#007BFF" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.instruction}>
        {isVerifying ? 'Verifying...' : isVerified ? 'Verification Successful!' : 'Tap to scan'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  fingerprintContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  instruction: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
