// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Alert,
// } from "react-native";
// import {
//   PanGestureHandler,
//   GestureHandlerRootView,
//   State,
// } from "react-native-gesture-handler";
// import Svg, { Line } from "react-native-svg";

// const { width } = Dimensions.get("window");
// const DOT_SIZE = 60;
// const RADIUS = DOT_SIZE / 2;
// const GRID_SIZE = 3;
// const DOT_MARGIN = 40;

// const generateGrid = () => {
//   const grid = [];
//   const offsetX = (width - (GRID_SIZE * DOT_SIZE + (GRID_SIZE - 1) * DOT_MARGIN)) / 2;

//   for (let row = 0; row < GRID_SIZE; row++) {
//     for (let col = 0; col < GRID_SIZE; col++) {
//       const x = offsetX + col * (DOT_SIZE + DOT_MARGIN);
//       const y = row * (DOT_SIZE + DOT_MARGIN);
//       grid.push({
//         id: `${row}-${col}`,
//         x,
//         y,
//       });
//     }
//   }
//   return grid;
// };

// export default function PatternAuth() {
//   const [pattern, setPattern] = useState<string[]>([]);
//   const [lines, setLines] = useState<{ from: { x: number; y: number }; to: { x: number; y: number } }[]>([]);
//   const grid = useRef(generateGrid()).current;

//   const handleGesture = (event: any) => {
//     const { x, y } = event.nativeEvent;

//     for (let dot of grid) {
//       const dx = x - dot.x - RADIUS;
//       const dy = y - dot.y - RADIUS;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < RADIUS + 10) {
//         if (!pattern.includes(dot.id)) {
//           const lastDot = pattern.length ? grid.find((d) => d.id === pattern[pattern.length - 1]) : null;
//           if (lastDot) {
//             setLines((prev) => [...prev, {
//               from: { x: lastDot.x + RADIUS, y: lastDot.y + RADIUS },
//               to: { x: dot.x + RADIUS, y: dot.y + RADIUS },
//             }]);
//           }
//           setPattern((prev) => [...prev, dot.id]);
//         }
//         break;
//       }
//     }
//   };

//   const handleStateChange = (event: any) => {
//     if (event.nativeEvent.state === State.END) {
//       if (pattern.length > 0) {
//         Alert.alert("Pattern drawn", pattern.join(" → "));
//         // TODO: Verify or save pattern here
//       }
//       setPattern([]);
//       setLines([]);
//     }
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <Text style={styles.title}>Draw Unlock Pattern</Text>
//       <PanGestureHandler
//         onGestureEvent={handleGesture}
//         onHandlerStateChange={handleStateChange}
//       >
//         <View style={styles.gridContainer}>
//           <Svg style={StyleSheet.absoluteFill}>
//             {lines.map((line, index) => (
//               <Line
//                 key={index}
//                 x1={line.from.x}
//                 y1={line.from.y}
//                 x2={line.to.x}
//                 y2={line.to.y}
//                 stroke="#3498db"
//                 strokeWidth="4"
//               />
//             ))}
//           </Svg>
//           {grid.map((dot) => (
//             <View
//               key={dot.id}
//               style={[
//                 styles.dot,
//                 {
//                   top: dot.y,
//                   left: dot.x,
//                   backgroundColor: pattern.includes(dot.id) ? "#3498db" : "#ccc",
//                 },
//               ]}
//             />
//           ))}
//         </View>
//       </PanGestureHandler>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f7f7f7",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   gridContainer: {
//     width: width,
//     height: width,
//     position: "relative",
//   },
//   dot: {
//     width: DOT_SIZE,
//     height: DOT_SIZE,
//     borderRadius: RADIUS,
//     position: "absolute",
//     borderWidth: 2,
//     borderColor: "#333",
//   },
// });



import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Correct
import PatternLock from "./PatternLock"; // Custom pattern input component

const PatternVerification = () => {
  const [loading, setLoading] = useState(true);
  const [pattern, setPattern] = useState(null); // stored pattern
  const [attempt, setAttempt] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getStoredPattern();
  }, []);

  const getStoredPattern = async () => {
    try {
      const stored = await AsyncStorage.getItem("userPattern");
      if (stored) {
        setPattern(JSON.parse(stored));
      } else {
        Alert.alert("No pattern found", "Please set a pattern first.");
        router.replace("/Sidebar/security");
      }
    } catch (e) {
      Alert.alert("Error", "Failed to retrieve pattern.");
    } finally {
      setLoading(false);
    }
  };
  const handlePatternComplete = (enteredPattern: number[]) => {
    if (JSON.stringify(enteredPattern) === JSON.stringify(pattern)) {
      router.replace("/"); // navigate to home or index
    } else {
      Alert.alert("Pattern Incorrect", "Please try again.");
    }
  };
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/StaringPage.jpg")}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <BlurView intensity={20} style={styles.overlay}>
        <Animatable.Text animation="fadeInDown" style={styles.text}>
          Draw your pattern
        </Animatable.Text>
        <PatternLock onPatternComplete={handlePatternComplete} />
      </BlurView>
    </ImageBackground>
  );
};

export default PatternVerification;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 30,
  },
});
