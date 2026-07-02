import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn, getRole } from "../services/AuthService";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuth = isUserLoggedIn();
  const role = getRole();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Or to an unauthorized page
  }

  return children;
};

export default ProtectedRoute;
