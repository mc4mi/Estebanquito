const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  numeroCuenta: { type: String, required: true, unique: true },
  tipo: { type: String, enum: ["ahorros", "corriente"], default: "ahorros" },
  saldo: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", UserSchema);
