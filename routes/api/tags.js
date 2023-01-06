const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// GET /api/tags
// Devuelve una lista con los tags existentes

router.get('/', async (req, res, next) => {
  try {
    res.json({data: ['work', 'lifestyle', 'motor', 'mobile']});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
