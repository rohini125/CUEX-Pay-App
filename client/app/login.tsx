// ////////////////////////// without backend /////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Modal, StatusBar} from 'react-native';

// import {useRouter } from 'expo-router';

// const Login = () => {
//   const router = useRouter();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [email, setEmail] = useState('');
//   const [resetSuccess, setResetSuccess] = useState(false); // To track reset success

//   const onLogin = () => {
//     router.navigate('/verification');
//   };

//   const onSignUp = () => {
//     router.navigate('/signup');
//   };

//   const onForgotPassword = () => {
//     setModalVisible(true); // Show the modal when "Forgot Password?" is clicked
//     };
    
//     const onResetPassword = () => {
//     // Logic for sending the reset link (use your backend for this)
//     console.log("Password reset link sent to:", email);
//     setResetSuccess(true); // Mark as success
//     };

//     const onCloseModal = () => {
//       setModalVisible(false); // Close the modal when "X" is clicked
//       setResetSuccess(false); // Reset the success state when modal is closed
//     };

//   return (
//     <ScrollView style={styles.container}>

//       <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'}/>
//       <View style={{ padding: 20, gap: 20 }}>
//         <Image source={require("@/assets/images/login.jpg")} style={styles.image} resizeMode="cover" />
//         <TextInput placeholder="Enter Your Email / Mobile no" style={styles.input} />
//         <TextInput placeholder="Enter Your Password" style={styles.input} secureTextEntry />

//             <Text style={styles.forgotPassword} onPress={onForgotPassword}>Forgot Password?</Text>
          
//           <TouchableOpacity activeOpacity={0.7} style={styles.signInButton} onPress={onLogin}>
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//           <Text style={{ textAlign: 'center' }}>
//           Don't have an account?{' '}
//             <Text style={styles.link} onPress={onSignUp}>
//               Signup
//             </Text>
//         </Text> 
//       </View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={onCloseModal}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
//               <Text style={styles.closeButtonText}>X</Text>
//             </TouchableOpacity>

//             {!resetSuccess ? (
//               <>
//                 <Text style={styles.modalHeader}>Forgot Password ?</Text>
//                 <Text style={styles.modalDescription}>
//                   Enter the email address associated with your account, and we'll email you a link to reset your password.
//                 </Text>

//                 <Text style={styles.label}>Email</Text>
//                 <TextInput
//                   style={styles.modalInput}
//                   placeholder="Enter your email"
//                   keyboardType="email-address"
//                   value={email}
//                   onChangeText={setEmail}
//                 />
//                 <TouchableOpacity style={styles.modalButton} onPress={onResetPassword}>
//                   <Text style={styles.modalButtonText}>SEND RESET LINK</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.modalButtonCancel} onPress={onCloseModal}>
//                   <Text style={styles.modalButtonTextCancel}>CANCEL</Text>
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <>
//                 <View style={styles.successContainer}>
//                   <View style={styles.checkCircle}>
//                     <Text style={styles.checkCircleText}>✓</Text>
//                   </View>
//                   <Text style={styles.successMessage}>Email sent successfully!</Text>
//                   <Text style={styles.emailConfirmation}>
//                     A link to reset your password has been sent to {email}
//                   </Text>
//                 </View>

//                 <TouchableOpacity style={styles.modalButtonCancel} onPress={onCloseModal}>
//                   <Text style={styles.modalButtonTextCancel}>CLOSE</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#F4F6F9',
//   },
//   image: {
//     width: "100%",
//     height: 300,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   input: {
//     // borderWidth: 1,
//     height: 50,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     backgroundColor:'#fff',
//   },
//   signInButton: {
//     backgroundColor: '#004080',
//     borderRadius: 10,
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   signInButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   link: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
//   forgotPassword: {
//     color: 'blue',
//     fontSize: 14,
//     textAlign: 'center',
//     // fontWeight: 'bold',
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: '100%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     padding: 10,
//   },
//   closeButtonText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   modalHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   modalDescription: {
//     fontSize: 14,
//     marginBottom: 15,
//     color: '#555',
//   },
//   modalInput: {
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   modalButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 12,
//     borderRadius: 50,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalButtonCancel: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     borderRadius: 50,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   modalButtonTextCancel: {
//     color: '#007bff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   // Success message styles
//   successContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   checkCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#28a745',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   checkCircleText: {
//     fontSize: 24,
//     color: '#fff',
//   },
//   successMessage: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#28a745',
//   },
//   emailConfirmation: {
//     fontSize: 14,
//     color: '#555',
//     marginTop:20,
//   },
// });




/////////////////////simple backend correct code ////////////////////////////////////////////



// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
// import axios from "axios";
// import { useRouter } from "expo-router";

// const LoginScreen = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = async () => {
//     if (!emailOrPhone || !password) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }
//     try {
//       const response = await axios.post("http://192.168.52.190:9000/api/auth/login", {
//         emailOrPhone,
//         password,
//       });
//       Alert.alert("Success", response.data.message);
//       router.push({ pathname: "/verification", params: { emailOrPhone } });
//     } catch (error) {
//       Alert.alert("Error");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
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
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
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

// export default LoginScreen;




// ///////////////////////////////////// With Backend ////////////////////////////////////////////////////////////////



import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Modal, StatusBar, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const router = useRouter();
  // const [modalVisible, setModalVisible] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [resetSuccess, setResetSuccess] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    try {
      const response = await axios.post('http://192.168.52.190:7000/api/auth/login', {
        emailOrPhone,
        password,
      });
      Alert.alert('Success', response.data.message);
      router.push({ pathname: '/verification', params: { emailOrPhone } });
    } catch (error) {
      Alert.alert('Error');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'} />
      <View style={{ padding: 20, gap: 20 }}>
        <Image source={require('@/assets/images/login.jpg')} style={styles.image} resizeMode="cover" />
        <TextInput
          placeholder="Enter Your Email / Mobile no"
          style={styles.input}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
          <View style={styles.inputWrapper}>
            <TextInput
            placeholder="Enter Your Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
            <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color='gray' />
            </TouchableOpacity>
          </View>


        {/* <Text style={styles.forgotPassword} onPress={() => setModalVisible(true)}>Forgot Password?</Text> */}
        <TouchableOpacity activeOpacity={0.7} style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={() => router.push('/signup')}>
            Signup
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    // backgroundColor:'#000000'
  },
  image: {
    width: '100%',
    height: 300,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    position: 'relative',
    backgroundColor: '#F4F6F9',
  },
  iconWrapper: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  signInButton: {
    backgroundColor: '#004080',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    color: 'blue',
    fontSize: 14,
    textAlign: 'center',
  },
});


