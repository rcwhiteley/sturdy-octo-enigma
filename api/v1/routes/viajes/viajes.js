// Ruta /api/v1/viajes

const express = require('express');
const router = express.Router();
const moment = require('moment')
const db = require('../../database/database');
const pasajeros = require('./pasajeros');
const paradas = require('./paradas');


router.use('/:viajeID/pasajeros', function(req, res, next) {
    req.viajeID= req.params.viajeID;
    next()
  }, pasajeros);

  router.use('/:viajeID/paradas', function(req, res, next) {
    req.viajeID= req.params.viajeID;
    next()
  }, paradas);


/**
 * Obtiene una lista de viajes segun su origen, destino y fechas
 */
router.get('/', async(req, res)=>{
    console.log(moment().toLocaleString());
    req.query.fechaminima = req.query.fechaminima || moment().format("DD-MM-YYYY hh:mm:ss");
    if(req.query.fechamaxima == undefined){
        res.status(400).send(JSON.stringify({message:'paramero fechamaxima no encontrado'}));
    }
    else if(req.query.origen == undefined){
        res.status(400).send(JSON.stringify({message:'paramero origen no encontrado'}));
    }
    else if(req.query.destino == undefined){
        res.status(400).send(JSON.stringify({message:'paramero destino no encontrado'}));
    }
    else if(req.query.asientos == undefined){
        res.status(400).send(JSON.stringify({message:'paramero asientos no encontrado'}));
    }
    else if(req.query.maletas == undefined){
        res.status(400).send(JSON.stringify({message:'paramero maletas no encontrado'}));
    }
    else{
        let result = await db.viajes.listViajesQuePasanPor(req.query.origen, req.query.destino, req.query.fechaminima, req.query.fechamaxima, req.query.asientos, req.query.maletas);
        res.send(result);
    }
});

/**
 * obtiene los datos de un viaje particular
 */
router.get('/:viajeID', async (req, res)=>{
    let result = await db.viajes.getViaje(req.params.viajeID);
    if(result.length > 0){
        res.send(result[0]);
    }
    else{
        res.sendStatus(204);
    }
});

/**
 * elimina un viaje
 */
router.delete('/:viajeID', async (req, res) => {
    try{
        await db.viajes.deleteViaje(req.params.viajeID);
        res.sendStatus(200);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }  
});

router.get('/:viajeID', async(req, res)=>{
    try{
        let sum = await db.viajes.getPrecio(req.params.viajeID, req.query.origen, req.query.destino);
        res.send({precio: sum});
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;