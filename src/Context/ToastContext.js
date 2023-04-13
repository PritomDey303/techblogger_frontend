import React, { createContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
export const Notification = createContext();

const ToastContext = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const toggleShow = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };
  const notification = (message, type) => {
    setMessage(message);
    setType(type);
    toggleShow();
  };

  const toastData = { show, notification, message, type };

  return (
    <>
      <Notification.Provider value={toastData}>
        {children}
      </Notification.Provider>
    </>
  );
};

export default ToastContext;
