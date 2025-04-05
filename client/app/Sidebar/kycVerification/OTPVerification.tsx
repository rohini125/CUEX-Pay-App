import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, 
  Platform, Alert, TouchableWithoutFeedback, Keyboard ,StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30); // Timer starts at 30 seconds
  const [resendDisabled, setResendDisabled] = useState(true);
  const router = useRouter(); 

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit OTP.');
      return;
    }
    Alert.alert('Success', 'OTP Verified Successfully!');
    router.push('/Sidebar/kycVerification/faceRecognition'); 
  };

  const handleResendOTP = () => {
    setOtp('');
    setTimer(90); // Reset timer to 30 seconds
    setResendDisabled(true);
    Alert.alert('OTP Resent', 'A new OTP has been sent to your mobile number.');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
           <StatusBar backgroundColor="#004080" barStyle="light-content"  />
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/Sidebar/kycVerification/contactInfo')} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>KYC Verification</Text>
          </View>

          {/* OTP Card */}
          <View style={styles.card}>
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

            {/* Timer & Resend OTP */}
            <Text style={styles.timerText}>
              {resendDisabled ? `Resend OTP in ${timer}s` : 'You can now resend OTP'}
            </Text>

            <TouchableOpacity 
              onPress={handleResendOTP} 
              disabled={resendDisabled}
              style={[styles.resendButton, resendDisabled && styles.resendDisabled]}
            >
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
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
    margin: 30,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  verifyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerText: {
    marginTop: 15,
    fontSize: 16,
    color: '#ff3b30',
  },
  resendButton: {
    marginTop: 10,
  },
  resendDisabled: {
    opacity: 0.5,
  },
  resendText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

