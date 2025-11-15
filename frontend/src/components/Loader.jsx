import React from "react";

export default function Loader({ label = "Cargando..." }) {
  return (
    <div style={{ display: "grid", gap: 10, placeItems: "center", padding: 24 }}>
      <div className="loader" aria-hidden />
      <div className="text-muted">{label}</div>
    </div>
  );
}