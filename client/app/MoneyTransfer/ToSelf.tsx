////////////////// code -1 ///////////////////////////////

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert, StatusBar } from 'react-native';
// import { useRouter } from 'expo-router';
// import { AntDesign } from '@expo/vector-icons';

// // Define the type for bank accounts
// type BankAccount = {
//   bankName: string;
//   accountNumber: string;
// };

// const SelfAccountPage = () => {
//   const router = useRouter();
//   const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
//   const [bankName, setBankName] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const [amount, setAmount] = useState('');
//   const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

//   const handleAddBankAccount = () => {
//     if (bankName && accountNumber) {
//       setBankAccounts([...bankAccounts, { bankName, accountNumber }]);
//       setBankName('');
//       setAccountNumber('');
//       Alert.alert('Success', 'Bank account added successfully!');
//     } else {
//       Alert.alert('Error', 'Please enter both bank name and account number.');
//     }
//   };

//   const handleTransferMoney = () => {
//     if (selectedAccount && amount) {
//       Alert.alert(
//         'Success',
//         `Transferred ₹${amount} to ${selectedAccount.bankName} (Account: ${selectedAccount.accountNumber})`
//       );
//       setAmount('');
//       setSelectedAccount(null);
//     } else {
//       Alert.alert('Error', 'Please select a bank account and enter the amount.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#004080" barStyle="light-content" />
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => router.push('/front')}>
//           <AntDesign name="arrowleft" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Self Account</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Add Bank Account</Text>
//         <TextInput placeholder="Bank Name" value={bankName} onChangeText={setBankName} style={styles.input} />
//         <TextInput placeholder="Account Number" value={accountNumber} onChangeText={setAccountNumber} style={styles.input} keyboardType="numeric" />
//         <TouchableOpacity style={styles.button} onPress={handleAddBankAccount}>
//           <Text style={styles.buttonText}>Add Bank</Text>
//         </TouchableOpacity>
//       </View>

//       {bankAccounts.length > 0 && (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Your Bank Accounts</Text>
//           <FlatList
//             data={bankAccounts}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={[styles.bankAccount, selectedAccount === item && { borderColor: '#004080' }]}
//                 onPress={() => setSelectedAccount(item)}>
//                 <Text style={styles.bankText}>{item.bankName}</Text>
//                 <Text style={styles.bankText}>A/C: {item.accountNumber}</Text>
//               </TouchableOpacity>
//             )}
//             ListEmptyComponent={<Text style={styles.noAccount}>No accounts added yet.</Text>}
//           />
//         </View>
//       )}

//       {bankAccounts.length > 0 && (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Transfer Money</Text>
//           <TextInput placeholder="Amount (₹)" value={amount} onChangeText={setAmount} style={styles.input} keyboardType="numeric" />
//           <TouchableOpacity style={styles.button} onPress={handleTransferMoney}>
//             <Text style={styles.buttonText}>Transfer</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F6F9',
//     // paddingTop: 40,
//     // paddingHorizontal: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#004080',
//     padding: 15,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   section: {
//     padding:10,
//     margin: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#004080',
//     padding: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   bankAccount: {
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   bankText: {
//     fontSize: 16,
//   },
//   noAccount: {
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default SelfAccountPage;



////////////////// with backend ////////////////////////////


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Import icons from react-icons
import { useRouter } from 'expo-router';

interface Account {
  id: number;
  bankName: string;
  accountNumber: string;
  emailorphone: string;
}

const SelfAccount = () => {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [emailorphone, setEmailOrPhone] = useState<string | null>(null);

  useEffect(() => {
    const getUserIdentifier = async () => {
      try {
        const value = await AsyncStorage.getItem('emailOrPhone');
        if (value) {
          setEmailOrPhone(value);
          fetchAccounts(value);
        } else {
          console.log('No emailOrPhone found in AsyncStorage.');
        }
      } catch (error) {
        console.log('Error reading emailOrPhone from AsyncStorage:', error);
      }
    };

    getUserIdentifier();
  }, []);

 


  // Fetch user-specific accounts from backend
  const fetchAccounts = async (identifier: string) => {
    try {
      const response = await fetch(`http://192.168.52.190:7000/api/getaccounts?emailorphone=${identifier}`);
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.log('Error fetching accounts:', error);
    }
  };

  // Add new account to backend and update list
  const addAccount = async () => {
    if (!emailorphone) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    const trimmedBank = bankName.trim().toLowerCase();
    const userAccounts = accounts.filter(acc => acc.emailorphone === emailorphone);
    const alreadyExists = userAccounts.some(
      acc => acc.bankName.trim().toLowerCase() === trimmedBank
    );

    if (alreadyExists) {
      Alert.alert('Account Exists', 'Only one account per bank is allowed.');
      return;
    }

    if (bankName && accountNumber) {
      const newAccount: Omit<Account, 'id'> = {
        bankName,
        accountNumber,
        emailorphone,
      };

      try {
        const response = await fetch('http://192.168.52.190:7000/api/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAccount),
        });

        if (response.ok) {
          const savedAccount = await response.json();
          setAccounts(prev => [...prev, savedAccount]);
          setBankName('');
          setAccountNumber('');
        } else {
          Alert.alert('Error', 'Failed to save account.');
        }
      } catch (error) {
        console.log('Error saving account:', error);
        Alert.alert('Error', 'Network error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#004080" barStyle="light-content" />
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Your Bank Account</Text>
      </View>
      {/* <Text style={styles.heading}>Add Your Bank Account</Text> */}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Bank Name"
          value={bankName}
          onChangeText={setBankName}
        />

        <TextInput
          style={styles.input}
          placeholder="Account Number"
          keyboardType="numeric"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />

        <TouchableOpacity style={styles.button} onPress={addAccount}>
          <Text style={styles.buttonText}>Add Account</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeading}>Your Accounts</Text>

      <FlatList
        data={accounts.filter(acc => acc.emailorphone === emailorphone)}
        // keyExtractor={(item) => item.id.toString()}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.accountBox}>
            <Text style={styles.accountText}>{item.bankName}</Text>
            <Text style={styles.numberText}>A/C: {item.accountNumber}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SelfAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    // padding: 20,
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
  },
  // heading: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   marginBottom: 15,
  // },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    // marginTop: 25,
    margin: 15,
  },
  inputContainer:{
    marginVertical:25,
  },
  input: { 
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#0D47A1',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal:10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  accountBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom:6,
    
  },
  accountText: {
    fontSize: 16,
    fontWeight: '500',
  },
  numberText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
