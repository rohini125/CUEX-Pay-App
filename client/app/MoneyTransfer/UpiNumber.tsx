// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';

// const UpiNumber = () => {
//   const [upiNumber, setUpiNumber] = useState('');
//   const [amount, setAmount] = useState('');
//   const router = useRouter();

//   const handleConfirm = () => {
//     // Navigate to the success page with parameters
//     router.push({
//       pathname: '/MoneyTransfer/upiNumbersuccess',
//       params: {
//         upiNumber,
//         amount,
//         dateTime: new Date().toLocaleString(),
//       },
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Enter Payment Details</Text>

//       <View style={styles.card}>
//         {/* UPI Number Input */}
//         <TextInput
//           style={styles.input}
//           placeholder="Enter UPI Number"
//           value={upiNumber}
//           onChangeText={setUpiNumber}
//           keyboardType="numeric"
//         />

//         {/* Amount Input */}
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Amount"
//           value={amount}
//           onChangeText={setAmount}
//           keyboardType="numeric"
//         />

//         {/* Confirm Button */}
//         <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleConfirm}>
//           <Text style={styles.buttonText}>Confirm</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default UpiNumber;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // backgroundColor: '#f9f9f9',
//     backgroundColor:'#F4F6F9',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     alignSelf:'center',
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
//     // backgroundColor: '#007BFF',
//     backgroundColor:'#004080',
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

      <View style={styles.card}>
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

      {/* User Helpful Information */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>💡 Double-check your UPI number to avoid incorrect transactions.</Text>
        <Text style={styles.infoText}>🔒 All transactions are securely processed with encryption.</Text>
        <Text style={styles.infoText}>⏳ Transactions may take a few minutes to be processed.</Text>
        <Text style={styles.infoText}>📞 If your payment fails, please contact your bank or UPI provider.</Text>
      </View>
    </View>
  );
};

export default UpiNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F4F6F9',
    padding: 20,
  },
  heading: {
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
