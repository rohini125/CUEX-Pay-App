import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const Login = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        emailOrPhone,
        password,
      });

      await AsyncStorage.setItem('emailOrPhone', emailOrPhone);
      Alert.alert('Success', 'OTP sent successfully');

      // Navigate to Verification Page
      router.push('/verification');
    } catch (error) {
      Alert.alert('Login failed', 'Incorrect email/phone or password');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'} />
      <View style={{ padding: 20, gap: 20 }}>
        <Image source={require('@/assets/images/login.jpg')} style={styles.image} resizeMode="cover" />

        <TextInput
          placeholder="Enter Your Email / Mobile no"
          style={styles.input}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter Your Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Send OTP</Text>
        </TouchableOpacity>

        <Text
          style={styles.forgotPassword}
          onPress={async () => {
            await AsyncStorage.setItem('emailOrPhone', emailOrPhone);
            router.push('/forgotpassword');
          }}
        >
          Forgot Password?
        </Text>

        <Text style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={() => router.push('/signup')}>
            Signup
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  image: {
    width: '100%',
    height: 300,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    backgroundColor: '#F4F6F9',
  },
  iconWrapper: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  signInButton: {
    backgroundColor: '#004080',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    color: 'blue',
    fontSize: 14,
    textAlign: 'center',
  },
});