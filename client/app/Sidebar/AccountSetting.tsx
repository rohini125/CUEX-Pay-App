import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AccountingSettings = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
          <StatusBar backgroundColor="#004080" barStyle="light-content"  />
      <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/Sidebar/menu')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      <Text style={styles.headerTitle}> Account Settings </Text>
      </View>
      {/* KYC Verification */}
      < View style={{margin:15}}>
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
    backgroundColor: '#e2f1ff',
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
  },
  headerTitle: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: '#004080',
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