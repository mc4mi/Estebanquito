const Loan = require("../models/Loan");
const User = require("../models/User");

exports.requestLoan = async (req, res) => {
  try {
    const { monto, plazo } = req.body;

    const loan = await Loan.create({
      usuarioId: req.session.userId,
      monto,
      plazo,
      estado: "pendiente"
    });

    res.json({ message: "Solicitud enviada", loan });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Ver préstamos del usuario
exports.getMyLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ usuarioId: req.session.userId });
    res.json(loans);
  } catch (err) {
    res.status(500).json(err);
  }
};

// (Opcional) Aprobar préstamo
exports.approveLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findByIdAndUpdate(
      loanId,
      { estado: "aprobado" },
      { new: true }
    );

    // Acreditar dinero al usuario
    const user = await User.findById(loan.usuarioId);
    user.saldo += loan.monto;
    await user.save();

    res.json({ message: "Préstamo aprobado", loan });
  } catch (err) {
    res.status(500).json(err);
  }
};
