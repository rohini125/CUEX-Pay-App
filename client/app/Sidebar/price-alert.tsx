import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router'; // Import router for navigation
import { Ionicons } from '@expo/vector-icons';

// Define the AlertData interface
interface AlertData {
  type: 'price' | 'percentage'; // Type of alert (price or percentage)
  value: number | string;       // Value of the alert
  description: string;          // Description of the alert
}

export default function PriceAlerts() {
  const router = useRouter(); // For navigation

  // List of currencies with their symbols
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    // Add more currencies as needed
  ];

  // State variables
  const [currentPrice, setCurrentPrice] = useState(1.0); // Example current price
  const [alertPrice, setAlertPrice] = useState(1.2); // Default alert price
  const [percentageChange, setPercentageChange] = useState(5); // Default percentage change
  const [selectedMode, setSelectedMode] = useState<'price' | 'percentage'>('price'); // Default mode
  const [alerts, setAlerts] = useState<AlertData[]>([]); // Array to store created alerts
  const [searchQuery, setSearchQuery] = useState(''); // For searching currencies
  const [selectedCurrency, setSelectedCurrency] = useState<{ code: string; name: string; symbol: string }>({
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  });

  // Handle "By Price" selection
  const handleByPrice = () => {
    setSelectedMode('price');
    setAlertPrice(currentPrice + 0.2);
  };

  // Handle "By % Change" selection
  const handleByPercentageChange = () => {
    setSelectedMode('percentage');
    setPercentageChange(5);
  };

  // Adjust Price for "By Price" Mode
  const adjustAlertPrice = (amount: number) => {
    setAlertPrice((prev) => Math.max(0, prev + amount));
  };

  // Adjust Percentage for "By % Change" Mode
  const adjustPercentageChange = (amount: number) => {
    setPercentageChange((prev) => Math.max(0, prev + amount));
  };

  const handleDeleteAlert = (index: number) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
    Alert.alert('Alert Deleted', 'The selected alert has been removed.');
  };

//handle create alert
const handleCreateAlert = () => {
  let alertData: AlertData;

  if (selectedMode === 'price') {
    alertData = {
      type: 'price',
      value: alertPrice.toFixed(2),
      description: `Alert when price reaches ${selectedCurrency.symbol}${alertPrice.toFixed(2)}`,
    };

    // Check if current price equals alert price
    if (alertPrice.toFixed(2) === currentPrice.toFixed(2)) {
      Alert.alert('Alert Triggered', `Price is already ${selectedCurrency.symbol}${alertPrice.toFixed(2)}!`);
      return;
    }
  } else {
    const targetPrice = currentPrice * (1 + percentageChange / 100);
    alertData = {
      type: 'percentage',
      value: percentageChange.toFixed(2),
      description: `Alert when price changes by ${percentageChange}% to ${selectedCurrency.symbol}${targetPrice.toFixed(2)}`,
    };

    // Check if current price equals target price for percentage
    if (targetPrice.toFixed(2) === currentPrice.toFixed(2)) {
      Alert.alert('Alert Triggered', `Price has already changed by ${percentageChange}% to ${selectedCurrency.symbol}${currentPrice.toFixed(2)}!`);
      return;
    }
  }

  // **Enhanced Duplicate Check**
  const isDuplicate = alerts.some(
    (alert) =>
      alert.type === alertData.type &&
      alert.value === alertData.value &&
      alert.description === alertData.description
  );

  if (isDuplicate) {
    Alert.alert('Duplicate Alert', 'This alert already exists.');
    return;
  }

  // Add the new alert
  setAlerts((prev) => [...prev, alertData]);

  // Show confirmation
  Alert.alert('Alert Created', alertData.description);
};

  
  // Search currencies based on query
  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle currency selection
  const handleCurrencySelect = (currency: { code: string; name: string; symbol: string }) => {
    setSelectedCurrency(currency);
    setSearchQuery('');
    setCurrentPrice(1.0); // Reset price or set a real price here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Sidebar/menu')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            {/* Header */}
            <Text style={styles.headerTitle}> Price Alerts</Text>
            </View>
    <View style={styles.card}>
      {/* Currency Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Currency"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Currency List */}
      {searchQuery.length > 0 && (
        <FlatList
          data={filteredCurrencies}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7} style={styles.currencyItem} onPress={() => handleCurrencySelect(item)}>
              <Text style={styles.currencyCode}>{item.code}</Text>
              <Text style={styles.currencyName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Current Currency and Value */}
      <View style={styles.currencyRow}>
        <Text style={styles.currencyText}>{selectedCurrency.code}</Text>
        <Text style={styles.currencyValue}>
          {selectedCurrency.symbol}
          {currentPrice.toFixed(2)}
        </Text>
      </View>

      {/* Mode Selection */}
      <View style={styles.alertOptions}>
        <TouchableOpacity activeOpacity={0.7}
          style={[styles.alertButton, selectedMode === 'price' && styles.selectedButton]}
          onPress={handleByPrice}
        >
          <Text style={styles.alertButtonText}>BY PRICE</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}
          style={[styles.alertButton, selectedMode === 'percentage' && styles.selectedButton]}
          onPress={handleByPercentageChange}
        >
          <Text style={styles.alertButtonText}>BY % CHANGE</Text>
        </TouchableOpacity>
      </View>

      {/* Alert Input Section */}
      {selectedMode === 'price' ? (
        <View>
          <Text style={styles.alertLabel}>ALERT PRICE:</Text>
          <View style={styles.priceAdjuster}>
            <TouchableOpacity activeOpacity={0.7} style={styles.adjustButton} onPress={() => adjustAlertPrice(-0.1)}>
              <Text style={styles.adjustButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.alertPrice}>
              {selectedCurrency.symbol}
              {alertPrice.toFixed(2)}
            </Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.adjustButton} onPress={() => adjustAlertPrice(0.1)}>
              <Text style={styles.adjustButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.alertLabel}>ALERT % CHANGE:</Text>
          <View style={styles.priceAdjuster}>
            <TouchableOpacity activeOpacity={0.7} style={styles.adjustButton} onPress={() => adjustPercentageChange(-1)}>
              <Text style={styles.adjustButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.alertPrice}>{percentageChange}%</Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.adjustButton} onPress={() => adjustPercentageChange(1)}>
              <Text style={styles.adjustButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Create Alert Button */}
      <TouchableOpacity activeOpacity={0.7} style={styles.createButton} onPress={handleCreateAlert}>
        <Text style={styles.createButtonText}>CREATE ALERT</Text>
      </TouchableOpacity>

      {/* Display Created Alerts */}
      <View style={styles.alertsContainer}>
        <Text style={styles.alertsHeader}>Created Alerts:</Text>
        <FlatList
  data={alerts}
  keyExtractor={(_, index) => index.toString()} // Generates a unique key using the index
  renderItem={({ item, index }) => (
    <View style={styles.alertItem}>
      <Text style={styles.alertDescription}>{item.description}</Text>
      <TouchableOpacity activeOpacity={0.7}
        style={styles.deleteButton}
        onPress={() => handleDeleteAlert(index)} // Pass the index to handleDeleteAlert
      >
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
      
    </View>
    
  )}
/>


      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#ADD8E6'
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
  searchBar: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
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
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currencyValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  currencyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyName: {
    fontSize: 14,
    color: '#555',
  },
  alertOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  alertButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alertLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceAdjuster: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  adjustButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
  adjustButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertsContainer: {
    marginTop: 30,
  },
  alertsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  alertDescription: {
    fontSize: 16,
  },
    deleteButton: {
    padding: 5,
  },
});
