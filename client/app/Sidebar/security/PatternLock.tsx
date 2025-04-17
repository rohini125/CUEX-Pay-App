// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { AntDesign } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const { width } = Dimensions.get("window");
// const CIRCLE_SIZE = 60;

// const correctPattern = [1, 2, 5, 8]; // Example correct pattern

// const PatternLock = () => {
//   const [selectedDots, setSelectedDots] = useState<number[]>([]);
//   const router = useRouter();

//   const handleDotPress = (index: number) => {
//     if (!selectedDots.includes(index)) {
//       setSelectedDots([...selectedDots, index]);
//     }
//   };

//   const verifyPattern = async () => {
//     if (
//       selectedDots.length === correctPattern.length &&
//       selectedDots.every((val, i) => val === correctPattern[i])
//     ) {
//       await AsyncStorage.setItem("patternVerified", "true");
//       router.replace("/"); // navigate to home or wherever
//     } else {
//       Alert.alert("Incorrect Pattern", "Try again.");
//       setSelectedDots([]);
//     }
//   };

//   const renderCircle = (index: number) => {
//     const isSelected = selectedDots.includes(index);
//     return (
//       <TouchableOpacity
//         key={index}
//         style={[
//           styles.circle,
//           isSelected && { backgroundColor: "#4CAF50", borderWidth: 0 },
//         ]}
//         onPress={() => handleDotPress(index)}
//         activeOpacity={0.6}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Draw Your Pattern</Text>
//       <View style={styles.grid}>
//         {Array.from({ length: 9 }, (_, i) => renderCircle(i + 1))}
//       </View>
//       <TouchableOpacity
//         onPress={verifyPattern}
//         style={styles.button}
//         activeOpacity={0.8}
//       >
//         <Text style={styles.buttonText}>Unlock</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default PatternLock;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#111",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#fff",
//     marginBottom: 30,
//   },
//   grid: {
//     width: width * 0.8,
//     aspectRatio: 1,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     alignContent: "space-between",
//     marginBottom: 30,
//   },
//   circle: {
//     width: CIRCLE_SIZE,
//     height: CIRCLE_SIZE,
//     borderRadius: CIRCLE_SIZE / 2,
//     borderWidth: 2,
//     borderColor: "#4CAF50",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 5,
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 40,
//     paddingVertical: 14,
//     borderRadius: 25,
//     elevation: 3,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });






import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = 60;

// Example correct pattern (can be dynamic)
const correctPattern = [1, 2, 5, 8]; 

interface PatternLockProps {
  onPatternComplete: (enteredPattern: number[]) => void;
}

const PatternLock: React.FC<PatternLockProps> = ({ onPatternComplete }) => {
  const [selectedDots, setSelectedDots] = useState<number[]>([]);
  const router = useRouter();

  const handleDotPress = (index: number) => {
    if (!selectedDots.includes(index)) {
      setSelectedDots([...selectedDots, index]);
    }
  };

  const verifyPattern = async () => {
    if (
      selectedDots.length === correctPattern.length &&
      selectedDots.every((val, i) => val === correctPattern[i])
    ) {
      await AsyncStorage.setItem("patternVerified", "true");
      onPatternComplete(selectedDots);  // Notify parent component
      router.replace("/"); // Navigate to home or wherever
    } else {
      Alert.alert("Incorrect Pattern", "Try again.");
      setSelectedDots([]);
    }
  };

  const renderCircle = (index: number) => {
    const isSelected = selectedDots.includes(index);
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.circle,
          isSelected && { backgroundColor: "#4CAF50", borderWidth: 0 },
        ]}
        onPress={() => handleDotPress(index)}
        activeOpacity={0.6}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Draw Your Pattern</Text>
      <View style={styles.grid}>
        {Array.from({ length: 9 }, (_, i) => renderCircle(i + 1))}
      </View>
      <TouchableOpacity
        onPress={verifyPattern}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Unlock</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PatternLock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 30,
  },
  grid: {
    width: width * 0.8,
    aspectRatio: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
    marginBottom: 30,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
