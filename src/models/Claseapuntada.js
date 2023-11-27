// Suponiendo que estás utilizando Mongoose para interactuar con MongoDB
const mongoose = require("mongoose");

const ClaseApuntadaSchema = new mongoose.Schema({
  usuarioId: {
    type: String,
    ref: "Usuario", // Referencia al modelo de Usuario
    required: true,
  },
  claseId: {
    type: String,
    ref: "Clase", // Referencia al modelo de Clase
    required: true,
  },
});

const ClaseApuntada = mongoose.model(
  "ClaseApuntada",
  ClaseApuntadaSchema,
  "clasesApuntadas"
);

module.exports = ClaseApuntada;
