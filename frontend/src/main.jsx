// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UIProvider } from "./context/UIContext.jsx";

// Estilos globales
import "./index.css";
import "./styles/globals.css";
import "./styles/theme.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('No se encontró el elemento #root en index.html');
}

createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Primero Auth, luego UI (o al revés). Ambos envolverán <App /> */}
      <AuthProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);