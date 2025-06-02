import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '@env';

export type RootParamList = {
    Login: undefined;
    Home: undefined;
    Profile: undefined;
};

type LogoutScreenNavigationProp = NativeStackNavigationProp<RootParamList, 'Login'>;

const LogoutPage = () => {
      const router = useRouter();
    const navigation = useNavigation<LogoutScreenNavigationProp>();
    const [isLoggingOut, setIsLoggingOut] = useState(false);


    const handleLogout = async () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    onPress: async () => {
                        setIsLoggingOut(true);

                        try {
                            const response = await fetch(`${API_URL}/api/auth/logout`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });

                            const data = await response.json();

                            if (response.ok) {
                                Alert.alert('Logged out', data.message);
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login', params: { path: '/login' } }],
                                });
                            } else {
                                Alert.alert('Error', data.message || 'Failed to log out');
                            }
                        } catch (error) {
                            Alert.alert('Error', 'Something went wrong. Please try again.');
                            console.error('Logout error:', error);
                        } finally {
                            setIsLoggingOut(false);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
              <StatusBar backgroundColor="#004080" barStyle="light-content"  />
            
              <View style={styles.header}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Sidebar/menu')} style={styles.backButton}>
                      <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                  {/* Header */}
                  <Text style={styles.headerTitle}>Logout</Text>
                 
                  </View>
            <View style={styles.card}>
                <Text style={styles.subheader}>Logout</Text>
                <Text style={styles.subText}>Are you sure you want to log out of your account?</Text>
                <TouchableOpacity activeOpacity={0.7}
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    disabled={isLoggingOut}
                >
                    <Text style={styles.logoutButtonText}>
                        {isLoggingOut ? 'Logging Out...' : 'Log Out'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#fff',
        // padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#004080',
        paddingVertical: 15,
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
      },
      headerTitle: {
       fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
       
    
      },
      backButton: {
        marginRight: 10,
       
      },
    subheader:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
      },
    card: {
        backgroundColor: '#e2f1ff',
        borderRadius: 12,
        padding: 16,
        marginTop:'50%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        margin: 50,
    },
    subText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        marginBottom: 40,
    },
    logoutButton: {
        backgroundColor: '#d9534f',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        textAlign:'center'
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center'
    },
});

export default LogoutPage;
