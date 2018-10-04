const db = require('./connection');

function createDTO (resDb) {
    return {
        nombre: resDb.usuario,
        //etc..
    }
};

function createDBO(dto){
    return {
        usuario: dto.nombre
    }
};