// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import BankAccount from './BankAccount';
// import UpiId from './UpiId';
// import UpiNumber from './UpiNumber';

// type PaymentType = 'bank' | 'upiId' | 'upiNumber';

// const ToBankPay = () => {
//   const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('bank'); // Default to 'bank'
//   const router = useRouter();

//   const handleSelection = (paymentType: PaymentType) => {
//     setSelectedPaymentType(paymentType);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
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
//         <TouchableOpacity 
//           style={[styles.optionButton, selectedPaymentType === 'upiId' && styles.selectedOption]}
//           onPress={() => handleSelection('upiId')}
//         >
//           <Text style={[styles.optionText, selectedPaymentType === 'upiId' && styles.selectedoptionText]}>
//             UPI ID
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.optionButton, selectedPaymentType === 'upiNumber' && styles.selectedOption]}
//           onPress={() => handleSelection('upiNumber')}>
//           <Text style={[styles.optionText, selectedPaymentType === 'upiNumber' && styles.selectedoptionText]}>
//             UPI Number
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Display content based on selection */}
//       {selectedPaymentType === 'bank' && <BankAccount />}
//       {selectedPaymentType === 'upiId' && <UpiId />}
//       {selectedPaymentType === 'upiNumber' && <UpiNumber />}
//     </View>
//   );
// };

// export default ToBankPay;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     // backgroundColor: '#f9f9f9',
//     backgroundColor: '#ADD8E6',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginLeft:10,
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     backgroundColor: '#E6F2FA',
//     paddingVertical: 10, // Horizontal padding remove kela
//     paddingHorizontal: 14,
//     shadowOpacity: 0.3,
//     shadowColor: 'rgba(0,0,0,0.5)',
//     elevation: 2,
//     alignItems: 'center',
//     justifyContent: 'space-between', // Buttons spacing maintain honar
//   },  
//   optionText: {
//     fontSize: 14,
//     // color: '#007BFF',
//     color: '#555',
//     // fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   selectedoptionText: {
//     color:'black',
//     // fontWeight: 'bold',
//     fontWeight: '600',
//   },
//   selectedOption: {
//     // textDecorationLine: 'underline',
//     borderBottomWidth: 2, // Add underline
//     borderBottomColor: 'black', // Set underline color to black
//     color: 'black',
//   },
//    optionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,

//     borderRadius: 8,
//     alignItems: 'center',
//   }, 
// });




// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useRouter } from 'expo-router';

// // import BankAccount from './BankAccount';
// // import UpiId from './UpiId';
// // import UpiNumber from './UpiNumber';

// // type PaymentType = 'bank' | 'upiId' | 'upiNumber';

// // const ToBankPay = () => {
// //   const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('bank'); // Default to 'bank'
// //   const router = useRouter();

// //   const handleSelection = (paymentType: PaymentType) => {
// //     setSelectedPaymentType(paymentType);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
// //           <Ionicons name="arrow-back" size={24} color="#333" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerText}>Send Money</Text>
// //       </View>

// //       {/* Payment Options */}
// //       <View style={styles.optionsContainer}>
// //         <TouchableOpacity onPress={() => handleSelection('bank')}>
// //           <Text style={[styles.optionText, selectedPaymentType === 'bank' && styles.selectedOption ,styles.activeoptionTextText]}>
// //             Bank Account
// //           </Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity onPress={() => handleSelection('upiId')}>
// //           <Text style={[styles.optionText, selectedPaymentType === 'upiId' && styles.selectedOption]}>
// //             UPI ID
// //           </Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity onPress={() => handleSelection('upiNumber')}>
// //           <Text style={[styles.optionText, selectedPaymentType === 'upiNumber' && styles.selectedOption]}>
// //             UPI Number
// //           </Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Display content based on selection */}
// //       {selectedPaymentType === 'bank' && <BankAccount />}
// //       {selectedPaymentType === 'upiId' && <UpiId />}
// //       {selectedPaymentType === 'upiNumber' && <UpiNumber />}
// //     </View>
// //   );
// // };

// // export default ToBankPay;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     // backgroundColor: '#f9f9f9',
// //     backgroundColor: '#ADD8E6',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 30,
// //   },
// //   backButton: {
// //     marginRight: 10,
// //   },
// //   headerText: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#333',
// //   },
// //   optionsContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 20,
// //     backgroundColor: '#E6F2FA',
// //     padding: 10,
// //     shadowOpacity: 0.1,
// //     shadowColor: 'rgba(0,0,0,0.5)',
// //     elevation: 2,
// //   },
// //   optionText: {
// //     fontSize: 18,
// //     // color: '#007BFF',
// //     color: '#555',
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   activeoptionTextText: {
// //     color: 'black', // Text color for active tab
// //     fontWeight: '600',
// //   },
// //   selectedOption: {
// //     // textDecorationLine: 'underline',
// //     borderBottomWidth: 2, // Add underline
// //     borderBottomColor: 'black', // Set underline color to black
// //   },
// // });


