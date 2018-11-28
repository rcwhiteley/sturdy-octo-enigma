const express = require('express');
const router = express.Router();
const db = require('../database/database');

router.post('/login', async (req, res)=>{
    try{
        let user = req.body.usuario;
        let pass = req.body.password;

        let result = {

        };
        result.valido = await db.usuarios.esUsuarioValido(user, pass);
        if(result.valido){
            result.usuario = await db.usuarios.getUsuarioById(user);
        }
        //result.conductor = await db.usuarios.getConductorById(user);
        res.send(result);
    }
    catch(err){
        let result = {};
        result.valido = false;
        res.send(result);
    }
});
module.exports = router;