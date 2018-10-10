const db = require('./connection');

function createDTO (dbo) {
    return {
        patente: dbo.patente,
        maraca: dbo.marca,
        modelo: dbo.modelo,
        aptoSillaBebe: aptoparasilla,
        dosPasajerosAtras: dosatras,
        capacidadEquipaje: capequipaje,
        numeroPlazas: numplazas,
        conductor: conductor
        
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