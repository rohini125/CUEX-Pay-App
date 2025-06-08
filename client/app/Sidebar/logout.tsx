import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Header from '../Header';

const LogoutPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.43.102:9000/api/auth/logout');
      await AsyncStorage.removeItem('token');
      setModalVisible(false);
      Alert.alert('Logout', 'You have been logged out.');
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Try again.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#004080" barStyle="light-content" />
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        {/* ✅ Only show logout button when modal is NOT visible
        {!modalVisible && (
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )} */}

        {/* ✅ Only show logout button when modal is NOT visible */}
{!modalVisible && (
  <View style={styles.logoutCard}> {/* Card-style wrapper */}
   <Text style={styles.subheader}>Logout</Text>
                <Text style={styles.subText}>Are you sure you want to log out of your account?</Text>
    <TouchableOpacity
      style={styles.logoutBtn}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  </View>
)}

      </ScrollView>

      {/* Confirm Logout Modal */}
<Modal
  visible={modalVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalCard}> {/* Styled like a card */}
      <Text style={styles.modalText}>Confirm logout?</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleLogout}>
          <Text style={styles.btnText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
};

export default LogoutPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4F6F9'
  },
   subheader:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
      },
   
    subText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        marginBottom: 40,
    },
   logoutCard: {
    backgroundColor: '#e2f1ff',
    borderRadius: 10,
    padding: 15,
    margin: 16,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
   modalCard: {
    width: '70%',
    backgroundColor: '#e2f1ff',
    textAlign:'center',
    borderRadius: 10,
    padding: 20,
    marginLeft:10,
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
    elevation: 5
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmBtn: {
    backgroundColor: '#004080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});