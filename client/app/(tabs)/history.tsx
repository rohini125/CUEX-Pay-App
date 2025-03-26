////////////// without backend //////////////////

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Header from "../Header";

const currencySymbols: Record<string, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  JPY: '¥'
};

const getFormattedCurrency = (amount: string): string => {
  const parts = amount.split(' ');
  if (parts.length === 2) {
    const [value, currency] = parts;
    return `${value} ${currencySymbols[currency] || currency}`;
  }
  return amount;
};

type HistoryItem = {
  id: string;
  name: string;
  amount: string;
  time: string;
  type: 'Sent' | 'Received' | 'Converted';
  details?: string;
};

type HistoryData = {
  sent: HistoryItem[];
  received: HistoryItem[];
  converted: HistoryItem[];
};

const History: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'sent' | 'received' | 'converted' | 'all'>('all');

  const historyData: HistoryData = {
    sent: [
      { id: '1', name: 'Sakshi', amount: '₹ 5000', time: 'Yesterday', type: 'Sent' },
      { id: '2', name: 'Neha', amount: '₹ 2500', time: '2 days ago', type: 'Sent' },
    ],
    received: [
      { id: '3', name: 'Priya', amount: '₹ 1000', time: 'Today', type: 'Received' },
    ],
    converted: [
      { id: '4', name: '1 USD to INR', amount: '86.10 ₹', time: 'Last week', type: 'Converted' },
      { id: '5', name: '86.10 INR to USD', amount: '1 $', time: 'Last week', type: 'Converted'},
    ],
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
    let formattedAmount = getFormattedCurrency(item.amount);

    if (item.type === 'Sent') {
      formattedAmount = `- ${formattedAmount}`;
    } else if (item.type === 'Received') {
      formattedAmount = `+ ${formattedAmount}`;
    }

    return (
      <View style={styles.transactionItem}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
          {item.details && <Text style={styles.details}>{item.details}</Text>}
        </View>
        <Text style={styles.amount}>{formattedAmount}</Text>
      </View>
    );
  };

  const dataToDisplay = selectedTab === 'all' 
    ? [...historyData.sent, ...historyData.received, ...historyData.converted]
    : historyData[selectedTab];

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.tabContainer}>
          {['all', 'converted', 'sent', 'received'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab as 'sent' | 'received' | 'converted' | 'all')}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={dataToDisplay}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.noData}>No history available.</Text>}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e2f1ff',
    padding: 10,
    shadowOpacity: 0.1,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 2,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 14,
    color: '#555',
  },
  activeTabText: {
    color: 'black',
    fontWeight: '600',
  },
  flatListContainer: {
    paddingVertical: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    // backgroundColor: '#E6F2FA',
    backgroundColor:'#e2f1ff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 8,
    shadowOpacity: 0.1,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 2,
  },
  name: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    color: '#929292',
    fontSize: 12,
  },
  details: {
    color: '#666',
    fontSize: 12,
  },
  amount: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  noData: {
    textAlign: 'center',
    color: '#929292',
    fontSize: 14,
    marginTop: 20,
  },
});

export default History;


////////////////   with backend main code ////////////////////////////////////////




// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import Header from "../Header";

// const currencySymbols: Record<string, string> = {
//   INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr',  PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', 
//   OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', 
//   AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.', BWP: 'P', BZD: 'BZ$', CDF: 'Fr', CRC: '₡',  CVE: '$', DJF: 'Fdj', DOP: '$', ERN: 'Nakfa', ETB: 'ታብ', FJD: '$', FKP: '£', FOK: 'kr', GGP: '£', GIP: '£', GNF: 'Fr', GTQ: 'Q', GYD: '$', HNL: 'L', HTG: 'G', IMP: '£', IRR: '﷼', ISK: 'kr', JMD: '$', KID: '$', KMF: 'Fr', KYD: '$', LRD: '$', LSL: 'M', LYD: 'ل.د', MGA: 'Ar', MOP: 'MOP', MRU: 'MRU', MUR: '₨', MVR: 'Rf', MWK: 'MK',
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

// const History: React.FC = () => {
//   const [selectedTab, setSelectedTab] = useState<'sent' | 'received' | 'converted' | 'all'>('all');
//   const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/history'); // Backend API call
//         setHistoryData(response.data);
//       } catch (err) {
//         setError('Failed to fetch history data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

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
//     ? historyData
//     : historyData.filter(item => item.type.toLowerCase() === selectedTab);

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
//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
//         ) : error ? (
//           <Text style={styles.error}>{error}</Text>
//         ) : (
//           <FlatList
//             contentContainerStyle={styles.flatListContainer}
//             data={dataToDisplay}
//             renderItem={renderHistoryItem}
//             keyExtractor={(item) => item.id}
//             ListEmptyComponent={<Text style={styles.noData}>No history available.</Text>}
//           />
//         )}
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
//     backgroundColor: '#E6F2FA',
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
//     backgroundColor: '#E6F2FA',
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
//   loader: {
//     marginTop: 20,
//   },
//   error: {
//     textAlign: 'center',
//     color: 'red',
//     fontSize: 16,
//     marginTop: 20,
//   },
// });

// export default History;

             ////////////// code - 1 with backend ///////////////////////////

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// import Header from "../Header";

// type HistoryItem = {
//   id: string;
//   name: string;
//   amount: string;
//   time: string;
//   type: string;
// };

// type HistoryData = {
//   sent: HistoryItem[];
//   received: HistoryItem[];
//   converted: HistoryItem[];
// };

// const History = () => {
//   const [selectedTab, setSelectedTab] = useState<'sent' | 'received' | 'converted' | 'all'>('all');
//   const [loading, setLoading] = useState<boolean>(true);
//   const [historyData, setHistoryData] = useState<HistoryData>({
//     sent: [],
//     received: [],
//     converted: [],
//   });

//   // Function to fetch history data from the backend
//   const fetchHistoryData = async () => {
//     try {
//       const response = await fetch('http://192.168.52.190:9000/history/');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const textResponse = await response.text(); // Get the raw response as text
  
//       // Log the raw response to see what you're getting
//       console.log('Raw Response:', textResponse);
  
//       // Check if the response is a valid JSON string
//       if (textResponse.startsWith('{') || textResponse.startsWith('[')) {
//         const data = JSON.parse(textResponse);  // Parse only if it's valid JSON
//         setHistoryData({
//           sent: data.sent,
//           received: data.received,
//           converted: data.converted,
//         });
//       } else {
//         throw new Error('Unexpected response format');
//       }
//     } catch (error) {
//       console.error('Error fetching history data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHistoryData();
//   }, []);

//   const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
//     let formattedAmount = item.amount;
    
//     // Adjust amount sign for 'sent' and 'received' transactions
//     if (item.type === 'Sent') {
//       formattedAmount = `- ${item.amount}`;
//     } else if (item.type === 'Received') {
//       formattedAmount = `+ ${item.amount}`;
//     }

//     return (
//       <View style={styles.transactionItem}>
//         <View>
//           <Text style={styles.name}>{item.name}</Text>
//           <Text style={styles.time}>{item.time}</Text>
//         </View>
//         <Text style={styles.amount}>{formattedAmount}</Text>
//       </View>
//     );
//   };

//   // Combine all transaction types if "all" tab is selected
//   const dataToDisplay = selectedTab === 'all' 
//     ? [...historyData.sent, ...historyData.received, ...historyData.converted]
//     : historyData[selectedTab];

//   const renderHeader = () => (
//     <View style={styles.tabContainer}>
//       <TouchableOpacity
//         style={[styles.tabButton, selectedTab === 'all' && styles.activeTab]}
//         onPress={() => setSelectedTab('all')}
//       >
//         <Text style={[styles.tabText, selectedTab === 'all' && styles.activeTabText]}>All</Text>
//       </TouchableOpacity>
//        <TouchableOpacity
//         style={[styles.tabButton, selectedTab === 'converted' && styles.activeTab]}
//         onPress={() => setSelectedTab('converted')}
//       >
//         <Text style={[styles.tabText, selectedTab === 'converted' && styles.activeTabText]}>Converted</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.tabButton, selectedTab === 'sent' && styles.activeTab]}
//         onPress={() => setSelectedTab('sent')}
//       >
//         <Text style={[styles.tabText, selectedTab === 'sent' && styles.activeTabText]}>Sent</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.tabButton, selectedTab === 'received' && styles.activeTab]}
//         onPress={() => setSelectedTab('received')}
//       >
//         <Text style={[styles.tabText, selectedTab === 'received' && styles.activeTabText]}>Received</Text>
//       </TouchableOpacity>
//      // <TouchableOpacity
//      //   style={[styles.tabButton, selectedTab === 'converted' && styles.activeTab]}
//     //   onPress={() => setSelectedTab('converted')}
//      // >
//      //   <Text style={[styles.tabText, selectedTab === 'converted' && styles.activeTabText]}>Converted</Text>
//      // </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       <Header/>
//       <View style={styles.container}>
//         <FlatList
//           contentContainerStyle={styles.flatListContainer}
//           data={dataToDisplay} // Dynamically load data based on selectedTab
//           renderItem={renderHistoryItem}
//           keyExtractor={(item) => item.id}
//           ListEmptyComponent={
//             dataToDisplay.length === 0 ? (
//               <Text style={styles.noData}>No history available.</Text>
//             ) : null
//           }
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ADD8E6',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#fff',
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
//     backgroundColor: '#fff',
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
//   amount: {
//     fontWeight: '700',
//     fontSize: 16,
//     color: '#000',
//   },
//   noData: {
//     textAlign: 'center',
//     color: '#000000',
//     fontSize: 14,
//     marginTop: 20,
//   },
//   loader: {
//     marginTop: 50,
//   },
// });

// export default History;

