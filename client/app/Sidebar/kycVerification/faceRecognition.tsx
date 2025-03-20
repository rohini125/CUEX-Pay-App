import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function FaceRecognitionScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  // Function to open the camera
  const openCamera = async () => {
    console.log('Requesting camera permissions...');
    
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log(`Camera Permission: ${cameraStatus}, Media Library Permission: ${mediaLibraryStatus}`);

    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert('Permission Required', 'Camera and media library access are required for face verification.');
      return;
    }

    console.log('Opening camera...');
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    console.log('Camera result:', result);

    if (!result.canceled && result.assets.length > 0) {
      console.log('Image selected:', result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log('Camera was closed or no image was taken.');
    }
  };

  // Function to open the gallery
  const openGallery = async () => {
    console.log('Opening gallery...');
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    console.log('Gallery result:', result);

    if (!result.canceled && result.assets.length > 0) {
      console.log('Image selected from gallery:', result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log('No image was selected.');
    }
  };

  // Function to handle next button click
  const handleNext = () => {
    console.log('Next button clicked.');
    if (selectedImage) {
      Alert.alert('Success', 'Face verification successful!');
      router.push('/Sidebar/kycVerification/ProofOfIdentity');
    } else {
      Alert.alert('Error', 'Please take or upload a photo for verification.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face Recognition</Text>
      <Text style={styles.subtitle}>Take a selfie or upload a clear photo.</Text>

      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Take a Selfie</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.buttonText}>Upload from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  placeholderText: {
    color: '#555',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

