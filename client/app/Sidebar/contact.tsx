import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  

  // const handleSubmit = () => {
  //   if (formData.name && formData.email && formData.subject && formData.message) {
  //     Alert.alert('Form Submitted', 'Thank you for contacting us!');
  //     setFormData({ name: '', email: '', subject: '', message: '' });
  //   } else {
  //     Alert.alert('Error', 'Please fill in all required fields.');
  //   }
  //    // Navigate to the help page
  // router.push('/Sidebar/help/help'); // Replace '/help' with the actual path of your Help page
  // };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
  
    try {
      console.log("Sending request to API:", formData);
  
      const response = await fetch('http://172.27.16.1:7000/newuser/user', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Response from API:", data);
  
      if (response.ok) {
        Alert.alert('Success', data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        Alert.alert('Error', data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert('Error', 'Failed to send message.');
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Contact Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.label}>Your Name (required)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <Text style={styles.label}>Your Email (required)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the subject"
          value={formData.subject}
          onChangeText={(value) => handleInputChange('subject', value)}
        />
        <Text style={styles.label}>Your Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter your message"
          value={formData.message}
          onChangeText={(value) => handleInputChange('message', value)}
          multiline
        />
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ADD8E6',
    
  },
  backButton: {
    marginRight: 10,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
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
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#E6F2FA',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 16,
    marginTop:100
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007BFF',
    textAlign: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop:10
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
});

export default contact;
