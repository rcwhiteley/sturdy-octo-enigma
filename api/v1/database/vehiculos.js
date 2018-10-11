const db = require('./connection');

exports.createDTO =  (dbo)=> {
    return {
        patente: dbo.patente,
        maraca: dbo.marca,
        modelo: dbo.modelo,
        aptoSillaBebe: dbo.aptoparasilla,
        dosPasajerosAtras: dbo.dosatras,
        capacidadEquipaje: dbo.capequipaje,
        numeroPlazas: dbo.numplazas,
        conductor: dbo.conductor
        
    }
};

function createDBO(dto){
    return {
        patente: dbo.patente,
        maraca: dbo.marca,
        modelo: dbo.modelo,
        aptoparasilla: aptoSillaBebe,
        dosatras: dosPasajerosAtras,
        capequipaje: capacidadEquipaje,
        numplazas: numeroPlazas,
        conductor: conductor
        
    }
};