// Ruta /api/v1/conductor/

const express = require('express');
const router = express.Router();
const reservas = require('./viajes/reservas');
const viajes = require('./viajes/viajes');
const db = require('../../database/database');

//router.use('/:usuario/reservas', reservas);

router.use('/:conductor/viajes', function(req, res, next) {
    req.conductor = req.params.conductor;
    next()
  }, viajes);

  
router.get('/:conductor', async (req, res)=>{
    let byName = req.query.byname == 'true';
    var result;
    if(byName)
        result = await db.usuarios.getConductorByName(req.params.conductor);
    else
        result = await db.usuarios.getConductorById(req.params.conductor);
    if(result.length > 0){
        res.send(result[0]);
    }
    else{
        res.sendStatus(204);
    }
});
module.exports = router;