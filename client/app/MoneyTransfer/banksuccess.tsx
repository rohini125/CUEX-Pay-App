
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const BankSuccess = () => {
  const { accountNumber, ifscCode, amount } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: '#DFF2BF' }]}>
      {/* Success Icon */}
      <Ionicons name="checkmark-circle" size={60} color="green" style={styles.icon} />
      <Text style={[styles.message, styles.success]}>Payment Successful</Text>

      {/* Payment Details */}
      <Text style={styles.details}>Bank Account: {accountNumber}</Text>
      <Text style={styles.details}>IFSC Code: {ifscCode}</Text>
      <Text style={styles.details}>Amount: ₹{amount}</Text>
      <Text style={styles.details}>
        Date & Time: {new Date().toLocaleString()}
      </Text>

      {/* Back Button */}
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => router.push('/front')}>
        <Text style={styles.buttonText}> Done </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BankSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  success: {
    color: 'green',
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
