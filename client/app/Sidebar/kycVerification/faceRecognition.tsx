import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert,StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
       <StatusBar backgroundColor="#004080" barStyle="light-content"  />
      
<View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Sidebar/kycVerification/OTPVerification')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KYC Verification</Text>
      </View> 
      <View style={styles.card}>
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
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#fff',
    // padding: 20,
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
     textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
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
  card: {
    backgroundColor: '#e2f1ff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    padding: 24,
    margin:30,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#555',
  },
  button: {
    backgroundColor: '#004080',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    textAlign:'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
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
    textAlign:'center'
  },
});

