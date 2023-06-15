//Auth context to handle user authentication and authorization manually
import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../UtilityFunction/getToken";
import { Notification } from "./ToastContext";
import { url } from "./Url";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { notification } = useContext(Notification);
  const [loginTrigger, setLoginTrigger] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [authData, setAuthData] = useState({
    isLoggedIn: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetch(`${url}/api/auth/keeplogin`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.user);
          if (data.status === "success") {
            setAuthData({
              isLoggedIn: true,
              user: data.user,
            });
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [loginTrigger]);

  const login = (data, clearInput, rememberMe) => {
    console.log(data);
    setLoading(true);
    //api call for login
    fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data + "authcontext");
        if (data?.status === "success") {
          //clear all previous token
          localStorage.removeItem("token") ||
            sessionStorage.removeItem("token");
          if (rememberMe) {
            localStorage.setItem("token", data.token);
          }
          if (!rememberMe) {
            sessionStorage.setItem("token", data.token);
          }
          setAuthData({
            isLoggedIn: true,
            user: data.user,
          });
          setLoading(false);
          notification(data?.message, "success");
          clearInput();
          setLoginTrigger(!loginTrigger);
        }
        if (data?.status === "error") {
          notification(data?.message, "danger");
          setLoading(false);
        }
      });
  };

  //signup function

  const signup = (authdata, clearInput) => {
    //api call for signup
    fetch(`${url}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.status === "success") {
          setLoading(false);
          notification(data?.message, "success");
          setLoading(false);
          setIsSignup(true);
          clearInput();
        }

        if (data?.status === "error") {
          notification(data?.message, "danger");
          setLoading(false);
        }
      });
    setLoading(false);
  };

  //logout function

  const logout = () => {
    setLoading(true);
    setAuthData({
      isLoggedIn: false,
      user: null,
    });
    localStorage.removeItem("token") || sessionStorage.removeItem("token");
    setLoading(false);
  };
  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        signup,
        logout,
        loading,
        isSignup,
        setIsSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
