import { useAuth } from "../content/AuthContext";
import { Navigate } from "react-router-dom";

const emailRegExp = /(@interkambio.cl|@ksec.cl)/g;

export function ProtectedRoute({ register, children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  if (!user) return <Navigate to="/login" />;

  if (register && !user.email.match(emailRegExp))
    return <Navigate to="/login" />;

  return <>{children}</>;
}
