
const express = require('express');
const router = express.Router();
const db = require('../../../database/database');


/**
 * retorna las peticiones de reserva hechas al viaje creado por el usuario
 */
router.get('/:viajeID/reservas', async(req, res)=>{

});

/**
 * retornas los datos de una reserva hecha al viaje creado por el usuario
 */
router.get('/:viajeID/reservas/:reservaID', async(req, res)=>{

});

/**
 * actualiza el estado de la peticion de reserva reservaID
 */
router.put('/:viajeID/reservas/:reservaID', async(req, res)=>{

});



module.exports = router;