require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const app = express();
app.use(express.json());

// CORS con credenciales
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✔ Conectado a MongoDB"))
  .catch(err => console.log("❌ Error al conectar:", err));

// Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // en desarrollo
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Rutas
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/accounts", require("./src/routes/accounts"));
app.use("/api/transactions", require("./src/routes/transactions"));
app.use("/api/loans", require("./src/routes/loans"));
app.use("/api/reports", require("./src/routes/reports"));

app.listen(process.env.PORT, () =>
  console.log(` Servidor corriendo en puerto ${process.env.PORT}`)
);