import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet,StatusBar } from 'react-native';
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
        router.push('/Sidebar/kycVerification/VerificationSuccess'); // Navigate to the success page
      }, 1500);
    }, 3000);
  };

  return (
    <View style={styles.container}>

       <StatusBar backgroundColor="#004080" barStyle="light-content"  />

      <View style={styles.header}>
              <TouchableOpacity onPress={() => router.push('/Sidebar/kycVerification/ProofOfIdentity')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>KYC Verification</Text>
            </View>
      <View style={styles.card}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004080',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  backButton: {
    marginRight: 10,
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
  card: {
    backgroundColor: '#e2f1ff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    padding: 24,
    margin:30,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
