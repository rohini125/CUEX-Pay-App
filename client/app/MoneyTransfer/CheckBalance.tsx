


//////////////// with correct final backend ///////////////////////////////



import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import icons from react-icons
import { API_URL } from '@env';

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
      .get(`${ API_URL }/api/getaccounts?emailorphone=${emailOrPhone}`)
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error('Error fetching accounts:', err));
  }, [emailOrPhone]);

  const handleAccountSelect = () => {
    if (!selectedAccount) return;

    axios
      .get(`${ API_URL }/api/account/${selectedAccount}/balance`)
      .then((res) => setBalance(res.data.balance))
      .catch((err) => console.error('Error fetching balance:', err));
  };

  const handleDeposit = () => {
    if (!selectedAccount || !depositAmount) return;

    axios
      .post(`${ API_URL }/api/account/${selectedAccount}/deposit`, {
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
        <StatusBar backgroundColor="#004080" barStyle="light-content" />
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
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
              <TouchableOpacity activeOpacity={0.7} style={styles. ButtonDeposit} onPress={handleDeposit}>
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
    // padding: 20,
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  header: {
    // backgroundColor:'#004080',
    // flexDirection: 'row',
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
  picker: {
    // marginVertical: 10,
    marginTop:50,
    margin:15,
    backgroundColor: '#f2f2f2',
  },
  input: {
    marginVertical: 15,
    // marginHorizontal: 15,
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
    marginTop:10,
    marginHorizontal:15,
  },
  
  depositSection: {
    // marginTop: 20,
    marginHorizontal: 15,
  },  
  resultContainer: {
    marginTop: 20,
  },
  ButtonDeposit: {
    backgroundColor: '#004080',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop:8,
  },
  Button: {
    backgroundColor: '#004080',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    margin:15,
  },
  ButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CheckBalanceScreen;



