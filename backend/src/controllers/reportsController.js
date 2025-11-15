const Transaction = require("../models/Transaction");
const Loan = require("../models/Loan");

exports.generateReports = async (req, res) => {
  try {
    const userId = req.session.userId;

    // INGRESOS: depósitos + transferencias recibidas
    const ingresos = await Transaction.aggregate([
      { $match: { cuentaId: userId, tipo: { $in: ["deposito"] } } },
      { $group: { _id: null, total: { $sum: "$monto" } } }
    ]);

    // EGRESOS: retiros + transferencias enviadas
    const egresos = await Transaction.aggregate([
      { $match: { cuentaId: userId, tipo: { $in: ["retiro", "transferencia"] } } },
      { $group: { _id: null, total: { $sum: "$monto" } } }
    ]);

    // DEUDAS pendientes
    const deudas = await Loan.aggregate([
      {
        $match: {
          usuarioId: userId,
          estado: { $in: ["pendiente", "aprobado"] }
        }
      },
      { $group: { _id: null, total: { $sum: "$monto" } } }
    ]);

    res.json({
      ingresos: ingresos[0]?.total || 0,
      egresos: egresos[0]?.total || 0,
      deudas: deudas[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
