import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function VerificationSuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

       <StatusBar backgroundColor="#004080" barStyle="light-content"  /> 

        <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/Sidebar/kycVerification/BiometricVerification')} style={styles.backButton}>
                      <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>KYC Verification</Text>
                  </View>
      <View style={styles.card}>
      <Ionicons name="checkmark-circle" size={100} color="green" />
      <Text style={styles.title}>Verification Successful!</Text>
      <Text style={styles.subtitle}>
        Your identity has been verified. You can now proceed with secure transactions.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => router.push('/front')}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  card:{
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
  button: {
    backgroundColor: '#004080',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
