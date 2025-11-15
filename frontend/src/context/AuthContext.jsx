import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL + "/api",
  withCredentials: true,
});


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoadingAuth(true);
        const res = await api.get("/accounts/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      // luego solicitar perfil
      const profile = await api.get("/accounts/me");
      setUser(profile.data);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.response?.data?.message || "Error al iniciar sesión" };
    }
  };

  const register = async (payload) => {
    try {
      await api.post("/auth/register", payload);
      const loginRes = await api.post("/auth/login", { email: payload.email, password: payload.password });
      const profile = await api.get("/accounts/me");
      setUser(profile.data);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.response?.data?.message || "Error al registrar" };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    user,
    loadingAuth,
    login,
    register,
    logout,
    api, 
    alert,
    setAlert,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
