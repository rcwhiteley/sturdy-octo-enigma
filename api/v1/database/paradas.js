const db = require('./connection');

function createDTO(dbo){
    return {
        orden: dbo.orden,
        viaje: dbo.idViaje,
        ciudad: dbo.ciudad,
        plazasLibres: dbo.plazasDisponibles,
        hora: dbo.hora,
        direccion: dbo.direccion,
        carga: dbo.equipajeCargado,
    }
}

function createDTO(dto){
    return {
        orden: dto.orden,
        idViaje: dto.viaje,
        ciudad: dto.ciudad,
        plazasDisponibles: dto.plazasLibres,
        hora: dto.hora,
        direccion: dto.direccion,
        equipajeCargado: dto.carga,
    }
}


