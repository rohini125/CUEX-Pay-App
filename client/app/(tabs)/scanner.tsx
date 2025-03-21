// ///////////////// main code /////////////////////////

// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import React from 'react';
// import { Feather,Ionicons ,MaterialCommunityIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import {
//   moderateScale,
//   moderateVerticalScale,
//   scale,
//   verticalScale,
// } from 'react-native-size-matters';

// const QrCodeScanner = () => {
//   const router = useRouter();

//   const onclick = () => {
//     router.push('/front');
//   };

//   const onHelp = () => {
//     router.push('/Sidebar/help');
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#ADD8E6" barStyle="dark-content" />
//       <View style={styles.header}>
//         <View style={styles.subHeader}>
//           <TouchableOpacity onPress={onclick} style={styles.backBtn}>
//             <Ionicons name="arrow-back" size={24} color="#333" />
//           </TouchableOpacity>
//           <Text style={styles.title}>Scan & Pay</Text>
//           <TouchableOpacity style={styles.backBtn} onPress={onHelp}>
//             <Feather name="help-circle" size={24} color="#4A4A4A" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.content}>
//           <Ionicons name="camera" size={30} color="#333" style={{marginBottom:15}}/>
//         <Text style={styles.title}>Allow Camera Permission</Text>
//         <Text style={styles.description}>CuexPe needs permission to access camera to scan QR code.</Text>
//         <TouchableOpacity 
//           activeOpacity={0.7} 
//           style={styles.button}
//         >
//           <Text style={styles.Btntext}>Go to settings</Text>
//         </TouchableOpacity>
//         <View style={styles.options} >
//         <TouchableOpacity style={styles.backBtn}  activeOpacity={0.7}>
//           <Ionicons name="images" size={24} color="#333" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.backBtn}  activeOpacity={0.7} >
//           <MaterialCommunityIcons name="flash-off" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>
//      </View>
//     </View>
//   );
// };

// export default QrCodeScanner;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: 'rgba(0,0,0,.5)',
//     backgroundColor: '#fff',
//   },
//   header: {
//     width: '100%',
//     height: verticalScale(85),
//     backgroundColor: '#ADD8E6',
//     justifyContent: 'flex-end',
//   },
//   subHeader: {
//     width: '100%',
//     height: verticalScale(50),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingLeft: moderateScale(10),
//     paddingRight: moderateScale(15),
//     marginBottom:20,
//   },
//   backBtn: {
//     width: scale(50),
//     height: scale(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backIcon: {
//     width: scale(24),
//     height: scale(24),
//     tintColor: 'white',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',  // Centers the content vertically
//     alignItems: 'center',      // Centers the content horizontally
//     padding: 10,
//     backgroundColor: '#ADD8E6',   // Optional: Set a background color for the container
//   },
//   title: {
//     // color: 'white',
//     fontWeight:500,
//     fontSize: moderateScale(20),
//   },
//   description: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',             // Lighter color for the description
//   },
//   button :{
//     backgroundColor:'#000000',
//     padding:8,
//     marginTop:10,
//     borderRadius:15,
//   },
//   Btntext:{
//     color:'white',
//     fontSize:12,
//   },
//   options: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     marginTop: moderateVerticalScale(30),
//   },
// });


///////////////////// code - 1 /////////////////// 


// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   Image,
//   Linking,
// } from 'react-native';
// import React, { useState } from 'react';
// import * as ImagePicker from 'expo-image-picker';
// import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import {
//   moderateScale,
//   moderateVerticalScale,
//   scale,
//   verticalScale,
// } from 'react-native-size-matters';

// const QrCodeScanner = () => {
//   const router = useRouter();
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [flashOn, setFlashOn] = useState(false);

//   const onclick = () => {
//     router.push('/front');
//   };

//   const onHelp = () => {
//     // router.push('./Sidebar/help/help');
    
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   const toggleFlash = () => {
//     setFlashOn(!flashOn);
//   };

//   const openAppSettings = async () => {
//     const canOpen = await Linking.canOpenURL('app-settings:');
//     if (canOpen) {
//       Linking.openURL('app-settings:');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#ADD8E6" barStyle="dark-content" />
//       <View style={styles.header}>
//         <View style={styles.subHeader}>
//           <TouchableOpacity onPress={onclick} style={styles.backBtn}>
//             <Ionicons name="arrow-back" size={24} color="#333" />
//           </TouchableOpacity>
//           <Text style={styles.title}>Scan & Pay</Text>
//           <TouchableOpacity style={styles.backBtn} onPress={onHelp}>
//             <Feather name="help-circle" size={24} color="#4A4A4A" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.content}>
//         <Ionicons name="camera" size={30} color="#333" style={{ marginBottom: 15 }} />
//         <Text style={styles.title}>Allow Camera Permission</Text>
//         <Text style={styles.description}>CuexPe needs permission to access camera to scan QR code.</Text>
//         <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={openAppSettings}>
//           <Text style={styles.Btntext}>Go to settings</Text>
//         </TouchableOpacity>

//         {selectedImage && (
//           <Image source={{ uri: selectedImage }} style={styles.previewImage} />
//         )}

//         <View style={styles.options}>
//           <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={pickImage}>
//             <Ionicons name="images" size={24} color="#333" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={toggleFlash}>
//             <MaterialCommunityIcons name={flashOn ? "flash" : "flash-off"} size={24} color="#333" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default QrCodeScanner;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     width: '100%',
//     height: verticalScale(85),
//     backgroundColor: '#ADD8E6',
//     justifyContent: 'flex-end',
//   },
//   subHeader: {
//     width: '100%',
//     height: verticalScale(50),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingLeft: moderateScale(10),
//     paddingRight: moderateScale(15),
//     marginBottom: 20,
//   },
//   backBtn: {
//     width: scale(50),
//     height: scale(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#ADD8E6',
//   },
//   title: {
//     fontWeight: '500',
//     fontSize: moderateScale(20),
//   },
//   description: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//   },
//   button: {
//     backgroundColor: '#000000',
//     padding: 8,
//     marginTop: 10,
//     borderRadius: 15,
//   },
//   Btntext: {
//     color: 'white',
//     fontSize: 12,
//   },
//   options: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     marginTop: moderateVerticalScale(30),
//   },
//   previewImage: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//     borderRadius: 10,
//   },
// });

//////////////////////////// code - 2 //////////////////////////////

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const QrCodeScanner = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState(false);

  const onclick = () => {
    router.push('/front');
  };

  const onHelp = () => {
    // router.push('./Sidebar/help/help');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  const openAppSettings = async () => {
    const canOpen = await Linking.canOpenURL('app-settings:');
    if (canOpen) {
      Linking.openURL('app-settings:');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#004080" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={onclick} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.text}>Scan & Pay</Text>
          <TouchableOpacity style={styles.backBtn} onPress={onHelp}>
            <Feather name="help-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Ionicons name="camera" size={30} color="#333" style={{ marginBottom: 15 }} />
        <Text style={styles.title}>Allow Camera Permission</Text>
        <Text style={styles.description}>CuexPe needs permission to access camera to scan QR code.</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={openAppSettings}>
          <Text style={styles.Btntext}>Go to settings</Text>
        </TouchableOpacity>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        )}

        <View style={styles.options}>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={pickImage}>
            <Ionicons name="images" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={toggleFlash}>
            <MaterialCommunityIcons name={flashOn ? "flash" : "flash-off"} size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QrCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  header: {
    width: '100%',
    height: verticalScale(80),
    backgroundColor: '#004080',
    justifyContent: 'flex-end',
  },
  subHeader: {
    width: '100%',
    height: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(15),
    marginBottom: 20,
  },
  text: {
    fontWeight: '500',
    fontSize: moderateScale(20),
    color: '#ffffff',
  },
  backBtn: {
    width: scale(50),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F4F6F9',
  },
  title: {
    fontWeight: '500',
    fontSize: moderateScale(20),
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    backgroundColor: '#004080',
    padding: 8,
    marginTop: 10,
    borderRadius: 15,
  },
  Btntext: {
    color: 'white',
    fontSize: 12,
  },
  options: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(30),
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
