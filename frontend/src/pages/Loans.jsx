import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Loans() {
  const { api, setAlert } = useAuth();
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState(1);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/loans");
      console.log("Solicitudes de préstamo recibidas:", res.data);
      setLoans(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error al cargar préstamos:", err?.response?.data || err.message);
      setAlert("Error al cargar solicitudes");
      setLoans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const request = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!monto || isNaN(Number(monto)) || Number(monto) <= 0) {
      setAlert("Monto inválido");
      return;
    }
    if (!plazo || isNaN(Number(plazo)) || Number(plazo) <= 0) {
      setAlert("Plazo inválido");
      return;
    }

    setBusy(true);
    try {
      const res = await api.post("/loans", { monto: Number(monto), plazo: Number(plazo) });
      console.log("Préstamo solicitado:", res.data);
      setAlert(res.data.message || "Solicitud enviada");
      load(); // Refresca la lista después de solicitar
    } catch (err) {
      console.error("Error al solicitar préstamo:", err?.response?.data || err.message);
      setAlert(err?.response?.data?.message || "Error al solicitar préstamo");
    } finally {
      setBusy(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="page-container">
      <h2>Préstamos</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 16 }}>
        <div>
          <h3>Mis solicitudes</h3>
          {loading ? (
            <div>Cargando...</div>
          ) : Array.isArray(loans) && loans.length > 0 ? (
            loans.map((l) => (
              <Card key={l._id}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div>Monto: ${Number(l.monto).toFixed(2)}</div>
                    <div>Plazo: {l.plazo} meses</div>
                    <div>Estado: {l.estado}</div>
                  </div>
                  <div>{new Date(l.fechaSolicitud).toLocaleString()}</div>
                </div>
              </Card>
            ))
          ) : (
            <Card>No tienes solicitudes</Card>
          )}
        </div>

        <div>
          <Card>
            <h3>Solicitar préstamo</h3>
            <form onSubmit={request}>
              <Input
                label="Monto"
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
              />
              <Input
                label="Plazo (meses)"
                type="number"
                value={plazo}
                onChange={(e) => setPlazo(e.target.value)}
                required
              />
              <Button type="submit" disabled={busy}>
                {busy ? "Enviando..." : "Solicitar"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
