import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

// Define the type of each help option
interface HelpOption {
  id: string;
  title: string;
  icon: any; // You can replace `any` with ImageSourcePropType for stricter type checking
}

const help = () => {
  const helpOptions: HelpOption[] = [
    { id: '1', title: 'Payment Issues', icon: require('../../../assets/images/payment_issues.png') },
    { id: '2', title: 'Profile Issues', icon: require('../../../assets/images/profile_payments.png') },
    { id: '3', title: 'Money Transfer', icon: require('../../../assets/images/money_transfer.png') },
    { id: '4', title: 'Recharge & Bill Payments', icon: require('../../../assets/images/recharge_bills.png') },
    { id: '5', title: 'Rewards & Refer and Earn', icon: require('../../../assets/images/rewards.png') },
    { id: '6', title: 'Others', icon: require('../../../assets/images/others.png') },
  ];

  const router = useRouter();

  // Define separate functions for each option's action
  const handlePaymentIssuesClick = () => {
    router.push('./payment_issue');
  };

  const handleProfilePaymentsClick = () => {
    router.push('./profile_issues');
  };

  const handleMoneyTransferClick = () => {
    router.push('./money_transfer');
  };

  const handleRechargeBillsClick = () => {
    router.push('./recharge_bills');
  };

  const handleRewardsClick = () => {
    router.push('./rewards');
  };

  const handleOthersClick = () => {
    router.push('./others');
  };

  // Render individual help option
  const renderHelpOption = ({ item }: { item: HelpOption }) => {
    // Map the item's id to the corresponding function
    const clickHandlers: { [key: string]: () => void } = {
      '1': handlePaymentIssuesClick,
      '2': handleProfilePaymentsClick,
      '3': handleMoneyTransferClick,
      '4': handleRechargeBillsClick,
      '5': handleRewardsClick,
      '6': handleOthersClick,
    };

    return (
      <TouchableOpacity activeOpacity={0.7}
        style={styles.optionContainer}
        onPress={clickHandlers[item.id]}
      >
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.optionText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
    <ScrollView style={styles.container}>
      {/* Back Button */}
      
      <View style={styles.header}>
        <TouchableOpacity  activeOpacity={0.7} onPress={() => router.push('/Sidebar/menu')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {/* Help Section */}
        <Text style={styles.headerTitle}>Help</Text>
      </View>

      {/* Help Options */}
      <View style={styles.section}>
      <Text style={styles.subTitle}>Need Help?</Text>
      <FlatList
        data={helpOptions}
        renderItem={renderHelpOption}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display 2 columns
        contentContainerStyle={styles.optionsGrid}
      />
      </View>

      {/* Call Us Section */}
      <View style={styles.assistanceContainer}>
        <Text style={styles.assistanceText}>Need further assistance?</Text>
        <Text style={styles.subText}>We are here to help you!</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.callButton} onPress={() => router.push('/Sidebar/contact')}>
          <Text style={styles.callButtonText}>Call Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </GestureHandlerRootView> 
  );
};

const { width } = Dimensions.get('window');

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
    padding: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
    marginLeft:20
  },
  section: {
    backgroundColor: '#E6F2FA',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    margin:10
  },
  optionsGrid: {
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  optionContainer: {
    width: width / 2 - 20,
    alignItems: 'center',
    margin: 5,
    marginBottom: 40,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    width: '100%',
  },
  assistanceContainer: {
    backgroundColor: '#E6F2FA',
  padding: 16,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  alignItems: 'center',
  marginBottom: 16,
  margin:10
  },
 
  assistanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  callButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default help;
