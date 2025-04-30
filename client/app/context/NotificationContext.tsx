// // import React, { createContext, useContext, useState, ReactNode } from 'react';

// // type Notification = {
// //   id: string;
// //   title:string;
// //   message: string;
// //   timestamp: Date; // <-- Add this line if missing!
// // };

// // type NotificationContextType = {
// //   notifications: Notification[];
// //   addNotification: (notification: Notification) => void;
// // };

// // const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// // export const NotificationProvider = ({ children }: { children: ReactNode }) => {
// //   const [notifications, setNotifications] = useState<Notification[]>([]);

// //   const addNotification = (notification: Notification) => {
// //     setNotifications(prev => [...prev, notification]);
// //   };

// //   return (
// //     <NotificationContext.Provider value={{ notifications, addNotification }}>
// //       {children}
// //     </NotificationContext.Provider>
// //   );
// // };

// // export const useNotificationContext = () => {
// //   const context = useContext(NotificationContext);
// //   if (!context) {
// //     throw new Error('useNotificationContext must be used within a NotificationProvider');
// //   }
// //   return context;
// // };


// import React, { createContext, useState, useContext, ReactNode } from 'react';

// // Create a NotificationContext
// const NotificationContext = createContext<any>(null);

// // Define the type for the NotificationProvider props
// interface NotificationProviderProps {
//   children: ReactNode;
// }

// // Create a provider for the NotificationContext
// export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
//   const [notifications, setNotifications] = useState<any[]>([]);

//   const addNotification = (notification: any) => {
//     setNotifications((prevNotifications) => [...prevNotifications, notification]);
//   };

//   return (
//     <NotificationContext.Provider value={{ notifications, addNotification }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// // Custom hook to use the NotificationContext
// export const useNotificationContext = () => {
//   const context = useContext(NotificationContext);
//   if (!context) {
//     throw new Error('useNotificationContext must be used within a NotificationProvider');
//   }
//   return context;
// };
