const db = require('./connection');

function createDTO(dbo){
    return {
        orden: dbo.orden,
        idViaje: dbo.idviaje,
        ciudad: dbo.ciudad,
        hora: dbo.hora,
        direccion: dbo.direccion,
    }
}



exports.createDTO = createDTO;