import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function AccountDetails() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => router.push('/login'), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Details</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.profileImage} />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
        <Text style={styles.accountId}>Account ID: 123456789</Text>
      </View>

      {/* Account Balance */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceTitle}>Wallet Balance</Text>
        <Text style={styles.balanceAmount}>₹ 25,000</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Linked Accounts */}
      <View style={styles.linkedAccounts}>
        <Text style={styles.sectionTitle}>Linked Accounts</Text>
        {/* <View style={styles.accountItem}>
          <FontAwesome5 name="university" size={20} color="#4CAF50" />
          <Text style={styles.accountText}>Bank: HDFC Bank (**** 5678)</Text>
        </View>
        <View style={styles.accountItem}>
          <FontAwesome5 name="credit-card" size={20} color="#FF9800" />
          <Text style={styles.accountText}>Card: Visa (**** 1234)</Text>
        </View> */}
        <View style={styles.accountItem}>
          <MaterialIcons name="payment" size={20} color="#1976D2" />
          <Text style={styles.accountText}>UPI: johndoe@upi</Text>
        </View>
      </View>

     

      {/* Security & Settings */}
GFDS      <View style={styles.accountSettings}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity onPress={() => router.push('/Sidebar/profile')}>
          <Text style={styles.linkText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Sidebar/ChangePassword')}>
          <Text style={styles.linkText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Sidebar/security')}>
          <Text style={styles.linkText}>Security & Privacy</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F4F4F4', paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  headerTitle: { flex: 1, fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  backButton: { padding: 10 },
  profileSection: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 20, marginBottom: 15 },
  profileImage: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  username: { fontSize: 20, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#666' },
  accountId: { fontSize: 14, color: '#888' },
  balanceSection: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  balanceTitle: { fontSize: 16, color: '#666' },
  balanceAmount: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50' },
  balanceActions: { flexDirection: 'row', marginTop: 10, gap: 10 },
  actionButton: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 8, flex: 1, alignItems: 'center' },
  actionButtonText: { color: '#fff', fontSize: 14 },
  linkedAccounts: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  accountItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  accountText: { fontSize: 16, color: '#444' },
  transactionHistory: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 15 },
  transactionItem: { borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 },
  transactionText: { fontSize: 16 },
  transactionDate: { fontSize: 12, color: '#666' },
  accountSettings: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 15 },
  linkText: { fontSize: 16, color: '#1976D2', marginBottom: 10 },
  logoutButton: { backgroundColor: '#FF5722', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
