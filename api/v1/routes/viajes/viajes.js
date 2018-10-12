// Ruta /api/v1/viajes

const express = require('express');
const router = express.Router();
const moment = require('moment')
const db = require('../../database/database');

/**
 * Obtiene una lista de viajes segun su origen, destino y fechas
 * parametros obligatorios:
 * origen
 * destino
 * fechamaxima
 * 
 * opcionak:
 * fechaminima
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
    else{
        let result = await db.viajes.listViajesQuePasanPor(req.query.origen, req.query.destino, req.query.fechaminima, req.query.fechamaxima);
        res.send(result);
    }
});

/**
 * obtiene los datos de un viaje particular
 */
router.get('/:viajeID', async (req, res)=>{
    
});

module.exports = router;