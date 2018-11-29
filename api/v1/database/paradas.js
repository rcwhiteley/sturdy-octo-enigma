const db = require('./connection');

function createDTO(dbo){
    return {
        orden: dbo.orden,
        idViaje: dbo.idviaje,
        ciudad: dbo.ciudad,
        hora: dbo.hora,
        direccion: dbo.direccion,
        precio: dbo.precio,
    }
}

function createDBO(dto){
    return {
        orden: dto.orden,
        idViaje: dto.viaje,
        ciudad: dto.ciudad,
        plazasdisp: dto.asientosDisponibles,
        hora: dto.hora,
        direccion: dto.direccion,
        equipajecarg: dto.equipajeCargado,
    }
}

exports.createDTO = createDTO;