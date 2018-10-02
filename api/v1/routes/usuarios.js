// Ruta /api/v1/usuarios

const express = require('express');
const router = express.Router();

/**
 * ruta: /api/v1/usuarios?
 * Obtiene un usuario segun su ID y su valoracion
 * resultado:
 * {
 *  usuario:usuarioDTO
 *  valoracion: valoracionTotal
 * }
 */
router.get('/:usuario', (req, res)=>{
    res.send(req.originalUrl);

    //res.send("{ \"usuario\"={\"nombre\"=\"gatec\" }, \"valoracion\"={\"estrellas\"=\"-5\" }");
});

module.exports = router;