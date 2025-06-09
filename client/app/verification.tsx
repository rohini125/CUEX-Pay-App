import { router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerificationPage() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const otpRefs = useRef<(TextInput | null)[]>([]);

  // Fetch emailOrPhone from AsyncStorage
  useEffect(() => {
    (async () => {
      const storedValue = await AsyncStorage.getItem('emailOrPhone');
      if (storedValue) setEmailOrPhone(storedValue);
    })();
  }, []);

  // Countdown timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Resend OTP
  const handleResendOtp = async () => {
    setTimer(120); // Reset the timer
    try {
      const res = await axios.post(`${API_URL}/api/auth/resend-otp`, { emailOrPhone });
      Alert.alert('OTP Resent', 'A new OTP has been sent.');
    } catch (err) {
      Alert.alert('Failed', 'Could not resend OTP.');
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/auth/verify-otp`, { otp, emailOrPhone });
      await AsyncStorage.setItem('token', response.data.token);
      Alert.alert('Success', 'OTP verified successfully.');
      router.push('/front');
    } catch (err) {
      setError('Invalid or expired OTP');
    }
  };

  const handleChangeOtp = (value: string, index: number) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    if (value && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleDeleteOtp = (index: number) => {
    const newOtp = otp.split('');
    newOtp[index] = '';
    setOtp(newOtp.join(''));

    if (!otp[index] && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.header}>OTP Verification</Text>
        <Text style={styles.description}>
          Please enter the 6-digit code sent to your registered email or phone.
        </Text>

        <View style={styles.otpContainer}>
          {[...Array(6)].map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpRefs.current[index] = ref)}
              style={styles.otpBox}
              keyboardType="numeric"
              maxLength={1}
              value={otp[index] || ''}
              onChangeText={(value) => handleChangeOtp(value, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleDeleteOtp(index);
                }
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.verifyButton}
          onPress={handleVerify}
        >
          <Text style={styles.verifyButtonText}>Verify OTP</Text>
        </TouchableOpacity>

        <Text style={styles.retryText}>
          {timer > 0
            ? `Resend OTP in ${Math.floor(timer / 60)
                .toString()
                .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`
            : 'Didn’t receive OTP?'}
        </Text>

        {timer === 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.resendButton}
            onPress={handleResendOtp}
          >
            <Text style={styles.resendButtonText}>Resend OTP</Text>
          </TouchableOpacity>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F6F9',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#E6F2FA',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  otpBox: {
    backgroundColor: '#fff',
    width: 40,
    height: 50,
    marginHorizontal: 6,
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 5,
  },
  verifyButton: {
    backgroundColor: '#004080',
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retryText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  resendButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});