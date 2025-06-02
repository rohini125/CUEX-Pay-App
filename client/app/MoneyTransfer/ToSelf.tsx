

//////////////// with backend //////////////////

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, StatusBar, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Import icons from react-icons
import { useRouter } from 'expo-router';
import { API_URL } from '@env';

interface Account {
  id: number;
  bankName: string;
  accountNumber: string;
  ifscCode:String;
  emailorphone: string;
}

const SelfAccount = () => {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
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
      const response = await fetch(`${ API_URL }/api/getaccounts?emailorphone=${identifier}`);
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

    if (bankName && accountNumber && ifscCode) {
      const newAccount: Omit<Account, 'id'> = {
        bankName,
        accountNumber,
        ifscCode,
        emailorphone,
      };

      try {
        const response = await fetch(`${ API_URL }/api/accounts`, {
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
    <ScrollView style={styles.container}>
        <StatusBar backgroundColor={'#004080'} barStyle={'light-content'} />
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Your Bank Account</Text>
      </View>
      {/* <Text style={styles.heading}>Add Your Bank Account</Text> */}
      <View  style={styles.bodyContent}>
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

        <TextInput
          style={styles.input}
          placeholder="IFSC Code"
          value={ifscCode}
          onChangeText={setIfscCode}
        />
        <TouchableOpacity style={styles.button} onPress={addAccount}>
          <Text style={styles.buttonText}>Add Account</Text>
        </TouchableOpacity>

        <Text style={styles.subHeading}>Your Accounts</Text>

        <FlatList
          data={accounts.filter(acc => acc.emailorphone === emailorphone)}
          // keyExtractor={(item) => item.id.toString()}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.accountBox}>
              <Text style={styles.accountText}>{item.bankName}</Text>
              <Text style={styles.numberText}>A/C: {item.accountNumber}</Text>
              <Text style={styles.numberText}>IFSC Code: {item.ifscCode}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
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
    // flexDirection: 'row',
    // backgroundColor:'#004080',
    // alignItems: 'center',
    // marginBottom: 30,
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
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 10,
  },
  bodyContent:{
    marginTop:20,
    marginHorizontal:15,
  },
  input: { 
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#0D47A1',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  accountBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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

