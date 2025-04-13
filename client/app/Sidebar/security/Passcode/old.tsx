// // import React, { useState, useRef } from "react";
// // import {
// //   View, Text, StyleSheet, TextInput,
// //   TouchableOpacity, Alert, KeyboardAvoidingView, Platform
// // } from "react-native";
// // import { useRouter } from "expo-router";

// // const OldPasscodeScreen = () => {
// //   const [passcode, setPasscode] = useState("");
// //   const inputRef = useRef<TextInput>(null);
// //   const router = useRouter();

// //   const handleChange = (text: string) => {
// //     if (text.length <= 4) {
// //       setPasscode(text);
// //       if (text.length === 4) {
// //         validateOldPasscode(text);
// //       }
// //     }
// //   };

// //   const validateOldPasscode = (input: string) => {
// //     const correctOld = "1234"; // Replace with backend check
// //     if (input === correctOld) {
// //       router.push("/Sidebar/security/Passcode/new");
// //     } else {
// //       Alert.alert("Incorrect Passcode", "Try again.");
// //       setPasscode("");
// //     }
// //   };

// //   return (
// //     <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: "padding" })}>
// //       <Text style={styles.title}>Enter Old Passcode</Text>

// //       <TouchableOpacity onPress={() => inputRef.current?.focus()} style={styles.dotsWrapper}>
// //         {[...Array(4)].map((_, i) => (
// //           <View
// //             key={i}
// //             style={[styles.dot, { backgroundColor: i < passcode.length ? "#4CAF50" : "#ccc" }]}
// //           />
// //         ))}
// //       </TouchableOpacity>

// //       <TextInput
// //         ref={inputRef}
// //         value={passcode}
// //         onChangeText={handleChange}
// //         maxLength={4}
// //         keyboardType="numeric"
// //         secureTextEntry
// //         autoFocus
// //         style={styles.hiddenInput}
// //       />

      
// //        <TouchableOpacity onPress={() => router.push('/Sidebar/security/ForgetPasscodeScreen')}>
// //                 <Text style={styles.forgot}> Forget Passcode</Text>
                
// //               </TouchableOpacity>
// //     </KeyboardAvoidingView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //       flex: 1,
// //       backgroundColor: "#fff",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       padding: 24,
// //     },
// //     title: {
// //       fontSize: 24,
// //       fontWeight: "600",
// //       marginBottom: 40,
// //       color: "#333",
// //     },
// //     dotsWrapper: {
// //       flexDirection: "row",
// //       justifyContent: "center",
// //       marginBottom: 20,
// //       gap: 16,
// //     },
// //     dot: {
// //       width: 18,
// //       height: 18,
// //       borderRadius: 9,
// //       backgroundColor: "#ccc",
// //     },
// //     hiddenInput: {
// //       height: 0,
// //       width: 0,
// //       opacity: 0,
// //     },
// //     forgot: {
// //       marginTop: 30,
// //       color: "#007AFF",
// //       textDecorationLine: "underline",
// //     },
// //   });
  
// // export default OldPasscodeScreen;










// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { useRouter } from "expo-router";

// const OldPasscodeScreen = () => {
//   const [passcode, setPasscode] = useState("");
//   const inputRef = useRef<TextInput>(null);
//   const router = useRouter();

//   const handleChange = (text: string) => {
//     if (text.length <= 4) {
//       setPasscode(text);
//       if (text.length === 4) {
//         validateOldPasscode(text);
//       }
//     }
//   };

//   const validateOldPasscode = (input: string) => {
//     const correctOld = "1234"; // Replace this with backend verification
//     if (input === correctOld) {
//       router.push("/Sidebar/security/Passcode/new");
//     } else {
//       Alert.alert("Incorrect Passcode", "Try again.");
//       setPasscode("");
//     }
//   };

//   const handleForgetPasscode = () => {
//     router.push("/Sidebar/security/ForgetPasscodeScreen"); // 👈 this must match your file structure
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.select({ ios: "padding" })}
//     >
//       <Text style={styles.title}>Enter Old Passcode</Text>

//       <TouchableOpacity
//         onPress={() => inputRef.current?.focus()}
//         style={styles.dotsWrapper}
//       >
//         {[...Array(4)].map((_, i) => (
//           <View
//             key={i}
//             style={[
//               styles.dot,
//               { backgroundColor: i < passcode.length ? "#4CAF50" : "#ccc" },
//             ]}
//           />
//         ))}
//       </TouchableOpacity>

//       <TextInput
//         ref={inputRef}
//         value={passcode}
//         onChangeText={handleChange}
//         maxLength={4}
//         keyboardType="numeric"
//         secureTextEntry
//         autoFocus
//         style={styles.hiddenInput}
//       />

//       <TouchableOpacity onPress={handleForgetPasscode}>
//         <Text style={styles.forgot}>Forget Passcode?</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

// export default OldPasscodeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "600",
//     marginBottom: 40,
//     color: "#333",
//   },
//   dotsWrapper: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//     gap: 16,
//   },
//   dot: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: "#ccc",
//   },
//   hiddenInput: {
//     height: 0,
//     width: 0,
//     opacity: 0,
//   },
//   forgot: {
//     marginTop: 30,
//     color: "#007AFF",
//     textDecorationLine: "underline",
//   },
// });







import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const OldPasscodeScreen = () => {
  const [passcode, setPasscode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();

  const handleChange = (text: string) => {
    if (text.length <= 4) {
      setPasscode(text);
      if (text.length === 4) {
        validateOldPasscode(text);
      }
    }
  };

  const validateOldPasscode = (input: string) => {
    const correctOld = "1234"; // Replace this with backend verification
    if (input === correctOld) {
      router.push("/Sidebar/security/Passcode/new");
    } else {
      Alert.alert("Incorrect Passcode", "Try again.");
      setPasscode("");
    }
  };

  const handleForgetPasscode = () => {
    router.push("/Sidebar/security/ForgetPasscodeScreen"); // 👈 this must match your file structure
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding" })}
    >
      <Text style={styles.title}>Enter Old Passcode</Text>

      <TouchableOpacity
        onPress={() => inputRef.current?.focus()}
        style={styles.dotsWrapper}
      >
        {[...Array(4)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i < passcode.length ? "#4CAF50" : "#ccc" },
            ]}
          />
        ))}
      </TouchableOpacity>

      <TextInput
        ref={inputRef}
        value={passcode}
        onChangeText={handleChange}
        maxLength={4}
        keyboardType="numeric"
        secureTextEntry
        autoFocus
        style={styles.hiddenInput}
      />

      <TouchableOpacity onPress={handleForgetPasscode}>
        <Text style={styles.forgot}>Forget Passcode?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OldPasscodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 40,
    color: "#333",
  },
  dotsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 16,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ccc",
  },
  hiddenInput: {
    height: 0,
    width: 0,
    opacity: 0,
  },
  forgot: {
    marginTop: 30,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
