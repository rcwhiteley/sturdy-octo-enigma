const db = require('./connection');

function createUsuarioDTO (dbo) {
    return {
        nombre: dbo.nombre,
        apellido: dbo.apellido,
        nombreUsuario: dbo.username,
        mail: dbo.mail,
        celular: dbo.celular,
        rut: dbo.rut,
        valoracion: dbo.valoracion,
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
        valoracion: dto.valoracion,
    };
}

function createChoferDBO(dto){
    let dbo = createUsuarioDBO(dto);
    dbo.fechaLicencia = dto.fechaLicencia;
    dbo.claseLicencia = dto.claseLicencia;
    dbo.foto = dto.foto;
    return dbo;

};

function crearChoferDTO(dbo){
    let dto = createUsuarioDTO(dbo);
    dto.fechaLicencia = dbo.fechaLicencia;
    dto.claseLicencia = dbo.claseLicencia;
    dto.foto = dbo.foto;
    return dto;
}

exports.getUsuarioByName = (nombre) => {
    return db.query('select * from pasajero where nombre = $1', [id]);
};

exports.getUsuarioById = (id) => {
    return db.query('select * from pasajero where rut = $1', [id]);
};

exports. getChoferByName = (nombre) => {

};

exports.getChoferById = (id) => {

};