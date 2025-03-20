import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const UploadDocument = () => {
  const router = useRouter();

  const pickImage = async (source: 'camera' | 'gallery') => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      // Handle the selected image (result.assets[0].uri)
      router.push('/Sidebar/kycverification');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>PAN Card Front Side Capture Tips</Text>
      <Text style={styles.description}>
        Ensure a clear picture of PAN Card to get approved faster. If you choose
        to upload, ensure it is not greater than 6MB.
      </Text>

      <Image source={require('../../assets/images/placeholder.webp')} style={styles.image} />

      <TouchableOpacity style={styles.captureButton} onPress={() => pickImage('camera')}>
        <Text style={styles.buttonText}>Capture Photo →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage('gallery')}>
        <Text style={styles.buttonText}>Upload from Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20, alignItems: 'center' },
  backButton: { alignSelf: 'flex-start', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  description: { textAlign: 'center', color: 'gray', marginBottom: 20 },
  image: { width: 150, height: 100, marginBottom: 20 },
  captureButton: { backgroundColor: 'blue', padding: 15, borderRadius: 8, marginBottom: 10, width: '80%', alignItems: 'center' },
  uploadButton: { backgroundColor: 'gray', padding: 15, borderRadius: 8, width: '80%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default UploadDocument;
