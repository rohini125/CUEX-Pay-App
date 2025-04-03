import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import router for navigation
import axios from 'axios';

export default function NomineeDetails() {
  const router = useRouter();
  const [nomineeName, setNomineeName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const API_URL = 'http://172.20.80.1:7000/api/nominees';

  // Function to validate 10-digit phone number
  const isValidPhoneNumber = (number: string) => { 
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(number);
  };
  

  const handleSave = async () => {
    if (!nomineeName || !relationship || !contactNumber) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidPhoneNumber(contactNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        nomineeName,
        relationship,
        contactNumber,
      });

      if (response.status === 201) {
        alert("Nominee details saved successfully!");
        router.push("/Sidebar/AccountSetting");
      } else {
        alert("Failed to save nominee details.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving nominee details.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#004080" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Sidebar/AccountSetting')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nominee Details</Text>
      </View>

      {/* Card Container */}
      <View style={styles.card}>
        {/* Nominee Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nominee Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter nominee's name"
            value={nomineeName}
            onChangeText={setNomineeName}
          />
        </View>

        {/* Relationship */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Relationship</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter relationship (e.g., spouse, child)"
            value={relationship}
            onChangeText={setRelationship}
          />
        </View>

        {/* Contact Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Nominee</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff'
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
  },
  card: {
    backgroundColor: "#e2f1ff",
    borderRadius: 12,
    height:"60%",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    margin: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: "black",
    marginBottom: 8,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  button: {
    backgroundColor: '#004080',
    borderRadius: 12,
    alignItems: 'center',
    marginTop:30,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
