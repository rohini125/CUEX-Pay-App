
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const CheckBalance = () => {
//   const [pin, setPin] = useState("");
//   const [isPinCorrect, setIsPinCorrect] = useState(false);
//   const [balanceVisible, setBalanceVisible] = useState(false);
//   const [upiPinSet, setUpiPinSet] = useState(false);

//   // Check if the UPI PIN is already set when the component mounts
//   useEffect(() => {
//     const checkPinStatus = async () => {
//       const storedPin = await SecureStore.getItemAsync("upiPin");
//       if (storedPin) {
//         setUpiPinSet(true);  // If PIN is set, allow balance checking
//       }
//     };
//     checkPinStatus();
//   }, []);

//   // Handle checking balance
//   const handleCheckBalance = async () => {
//     const storedPin = await SecureStore.getItemAsync("upiPin");

//     if (pin === storedPin) {
//       setBalanceVisible(true);
//     } else {
//       alert("Invalid UPI PIN");
//     }
//   };

//   // Handle setting a new UPI PIN
//   const handleSetPin = async () => {
//     if (pin.length === 4) {
//       // Save the PIN securely
//       await SecureStore.setItemAsync("upiPin", pin);
//       alert("UPI PIN has been set!");
//       setUpiPinSet(true); // Update state to allow balance checking
//     } else {
//       alert("Please enter a valid 4-digit PIN");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>Check Balance</Text>
//       </View>

//       {!upiPinSet ? (
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Set Your UPI PIN</Text>
//           <TextInput
//             style={styles.input}
//             secureTextEntry
//             placeholder="Enter 4-digit UPI PIN"
//             maxLength={4}
//             value={pin}
//             onChangeText={setPin}
//           />
//           <TouchableOpacity style={styles.button} onPress={handleSetPin}>
//             <Text style={styles.buttonText}>Set PIN</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         !balanceVisible ? (
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Enter UPI PIN</Text>
//             <TextInput
//               style={styles.input}
//               secureTextEntry
//               placeholder="Enter UPI PIN"
//               maxLength={4}
//               keyboardType="numeric"
//               value={pin}
//               onChangeText={setPin}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleCheckBalance}>
//               <Text style={styles.buttonText}>Check Balance</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.balanceCard}>
//             <Text style={styles.label}>Your Account Balance</Text>
//             <Text style={styles.balance}>₹12,345.67</Text>
//             <Image
//               source={{
//                 uri: "https://img.icons8.com/ios-filled/50/000000/wallet--v1.png",
//               }}
//               style={styles.walletIcon}
//             />
//           </View>
//         )
//       )}
//     </View>
//   );
// };

// export default CheckBalance;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f8ff",
//     padding: 20,
//     justifyContent: "center",
//   },
//   headerContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#4a90e2",
//   },
//   inputContainer: {
//     alignItems: "center",
//   },
//   label: {
//     fontSize: 18,
//     color: "#888",
//     marginBottom: 10,
//   },
//   input: {
//     width: "80%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#4caf50",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   balanceCard: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 15,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//     marginBottom: 30,
//   },
//   balance: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: "#2b8a3e",
//     marginBottom: 10,
//   },
//   walletIcon: {
//     width: 50,
//     height: 50,
//   },
// });


///////////////// code - 1 //////////////////////

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const CheckBalance = () => {
//   const [pin, setPin] = useState("");
//   const [isPinCorrect, setIsPinCorrect] = useState(false);
//   const [balanceVisible, setBalanceVisible] = useState(false);
//   const [upiPinSet, setUpiPinSet] = useState(false);
//   const [balance, setBalance] = useState(0); // Added balance state
//   const [depositAmount, setDepositAmount] = useState("");

//   // Check if UPI PIN is set and fetch balance
//   useEffect(() => {
//     const fetchDetails = async () => {
//       const storedPin = await SecureStore.getItemAsync("upiPin");
//       const storedBalance = await SecureStore.getItemAsync("balance");

//       if (storedPin) {
//         setUpiPinSet(true);
//       }
//       if (storedBalance) {
//         setBalance(parseFloat(storedBalance)); // Convert string to number
//       }
//     };
//     fetchDetails();
//   }, []);

//   // Handle checking balance
//   const handleCheckBalance = async () => {
//     const storedPin = await SecureStore.getItemAsync("upiPin");

//     if (pin === storedPin) {
//       setBalanceVisible(true);
//     } else {
//       alert("Invalid UPI PIN");
//     }
//   };

//   // Handle setting a new UPI PIN
//   const handleSetPin = async () => {
//     if (pin.length === 4) {
//       await SecureStore.setItemAsync("upiPin", pin);
//       alert("UPI PIN has been set!");
//       setUpiPinSet(true);
//     } else {
//       alert("Please enter a valid 4-digit PIN");
//     }
//   };

//   // Handle deposit
//   const handleDeposit = async () => {
//     const amount = parseFloat(depositAmount);
//     if (isNaN(amount) || amount <= 0) {
//       alert("Please enter a valid deposit amount");
//       return;
//     }

//     const newBalance = balance + amount;
//     await SecureStore.setItemAsync("balance", newBalance.toString());
//     setBalance(newBalance);
//     setDepositAmount(""); // Clear input
//     alert(`₹${amount} deposited successfully!`);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>Check Balance</Text>
//       </View>

//       {!upiPinSet ? (
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Set Your UPI PIN</Text>
//           <TextInput
//             style={styles.input}
//             secureTextEntry
//             placeholder="Enter 4-digit UPI PIN"
//             maxLength={4}
//             value={pin}
//             onChangeText={setPin}
//           />
//           <TouchableOpacity style={styles.button} onPress={handleSetPin}>
//             <Text style={styles.buttonText}>Set PIN</Text>
//           </TouchableOpacity>
//         </View>
//       ) : !balanceVisible ? (
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Enter UPI PIN</Text>
//           <TextInput
//             style={styles.input}
//             secureTextEntry
//             placeholder="Enter UPI PIN"
//             maxLength={4}
//             keyboardType="numeric"
//             value={pin}
//             onChangeText={setPin}
//           />
//           <TouchableOpacity style={styles.button} onPress={handleCheckBalance}>
//             <Text style={styles.buttonText}>Check Balance</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View>
//           <View style={styles.balanceCard}>
//             <Text style={styles.label}>Your Account Balance</Text>
//             <Text style={styles.balance}>₹{balance.toFixed(2)}</Text>
//             <Image
//               source={{
//                 uri: "https://img.icons8.com/ios-filled/50/000000/wallet--v1.png",
//               }}
//               style={styles.walletIcon}
//             />
//           </View>

//           {/* Deposit Section */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Deposit Amount</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter amount"
//               keyboardType="numeric"
//               value={depositAmount}
//               onChangeText={setDepositAmount}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleDeposit}>
//               <Text style={styles.buttonText}>Deposit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CheckBalance;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f8ff",
//     padding: 20,
//     justifyContent: "center",
//   },
//   headerContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#4a90e2",
//   },
//   inputContainer: {
//     alignItems: "center",
//   },
//   label: {
//     fontSize: 18,
//     color: "#888",
//     marginBottom: 10,
//   },
//   input: {
//     width: "80%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#4caf50",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   balanceCard: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 15,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//     marginBottom: 30,
//   },
//   balance: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: "#2b8a3e",
//     marginBottom: 10,
//   },
//   walletIcon: {
//     width: 50,
//     height: 50,
//   },
// });



///////////////  backend code /////////////////////////

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = "http://your-server-ip:5000"; // Replace with your backend IP

const CheckBalance = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState(0);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  useEffect(() => {
    const fetchUserAndBalance = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('emailOrPhone');
        if (storedValue) {
          setUserId(storedValue);
          fetchBalance(storedValue);
        } else {
          Alert.alert("Error", "User not logged in.");
        }
      } catch (error) {
        console.error("❌ Error fetching userId:", error);
      }
    };

    fetchUserAndBalance();
  }, []);

  const fetchBalance = async (id:any) => {
    try {
      const response = await axios.get(`http://192.168.52.190:7000/api/auth/login/balance/${id}`);
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post(`http://192.168.52.190:7000/api/auth/login/deposit`, { userId, amount });
      setBalance(response.data.balance);
      setDepositAmount("");
      alert(`₹${amount} successfully deposited!`);
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#004080" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Check Balance</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          Check your current balance and add money to your wallet.
        </Text>
        {!balanceVisible ? (
          <TouchableOpacity style={styles.button} onPress={() => setBalanceVisible(true)}>
            <FontAwesome name="eye" size={20} color="#fff" />
            <Text style={styles.buttonText}>Check Balance</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.balanceContainer}>
            <Text style={styles.label}>Available Balance</Text>
            <Text style={styles.balance}>₹{balance.toFixed(2)}</Text>
            <Text style={styles.label}>Add Money</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount (e.g. 500)"
              keyboardType="numeric"
              value={depositAmount}
              onChangeText={setDepositAmount}
            />
            <TouchableOpacity style={styles.button} onPress={handleDeposit}>
              <FontAwesome name="plus" size={20} color="#fff" />
              <Text style={styles.buttonText}>Deposit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CheckBalance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#004080",
    width: "100%",
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#004080",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  balanceContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  balance: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#543250",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 15,
  },
});




//////////////// with backend ///////////////////////////////

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar
// } from "react-native";
// import axios from "axios";
// import { FontAwesome } from "@expo/vector-icons";
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// const API_URL = "http://your-server-ip:5000";

// const CheckBalance = () => {
//     const navigation = useNavigation();
//     const userId = "user123";  // Replace with dynamic user ID
//     const [balance, setBalance] = useState(0);
//     const [balanceVisible, setBalanceVisible] = useState(false);
//     const [depositAmount, setDepositAmount] = useState("");

//     useEffect(() => {
//         fetchBalance();
//     }, []);

//     const fetchBalance = async () => {
//         try {
//             const response = await axios.get(`${API_URL}/balance/${userId}`);
//             setBalance(response.data.balance);
//         } catch (error) {
//             console.error("Error fetching balance:", error);
//         }
//     };

//     const handleDeposit = async () => {
//         const amount = parseFloat(depositAmount);
//         if (isNaN(amount) || amount <= 0) {
//             alert("Please enter a valid amount.");
//             return;
//         }

//         try {
//             const response = await axios.post(`${API_URL}/deposit`, { userId, amount });
//             setBalance(response.data.balance);
//             setDepositAmount("");
//             alert(`₹${amount} successfully deposited!`);
//         } catch (error) {
//             console.error("Error updating balance:", error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor="#004080" barStyle="light-content" />
//             <View style={styles.headerContainer}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Ionicons name="arrow-back" size={24} color="#fff" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerText}>Check Balance</Text>
//             </View>
//             <View style={styles.contentContainer}>
//                 <Text style={styles.description}>
//                     Check your current balance and add money to your wallet.
//                 </Text>
//                 {!balanceVisible ? (
//                     <TouchableOpacity style={styles.button} onPress={() => setBalanceVisible(true)}>
//                         <FontAwesome name="eye" size={20} color="#fff" />
//                         <Text style={styles.buttonText}>Check Balance</Text>
//                     </TouchableOpacity>
//                 ) : (
//                     <View style={styles.balanceContainer}>
//                         <Text style={styles.label}>Available Balance</Text>
//                         <Text style={styles.balance}>₹{balance.toFixed(2)}</Text>
//                         <Text style={styles.label}>Add Money</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter amount (e.g. 500)"
//                             keyboardType="numeric"
//                             value={depositAmount}
//                             onChangeText={setDepositAmount}
//                         />
//                         <TouchableOpacity style={styles.button} onPress={handleDeposit}>
//                             <FontAwesome name="plus" size={20} color="#fff" />
//                             <Text style={styles.buttonText}>Deposit</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             </View>
//         </View>
//     );
// };

// export default CheckBalance;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#f5f5f5",
//         alignItems: "center",
//     },
//     headerContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#004080",
//         width: "100%",
//         padding: 15,
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOpacity: 0.3,
//         shadowRadius: 5,
//         shadowOffset: { width: 0, height: 3 },
//     },
//     headerText: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: "#fff",
//         marginLeft: 10,
//     },
//     contentContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         width: "90%",
//     },
//     description: {
//         fontSize: 14,
//         color: "#666",
//         textAlign: "center",
//         marginBottom: 20,
//     },
//     button: {
//         flexDirection: "row",
//         backgroundColor: "#004080",
//         paddingVertical: 12,
//         paddingHorizontal: 30,
//         borderRadius: 25,
//         alignItems: "center",
//         gap: 10,
//         marginTop: 20,
//     },
//     buttonText: {
//         color: "#ffffff",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     balanceContainer: {
//         backgroundColor: "#ffffff",
//         padding: 20,
//         borderRadius: 15,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 5,
//         elevation: 5,
//         width: "100%",
//     },
//     label: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#333",
//         marginBottom: 5,
//     },
//     balance: {
//         fontSize: 34,
//         fontWeight: "bold",
//         color: "#543250",
//         marginBottom: 10,
//     },
//     input: {
//         width: "80%",
//         padding: 10,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 10,
//         textAlign: "center",
//         marginBottom: 15,
//     },
// });
