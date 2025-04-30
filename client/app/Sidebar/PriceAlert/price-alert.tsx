// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   StatusBar,
//   ScrollView,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';


// type AlertType = {
//   _id: string;
//   pair: string;
//   target: number;
// };

// const PriceAlertPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currencyList, setCurrencyList] = useState<[string, string][]>([]);
//   const [filteredCurrencies, setFilteredCurrencies] = useState<[string, string][]>([]);
//   const [selectedCurrency, setSelectedCurrency] = useState('');
//   const [currentPrice, setCurrentPrice] = useState(1.0);
//   const [alertPrice, setAlertPrice] = useState(1.0);
//   const [alerts, setAlerts] = useState<AlertType[]>([]);
//   const [alertPriceInput, setAlertPriceInput] = useState('1.0000');
//   const router = useRouter();


//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       try {
//         const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
//         const data = await response.json();
//         const entries: [string, string][] = Object.entries(data.rates).map(
//           ([key, value]) => [key, (value as number).toString()]
//         );
//         setCurrencyList(entries);
//       } catch (err) {
//         console.log("Error fetching currencies:", err);
//       }
//     };

//     // Fetch saved alerts from AsyncStorage when the app loads
//     const loadAlerts = async () => {
//       try {
//         const savedAlerts = await AsyncStorage.getItem('alerts');
//         if (savedAlerts) {
//           setAlerts(JSON.parse(savedAlerts));
//         }
//       } catch (err) {
//         console.log('Error loading alerts:', err);
//       }
//     };

//     fetchCurrencies();
//     loadAlerts(); // Load saved alerts on app load
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setFilteredCurrencies([]);
//     } else {
//       const query = searchQuery.toLowerCase();
//       const filtered = currencyList.filter(
//         ([code, name]) =>
//           code.toLowerCase().includes(query) || name.toLowerCase().includes(query)
//       );
//       setFilteredCurrencies(filtered);
//     }
//   }, [searchQuery, currencyList]);

//   const handleSelectCurrency = (code: string, name: string) => {
//     setSelectedCurrency(code);
//     setSearchQuery(code);
//     setCurrentPrice(1.0);
//     setAlertPrice(1.0);
//   };

//   const createAlert = async () => {
//     if (!selectedCurrency) {
//       Alert.alert('Select Currency', 'Please select a currency before creating an alert.');
//       return;
//     }
  
//     const isDuplicate = alerts.some(
//       (a) => a.pair === selectedCurrency && a.target === alertPrice
//     );
//     if (isDuplicate) {
//       Alert.alert('Duplicate Alert', 'This alert already exists.');
//       return;
//     }
  
//     try {
//       const res = await axios.post('http://192.168.43.174:7000/alerts', {
//         pair: selectedCurrency,
//         target: alertPrice,
//       });
  
//       // Update local state
//       const newAlerts = [...alerts, res.data];
//       setAlerts(newAlerts);
  
//       // Save to AsyncStorage
//       await AsyncStorage.setItem('alerts', JSON.stringify(newAlerts));
  
//       // Navigate to notifications screen
//       router.push('/Sidebar/PriceAlert/notification');
//     } catch (err) {
//       console.error('Error creating alert:', err);
//       Alert.alert('Error', 'Failed to create alert. Please try again.');
//     }
//   };
  

//   const deleteAlert = async (id: string) => {
//     try {
//       await axios.delete(`http://192.168.43.174:7000/alerts/${id}`);

//       // Remove the alert from local state
//       const updatedAlerts = alerts.filter((alert) => alert._id !== id);
//       setAlerts(updatedAlerts);

//       // Save the updated alerts to AsyncStorage
//       await AsyncStorage.setItem('alerts', JSON.stringify(updatedAlerts));
//     } catch (err) {
//       console.log("Error deleting alert:", err);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView keyboardShouldPersistTaps="handled">
//           <StatusBar backgroundColor="#004080" barStyle="light-content" />
              
//               <View style={styles.header}>
//                 <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Sidebar/menu')} style={styles.backButton}>
//                   <Ionicons name="arrow-back" size={24} color="#fff" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Price Alert</Text>
//               </View>

// <View style={styles.card}>
//         <TextInput
//           placeholder="Search Currency"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           style={styles.input}
//         />

//         {/* Render the filtered list of currencies only when there are matching results */}
//         {filteredCurrencies.length > 0 && (
//           <FlatList
//             data={filteredCurrencies}
//             keyExtractor={(item) => item[0]}
//             renderItem={({ item }) => (
//               <TouchableOpacity onPress={() => handleSelectCurrency(item[0], item[1])} style={styles.listItem}>
//                 <Text>{item[0]} - {item[1]}</Text>
//               </TouchableOpacity>
//             )}
//             keyboardShouldPersistTaps="handled"
//           />
//         )}

//         <View style={styles.selectedBlock}>
//           <Text style={styles.currencyCode}>
//             {selectedCurrency !== '' ? selectedCurrency : 'Select a currency'}
//           </Text>
         

//           <View style={styles.priceAdjustRow}>
//             <TouchableOpacity
//               onPress={() => {
//                 const newValue = +(alertPrice + 0.1).toFixed(4);
//                 setAlertPrice(newValue);
//                 setAlertPriceInput(newValue.toFixed(4));
//               }}
//               style={styles.adjustBtn}
//             >
//               <Text style={styles.adjustBtnText}>+</Text>
//             </TouchableOpacity>
//             <TextInput
//               value={alertPriceInput}
//               keyboardType="decimal-pad"
//               onChangeText={(val) => {
//                 // Allow only numbers and dot
//                 const cleaned = val.replace(/[^0-9.]/g, '');
//                 setAlertPriceInput(cleaned);
//               }}
//               onBlur={() => {
//                 const parsed = parseFloat(alertPriceInput);
//                 if (!isNaN(parsed)) {
//                   const fixed = parsed.toFixed(4);
//                   setAlertPrice(+fixed);
//                   setAlertPriceInput(fixed);
//                 } else {
//                   setAlertPrice(0);
//                   setAlertPriceInput('0.0000');
//                 }
//               }}
//               style={styles.alertPriceInput}
//               placeholder="Enter price"
//             />
//             <TouchableOpacity
//               onPress={() => {
//                 const newValue = +(alertPrice - 0.1).toFixed(4);
//                 setAlertPrice(newValue);
//                 setAlertPriceInput(newValue.toFixed(4));
//               }}
//               style={styles.adjustBtn}
//             >
//               <Text style={styles.adjustBtnText}>-</Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             onPress={createAlert}
//             style={styles.createBtn}
//             disabled={selectedCurrency === ''}
//           >
//             <Text style={styles.createBtnText}>CREATE ALERT</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.createdHeader}>Created Alerts:</Text>
//         {alerts.map((alert) => (
//           <View key={alert._id} style={styles.alertItem}>
//             <Text style={styles.alertText}>
//               {alert.pair}: ${alert.target.toFixed(2)}
//             </Text>
//             <TouchableOpacity onPress={() => deleteAlert(alert._id)}>
//               <Text style={styles.deleteText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         ))}

// </View>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backButton: {
//     marginRight: 10,
//     padding: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#004080',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: '#fff',
//     marginLeft: 10,
//     fontWeight: 'bold',
//   },
//   input: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   card: {
// backgroundColor: '#e2f1ff',
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//     margin: 20,
//   },
//   listItem: {
//     backgroundColor: '#f3f3f3',
//     padding: 10,
//     borderRadius: 6,
//     marginBottom: 6,
//   },
//   selectedBlock: {
//     marginTop: 20,
//     padding: 14,
//     backgroundColor: '#e8f0fe',
//     borderRadius: 10,
//   },
//   currencyCode: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   currentPrice: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   priceAdjustRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   adjustBtn: {
//     backgroundColor: '#1e3a8a',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 6,
//   },
//   adjustBtnText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   alertPriceInput: {
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     minWidth: 80,
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   createBtn: {
//     backgroundColor: '#1e3a8a',
//     padding: 12,
//     borderRadius: 8,
//   },
//   createBtnText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   createdHeader: {
//     marginTop: 20,
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   alertItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#f9fafb',
//     padding: 8,
//     borderRadius: 6,
//     marginTop: 8,
//   },
//   alertText: {
//     marginTop: 4,
//   },
//   deleteText: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
// });

// export default PriceAlertPage;



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AlertType = {
  _id: string;
  pair: string;
  target: number;
};

const PriceAlertPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyList, setCurrencyList] = useState<[string, string][]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<[string, string][]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currentPrice, setCurrentPrice] = useState(1.0);
  const [alertPrice, setAlertPrice] = useState(1.0);
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [alertPriceInput, setAlertPriceInput] = useState('1.0000');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
        const data = await response.json();
        const entries: [string, string][] = Object.entries(data.rates).map(
          ([key, value]) => [key, (value as number).toString()]
        );
        setCurrencyList(entries);
      } catch (err) {
        console.log("Error fetching currencies:", err);
      }
    };

    // Fetch saved alerts from AsyncStorage when the app loads
    const loadAlerts = async () => {
      try {
        const savedAlerts = await AsyncStorage.getItem('alerts');
        if (savedAlerts) {
          setAlerts(JSON.parse(savedAlerts));
        }
      } catch (err) {
        console.log('Error loading alerts:', err);
      }
    };

    fetchCurrencies();
    loadAlerts(); // Load saved alerts on app load
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCurrencies([]);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = currencyList.filter(
        ([code, name]) =>
          code.toLowerCase().includes(query) || name.toLowerCase().includes(query)
      );
      setFilteredCurrencies(filtered);
    }
  }, [searchQuery, currencyList]);

  const handleSelectCurrency = (code: string, name: string) => {
    setSelectedCurrency(code);
    setSearchQuery(code);
    setCurrentPrice(1.0);
    setAlertPrice(1.0);
  };

  const createAlert = async () => {
    const isDuplicate = alerts.some(
      (a) => a.pair === selectedCurrency && a.target === alertPrice
    );
    if (isDuplicate) {
      Alert.alert('Duplicate Alert', 'This alert already exists.');
      return;
    }

    try {
      const res = await axios.post('http://192.168.43.174:7000/alerts', {
        pair: selectedCurrency,
        target: alertPrice,
      });

      // Add the new alert to the local state
      const newAlerts = [...alerts, res.data];
      setAlerts(newAlerts);

      // Save the updated alerts to AsyncStorage
      await AsyncStorage.setItem('alerts', JSON.stringify(newAlerts));
    } catch (err) {
      console.log("Error creating alert:", err);
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      await axios.delete(`http://192.168.43.174:7000/alerts/${id}`);

      // Remove the alert from local state
      const updatedAlerts = alerts.filter((alert) => alert._id !== id);
      setAlerts(updatedAlerts);

      // Save the updated alerts to AsyncStorage
      await AsyncStorage.setItem('alerts', JSON.stringify(updatedAlerts));
    } catch (err) {
      console.log("Error deleting alert:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Price Alerts</Text>

        <TextInput
          placeholder="Search Currency"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />

        {/* Render the filtered list of currencies only when there are matching results */}
        {filteredCurrencies.length > 0 && (
          <FlatList
            data={filteredCurrencies}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectCurrency(item[0], item[1])} style={styles.listItem}>
                <Text>{item[0]} - {item[1]}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        )}

        <View style={styles.selectedBlock}>
          <Text style={styles.currencyCode}>
            {selectedCurrency !== '' ? selectedCurrency : 'Select a currency'}
          </Text>
          <Text style={styles.currentPrice}>${currentPrice.toFixed(2)}</Text>

          <View style={styles.priceAdjustRow}>
            <TouchableOpacity
              onPress={() => {
                const newValue = +(alertPrice + 0.1).toFixed(4);
                setAlertPrice(newValue);
                setAlertPriceInput(newValue.toFixed(4));
              }}
              style={styles.adjustBtn}
            >
              <Text style={styles.adjustBtnText}>+</Text>
            </TouchableOpacity>
            <TextInput
              value={alertPriceInput}
              keyboardType="decimal-pad"
              onChangeText={(val) => {
                // Allow only numbers and dot
                const cleaned = val.replace(/[^0-9.]/g, '');
                setAlertPriceInput(cleaned);
              }}
              onBlur={() => {
                const parsed = parseFloat(alertPriceInput);
                if (!isNaN(parsed)) {
                  const fixed = parsed.toFixed(4);
                  setAlertPrice(+fixed);
                  setAlertPriceInput(fixed);
                } else {
                  setAlertPrice(0);
                  setAlertPriceInput('0.0000');
                }
              }}
              style={styles.alertPriceInput}
              placeholder="Enter price"
            />
            <TouchableOpacity
              onPress={() => {
                const newValue = +(alertPrice - 0.1).toFixed(4);
                setAlertPrice(newValue);
                setAlertPriceInput(newValue.toFixed(4));
              }}
              style={styles.adjustBtn}
            >
              <Text style={styles.adjustBtnText}>-</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={createAlert}
            style={styles.createBtn}
            disabled={selectedCurrency === ''}
          >
            <Text style={styles.createBtnText}>CREATE ALERT</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.createdHeader}>Created Alerts:</Text>
        {alerts.map((alert) => (
          <View key={alert._id} style={styles.alertItem}>
            <Text style={styles.alertText}>
              {alert.pair}: ${alert.target.toFixed(2)}
            </Text>
            <TouchableOpacity onPress={() => deleteAlert(alert._id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
  listItem: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  selectedBlock: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#e8f0fe',
    borderRadius: 10,
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  currentPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  priceAdjustRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  adjustBtn: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  adjustBtnText: {
    color: '#fff',
    fontSize: 18,
  },
  alertPriceInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 80,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  createBtn: {
    backgroundColor: '#1e3a8a',
    padding: 12,
    borderRadius: 8,
  },
  createBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  createdHeader: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 16,
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  alertText: {
    marginTop: 4,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default PriceAlertPage;