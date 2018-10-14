// Ruta /api/v1/viajes/:viajeID/reservas

const express = require('express');
const db = require('../../database/database');
const consts = require('../../database/constants');
const router = express.Router();

/**
 * pide crear una reserva en el viaje
 */
router.post('/', async(req, res)=>{
    req.body.idViaje = req.viajeID;
    if(req.body.origen == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro origen"));
    }
    else if(req.body.destino == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro destino"));
    }
    else if(req.body.pasajero == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro pasajero"));
    }
    else if(req.body.asientos == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro asientos"));
    }
    else if(req.body.maletas == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro maletas"));
    }
    else{
        let result = await db.reservas.crearReservaPasajero(req.body);
        if(result.rowCount == 0){
            res.status(409).send(consts.crearErrorMsg("No se creo la reserva, probablemente ya fue creada una reserva al viaje"));
        }
        else if(result.rowCount == undefined || result.error != undefined || result.name != undefined){
            res.statusCode(500).send(consts.crearErrorMsg("No se pudo crear la reserva, probablemente un error con la base de datos"));
        }
        else{
            /**
             * Se debe controlar esto en caso de errores, eliminar la consulta extra para obtener la reserva
             */
            let result = await db.reservas.getReservaPasajeroByViajeId(req.body.pasajero, req.viajeID);
            res.send(result);
        }
    }
});

/**
 * obtiene los pasajeros confirmados para el viaje
 */
router.get('/', async(req, res)=>{
    let result = await db.viajes.listPasajerosConfirmadosEnViaje(req.viajeID);
    res.send(result);
});

module.exports = router;