// with backend complete 

import { router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';

export default function VerificationPage() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds
  const [serverOtp, setServerOtp] = useState(''); // Simulate OTP received from server
  const [error, setError] = useState(''); // Error state for OTP verification
  const otpRefs = useRef<(TextInput | null)[]>([]); // Ref for OTP inputs

  useEffect(() => {
    setTimeout(() => setServerOtp('123456'), 2000); // Simulate server OTP
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleResendOtp = async () => {
    setTimer(120); // Reset the timer
    setServerOtp('123456'); // Simulate new OTP
    // Send request to backend to resend OTP (if needed)
    // You can call your backend here using axios or fetch
  };

  const handleVerify = async () => {
    try {
      // Sending OTP to the backend for verification
      const response = await axios.post('http://192.168.43.174:9000/api/otp/verify-otp', { otp });
      console.log(response.data); // Handle the response after verification
      // Navigate to another page on success
      router.navigate('/front');
    } catch (err) {
      setError('Something went wrong'); // Show error if OTP verification fails
    }
  };

  const handleChangeOtp = (value: string, index: number) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    // Move focus to next input when value is entered
    if (value && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleDeleteOtp = (index: number) => {
    const newOtp = otp.split('');
    newOtp[index] = '';
    setOtp(newOtp.join(''));

    // Move focus to previous input when a value is deleted
    if (!otp[index] && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'} />
      <View style={styles.Content}>
        <Text style={styles.header}>OTP</Text>
        <Text style={styles.description}>
          Please wait for an SMS confirmation code and enter it.
        </Text>
        <View style={styles.otpContainer}>
          {[...Array(6)].map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpRefs.current[index] = ref)} // Reference for OTP input fields
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
            ? `Didn't receive OTP? Retry in (${Math.floor(timer / 60)
                .toString()
                .padStart(2, '0')}:${(timer % 60)
                .toString()
                .padStart(2, '0')})`
            : "Didn't receive OTP?"}
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
  Content: {
    backgroundColor: '#E6F2FA',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
