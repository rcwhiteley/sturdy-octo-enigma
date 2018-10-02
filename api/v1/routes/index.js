// Router principal /api/v1/

const express = require('express');
const router = express.Router();

const usuarios = require('./usuarios');
const viajes = require('./viajes');
router.use('/usuarios', usuarios);
router.use('/viajes', viajes);


module.exports = router;