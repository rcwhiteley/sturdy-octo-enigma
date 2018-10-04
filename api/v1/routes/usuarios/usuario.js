// Ruta /api/v1/usuarios/viajes

const express = require('express');
const router = express.Router();
const viajes = require('./viajes');
const db = require('../../database/database');

router.use('/viajes', viajes);


/** query params = ?tipo = one of[creados, reservados] */
router.get('/:usuario/:viajes', async(req, res)=>{

});

/**
 * query params = ?from = one of[dados, recibidos];
 */
router.get('/:usuario/:valoraciones', async(req, res)=>{

});

router.get('/:usuario', async(req, res)=>{
    console.log(req.params.usuario);
    let query = await db.usuarios.getUsuarioById(req.params.usuario);
    res.send(query.rows);
});

module.exports = router;