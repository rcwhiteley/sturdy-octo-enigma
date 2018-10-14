// ruta api/v1/usuarios/:usuario/reservas/

const express = require('express');
const router = express.Router();
const db = require('../../database/database');

/**
 * retorna las reservas hechas por usuarioID
 */
router.get('/', async(req, res)=>{
    console.log(req.pasajero);
    let result = await db.reservas.getReservasPasajero(req.pasajero);
    res.send(result);
});

/**
 * cancela una reserva solicitada por el usuarioID
 */
router.delete('/:reservaID', async(req, res)=>{
    let result = await db.reservas.borrarReservaDePasajero(req.pasajero, req.params.reservaID);
    console.log(result.rowCount);

    if(result.rowCount >= 1){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(204);
    }
});

module.exports = router;
