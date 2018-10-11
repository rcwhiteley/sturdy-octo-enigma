const db = require('./connection');

let createDTO = (dbo) => {
    return {
        id: dbo.id,
        pasajero: dbo.usuario,
        idViaje: dbo.idviaje,
        origen: dbo.origen,
        destino: dbo.destino,
        estado: dbo.estado,
    }
};

function createDBO(dto){
    return {
        id: dto.id,
        usuario: dto.nombre,
        idviaje: dto.idViaje,
        origen: dto.origen,
        destino: dto.destino,
        estado: dto.estado,
    }
};

exports.cambiarEstadoReserva = ()=>{

};

exports.getReservasPasajero = (username)=>{
    return db.query(`select * from reserva where usuario=$1`, [username]).
        then(result=>{
            return result.rows.map(createDTO);
        });
};

exports.borrarReservaDePasajero = (username, reservaID)=>{
    return db.query(`delete from reserva where usuario=$1 and id=$2`, [username, reservaID]);
}