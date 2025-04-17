


//////////////// with correct final backend ///////////////////////////////



import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import icons from react-icons

type Account = {
  _id: string;
  bankName: string;
  accountNumber: string;
  balance: number;
};

const CheckBalanceScreen: React.FC = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [balance, setBalance] = useState<number | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>('');

  const [showDepositSection, setShowDepositSection] = useState(false);

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
      .get(`http://192.168.52.190:7000/api/getaccounts?emailorphone=${emailOrPhone}`)
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error('Error fetching accounts:', err));
  }, [emailOrPhone]);

  const handleAccountSelect = () => {
    if (!selectedAccount) return;

    axios
      .get(`http://192.168.52.190:7000/api/account/${selectedAccount}/balance`)
      .then((res) => setBalance(res.data.balance))
      .catch((err) => console.error('Error fetching balance:', err));
  };

  const handleDeposit = () => {
    if (!selectedAccount || !depositAmount) return;

    axios
      .post(`http://192.168.52.190:7000/api/account/${selectedAccount}/deposit`, {
        amount: parseFloat(depositAmount),
      })
      .then((res) => {
        setBalance(res.data.newBalance);
        Alert.alert('Success', 'Amount deposited successfully!');
        setDepositAmount('');
      })
      .catch((err) => console.error('Error depositing amount:', err));
  };

  if (!emailOrPhone) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>
          ❌ Email or phone not provided. Please log in or sign up first.
        </Text>
      </View>
    );
  }

  
  return (
    <View style={styles.container}>

      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Check Balance</Text>
      </View>
      {/* <Text style={styles.label}>Select Account:</Text> */}
      <Picker
        selectedValue={selectedAccount}
        onValueChange={(itemValue) => setSelectedAccount(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="-- Select Account --" value="" />
        {accounts.map((acc) => (
          <Picker.Item
            key={acc._id}
            label={`${acc.bankName} - ${acc.accountNumber}`}
            value={acc._id}
          />
        ))}
      </Picker>

      {/* <Button style={styles.input} title="Check Balance" onPress={handleAccountSelect} /> */}

      <TouchableOpacity activeOpacity={0.7} style={styles.Button} onPress={handleAccountSelect} >
        <Text style={styles.ButtonText}>Check Balance</Text>
      </TouchableOpacity>

      {balance !== null && (
        <View style={styles.resultContainer}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceText}>Current Balance: ₹{balance}</Text>
            <TouchableOpacity onPress={() => setShowDepositSection(!showDepositSection)}>
              <Ionicons name="add-circle-outline" size={28} color="#007bff" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>

          {showDepositSection && (
            <View style={styles.depositSection}>
              <TextInput
                placeholder="Enter Amount to Deposit"
                keyboardType="numeric"
                value={depositAmount}
                onChangeText={setDepositAmount}
                style={styles.input}
              />
              <TouchableOpacity activeOpacity={0.7} style={styles.Button} onPress={handleDeposit}>
                <Text style={styles.ButtonText}>Deposit Amount</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  picker: {
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  input: {
    marginVertical: 15,
    width:'100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize:14,
  },
  balanceText: {
    textAlign:'center',
    margin: 15,
    fontSize: 18,
    fontWeight: '600',
    color: 'green',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  
  depositSection: {
    marginTop: 20,
  },  
  resultContainer: {
    marginTop: 20,
  },
  Button: {
    backgroundColor: '#004080',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  ButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CheckBalanceScreen;




//////////////////////// code -1 /////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Alert
// } from "react-native";
// import axios from "axios";
// import { FontAwesome } from "@expo/vector-icons";
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from "expo-router";

// // const API_URL = "http://your-server-ip:5000"; // Replace with your backend IP

// const CheckBalance = () => {
//   const navigation = useNavigation();
//   const [emailOrPhone, setemailOrPhone] = useState('');
//   const [balance, setBalance] = useState(0);
//   const [balanceVisible, setBalanceVisible] = useState(false);
//   const [depositAmount, setDepositAmount] = useState("");

//   useEffect(() => {
//     const fetchUserAndBalance = async () => {
//       try {
//         const storedValue = await AsyncStorage.getItem('emailOrPhone');
//         if (storedValue) {
//           setemailOrPhone(storedValue);
//           fetchBalance(storedValue);
//         } else {
//           Alert.alert("Error", "User not logged in.");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching userId:", error);
//       }
//     };

//     fetchUserAndBalance();
//   }, []);

//   // const fetchBalance = async (id:any) => {
//   //   try {
//   //     const response = await axios.get(`http://192.168.52.190:7000/balance/getbalance/${id}`);
//   //     setBalance(response.data.balance);
//   //   } catch (error) {
//   //     console.error("Error fetching balance:", error);
//   //   }
//   // };

//   const fetchBalance = async (id: any) => {
//     try {
//       const response = await axios.get(`http://192.168.52.190:7000/balance/getbalance`, {
//         params: { emailOrPhone: id },
//       });
//       setBalance(response.data.balance);
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     }
//   };
  
//   const handleDeposit = async () => {
//     const amount = parseFloat(depositAmount);
//     if (isNaN(amount) || amount <= 0) {
//       alert("Please enter a valid amount.");
//       return;
//     }

//     try {
//       const response = await axios.post(`http://192.168.52.190:7000/balance/depositeBalance`, { emailOrPhone, amount });
//       setBalance(response.data.balance);
//       setDepositAmount("");
//       alert(`₹${amount} successfully deposited!`);
//     } catch (error) {
//       console.error("Error updating balance:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#004080" barStyle="light-content" />
//       <View style={styles.headerContainer}>
//         {/* <TouchableOpacity onPress={() => navigation.goBack()}> */}
//         <TouchableOpacity onPress={() => router.push("/front")}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Check Balance</Text>
//       </View>
//       <View style={styles.contentContainer}>
//         <Text style={styles.description}>
//           Check your current balance and add money to your wallet.
//         </Text>
//         {!balanceVisible ? (
//           <TouchableOpacity style={styles.button} onPress={() => setBalanceVisible(true)}>
//             <FontAwesome name="eye" size={20} color="#fff" />
//             <Text style={styles.buttonText}>Check Balance</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.balanceContainer}>
//             <Text style={styles.label}>Available Balance</Text>
//             <Text style={styles.balance}>₹{balance.toFixed(2)}</Text>
//             <Text style={styles.label}>Add Money</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter amount (e.g. 500)"
//               keyboardType="numeric"
//               value={depositAmount}
//               onChangeText={setDepositAmount}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleDeposit}>
//               <FontAwesome name="plus" size={20} color="#fff" />
//               <Text style={styles.buttonText}>Deposit</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default CheckBalance;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     alignItems: "center",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#004080",
//     width: "100%",
//     padding: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff",
//     marginLeft: 10,
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "90%",
//   },
//   description: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   button: {
//     flexDirection: "row",
//     backgroundColor: "#004080",
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     alignItems: "center",
//     gap: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   balanceContainer: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 15,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//     width: "100%",
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 5,
//   },
//   balance: {
//     fontSize: 34,
//     fontWeight: "bold",
//     color: "#543250",
//     marginBottom: 10,
//   },
//   input: {
//     width: "80%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     textAlign: "center",
//     marginBottom: 15,
//   },
// });

