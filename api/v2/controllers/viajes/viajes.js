const express = require('express')
const db = require('../../database/database');
const constants = require('../../database/constants');
const router = express.Router();
const log = require('../../log');

router.get('/', async(req, res)=>{
    //try{
        let fechaMin = req.query.fechamin || constants.FECHA_MIN;
        let fechaMax = req.query.fechamax || constants.FECHA_MAX;
        let origen = req.query.origen;
        let destino = req.query.destino;
        let asientoslibres = req.query.asientoslibres || 1;
        let maletaslibres = req.query.maletaslibres || 1;
        let conductor = req.query.conductor;
        if(origen == undefined && conductor == undefined){
            res.send(constants.createResponse('Parametro origen no puede ser null'));
            return;
        }
        if(destino == undefined && conductor == undefined){
            res.send(constants.createResponse("Parametro destino no puede ser null"));
            return;
        }
        if(conductor == undefined){
            db.viajes.getViajes(origen, destino, fechaMin, fechaMax, asientoslibres, maletaslibres)
            .then(result=>{
                res.send(constants.createResponse(constants.ERROR_SUCCESS, result));
            })
            .catch(error=>{
                res.send(constants.createResponse(error));
            });
        }
        else{
            if(req.clientUser == conductor && (origen == null || destino == null)){
                db.getAllViajesConductor(conductor, fechaMin, fechaMax, asientoslibres, maletaslibres);
            }
            else{
                db.viajes.getViajesConductor(origen, destino, fechaMin, fechaMax, asientoslibres, maletaslibres, conductor)
                .then(result =>{
                    res.send(constants.createResponse(constants.createResponse(constants.ERROR_SUCCESS, result)));
                })
                .catch(error =>{
                    res.send(constants.createResponse(error));
                });
            }
        }
    }
    //catch(error){
    //    console.log(error);
    //    //log.error("Viajes", error, new Error(error).stack);
    //    res.sendStatus(500);
    //}
);

module.exports = router;