/**
 * @swagger
 * components:
 *   schemas:
 *     Tags:
 *       type: array
 *       example:
 *         ["lifestyle", "motor"]
 */

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// GET /api/tags
// Devuelve una lista con los tags existentes

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Lista de tags disponibles
 * /api/tags:
 *   get:
 *     summary: Lista de tags disponibles
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: La lista de tags disponibles.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tags'
 *       500:
 *         description: Some server error
 *
 */
router.get('/', async (req, res, next) => {
  try {
    res.json(['work', 'lifestyle', 'motor', 'mobile']);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
