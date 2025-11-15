const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  cuentaId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tipo: { type: String, enum: ["transferencia", "deposito", "retiro"], required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  detalle: { type: String }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
