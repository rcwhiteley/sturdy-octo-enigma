const db = require('./connection');

function createUsuarioDTO (dbo) {
    return {
        nombre: dbo.nombre,
        apellido: dbo.apellido,
        nombreUsuario: dbo.username,
        mail: dbo.mail,
        celular: dbo.celular,
        rut: dbo.rut,
        valoracion: dbo.valoracion || 0,
    };
}

function createUsuarioDBO(dto){
    return {
        nombre: dto.nombre,
        apellido: dto.apellido,
        nombreUsuario: dto.username,
        mail: dto.mail,
        celular: dto.celular,
        rut: dto.rut,
        //valoracion: dto.valoracion,
    };
}

function createConductorDBO(dto){
    let dbo = createUsuarioDBO(dto);
    dbo.fechalicencia = dto.fechaLicencia;
    dbo.claselicencia = dto.claseLicencia;
    dbo.tienefoto = dto.tieneFoto;
    return dbo;

};

function createConductorDTO(dbo){
    let dto = createUsuarioDTO(dbo);
    dto.fechaLicencia = dbo.fechalicencia;
    dto.claseLicencia = dbo.claselicencia;
    dto.foto = dbo.tienefoto;
    return dto;
}

exports.getUsuarioByName = async (nombre) => {
    let query = await db.query('select * from pasajero where nombre = $1', [nombre]);
    let res = query.rows;
    return res.map(createUsuarioDTO);
};

exports.getUsuarioById = async (id) => {
    let query = await db.query('select * from pasajero where rut = $1', [id]);
    let res = query.rows;
    return res.map(createUsuarioDTO);
};

exports.getConductorByName = (nombre) => {
    return  db.query('select * from pasajero, conductor where nombre = $1', [nombre])
    .then(res=>{
        return res.rows.map(createConductorDTO);
    });
};

exports.getConductorById = async (id) => {
    let query = await db.query('select * from pasajero, conductor where rut = $1', [id]);
    let res = query.rows;
    return res.map(createConductorDTO);
};