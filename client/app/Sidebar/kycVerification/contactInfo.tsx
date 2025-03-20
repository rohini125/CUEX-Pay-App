import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

export default function ContactInfoScreen() {
  const router = useRouter(); // Initialize router

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Contact Information</Text>
        <Text style={styles.subtitle}>Enter your information below</Text>
        
        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#999" />
        <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" placeholderTextColor="#999" />
        <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" placeholderTextColor="#999" />
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/Sidebar/kycVerification/OTPVerification')} // Navigate using Expo Router
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebf5fc',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f7f7f7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
