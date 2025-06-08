// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert,StatusBar } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { API_URL } from '@env';

// const contact = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData({ ...formData, [field]: value });
//   };
  

// // const handleSubmit = async () => {
// //   const { name, email, subject, message } = formData;

// //   if (!name || !email || !subject || !message) {
// //     Alert.alert('Error', 'Please fill in all required fields.');
// //     return;
// //   }

// //   try {
// //     const response = await fetch(`${API_URL}/newuser`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ name, email, subject, message }),
// //     });

// //     const data = await response.json();

// //     if (response.ok) {
// //       Alert.alert('Success', data.message || 'Message sent!');
// //       setFormData({ name: '', email: '', subject: '', message: '' });
// //     } else {
// //       Alert.alert('Error', data.message || 'Something went wrong.');
// //     }
// //   } catch (error) {
// //     console.error('Submit Error:', error);
// //     Alert.alert('Error', 'Failed to send message. Make sure your backend server is running.');
// //   }
// // };

// const handleSubmit = async () => {
//   if (!formData.name || !formData.email || !formData.subject || !formData.message) {
//     Alert.alert('Error', 'Please fill in all required fields.');
//     return;
//   }

//   try {
  

// const response = await fetch(`${API_URL}/newuser`, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(formData),
// });


//     const data = await response.json();

//     if (response.ok) {
//       Alert.alert('Success', data.message || 'Message sent!');
//       setFormData({ name: '', email: '', subject: '', message: '' });
//     } else {
//       Alert.alert('Error', data.message || 'Something went wrong.');
//     }
//   } catch (error) {
//     console.error('Submit Error:', error);
//     Alert.alert('Error', 'Failed to send message. Check your server and network.');
//   }
// };

  

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
// <StatusBar backgroundColor="#004080" barStyle="light-content" />
//      <View style={styles.header}>
//            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Sidebar/help/help')} style={styles.backButton}>
//              <Ionicons name="arrow-back" size={24} color="#fff" />
//            </TouchableOpacity>
//          {/* Header */}
//          <Text style={styles.headerTitle}>Contact</Text>
//          </View>

//       {/* Contact Form */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Contact Us</Text>
//         <Text style={styles.label}>Your Name (required)</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           value={formData.name}
//           onChangeText={(value) => handleInputChange('name', value)}
//         />
//         <Text style={styles.label}>Your Email (required)</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           value={formData.email}
//           onChangeText={(value) => handleInputChange('email', value)}
//           keyboardType="email-address"
//         />
//         <Text style={styles.label}>Subject</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter the subject"
//           value={formData.subject}
//           onChangeText={(value) => handleInputChange('subject', value)}
//         />
//         <Text style={styles.label}>Your Message</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="Enter your message"
//           value={formData.message}
//           onChangeText={(value) => handleInputChange('message', value)}
//           multiline
//         />
//         <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Submit</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
    
//   },
//   backButton: {
//     marginRight: 10,
//     padding: 10,
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'black',
//     textAlign: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#004080',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginLeft: 10,
//   },

//   section: {
//     backgroundColor: '#e2f1ff',
//     padding: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     margin: 10,
//     marginTop:10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'black',
//     textAlign: 'center',
    
//   },
//   card: {
//     alignItems: 'center',
//     backgroundColor: '#e2f1ff',
//     padding: 16,
//     borderRadius: 8,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 16,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     marginTop:10
//   },
//   cardText: {
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: 'black',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     marginBottom: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   button: {
//     backgroundColor: '#004080',
//     paddingVertical: 12,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

// });

// export default contact;










import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Alert, StatusBar, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API_URL } from '@env';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
  const { name, email, subject, message } = formData;

  if (!name || !email || !subject || !message) {
    Alert.alert('Error', 'Please fill in all required fields.');
    return;
  }

  if (!emailRegex.test(email)) {
    Alert.alert('Error', 'Please enter a valid email address.');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/newuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (response.ok) {
      Alert.alert('Success', data?.message || 'Message sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      const errorMsg = data?.message || 'Something went wrong.';
      Alert.alert('Error', errorMsg);
    }
  }  catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Submit Error:', error.message);
  } else {
    console.error('Unknown Submit Error:', error);
  }
  Alert.alert('Error', 'Failed to send message. Check your server and network.');
}
 finally {
    setLoading(false);
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar backgroundColor="#004080" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/Sidebar/help/help')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact</Text>
        </View>

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
            autoCapitalize="none"
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
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 10,
    padding: 10,
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
  section: {
    backgroundColor: '#e2f1ff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
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
    backgroundColor: '#004080',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Contact;
