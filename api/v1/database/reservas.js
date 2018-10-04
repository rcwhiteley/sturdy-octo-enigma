const db = require('./connection');

let createDTO = (resDb) => {
    return {
        nombre: resDb.usuario
    }
};

function createDBO(dto){
    return {
        usuario: dto.nombre
    }
};