import React, { createContext, useContext, useState, ReactNode } from 'react';

type Notification = {
  id: string;
  message: string;
  triggeredAt: string;
};

type AlertContextType = {
  notifications: Notification[];
  addNotification: (message: string) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      triggeredAt: new Date().toLocaleString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  return (
    <AlertContext.Provider value={{ notifications, addNotification }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlertContext must be used within an AlertProvider');
  return context;
};
