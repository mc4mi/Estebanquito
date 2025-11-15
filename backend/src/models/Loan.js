const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  monto: { type: Number, required: true },
  plazo: { type: Number, required: true },
  estado: { type: String, enum: ["pendiente", "aprobado", "rechazado"], default: "pendiente" },
  fechaSolicitud: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Loan", LoanSchema);
