// Ruta /api/v1/viajes/:viajeID/reservas

const express = require('express');
const db = require('../../database/viajes')
const router = express.Router();
/**
 * pide reservar una plaza del viaje
 */
router.post('/', async(req, res)=>{

});

/**
 * obtiene los pasajeros confirmados para el viaje
 */
router.get('/', async(req, res)=>{
    let result = await db.listPasajerosConfirmadosEnViaje(req.viajeID);
    res.send(result);
});

module.exports = router;