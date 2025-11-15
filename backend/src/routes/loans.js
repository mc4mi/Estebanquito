const router = require("express").Router();
const ensureAuth = require("../middleware/authMiddleware");
const Loan = require("../models/Loan");
const User = require("../models/User");

// SOLICITAR PRÉSTAMO
router.post("/", ensureAuth, async (req, res) => {
  const { monto, plazo } = req.body;

  const loan = await Loan.create({
    usuarioId: req.session.userId,
    monto,
    plazo,
    estado: "pendiente"
  });

  res.json(loan);
});

// LISTAR PRÉSTAMOS DEL USUARIO
router.get("/", ensureAuth, async (req, res) => {
  const loans = await Loan.find({ usuarioId: req.session.userId });
  res.json(loans);
});

// APROBAR PRÉSTAMO
router.put("/:id/approve", async (req, res) => {
  const loan = await Loan.findByIdAndUpdate(req.params.id, { estado: "aprobado" }, { new: true });

  const user = await User.findById(loan.usuarioId);
  user.saldo += loan.monto;
  await user.save();

  res.json({ loan, user });
});

// RECHAZAR PRÉSTAMO
router.put("/:id/reject", async (req, res) => {
  const loan = await Loan.findByIdAndUpdate(req.params.id, { estado: "rechazado" }, { new: true });
  res.json(loan);
});

module.exports = router;
