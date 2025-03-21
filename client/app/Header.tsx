import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface CommonHeaderProps {
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  onHelpPress?: () => void;
}

const CommonHeader: React.FC<CommonHeaderProps> = () => {
  const router = useRouter(); // Initialize the router
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.header2}>
        {/* Left Section */}
        <View style={styles.headerLeftView}>
          <TouchableOpacity onPress={() => router.push('/Sidebar/menu')}>
            <Image
              source={require('../assets/images/man.png')}
              style={styles.user}
              accessibilityLabel="User Profile Image"
              accessible
            />
          </TouchableOpacity>
          <View style={{ marginLeft: moderateScale(76) }}>
            <Text style={styles.home}>CUEX</Text>
          </View>
        </View>

        {/* Right Section */}
        <View style={styles.headerRightView}>
          <TouchableOpacity onPress={() => router.push('/Sidebar/notification')}>
            <Image
              source={require('../assets/images/bell.png')}
              style={[styles.icons, { marginHorizontal: moderateScale(20) }]}
              accessibilityLabel="Notifications"
              accessible
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/Sidebar/help/help')}>
            <Image
              source={require('../assets/images/help.png')}
              style={styles.icons}
              accessibilityLabel="Help"
              accessible
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: '#004080',
    justifyContent: 'flex-end',
  },
  header2: {
    width: '100%',
    height: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(10),
  },
  headerLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    width: scale(40),
    height: scale(40),
    margin: 10,
    marginBottom: 10,
  },
  home: {
    fontSize: moderateScale(18),
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  headerRightView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  icons: {
    width: scale(22),
    height: scale(22),
    tintColor: 'white',
  },
});
