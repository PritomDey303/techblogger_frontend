import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./Context/AuthContext";
import PostContext from "./Context/PostContext";
import ToastContext from "./Context/ToastContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PostContext>
    <ToastContext>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastContext>
  </PostContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
