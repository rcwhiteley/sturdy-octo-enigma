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
        res.status(400).send(consts.crearErrorMsg('parametro origen no encontrado en el cuerpo de la consulta'));
    }   
    else if(req.body.destino == undefined){
        res.status(400).send(consts.crearErrorMsg('parametro destino no encontrado en el cuerpo de la consulta'));
    }
    else if(req.body.fecha == undefined){
        res.status(400).send(consts.crearErrorMsg('parametro fecha no encontrado en el cuerpo de la consulta'));
    }
    //else if(req.body.equipajeMaximo == undefined){
    //    res.status(400).send(consts.crearErrorMsg('parametro equipajeMax no encontrado en el cuerpo de la consulta'));
    //}
    //else if(req.body.vehiculo.patente == undefined){
    //    res.status(400).send(consts.crearErrorMsg('parametro vehiculo.patente no encontrado en el cuerpo de la consulta'));
    //}
    else{
        try{
            console.log(req.conductor);
            let vehiculos = await db.vehiculos.listVehiculosConductor(req.conductor);
            req.body.vehiculo = vehiculos[0];
            req.body.equipajeMaximo = vehiculos[0].capacidadEquipaje;
            let result = await db.viajes.crearViaje(req.body);
            console.log(result);
            res.send(result);
        }
        catch(error){
            console.log(error);
            res.status(500).send(consts.crearErrorMsg('Ocurrio un error al insertar en la base de datos'));
        }
    }
});



/**
 * por hacer, actualiza el viaje
 */
router.post('/:viajeID', async (req, res) => {

});

module.exports = router;