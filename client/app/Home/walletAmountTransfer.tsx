
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TransferWalletScreenProps {
  emailOrPhone: string;
}

const TransferWalletScreen: React.FC<TransferWalletScreenProps> = ({ emailOrPhone }) => {
  const [receiver, setReceiver] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');

  const router = useRouter();

  const [emailOrPhoneLocal, setEmailOrPhoneLocal] = useState('');
  // const [currencies, setCurrencies] = useState<string[]>([]);
  

    useEffect(() => {
        const fetchEmailAndCurrencies = async () => {
      try {
        const stored = await AsyncStorage.getItem("emailOrPhone");
        setEmailOrPhoneLocal(stored || "");

        if (stored) {
          const response = await fetch(`${API_URL}/api/wallet/currencies?emailOrPhone=${stored}`);

          if (!response.ok) {
            console.error("Failed to fetch currencies", response.status);
            setAvailableCurrencies([]);
            return;
          }

          const data = await response.json();
          console.log("Fetched currencies:", data);

          if (!Array.isArray(data)) {
            console.warn("Currencies data missing or invalid");
            setAvailableCurrencies([]);
          } else {
            // प्रत्येक object मधून currency field घेऊन array तयार करतो
            setAvailableCurrencies(data.map((item: any) => item.currency));
          }
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };  
    fetchEmailAndCurrencies();
  }, []);

    useEffect(() => {
    if (availableCurrencies.length > 0 && !selectedCurrency) {
      setSelectedCurrency(availableCurrencies[0]);
    }
  }, [availableCurrencies]);

    const handleSend = async () => {
  if (!receiverEmail || !amount || !selectedCurrency) {
    Alert.alert("All fields are required");
    return;
  }

  if (receiverEmail === emailOrPhoneLocal) {
    Alert.alert("Receiver cannot be the same as sender");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/wallet/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: emailOrPhoneLocal,  // logged-in user
        receiver: receiverEmail,    // should be different user
        amount: parseFloat(amount),
        currency: selectedCurrency,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert('✅ Success', data.message || 'Transfer completed');
      alert('currency Transferd successfully');
      setReceiver('');
      setAmount('');
    } else {
      Alert.alert('❌ Error', data.message || 'Transfer failed');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Something went wrong');
  }
};


  const onBack = () => {
    router.push('/wallet');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar backgroundColor={'#004080'} barStyle={'light-content'} />
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton} hitSlop={10}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Transfer Wallet Currency</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
          {/* Currency Picker */}
          <View style={styles.pickerWrapper}>
           
            <Picker
                selectedValue={selectedCurrency}
                onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
                style={styles.picker}
              >
                {availableCurrencies.length > 0 ? (
                  availableCurrencies.map((currency: string) => (
                    <Picker.Item key={currency} label={currency} value={currency} />
                  ))
                ) : (
                  <Picker.Item label="No currencies available" value="" />
                )}
              </Picker>

          </View>

        <View style={styles.card}>
          {/* Input fields */}
          <TextInput
            style={styles.input}
            placeholder="Receiver Email or Phone"
            placeholderTextColor="#888"
            // value={receiver}
            // onChangeText={setReceiver}
            value={receiverEmail}
            onChangeText={setReceiverEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity style={styles.button} onPress={handleSend} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Send Currency</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>✅ Please verify the mobile number and amount before confirming.</Text>
          <Text style={styles.infoText}>💡 Instant money transfer with no hidden charges.</Text>
          <Text style={styles.infoText}>💳 Supports wallet payments.</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TransferWalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
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
    padding: 5,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    justifyContent: 'center',
    margin: 18,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ccd6dd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#004080',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 24,
    backgroundColor: '#d9e8ff',
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#004080',
    marginBottom: 8,
    lineHeight: 20,
  },
  pickerWrapper: {
    borderWidth: 0.5,
    borderColor: '#ccd6dd',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
});