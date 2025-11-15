import React from "react";

export default function Input({ label, hint, error, leftIcon, rightIcon, ...props }) {
  const hasIcon = leftIcon || rightIcon;

  return (
    <label className="input-group">
      {label && <span className="input-label">{label}</span>}

      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center"
      }}>
        {leftIcon && (
          <span aria-hidden className="text-muted" style={{ position: "absolute", left: 12, display: "grid", placeItems: "center" }}>
            {leftIcon}
          </span>
        )}

        <input
          className="input"
          style={{
            paddingLeft: leftIcon ? 40 : undefined,
            paddingRight: rightIcon ? 40 : undefined,
            borderColor: error ? "rgba(248,113,113,0.6)" : undefined,
            boxShadow: error ? "0 0 0 3px rgba(248,113,113,0.15)" : undefined
          }}
          {...props}
        />

        {rightIcon && (
          <span aria-hidden className="text-muted" style={{ position: "absolute", right: 12, display: "grid", placeItems: "center" }}>
            {rightIcon}
          </span>
        )}
      </div>

      {hint && !error && <div className="form-hint">{hint}</div>}
      {error && <div className="form-hint" style={{ color: "#f87171" }}>{error}</div>}
    </label>
  );
}