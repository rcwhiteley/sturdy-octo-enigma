const db = require('./connection');

exports.createPasajeroDTO = (dbo) =>{
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

function createPasajeroDBO(dto){
    return {
        nombre: dto.nombre,
        apellido: dto.apellido,
        username: dto.username,
        mail: dto.mail,
        rut: dto.rut,
        celular: dto.celular,
        valoracion: dto.valoracion,
    };
}

function createConductorDBO(dto){
    let dbo = createPasajeroDBO(dto);
    dbo.fechalicencia = dto.fechaLicencia;
    dbo.claselicencia = dto.claseLicencia;
    dbo.tienefoto = dto.tieneFoto;
    return dbo;

};

function createConductorDTO(dbo){
    let dto = createPasajeroDTO(dbo);
    dto.fechaLicencia = dbo.fechalicencia;
    dto.claseLicencia = dbo.claselicencia;
    dto.tieneFoto = dbo.tienefoto;
    return dto;
}

exports.getUsuarioByName = (nombre) => {
    return  db.query('select * from pasajero where nombre = $1', [nombre])
    .then(res=>{
        return res.rows.map(createPasajeroDTO);
    });
};

exports.getUsuarioById = (id) => {
    return  db.query('select * from pasajero where username = $1', [id])
    .then(res=>{
        return res.rows.map(createPasajeroDTO);
    });
};

exports.getConductorByName = (nombre) => {
    return  db.query('select * from pasajero, conductor where nombre = $1', [nombre])
    .then(res=>{
        return res.rows.map(createConductorDTO);
    });
};

exports.getConductorById = (id) => {
    return db.query('select * from pasajero, conductor where pasajero.username = $1', [id])
    .then(res =>{
        return res.rows.map(createConductorDTO)
    });
};