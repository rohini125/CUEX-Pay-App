import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const menu = () => {
  const router = useRouter();

  // Function to handle navigation
  const navigateTo = (route: string) => {
    router.push(route as any); // Use router.push for navigation
  };

  return (
    <View style={styles.container}>

      <View style={styles.menuList}>
        {/* Profile */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/profile')}>
          <Feather name="user" size={20} color="#4A4A4A" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>

        {/* Account Settings */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/AccountSetting')}>
          <Feather name="settings" size={20} color="#4A4A4A" />
          <Text style={styles.menuText}>Account Settings</Text>
        </TouchableOpacity>

        {/* Price Alerts */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/price-alert')}>
          <Feather name="alert-circle" size={20} color="#4A4A4A" />
          <Text style={styles.menuText}>Price Alerts</Text>
        </TouchableOpacity>

        {/* Promotions */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/promotions')}>
          <Feather name="gift" size={20} color="#4A4A4A" />
          <Text style={styles.menuText}>Promotions</Text>
        </TouchableOpacity>

        {/* Help */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/help/help')}>
          <Feather name="help-circle" size={20} color="#4A4A4A" />
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/about')}>
          <Feather name="info" size={20} color="#4A4A4A" />
          <Text style={styles.menuText}>About CUEX</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/logout')}>
          <Feather name="log-out" size={20} color="#4A4A4A" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    padding: 16,
   
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ADD8E6',
    marginBottom: 16,
  },
  menuList: {
    padding: 20,
    margin:10,
    backgroundColor:'#E6F2FA',
     height:'100%'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});

export default menu;
