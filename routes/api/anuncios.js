/**
 * @swagger
 * components:
 *   schemas:
 *     Anuncio:
 *       type: object
 *       required:
 *         - nombre
 *         - venta
 *         - precio
 *         - foto
 *         - tags
 *       properties:
 *         id:
 *           type: string
 *           description: Id autogenerado por mongo
 *         nombre:
 *           type: string
 *           description: Nombre del anuncio
 *         venta:
 *           type: boolean
 *           description: Si el articulo es venta o busqueda
 *         precio:
 *           type: number
 *           description: Precio del articulo
 *         foto:
 *           type: string
 *           description: URL a la foto
 *         tags:
 *           type: array
 *           description: Tags del anuncio.
 *       example:
 *         id: d5fE_asz
 *         nombre: Bicicleta
 *         venta: true
 *         precio: 50
 *         foto: bici.png
 *         tags: ['lifestyle','motor']
 */

const AnuncioModel = require('../../models/anuncio');

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Anuncios
 *   description: Lista de anuncios
 * /api/anuncios:
 *   get:
 *     summary: Lista de anuncios
 *     parameters:
 *       - in: query
 *         name: nombre
 *         description: Nombre o inicio del nombre de un anuncio
 *         schema:
 *           type: string
 *       - in: query
 *         name: venta
 *         description: Si el anuncio es venta o busqueda
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: tags
 *         description: Tags que pueden incluirse en los anuncios
 *         schema:
 *           type: array
 *       - in: query
 *         name: precio
 *         description: Rango de precio. (x-y,-y,x-,x)
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Paginación - Limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: skip
 *         description: Paginación - Skip
 *         schema:
 *           type: number
 *     tags: [Anuncios]
 *     responses:
 *       200:
 *         description: La lista de anuncios que cumplen las condiciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anuncio'
= *       500:
 *         description: Some server error
 *
 */
router.get('/', async (req, res, next) => {
  try {
    // filtros
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;

    const paginacion = {
      skip: req.query.skip,
      limit: req.query.limit,
      sort: req.query.sort,
    };

    const filtros = {};
    if (nombre) { // /api/anuncios?name=Bici
      filtros.nombre = new RegExp('^' + nombre, 'i');
    }

    if (venta) { // /api/anuncios?venta=true
      filtros.venta = venta;
    }

    if (tags) {
      filtros.tags = {'$in': tags};
    }

    // /api/anuncions?precio=10-50
    // o /api/anuncions?precio=10-
    // o /api/anuncions?precio=-50 o /api/anuncions?precio=50
    if (precio) {
      const range = precio.split('-');

      // Si solo tenemos uno => /api/anuncions?precio=50
      // El filtro verifica que el precio sea igual
      if (range.length == 1) filtros.precio = precio;
      // Si el primer elemento es vacio => /api/anuncions?precio=-50
      // El filtro verifica que el precio sea menor a range[1]
      else if (range[0] == '') filtros.precio = {'$lte': range[1]};
      // Si el segundo elemento es vacio => /api/anuncions?precio=50-
      // El filtro verifica que el precio sea mayor a range[9]
      else if (range[1] == '') filtros.precio = {'$gte': range[0]};
      // Si los dos elementos existen => /api/anuncions?precio=10-50
      // El filtro verifica que el precio este entre los valores
      else filtros.precio = {'$gte': range[0], '$lte': range[1]};
    }

    // if (age) { // /api/anuncios?age=32
    //   filtro.age = age;
    // }

    const anuncios = await AnuncioModel.consulta(paginacion, filtros);

    // Covertimos el anuncio a la respuesta con el url a la imagen
    res.json(anuncios.map((a) => ({
      ...a._doc,
      foto: `${req.protocol + '://' + req.get('host')}/images/${a._doc.foto}`,
    })));
  } catch (err) {
    next(err);
  }
});

module.exports = router;

