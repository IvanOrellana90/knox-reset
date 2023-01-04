import { useAuth } from "../content/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ register, children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  if (!user) return <Navigate to="/login" />;

  if (register && user.email != "iorellana@interkambio.cl")
    return <Navigate to="/login" />;

  return <>{children}</>;
}
