
const express = require('express');
const router = express.Router();
const db = require('../../../database/database');
const consts = require('../../../database/constants');

/**
 * retorna las peticiones de reserva hechas al viaje creado por el usuario
 */
router.get('/:viajeID/reservas', async(req, res)=>{

});

/**
 * retornas los datos de una reserva hecha al viaje creado por el usuario
 */
router.get('/:reservaID', async(req, res)=>{

});

/**
 * actualiza el estado de la peticion de reserva reservaID
 */
router.put('/:reservaID', async(req, res)=>{
    if(req.body.estado != 1 && req.body.estado != 2 && req.body.estado != 3){
        res.status(400).send(consts.crearErrorMsg("El estado para la reserva es invalido"));
    }
    else{
        let result = await db.reservas.cambiarEstadoReserva(req.params.reservaID, req.body.estado);
        if(result.rowCount >= 1){
            res.sendStatus(200);
        }
        else{
            console.log(result);
            res.status(500).send('No se pudo cambiar el estado de la reserva');
        }
    }
});



module.exports = router;