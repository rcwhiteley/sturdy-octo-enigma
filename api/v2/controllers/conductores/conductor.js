const express = require('express');
const db = require('../../database/database');
const constants = require('../../database/constants');
const router = express.Router();

router.get('/{conductor}', async (req,res)=>{
    let conductor = params.conductor;
    db.usuarios.getConductor(conductor)
    .then(result=>{
        if(result.length > 0){
            res.send(constants.createResponse(constants.ERROR_SUCCESS, result[0]));
        }
        else{
            res.send(contants.createResponse("Conductor no encontrado"));
        }
    })
    .catch(error=>{
        res.send(constants.createResponse(error));
    });
});

