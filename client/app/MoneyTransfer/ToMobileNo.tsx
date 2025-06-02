

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ToMobilePay = () => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('+91 9876543210');
  const [amount, setAmount] = useState('');

  const handleMobileNumberChange = (text: string) => {
    if (text.startsWith('+91 ')) {
      setMobileNumber(text);
    } else {
      setMobileNumber('+91 ' + text.replace('+91 ', ''));
    }
  };

  const handleConfirm = () => {
    const trimmedMobile = mobileNumber.replace('+91 ', '');
    if (!/^[0-9]{10}$/.test(trimmedMobile)) {
      Alert.alert('Error', 'Enter a valid 10-digit mobile number');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Enter a valid amount');
      return;
    }

    const currentDateTime = new Date().toLocaleString();

    router.push(
      `/MoneyTransfer/successful?success=true&mobileNumber=${trimmedMobile}&amount=${amount}&dateTime=${encodeURIComponent(
        currentDateTime
      )}`
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#004080" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Send Money</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <TextInput
            placeholder="Enter Mobile Number"
            keyboardType="numeric"
            maxLength={14}
            style={styles.input}
            value={mobileNumber}
            onChangeText={handleMobileNumberChange}
            placeholderTextColor="#666"
          />

          <TextInput
            placeholder="₹ Enter Amount"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#666"
          />

          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>✅ Please verify the mobile number and amount before confirming.</Text>
          <Text style={styles.infoText}>💡 Instant money transfer with no hidden charges.</Text>
          <Text style={styles.infoText}>🔄 Transfers are processed 24/7, including weekends and holidays.</Text>
          <Text style={styles.infoText}>💳 Supports UPI, bank transfer, and wallet payments.</Text>
        </View>
      </View>
    </View>
  );
};

export default ToMobilePay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
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
  backButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
    marginTop: 15,
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
    backgroundColor: '#004080',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: 'white',
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
