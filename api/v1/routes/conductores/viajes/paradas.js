const express = require('express');
const router = express.Router();
const db = require('../../../database/database');
const consts = require('../../../database/constants');

function esParadaInvalida(parada){
    console.log("se evaluara: ",parada);
    return (parada.orden == undefined 
        || parada.ciudad == undefined
        || parada.direccion == undefined
        || parada.hora == undefined);
}

router.post('/', async (req, res)=>{
   // console.log(req.body)
    if(req.body.some(esParadaInvalida)){
        res.status(400).send(consts.crearErrorMsg('Una o mas paradas no tienen los argumentos necesarios.'));
    }
    else{
        db.viajes.asignarParadas(req.viajeID, req.body).then(()=>{
            res.sendStatus(200);
        }).catch(error=>{
            console.log(error);
            res.status(500).send('Hubo un error al actualizar la base de datos');
        });
    }
});


router.get('/', async (req, res)=>{
    let result = await db.viajes.listParadas(req.viajeID).catch(err => {return  err});
    // comprobar de mejor manera esto :S
    if(res.name == undefined){
        res.send(result);
    }
    else{
        res.status(500).send(consts.crearErrorMsg('Hubo un error al obtener los viajes'));
    }

});
module.exports = router;