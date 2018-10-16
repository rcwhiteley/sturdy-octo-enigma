const express = require('express');
const router = express.Router();
const viajes = require('./viajes/viajes');
router.use('/', (req, res, next)=>{
    req.dev = true;
    next();
});
router.use('/viajes', viajes);



module.exports = router;