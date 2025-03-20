import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState('');
  const router = useRouter(); // Use router for navigation

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      alert('OTP Verified Successfully!');
      router.push('/Sidebar/kycVerification/faceRecognition'); // Navigate to Face Recognition
    } else {
      alert('Invalid OTP, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        We have sent a 6-digit code to your registered mobile number.
      </Text>

      <TextInput
        style={styles.otpInput}
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        placeholder="123456"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('Resend OTP')}>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 10,
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  verifyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendText: {
    marginTop: 15,
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

