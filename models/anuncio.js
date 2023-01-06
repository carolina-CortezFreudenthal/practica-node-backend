const mongoose = require('mongoose');
const { Schema } = mongoose;

// Estructura de anuncio
const AnuncioSchema = new Schema({
    nombre:  String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
  });

// Creacion del modelo usando el esquema
let AnuncioModel = mongoose.model('Anuncio', AnuncioSchema);
module.exports = AnuncioModel;

