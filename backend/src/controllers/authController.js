const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { nombre, email, password, numeroCuenta, tipo } = req.body;

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "El email ya existe" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      nombre,
      email,
      password: hashed,
      numeroCuenta,
      tipo,
      saldo: 0
    });

    res.json({ message: "Usuario creado", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Usuario no existe" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Contraseña incorrecta" });

  req.session.userId = user._id;

  res.json({ message: "Login exitoso", userId: user._id });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: "Sesión cerrada" });
};
