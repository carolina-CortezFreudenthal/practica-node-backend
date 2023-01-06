const AnuncioModel = require('../../models/anuncio');

var express = require('express');
var router = express.Router();

// GET /api/anuncios
// Devuelve una lista de anuncios

router.get('/', async (req, res, next) => {
  try {
    // filtros
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;

    const paginacion = {
      skip : req.query.skip,
      limit : req.query.limit,
      sort : req.query.sort,
    }

    const filtros = {};
    if (nombre) { // /api/anuncios?name=Bici
      filtros.nombre = new RegExp('^' + nombre, "i");
    }

    if (venta) { // /api/anuncios?venta=true
      filtros.venta = venta;
    }

    if (tags) {
      filtros.tags = { '$in': tags }
    }

    if (precio) { // /api/anuncions?precio=10-50 o /api/anuncions?precio=10- o /api/anuncions?precio=-50 o /api/anuncions?precio=50
      let range = precio.split("-");
    
      // Si solo tenemos uno => /api/anuncions?precio=50
      // El filtro verifica que el precio sea igual
      if (range.length == 1) filtros.precio = precio;
      // Si el primer elemento es vacio => /api/anuncions?precio=-50
      // El filtro verifica que el precio sea menor a range[1]
      else if (range[0] == "") filtros.precio = { '$lte': range[1] }
      // Si el segundo elemento es vacio => /api/anuncions?precio=50-
      // El filtro verifica que el precio sea mayor a range[9]
      else if (range[1] == "") filtros.precio = { '$gte': range[0] }
      // Si los dos elementos existen => /api/anuncions?precio=10-50
      // El filtro verifica que el precio este entre los valores
      else filtros.precio = { '$gte': range[0], '$lte': range[1] }
    }

    // if (age) { // /api/anuncios?age=32
    //   filtro.age = age;
    // }

    const anuncios = await AnuncioModel.consulta(paginacion, filtros);
    res.json({ data: anuncios });
  } catch(err) {
    next(err)
  }
});

module.exports = router;

