const express = require('express');
const router = express.Router();
const pasajeros = require('./pasajeros/pasajero');
const viajes = require('./viajes/viajes');
const conductores = require('./conductores/conductor');
const login = require('./login');
router.use('/pasajeros', pasajeros);
router.use('/viajes', viajes);
router.use('/conductores', conductores)
router.use('/', login);
module.exports = router;