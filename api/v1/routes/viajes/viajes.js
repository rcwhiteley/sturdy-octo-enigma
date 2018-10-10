// Ruta /api/v1/viajes

const express = require('express');
const router = express.Router();

/**
 * Obtiene una lista de viajes segun su origen, destino y fechas
 */
router.get('/', (req, res)=>{
    let plazasRequeridas = req.query.plazas;
    let asientosBebes = req.query.asientos_bebes;
    let fechaViaje = req.query.fecha_salida;
    let horaParada = req.query.hora_parada;
    let origen = req.query.origen;
    let destino = req.query.destino;
    let equipaje = req.query.equipaje;
    res.send("params: " + plazasRequeridas + " - " + asientosBebes  + " - " +  
    fechaViaje + " - " + horaParada + " - " + origen + " - " + destino + " - " + equipaje);
});

/**
 * obtiene los datos de un viaje particular
 */
router.get('/:viajeID', async (req, res)=>{
    
});

module.exports = router;