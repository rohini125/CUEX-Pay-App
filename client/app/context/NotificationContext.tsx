// // import React, { createContext, useContext, useState, ReactNode } from 'react';

// // type Notification = {
// //   id: number;
// //   message: string;
// //   timestamp: string;
// // };

// // type NotificationContextType = {
// //   notifications: Notification[];
// //   addNotification: (message: string) => void;
// //   clearNotifications: () => void;
// // };

// // const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// // export const useNotification = (): NotificationContextType => {
// //   const context = useContext(NotificationContext);
// //   if (!context) throw new Error("useNotification must be used within a NotificationProvider");
// //   return context;
// // };

// // export const NotificationProvider = ({ children }: { children: ReactNode }) => {
// //   const [notifications, setNotifications] = useState<Notification[]>([]);

// //   const addNotification = (message: string) => {
// //     const newNotification: Notification = {
// //       id: Date.now(),
// //       message,
// //       timestamp: new Date().toLocaleString(),
// //     };
// //     setNotifications(prev => [newNotification, ...prev]);
// //   };

// //   const clearNotifications = () => setNotifications([]);

// //   return (
// //     <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
// //       {children}
// //     </NotificationContext.Provider>
// //   );
// // };





// import React, { createContext, useContext, useState, ReactNode } from 'react';

// type Notification = {
//   id: number;
//   message: string;
//   timestamp: string;
// };

// type NotificationContextType = {
//   notifications: Notification[];
//   addNotification: (message: string) => void;
//   clearNotifications: () => void; // ✅ Add this
// };

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// export const NotificationProvider = ({ children }: { children: ReactNode }) => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   const addNotification = (message: string) => {
//     const newNotification = {
//       id: Date.now(),
//       message,
//       timestamp: new Date().toLocaleTimeString(),
//     };
//     setNotifications((prev) => [...prev, newNotification]);
//   };

//   const clearNotifications = () => {
//     setNotifications([]); // ✅ Clears all notifications
//   };

//   return (
//     <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => {
//   const context = useContext(NotificationContext);
//   if (!context) {
//     throw new Error('useNotification must be used within a NotificationProvider');
//   }
//   return context;
// };
