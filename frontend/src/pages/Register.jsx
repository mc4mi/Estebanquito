// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/bank-logo.svg";

export default function Register() {
  const { setAlert } = useAuth(); // No usamos register directo del context
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [tipo, setTipo] = useState("ahorros");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setBusy(true);
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, numeroCuenta, tipo, password }),
      credentials: "include" // 🔑 para enviar cookies
    });
    const data = await res.json();
    if (res.ok) {
      nav("/dashboard");
    } else {
      setAlert(data.message || "No fue posible registrar la cuenta");
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
          <h2 className="auth-title">Crear cuenta</h2>
          <p className="auth-subtitle">Completa tus datos para comenzar.</p>

          <form onSubmit={handleSubmit} className="form">
            <label className="input-group">
              <span className="input-label">Nombre completo</span>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Maria Camila Rodriguez"
                required
              />
            </label>

            <label className="input-group">
              <span className="input-label">Email</span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@banco.com"
                required
              />
            </label>

            <label className="input-group">
              <span className="input-label">Número de cuenta</span>
              <Input
                value={numeroCuenta}
                onChange={(e) => setNumeroCuenta(e.target.value)}
                placeholder="1234567890"
                required
              />
            </label>

            <label className="input-group">
              <span className="input-label">Tipo de cuenta</span>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="input"
              >
                <option value="ahorros">Ahorros</option>
                <option value="corriente">Corriente</option>
              </select>
            </label>

            <label className="input-group">
              <span className="input-label">Contraseña</span>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="form-hint">Usa al menos 6–8 caracteres.</div>
            </label>

            <Button type="submit" disabled={busy}>
              {busy ? "Registrando..." : "Crear cuenta"}
            </Button>
          </form>

          <div className="auth-meta">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
