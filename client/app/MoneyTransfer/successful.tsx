

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import icons from react-icons

const PaymentResult = () => {
  const router = useRouter();
  const { success, mobileNumber, amount, dateTime } = useLocalSearchParams();

  const isSuccess = success === 'true'; // Determine if the payment was successful

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isSuccess ? '#DFF2BF' : '#FFBABA' }, // Green for success, red for failure
      ]}
    >
      {isSuccess && (
        <Ionicons name="checkmark-circle" size={60} color="green" style={styles.icon} />
      )}
      {!isSuccess && (
        <Ionicons name="close-circle" size={60} color="red" style={styles.icon} />
      )}
      <Text style={[styles.message, isSuccess ? styles.success : styles.failure]}>
        {isSuccess ? 'Payment Successful!' : 'Transaction Failed'}
      </Text>
      <Text style={styles.details}>Mobile Number: {mobileNumber}</Text>
      <Text style={styles.details}>Amount: ₹{amount}</Text>
      <Text style={styles.details}>Date and Time: {dateTime}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/front')}>
        <Text style={styles.buttonText}> Done </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentResult;

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
  failure: {
    color: 'red',
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



