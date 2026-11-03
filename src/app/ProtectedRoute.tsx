import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingState } from "../components/ui/States";
import { useAuth } from "./AuthContext";

export function ProtectedRoute() {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) return <LoadingState />;
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
