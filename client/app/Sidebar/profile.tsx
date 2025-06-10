import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';

const Profile = () => {
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [upiId, setUpiId] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) setUserId(id);
    };
    fetchUserId();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);

      const fileName = uri.split('/').pop() || `profile_${Date.now()}.jpg`;
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? match[1] : 'jpg';

      const formData = new FormData();
      formData.append('profileImage', {
        uri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);

      try {
        await axios.put(`${API_URL}/api/profile/upload/${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('Success', 'Profile image uploaded!');
      } catch (error) {
        console.error(error);
        Alert.alert('Upload Failed', 'Something went wrong.');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${API_URL}/api/profile/update/${userId}`, {
        username,
        email,
        mobile,
        upiId,
        gender,
        maritalStatus,
        age,
        dob,
        familyMembers,
      });
      Alert.alert('Success', 'Profile updated!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Update failed.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>

      <TouchableOpacity onPress={handleImagePick} style={styles.imageWrapper}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: '#999' }}>Select Profile Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput value={username} onChangeText={setUsername} style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput value={mobile} onChangeText={setMobile} keyboardType="phone-pad" style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>UPI ID</Text>
        <TextInput value={upiId} onChangeText={setUpiId} style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput value={age} onChangeText={setAge} keyboardType="number-pad" style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth (YYYY-MM-DD)</Text>
        <TextInput value={dob} onChangeText={setDob} style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Family Members</Text>
        <TextInput value={familyMembers} onChangeText={setFamilyMembers} keyboardType="number-pad" style={styles.input} />
      </View>

      <Text style={styles.sectionTitle}>Gender</Text>
      <View style={styles.radioGroup}>
        {['Male', 'Female', 'Other'].map((option) => (
          <TouchableOpacity key={option} style={styles.radioOption} onPress={() => setGender(option)}>
            <View style={styles.radioCircle}>{gender === option && <View style={styles.selectedCircle} />}</View>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Marital Status</Text>
      <View style={styles.radioGroup}>
        {['Single', 'Married'].map((option) => (
          <TouchableOpacity key={option} style={styles.radioOption} onPress={() => setMaritalStatus(option)}>
            <View style={styles.radioCircle}>{maritalStatus === option && <View style={styles.selectedCircle} />}</View>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  imageWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  imagePlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#aaa',
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sectionTitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  radioGroup: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
