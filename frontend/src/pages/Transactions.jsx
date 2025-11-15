import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";

export default function Transactions() {
  const { api } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

const load = async () => {
  try {
    setLoading(true);
    const res = await api.get("/transactions/history");
    console.log("Historial recibido:", res.data);
    setHistory(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Error al cargar historial:", err?.response?.data || err.message);
    setAlert("Error al cargar historial");
    setHistory([]);
  } finally {
    setLoading(false);
  }
};

return (
  <div className="page-container">
    <h2>Historial de movimientos</h2>
    <div style={{ display: "grid", gap: 12 }}>
      {Array.isArray(history) && history.length === 0 && <Card>No hay movimientos</Card>}
      {Array.isArray(history) &&
        history.map((tx) => (
          <Card key={tx._id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{tx.tipo}</strong>
                <div>{new Date(tx.fecha).toLocaleString()}</div>
                <div>{tx.detalle}</div>
              </div>
              <div style={{ fontWeight: 700 }}>${tx.monto.toFixed(2)}</div>
            </div>
          </Card>
        ))}
    </div>
  </div>
);
}