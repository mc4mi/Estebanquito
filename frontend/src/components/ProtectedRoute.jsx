import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div className="page-center" aria-busy="true" aria-live="polite">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <Loader label="Verificando sesión..." />
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}