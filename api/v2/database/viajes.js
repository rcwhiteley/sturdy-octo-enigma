const db = require('./connection');
const vehiculos = require('./vehiculos');
const usuarios = require('./usuarios');
const consts = require('./constants');
const paradas = require('./paradas');
function createDTO(dbo) {
    return {
        nombre: dbo.nombre,
        apellido: dbo.apellido,
        id: dbo.id,
        origen: dbo.origen,
        destino: dbo.destino,
        fecha: dbo.fecha,
        equipajeMaximo: dbo.equipajemax,
        vehiculo: vehiculos.createDTO(dbo)
    }
};

exports.getViajes = (origen, destino, fechaMinima, fechaMaxima, asientosNecesarios, maletas) => {
    return db.query(
        `SELECT 
            pas.nombre, pas.apellido, vj.id as id, pi.orden as ordenorigen, pf.orden as ordendestino, pi.ciudad as origen, pf.ciudad as destino,
            pi.hora as fecha, v.*
        FROM viaje as vj, parada as pi, parada as pf, vehiculo as v, pasajero as pas
        WHERE v.patente = vj.patente and pas.username = v.conductor
            and pi.ciudad = $1 and pf.ciudad = $2 and pi.orden < pf.orden 
            and vj.fecha >= $3 and vj.fecha <= $4 and vj.id = pi.idviaje and vj.id = pf.idviaje
            and (NOT EXISTS(

                    SELECT pq.id, sum(r1.numasientos) as s1, sum(r1.maletas) as s2
                    FROM parada as pq, reserva as r1,parada as p1, parada as p2
                    WHERE 
                        pq.idviaje = vj.id
                        and pq.orden >= pi.orden and pq.orden < pf.orden
                        and r1.estado = $7
                        and r1.idviaje = vj.id and p1.idviaje = vj.id and p2.idviaje = vj.id
                        and p1.ciudad = r1.origen and p2.ciudad = r1.destino
                        and p1.orden <= pq.orden and p2.orden > pq.orden
                    group by pq.id
                    having v.numplazas < sum(r1.numasientos) + $5 or vj.equipajemax < sum(r1.maletas) + $6

                )
            )

        group by pas.username, vj.id, pi.orden, pf.orden, pi.ciudad, pf.ciudad, pi.hora, v.patente`, 
        [origen, destino, fechaMinima, fechaMaxima, asientosNecesarios, maletas, consts.RESERVA_APROBADA])
        .then((result) => {
            return result.rows.map(createDTO);
        })
        .catch((error)=>{
            console.log(new Error(error).stack);
            throw "Fallo al obtener datos de la base de datos";
        });
}
