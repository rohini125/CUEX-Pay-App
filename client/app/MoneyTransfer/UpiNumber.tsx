import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const UpiNumber = () => {
  const [upiNumber, setUpiNumber] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handleConfirm = () => {
    // Navigate to the success page with parameters
    router.push({
      pathname: '/MoneyTransfer/upiNumbersuccess',
      params: {
        upiNumber,
        amount,
        dateTime: new Date().toLocaleString(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Payment Details</Text>

      {/* UPI Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter UPI Number"
        value={upiNumber}
        onChangeText={setUpiNumber}
        keyboardType="numeric"
      />

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {/* Confirm Button */}
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpiNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f9f9f9',
    backgroundColor:'#ADD8E6',
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    // backgroundColor: '#007BFF',
    backgroundColor:'#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
