const express = require('express');
const router = express.Router();
const viajes = require('./viajes/viajes');
const conductores = require('./conductores/conductor');

router.use('/', (req, res, next)=>{
    req.clientUser = req.query.clientUser;
    next();
});

router.use('/viajes', viajes);
router.use('/conductores', conductores);

module.exports = router;