const db = require('./connection');

let createDTO = (dbo) => {
    return {
        pasajero: dbo.usuario,
        viaje: dbo.idviaje,
        origen: dbo.origen,
        destino: dbo.destino,
        estado: dbo.estado,
    }
};

function createDBO(dto){
    return {
        usuario: dto.nombre,
        idviaje: dto.viaje,
        origen: dto.origen,
        destino: dto.destino,
        estado: dto.estado,
    }
};

exports.cambiarEstadoReserva = ()=>{

};
