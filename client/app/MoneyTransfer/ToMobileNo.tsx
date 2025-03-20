import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import icons from react-icons

const ToMobilePay = () => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');

  // Handle payment confirmation
  const handleConfirm = () => {
    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      Alert.alert('Error', 'Enter a valid 10-digit mobile number');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Enter a valid amount');
      return;
    }

    const currentDateTime = new Date().toLocaleString();

    // Navigate to the PaymentResult page with data
    router.push(
      `/MoneyTransfer/successful?success=true&mobileNumber=${mobileNumber}&amount=${amount}&dateTime=${encodeURIComponent(
        currentDateTime
      )}`
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Send Money to Mobile Number</Text>
      </View>
       
      <View style={styles.Content}>
          {/* Mobile Number Input */}
          <TextInput
            placeholder="Enter Mobile Number"
            keyboardType="numeric"
            maxLength={10}
            style={styles.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />

          {/* Amount Input */}
          <TextInput
            placeholder="Enter Amount"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
          />

          {/* Confirm Button */}
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default ToMobilePay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ADD8E6',
  },
  Content:{
    flex:1,
    justifyContent:'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    // borderWidth: 1,
   backgroundColor: '#fff',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


