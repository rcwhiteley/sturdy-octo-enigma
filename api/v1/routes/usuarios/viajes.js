// Ruta /api/v1/usuarios/:usuario/viajes

const express = require('express');
const router = express.Router();

module.exports = router;

/**
 * retorna los viajes creados por el conductor
 */
router.get('/', async(req, res)=>{

});

/** 
 * crea un viaje
 */
router.post('/', async(req, res)=>{

});

/**
 * retorna los datos de un viaje particular creado por usuario
 */
router.get('/:viajeID', async(req, res)=>{

});

/**
 * elimina un viaje
 */
router.delete('/:viajeID', async(req, res)=>{

});

/**
 * por hacer, actualiza el viaje
 */
router.put('/:viajeID', async(req, res)=>{

});

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

/**
 * rechaza una peticicon de reserva
 */
router.delete('/:viajeID/reservas/:reservaID', async(req, res)=>{

});


module.exports = router;