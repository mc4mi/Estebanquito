module.exports = function ensureAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "No autorizado" });
  }
  next();
};