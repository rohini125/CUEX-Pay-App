import { useEffect, useRef } from 'react';
import { useAlertContext } from './AlertContext';
import * as Notifications from 'expo-notifications';

const usePriceMonitor = () => {
  const { alerts } = useAlertContext();

  const pricesRef = useRef<{ [key: string]: number }>({});
  const triggeredRef = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const checkAlerts = async () => {
      for (const alert of alerts) {
        const currentSimulatedPrice = simulatePrice(alert.currency);

        pricesRef.current[alert.currency] = currentSimulatedPrice;

        const alreadyTriggered = triggeredRef.current[alert.description];
        if (alreadyTriggered) continue;

        const isPriceMatch =
          alert.type === 'price' &&
          currentSimulatedPrice.toFixed(2) === Number(alert.value).toFixed(2);

        const isPercentageMatch =
          alert.type === 'percentage' &&
          hasReachedTargetPercentage(currentSimulatedPrice, alert);

        if (isPriceMatch || isPercentageMatch) {
          await triggerNotification(alert.description);
          triggeredRef.current[alert.description] = true;
        }
      }
    };

    const interval = setInterval(() => {
      checkAlerts();
    }, 5000);

    return () => clearInterval(interval);
  }, [alerts]);

  const simulatePrice = (currency: string) => {
    return 0.5 + Math.random(); // Simulate price
  };

  const hasReachedTargetPercentage = (price: number, alert: any) => {
    const original = 1.0;
    const target = original * (1 + Number(alert.value) / 100);
    return price.toFixed(2) === target.toFixed(2);
  };

  const triggerNotification = async (message: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🔔 Price Alert Triggered!',
        body: message,
      },
      trigger: null,
    });
  };
};

export default usePriceMonitor;
