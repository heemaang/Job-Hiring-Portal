import React, { useEffect, useState } from 'react';
import { messaging, firestore } from '../firebase';

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        if ('Notification' in window && 'serviceWorker' in navigator) {
          await Notification.requestPermission();
          const currentToken = await messaging.getToken();

          // Save the FCM token to Firestore for the user
          await firestore.collection('users').doc(user.uid).update({
            fcmToken: currentToken,
          });

          // Listen for incoming messages
          messaging.onMessage((payload) => {
            const notificationData = {
              title: payload.notification.title,
              body: payload.notification.body,
              timestamp: new Date(),
            };

            // Update state with the new notification
            setNotifications((prevNotifications) => [notificationData, ...prevNotifications]);
          });
        }
      } catch (error) {
        console.error('Error setting up notifications:', error.message);
        // Handle error, show error message, etc.
      }
    };

    setupNotifications();
  }, [user.uid]);

  return (
    <div>
      <h2>Real-Time Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <p>{notification.title}</p>
              <p>{notification.body}</p>
              <p>Received at: {notification.timestamp.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
};

export default Notifications;
