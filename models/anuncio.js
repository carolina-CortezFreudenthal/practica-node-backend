const mongoose = require('mongoose');
const {Schema} = mongoose;

// Estructura de anuncio
const AnuncioSchema = new Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String],
});

AnuncioSchema.statics.consulta = (paginacion /* {skip, limit} */, filtros) => {
  const query = AnuncioModel.find(filtros);
  query.skip(paginacion.skip);
  query.limit(paginacion.limit);
  query.sort(paginacion.sort);
  // query.select(campos);
  // query.sort(sort);
  return query.exec();
};

// Creacion del modelo usando el esquema
const AnuncioModel = mongoose.model('Anuncio', AnuncioSchema);
module.exports = AnuncioModel;

