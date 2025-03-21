// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';

// const BankAccount = () => {
//   const [accountNumber, setAccountNumber] = useState('');
//   const [ifscCode, setIfscCode] = useState('');
//   const [amount, setAmount] = useState('');
//   const router = useRouter();

//   const handleConfirm = () => {
//     // Navigate to BankSuccess screen with details
//     router.push({
//       pathname: '/MoneyTransfer/banksuccess',
//       params: { accountNumber, ifscCode, amount },
//     });
//   };

//   return (
//     <View style={styles.container}>

//       <Text style={styles.text}>Bank Account Details</Text>
//       <View style={styles.card}>
//         {/* Input for Bank Account Number */}
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Bank Account"
//           value={accountNumber}
//           onChangeText={setAccountNumber}
//           keyboardType="number-pad"
//         />

//         {/* Input for IFSC Code */}
//         <TextInput
//           style={styles.input}
//           placeholder="Enter IFSC Code"
//           value={ifscCode}
//           onChangeText={setIfscCode}
//         />

//         {/* Input for Amount */}
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Amount"
//           value={amount}
//           onChangeText={setAmount}
//           keyboardType="number-pad"
//         />

//         {/* Confirm Button */}
//         <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleConfirm}>
//           <Text style={styles.buttonText}>Confirm</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default BankAccount;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#F4F6F9',
//     padding: 20,
//   },
//   text: {
//     fontSize: 18,
//     textAlign:'center',
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: '#FFFFFF', 
//     borderRadius: 15,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 5,
//   },
//   input: {
//     backgroundColor: '#F9FAFC',
//     borderRadius: 10,
//     height: 55,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     fontSize: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#004080',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });


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
        <Text style={styles.infoText}>🔒 Your account details are encrypted and secure.</Text>
        {/* <Text style={styles.infoText}>⚠️ Double-check your account number before proceeding.</Text> */}
        <Text style={styles.infoText}>📌 Transactions may take a few minutes to reflect in your bank account.</Text>
      </View>
    </View>
  );
};

export default BankAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
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
    backgroundColor: '#004080',
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
