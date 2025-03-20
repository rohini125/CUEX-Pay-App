import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const About = () => {
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
  

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      Alert.alert('Form Submitted', 'Thank you for contacting us!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      Alert.alert('Error', 'Please fill in all required fields.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
   {/* Back Button */}
   <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Sidebar/menu')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#black" />
      </TouchableOpacity>
      {/* About Section */}
        <Text style={styles.headerTitle}>About Us</Text>
    </View>
      <View style={styles.section}>
        <Text style={styles.cardTitle}>Company Overview</Text>
        <Text style={styles.cardText}>
          "At CUEX, we are redefining how people exchange and manage their money globally..."
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meet Our Developers</Text>
        {/* Developer Cards */}
        {['Parkale Sakshi', 'Salunke Yash', 'Navale Komal', 'Kandekar Rohini'].map((name, index) => (
          <View key={index} style={styles.card}>
            <Image source={require('../../assets/images/signup.jpg')} style={styles.profilePic} />
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardText}>Role: Developer Role Here</Text>
          </View>
        ))}
      </View>
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
    
  },
  headerTitle: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: 'black',
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
    color: 'black',
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

export default About;
