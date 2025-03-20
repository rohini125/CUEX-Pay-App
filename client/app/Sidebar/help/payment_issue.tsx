import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define the type for the issues object
type IssueKey = 'Failed Transactions' | 'Delayed Refunds' | 'Card Declined';

const issues: Record<IssueKey, { description: string; steps: string[] }> = {
  'Failed Transactions': {
    description: 'Transactions might fail due to network issues, server downtime, or incorrect details.',
    steps: [
      'Check your internet connection.',
      'Ensure your payment details are correct.',
      'Try again after some time.',
      'Contact support if the issue persists.',
    ],
  },
  'Delayed Refunds': {
    description: 'Refunds may take time due to processing delays or bank-related issues.',
    steps: [
      'Verify the refund timeline from the merchant.',
      'Check with your bank for pending transactions.',
      'Ensure you’ve used the correct account for the refund.',
      'Contact support if the refund is not received within the promised time.',
    ],
  },
  'Card Declined': {
    description: 'Your card might be declined due to insufficient balance, incorrect details, or restrictions.',
    steps: [
      'Check your card details.',
      'Ensure sufficient funds are available.',
      'Contact your bank to lift any restrictions.',
      'Try another card if possible.',
    ],
  },
};

const PaymentIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState<IssueKey | null>(null);
  const router = useRouter(); 
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
      <TouchableOpacity onPress={() => router.push('/Sidebar/help/help')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Issues</Text>
      </View>

      {/* Common Issues List */}
      <View style={styles.issuesList}>
        {Object.keys(issues).map((key) => {
          const issueKey = key as IssueKey;
          return (
            <View key={issueKey} style={styles.issueContainer}>
              <TouchableOpacity
                style={styles.issueItem}
                onPress={() =>
                  setSelectedIssue((prev) => (prev === issueKey ? null : issueKey))
                }
              >
                <Image
                  source={
                    issueKey === 'Failed Transactions'
                      ? require('../../../assets/images/failed_transaction.png')
                      : issueKey === 'Delayed Refunds'
                      ? require('../../../assets/images/delayed_refund.png')
                      : require('../../../assets/images/card_declined.png')
                  }
                  style={styles.issueIcon}
                />
                <Text style={styles.issueText}>{issueKey}</Text>
              </TouchableOpacity>

              {/* Display the message below the selected icon */}
              {selectedIssue === issueKey && (
                <View style={styles.card}>
                  <Text style={styles.cardDescription}>
                    {issues[issueKey].description}
                  </Text>
                  <Text style={styles.cardStepsTitle}>Troubleshooting Steps:</Text>
                  {issues[issueKey].steps.map((step, index) => (
                    <Text key={index} style={styles.cardStep}>
                      {index + 1}. {step}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
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
  issuesList: {
    padding: 16,
    backgroundColor:'#E6F2FA',
    margin:20
  },
  issueContainer: {
    marginBottom: 16,
  },
  issueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  issueIcon: {
    width: 50,
    height: 50,
    marginRight: 12,
    tintColor: '#6200ee',
  },
  issueText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  card: {
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  cardStepsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardStep: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default PaymentIssues;
