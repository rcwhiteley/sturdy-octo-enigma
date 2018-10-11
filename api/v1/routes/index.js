// Router principal /api/v1/

const express = require('express');
const router = express.Router();

const pasajeros = require('./pasajeros/pasajero');
const viajes = require('./viajes/viajes');
const conductores = require('./conductores/conductor');
router.use('/pasajeros', pasajeros);
router.use('/viajes', viajes);
router.use('/conductores', conductores)

module.exports = router;