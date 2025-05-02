// ////////////// without backend //////////////////

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
// import Header from "../Header";

// const currencySymbols: Record<string, string> = {
//   USD: '$',
//   INR: '₹',
//   EUR: '€',
//   GBP: '£',
//   JPY: '¥'
// };

// const getFormattedCurrency = (amount: string): string => {
//   const parts = amount.split(' ');
//   if (parts.length === 2) {
//     const [value, currency] = parts;
//     return `${value} ${currencySymbols[currency] || currency}`;
//   }
//   return amount;
// };

// type HistoryItem = {
//   id: string;
//   name: string;
//   amount: string;
//   time: string;
//   type: 'Sent' | 'Received' | 'Converted';
//   details?: string;
// };

// type HistoryData = {
//   sent: HistoryItem[];
//   received: HistoryItem[];
//   converted: HistoryItem[];
// };

// const History: React.FC = () => {
//   const [selectedTab, setSelectedTab] = useState<'sent' | 'received' | 'converted' | 'all'>('all');

//   const historyData: HistoryData = {
//     sent: [
//       { id: '1', name: 'Sakshi', amount: '₹ 5000', time: 'Yesterday', type: 'Sent' },
//       { id: '2', name: 'Neha', amount: '₹ 2500', time: '2 days ago', type: 'Sent' },
//     ],
//     received: [
//       { id: '3', name: 'Priya', amount: '₹ 1000', time: 'Today', type: 'Received' },
//     ],
//     converted: [
//       { id: '4', name: '1 USD to INR', amount: '86.10 ₹', time: 'Last week', type: 'Converted' },
//       { id: '5', name: '86.10 INR to USD', amount: '1 $', time: 'Last week', type: 'Converted'},
//     ],
//   };

//   const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
//     let formattedAmount = getFormattedCurrency(item.amount);

//     if (item.type === 'Sent') {
//       formattedAmount = `- ${formattedAmount}`;
//     } else if (item.type === 'Received') {
//       formattedAmount = `+ ${formattedAmount}`;
//     }

//     return (
//       <View style={styles.transactionItem}>
//         <View>
//           <Text style={styles.name}>{item.name}</Text>
//           <Text style={styles.time}>{item.time}</Text>
//           {item.details && <Text style={styles.details}>{item.details}</Text>}
//         </View>
//         <Text style={styles.amount}>{formattedAmount}</Text>
//       </View>
//     );
//   };

//   const dataToDisplay = selectedTab === 'all' 
//     ? [...historyData.sent, ...historyData.received, ...historyData.converted]
//     : historyData[selectedTab];

//   return (
//     <View style={{ flex: 1 }}>
//       <Header />
//       <ScrollView style={styles.container}>
//         <View style={styles.tabContainer}>
//           {['all', 'converted', 'sent', 'received'].map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
//               onPress={() => setSelectedTab(tab as 'sent' | 'received' | 'converted' | 'all')}
//             >
//               <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         <FlatList
//           contentContainerStyle={styles.flatListContainer}
//           data={dataToDisplay}
//           renderItem={renderHistoryItem}
//           keyExtractor={(item) => item.id}
//           ListEmptyComponent={<Text style={styles.noData}>No history available.</Text>}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F6F9',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#e2f1ff',
//     padding: 10,
//     shadowOpacity: 0.1,
//     shadowColor: 'rgba(0,0,0,0.5)',
//     elevation: 2,
//   },
//   tabButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: 'black',
//   },
//   tabText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   activeTabText: {
//     color: 'black',
//     fontWeight: '600',
//   },
//   flatListContainer: {
//     paddingVertical: 10,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     // backgroundColor: '#E6F2FA',
//     backgroundColor:'#e2f1ff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     borderRadius: 8,
//     marginHorizontal: 10,
//     marginBottom: 8,
//     shadowOpacity: 0.1,
//     shadowColor: 'rgba(0,0,0,0.5)',
//     elevation: 2,
//   },
//   name: {
//     color: '#000',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   time: {
//     color: '#929292',
//     fontSize: 12,
//   },
//   details: {
//     color: '#666',
//     fontSize: 12,
//   },
//   amount: {
//     fontWeight: '700',
//     fontSize: 16,
//     color: '#000',
//   },
//   noData: {
//     textAlign: 'center',
//     color: '#929292',
//     fontSize: 14,
//     marginTop: 20,
//   },
// });

// export default History;





import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import ConversionHistory from '../HistoryTab/ConversionHistory'; // ✅ बरोबर path
// import ConversionHistory from '../HistoryTab/ConversionHistory';
// import BankAccount from './BankAccount';
// import UpiId from './UpiId';
// import UpiNumber from './UpiNumber';

type PaymentType = 'Converted' | 'Send' | 'Recieve';
 
const History = () => {
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('Converted'); // Default to 'bank'
  const router = useRouter();

  const handleSelection = (paymentType: PaymentType) => {
    setSelectedPaymentType(paymentType);
  };

  return (
    <View style={styles.container}>
         <StatusBar backgroundColor="#004080" barStyle="light-content"  />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>History</Text>
      </View>

      {/* Payment Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, selectedPaymentType === 'Converted' && styles.selectedOption]}
          onPress={() => handleSelection('Converted')}
        >
          <Text style={[styles.optionText, selectedPaymentType === 'Converted' && styles.selectedoptionText]}>
            Converted
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, selectedPaymentType === 'Send' && styles.selectedOption]}
          onPress={() => handleSelection('Send')}
        >
          <Text style={[styles.optionText, selectedPaymentType === 'Send' && styles.selectedoptionText]}>
            Send
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, selectedPaymentType === 'Recieve' && styles.selectedOption]}
          onPress={() => handleSelection('Recieve')}>
          <Text style={[styles.optionText, selectedPaymentType === 'Recieve' && styles.selectedoptionText]}>
            Recieve
          </Text>
        </TouchableOpacity>
      </View>

      {selectedPaymentType === 'Converted' && <ConversionHistory />}
      {/* Display content based on selection */}
      {/* {selectedPaymentType === 'bank' && <BankAccount />}
      {selectedPaymentType === 'upiId' && <UpiId />}
      {selectedPaymentType === 'upiNumber' && <UpiNumber />} */}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    // backgroundColor: '#F4F6F9',
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
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#EAF0FB',
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowOpacity: 0.3,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },  
  optionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  selectedoptionText: {
    color: 'black',
    fontWeight: '600',
  },
  selectedOption: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    color: 'black',
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#004080',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

