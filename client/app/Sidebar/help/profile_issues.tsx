import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define the type for the issues object
type IssueKey = 'Profile Not Updating' | 'Avatar Upload Error' | 'Invalid Information';

const issues: Record<IssueKey, { description: string; steps: string[] }> = {
  'Profile Not Updating': {
    description: 'Profile updates may fail due to poor network or validation errors.',
    steps: [
      'Ensure you have a stable internet connection.',
      'Check if all required fields are filled out correctly.',
      'Log out and log back in to refresh your profile settings.',
      'Contact support if the issue persists.',
    ],
  },
  'Avatar Upload Error': {
    description: 'Issues with uploading an avatar could be caused by file size or format restrictions.',
    steps: [
      'Ensure the file size is below the allowed limit (e.g., 2MB).',
      'Check if the file is in a supported format (e.g., JPG or PNG).',
      'Try uploading a different image.',
      'Contact support if the issue persists.',
    ],
  },
  'Invalid Information': {
    description: 'Invalid information errors occur when required fields are missing or contain incorrect data.',
    steps: [
      'Double-check all required fields for accuracy.',
      'Ensure the email and phone number are in the correct format.',
      'Clear any special characters in name fields.',
      'Contact support if you need further clarification.',
    ],
  },
};

const ProfileIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState<IssueKey | null>(null);
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Sidebar/help/help')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Issues</Text>
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
                    issueKey === 'Profile Not Updating'
                      ? require('../../../assets/images/profile_update.png')
                      : issueKey === 'Avatar Upload Error'
                      ? require('../../../assets/images/avatar_error.png')
                      : require('../../../assets/images/invalid_info.png')
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
    backgroundColor: 'ADD8E6',
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
    backgroundColor: '#E6F2FA',
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

export default ProfileIssues;
