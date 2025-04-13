///////////////////////////////// With Backend ////////////////////////////////////////////////////////////////



import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Modal, StatusBar, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const router = useRouter();
  // const [modalVisible, setModalVisible] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [resetSuccess, setResetSuccess] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    try {
      const response = await axios.post('http://192.168.52.190:7000/api/auth/login', {
        emailOrPhone,
        password,
      });
      await AsyncStorage.setItem('emailOrPhone', emailOrPhone);

      Alert.alert('Success', response.data.message);
      router.push({ pathname: '/verification', params: { emailOrPhone } });
    } catch (error) {
      Alert.alert('Error');
    }
  };

  // Example: जेव्हा यूजरने email टाकलं आणि forgot password वर जायचं
const handleForgotPassword = async () => {
  try {
    console.log(emailOrPhone);
    await AsyncStorage.setItem('emailOrPhone', emailOrPhone); // save in storage
    router.push('/forgotpassword'); // मग navigate कर
  } catch (e) {
    Alert.alert('Error', 'Could not save data');
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
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color='gray' />
            </TouchableOpacity>
          </View>

          <Text 
            style={styles.forgotPassword}
            // onPress={() => {handleForgotPassword}}
            onPress={handleForgotPassword}
            // onPress={() => router.push(`/forgotpassword?emailOrPhone=${encodeURIComponent(emailOrPhone)}`)}
          >
            Forgot Password?
          </Text>

        {/* <Text style={styles.forgotPassword} onPress={() => router.push('/forgotpassword', { emailOrPhone })}>Forgot Password?</Text> */}
        {/* <Text style={styles.forgotPassword} onPress={() => setModalVisible(true)}>Forgot Password?</Text> */}
        <TouchableOpacity activeOpacity={0.7} style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
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
    // backgroundColor:'#000000'
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


