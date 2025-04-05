import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet,ScrollView,StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native-gesture-handler';

export default function ProofOfIdentityScreen() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const router = useRouter();

  const openGallery = async (side: 'front' | 'back') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      if (side === 'front') {
        setFrontImage(result.assets[0].uri);
      } else {
        setBackImage(result.assets[0].uri);
      }
    }
  };

  const handleNext = () => {
    if (selectedDoc && frontImage && backImage) {
      alert('Documents uploaded successfully!');
      router.push('/Sidebar/kycVerification/BiometricVerification');
    } else {
      alert('Please select a document type and upload both front and back images.');
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
       <StatusBar backgroundColor="#004080" barStyle="light-content"  />

    <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Sidebar/kycVerification/faceRecognition')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KYC Verification</Text>
      </View> 
      <View style={styles.card}>
      <Text style={styles.title}>Proof of Identity</Text>
      <Text style={styles.subtitle}>Choose the type of document you want to upload.</Text>

      {/* Document Selection */}
      <View style={styles.buttonGroup}>
        {['Passport', 'Driving License', 'Aadhar Card', 'PAN Card'].map((doc) => (
          <TouchableOpacity
            key={doc}
            style={[styles.docButton, selectedDoc === doc && styles.selectedDoc]}
            activeOpacity={0.8}
            onPress={() => setSelectedDoc(doc)}
          >
            <Text style={[styles.docText, selectedDoc === doc && styles.selectedText]}>{doc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Front Side Upload */}
      <Text style={styles.sectionTitle}>Upload Front Side</Text>
      <View style={styles.imageContainer}>
        {frontImage ? (
          <Image source={{ uri: frontImage }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => openGallery('front')}>
        <Text style={styles.buttonText}>Upload Front</Text>
      </TouchableOpacity>

      {/* Back Side Upload */}
      <Text style={styles.sectionTitle}>Upload Back Side</Text>
      <View style={styles.imageContainer}>
        {backImage ? (
          <Image source={{ uri: backImage }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => openGallery('back')}>
        <Text style={styles.buttonText}>Upload Back</Text>
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} activeOpacity={0.8} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#f5f7fa',
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
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
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
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  docButton: {
    backgroundColor: '#004080',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    margin: 6,
    alignItems: 'center',
  },
  selectedDoc: {
    backgroundColor: '#007BFF',
  },
  docText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
  },
  imageContainer: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: '#004080',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#004080',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
