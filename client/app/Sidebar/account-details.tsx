import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AccountDetails() {
   const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
         {/* Back Button */}
   <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/Sidebar/AccountSetting')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#black" />
      </TouchableOpacity>
      {/* About Section */}
        <Text style={styles.headerTitle}>Account Details</Text>
    </View>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://example.com/profile.jpg' }} // Replace with actual profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceTitle}>Account Balance</Text>
        <Text style={styles.balanceAmount}>₹ 25,000</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Request Money</Text>
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View style={styles.accountSettings}>
        <Link href="/account-details/edit">
          <Text style={styles.linkText}>Edit Account</Text>
        </Link>
        <Link href="/account-details/change-password">
          <Text style={styles.linkText}>Change Password</Text>
        </Link>
        <Link href="/account-details/linked-accounts">
          <Text style={styles.linkText}>Linked Accounts</Text>
        </Link>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutButton}>
        <TouchableOpacity style={styles.logoutButtonStyle}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ADD8E6',
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#ADD8E6',
    paddingHorizontal: 16,
    marginBottom:10
  },
  headerTitle: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
   backButton: {
    marginRight: 10,
    padding: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  balanceSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actionsContainer: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  accountSettings: {
    marginBottom: 30,
  },
  linkText: {
    fontSize: 16,
    color: '#1976D2',
    marginBottom: 15,
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutButtonStyle: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
