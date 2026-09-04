import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/user-auth-store/useAuthStore";

export default function ProtectedRoute({ allowedRole }) {
  const { user, isLoggedIn } = useAuthStore();

  const token = user?.accessToken;
  const userId = user?._id;
  const userRole = user?.role?.toLowerCase();

  // If unauthenticated or token/id missing, redirect to login
  if (!isLoggedIn || !token || !userId) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified and does not match, redirect to correct role dashboard
  if (allowedRole && userRole !== allowedRole.toLowerCase()) {
    if (userRole === "admin") {
      return <Navigate to={ROUTES.ADMIN.ROOT} replace />;
    }
    return <Navigate to={ROUTES.STUDENT.ROOT} replace />;
  }

  return <Outlet />;
}
