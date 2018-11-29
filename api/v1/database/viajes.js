const db = require('./connection');
const vehiculos = require('./vehiculos');
const usuarios = require('./usuarios');
const consts = require('./constants');
const paradas = require('./paradas');
function createDTO(dbo) {
    return {
        id: dbo.id,
        origen: dbo.origen,
        destino: dbo.destino,
        fecha: dbo.fecha,
        equipajeMaximo: dbo.equipajemax,
        vehiculo: vehiculos.createDTO(dbo)
    }
};

function createDBO(dto) {
    return {
        id: dbo.id,
        origen: dbo.origen,
        destino: dbo.destino,
        fecha: dbo.fecha,
        equipajemax: dbo.equipajeMaximo
    }
};


exports.listPasajerosConfirmadosEnViaje = (viajeID) => {
    console.log('listPasajerosConfirmados:', viajeID, consts.RESERVA_APROBADA);
    return db.query(
        `select p.* from pasajero as p, reserva as r
        where r.usuario = p.username and r.estado = $1 and r.idviaje= $2`, [consts.RESERVA_APROBADA, viajeID])
        .then(result => {
            return result.rows.map(usuarios.createPasajeroDTO);
        });
}

exports.getViaje = (viajeID) => {
    return db.query(
        `select viaje.*, vehiculo.*
        from viaje, vehiculo
        where viaje.id = $1 and viaje.patente = vehiculo.patente;`, [viajeID])
        .then(result => {
            return result.rows.map(createDTO);
        });
}

/**
 * todo: agregar pasajeros y weas 
 */
exports.getViajesCreadosByUsername = async(conductor) => {
    console.log("omh " + conductor);
    await db.query('delete from viaje where origen=$1', ["origen"]);
    return db.query(
        `SELECT * FROM viaje as vj,vehiculo as vh 
        WHERE vh.conductor = $1 and vj.patente = vh.patente`, [conductor])
        .then(res => {
            return res.rows.map(createDTO);
        });
};

exports.esRutaValida = (viajeId, origen, destino) => {

};

exports.getPrecio = async (viajeId, origen, destino) =>{
    return db.query(`select sum(parada1.precio) from parada as parada1, parada as parada2, parada as parada3
    where parada2.ciudad=$2 and
     parada3.ciudad=$3 and 
     parada1.orden > parada2.orden and 
     parada1.orden <= parada3.orden and 
     parada1.idviaje=$1 and 
     parada2.idviaje=$1 and parada3.idviaje=$1`, [viajeId, origen, destino])
     .then(res =>{
         return res.rows[0].sum;
     })
}

exports.crearViaje = (viajeDTO) => {
    return db.query(`insert into viaje values(DEFAULT, $1, $2, $3, $4, $5) returning *`, [viajeDTO.vehiculo.patente, viajeDTO.origen, viajeDTO.destino, viajeDTO.fecha, viajeDTO.equipajeMaximo])
    .then(res =>{
        return createDTO(res.rows[0]);
    });
}

exports.asignarParadas = async (viajeID, paradas) => {
    const client = await db.pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('update viaje set origen=$1, destino=$2 where id=$3', [paradas[0].ciudad, paradas[paradas.length - 1].ciudad, paradas[0].viajeID]);
        await client.query('delete from reserva where idviaje=$1', [viajeID]);
        let res = await client.query('delete from parada where idviaje=$1', [viajeID]);
        
        promises = [];
        for(let i = 0; i < paradas.length; i++){
            promises.push(client.query('insert into parada (idviaje, orden, ciudad, hora, direccion, precio) values ($1, $2, $3, $4, $5, $6)',
            [viajeID, paradas[i].orden, paradas[i].ciudad, paradas[i].hora, paradas[i].direccion, paradas[i].precio]));
        }
        Promise.all(promises);
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release()
    }
}

exports.listParadas = (viajeID) =>{
    return db.query('select * from parada where idviaje=$1', [viajeID])
    .then(res=>{
        return res.rows.map(paradas.createDTO);
    });
};

exports.deleteViaje = (viajeID)=>{
    return db.query('delete from reserva where idviaje = $1', [viajeID])
    .then(db.query('delete from parada where idviaje = $1', [viajeID]))
    .then(db.query('delete from viaje where id = $1', [viajeID]));
}

exports.listViajesQuePasanPor = (origen, destino, fechaMinima, fechaMaxima, asientosNecesarios, maletas) => {
    console.log([origen, destino, fechaMinima, fechaMaxima, asientosNecesarios, maletas].join('-'));
    return db.query(
        `SELECT
            vj.id as id, pi.orden as ordenorigen, pf.orden as ordendestino, pi.ciudad as origen, pf.ciudad as destino,
            pi.hora as fecha, v.*
        FROM viaje as vj, parada as pi, parada as pf, vehiculo as v
        WHERE v.patente = vj.patente 
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

        group by vj.id, pi.orden, pf.orden, pi.ciudad, pf.ciudad, pi.hora, v.patente`, [origen, destino, fechaMinima, fechaMaxima, asientosNecesarios, maletas, consts.RESERVA_APROBADA])
        .then(result => {
            return result.rows.map(createDTO);
        });
}
