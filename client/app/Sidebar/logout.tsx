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
        {/* ✅ Only show logout button when modal is NOT visible */}
        {!modalVisible && (
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
          <View style={styles.modalContent}>
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
  logoutBtn: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 10
  },
  logoutText: {
    color: '#fff',
    fontSize: 16
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
  modalText: {
    fontSize: 18,
    marginBottom: 20
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10
  },
  confirmBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10
  },
  cancelBtn: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  }
});