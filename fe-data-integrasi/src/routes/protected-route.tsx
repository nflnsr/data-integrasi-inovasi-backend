import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function ProtectedRoute() {
  const { authData } = useAuth();
  if (!authData.user.name) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
