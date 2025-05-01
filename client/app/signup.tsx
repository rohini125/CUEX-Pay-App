//////////////////////////without backend ////////////////////////////////

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
// import { Link, useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons for the eye icon

// const SignUp = () => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const onPhone = () => {
//     router.navigate('/login');
//   };

//   const onSignUp = () => {
//     router.navigate('/login');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={{ padding: 20, gap: 20 }}>
//         <Image source={require("@/assets/images/signup.jpg")} style={styles.image} resizeMode="cover" />
//         <TextInput placeholder="Enter Your Name" style={styles.input} />
//         <TextInput
//             placeholder="Enter Your Email / Mobile No"
//             style={styles.input}
//           />

//         {/* Password Field with Eye Icon Inside Input */}
//         <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Enter Your Password"
//             style={styles.inputWithIcon}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity
//             style={styles.iconWrapper}
//             onPress={() => setShowPassword(!showPassword)}
//           >
//             <Ionicons
//               name={showPassword ? 'eye' : 'eye-off'}
//               size={24}
//               color="gray"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Confirm Password Field with Eye Icon Inside Input */}
//         <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Confirm Your Password"
//             style={styles.inputWithIcon}
//             secureTextEntry={!showConfirmPassword}
//           />
//           <TouchableOpacity
//             style={styles.iconWrapper}
//             onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             <Ionicons
//               name={showConfirmPassword ? 'eye' : 'eye-off'}
//               size={24}
//               color="gray"
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity activeOpacity={0.7} style={styles.signUpButton} onPress={onSignUp}>
//             <Text style={styles.signUpButtonText}>Sign Up</Text>
//         </TouchableOpacity>

//         <Text style={{ textAlign: 'center' }}>
//           Already a member?{' '}
//             <Text style={styles.link} onPress={onPhone}>
//               Sign In
//             </Text>
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#ADD8E6',
//   },
//   image: {
//     width: "100%",
//     height: 250,
//   },
//   input: {
//     // borderWidth: 1,
//     backgroundColor:'#fff',
//     height: 50,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   inputWrapper: {
//     position: 'relative',
//     backgroundColor:'#ADD8E6',
//   },
//   inputWithIcon: {
//     // borderWidth: 1,
//     height: 50,
//     backgroundColor:'#fff',
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     paddingRight: 50, // To leave space for the eye icon
//   },
//   iconWrapper: {
//     position: 'absolute',
//     right: 15,
//     top: 12,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   verifyText: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//     fontSize: 16,
//     paddingHorizontal: 5,
//     alignSelf: 'center',
//   },
//   signUpButton: {
//     backgroundColor: 'black',
//     borderRadius: 10,
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   signUpButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   link: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
// });



////////////////// with security question backend ////////////////////////

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
// const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (!name || !emailOrPhone || !securityQuestion || !securityAnswer || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(`${ API_URL }/api/auth/signup`, {
        name,
        emailOrPhone,
        securityQuestion,
        securityAnswer,
        password,
        confirmPassword,
      });

      await AsyncStorage.setItem('emailOrPhone', emailOrPhone);
      Alert.alert('Success', response.data.message);
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'} />
      <View style={{ padding: 20, gap: 20 }}>
        <Image source={require('@/assets/images/signup.jpg')} style={styles.image} resizeMode='cover' />
        <TextInput placeholder='Enter Your Name' style={styles.input} value={name} onChangeText={setName} />
        <TextInput placeholder='Enter Your Email / Mobile No' style={styles.input} value={emailOrPhone} onChangeText={setEmailOrPhone} />

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Enter Your Password'
            style={styles.inputWithIcon}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color='gray' />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Confirm Your Password'
            style={styles.inputWithIcon}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color='gray' />
          </TouchableOpacity>
        </View>

        {/* Security Question Dropdown */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={securityQuestion}
            onValueChange={(itemValue) => setSecurityQuestion(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a Security Question" value="" />
            <Picker.Item label="Where did you have your primary education?" value="primary_education" />
            <Picker.Item label="What is your favorite actor?" value="favorite_actor" />
            <Picker.Item label="what is your nick name?" value="nick_name" />
          </Picker>
        </View>

        {/* Answer Input */}
        <TextInput
          placeholder='Enter Your Answer'
          style={styles.input}
          value={securityAnswer}
          onChangeText={setSecurityAnswer}
        />

        <TouchableOpacity activeOpacity={0.7} style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center' }}>
          Already a member?{' '}
          <Text style={styles.link} onPress={() => router.navigate('/login')}>
            Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  image: {
    width: '100%',
    height: 250,
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    // borderWidth:0.3,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 0,
  },
  picker: {
    height: 50,
    paddingHorizontal: 10,
    color: '#000',
  },
  inputWrapper: {
    position: 'relative',
    backgroundColor: '#F4F6F9',
    borderColor:'whilte',
  },
  inputWithIcon: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingRight: 45,
  },
  iconWrapper: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  signUpButton: {
    backgroundColor: '#004080',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});


//////////////////////////// with backend /////////////////////////////////////////////

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
// import { Link, useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SignUp = () => {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleSignUp = async () => {
//     if (!name || !emailOrPhone || !password || !confirmPassword) {
//       Alert.alert('Error', 'All fields are required.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match.');
//       return;
//     }
//     try {
//       const response = await axios.post('http://192.168.52.190:7000/api/auth/signup', {
//         name,
//         emailOrPhone,
//         password,
//         confirmPassword,
//       });

//       await AsyncStorage.setItem('emailOrPhone', emailOrPhone);
//       Alert.alert('Success', response.data.message);
//       router.replace('/login');
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong.');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//        <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'}/>
//       <View style={{ padding: 20, gap: 20 }}>
//         <Image source={require('@/assets/images/signup.jpg')} style={styles.image} resizeMode='cover' />
//         <TextInput placeholder='Enter Your Name' style={styles.input} value={name} onChangeText={setName} />
//         <TextInput placeholder='Enter Your Email / Mobile No' style={styles.input} value={emailOrPhone} onChangeText={setEmailOrPhone} />

//         <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder='Enter Your Password'
//             style={styles.inputWithIcon}
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowPassword(!showPassword)}>
//             <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color='gray' />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder='Confirm Your Password'
//             style={styles.inputWithIcon}
//             secureTextEntry={!showConfirmPassword}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//             <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color='gray' />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity activeOpacity={0.7} style={styles.signUpButton} onPress={handleSignUp}>
//           <Text style={styles.signUpButtonText}>Sign Up</Text>
//         </TouchableOpacity>

//         <Text style={{ textAlign: 'center' }}>
//           Already a member?{' '}
//           <Text style={styles.link} onPress={() => router.navigate('/login')}>
//             Sign In
//           </Text>
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F6F9',
//   },
//   image: {
//     width: '100%',
//     height: 250,
//   },
//   input: {
//     backgroundColor: '#fff',
//     height: 50,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   inputWrapper: {
//     position: 'relative',
//     backgroundColor: '#F4F6F9',
//   },
//   inputWithIcon: {
//     height: 50,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     paddingRight: 50,
//   },
//   iconWrapper: {
//     position: 'absolute',
//     right: 15,
//     top: 12,
//   },
//   signUpButton: {
//     backgroundColor: '#004080',
//     borderRadius: 10,
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   signUpButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   link: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
// });
