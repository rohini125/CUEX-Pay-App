import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define the type for the issues object
type IssueKey = 'App Crashes' | 'Login Issues' | 'Notification Problems';

const issues: Record<IssueKey, { description: string; steps: string[] }> = {
  'App Crashes': {
    description: 'The app may crash due to bugs, insufficient device resources, or outdated software.',
    steps: [
      'Ensure your app is updated to the latest version.',
      'Clear the app cache and restart the app.',
      'Close other running apps to free up device memory.',
      'Reinstall the app if the issue persists.',
    ],
  },
  'Login Issues': {
    description: 'Login problems could arise from incorrect credentials or server downtime.',
    steps: [
      'Verify your username and password.',
      'Reset your password if you have forgotten it.',
      'Check if the app servers are operational.',
      'Contact support for further assistance.',
    ],
  },
  'Notification Problems': {
    description: 'Notification issues may result from app settings, device settings, or connectivity problems.',
    steps: [
      'Ensure notifications are enabled for the app in device settings.',
      'Check your internet connection.',
      'Restart your device.',
      'Update the app to the latest version.',
    ],
  },
};

const OtherIssues = () => {
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
        <Text style={styles.headerTitle}>Other Issues</Text>
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
                    issueKey === 'App Crashes'
                      ? require('../../../assets/images/app_crashes.png')
                      : issueKey === 'Login Issues'
                      ? require('../../../assets/images/login_issues.png')
                      : require('../../../assets/images/notification_problems.png')
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

export default OtherIssues;
