import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authAdapter } from "../services/authAdapter";

export function ProtectedRoute() {
  const location = useLocation();
  if (!authAdapter.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
