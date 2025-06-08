// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   FlatList,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // // } from 'react-native';

// // // const NotificationPage = () => {
// // //   // Example: already added notification like "Login Successfully"
// // //   const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);

// // //   useEffect(() => {
// // //     // Simulate a login notification added once when page opens
// // //     const initialNotification = {
// // //       id: Date.now(),
// // //       message: 'Login Successfully',
// // //     };
// // //     setNotifications([initialNotification]);
// // //   }, []);

// // //   const handleDeleteNotification = (id: number) => {
// // //     setNotifications((prev) => prev.filter((n) => n.id !== id));
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.header}>Notifications</Text>

// // //       {notifications.length === 0 ? (
// // //         <Text style={styles.noNotifications}>No notifications available</Text>
// // //       ) : (
// // //         <FlatList
// // //           data={notifications}
// // //           keyExtractor={(item) => item.id.toString()}
// // //           renderItem={({ item }) => (
// // //             <View style={styles.notificationItem}>
// // //               <Text>{item.message}</Text>
// // //               <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
// // //                 <Text style={styles.deleteIcon}>🗑️</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           )}
// // //         />
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // export default NotificationPage;

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
// // //   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
// // //   notificationItem: {
// // //     flexDirection: 'row', justifyContent: 'space-between',
// // //     paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ccc',
// // //   },
// // //   deleteIcon: { fontSize: 18, color: 'red' },
// // //   noNotifications: { color: 'gray', fontStyle: 'italic' },
// // // });








// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   View, Text, FlatList, TouchableOpacity, StyleSheet,
// // // } from 'react-native';
// // // import { API_URL } from '@env';



// // // const NotificationPage = () => {
// // //   const [notifications, setNotifications] = useState<{ _id: string; message: string }[]>([]);

// // //   const fetchNotifications = async () => {
// // //     const res = await fetch(API_URL);
// // //     const data = await res.json();
// // //     setNotifications(data);
// // //   };

// // //   const addNotification = async (message: string) => {
// // //     await fetch(`${API_URL}/notification`, {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ message }),
// // //     });
// // //     fetchNotifications();
// // //   };

// // //   const deleteNotification = async (id: string) => {
// // //     await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
// // //     fetchNotifications();
// // //   };

// // //   useEffect(() => {
// // //     fetchNotifications();
// // //     addNotification('Login Successfully'); // Add when screen opens
// // //   }, []);

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.header}>Notifications</Text>

// // //       {notifications.length === 0 ? (
// // //         <Text style={styles.noData}>No notifications found</Text>
// // //       ) : (
// // //         <FlatList
// // //           data={notifications}
// // //           keyExtractor={(item) => item._id}
// // //           renderItem={({ item }) => (
// // //             <View style={styles.notificationItem}>
// // //               <Text>{item.message}</Text>
// // //               <TouchableOpacity onPress={() => deleteNotification(item._id)}>
                
// // //                 <Text style={styles.delete}>🗑️</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           )}
// // //         />
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // export default NotificationPage;

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
// // //   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
// // //   notificationItem: {
// // //     flexDirection: 'row', justifyContent: 'space-between',
// // //     padding: 12, borderBottomWidth: 1, borderColor: '#ccc',
// // //   },
// // //   delete: { fontSize: 16, color: 'red' },
// // //   noData: { textAlign: 'center', color: 'gray', marginTop: 20 },
// // // });










// // import React, { useEffect, useState } from 'react';
// // import {
// //   View, Text, FlatList, TouchableOpacity, StyleSheet,
// // } from 'react-native';
// // import { API_URL } from '@env';

// // const NotificationPage = () => {
// //   const [notifications, setNotifications] = useState<{ _id: string; message: string }[]>([]);

// //   const fetchNotifications = async () => {
// //     try {
// //       const res = await fetch(`${API_URL}/notifications`);
// //       const data = await res.json();
// //       console.log('📩 Notifications fetched:', data); // ✅ Debug log
// //       setNotifications(data);
// //     } catch (err) {
// //       console.error('❌ Error fetching notifications:', err);
// //     }
// //   };

// //   const deleteNotification = async (id: string) => {
// //     await fetch(`${API_URL}/notifications/${id}`, { method: 'DELETE' });
// //     fetchNotifications();
// //   };

// //   useEffect(() => {
// //     fetchNotifications();
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Notifications</Text>

// //       {notifications.length === 0 ? (
// //         <Text style={styles.noData}>No notifications found</Text>
// //       ) : (
// //         <FlatList
// //           data={notifications}
// //           keyExtractor={(item) => item._id}
// //           renderItem={({ item }) => (
// //             <View style={styles.notificationItem}>
// //               <Text>{item.message}</Text>
// //               <TouchableOpacity onPress={() => deleteNotification(item._id)}>
// //                 <Text style={styles.delete}>🗑️</Text>
// //               </TouchableOpacity>
// //             </View>
// //           )}
// //         />
// //       )}
// //     </View>
// //   );
// // };

// // export default NotificationPage;

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
// //   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
// //   notificationItem: {
// //     flexDirection: 'row', justifyContent: 'space-between',
// //     padding: 12, borderBottomWidth: 1, borderColor: '#ccc',
// //   },
// //   delete: { fontSize: 16, color: 'red' },
// //   noData: { textAlign: 'center', color: 'gray', marginTop: 20 },
// // });

// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, FlatList, TouchableOpacity, StyleSheet,
// } from 'react-native';
// import { API_URL } from '@env';

// interface Notification {
//   _id: string;
//   message: string;
//   read: boolean;
//   createdAt: string;
// }

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   const fetchNotifications = async () => {
//     try {
//       const res = await fetch(`${API_URL}/notifications`);
//       const data = await res.json();
//       setNotifications(data);
//     } catch (err) {
//       console.error('❌ Error fetching notifications:', err);
//     }
//   };

//   const addLoginNotification = async () => {
//     try {
//       await fetch(`${API_URL}/notifications`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: 'Login Successfully' }),
//       });
//       fetchNotifications();
//     } catch (err) {
//       console.error('❌ Error adding login notification:', err);
//     }
//   };

//   const deleteNotification = async (id: string) => {
//     try {
//       await fetch(`${API_URL}/notifications/${id}`, { method: 'DELETE' });
//       fetchNotifications();
//     } catch (err) {
//       console.error('❌ Error deleting notification:', err);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await fetch(`${API_URL}/notifications/mark-all-read`, { method: 'PATCH' });
//       fetchNotifications();
//     } catch (err) {
//       console.error('❌ Error marking all as read:', err);
//     }
//   };

//   useEffect(() => {
//     addLoginNotification(); // Add login notification
//     fetchNotifications();   // Initial fetch
//     markAllAsRead();        // Mark all read on page open
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Notifications</Text>

//       {notifications.length === 0 ? (
//         <Text style={styles.noData}>No notifications found</Text>
//       ) : (
//         <FlatList
//           data={notifications}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.notificationItem}>
//               <Text style={{ color: item.read ? 'black' : 'blue' }}>{item.message}</Text>
//               <TouchableOpacity onPress={() => deleteNotification(item._id)}>
//                 <Text style={styles.delete}>🗑️</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// export default NotificationPage;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
//   notificationItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   delete: { fontSize: 16, color: 'red' },
//   noData: { textAlign: 'center', color: 'gray', marginTop: 20 },
// });






import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { API_URL } from '@env';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 
interface Notification {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
    const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_URL}/notifications`);
      const data = await res.json();
      setNotifications(data);

      // Update unread count
      // const unread = data.filter(n => !n.read).length;
      const unread = (data as Notification[]).filter((n: Notification) => !n.read).length;
      setUnreadCount(unread);

    } catch (err) {
      console.error('❌ Error fetching notifications:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${API_URL}/notifications/mark-all-read`, { method: 'PATCH' });
      await fetchNotifications(); // Refresh notifications & unread count after marking read
    } catch (err) {
      console.error('❌ Error marking all as read:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Call markAllAsRead somewhere user triggers (e.g., a button press)
  // or when NotificationPage is opened if you want auto mark as read

  return (
 <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/front')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Notifications {unreadCount > 0 ? `(${unreadCount})` : ''} </Text>
      </View>
   
      {/* <Text style={styles.header}>
        Notifications {unreadCount > 0 ? `(${unreadCount})` : ''}
      </Text> */}

     

      {notifications.length === 0 ? (
        <Text style={styles.noData}>No notifications found</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={{ color: item.read ? 'black' : 'blue' }}>
                {item.message}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await fetch(`${API_URL}/notifications/${item._id}`, {
                    method: 'DELETE',
                  });
                  fetchNotifications();
                }}
              >
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
       <TouchableOpacity onPress={markAllAsRead} style={styles.button}>
        <Text style={{ color: 'white' }}>Mark all as read</Text>
      </TouchableOpacity>
    </View>
  );
};


export default NotificationPage;

const styles = StyleSheet.create({
  container: { flex: 1,  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
 
   headerTitle: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
    backButton: {
    marginRight: 10,
    padding: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    marginTop: 4,
  
  },
    button: {
    backgroundColor: '#004080',
    paddingVertical: 15,
    marginTop:10,
    borderRadius: 6,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  delete: { fontSize: 16, color: 'red' },
  noData: { textAlign: 'center', color: 'gray', marginTop: 20 },
});
