import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Type for alerts
export interface AlertData {
  type: 'price' | 'percentage';
  value: number | string;
  description: string;
  currency: string;
  triggered?: boolean;
}

// Context props
interface AlertContextProps {
  alerts: AlertData[];
  addAlert: (alert: AlertData) => void;
  deleteAlert: (index: number) => void;
  loadAlerts: () => void;
}

// Create context
const AlertContext = createContext<AlertContextProps | undefined>(undefined);

// Provider
export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  // Load alerts from AsyncStorage
  const loadAlerts = async () => {
    const stored = await AsyncStorage.getItem('alerts');
    if (stored) {
      setAlerts(JSON.parse(stored));
    }
  };

  // Save alerts to AsyncStorage
  const saveAlerts = async (newAlerts: AlertData[]) => {
    await AsyncStorage.setItem('alerts', JSON.stringify(newAlerts));
  };

  const addAlert = (alert: AlertData) => {
    const updated = [...alerts, alert];
    setAlerts(updated);
    saveAlerts(updated);
  };

  const deleteAlert = (index: number) => {
    const updated = alerts.filter((_, i) => i !== index);
    setAlerts(updated);
    saveAlerts(updated);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, deleteAlert, loadAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

// Hook to use the context
export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};
