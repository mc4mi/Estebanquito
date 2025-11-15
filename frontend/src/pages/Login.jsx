// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/bank-logo.svg";

export default function Login() {
  const { setAlert } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setBusy(true);
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include" 
    });
    const data = await res.json();
    if (res.ok) {
      nav("/dashboard");
    } else {
      setAlert(data.message || "No fue posible iniciar sesión");
    }
  } catch (error) {
    setAlert("Error de conexión con el servidor");
  }
  setBusy(false);
};
  return (
    <div className="auth-hero">
      <section
        className="art"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        <div className="art-content" style={{ textAlign: "center" }}>
          <img src={logo} alt="Logo Banca Estebanquito" style={{ width: 200, height: 200 }} />

          <div className="brand-copy" style={{ maxWidth: 320, margin: "0 auto" }}>
            <h1>
              Banca <span className="text-success">Estebanquito</span>
            </h1>
            <p>Tu dinero, siempre a la vista. Seguro. Rápido. Inteligente.</p>
          </div>

          <div className="card card--accent" style={{ marginTop: 32 }}>
            <h3 className="mt-0">Beneficios principales</h3>
            <ul className="text-muted" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Transferencias y pagos en segundos</li>
              <li>Préstamos acreditados al instante</li>
              <li>Reportes claros de ingresos, egresos y deudas</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="auth-pane">
        <div className="auth-card">
          <h2 className="auth-title">Iniciar sesión</h2>
          <p className="auth-subtitle">Bienvenido de nuevo, nos alegra verte.</p>

          <form onSubmit={handleSubmit} className="form">
            <label className="input-group">
              <span className="input-label">Email</span>
              <Input
                type="email"
                placeholder="tucorreo@banco.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="input-group">
              <span className="input-label">Contraseña</span>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="form-hint">Mínimo 6 caracteres.</div>
            </label>

            <Button type="submit" disabled={busy}>
              {busy ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>

          <div className="auth-meta">
            ¿No tienes cuenta? <Link to="/register">Crea una ahora</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
