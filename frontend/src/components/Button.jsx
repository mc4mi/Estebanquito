import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  loading = false,
  full = true,
  iconOnly = false,
  className = "",
  ...props
}) {
  const base = "btn";
  const v = `btn--${variant}`;
  const s = size === "md" ? "" : `btn--${size}`;
  const i = iconOnly ? "btn--icon" : "";
  const classes = [base, v, s, i, className].filter(Boolean).join(" ");
  const style = { width: full ? "100%" : "auto" };

  return (
    <button
      className={classes}
      aria-disabled={loading || props.disabled ? "true" : undefined}
      disabled={props.disabled || loading}
      style={style}
      {...props}
    >
      {loading ? (
        <span className="btn__content">
          <span className="btn__spinner" />
          <span>Procesando...</span>
        </span>
      ) : (
        <span className="btn__content">
          {leadingIcon && <span aria-hidden>{leadingIcon}</span>}
          {children && <span>{children}</span>}
          {trailingIcon && <span aria-hidden>{trailingIcon}</span>}
        </span>
      )}
    </button>
  );
}