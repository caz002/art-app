import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }: { children: any }) => {
  const { session } = UserAuth();
  return <>{session ? <>{children}</> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
