import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define the type for the issues object
type IssueKey = 'Recharge Failed' | 'Incorrect Recharge Amount' | 'Bill Payment Issues';

const issues: Record<IssueKey, { description: string; steps: string[] }> = {
  'Recharge Failed': {
    description: 'Recharge might fail due to network issues, incorrect details, or server downtime.',
    steps: [
      'Verify your mobile number or account details.',
      'Check your internet connection.',
      'Ensure sufficient balance in your wallet or payment method.',
      'Try again after some time.',
      'Contact support if the issue persists.',
    ],
  },
  'Incorrect Recharge Amount': {
    description: 'Entering an incorrect amount can lead to failed or incorrect transactions.',
    steps: [
      'Double-check the recharge amount before proceeding.',
      'Review the recharge plan details.',
      'Ensure the selected plan matches the entered amount.',
      'Contact support for assistance with corrections.',
    ],
  },
  'Bill Payment Issues': {
    description: 'Issues may occur with bill payments due to incorrect details or network problems.',
    steps: [
      'Verify the biller details entered.',
      'Check for pending payments in your account.',
      'Ensure your payment method is active and functional.',
      'Retry the payment after a few minutes.',
      'Reach out to support for unresolved issues.',
    ],
  },
};

const RechargeAndBillHelp = () => {
  const [selectedIssue, setSelectedIssue] = useState<IssueKey | null>(null);
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#004080" barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.push('/Sidebar/help/help')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recharge & Bill Issues</Text>
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
                    issueKey === 'Recharge Failed'
                      ? require('../../../assets/images/failed_transaction.png')
                      : issueKey === 'Incorrect Recharge Amount'
                      ? require('../../../assets/images/incorrect_amount.png')
                      : require('../../../assets/images/bill_payment.png')
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
    backgroundColor: '#fff',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  backButton: {
    marginRight: 10,
    padding: 10,
  },
  issuesList: {
    padding: 16,
    backgroundColor:'#e2f1ff',
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
    tintColor: '#004080',
  },
  issueText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  card: {
    marginTop: 8,
    backgroundColor: '#e2f1ff',
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

export default RechargeAndBillHelp;
