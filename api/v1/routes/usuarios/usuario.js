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

router.get('/:usuario', async(req, res)=>{
	if(req.query.byname == 'true'){
		console.log(req.params.usuario);
    	let query = await db.usuarios.getUsuarioByName(req.params.usuario);
    	res.send(query.rows);
	}
	else{
    	console.log(req.params.usuario);
    	let query = await db.usuarios.getUsuarioById(req.params.usuario);
    	res.send(query.rows);
	}
});

module.exports = router;