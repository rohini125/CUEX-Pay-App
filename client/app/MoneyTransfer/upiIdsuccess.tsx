import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const UpiIdSuccess = () => {
  const router = useRouter();
  const { upiId, amount, dateTime } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <Ionicons name="checkmark-circle" size={80} color="green" style={styles.icon} />

      {/* Success Message */}
      <Text style={styles.successMessage}>Payment Successful!</Text>

      {/* Transaction Details */}
      <Text style={styles.details}>UPI ID: {upiId}</Text>
      <Text style={styles.details}>Amount: ₹{amount}</Text>
      <Text style={styles.details}>Date and Time: {dateTime}</Text>

      {/* Done Button */}
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => router.push('/front')}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpiIdSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFF2BF', // Light green background for success
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
