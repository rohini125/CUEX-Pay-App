
import { View, Text, TouchableOpacity, StyleSheet,StatusBar} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import CurrencyConverter from '../Home/currencyconverter';
import Header from '../Header';

const Home = () => {
  const router = useRouter();

  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const handleProfilePress = () => {
  //   setIsSidebarOpen(true); // Open sidebar when profile is pressed
  // };
  // const handleCloseSidebar = () => {
  //   setIsSidebarOpen(false); // Close sidebar
  // };

  return (
     <View style={{flex:1}}>
      <StatusBar backgroundColor="#ADD8E6" barStyle="dark-content"  />
       <Header  />
  
      <View style={styles.container}>
          <CurrencyConverter />
        <View style={styles.Cardcontainer}>
          <Text style={styles.title}>Transfer Money</Text>
          <View style={styles.iconContainer}> 
            <TouchableOpacity
              style={styles.iconBox}
              activeOpacity={0.7}
            > 
              <Link href="/MoneyTransfer/ToMobileNo">
                <View style={styles.iconTextWrapper}>
                  <View style={styles.iconBackground}>
                    <FontAwesome5 name="mobile-alt" size={18} color="black" />
                  </View>
                  <Text style={styles.iconText} numberOfLines={2}>
                    To Mobile Number
                  </Text>
                </View>
              </Link>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBox}
              activeOpacity={0.7}
            >
              <Link href="/MoneyTransfer/ToBank">
                <View style={styles.iconTextWrapper}>
                  <View style={styles.iconBackground}>
                    <MaterialIcons name="account-balance" size={18} color="black" />
                  </View>
                  <Text style={styles.iconText} numberOfLines={2}>
                    To Bank/UPI ID
                  </Text>
                </View>
              </Link>
            </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconBox}
                activeOpacity={0.7}
              >
                <Link href="/MoneyTransfer/ToSelf">
                  <View style={styles.iconTextWrapper}>
                    <View style={styles.iconBackground}>
                      <FontAwesome5 name="wallet" size={18} color="black" />
                    </View>
                    <Text style={styles.iconText} numberOfLines={2}>
                      To Self Account
                    </Text>
                  </View>
                </Link>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconBox}
                activeOpacity={0.7}
              >
                <Link href="/MoneyTransfer/CheckBalance">
                  <View style={styles.iconTextWrapper}>
                    <View style={styles.iconBackground}>
                      <FontAwesome5 name="hand-holding-usd" size={18} color="black" />
                    </View>
                    <Text style={styles.iconText} numberOfLines={2}>
                      Check Balance
                    </Text>
                  </View>
                </Link>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    // backgroundColor: '#F8F9FA',
    backgroundColor: '#ADD8E6',
    padding: 16,
  },

  Cardcontainer: {
  
    // justifyContent: 'center',
    // backgroundColor: '#f9f9f9',
    backgroundColor: '#E6F2FA',
    borderRadius: 10,
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    elevation: 1,
    // borderWidth: 1,
    borderColor: '#ddd',
    marginBottom:8,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    // marginVertical:10,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  iconBox: {
    width: '22%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconBackground: {
    width: 40,
    height: 40,
    // backgroundColor: '#333333',
    backgroundColor:'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  iconTextWrapper: {
    flexDirection: 'column',   // Aligns icon and text side by side
    alignItems: 'center',   // Vertically centers icon and text
    justifyContent: 'flex-start',  // Adjust as needed, 'center' or 'space-between'
  },
});



