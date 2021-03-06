// Ruta /api/v1/pasajero/

const express = require('express');
const router = express.Router();
const reservas = require('./reservas');
const db = require('../../database/database');

router.use('/:pasajero/reservas', function(req, res, next) {
    req.pasajero = req.params.pasajero;
    next()
  }, reservas);

//por hacer
router.get('/:pasajero/:valoraciones', async(req, res)=>{

});

router.get('/:pasajero', async (req, res)=>{
    let byName = req.query.byname == 'true';
    var result;
    if(byName)
        result = await db.usuarios.getUsuarioByName(req.params.pasajero);
    else
        result = await db.usuarios.getUsuarioById(req.params.pasajero);
        if(result.length > 0){
            res.send(result[0]);
        }
        else{
            res.sendStatus(204);
        }
});


module.exports = router;