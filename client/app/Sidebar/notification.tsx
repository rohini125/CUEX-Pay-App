import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Alert,StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


interface Notification {
  id: string;
  message: string;
}
  const router = useRouter();
const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', message: 'Currency exchange rates updated.' },
    { id: '2', message: 'New promotions available!' },
    { id: '3', message: 'Profile update successful.' },
  ]);

  const handleDeleteConfirmation = (id: string) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteNotification(id),
        },
      ]
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };
  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteConfirmation(item.id)}
      >
        <Text style={styles.deleteButtonText}>...</Text>
      </TouchableOpacity>
    </View>
  );

  return (

    <View style={styles.container}>
           <StatusBar backgroundColor="#004080" barStyle="light-content" />
            <View style={styles.header}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/front')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Notification</Text>
            </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />

<TouchableOpacity activeOpacity={0.7} onPress={() =>  setNotifications([])} style={styles.Button}>
<Text style={styles.ButtonText}> Clear Notifications</Text>
   </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#666',
  },
  Button: {
    backgroundColor: '#004080',
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent:'center',
    margin:10,
  },
  ButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotificationPage;
