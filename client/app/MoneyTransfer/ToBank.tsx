
// /////////////// code - 1 ////////////////////

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// import BankAccount from './BankAccount';

// type PaymentType = 'bank';

// const ToBankPay = () => {
//   const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('bank'); // Default to 'bank'
//   const router = useRouter();

//   const handleSelection = (paymentType: PaymentType) => {
//     setSelectedPaymentType(paymentType);
//   };

//   return (
//     <View style={styles.container}>
//          <StatusBar backgroundColor="#004080" barStyle="light-content"  />
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Send Money</Text>
//       </View>

//       {/* Payment Options */}
//       <View style={styles.optionsContainer}>
//         <TouchableOpacity 
//           style={[styles.optionButton, selectedPaymentType === 'bank' && styles.selectedOption]}
//           onPress={() => handleSelection('bank')}
//         >
//           <Text style={[styles.optionText, selectedPaymentType === 'bank' && styles.selectedoptionText]}>
//             Bank Account
//           </Text>
//         </TouchableOpacity>
       
//       </View>

//       {/* Display content based on selection */}
//       {selectedPaymentType === 'bank' && <BankAccount />}
//     </View>
//   );
// };

// export default ToBankPay;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingTop: 20,
//     // backgroundColor: '#F4F6F9',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#004080',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginLeft: 10,
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     backgroundColor: '#EAF0FB',
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     shadowOpacity: 0.3,
//     shadowColor: 'rgba(0,0,0,0.5)',
//     elevation: 2,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },  
//   optionText: {
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//   },
//   selectedoptionText: {
//     color: 'black',
//     fontWeight: '600',
//   },
//   selectedOption: {
//     borderBottomWidth: 2,
//     borderBottomColor: 'black',
//     color: 'black',
//   },
//   optionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#004080',
//     borderRadius: 12,
//     alignItems: 'center',
//     paddingVertical: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });




/////////////// code - 1 ////////////////////



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '@env';

const BankAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  // const [balance, setBalance] = useState<number | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  type Account = {
    _id: string;
    bankName: string;
    accountNumber: string;
    balance: number;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmailOrPhone = await AsyncStorage.getItem('emailOrPhone');
        if (storedEmailOrPhone) {
          setEmailOrPhone(storedEmailOrPhone);
        }
      } catch (error) {
        console.error('Failed to load email or phone from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!emailOrPhone) return;

    axios
      .get(`${ API_URL }/api/getaccounts?emailorphone=${emailOrPhone}`)
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error('Error fetching accounts:', err));
  }, [emailOrPhone]);

  const handleConfirm = async () => {
    if (!selectedAccount || !accountNumber || !ifscCode || !amount) {
      alert('Please fill all the fields');
      return;
    }
    // BankAccount.tsx:
  console.log({
    fromAccountId: selectedAccount,
  toAccountNumber: accountNumber,
  ifscCode: ifscCode,
  amount: amount});

  
    try {
      const response = await axios.post(`${ API_URL }/bank/transfer`, {
        fromAccountId: selectedAccount,
        toAccountNumber: accountNumber,
        ifscCode:ifscCode,
        amount: parseFloat(amount),
      });
  
      console.log("Transfer response:", response);
      if (response.data.success) {
        router.push({
          pathname: '/MoneyTransfer/banksuccess',
          params: { accountNumber, ifscCode, amount },
        });
      } else {
        alert(response.data.message || 'Transfer failed');
      }
    } catch (error) {
      console.error('Transfer API error:', error);
      alert('An error occurred while transferring money.');
    }
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
      <View style={styles.subContainer}>
        <Picker
          selectedValue={selectedAccount}
          onValueChange={(itemValue) => setSelectedAccount(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Select Your Account --" value="" />
          {accounts.map((acc) => (
            <Picker.Item
              key={acc._id}
              label={`${acc.bankName} - ${acc.accountNumber}`}
              value={acc._id}
            />
          ))}
        </Picker>
        <Text style={styles.text}>Recipient Account Details</Text>
        <View style={styles.card}>
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

        {/* User Information */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>💡 Ensure that the IFSC code is correct for smooth transactions.</Text>
          {/* <Text style={styles.infoText}>🔒 Your account details are encrypted and secure.</Text> */}
          {/* <Text style={styles.infoText}>⚠️ Double-check your account number before proceeding.</Text> */}
          <Text style={styles.infoText}>📌 Transactions may take a few minutes to reflect in your bank account.</Text>
        </View>
      </View>
    </View>
  );
};

export default BankAccount;

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
  subContainer: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    // padding: 20,
    padding:14,
  },
  picker: {
    // marginVertical: 10,
    marginBottom:8,
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
  },
  card: {
    // backgroundColor: '#E6F0FF',
    backgroundColor:'#FFFFFF' ,
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
    fontSize: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    width: '100%',
    height: 54,
    backgroundColor: '#004080',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
