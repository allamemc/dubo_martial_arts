const express = require("express");
const dbconnect = require("./src/config/db");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const Clase = require("./src/models/Clase");

dbconnect();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "encrypted data", // Cambia esto por una cadena secreta para firmar las cookies de sesión
    resave: true,
    saveUninitialized: true,
  })
);

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
  res.redirect("profile.html"); // Puedes enviar una respuesta indicando que el usuario está logueado
});

app.get("/profileinfo", checkSession, async (req, res) => {
  res.json(req.session.user); // Puedes enviar una respuesta con la información del usuario
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/dashboard", checkSession, (req, res) => {
  res.redirect("dashboard.html");
});

app.get("/apuntarseclase/:claseId", async (req, res) => {
  // Obtén el ID del usuario desde la sesión o de donde lo almacenes

  try {
    const claseId = req.params.claseId;
    const userId = req.session.user;
    try {
      // Verifica si el usuario ya existe en la base de datos
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Crea un nuevo usuario
      const newUser = new User({ username, password });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
    console.log("el uysuario " + userId + "a la clase " + claseId); // Puedes enviar una respuesta indicando que el usuario se ha inscrito correctamente
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al inscribirse en la clase."); // Manejo de errores
  }
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

const loginRoutes = require("./src/routes/auth"); // Reemplaza con la ruta correcta a tus rutas
app.use("/", loginRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
