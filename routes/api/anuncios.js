const AnuncioModel = require('../../models/anuncio');

var express = require('express');
var router = express.Router();

// GET /api/anuncios
// Devuelve una lista de anuncios

router.get('/', async (req, res, next) => {
  try {
    const anuncios = await AnuncioModel.find();
    res.json({ data: anuncios });
  } catch(err) {
    next(err)
  }
});

module.exports = router;
