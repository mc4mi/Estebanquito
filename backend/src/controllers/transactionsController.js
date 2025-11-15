const User = require("../models/User");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

// DEPÓSITO
exports.deposit = async (req, res) => {
  try {
    const { monto } = req.body;

    if (monto <= 0) {
      return res.status(400).json({ message: "Monto inválido" });
    }

    const user = await User.findById(req.session.userId);
    user.saldo += monto;
    await user.save();

    await Transaction.create({
      cuentaId: user._id,
      tipo: "deposito",
      monto,
      detalle: "Depósito realizado"
    });

    res.json({ message: "Depósito exitoso", saldo: user.saldo });
  } catch (err) {
    res.status(500).json(err);
  }
};

// RETIRO
exports.withdraw = async (req, res) => {
  try {
    const { monto } = req.body;

    const user = await User.findById(req.session.userId);

    if (monto <= 0 || user.saldo < monto) {
      return res.status(400).json({ message: "Fondos insuficientes" });
    }

    user.saldo -= monto;
    await user.save();

    await Transaction.create({
      cuentaId: user._id,
      tipo: "retiro",
      monto,
      detalle: "Retiro realizado"
    });

    res.json({ message: "Retiro exitoso", saldo: user.saldo });
  } catch (err) {
    res.status(500).json(err);
  }
};

// TRANSFERENCIA (con transacción de Mongo)
exports.transfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { destinoCuenta, monto } = req.body;

    const origen = await User.findById(req.session.userId);
    const destino = await User.findOne({ numeroCuenta: destinoCuenta });

    if (!destino) {
      return res.status(404).json({ message: "Cuenta destino no existe" });
    }

    if (monto <= 0 || origen.saldo < monto) {
      return res.status(400).json({ message: "Fondos insuficientes" });
    }

    // Operaciones ACID
    origen.saldo -= monto;
    destino.saldo += monto;

    await origen.save({ session });
    await destino.save({ session });

    // Registrar transacción
    await Transaction.create(
      [
        {
          cuentaId: origen._id,
          tipo: "transferencia",
          monto,
          detalle: `Transferencia realizada a ${destino.numeroCuenta}`
        }
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Transferencia exitosa" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json(err);
  }
};

// HISTORIAL
exports.getHistory = async (req, res) => {
  try {
    const historial = await Transaction.find({
      cuentaId: req.session.userId
    }).sort({ fecha: -1 });

    res.json(historial);
  } catch (err) {
    res.status(500).json(err);
  }
};
