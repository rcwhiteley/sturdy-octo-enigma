const db = require('./connection');

function createDTO (dbo) {
    return {
        nombre: dbo.usuario,
        //etc..
    }
};

function createDBO(dto){
    return {
        usuario: dto.nombre
    }
};