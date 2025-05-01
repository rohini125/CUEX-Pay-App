// // // import React, { useEffect, useState } from 'react';
// // // import { View, Text, FlatList, StyleSheet } from 'react-native';
// // // import * as Notifications from 'expo-notifications';
// // // import axios from 'axios';

// // // const NotificationsPage = () => {
// // //   type NotificationItem = {
// // //     message: string;
// // //     triggeredAt: string;
// // //   };
// // //   const [notifications, setNotifications] = useState<NotificationItem[]>([]);
// // //   const [pushToken, setPushToken] = useState('');

// // //   useEffect(() => {
// // //     const getTokenAndLoad = async () => {
// // //       const tokenData = await Notifications.getExpoPushTokenAsync();
// // //       const token = tokenData.data;
// // //       setPushToken(token);

// // //       const res = await axios.get(`http://YOUR_SERVER_IP:7000/notifications/${token}`);
// // //       setNotifications(res.data);
// // //     };

// // //     getTokenAndLoad();
// // //   }, []);

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.heading}>🔔 Notifications</Text>
// // //       <FlatList
// // //   data={notifications}
// // //   keyExtractor={(_, index) => index.toString()}
// // //   renderItem={({ item }) => (
// // //     <View style={styles.card}>
// // //       <Text style={styles.message}>{item.message}</Text>
// // //       <Text style={styles.date}>
// // //         {new Date(item.triggeredAt).toLocaleString()}
// // //       </Text>
// // //     </View>
// // //   )}
// // // />

// // //     </View>
// // //   );
// // // };

// // // export default NotificationsPage;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 16,
// // //     backgroundColor: '#f9f9f9',
// // //   },
// // //   heading: {
// // //     fontSize: 22,
// // //     fontWeight: 'bold',
// // //     marginBottom: 12,
// // //   },
// // //   card: {
// // //     backgroundColor: '#ffffff',
// // //     padding: 14,
// // //     marginBottom: 10,
// // //     borderRadius: 8,
// // //     shadowColor: '#000',
// // //     shadowOpacity: 0.05,
// // //     shadowRadius: 4,
// // //     shadowOffset: { width: 0, height: 2 },
// // //     elevation: 2,
// // //   },
// // //   message: {
// // //     fontSize: 16,
// // //     fontWeight: '500',
// // //   },
// // //   date: {
// // //     marginTop: 4,
// // //     fontSize: 12,
// // //     color: '#555',
// // //   },
// // // });









// // import React from 'react';
// // import { View, Text, StyleSheet, FlatList } from 'react-native';
// // import { useAlertContext } from './PriceAlert/AlertContext';

// // const NotificationsPage = () => {
// //   const { notifications } = useAlertContext();

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Notifications</Text>
// //       <FlatList
// //         data={notifications}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <View style={styles.item}>
// //             <Text style={styles.message}>{item.message}</Text>
// //             <Text style={styles.time}>{item.triggeredAt}</Text>
// //           </View>
// //         )}
// //         ListEmptyComponent={<Text style={styles.empty}>No notifications yet.</Text>}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
// //   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
// //   item: {
// //     backgroundColor: '#f1f5f9',
// //     padding: 12,
// //     marginBottom: 10,
// //     borderRadius: 8,
// //   },
// //   message: { fontSize: 16, fontWeight: '600' },
// //   time: { fontSize: 12, color: '#666', marginTop: 4 },
// //   empty: { textAlign: 'center', marginTop: 50, color: '#999' },
// // });

// // export default NotificationsPage;



// // NotificationPage.tsx
// import React, { useEffect } from 'react';
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import { useNotifications } from '../../context/NotificationContext';

// const NotificationPage = () => {
//   const { notifications, addNotification, clearNotifications } = useNotifications(); // ✅ This line is crucial

//   useEffect(() => {
//     // Add sample notifications after a delay (for testing)
//     const timer = setTimeout(() => {
//       addNotification({ id: 1, message: 'New currency exchange rate available!' });
//       addNotification({ id: 2, message: 'Your price alert has been triggered!' });
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [addNotification]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Notifications</Text>
//       <FlatList
//         data={notifications}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.notificationItem}>
//             <Text>{item.message}</Text>
//           </View>
//         )}
//       />
//       {notifications.length > 0 && (
//         <Button title="Clear All Notifications" onPress={clearNotifications} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
//   notificationItem: {
//     padding: 10,
//     backgroundColor: '#f4f4f4',
//     marginBottom: 8,
//     borderRadius: 5,
//   },
// });

// export default NotificationPage;


import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

const NotificationPage = () => {
  const { notifications, addNotification, clearNotifications } = useNotifications();

  useEffect(() => {
    // Example: Add notifications after 1 second
    const timer = setTimeout(() => {
      addNotification('Your exchange rate alert was triggered!');

    }, 1000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text>{item.message}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No notifications yet.</Text>}
      />
      <Button title="Clear Notifications" onPress={clearNotifications} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  notification: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default NotificationPage;
