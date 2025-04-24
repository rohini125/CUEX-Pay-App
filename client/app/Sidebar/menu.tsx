import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const menu = () => {
  const router = useRouter();

  // Function to handle navigation
  const navigateTo = (route: string) => {
    router.push(route as any); // Use router.push for navigation
  };

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor="#004080" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>
      <View style={styles.menuList} >
        {/* Profile */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/profile')}>
          <Feather name="user" size={20} color="black" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>

        {/* Account Settings */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/AccountSetting')}>
          <Feather name="settings" size={20} color="black" />
          <Text style={styles.menuText}>Account Settings</Text>
        </TouchableOpacity>

        {/* Price Alerts */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/PriceAlert/price-alert')}>
          <Feather name="alert-circle" size={20} color="black" />
          <Text style={styles.menuText}>Price Alerts</Text>
        </TouchableOpacity>

        {/* Promotions */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/Rewards')}>
          <Feather name="gift" size={20} color="black" />
          <Text style={styles.menuText}>Rewards</Text>
        </TouchableOpacity>

        {/* Help */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/help/help')}>
          <Feather name="help-circle" size={20} color="black" />
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/about')}>
          <Feather name="info" size={20} color="black" />
          <Text style={styles.menuText}>About CUEX</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/Sidebar/logout')}>
          <Feather name="log-out" size={20} color="black" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // padding: 16,
   
  },
  // header: {
  //   fontSize: 25,
  //   fontWeight: 'bold',
  //   color: '#ADD8E6',
  //   marginBottom: 16,
  // },

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

  menuList: {
    padding: 20,
    margin:20,
    borderRadius:20,
    backgroundColor:'#e2f1ff',
     height:'85%'
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  menuText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
});

export default menu;
