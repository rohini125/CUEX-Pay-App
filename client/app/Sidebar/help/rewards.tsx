import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define the type for the issues object
type IssueKey = 'Missing Rewards' | 'Referral Code Not Working' | 'Reward Redemption Issues';

const issues: Record<IssueKey, { description: string; steps: string[] }> = {
  'Missing Rewards': {
    description: 'Rewards may not be credited due to system errors or unmet eligibility criteria.',
    steps: [
      'Ensure the referred user has signed up using your referral code.',
      'Check if the referral conditions have been fulfilled.',
      'Allow up to 48 hours for rewards to be credited.',
      'Contact support if the rewards are still missing.',
    ],
  },
  'Referral Code Not Working': {
    description: 'Issues with referral codes can occur due to incorrect entry or code expiration.',
    steps: [
      'Double-check the referral code for any typos.',
      'Verify if the code is still valid and not expired.',
      'Ensure the user hasn’t already signed up with another referral code.',
      'Reach out to support for further assistance.',
    ],
  },
  'Reward Redemption Issues': {
    description: 'Problems in redeeming rewards might arise due to system errors or unverified accounts.',
    steps: [
      'Verify if your account meets the redemption criteria.',
      'Check for any restrictions or minimum balance requirements.',
      'Ensure your account is verified and active.',
      'Contact support if redemption continues to fail.',
    ],
  },
};

const ReferAndEarnIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState<IssueKey | null>(null);
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.push('/Sidebar/help/help')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Earn Issues</Text>
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
                    issueKey === 'Missing Rewards'
                      ? require('../../../assets/images/missing_rewards.png')
                      : issueKey === 'Referral Code Not Working'
                      ? require('../../../assets/images/referral_code_issue.png')
                      : require('../../../assets/images/reward_redemption.png')
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

export default ReferAndEarnIssues;
