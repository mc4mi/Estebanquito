import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";

export default function Reports() {
  const { api, setAlert } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reports");
      console.log("Reporte recibido:", res.data);

      // Asegurarse de que sea un objeto con los campos esperados
      const data = res.data || {};
      setReport({
        ingresos: Number(data.ingresos) || 0,
        egresos: Number(data.egresos) || 0,
        deudas: Number(data.deudas) || 0,
      });
    } catch (err) {
      console.error("Error al cargar reportes:", err?.response?.data || err.message);
      setAlert("Error al cargar reportes");
      setReport({ ingresos: 0, egresos: 0, deudas: 0 });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Cargando reportes...</div>;

  return (
    <div className="page-container">
      <h2>Reportes</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 12,
        }}
      >
        <Card>
          <h4>Ingresos</h4>
          <p style={{ fontSize: 22, fontWeight: 700 }}>${report.ingresos.toFixed(2)}</p>
        </Card>
        <Card>
          <h4>Egresos</h4>
          <p style={{ fontSize: 22, fontWeight: 700 }}>${report.egresos.toFixed(2)}</p>
        </Card>
        <Card>
          <h4>Deudas</h4>
          <p style={{ fontSize: 22, fontWeight: 700 }}>${report.deudas.toFixed(2)}</p>
        </Card>
      </div>
      <button onClick={load} style={{ marginTop: 12 }}>
        Refrescar
      </button>
    </div>
  );
}
