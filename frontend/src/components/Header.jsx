
import React from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/bank-logo.svg";
import { LogoutIcon } from "./BankIcons";

export default function Header() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    nav("/login");
  };

  const showFullBrand = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="header" role="banner" aria-label="Barra superior">
      <div className="container">

        <div className="header-left">
          <Link
            to={user ? "/dashboard" : "/login"}
            className="brand"
            aria-label="Ir al inicio"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <img src={logo} alt="" width={75} height={75} style={{ marginRight: showFullBrand ? 10 : 0 }} />
            {showFullBrand && <span>Banca&nbsp;Estebanquito</span>}
          </Link>
          {showFullBrand && <span className="brand-badge">Seguro • Rápido</span>}
        </div>

 
        <nav className="header-right" aria-label="Navegación principal">
          {user ? (
            <>
              <div className="nav-pills">
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-pill active" : "nav-pill"}>Inicio</NavLink>
                <NavLink to="/transfer" className={({ isActive }) => isActive ? "nav-pill active" : "nav-pill"}>Transferir</NavLink>
                <NavLink to="/deposit-withdraw" className={({ isActive }) => isActive ? "nav-pill active" : "nav-pill"}>Depósito/Retiro</NavLink>
                <NavLink to="/transactions" className={({ isActive }) => isActive ? "nav-pill active" : "nav-pill"}>Movimientos</NavLink>
                <NavLink to="/loans" className={({ isActive }) => isActive ? "nav-pill active" : "nav-pill"}>Préstamos</NavLink>
                <NavLink to="/reports" className={({ isActive }) => isActive ? "nav-pill active" : "nav-pill"}>Reportes</NavLink>
              </div>

              <button
                className="btn btn--secondary btn-logout"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <LogoutIcon /> Cerrar sesión
                </span>
              </button>
            </>
          ) : (
            <div className="nav-pills">
              <NavLink to="/login" className={({ isActive }) => isActive ? "nav-pill active" : "nav-pill"}>Iniciar sesión</NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? "nav-pill active" : "nav-pill"}>Registrar</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
