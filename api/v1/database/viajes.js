const db = require('./connection');
const vehiculos = require('./vehiculos');
function createDTO (dbo) {
    return {
        id: dbo.id,
        origen: dbo.origen,
        destino: dbo.destino,
        fecha: dbo.fecha,
        equipajeMaximo: dbo.equipajemax,
        vehiculo: vehiculos.createDTO(dbo)
    }
};

function createDBO(dto){
    return {
        id: dbo.id,
        origen: dbo.origen,
        destino: dbo.destino,
        fecha: dbo.fecha,
        equipajemax: dbo.equipajeMaximo
    }
};

/**
 * todo: agregar pasajeros y weas 
 */
exports.getViajesCreadosByUsername = (conductor) => {
    console.log("omh " + conductor);
    return  db.query(
        `SELECT * FROM viaje as vj,vehiculo as vh 
        WHERE vh.conductor = $1 and vj.patente = vh.patente`, [conductor])
    .then(res=>{
        return res.rows.map(createDTO);
    });
};

exports.listViajesQuePasanPor = (origen, destino, fechaMinima, fechaMaxima)=>{
    return db.query(
    `SELECT
        vj.id as id, pi.orden as ordenorigen, pf.orden as ordendestino, pi.ciudad as origen, pf.ciudad as destino, (vj.equipajemax - p.equipajecarg) as equipajeMax,
        pi.hora as fecha, v.*
    FROM viaje as vj, parada as pi, parada as pf, parada as p, vehiculo as v

    WHERE v.patente = vj.patente 
        and pi.ciudad = $1 and pf.ciudad = $2 and pi.orden < pf.orden 
        and vj.fecha >= $3 and vj.fecha <= $4 and vj.id = pi.idviaje 
        and p.orden >= pi.orden and p.orden <= pf.orden and p.idviaje = vj.id
        and p.equipajecarg = (select max(equipajecarg) from parada as px
        where px.idviaje = vj.id and px.orden >= pi.orden and px.orden < pf.orden
    )
    and vj.id = pf.idviaje
    and (
        NOT EXISTS(
            SELECT *
            FROM parada as p
            WHERE pi.idviaje = p.idviaje and p.orden >= pi.orden and p.orden < pf.orden
            and p.plazasdisp&(1::bit(4)<<0)<>0::bit(4)
            ) 
        or NOT EXISTS(
            SELECT *
            FROM parada as p
            WHERE pi.idviaje = p.idviaje and p.orden >= pi.orden and p.orden < pf.orden
            and p.plazasdisp&(1::bit(4)<<1)<>0::bit(4)
            ) 
        or NOT EXISTS(
            SELECT *
            FROM parada as p
            WHERE pi.idviaje = p.idviaje and p.orden >= pi.orden and p.orden < pf.orden
            and p.plazasdisp&(1::bit(4)<<2)<>0::bit(4)
            ) 
        or NOT EXISTS(
            SELECT *
            FROM parada as p
            WHERE pi.idviaje = p.idviaje and p.orden >= pi.orden and p.orden < pf.orden
            and p.plazasdisp&(1::bit(4)<<3)<>0::bit(4)
            )
        )
    group by p.id, vj.id, pi.orden, pf.orden, pi.ciudad, pf.ciudad, pi.hora, v.patente`, [origen, destino, fechaMinima, fechaMaxima])
    .then(result =>  {
        return result.rows.map(createDTO);
    });
}
