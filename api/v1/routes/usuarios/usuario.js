// Ruta /api/v1/usuarios/viajes

const express = require('express');
const router = express.Router();
const viajes = require('./viajes');
const db = require('../../database/database');

router.use('/viajes', viajes);

router.get('/:usuario/:viajes', async(req, res)=>{

});

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
            result = db.usuarios.getConductorById(req.params.usuario);
	}
	else{
    	var result;
        if(byName)
            result = db.usuarios.getUsuarioByName(req.params.usuario);
        else
            result = db.usuarios.getUsuarioById(req.params.usuario);
    }
    res.send(result);
});


module.exports = router;