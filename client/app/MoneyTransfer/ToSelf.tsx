



import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons'; // Icon library for React Native

// Define the type for bank accounts
type BankAccount = {
  bankName: string;
  accountNumber: string;
};

const SelfAccountPage = () => {
  const router = useRouter(); // Hook for Expo Router navigation

  // State to manage the list of added bank accounts
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

  // Function to add a new bank account
  const handleAddBankAccount = () => {
    if (bankName && accountNumber) {
      setBankAccounts([...bankAccounts, { bankName, accountNumber }]);
      setBankName('');
      setAccountNumber('');
      Alert.alert('Success', 'Bank account added successfully!');
    } else {
      Alert.alert('Error', 'Please enter both bank name and account number.');
    }
  };

  // Function to transfer money
  const handleTransferMoney = () => {
    if (selectedAccount && amount) {
      Alert.alert(
        'Success',
        `Transferred ₹${amount} to ${selectedAccount.bankName} (Account: ${selectedAccount.accountNumber})`
      );
      setAmount('');
      setSelectedAccount(null);
    } else {
      Alert.alert('Error', 'Please select a bank account and enter the amount.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/front')}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Self Account</Text>
      </View>
      {/* Add Bank Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Bank Account</Text>
        <TextInput
          placeholder="Bank Name"
          value={bankName}
          onChangeText={setBankName}
          style={styles.input}
        />
        <TextInput
          placeholder="Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          style={styles.input}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddBankAccount}>
          <Text style={styles.buttonText}>Add Bank</Text>
        </TouchableOpacity>
      </View>

      {/* Bank Account List */}
      {bankAccounts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Bank Accounts</Text>
          <FlatList
            data={bankAccounts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.bankAccount,
                  selectedAccount === item && { borderColor: '#007BFF' },
                ]}
                onPress={() => setSelectedAccount(item)}
              >
                <Text style={styles.bankText}>{item.bankName}</Text>
                <Text style={styles.bankText}>A/C: {item.accountNumber}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.noAccount}>No accounts added yet.</Text>}
          />
        </View>
      )}

      {/* Transfer Money Section */}
      {bankAccounts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transfer Money</Text>
          <TextInput
            placeholder="Amount (₹)"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleTransferMoney}>
            <Text style={styles.buttonText}>Transfer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    paddingTop: 40,
    paddingHorizontal: 16,
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
    color: '#222',
    marginLeft:10,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center',
    alignItems:'center',
  },
  input: {
    // borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bankAccount: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  bankText: {
    fontSize: 16,
  },
  noAccount: {
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SelfAccountPage;
