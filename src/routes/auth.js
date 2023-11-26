const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Reemplaza con la ruta correcta a tu modelo de usuario

router.get("/login", (req, res) => {
  if (req.query.not_found) {
    res.redirect("login.html?not_found=true");
  } else if (req.query.error_password) {
    res.redirect("login.html?password_error=true");
  } else {
    res.redirect("/login.html");
  }
});
// Manejo del login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca el usuario en la base de datos
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      if (!user) {
        console.log("User not found");
        res.redirect(`/login?not_found=true`);
      } else {
        console.log("Incorrect password");
        res.redirect(`/login?error_password=true`);
      }
    } else {
      // En este punto, la autenticación fue exitosa
      req.session.user = { id: user._id, username: user.username };
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/register", (req, res) => {
  res.redirect("register.html");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

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
});

module.exports = router;
