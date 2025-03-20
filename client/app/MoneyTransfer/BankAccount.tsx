import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const BankAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handleConfirm = () => {
    // Navigate to BankSuccess screen with details
    router.push({
      pathname: '/MoneyTransfer/banksuccess',
      params: { accountNumber, ifscCode, amount },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bank Account Details</Text>

      {/* Input for Bank Account Number */}
      <TextInput
        style={styles.input}
        placeholder="Enter Bank Account"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="number-pad"
      />

      {/* Input for IFSC Code */}
      <TextInput
        style={styles.input}
        placeholder="Enter IFSC Code"
        value={ifscCode}
        onChangeText={setIfscCode}
      />

      {/* Input for Amount */}
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="number-pad"
      />

      {/* Confirm Button */}
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BankAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f9f9f9',
    backgroundColor: '#ADD8E6',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc', 
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
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
