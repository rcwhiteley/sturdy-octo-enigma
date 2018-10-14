const express = require('express');
const router = express.Router();
const db = require('../../database/database');

router.get('/', async(req, res)=>{
    let result = await db.vehiculos.listVehiculosConductor(req.conductor);
    if(result.length > 0){
        res.send(result);
    }
    else{
        res.status(204);
    }
});

router.get('/:patente', async(req, res) =>{
    let result = await db.vehiculos.getVehiculo(req.params.patente);
    if(result.length > 0){
        res.send(result[0]);
    }
    else{
        res.sendStatus(204);
    }
});

router.post('/', async(req, res) =>{
    if(req.body.patente == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro origen"));
    }
    else if(req.body.marca == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro destino"));
    }
    else if(req.body.modelo == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro pasajero"));
    }
    else if(req.body.aptoSillaBebe == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro asientos"));
    }
    else if(req.body.capacidadEquipaje == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro maletas"));
    }
    else if(req.body.numeroPlazas == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro pasajero"));
    }
    else if(req.body.dosPasajerosAtras == undefined){
        res.status(409).send(consts.crearErrorMsg("No se encuentra parametro asientos"));
    }
    else{
        // faltan sanity checks por tipos de datos
        req.body.conductor = req.conductor;
        let result = await db.vehiculos.createVehiculo(req.body);
        if(result.rowCount != undefined && result.rowCount > 0){
            res.sendStatus(200);   
        }
        else{
            res.status(400).send(consts.crearErrorMsg('No se pudo insertar el vehiculo'));
        }
    }

});

module.exports = router;