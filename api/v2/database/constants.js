exports.RESERVA_PENDIENTE = 1;
exports.RESERVA_APROBADA = 2;
exports.RESERVA_CANCELADA = 3;
exports.ERROR_SUCCESS = "success";
exports.FECHA_MIN = '1980-01-01T00:00:00Z-03';
exports.FECHA_MAX = '2980-01-01T00:00:00Z-03';

function createEnvelope(errorMsg, data){
    return {
        error: errorMsg, data: data
    };   
}

exports.createResponse = (errorMsg, data) => createEnvelope(errorMsg, data);