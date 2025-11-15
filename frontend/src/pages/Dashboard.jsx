import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { TransferIcon, DepositIcon, LoansIcon } from "../components/BankIcons";

export default function Dashboard() {
  const { api } = useAuth();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/accounts/me");
      setAccount(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div style={{padding:20}}>Cargando cuenta...</div>;

  return (
    <div className="page-container">
      <h1>Bienvenido{account ? `, ${account.nombre}` : ""}</h1>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16}}>
        <Card>
          <h3>Saldo</h3>
          <p style={{fontSize:24, fontWeight:700}}>${account?.saldo?.toFixed(2) ?? 0}</p>
        </Card>
        <Card>
          <h3>Datos</h3>
          <p><strong>Email:</strong> {account?.email}</p>
          <p><strong>Cuenta:</strong> {account?.numeroCuenta}</p>
          <p><strong>Tipo:</strong> {account?.tipo}</p>
        </Card>
      </div>
    </div>
    
  );
}
