import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function DepositWithdraw() {
  const { api, setAlert } = useAuth();
  const [monto, setMonto] = useState("");
  const [busy, setBusy] = useState(false);

  const deposit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.post("/transactions/deposit", { monto: Number(monto) });
      setAlert(res.data.message || "Depósito realizado");
    } catch (err) {
      setAlert(err?.response?.data?.message || "Error en depósito");
    } finally {
      setBusy(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const withdraw = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.post("/transactions/withdraw", { monto: Number(monto) });
      setAlert(res.data.message || "Retiro realizado");
    } catch (err) {
      setAlert(err?.response?.data?.message || "Error en retiro");
    } finally {
      setBusy(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="page-container">
      <h2>Depósito / Retiro</h2>
      <div className="card">
        <form>
          <Input label="Monto" type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
          <div style={{display:"flex", gap:8}}>
            <Button onClick={deposit} disabled={busy}>Depositar</Button>
            <Button onClick={withdraw} disabled={busy}>Retirar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
