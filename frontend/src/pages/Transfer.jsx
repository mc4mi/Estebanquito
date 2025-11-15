import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function Transfer() {
  const { api, setAlert } = useAuth();
  const [destinoCuenta, setDestinoCuenta] = useState("");
  const [monto, setMonto] = useState("");
  const [busy, setBusy] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.post("/transactions/transfer", { destinoCuenta, monto: Number(monto) });
      setAlert(res.data.message || "Transferencia realizada");
    } catch (err) {
      setAlert(err?.response?.data?.message || "Error en transferencia");
    } finally {
      setBusy(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="page-container">
      <h2>Transferir</h2>
      <div className="card">
        <form onSubmit={handle}>
          <Input label="Cuenta destino (número)" value={destinoCuenta} onChange={(e) => setDestinoCuenta(e.target.value)} required />
          <Input label="Monto" type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
          <Button type="submit" disabled={busy}>{busy ? "Enviando..." : "Transferir"}</Button>
        </form>
      </div>
    </div>
  );
}
