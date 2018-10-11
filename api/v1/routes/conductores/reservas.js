// ruta api/v1/usuarios/:usuario/reservas/

const express = require('express');
const router = express.Router();
const db = require('../../database/database');

/**
 * retorna las reservas hechas por usuarioID
 */
router.get('/', async(req, res)=>{
    console.log(req.conductor);
    let result = await db.reservas.getAllReservasAConductor(req.pasajero);
    res.send(result);
});

/**
 * cancela una reserva solicitada por el usuarioID
 */
router.delete('/:reservaID', async(req, res)=>{
    
});

module.exports = router;
