const router = require("express").Router();
const ensureAuth = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// HISTORIAL COMPLETO
router.get("/", ensureAuth, async (req, res) => {
  const list = await Transaction.find({ cuentaId: req.session.userId }).sort({ fecha: -1 });
  res.json(list);
});

// HISTORIAL POR ID
router.get("/:id", ensureAuth, async (req, res) => {
  const list = await Transaction.find({ cuentaId: req.params.id }).sort({ fecha: -1 });
  res.json(list);
});

// DEPOSITO
router.post("/deposit", ensureAuth, async (req, res) => {
  const { monto } = req.body;
  const user = await User.findById(req.session.userId);

  user.saldo += monto;
  await user.save();

  await Transaction.create({
    cuentaId: user._id,
    tipo: "deposito",
    monto
  });

  res.json({ message: "Depósito realizado con éxito", saldo: user.saldo });
});

// RETIRO
router.post("/withdraw", ensureAuth, async (req, res) => {
  const { monto } = req.body;
  const user = await User.findById(req.session.userId);

  if (user.saldo < monto) {
    return res.status(400).json({ message: "Saldo insuficiente" });
  }

  user.saldo -= monto;
  await user.save();

  await Transaction.create({
    cuentaId: user._id,
    tipo: "retiro",
    monto
  });

  res.json({ message: "Retiro realizado con éxito", saldo: user.saldo });
});

// TRANSFERENCIA 
router.post("/transfer", ensureAuth, async (req, res) => {
  const { cuentaDestino, monto } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const usuarioOrigen = await User.findById(req.session.userId).session(session);

    if (usuarioOrigen.saldo < monto) throw new Error("Saldo insuficiente");

    const usuarioDestino = await User.findOne({ numeroCuenta: cuentaDestino }).session(session);
    if (!usuarioDestino) throw new Error("Cuenta destino no encontrada");

    usuarioOrigen.saldo -= monto;
    usuarioDestino.saldo += monto;

    await usuarioOrigen.save({ session });
    await usuarioDestino.save({ session });

    await Transaction.create([{
      cuentaId: usuarioOrigen._id,
      tipo: "transferencia",
      monto,
      detalle: `A ${cuentaDestino}`
    }], { session });

    await Transaction.create([{
      cuentaId: usuarioDestino._id,
      tipo: "transferencia",
      monto,
      detalle: `De ${usuarioOrigen.numeroCuenta}`
    }], { session });

    await session.commitTransaction();
    res.json({ message: "Transferencia realizada con éxito" });

  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
