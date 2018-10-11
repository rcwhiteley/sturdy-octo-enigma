const db = require('./connection');
const vehiculos = require('./vehiculos');
function createDTO (dbo) {
    return {
        id: dbo.id,
        patente: dbo.patente,
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
        patente: dbo.patente,
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
