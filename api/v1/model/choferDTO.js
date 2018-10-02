exports.createDTO = (resDb) => {
    return {
        nombre= resDb.usuario,
        //etc..
    }
};

exports.createDBO = (dto) => {
    return {
        usuario = dto.nombre
    }
};