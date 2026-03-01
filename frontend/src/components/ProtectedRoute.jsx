import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, currentRole, token } = useAuth();

  console.log("ProtectedRoute user:", user);
  console.log("ProtectedRoute token:", token);
  console.log("ProtectedRoute currentRole :", currentRole);

  if (!user || !token) {
    // replace => prevents the user from going back to the protected page after being redirected to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Outlet => renders the child routes of this protected route

  return children ? children : <Outlet />;
};
export default ProtectedRoute;
