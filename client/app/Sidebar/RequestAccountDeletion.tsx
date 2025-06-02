///////////////////////// with backend ////////////////////////////////


import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { API_URL } from '@env';

const DeleteAccount = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const router = useRouter();
  
  useFocusEffect(
    useCallback(() => {
      const getEmailOrPhone = async () => {
        try {
          const storedValue = await AsyncStorage.getItem('emailOrPhone');
          if (storedValue) {
            setEmailOrPhone(storedValue);
            console.log('🎯 FocusEffect fetched:', storedValue);
          }
        } catch (error) {
          console.log('❌ Error fetching on focus:', error);
        }
      };
  
      getEmailOrPhone();
    }, [])
  );

  const handleDelete = async () => {
    console.log('handleDelete called');
  
    if (!emailOrPhone) {
      Alert.alert('Error', 'No account info found.');
      return;
    }
  
    try {
      const res = await axios.post(`${API_URL}/api/auth/deleteAccount`, {
        emailOrPhone
      });
  
      await AsyncStorage.removeItem('emailOrPhone');
      console.log('Response from server:', res.data);
  
      Alert.alert('Success', res.data.message);
  
      setTimeout(() => {
        router.replace('/signup');
      }, 1000); // Delay to ensure alert is shown before navigating
  
    } catch (err: any) {
      console.log('Delete error:', err.response?.data || err.message);
      Alert.alert('Error', err.response?.data?.message || 'Something went wrong.');
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Sidebar/AccountSetting')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      {/* Header */}
      <Text style={styles.headerTitle}>Delete Account</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>Delete User Account</Text>
        <Text style={styles.emailDisplay}>Account: {emailOrPhone || 'Not found'}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ Needed to allow full height for vertical centering
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
    width: '100%',      // ✅ Full width
    margin: 0,          // ✅ No margin
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
    backgroundColor: "#e2f1ff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginTop: 150,
    marginHorizontal:14,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#cc0000',
  },
  emailDisplay: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#cc0000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});











