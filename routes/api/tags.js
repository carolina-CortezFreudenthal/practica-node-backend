var express = require('express');
var router = express.Router();

// GET /api/tags
// Devuelve una lista con los tags existentes

router.get('/', async (req, res, next) => {
  try {
    res.json({ data: ["work", "lifestyle", "motor", "mobile"]});
  } catch(err) {
    next(err)
  }
});

module.exports = router;
