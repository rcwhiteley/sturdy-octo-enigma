// Ruta /api/v1/usuarios/:usuario/viajes

const express = require('express');
const router = express.Router();
const db = require('../../../database/database');
const reservas = require('./reservas');
const paradas = require('./paradas');
const consts = require('../../../database/constants');

router.use('/:viajeID/reservas', function (req, res, next) {
    req.viajeID = req.params.viajeID;
    next()
}, reservas);


router.use('/:viajeID/paradas', function (req, res, next) {
    req.viajeID = req.params.viajeID;
    next()
}, paradas);


/**
 * retorna los viajes creados por el conductor
 */
router.get('/', async (req, res) => {
    let result = await db.viajes.getViajesCreadosByUsername(req.conductor);
    if (result.length > 0) {
        res.send(result);
    }
    else {
        res.sendStatus(204);
    }
});

/** 
 * crea un viaje
 */
router.post('/', async (req, res) => {
    if(req.body.origen == undefined){
        res.status(400).send(consts.crearErrorMsg('paramero origen no encontrado en el cuerpo de la consulta'));
    }   
    else if(req.body.destino == undefined){
        res.status(400).send(consts.crearErrorMsg('paramero destino no encontrado en el cuerpo de la consulta'));
    }
    else if(req.body.fecha == undefined){
        res.status(400).send(consts.crearErrorMsg('paramero fecha no encontrado en el cuerpo de la consulta'));
    }
    else if(req.body.equipajeMax == undefined){
        res.status(400).send(consts.crearErrorMsg('paramero equipajeMax no encontrado en el cuerpo de la consulta'));
    }
    else if(req.body.vehiculo.patente == undefined){
        res.status(400).send(consts.crearErrorMsg('paramero vehiculo.patente no encontrado en el cuerpo de la consulta'));
    }
    else{
        let result = await db.viajes.crearViaje(req.body);
        if(result.length > 0){
            res.send(result);
        }
        else{
            console.log(result);
            res.status(500).send(consts.crearErrorMsg('Ocurrio un error al insertar en la base de datos'));
        }
    }
});

/**
 * elimina un viaje
 */
router.delete('/:viajeID', async (req, res) => {
    
});

/**
 * por hacer, actualiza el viaje
 */
router.post('/:viajeID', async (req, res) => {

});

module.exports = router;