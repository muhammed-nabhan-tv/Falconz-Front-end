import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const stored = localStorage.getItem("user");
  const user   = stored ? JSON.parse(stored) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  // ✅ render whatever is passed inside <ProtectedRoute>
  return children;
};