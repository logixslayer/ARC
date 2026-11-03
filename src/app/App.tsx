import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthPage } from "../pages/auth/AuthPage";
import { FeaturePage } from "../pages/FeaturePage";
import { routeDefinitions } from "./routes";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route path="/forgot-password" element={<AuthPage mode="forgot-password" />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {routeDefinitions.map((route) => (
            <Route key={route.path} path={route.path} element={<FeaturePage definition={route} />} />
          ))}
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
    </Routes>
  );
}
