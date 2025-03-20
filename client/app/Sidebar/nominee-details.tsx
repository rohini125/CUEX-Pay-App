import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import router for navigation
import axios from 'axios';

export default function NomineeDetails() {
  const router = useRouter();

  const [nomineeName, setNomineeName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // const handleSave = () => {
  //   if (!nomineeName || !relationship || !contactNumber) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }
  //   alert("Nominee details saved successfully!");
  //   router.push("/Sidebar/AccountSetting"); // Navigate to another page
  // };

  const API_URL = 'http://172.27.16.1:7000/api/nominees';
  const handleSave = async () => {
    if (!nomineeName || !relationship || !contactNumber) {
      alert("Please fill in all fields.");
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
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Sidebar/AccountSetting')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      {/* Header */}
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
      </View>

      {/* Save Button */}
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Nominee</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor:'#ADD8E6'
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
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 10,
    padding: 10,
  },
  card: {
    backgroundColor: "#E6F2FA",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    margin: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "black", // Gray text
    marginBottom: 8,
    fontWeight:'bold'
  },
  input: {
    backgroundColor: "#F3F4F6", // Light gray input background
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#111827", // Dark text
    borderWidth: 1,
    borderColor: "#D1D5DB", // Light border
  },
  button: {
    backgroundColor: "black", // Indigo color
    borderRadius: 24,
    paddingVertical: 14,
    shadowColor: "#4F46E5",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
