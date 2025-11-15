const router = require("express").Router();
const ensureAuth = require("../middleware/authMiddleware");
const User = require("../models/User");

// INFO DEL USUARIO LOGEADO
router.get("/me", ensureAuth, async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.json(user);
});

// ACTUALIZAR PERFIL
router.put("/update", ensureAuth, async (req, res) => {
  const { nombre, email, tipo } = req.body;

  const user = await User.findByIdAndUpdate(
    req.session.userId,
    { nombre, email, tipo },
    { new: true }
  );

  res.json(user);
});

module.exports = router;
