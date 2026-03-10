const verificarToken = require('../middlewares/auth')
const express = require('express');
const router = express.Router();
const {registrar, login, userInfo} = require('../controllers/usuarios.controller');


router.post('/login', login);
router.post('/register', registrar);
router.get('/usuario', verificarToken, userInfo);

module.exports = router;