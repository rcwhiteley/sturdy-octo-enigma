const db = require('./connection');
const database = require('../database/database');
const consts = require('./constants');
let createDTO = (dbo) => {
    return {
        id: dbo.id,
        pasajero: dbo.usuario,
        idViaje: dbo.idviaje,
        origen: dbo.origen,
        destino: dbo.destino,
        estado: dbo.estado,
        maletas: dbo.maletas,
        hora: dbo.hora,
        asientos: dbo.numasientos,
        //precio:  database.viajes.getPrecio(dbo.idviaje, dbo.origen, dbo.destino)
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
    return db.query(`select reserva.*, parada.hora from reserva, parada where usuario=$1
    and parada.idviaje = reserva.idviaje and reserva.origen = parada.ciudad and reserva.estado <> $2`, [username, consts.RESERVA_CANCELADA]).
        then(async result=>{
            let rows = result.rows.map(createDTO);
            for(let i = 0; i < rows.length; i++){
                rows[i].precio = await database.viajes.getPrecio(rows[i].idViaje, rows[i].origen, rows[i].destino);
            }
            return rows;
        });
};

exports.borrarReservaDePasajero = (username, reservaID)=>{
    return db.query(`delete from reserva where usuario=$1 and id=$2`, [username, reservaID]);
}

exports.getReservaPasajeroByViajeId = (username, viajeID) =>{
    return 
        db.query(`select * from reserva where usuario=$1 and idviaje=$2`,[username, viajeID])
        .then(result =>{
            result.map(createDTO);
        });
};

exports.crearReservaPasajero = (reservaDTO) =>{
    return db.query(
        `INSERT INTO reserva
            (idviaje, usuario, origen, destino, estado, maletas, numasientos)
        SELECT $1, $2::varchar, $3, $4, $5, $6, $7
        WHERE
            NOT EXISTS (
                SELECT id FROM reserva WHERE idviaje = $1 and usuario = $2::varchar
            );`,
     [reservaDTO.idViaje, reservaDTO.pasajero, reservaDTO.origen, reservaDTO.destino, consts.RESERVA_PENDIENTE, reservaDTO.maletas, reservaDTO.asientos])
     .catch(error=>{
         return error;
     });
};

exports.cambiarEstadoReserva = (reservaID, estado) =>{
    return db.query(
        `update reserva set estado = $1 where id = $2`, [estado, reservaID]);
};

exports.getReservasRecibidas = (conductor, viajeid) =>{
    return db.query(
        `select * from reserva where idviaje=$1 and reserva.estado <> $2`, [viajeid, consts.RESERVA_CANCELADA]
    ).then(result => {
         return result.rows.map(createDTO);
    });
}