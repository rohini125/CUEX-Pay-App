///////////////////////////////  with backend ////////////////////////////////////////


// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import axios, { AxiosError } from "axios";
// import { Ionicons } from '@expo/vector-icons';

// const SetUPIPinPage: React.FC = () => {
//   const [pin, setPin] = useState<string>("");
//   const [confirmPin, setConfirmPin] = useState<string>("");
//   const router = useRouter();

//   const userId = "USER_ID_HERE"; // Replace this with actual user ID from state or props

//   const handleSetPin = async () => {
//     if (pin !== confirmPin || pin.length !== 4) {
//       Alert.alert("Error", "PINs do not match or must be 4 digits!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.52.190:9000/api/upi-pin/set-pin", {
//         userId, // Backend expects userId
//         upiPin: pin, // Ensure correct key name as per backend API
//       });

//       if (response.status === 200) {
//         console.log("PIN set successfully: ", response.data.message);
//         await SecureStore.setItemAsync("upiPin", pin); // Securely store the PIN
//         Alert.alert("Success", "UPI PIN has been set successfully!");
//         router.push("/login"); // Navigate to login page
//       } else {
//         Alert.alert("Error", response.data.message || "Something went wrong.");
//       }
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<{ message?: string }>;
//         Alert.alert("Error", axiosError.response?.data?.message || "Network error.");
//       } else if (error instanceof Error) {
//         Alert.alert("Error", error.message);
//       } else {
//         Alert.alert("Error", "An unknown error occurred.");
//       }
//     }
//   };

//   const handlePinChange = (input: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
//     if (/^\d{0,4}$/.test(input)) {
//       setter(input);
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#ADD8E6" }}>
//       {/* Header with Back Arrow */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.push('/Sidebar/AccountSetting')} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>
      
//       <View style={styles.container}>
//         <View style={styles.Content}>
//           <Text style={styles.header}>Set Your UPI PIN</Text>
//           <TextInput
//             style={styles.input}
//             secureTextEntry
//             placeholder="Enter 4-digit PIN"
//             maxLength={4}
//             keyboardType="numeric"
//             value={pin}
//             onChangeText={(input) => handlePinChange(input, setPin)}
//           />
//           <TextInput
//             style={styles.input}
//             secureTextEntry
//             placeholder="Confirm UPI PIN"
//             maxLength={4}
//             keyboardType="numeric"
//             value={confirmPin}
//             onChangeText={(input) => handlePinChange(input, setConfirmPin)}
//           />
//           <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleSetPin}>
//             <Text style={styles.buttonText}>Set PIN</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#ADD8E6",
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   Content: {
//     backgroundColor: "#E6F2FA",
//     padding: 28,
//     borderRadius: 10,
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 1,
//     borderColor: "#ddd",
//     width: "100%",
//   },
//   header: {
//     fontSize: 26,
//     textAlign: "center",
//     fontWeight: "bold",
//     marginBottom: 22,
//     marginTop: 10,
//   },
//   input: {
//     padding: 12,
//     borderRadius: 50,
//     marginBottom: 15,
//     textAlign: "center",
//     backgroundColor: "#fff",
//   },
//   button: {
//     backgroundColor: "black",
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default SetUPIPinPage;




///////////////////////////// simple chatgpt correct backend ///////////////////////////////

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const SetUpiPinScreen = () => {
  const [upiPin, setUpiPin] = useState("");
  const [confirmUpiPin, setConfirmUpiPin] = useState("");
  const router = useRouter();
  
  const userId = "USER_ID_HERE"; // Backend मधून dynamic data वापरायचं असल्यास proper state वापर
  
  const handleSetUpiPin = async () => {
    if (!upiPin || !confirmUpiPin) {
      Alert.alert("Error", "Please enter UPI PIN and confirm it.");
      return;
    }
    if (upiPin !== confirmUpiPin) {
      Alert.alert("Error", "UPI PINs do not match.");
      return;
    }

    try {
      const response = await fetch("http://192.168.52.190:9000/api/upi-pin/set-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, upiPin }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", data.message);
        router.replace("/Sidebar/AccountSetting");    
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Server error. Please try again.");
    }
  };

  return (
    <View style={{flex:1, backgroundColor:'#ADD8E6', padding:15}}>
        {/* Header with Back Arrow */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/Sidebar/AccountSetting')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            {/* <Text style={{fontSize:22 , fontWeight:'bold'}}>UPI Pin Set</Text> */}
        </View>

        <View style={styles.container}>
            <View style={styles.Content}>
                <Text style={styles.title}>Set UPI PIN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter UPI PIN"
                    secureTextEntry
                    keyboardType="numeric"
                    value={upiPin}
                    onChangeText={setUpiPin}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm UPI PIN"
                    secureTextEntry
                    keyboardType="numeric"
                    value={confirmUpiPin}
                    onChangeText={setConfirmUpiPin}
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleSetUpiPin}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Set PIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20},

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign:'center' },
  input:{ 
        width: "100%",
        // borderWidth: 1, 
        borderRadius: 10, 
        padding: 10, 
        marginBottom: 15 ,
        backgroundColor:'#fff',
    },
  button: { backgroundColor: "#000000", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center" },
    Content: {
    backgroundColor: "#E6F2FA",
    padding: 28,
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  backButton: {
    marginRight: 10,
    },
  header: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 22,
    marginTop:10,
  },
});

export default SetUpiPinScreen;
