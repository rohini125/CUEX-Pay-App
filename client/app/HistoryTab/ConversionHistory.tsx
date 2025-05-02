import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env'; // Environment variable for API URL

const ConversionHistory = () => {
  console.log("ConversionHistory component rendered");  // Debug log
  const [history, setHistory] = useState<any[]>([]); // To store conversion history
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const user = await AsyncStorage.getItem('emailOrPhone');
        console.log("User retrieved:", user);
        
        if (user) {
          // Correct API URL for fetching user-specific conversion history
          const response = await axios.get(`${API_URL}/api/history/${user}`);
          console.log("API_URL:", API_URL);
          console.log("Conversion History Response:", response.data);
          setHistory(response.data); // Set the conversion history
        } else {
          setError('User not logged in!');
        }
      } catch (error) {
        setError('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Conversion History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
        <View style={styles.historyItem}>
            <View style={styles.currencyInfo}>
                <Text style={styles.currencyText}>From: <Text style={styles.currencyValue}>{item.fromCurrency}</Text></Text>
                <Text style={styles.currencyText}>To: <Text style={styles.currencyValue}>{item.toCurrency}</Text></Text>
            </View>

            <View style={styles.amountInfo}>
                <Text style={styles.amountText}>Amount: <Text style={styles.amountValue}>{item.amount}</Text></Text>
                <Text style={styles.amountText}>Converted: <Text style={styles.amountValue}>{item.convertedAmount}</Text></Text>
                <Text style={styles.rateText}>Rate: <Text style={styles.rateValue}>{item.rate}</Text></Text>
            </View>

            <Text style={styles.dateText}>Date: {new Date(item.date).toLocaleString()}</Text>
        </View>

        )}
      />
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    textAlign: 'center',
    color: '#D32F2F',
    fontSize: 18,
  },
  textHeader: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 12,
    color: '#555',
  },
  historyItem: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  currencyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  currencyText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  currencyValue: {
    fontWeight: 'bold',
    color: '#00796b',
  },
  amountInfo: {
    marginBottom: 15,
  },
  amountText: {
    fontSize: 14,
    color: '#555',
  },
  amountValue: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#d32f2f',
  },
  rateText: {
    fontSize: 12,
    color: '#555',
  },
  rateValue: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#1976d2',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default ConversionHistory;

