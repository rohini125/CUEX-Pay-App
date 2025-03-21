//////////////////////////// with backend //////////////////////////////////////////////////

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import axios from "axios";
// import { useRouter } from "expo-router";

// const VerifyOtpScreen: React.FC = () => {
//   const [otp, setOtp] = useState<string>("");
//   const router = useRouter();

//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Error", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.52.190:9000/api/auth/verify-otp", { otp }, { withCredentials: true });

//       if (response.status === 200) {
//         Alert.alert("Success", response.data.message);
//         router.push("/home"); // Login successful, navigate to Home Screen
//       } else {
//         Alert.alert("Error", response.data.message || "OTP verification failed.");
//       }
//     } catch (error: any) {
//       console.error("OTP Verification Error:", error.message);
//       Alert.alert("Error", error.response?.data?.message || "Failed to verify OTP.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Enter OTP</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter 6-digit OTP"
//         keyboardType="numeric"
//         maxLength={6}
//         value={otp}
//         onChangeText={setOtp}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
//         <Text style={styles.buttonText}>Verify OTP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     padding: 12,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     textAlign: "center",
//     fontSize: 18,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#007BFF",
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default VerifyOtpScreen;




////////////////////correct backend code /////////////////////////////////////



// import { router } from 'expo-router';
// import React, { useState, useEffect, useRef } from 'react';
// import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

// export default function VerificationPage() {
//   const [otp, setOtp] = useState('');
//   const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds
//   const [serverOtp, setServerOtp] = useState(''); // Mock server OTP for now
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const otpRefs = useRef<(TextInput | null)[]>([]);

//   useEffect(() => {
//     // Simulate API call to send OTP on component mount
//     sendOtp();
//   }, []);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
  
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (interval) {
//       clearInterval(interval);
//     }
  
//     // Ensure the cleanup function returns 'void' (not 'null')
//     return () => {
//       if (interval) clearInterval(interval); // Clean up the interval when the component unmounts
//     };
//   }, [timer]);  

//   const sendOtp = async () => {
//     try {
//       setTimer(120); // Reset timer
//       const response = await fetch('http://192.168.52.190:9000/api/auth', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // body: JSON.stringify({
//         //   // phone: '+1234567890', // User phone number or identifier
//         // }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setServerOtp(data.otp || ''); // Mock for now
//         Alert.alert('Success', 'OTP sent successfully!');
//       } else {
//         Alert.alert('Error', data.message || 'Failed to send OTP.');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Network error. Please try again.');
//     }
//   };

//   const verifyOtp = async () => {
//     if (otp.length < 6) {
//       Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const response = await fetch('http://192.168.52.190:9000/api/auth/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           // phone: '+1234567890', // User phone number or identifier
//           otp: otp,
//         }),
//       });
//       const data = await response.json();
//       setIsSubmitting(false);

//       if (response.ok) {
//         Alert.alert('Success', 'OTP verified successfully!');
//         router.navigate('/front'); // Navigate to next screen
//       } else {
//         Alert.alert('Error', data.message || 'Invalid OTP.');
//       }
//     } catch (error) {
//       setIsSubmitting(false);
//       Alert.alert('Error', 'Network error. Please try again.');
//     }
//   };

//   const handleChangeOtp = (value: string, index: number) => {
//     const newOtp = otp.split('');
//     newOtp[index] = value;
//     setOtp(newOtp.join(''));

//     // Move focus to next input when value is entered
//     if (value && otpRefs.current[index + 1]) {
//       otpRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleDeleteOtp = (index: number) => {
//     const newOtp = otp.split('');
//     newOtp[index] = '';
//     setOtp(newOtp.join(''));

//     if (!otp[index] && otpRefs.current[index - 1]) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.Content}>
//         <Text style={styles.header}>OTP Verification</Text>
//         <Text style={styles.description}>
//           Please wait for an SMS confirmation code and enter it below.
//         </Text>
//         <View style={styles.otpContainer}>
//           {[...Array(6)].map((_, index) => (
//             <TextInput
//               key={index}
//               ref={(ref) => (otpRefs.current[index] = ref)}
//               style={styles.otpBox}
//               keyboardType="numeric"
//               maxLength={1}
//               value={otp[index] || ''}
//               onChangeText={(value) => handleChangeOtp(value, index)}
//               onKeyPress={({ nativeEvent }) => {
//                 if (nativeEvent.key === 'Backspace') {
//                   handleDeleteOtp(index);
//                 }
//               }}
//             />
//           ))}
//         </View>
//         <TouchableOpacity
//           activeOpacity={0.7}
//           style={[styles.verifyButton, isSubmitting && { backgroundColor: '#ccc' }]}
//           onPress={verifyOtp}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.verifyButtonText}>
//             {isSubmitting ? 'Verifying...' : 'Verify OTP'}
//           </Text>
//         </TouchableOpacity>
//         <Text style={styles.retryText}>
//           {timer > 0
//             ? `Didn't receive OTP? Retry in (${Math.floor(timer / 60)
//                 .toString()
//                 .padStart(2, '0')}:${(timer % 60)
//                 .toString()
//                 .padStart(2, '0')})`
//             : "Didn't receive OTP?"}
//         </Text>
//         {timer === 0 && (
//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.resendButton}
//             onPress={sendOtp}
//           >
//             <Text style={styles.resendButtonText}>Resend OTP</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   // Same styles as before
//     container: {
//     flex: 1,
//     padding: 16,
//     // backgroundColor: '#f9f9f9',
//     backgroundColor:'#ADD8E6',
//     justifyContent: 'center',
//   },
//   Content:{
//     backgroundColor:'#E6F2FA',
//     padding:28,
//     borderRadius:10,
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 1,
//     borderColor: '#ddd',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: 16,
//     color: '#333333',
//     textAlign: 'center',
//     marginBottom: 32,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   otpBox: {
//     // borderWidth: 1,
//     // borderColor: '#ccc',
//     backgroundColor:'#fff',
//     width: 40,
//     height: 50,
//     marginHorizontal: 6,
//     fontSize: 18,
//     textAlign: 'center',
//     borderRadius: 5,
//   },
//   verifyButton: {
//     backgroundColor: 'black',
//     paddingVertical: 12,
//     marginBottom: 12,
//     borderRadius:10,
//   },
//   verifyButtonText:{
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   retryText: {
//     fontSize: 14,
//     // color: 'red',
//     textAlign: 'center',
//     marginTop: 8,
//   },
//   resendButton: {
//     alignSelf: 'center',
//     marginTop: 12,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 8,
//   },
//   resendButtonText: {
//     color: 'blue',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });


/////////////////////////// without backend //////////////////////////////////////////////////


import { router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export default function VerificationPage() {
  const [otp, setOtp] = useState('');
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [timer, setTimer] = useState(20); // Countdown timer in seconds
  const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds
  const [serverOtp, setServerOtp] = useState(''); // Simulate OTP received from server

  const otpRefs = useRef<(TextInput | null)[]>([]); // Explicitly define type as array of TextInput or null

  useEffect(() => {
    // Simulate API call to get OTP (mock OTP)
    setTimeout(() => setServerOtp('123456'), 2000); // Mock server OTP
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Explicitly define the type of interval
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [timer]);

  const handleResendOtp = async () => {
    setTimer(120); // Reset the timer
    setServerOtp('123456'); // Simulate new OTP from server (mocked for now)
    // alert('OTP sent successfully!');
  };

  const handleVerify =()=>{
    router.navigate('/front')
  }

  const handleChangeOtp = (value: string, index: number) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    // Move focus to next input when value is entered
    if (value && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleDeleteOtp = (index: number) => {
    const newOtp = otp.split('');
    newOtp[index] = '';
    setOtp(newOtp.join(''));

    // Move focus to previous input when a value is deleted
    if (!otp[index] && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#F4F6F9'} barStyle={'dark-content'}/>
      <View style={styles.Content}>
          <Text style={styles.header}>OTP</Text>
          <Text style={styles.description}>
          Please wait for an SMS confirmation code and enter it.
          </Text>
          <View style={styles.otpContainer}>
            {[...Array(6)].map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => (otpRefs.current[index] = ref)} // Setting the reference to otpRefs
                style={styles.otpBox}
                keyboardType="numeric"
                maxLength={1}
                value={otp[index] || ''}
                onChangeText={(value) => handleChangeOtp(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleDeleteOtp(index);
                  }
                }}
              />
            ))}
          </View>
          <TouchableOpacity
              activeOpacity={0.7} 
              style={styles.verifyButton}
              onPress={handleVerify}

          >
            <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>
            {/* in second timer logic */}
              {/* <Text style={styles.retryText}>
                {timer > 0
                  ? `Didn't receive OTP? Retry in (00:${timer.toString().padStart(2, '0')})`
                  : "Didn't receive OTP?"}
              </Text> */}

              {/* in min timer logic */}
            <Text style={styles.retryText}>
                {timer > 0
                  ? `Didn't receive OTP? Retry in (${Math.floor(timer / 60)
                      .toString()
                      .padStart(2, '0')}:${(timer % 60)
                      .toString()
                      .padStart(2, '0')})`
                  : "Didn't receive OTP?"}
            </Text>

            {timer === 0 && (
            <TouchableOpacity 
              activeOpacity={0.7} 
              style={styles.resendButton} 
              onPress={handleResendOtp}
            >
              <Text style={styles.resendButtonText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#f9f9f9',
    backgroundColor:'#F4F6F9',
    justifyContent: 'center',
  },
  Content:{
    backgroundColor:'#E6F2FA', 
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  card: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  otpBox: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    backgroundColor:'#fff',
    width: 40,
    height: 50,
    marginHorizontal: 6,
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 5,
  },
  verifyButton: {
    backgroundColor: '#004080',
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius:10,
  },
  verifyButtonText:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retryText: {
    fontSize: 14,
    // color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  resendButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



