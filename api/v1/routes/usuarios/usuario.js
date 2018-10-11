// Ruta /api/v1/usuarios/

const express = require('express');
const router = express.Router();
const viajes = require('./viajes');
const reservas = require('./reservas');
const db = require('../../database/database');

router.use('/:usuario/viajes', function(req, res, next) {
    req.usuario = req.params.usuario;
    next()
  }, viajes);
router.use('/:usuario/reservas', reservas);

//por hacer
router.get('/:usuario/:valoraciones', async(req, res)=>{

});

router.get('/:usuario', async (req, res)=>{
    let isDriver = req.query.driver == 'true';
    let byName = req.query.byname == 'true';
    var result;
	if(isDriver){ 
        if(byName){
            result = await db.usuarios.getConductorByName(req.params.usuario);
            console.log(result);
        }
        else
            result = await db.usuarios.getConductorById(req.params.usuario);
	}
	else{
    	var result;
        if(byName)
            result = await db.usuarios.getUsuarioByName(req.params.usuario);
        else
            result = await db.usuarios.getUsuarioById(req.params.usuario);
    }
    res.send(result);
});


module.exports = router;