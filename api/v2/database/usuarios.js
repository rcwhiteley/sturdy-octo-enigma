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

exports.getDatosConductor = (usuario) => {
    return db.query('select * from pasajero, conductor where pasajero.username = conductor.username and pasajero.username = $1', [usuario])
    .then(res =>{
        return res.rows.map(createConductorDTO)
    });
    /*db.query(
        `select * from pasajero, conductor where counductor.username = pasajero.username and conductor.username=$1`, [usuario])
        .then(res =>{
            return res.rows.map(createConductorDTO);
        });
    */
}



exports.createPasajeroDTO = createPasajeroDTO;
exports.createConductorDTO = createConductorDTO;