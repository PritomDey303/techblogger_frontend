import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authData, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authData.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
