// Router principal /api/v1/

const express = require('express');
const router = express.Router();

const usuarios = require('./usuarios/usuario');
const viajes = require('./viajes/viajes');
router.use('/usuarios', usuarios);
router.use('/viajes', viajes);


module.exports = router;