
/////////////// code - 1 ////////////////////

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import BankAccount from './BankAccount';
import UpiId from './UpiId';

type PaymentType = 'bank' | 'upiId' ;

const ToBankPay = () => {
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('bank'); // Default to 'bank'
  const router = useRouter();

  const handleSelection = (paymentType: PaymentType) => {
    setSelectedPaymentType(paymentType);
  };

  return (
    <View style={styles.container}>
         <StatusBar backgroundColor="#004080" barStyle="light-content"  />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Send Money</Text>
      </View>

      {/* Payment Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, selectedPaymentType === 'bank' && styles.selectedOption]}
          onPress={() => handleSelection('bank')}
        >
          <Text style={[styles.optionText, selectedPaymentType === 'bank' && styles.selectedoptionText]}>
            Bank Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, selectedPaymentType === 'upiId' && styles.selectedOption]}
          onPress={() => handleSelection('upiId')}
        >
          <Text style={[styles.optionText, selectedPaymentType === 'upiId' && styles.selectedoptionText]}>
            UPI ID
          </Text>
        </TouchableOpacity>
       
      </View>

      {/* Display content based on selection */}
      {selectedPaymentType === 'bank' && <BankAccount />}
      {selectedPaymentType === 'upiId' && <UpiId />}
    </View>
  );
};

export default ToBankPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    // backgroundColor: '#F4F6F9',
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
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#EAF0FB',
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowOpacity: 0.3,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },  
  optionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  selectedoptionText: {
    color: 'black',
    fontWeight: '600',
  },
  selectedOption: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    color: 'black',
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
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
});
