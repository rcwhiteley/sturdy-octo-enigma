exports.RESERVA_PENDIENTE = 1;
exports.RESERVA_APROBADA = 2;
exports.RESERVA_CANCELADA = 3;

exports.crearErrorMsg = (message)=>{
    return JSON.stringify( { message: message});
}