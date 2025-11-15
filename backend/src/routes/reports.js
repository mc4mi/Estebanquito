const router = require("express").Router();
const ensureAuth = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");
const Loan = require("../models/Loan");

// REPORTE GENERAL
router.get("/summary", ensureAuth, async (req, res) => {
  const ingresos = await Transaction.aggregate([
    { $match: { cuentaId: req.session.userId, tipo: "deposito" } },
    { $group: { _id: null, total: { $sum: "$monto" } } }
  ]);

  const egresos = await Transaction.aggregate([
    { $match: { cuentaId: req.session.userId, tipo: "retiro" } },
    { $group: { _id: null, total: { $sum: "$monto" } } }
  ]);

  const deudas = await Loan.aggregate([
    { $match: { usuarioId: req.session.userId, estado: "aprobado" } },
    { $group: { _id: null, total: { $sum: "$monto" } } }
  ]);

  res.json({
    ingresos: ingresos[0]?.total || 0,
    egresos: egresos[0]?.total || 0,
    deudas: deudas[0]?.total || 0
  });
});

module.exports = router;
