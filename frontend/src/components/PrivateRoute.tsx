import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }: { children: any }) => {
  const { session } = UserAuth();

  if (session == undefined) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
