import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import toast from "react-hot-toast";

// Define the props type for ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    toast("Login or Register", {
      icon: "⚠️",
    });
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
