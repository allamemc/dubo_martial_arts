const mongoose = require("mongoose");

// Definición del esquema para la clase
const ClaseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  dia: {
    type: String,
    required: true,
  },
});

// Modelo de Clase basado en el esquema
const Clase = mongoose.model("Clase", ClaseSchema, "clases");

module.exports = Clase;
