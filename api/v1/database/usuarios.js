const db = require('./connection');

function createDTO (resDb) {
    return {
        nombre: resDb.usuario
    };
}

function createDBO(dto){
    return {
        usuario: dto.nombre
    };
}

exports.getUsuarioByName = (nombre) =>{
    return db.query('SELECT * FROM test WHERE nombre = $1', [id]);
};

exports.getUsuarioById = (id) =>{
    return db.query('SELECT * FROM test WHERE id = $1', [id]);
};