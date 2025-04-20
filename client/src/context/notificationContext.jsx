import { message, notification } from "antd";
import { createContext, useContext } from "react";
import { CheckCircleOutlined } from '@ant-design/icons'; // Import the success icon

const NotificationContext = createContext(null);
export const useNotification = () => {
  return useContext(NotificationContext);
};

const NotificationContextProvider = ({ children }) => {
  const [api, contextNotificationHolder] = notification.useNotification();
  const [messageApi, contextMessageHolder] = message.useMessage();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
      icon: type == "success" && <CheckCircleOutlined style={{ color: 'blue' }} />, // Use custom or default success icon

    });
  };
  const openMessage = ({ type, message }) => {
    messageApi[type](message);
  };

  return (
    <NotificationContext.Provider value={{ openNotificationWithIcon, openMessage }}>
      {contextNotificationHolder}
      {contextMessageHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
