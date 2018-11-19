const express = require('express');
const db = require('../../database/database');
const constants = require('../../database/constants');
const router = express.Router();

router.get('/:conductor', async(req,res)=>{
    console.log("asda");
    let conductor = req.params.conductor;
    let result = await db.usuarios.getDatosConductor(conductor);
    /*.then(result=>{
        if(result.length > 0){
            res.send(constants.createResponse(constants.ERROR_SUCCESS, result[0]));
        }
        else{
            res.send(contants.createResponse("Conductor no encontrado"));
        }
    })
    .catch(error=>{
        res.send(constants.createResponse(error));
    });*/
});


module.exports = router;