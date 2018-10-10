const db = require('./connection');

function createDTO (dbo) {
    return {
        id: dbo.id,
        patente: dbo.patente,
        origen: dbo.origen,
        destino: dbo.destino,
        fecha: dbo.fecha,
        equipajeMaximo: dbo.equipajemax
    }
};

function createDBO(dto){
    return {
        id: dbo.id,
        patente: dbo.patente,
        origen: dbo.origen,
        destino: dbo.destino,
        fecha: dbo.fecha,
        equipajemax: dbo.equipajeMaximo
    }
};