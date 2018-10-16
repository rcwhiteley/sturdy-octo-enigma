const db = require('./connection');

createPasajeroDTO = (dbo) =>{
    return {
        nombre: dbo.nombre,
        apellido: dbo.apellido,
        username: dbo.username,
        mail: dbo.mail,
        celular: dbo.celular,
        rut: dbo.rut,
        valoracion: dbo.valoracion || 0,
    };
}

function createConductorDTO(dbo){
    let dto = createPasajeroDTO(dbo);
    dto.fechaLicencia = dbo.fechalicencia;
    dto.claseLicencia = dbo.claselicencia;
    dto.tieneFoto = dbo.tienefoto;
    return dto;
}

async function getDatosCuenta(usuario){
    
};

exports.createPasajeroDTO = createPasajeroDTO;
exports.createConductorDTO = createConductorDTO;