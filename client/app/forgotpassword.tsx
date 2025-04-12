
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { Router, useRouter } from 'expo-router';
// import { useNavigation } from '@react-navigation/native'; // Import navigation

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  // const navigation = useNavigation(); // Initialize navigation

  const handleSubmitEmailPhone = async () => {
    try {
      const response = await axios.post('http://192.168.52.190:7000/api/auth/forgot-password', {
        emailOrPhone,
      });

      if (response.data.message === 'Security question found') {
        setSecurityQuestion(response.data.securityQuestion);
        setMessage('');
      }
    } catch (error) {
      setMessage('User not found');
    }
  };

  const handleSubmitAnswer = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://192.168.52.190:7000/api/auth/reset-password', {
        emailOrPhone,
        answer,
        newPassword,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  const handleCancel = () => {
    router.push('/login'); // Navigate back to login page when Cancel is clicked
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Forgot Password</Text>

      {!securityQuestion ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email or Phone"
            placeholderTextColor="#888"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
          <TouchableOpacity style={styles.buttonNext} onPress={handleSubmitEmailPhone}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.question}>{securityQuestion}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Answer"
            placeholderTextColor="#888"
            value={answer}
            onChangeText={setAnswer}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputWithToggle}
              placeholder="Enter New Password"
              placeholderTextColor="#888"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword(!showNewPassword)}>
              {/* <Ionicons name={showNewPassword ? 'eye' : 'eye-slash'} size={20} color="#4C51BF" /> */}
              <Ionicons name="eye" size={20} color="#4C51BF" />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputWithToggle}
              placeholder="Enter Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name="eye" size={20} color="#4C51BF" />
              {/* <Ionicons name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#4C51BF" /> */}
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity style={styles.button} onPress={handleSubmitAnswer}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity> */}

          {/* Buttons in one line */}
          <View style={styles.buttonContainer}>
           <TouchableOpacity style={styles.button} onPress={handleSubmitAnswer}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {message !== '' && <Text style={styles.message}>{message}</Text>}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2D3748',
  },
  input: {
    width: '100%',
    height: 50,
    // borderColor: '#CBD5E0',
    // borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputWithToggle: {
    flex: 1,
    height: 50,
    fontSize: 14,
    paddingHorizontal: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    // borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 15,
  },
  eyeIcon: {
    marginRight: 10,
  },
  buttonNext:{
    backgroundColor: '#004080',
    borderRadius: 10,
    alignItems: 'center',
    width:'100%',
    padding: 15,
  },
  button: {
    // backgroundColor: '#4C51BF',
    backgroundColor: '#004080',
    // paddingVertical: 15,
    padding:15,
    borderRadius: 10,
    // width: '100%',
    alignItems: 'center',
    // margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 14,
    color: '#E53E3E',
    textAlign: 'center',
  },
  question: {
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 10,
    fontWeight: '500',
  },
});

export default ForgotPassword;