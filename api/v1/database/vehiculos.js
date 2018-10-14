const db = require('./connection');

function createDTO(dbo) {
    return {
        patente: dbo.patente,
        maraca: dbo.marca,
        modelo: dbo.modelo,
        aptoSillaBebe: dbo.aptoparasilla,
        dosPasajerosAtras: dbo.dosatras,
        capacidadEquipaje: dbo.capequipaje,
        numeroPlazas: dbo.numplazas,
        conductor: dbo.conductor

    }
};

function createDBO(dto) {
    return {
        patente: dbo.patente,
        maraca: dbo.marca,
        modelo: dbo.modelo,
        aptoparasilla: aptoSillaBebe,
        dosatras: dosPasajerosAtras,
        capequipaje: capacidadEquipaje,
        numplazas: numeroPlazas,
        conductor: conductor

    }
};

exports.listVehiculosConductor = (conductor) => {
    return db.query(`select * from vehiculo where conductor = $1`, [conductor])
        .then(res => {
            return res.rows.map(createDTO);
        });
};

exports.getVehiculo = (patente) => {
    return db.query(`select * from vehiculo where patente=$1`, [patente])
        .then(res => {
            return res.rows.map(createDTO);
        });
};

exports.createVehiculo = (vehiculo) => {
    return db.query(`insert into vehiculo values($1, $2, $3, $4, $5, $6, $7, $8)`,
        [vehiculo.patente
            , vehiculo.marca
            , vehiculo.modelo
            , vehiculo.aptoSillaBebe
            , vehiculo.dosPasajerosAtras
            , vehiculo.capacidadEquipaje
            , vehiculo.numeroPlazas
            , vehiculo.conductor]);
};

exports.createDTO = createDTO;