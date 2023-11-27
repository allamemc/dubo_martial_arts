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
        res.redirect(`/login?not_found=true`);
      } else {
        res.redirect(`/login?error_password=true`);
      }
    } else {
      // En este punto, la autenticación fue exitosa
      req.session.user = {
        id: user._id,
        username: user.username,
        name: user.name,
      };
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/register", (req, res) => {
  if (req.query.existing) {
    res.redirect("register.html?existing=true");
  } else {
    res.redirect("/register.html");
  }
});

router.post("/register", async (req, res) => {
  const { username, password, user } = req.body;

  try {
    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.redirect(`/register?existing=true`);
    } else {
      const newUser = new User({ username, password, name: user });
      await newUser.save();

      req.session.user = {
        id: newUser._id,
        username: newUser.username,
        name: newUser.name,
      };
      res.redirect("/");
    }

    // Crea un nuevo usuario
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
