const db = require('./connection');

function createDTO(dbo){
    return {
        orden: dbo.orden,
        viaje: dbo.idviaje,
        ciudad: dbo.ciudad,
        asientosDisponibles: dbo.plazasdisp,
        hora: dbo.hora,
        direccion: dbo.direccion,
        equipajeCargado: dbo.equipajecarg,
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
