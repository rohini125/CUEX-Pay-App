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



////////////////// simple backend correct code //////////////////////////////////////////



// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
// import axios from "axios";

// const RegisterScreen = () => {
//   const [name, setName] = useState("");
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleRegister = async () => {
//     if (!name || !emailOrPhone || !password || !confirmPassword) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match.");
//       return;
//     }
    
//     try {
//       const response = await axios.post("http://192.168.52.190:9000/api/auth/signup", {
//         name,
//         emailOrPhone,
//         password,
//         confirmPassword,
//       });
//       Alert.alert("Success", response.data.message);
//     } catch (error) {
//       Alert.alert("Error");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email or Phone"
//         value={emailOrPhone}
//         onChangeText={setEmailOrPhone}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default RegisterScreen;



//////////////////////////// with backend /////////////////////////////////////////////


import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (!name || !emailOrPhone || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://172.27.16.1:7000/api/auth/signup', {
        name,
        emailOrPhone,
        password,
        confirmPassword,
      });
      Alert.alert('Success', response.data.message);
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <ScrollView style={styles.container}>
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
    backgroundColor: '#ADD8E6',
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
  },
  inputWrapper: {
    position: 'relative',
    backgroundColor: '#ADD8E6',
  },
  inputWithIcon: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingRight: 50,
  },
  iconWrapper: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  signUpButton: {
    backgroundColor: 'black',
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