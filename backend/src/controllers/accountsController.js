const User = require("../models/User");

exports.getMyAccount = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { nombre, tipo } = req.body;

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { nombre, tipo },
      { new: true }
    ).select("-password");

    res.json({ message: "Cuenta actualizada", user });
  } catch (err) {
    res.status(500).json(err);
  }
};
