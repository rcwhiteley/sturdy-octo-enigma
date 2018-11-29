const express = require('express');
const router = express.Router();
const db = require('../../database/database');
const consts = require('../../database/constants');



router.get('/', async (req, res)=>{
    try{
        let result = await db.viajes.listParadas(req.viajeID);
        // comprobar de mejor manera esto :S
  
            res.send(result);
        
    }
    catch(error){
        res.status(500).send(consts.crearErrorMsg('Hubo un error al obtener los viajes'));
    }

});
module.exports = router;