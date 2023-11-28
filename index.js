const express = require("express");
const dbconnect = require("./src/config/db");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const Clase = require("./src/models/Clase");
const GoogleStrategy = require("./src/routes/passportGoogle");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

const ClaseApuntada = require("./src/models/Claseapuntada");

dbconnect();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET, // Cambia esto por una cadena secreta para firmar las cookies de sesión
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/google/success", (req, res) => {
  if (req.isAuthenticated()) {
    req.session.user = {
      id: req.user._id,
      username: req.user.email,
      name: req.user.name,
    };
    res.redirect("/"); // Redirecciona en caso de autenticación exitosa
  }
  res.redirect("/auth/google/failure"); // Redirecciona en caso de fallo de autenticación
});

app.get("/auth/google/failure", (req, res) => {
  res.status(401).json({ message: "Authentication failed" });
});

app.get("/", (req, res) => {
  res.redirect("index.html");
});

const checkSession = (req, res, next) => {
  if (req.session.user) {
    next(); // Si hay sesión, permite que continúe la solicitud
  } else {
    res.redirect("/login"); // Si no hay sesión, redirige al login o a donde desees
  }
};

app.get("/checkUser", (req, res) => {
  if (req.session.user) {
    res.json("true");
  } else {
    res.json("false");
  }
});

app.get("/profile", checkSession, (req, res) => {
  if (req.query.yaapuntado) {
    res.redirect("profile.html?yaapuntado=true");
  } else if (req.query.apuntado) {
    res.redirect("profile.html?apuntado=true");
  } else if (req.query.error) {
    res.redirect("profile.html?error=true");
  } else {
    res.redirect("/profile.html");
  } // Puedes enviar una respuesta indicando que el usuario está logueado
});

app.get("/profileinfo", checkSession, async (req, res) => {
  res.json(req.session.user); // Puedes enviar una respuesta con la información del usuario
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/clases", async (req, res) => {
  try {
    const clases = await Clase.find();
    res.json(clases); // Envia las clases como JSON directamente al cliente
  } catch (error) {
    console.error("Error al obtener clases:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.get("/clases/:claseid", checkSession, async (req, res) => {
  const usuarioId = req.session.user.id; // Suponiendo que obtienes el ID del usuario logueado
  const claseId = req.params.claseid;
  try {
    // Suponiendo que envían el ID de la clase en el cuerpo de la solicitud

    // Verificar si el usuario ya está apuntado a esa clase
    const existeClaseApuntada = await ClaseApuntada.findOne({
      usuarioId,
      claseId,
    });

    if (existeClaseApuntada) {
      res.redirect(`/profile?yaapuntado=true`);
    } else {
      const nuevaClaseApuntada = new ClaseApuntada({ usuarioId, claseId });
      await nuevaClaseApuntada.save();

      res.redirect(`/profile?apuntado=true`);
    }
    // Redireccionar a donde desees
    // Crear un nuevo registro en ClaseApuntada
  } catch (error) {
    console.error("Error al apuntarse a la clase:", error);
    return res.status(500).json({
      mensaje: "Hubo un error al procesar la solicitud",
      status: "error",
    });
  }
});

app.get("/getuser", checkSession, (req, res) => {
  res.json(req.session.user);
});

const loginRoutes = require("./src/routes/auth"); // Reemplaza con la ruta correcta a tus rutas
app.use("/", loginRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
