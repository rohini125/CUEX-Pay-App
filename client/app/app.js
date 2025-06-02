// App.js
import React from 'react';
import { NotificationProvider } from './context/NotificationContext';
import NotificationPage from './Sidebar/PriceAlert/NotificationsPage';

const App = () => {
  return (
    <NotificationProvider>
      <NotificationPage />
      <price-alert/>
    </NotificationProvider>
  );
};

export default App;
