import React from "react";

export default function Card({ children, accent = false, className = "", ...rest }) {
  const cls = "card" + (accent ? " card--accent" : "") + (className ? ` ${className}` : "");
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}