import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

const NotificationsPage = () => {
  type NotificationItem = {
    message: string;
    triggeredAt: string;
  };
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [pushToken, setPushToken] = useState('');

  useEffect(() => {
    const getTokenAndLoad = async () => {
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const token = tokenData.data;
      setPushToken(token);

      const res = await axios.get(`http://YOUR_SERVER_IP:7000/notifications/${token}`);
      setNotifications(res.data);
    };

    getTokenAndLoad();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔔 Notifications</Text>
      <FlatList
  data={notifications}
  keyExtractor={(_, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>
        {new Date(item.triggeredAt).toLocaleString()}
      </Text>
    </View>
  )}
/>

    </View>
  );
};

export default NotificationsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
});









// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { useAlertContext } from './PriceAlert/AlertContext';

// const NotificationsPage = () => {
//   const { notifications } = useAlertContext();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Notifications</Text>
//       <FlatList
//         data={notifications}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.message}>{item.message}</Text>
//             <Text style={styles.time}>{item.triggeredAt}</Text>
//           </View>
//         )}
//         ListEmptyComponent={<Text style={styles.empty}>No notifications yet.</Text>}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
//   item: {
//     backgroundColor: '#f1f5f9',
//     padding: 12,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   message: { fontSize: 16, fontWeight: '600' },
//   time: { fontSize: 12, color: '#666', marginTop: 4 },
//   empty: { textAlign: 'center', marginTop: 50, color: '#999' },
// });

// export default NotificationsPage;





// // app/notification.tsx
// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { useNotificationContext } from '../context/NotificationContext';

// const NotificationPage = () => {
//   const { notifications } = useNotificationContext();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Notifications</Text>

//       {notifications.length === 0 ? (
//         <Text style={styles.noNotifText}>No notifications yet.</Text>
//       ) : (
//         <FlatList
//           data={notifications}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.notifItem}>
//               <Text style={styles.notifMessage}>{item.message}</Text>
//               <Text style={styles.notifTime}>{new Date(item.timestamp).toLocaleString()}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#e0f0ff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   noNotifText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//   },
//   notifItem: {
//     backgroundColor: '#fff',
//     padding: 12,
//     marginBottom: 10,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   notifMessage: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   notifTime: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 4,
//   },
// });

// export default NotificationPage;
