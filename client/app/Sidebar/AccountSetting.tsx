import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AccountingSettings = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
          
      <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/Sidebar/menu')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Text style={styles.headerTitle}> Account Settings </Text>
      </View>
      {/* KYC Verification */}
      < View style={styles.card}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/Sidebar/kycVerification/introduction')}
        >
          <Text style={styles.optionTitle}> KYC VERIFICATION</Text>
          <Text style={styles.arrow}>➔</Text>
        </TouchableOpacity>

        {/* Account Details */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/Sidebar/account-details')}
        >
          <Text style={styles.optionTitle}> ACCOUNT DETAILS</Text>
          <Text style={styles.arrow}>➔</Text>
        </TouchableOpacity>

        {/* Request Account Delete */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/Sidebar/RequestAccountDeletion')}
        >
          <Text style={styles.optionTitle}> REQUEST ACCOUNT DELETE</Text>
          <Text style={styles.arrow}>➔</Text>
        </TouchableOpacity>

        {/* Nominee Details */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/Sidebar/nominee-details')}
        >
          <Text style={styles.optionTitle}> NOMINEE DETAILS</Text>
          <Text style={styles.arrow}>➔</Text>
        </TouchableOpacity>

        {/* UPI PIN  */}
        <View style={styles.option}>
          <Text style={styles.optionTitle}>UPI PIN</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/Sidebar/UpiSet')}
          >
            <Text style={styles.Button}> SET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/Sidebar/nominee-details')}
          >
            <Text style={styles.Button}> RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  card: {
    backgroundColor: "#E6F2FA",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    margin: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Button:{
    alignItems: 'center',
    textAlign:'center',
    backgroundColor: 'black',
    color:'#fff',
    padding: 6,
    borderRadius: 6,
    marginHorizontal: 10,
    height:28,
    width:65,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    flex: 3,
  },
  optionDescription: {
    fontSize: 14,
    color: '#555',
    flex: 5,
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'right',
  },
});

export default AccountingSettings;