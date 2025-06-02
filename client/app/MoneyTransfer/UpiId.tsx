

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const UpiIdPaymentPage = () => {
  const router = useRouter();
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');

  const handleConfirm = () => {
    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Enter a valid amount');
      return;
    }

    if (!upiId) {
      Alert.alert('Error', 'Enter a valid UPI ID');
      return;
    }

    // Using params to pass data for the success page
    router.push({
      pathname: '/MoneyTransfer/upiIdsuccess',
      params: {
        amount,
        upiId,
        dateTime: new Date().toLocaleString(),
      },
    });
  };

  return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter Payment Details</Text>
  
        <View style={styles.card}>
          {/* Input for UPI id */}
          <TextInput
            style={styles.input}
            placeholder="Enter UPI ID"
            value={upiId}
            onChangeText={setUpiId}
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

        {/* User Helpful Information */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>💡 Ensure your UPI ID is correct to avoid failed transactions.</Text>
          <Text style={styles.infoText}>⚠️ Verify the amount before confirming the payment.</Text>
          <Text style={styles.infoText}>🔒 Your transaction details are encrypted for security.</Text>
          <Text style={styles.infoText}>⏳ Payments may take a few minutes to reflect in the recipient's account.</Text>
        </View>
      </View>
    );
  };
  
  export default UpiIdPaymentPage;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F4F6F9',
      padding: 20,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf:'center',
      color: '#222',
      marginBottom: 20,
    },
    card: {
      backgroundColor: '#FFFFFF', 
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
    input: {
      backgroundColor: '#F9FAFC',
      borderRadius: 10,
      height: 55,
      paddingHorizontal: 15,
      marginBottom: 20,
      fontSize: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor:'#004080',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    infoBox: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#EAF0FB',
      borderRadius: 10,
    },
    infoText: {
      fontSize: 14,
      color: '#004080',
      marginBottom: 8,
    },
  });
