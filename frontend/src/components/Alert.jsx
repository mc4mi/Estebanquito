import React from "react";

export default function Alert({ message, variant = "info", onClose }) {
  if (!message) return null;
  const cls = `alert alert--${variant}`;

  return (
    <div role="alert" className={cls}>
      <span aria-hidden="true" style={{ marginTop: 2 }}>
        {variant === "success" && "✅"}
        {variant === "error" && "⛔"}
        {variant === "info" && "ℹ️"}
      </span>
      <div>{message}</div>
      {onClose && (
        <button
          aria-label="Cerrar alerta"
          onClick={onClose}
          className="btn btn--secondary"
          style={{ width: "auto", padding: "6px 10px" }}
        >
          Cerrar
        </button>
      )}
    </div>
  );
}
