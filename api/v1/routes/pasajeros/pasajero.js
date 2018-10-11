// Ruta /api/v1/pasajero/

const express = require('express');
const router = express.Router();
const reservas = require('./reservas');
const db = require('../../database/database');

router.use('/:pasajero/reservas', reservas);

//por hacer
router.get('/:pasajero/:valoraciones', async(req, res)=>{

});

router.get('/:pasajero', async (req, res)=>{
    let byName = req.query.byname == 'true';
    var result;
    if(byName)
        result = await db.usuarios.getUsuarioByName(req.params.pasajero);
    else
        result = await db.usuarios.getUsuarioById(req.params.pasajero);
    
    res.send(result);
});


module.exports = router;