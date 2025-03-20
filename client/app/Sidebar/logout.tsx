import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootParamList = {
    Login: undefined;
    Home: undefined;
    Profile: undefined;
};

type LogoutScreenNavigationProp = NativeStackNavigationProp<RootParamList, 'Login'>;

const LogoutPage = () => {
    const navigation = useNavigation<LogoutScreenNavigationProp>();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const API_URL = 'http://172.27.16.1:7000/api/auth/logout'; // Backend logout URL

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
                            const response = await fetch(API_URL, {
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
            <View style={styles.card}>
                <Text style={styles.header}>Logout</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ADD8E6',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign:'center'
    },
    card: {
        backgroundColor: '#E6F2FA',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        margin: 20,
    },
    subText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
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
