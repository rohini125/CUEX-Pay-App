// import { Text, View,StyleSheet } from 'react-native';
// import Mybutton from "@/components/Mybutton";
// import { useRouter} from 'expo-router';
// import { Link } from 'expo-router'

// const index = () => {

//   const router = useRouter();
//   const onContinue = () =>{
//       router.navigate("/login");
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>WelCome To CUEX App </Text>
//       {/* <Mybutton title={"Continue"} onPress={onContinue}/> */}
//       <Text>
//         <Link href="/login" asChild>
//           <Mybutton title={"Login"} onPress={onContinue}/>
//         </Link>
//       </Text>
//     </View>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   text:{
//     fontSize:20,
//     fontWeight:'bold',
//     marginBottom:20
//   }
// });


// import React from "react";
// import { Text, View, StyleSheet, ImageBackground } from "react-native";
// import Mybutton from "@/components/Mybutton";
// import { useRouter } from "expo-router";
// import { BlurView } from "expo-blur"; // BlurView वापरणे

// const index = () => {
//   const router = useRouter();
//   const onContinue = () => {
//     router.navigate("/login");
//   };

//   return (
//     <ImageBackground
//       source={require("../assets/images/StaringPage.jpg")} // इमेज
//       style={styles.background}
//     >
//       <BlurView intensity={10} style={styles.overlay}> {/* ब्लर कमी केला */}
//         <Text style={styles.text}>Welcome to CUEX App</Text>
//         <Mybutton title={"Get Started"} onPress={onContinue} />
//       </BlurView>
//     </ImageBackground>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: "cover", // इमेजचा पूर्ण पृष्ठावर लागू होण्यासाठी
//     height: "100%", // इमेज पूर्ण स्क्रीनवर व्यापावी
//     width:"auto",
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)", // डार्क ओव्हरले आणि ब्लरचा प्रभाव
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 20,
//   },
// });


import React from "react";
import { StyleSheet, ImageBackground, StatusBar , TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable"; // Animatable import 

const index = () => {
  const router = useRouter();
  const onContinue = () => {
    router.navigate("/login");
  };

  return (
    <ImageBackground
      source={require("../assets/images/StaringPage.jpg")}
      style={styles.background}
    >
      <StatusBar barStyle="dark-content"/>
      <BlurView intensity={10} style={styles.overlay}>
        <Animatable.Text 
          // animation type [fadeIn,bounce , zoomIn , slideInDown , pulse , shake]
          animation="pulse"
          duration={2500} // animation time
          iterationCount="infinite" // To make the animation run continuously.
          iterationDelay={1000}
          style={styles.text}
        >
          Welcome to CUEX App
        </Animatable.Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.GetStartBtn}  onPress={onContinue}>
          <Text style={styles.GetStartText}>Get Started</Text>
        </TouchableOpacity>
        {/* <Mybutton title={"Get Started"} onPress={onContinue} /> */}
      </BlurView>
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "auto",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  GetStartBtn: {
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
  },
  GetStartText: {
    color: 'white',
    fontSize: 16,
  },
});