const verificarToken = require('../middlewares/auth')
const express = require('express');
const router = express.Router();

const {
  getNotas,
  postNota,
  putNota,
  deleteNota
} = require('../controllers/notas.controller');

router.get('/',verificarToken, getNotas);
router.post('/',verificarToken, postNota);
router.put('/:id',verificarToken, putNota);
router.delete('/:id',verificarToken, deleteNota);

module.exports = router;