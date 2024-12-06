import { useEffect, useState } from 'react';

const FloatingNotifications = ({ notifications }: { notifications: string[] }) => {
  const [showNotifications, setShowNotifications] = useState<string[]>(notifications);

  useEffect(() => {
    if (notifications.length > 0) {
      const lastNotification = notifications[notifications.length - 1];
      setShowNotifications((prevNotifications) => [...prevNotifications, lastNotification]);
    }
  }, [notifications]);

  return (
    <div className="fixed top-16 right-4 space-y-2 z-50">
      {showNotifications.map((notification, index) => (
        <div key={index} className="bg-blue-600 text-white px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform opacity-0 animate-fadeIn"
          style={{ animationDelay: `${index * 0.5}s`, animationDuration: '1s' }}
        >
          {notification}
        </div>
      ))}
    </div>
  );
};

export default FloatingNotifications;
