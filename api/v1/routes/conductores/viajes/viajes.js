// Ruta /api/v1/usuarios/:usuario/viajes

const express = require('express');
const router = express.Router();
const db = require('../../../database/database');
const reservas = require('./reservas');

router.use('/:viajeID/reservas', function(req, res, next) {
    req.viajeID= req.params.viajeID;
    next()
  }, reservas);


/**
 * retorna los viajes creados por el conductor
 */
router.get('/', async(req, res)=>{
    console.log("hola!" + req.usuario);
    let result = await db.viajes.getViajesCreadosByUsername(req.conductor);
    if(result.length > 0){
        res.send(result);
    }
    else{
        res.sendStatus(204);
    }
});

/** 
 * crea un viaje
 */
router.post('/', async(req, res)=>{
});

/**
 * retorna los datos de un viaje particular creado por usuario
 */
router.get('/:viajeID', async(req, res)=>{

});

/**
 * elimina un viaje
 */
router.delete('/:viajeID', async(req, res)=>{

});

/**
 * por hacer, actualiza el viaje
 */
router.put('/:viajeID', async(req, res)=>{

});

module.exports = router;