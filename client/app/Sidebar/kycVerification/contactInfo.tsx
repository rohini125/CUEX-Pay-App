import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert,StatusBar } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ContactInfoScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleContinue = () => {
    if (!fullName.trim() || !email.trim() || !mobile.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Enter a valid email address.');
      return;
    }
    // Mobile number validation (assuming 10-digit format)
    if (!/^\d{10}$/.test(mobile)) {
      Alert.alert('Error', 'Enter a valid 10-digit mobile number.');
      return;
    }
    router.push('/Sidebar/kycVerification/OTPVerification');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
         <StatusBar backgroundColor="#004080" barStyle="light-content"  />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>KYC Verification</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.title}>Contact Information</Text>
          <Text style={styles.subtitle}>Enter your information below</Text>

          <TextInput 
            style={styles.input} 
            placeholder="Full Name" 
            placeholderTextColor="black" 
            value={fullName} 
            onChangeText={setFullName} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Email Address" 
            keyboardType="email-address" 
            placeholderTextColor="black" 
            value={email} 
            onChangeText={setEmail} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Mobile Number" 
            keyboardType="phone-pad" 
            placeholderTextColor="black" 
            value={mobile} 
            onChangeText={setMobile} 
            maxLength={10}
          />
          
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  backButton: {
    marginRight: 10,
  },
  card: {
    backgroundColor: '#e2f1ff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    padding: 24,
    margin: 20,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f7f7f7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#004080',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
