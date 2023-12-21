import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';

const NotificationHistory = ({ user }) => {
  const [notificationHistory, setNotificationHistory] = useState([]);

  useEffect(() => {
    const fetchNotificationHistory = async () => {
      try {
        // Fetch historical notifications for the user
        const notificationsQuery = await firestore
          .collection('notifications')
          .where('userId', '==', user.uid)
          .orderBy('timestamp', 'desc') // Order by timestamp in descending order
          .get();

        const notificationsData = notificationsQuery.docs.map((doc) => doc.data());
        setNotificationHistory(notificationsData);
      } catch (error) {
        console.error('Error fetching notification history:', error.message);
        // Handle error, show error message, etc.
      }
    };

    fetchNotificationHistory();
  }, [user.uid]);

  return (
    <div>
      <h2>Notification History</h2>
      {notificationHistory.length > 0 ? (
        <ul>
          {notificationHistory.map((notification, index) => (
            <li key={index}>
              <p>{notification.title}</p>
              <p>{notification.body}</p>
              <p>Sent at: {notification.timestamp.toDate().toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notification history yet.</p>
      )}
    </div>
  );
};

export default NotificationHistory;
